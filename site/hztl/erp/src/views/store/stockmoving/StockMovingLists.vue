<template>
  <section class="container-box">
    <div class="header flex-container">
      <div>
        <el-button
          :disabled="!isCanCreate"
          type="primary"
          size="mini"
          @click="openBill"
        >
          开单（F2）
        </el-button>
        <el-button
          :disabled="!isCanRead"
          type="primary"
          size="mini"
          @click="checkAndEdit"
        >
          查改（F3）
        </el-button>
        <el-button
          :disabled="!isCanDelete"
          type="primary"
          size="mini"
          @click="deleteBill"
        >
          删除（F4）
        </el-button>
        <el-button
          :disabled="!isCanSubmit"
          type="primary"
          size="mini"
          @click="submitBill"
        >
          提交（F9）
        </el-button>
        <el-button
          :disabled="!isCanRecall"
          type="primary"
          size="mini"
          @click="revokeBill"
        >
          撤回（F9）
        </el-button>
        <el-button
          :disabled="!isCanAcceptAndConfrim"
          type="primary"
          size="mini"
          @click="acceptAndConfrim"
        >
          接受并确认（F7）
        </el-button>
        <el-button
          :disabled="!isCanPrint"
          type="primary"
          size="mini"
          @click="printOrders"
        >
          打印（F11）
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="移仓日期" prop="dateRange">
              <ht-date-range v-model="ruleForm.dateRange" />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="ruleForm.billNo"
                placeholder="支持出库单号、业务单号、备货单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="status">
              <ht-select
                v-model="ruleForm.status"
                :options="statusArr"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择单据状态"
              />
            </el-form-item>
            <el-form-item prop="toWarehouseId" label="移入仓库">
              <ht-autoselect
                v-model="ruleForm.toWarehouseId"
                :fetch-suggestions="
                  query =>
                    searchLoadManageWarehouses({
                      name: query,
                      managerCompanyId: store().userInfoMsg().companyId,
                      managerStaffId: store().userInfoMsg().staffId
                    })
                "
                :trigger-on-focus="false"
                placeholder="移入仓库"
                remote
                clearable
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="createdBy" label="制单人" label-width="45px">
              <ht-autoselect
                v-model="ruleForm.createdBy"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="请选择"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="resetForm">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <ht-table
        v-loading="loading"
        :columns="tablecolumns"
        :data="tableData"
        :total="totalSize"
        :current-page="currentPage"
        :key-scope="keyScope"
        :selected-rows.sync="selectedRows"
        :pagination="isShowPagination"
        setting-all-column
        show-table-setting
        @pageChange="_handleSizeChange"
        @hotkeysUp="handleKeyCode"
        @rowOperation="handleEdit"
        @table-setting="handleTableSetting"
      />
    </ht-card>

    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
  </section>
</template>
<script>
import {
  stockmovingAudit,
  stockmovingCommit,
  stockmovingDelete,
  stockmovingList,
  stockmovingRevoke
} from "@/api/store/stockmovings";
import { dateFormat } from "@/utils/date";
import { MOVEING_BILL_STATUS } from "@/views/store/billstatus";
import { mapState, mapGetters } from "vuex";
import hotkeys from "hotkeys-js";
import { TABLE__MOVEING_LIST_TABLE } from "@/constants";
import { EditColumns } from "@/components/table";
import { searchMixin } from "@/mixins";
import { openNewWindow } from "@/utils/tool";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";

const defaultSearchForm = {
  status: Object.keys(MOVEING_BILL_STATUS).map(item => Number(item)),
  warehouseIds: [],
  dateRange: []
};

