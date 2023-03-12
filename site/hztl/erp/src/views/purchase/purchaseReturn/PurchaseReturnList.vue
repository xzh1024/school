<template>
  <section class="container-box">
    <div class="header">
      <el-button
        :disabled="!canClick || !canCreate"
        type="primary"
        size="mini"
        @click="createHandle"
      >
        开单（F2）
      </el-button>
      <el-button
        :disabled="!canClick || !canRead"
        type="primary"
        size="mini"
        @click="updateHandle"
      >
        查改（F3）
      </el-button>
      <el-button
        :disabled="!canClick || !canDelete"
        :loading="deleteLoading"
        type="primary"
        size="mini"
        @click="deleteHandle"
      >
        删除（F4）
      </el-button>
      <el-button
        :disabled="!canClick || !canSubmit"
        :loading="submitLoading"
        type="primary"
        size="mini"
        @click="submitHandle"
      >
        提交（F9）
      </el-button>
      <el-button
        :disabled="!canClick || !canRecall"
        :loading="recallLoading"
        type="primary"
        size="mini"
        @click="recallHandle"
      >
        撤回（F9）
      </el-button>
      <el-button
        :disabled="!canClick || !canPrint"
        type="primary"
        size="mini"
        @click="printHandle"
      >
        打印（F11）
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
      >
        <i class="el-icon-question"></i>如何使用采购退货
      </span>
    </div>
    <ht-card>
      <el-form
        ref="returnListSearch"
        :model="searchForm"
        class="form-item-small-margin-bottom"
        label-width="60px"
        label-position="left"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="业务日期" prop="billDate">
              <ht-date-range v-model="searchForm.billDate" />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/采购单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="供应商" prop="cooperatorName">
              <ht-autocomplete
                v-model="searchForm.cooperatorName"
                :fetch-suggestions="autocompleteSearchAllSuppliers"
                :trigger-on-focus="false"
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="打印状态" prop="printStatus">
              <ht-select
                v-model="searchForm.printStatus"
                :options="printStatusOptions"
                placeholder="打印状态"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="status">
              <ht-select
                v-model="searchForm.status"
                :options="billStatus"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="配件" prop="partNameOrCode">
              <ht-input
                v-model="searchForm.partNameOrCode"
                placeholder="配件编号/配件名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              prop="businessManId"
              label="业务员"
              label-width="45px"
            >
              <ht-autoselect
                v-model="searchForm.businessManId"
                :fetch-suggestions="searchLoadAllPurchaseMen"
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
            <el-form-item prop="warehouseId" label="仓库" label-width="45px">
              <ht-autoselect
                v-model="searchForm.warehouseId"
                :fetch-suggestions="
                  query => searchLoadAllWarehouses(query, userInfoMsg.companyId)
                "
                :trigger-on-focus="false"
                remote
                filter-zero
                highlight-first-item
                clearable
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click.stop="resetSearchForm"
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card :no-padding="true" class="auto-card">
      <ht-table
        :loading="tableLoading"
        :data="tableData"
        :total="totalSize"
        :pagination="isShowPagination"
        :columns="tablecolumns"
        :current-page="currentPage"
        :key-scope="keyScope"
        :selected-rows.sync="selectedRows"
        setting-all-column
        show-table-setting
        @rowOperation="handleRowEdit"
        @pageChange="pageChangeHandle"
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
  reqReturnBillingDelete,
  reqReturnBillingRecall,
  reqReturnBillingSubmit,
  reqReturnList
} from "@/api/purchase/purchaseReturn";
import { PURCHASE_RETURN_STATUS } from "@/constants/states/purchase";
import { TABLE_PURCHASE_RETURN_LIST } from "../constants";
import { mapState, mapGetters } from "vuex";
import { EditColumns } from "@/components/table";
import { hotkeyMixin, searchMixin } from "@/mixins";
import eventBus from "@/event";
import { openNewWindow } from "@/utils/tool";

const defaultSearchForm = {
  billDate: [],
  businessManId: null,
  cooperatorName: "",
  partNameOrCode: "",
  billNo: "",
  warehouseId: null,
  printStatus: [1, 2],
  status: Object.keys(PURCHASE_RETURN_STATUS).map(item => Number(item))
};

