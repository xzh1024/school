<template>
  <div class="container-box">
    <div class="header flex-container">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="openOrder"
        >
          开单（F2）
        </el-button>
        <el-button
          :disabled="!canRead"
          type="primary"
          size="mini"
          @click="checkOrEdit"
        >
          查改（F3）
        </el-button>
        <el-button
          :disabled="!canDelete"
          type="primary"
          size="mini"
          @click="doDelete()"
        >
          删除（F4）
        </el-button>
        <el-button
          :disabled="!canSubmit"
          type="primary"
          size="mini"
          @click="doSubmit()"
        >
          提交（F9）
        </el-button>
        <el-button
          :disabled="!canRevoke"
          type="primary"
          size="mini"
          @click="doRevoke()"
        >
          撤回（F9）
        </el-button>
        <el-button
          :disabled="!canWarehouseAudit"
          type="primary"
          size="mini"
          @click="doWarehouseAudit()"
        >
          库房审核（F7）
        </el-button>
        <el-button
          :disabled="!canFinancialAudit"
          type="primary"
          size="mini"
          @click="doFinancialAudit()"
        >
          财务审核（F7）
        </el-button>
        <el-button
          :disabled="!canPrint"
          type="primary"
          size="mini"
          @click="doPrint"
        >
          打印（F11）
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card no-padding>
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="业务时间">
              <ht-date-range v-model="dateRange" />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="支持盘点单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="billStatus">
              <ht-select
                v-model="searchForm.billStatus"
                :options="stateArr"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择单据状态"
              />
            </el-form-item>
            <el-form-item prop="warehouseIds" label="所属仓库">
              <ht-select
                v-model="searchForm.warehouseIds"
                :options="warehouseOptions"
                placeholder="所属仓库"
                filterZero
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="createdBy" label="制单人" label-width="45px">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="请选择"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetForm()">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <ht-setting-table
        v-loading="loading"
        :data="tableData"
        :columns="listColumns"
        :total="totalSize"
        :current-page="page"
        :table-name="tableName"
        :selected-rows.sync="selectedRows"
        autofocus
        pagination
        @pageChange="handlePageChange"
        @rowOperation="handleEdit"
      />
    </ht-card>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";
import { stocktakingBillList } from "@/api/store/stocktaking";
import { STOCKTAKING_BILL_STATUS } from "@/views/store/billstatus";
import { TABLE_STOCKTAKING_LIST } from "@/constants/table-columns/store/stocktaking-list";
import { mapState, mapGetters } from "vuex";
// 列表页、详情页公共操作
import CommonOperations from "./mixins/CommonOperations";
import { searchMixin } from "@/mixins";
import { hotkeyMixin } from "@/mixins";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";
import { NO_PRICE_PERM_VALUE } from "@/constants/store";
const defaultSearchForm = {
  billStatus: Object.keys(STOCKTAKING_BILL_STATUS).map(item => Number(item)),
  warehouseIds: [],
  createdBy: null
};

export default {
  name: "StocktakingList",
  components: { VideoPopover },
  mixins: [CommonOperations, hotkeyMixin, searchMixin],
  data() {
    return {
      dateRange: [],
      searchForm: {
        ...defaultSearchForm
      },

      tableData: [],
      tableName: TABLE_STOCKTAKING_LIST.name,
      columns: TABLE_STOCKTAKING_LIST.columns,
      loading: false,
      page: 1,
      totalSize: null,
      isShowPagination: true,
      selectedRows: [],

      // 当前选中行的盘点单
      header: {},

      stateArr: STOCKTAKING_BILL_STATUS,
      warehouseOptions: [],

      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_inventory.mp4",
      videoPopoverRemark:
        "配件盘点页面，用户商品库存盘点，支持盘数量、金额、货位。"
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    }),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    listColumns() {
      return TABLE_STOCKTAKING_LIST.columns.map(column => {
        if (column.prop !== "profitLossTaxedAmount") {
          return column;
        } else {
          return {
            ...column,
            render: (value, row) => (
              <div class="text-right number-font">
                {row.profitLossTaxedAmount == NO_PRICE_PERM_VALUE
                  ? "无权查看"
                  : row.profitLossTaxedAmount}
              </div>
            )
          };
        }
      });
    }
  },
  watch: {
    selectedRows(value) {
      this.header = value && value.length ? { ...value[0] } : {};
    },
    billQueryDefaultDateRange(val) {
      this.dateRange = val;
    }
  },
  mounted() {
    this.resetForm();
    this.handleSearch();
    this.searchLoadManageWarehouses({
      managerCompanyId: store.userInfoMsg().companyId,
      managerStaffId: store.userInfoMsg().staffId
    }).then(res => {
      this.warehouseOptions = res || [];
    });
  },
  methods: {
    store() {
      return store;
    },
    openOrder() {
      if (!this.canCreate) {
        return;
      }
      this.$router.push({
        path: "/StocktakingBill"
      });
    },
    checkOrEdit() {
      this.toBill(this.header);
    },
    handleEdit(row) {
      this.toBill(row);
    },
    toBill(row) {
      if (!this.canRead) {
        return;
      }
      this.$router.push({
        path: "/StocktakingBill",
        query: { takingId: row.takingId }
      });
    },

    resetForm() {
      this.dateRange = this.billQueryDefaultDateRange;
      this.searchForm = { ...defaultSearchForm };
    },
    handleSearch() {
      this.page = 1;
      this.searchBillList();
    },
    handlePageChange(page) {
      this.page = page;
      this.searchBillList();
    },
    searchBillList() {
      this.loading = true;
      const params = {
        ...this.searchForm,
        page: this.page,
        pageSize: this.pageSizes,
        fromDate: this.dateRange ? dateFormat(this.dateRange[0]) : "",
        toDate: this.dateRange ? dateFormat(this.dateRange[1]) : ""
      };
      stocktakingBillList(params)
        .then(data => {
          this.header = {};
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
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
    refreshPage() {
      // CommonOperations在做完操作后会调用
      this.handleSearch();
      this.header = {};
    }
  }
};
</script>
<style lang="stylus" scoped>
.form-item-small-margin-bottom {
    padding: 10px;
}
</style>