export default {
  name: "StockMovingLists",
  components: { EditColumns, VideoPopover },
  mixins: [searchMixin],
  data() {
    return {
      keyScope: "StockMovingLists",
      ruleForm: {
        ...defaultSearchForm
      },
      tableData: [],
      loading: false,
      totalSize: 0,
      statusArr: MOVEING_BILL_STATUS,
      currentPage: 1,
      selectedRows: [],

      tableName: TABLE__MOVEING_LIST_TABLE.name,
      tablecolumns: [],
      editColumnsVisible: false,
      isShowPagination: false,
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_move.mp4",
      videoPopoverRemark:
        "内部移仓页面，用于商品移库操作，仅限有权限使用仓库内移仓。"
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    }),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    isCanCreate() {
      return this.hasAutoPerm("create");
    },
    isCanRead() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].movingId &&
        this.hasAutoPerm("read")
      );
    },
    isCanDelete() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 0 &&
        this.hasAutoPerm("delete")
      );
    },
    isCanSubmit() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 0 &&
        this.hasAutoPerm("commit")
      );
    },
    isCanRecall() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 1 &&
        this.hasAutoPerm("revoke")
      );
    },
    isCanAcceptAndConfrim() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].status === 1 &&
        this.hasAutoPerm("confirm")
      );
    },
    isCanPrint() {
      return (
        this.selectedRows.length &&
        this.selectedRows[0].movingId &&
        this.hasAutoPerm("print")
      );
    },
    baseTableColumns() {
      return TABLE__MOVEING_LIST_TABLE.columns;
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.dateRange = val;
      this.ruleForm.dateRange = val;
    }
  },
  mounted() {
    defaultSearchForm.dateRange = this.billQueryDefaultDateRange;
    this.resetForm();
    this.handleSearch();
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tablecolumns = [];
      this.$nextTick(() => {
        this.tablecolumns = columns;
      });
    },
    handleKeyCode(e) {
      switch (e.code) {
        case "F2":
          this.openBill();
          break;
        case "F3":
          this.checkAndEdit();
          break;
        case "F4":
          if (!this.isCanDelete) return;
          this.deleteBill();
          break;
        case "F5":
          this.handleSearch();
          break;
        case "F6":
          this.resetForm();
          break;
        case "F11":
          this.printOrders();
          break;
        case "F7":
          this.acceptAndConfrim();
          break;
        case "F9":
          this.submitBill();
          this.revokeBill();
          break;
      }
    },
    _message(msg) {
      this.$message.success({
        message: msg
      });
      this.handleSearch();
    },
    handleSearch() {
      // 搜索操作
      this.currentPage = 1;
      this.resShiftingList({ page: this.currentPage });
    },
    resetForm() {
      this.ruleForm = {
        ...defaultSearchForm
      };
    },
    resShiftingList(page) {
      // 搜索移仓单列表
      this.loading = true;
      const params = {
        ...this.ruleForm,
        ...page,
        pageSize: this.pageSizes,
        fromDate: this.ruleForm.dateRange
          ? dateFormat(this.ruleForm.dateRange[0])
          : undefined,
        toDate: this.ruleForm.dateRange
          ? dateFormat(this.ruleForm.dateRange[1])
          : undefined,
        dateRange: undefined
      };

      stockmovingList(params)
        .then(data => {
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.movingId === this.selectedRows[0].movingId
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    _handleSizeChange(page) {
      // 列表分页操作
      this.currentPage = page;
      this.resShiftingList({ page: page });
    },
    openBill() {
      // 开单操作
      if (!this.isCanCreate) {
        return;
      }
      this.$router.push({ path: "/StockMovingBill" });
    },
    checkAndEdit() {
      // 查改单据
      if (!this.isCanRead) {
        return;
      }
      this.toBill(this.selectedRows[0]);
    },
    toBill(row) {
      if (!row.movingId) return;
      this.$router.push({
        path: "/StockMovingBill",
        query: { movingId: row.movingId }
      });
    },
    deleteBill() {
      // 删除单据
      this.$confirm(
        `您确定要删除 ${this.selectedRows[0].billNo} 单据么?`,
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          stockmovingDelete({ movingId: this.selectedRows[0].movingId }).then(
            () => {
              this._message("删除成功!");
            }
          );
        })
        .catch(() => {});
    },
    submitBill() {
      // 单据提交
      if (!this.isCanSubmit) return;
      stockmovingCommit({ movingId: this.selectedRows[0].movingId }).then(
        () => {
          this._message("提交成功!");
        }
      );
    },
    revokeBill() {
      // 撤回单据
      if (!this.isCanRecall) return;
      stockmovingRevoke({ movingId: this.selectedRows[0].movingId }).then(
        () => {
          this._message("撤回成功!");
        }
      );
    },
    acceptAndConfrim() {
      // 接收并确认单据
      if (!this.isCanAcceptAndConfrim) return;
      stockmovingAudit({ movingId: this.selectedRows[0].movingId }).then(() => {
        this._message("接受并确认成功!");
      });
    },
    printOrders() {
      if (!this.isCanPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Store/Move/" + this.selectedRows[0].movingId
        }).href,
        "print"
      );
    },
    handleEdit(row) {
      this.toBill(row);
    }
  }
};
</script>