export default {
  name: "PurchaseReturnList",
  components: {
    EditColumns
  },
  mixins: [searchMixin, hotkeyMixin],
  data() {
    return {
      keyScope: Symbol("PurchaseReturnList"),
      searchForm: {
        ...defaultSearchForm
      },
      printStatusOptions: [
        { id: 1, name: "未打印" },
        { id: 2, name: "已打印" }
      ],
      billStatus: PURCHASE_RETURN_STATUS,
      deleteLoading: false,
      submitLoading: false,
      recallLoading: false,
      tableLoading: false,
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      selectedRows: [],
      tablecolumns: [],
      isShowPagination: false,
      editColumnsVisible: false,
      tableName: TABLE_PURCHASE_RETURN_LIST.name,
      baseTableColumns: TABLE_PURCHASE_RETURN_LIST.columns
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    canClick() {
      return !this.submitLoading && !this.recallLoading && !this.deleteLoading;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.selectedRows[0].belongs)
      );
    },
    canDelete() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("delete", this.selectedRows[0].belongs)
      );
    },
    canSubmit() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].status === 0 &&
        this.hasBelongsPerm("submit", this.selectedRows[0].belongs)
      );
    },
    canRecall() {
      return (
        this.selectedRows.length === 1 &&
        [1, 2, 3].includes(this.selectedRows[0].status) &&
        this.hasBelongsPerm("submitRecall", this.selectedRows[0].belongs)
      );
    },
    canPrint() {
      return (
        this.selectedRows.length === 1 &&
        this.selectedRows[0].canPrint &&
        this.hasBelongsPerm("print", this.selectedRows[0].belongs)
      );
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    this.resetSearchForm();
    const query = this.$route.query;
    if (!query || !query.statuses || !query.statuses.length) {
      this.handleSearch();
    }
  },
  activated() {
    const query = this.$route.query;
    if (query && query.status && query.status.length) {
      const status = query.status.map(item => Number(item));
      //拼接初始化查询条件
      this.searchForm.status = Object.keys(PURCHASE_RETURN_STATUS)
        .map(item => Number(item))
        .filter(item => status.includes(item));
      this.handleSearch();
    }
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 26);
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
    pageChangeHandle(page = 1) {
      this.currentPage = page;
      this.tableLoading = true;
      const parmas = {
        ...this.searchForm
      };
      parmas.billDateStart =
        this.searchForm.billDate && this.searchForm.billDate.length
          ? this.searchForm.billDate[0]
          : undefined;
      parmas.billDateEnd =
        this.searchForm.billDate && this.searchForm.billDate.length
          ? this.searchForm.billDate[1]
          : undefined;
      parmas.printStatus =
        this.searchForm.printStatus.length === 0 ||
        this.searchForm.printStatus.length === this.printStatusOptions.length
          ? undefined
          : this.searchForm.printStatus[0];
      const curSupplier = this.searchedData.suppliers.find(
        item => item.name === this.searchForm.cooperatorName
      );
      parmas.cooperatorId = curSupplier && curSupplier.id;
      return reqReturnList({
        ...parmas,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
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
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleSearch() {
      this.pageChangeHandle(1);
    },
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    },
    createHandle() {
      if (!this.canClick) return;
      if (!this.canCreate) return;
      this.$router.push("/PurchaseReturnBilling");
    },
    updateHandle() {
      if (!this.canClick) return;
      if (!this.canRead) return;
      this.$router.push({
        path: "/PurchaseReturnBilling",
        query: { billId: Number(this.selectedRows[0].id) }
      });
    },
    deleteHandle() {
      if (!this.canClick) return;
      if (!this.canDelete) return;
      const billNos = [];
      this.selectedRows.forEach(item => {
        billNos.push(item.billNo);
      });
      this.$confirm(
        `确定要删除选中的 ${this.selectedRows.length} 条（${billNos.join(
          "、"
        )}）订单吗？`,
        "删除订单",
        { type: "warning" }
      )
        .then(() => {
          this.deleteLoading = true;
          const ids = this.selectedRows.map(item => {
            return item.id;
          });
          reqReturnBillingDelete({ ids })
            .then(() => {
              this.pageChangeHandle(this.currentPage)
                .then(() => {
                  this.deleteLoading = false;
                  this.$message({
                    type: "success",
                    message: "订单删除成功",
                    showClose: true
                  });
                })
                .catch(() => {
                  this.deleteLoading = false;
                });
            })
            .catch(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
    },
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.submitLoading = true;
      const billNo = this.selectedRows[0].billNo;
      reqReturnBillingSubmit(this.selectedRows[0].id)
        .then(() => {
          this.pageChangeHandle(this.currentPage)
            .then(() => {
              this.submitLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 提交成功！",
                showClose: true
              });
            })
            .catch(() => {
              this.submitLoading = false;
            });
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    recallHandle() {
      if (!this.canClick) return;
      if (!this.canRecall) return;
      this.recallLoading = true;
      const billNo = this.selectedRows[0].billNo;
      reqReturnBillingRecall(this.selectedRows[0].id)
        .then(() => {
          this.pageChangeHandle(this.currentPage)
            .then(() => {
              this.recallLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 撤回成功！",
                showClose: true
              });
            })
            .catch(() => {
              this.recallLoading = false;
            });
        })
        .catch(() => {
          this.recallLoading = false;
        });
    },
    printHandle() {
      if (!this.canClick) return;
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Return/" + this.selectedRows[0].id
        }).href,
        "print"
      );
    },
    resetSearchForm() {
      this.searchForm = {
        ...defaultSearchForm
      };
    }
  }
};
</script>
