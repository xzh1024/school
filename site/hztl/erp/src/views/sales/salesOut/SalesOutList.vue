<template>
  <!-- 销售列表-->
  <section class="container-box">
    <div class="header flex-container">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="createHandle"
        >
          开单（F2）
        </el-button>
        <el-button
          :disabled="!canRead"
          type="primary"
          size="mini"
          @click="updateHandle"
        >
          查改（F3）
        </el-button>
        <el-button
          :disabled="!canSubmit"
          type="primary"
          size="mini"
          @click="submitHandle"
        >
          提交（F9）
        </el-button>
        <el-button
          :disabled="!canRecall"
          type="primary"
          size="mini"
          @click="recallHandle"
        >
          撤回（F9）
        </el-button>
        <el-button
          :disabled="!canSettleStockOut"
          type="primary"
          size="mini"
          @click="settleHandle"
        >
          结算即出库（F7）
        </el-button>
        <el-button
          :disabled="!canPrint"
          type="primary"
          size="mini"
          @click="printHandle"
        >
          打印（F11）
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="业务日期" prop="createRange">
              <ht-date-range v-model="createRange" />
            </el-form-item>
            <el-form-item prop="cooperatorId" label="客户名称">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="searchLoadAllCustromerCooperators"
                :trigger-on-focus="false"
                filterZero
                remote
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="业务公司" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="myCompanys"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/客户订单单号"
              />
            </el-form-item>
            <el-form-item prop="enhancedSettlementTypes" label="支付方式">
              <ht-select
                v-model="searchForm.enhancedSettlementTypes"
                :options="store().enhancedSettlementTypeDictionary()"
                placeholder="支付方式"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item prop="businessManId" label="业务员">
              <ht-autoselect
                v-model="searchForm.businessManId"
                :fetch-suggestions="searchLoadAllSalesMen"
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="statuses">
              <ht-select
                v-model="searchForm.statuses"
                :options="orderStatuses"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="打印状态" prop="printStatus">
              <ht-select
                v-model="searchForm.printStatus"
                :options="printStatusOptions"
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item prop="createdBy" label="制单人">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :fetch-suggestions="
                  query => searchLoadAllCreatedMen(['XS'], query)
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="plateNumber" label="车牌号" label-width="45px">
              <ht-input
                v-model="searchForm.plateNumber"
                minlength="7"
                maxlength="10"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              prop="stockingManId"
              label="备货人"
              label-width="45px"
            >
              <ht-autoselect
                v-model="searchForm.stockingManId"
                :options="store().allStaffs()"
                :trigger-on-focus="false"
                placeholder="请选择"
                clearable
                highlight-first-item
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                @click.stop="() => searchHandle()"
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-table
        :columns="tablecolumns"
        :loading="loading"
        :data="tableData"
        :total="totalSize"
        :table-name="tableName"
        :summary-method="setTotals"
        :pagination="isShowPagination"
        :current-page="currentPage"
        :key-scope="keyScope"
        :selected-rows.sync="selectedRows"
        autofocus
        show-summary
        @sort-change="handleSortChange"
        setting-all-column
        show-table-setting
        @pageChange="pageChange"
        @rowOperation="handleRowEdit"
        @table-setting="handleTableSetting"
      />
    </ht-card>

    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="handleSettleRes"
    />
    <OrderError :visible.sync="orderErrorVisible" :data="orderErrorData" />
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
import { SettleDialog } from "@/components/business";
import { SALES_OUT_STATUS } from "@/constants/states/sales";
import {
  reqSalesOutList,
  salesOutBillCancelSubmit,
  salesOutBillSubmit
} from "@/api/sales/salesOut";
import { dateFormat } from "@/utils/date";
import { mapState, mapGetters } from "vuex";
import { OrderError } from "@/components/errors";
import { TABLE_SALES_OUT_LIST } from "../constants";
import { EditColumns } from "@/components/table";
import {
  baseDataMixin,
  hotkeyMixin,
  searchMixin,
  validCreditLine
} from "@/mixins";
import { openNewWindow } from "@/utils/tool";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";
import { NEW_PRINT_STATUS } from "@/constants";
import { setTableSort } from "@/utils/tool";
import Local from "@/utils/localStorage";
const defaultSearchForm = {
  statuses: Object.keys(SALES_OUT_STATUS).map(item => Number(item)),
  cooperatorId: null,
  plateNumber: "",
  enhancedSettlementTypes: [],
  printStatus: []
};

export default {
  name: "SalesOutList",
  components: {
    SettleDialog,
    OrderError,
    EditColumns,
    VideoPopover
  },
  mixins: [validCreditLine, searchMixin, hotkeyMixin, baseDataMixin],
  data() {
    return {
      keyScope: Symbol("salesOutList"),
      orderErrorData: {},
      orderErrorVisible: false,
      pagination: {},
      createRange: [],
      searchForm: {
        ...defaultSearchForm
      },
      orderStatuses: SALES_OUT_STATUS,
      importExcelVisible: false,
      isShowPagination: false,
      editColumnsVisible: false,
      tableName: TABLE_SALES_OUT_LIST.name,
      baseTableColumns: TABLE_SALES_OUT_LIST.columns,
      tablecolumns: [],
      loading: false,
      tableData: [],
      summaryTotals: {},
      totalSize: 0,
      currentPage: 1,
      settleDialogVisible: false,
      settleData: {},
      settleList: [],
      companyId: 0,
      selectedRows: [],
      printStatusOptions: NEW_PRINT_STATUS,
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_sale.mp4",
      videoPopoverRemark: "销售开单页面，用于记录销售出库开单、结算出库。",
      sort: undefined
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    curSelect() {
      return this.selectedRows.length === 1
        ? this.selectedRows[0]
        : {
            belongs: []
          };
    },
    isPlatform() {
      return !!this.curSelect.platformKey;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.curSelect.belongs)
      );
    },
    canSubmit() {
      return (
        [1, 91, 94].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submit", this.curSelect.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        !this.curSelect.financialAuditAt &&
        [2, 3, 4, 5, 6, 93].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submitRecall", this.curSelect.belongs)
      );
    },
    canSettleStockOut() {
      return (
        !this.curSelect.financialAuditAt &&
        [5, 6].includes(this.curSelect.status) &&
        this.hasBelongsPerm("settleStockOut", this.curSelect.belongs)
      );
    },
    canPrint() {
      return (
        this.curSelect.canPrint &&
        this.hasBelongsPerm("print", this.curSelect.belongs)
      );
    },
    myCompanyId() {
      return store.userInfoMsg().companyId;
    },
    myCompanys() {
      const canShowMyCompany = this.hasBelongsPerm("read", ["self", "others"]);
      const canShowOtherCompany = this.hasBelongsPerm("read", ["rests"]);
      return store.allCompanies().filter(item => {
        if (canShowMyCompany && canShowOtherCompany) return true;
        if (canShowMyCompany) return item.id == this.myCompanyId;
        if (canShowOtherCompany) return item.id != this.myCompanyId;
      });
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      this.createRange = val;
    }
  },
  mounted() {
    this.setSortData();
    defaultSearchForm.enhancedSettlementTypes = this.store()
      .enhancedSettlementTypeDictionary()
      .map(item => item.id);
    const canShowMyCompany = this.hasBelongsPerm("read", ["self", "others"]);
    defaultSearchForm.companyIds = canShowMyCompany ? [this.myCompanyId] : [];
    this.resetHandle();
    setTimeout(() => {
      this.searchHandle(this.currentPage);
    }, 100);
  },
  activated() {
    const query = this.$route.query;
    if (query && query.statuses && query.statuses.length) {
      const statuses = query.statuses.map(item => Number(item));
      //拼接初始化查询条件
      this.searchForm.statuses = Object.keys(SALES_OUT_STATUS)
        .map(item => Number(item))
        .filter(item => statuses.includes(item));
      setTimeout(() => {
        this.searchHandle(this.currentPage);
      }, 100);
    }
  },
  methods: {
    store() {
      return store;
    },
    setSortData() {
      const storage = Local.get(this.$route.path);
      if (storage.defaultSort && storage.defaultSort[this.tableName]) {
        this.sort = setTableSort(storage.defaultSort[this.tableName]);
      }
    },
    handleSortChange(column) {
      this.sort = setTableSort(column);
      if (this.tableData.length) {
        this.pageChange(1);
      }
    },
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "bookQty":
            sums[index] = this.summaryTotals["bookQty"];
            break;
          case "cancelQty":
            sums[index] = this.summaryTotals["cancelQty"];
            break;
          case "retailAmount":
            sums[index] = this.summaryTotals["retailAmount"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryTotals["taxedAmount"];
            break;
          case "terminatedQty":
            sums[index] = this.summaryTotals["totalTerminatedQty"];
            break;
          case "untaxedAmount":
            sums[index] = this.summaryTotals["untaxedAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
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
    _message(mes, type) {
      this.$message({ message: mes, type: type });
      this.currentPage = 1;
      this.salesOutList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    salesOutList(searchData, pagination) {
      this.loading = true;
      const _searchData = { ...searchData };
      _searchData.dateStart = this.createRange
        ? dateFormat(this.createRange[0])
        : "";
      _searchData.dateEnd = this.createRange
        ? dateFormat(this.createRange[1])
        : "";
      if (!_searchData?.printStatus || !_searchData?.printStatus?.length) {
        delete _searchData.printStatus;
      }
      if (_searchData?.printStatus?.length > 1) {
        _searchData.printStatus = 0;
      } else if (_searchData?.printStatus?.length === 1) {
        _searchData.printStatus = _searchData.printStatus[0];
      }
      reqSalesOutList({ ..._searchData, ...pagination })
        .then(data => {
          this.tableData = data.rows;
          this.summaryTotals.bookQty = data.bookQty;
          this.summaryTotals.cancelQty = data.cancelQty;
          this.summaryTotals.retailAmount = data.retailAmount;
          this.summaryTotals.taxedAmount = data.taxedAmount;
          this.summaryTotals.terminatedQty = data.terminatedQty;
          this.summaryTotals.untaxedAmount = data.untaxedAmount;
          this.totalSize = data.totalSize;
          this.loading = false;
          let selectedRow;
          if (this.selectedRows && this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          if (!selectedRow) {
            selectedRow = data.rows && data.rows[0];
          }
          this.selectedRows = selectedRow ? [selectedRow] : [];
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchHandle(page = 1) {
      this.currentPage = page;
      this.salesOutList(this.searchForm, {
        sort: this.sort,
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.salesOutList(this.searchForm, {
        sort: this.sort,
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    resetHandle() {
      this.createRange = this.billQueryDefaultDateRange;
      this.searchForm = { ...defaultSearchForm };
    },
    createHandle() {
      if (!this.canCreate) {
        return;
      }
      this.$router.push({ path: "/SalesOutBilling" });
    },
    updateHandle() {
      if (!this.canRead) {
        return;
      }
      this.$router.push({
        path: "/SalesOutBilling",
        query: { billId: this.selectedRows[0].id, list: true }
      });
    },
    submitHandle() {
      if (!this.canSubmit) {
        return;
      }
      salesOutBillSubmit({ billId: this.selectedRows[0].id })
        .then(data => {
          if (data && data.code && data.code !== "OK") {
            this.orderErrorData = data;
            this.orderErrorVisible = true;
            return;
          }
          if (
            this.selectedRows[0].enhancedSettlementType === "挂账" &&
            data.overCreditAlarm
          ) {
            this.validCreditLine(data).then(() => {
              this._message("提交成功", "success");
            });
          } else {
            this._message("提交成功", "success");
          }
        })
        .catch(err => {
          if (err.code == "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                salesOutBillSubmit({
                  billId: this.selectedRows[0].id,
                  skipCreditLine
                })
                  .then(() => {
                    this._message("提交成功", "success");
                  })
                  .catch(err => {
                    this._message(err.message, "error");
                  });
              }
            });
          }
        });
    },
    recallHandle() {
      if (!this.canRecall) {
        return;
      }
      salesOutBillCancelSubmit(this.selectedRows[0].id).then(() => {
        this._message("撤回成功", "success");
      });
    },
    settleHandle() {
      if (!this.canSettleStockOut) {
        return;
      }
      this.companyId = this.selectedRows[0].companyId;
      this.settleData = {
        id: this.selectedRows[0].id,
        billType: this.selectedRows[0].billType,
        billNo: this.selectedRows[0].billNo,
        cooperatorId: this.selectedRows[0].cooperatorId,
        sourceBillType: "XS",
        sourceBillId: this.selectedRows[0].id,
        enhancedSettlementType: this.selectedRows[0].enhancedSettlementType,
        invoiceType: this.selectedRows[0].invoiceType,
        amount: this.selectedRows[0].settleAmount
      };
      this.settleList = [
        {
          name: "单号",
          content: this.selectedRows[0].billNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.selectedRows[0].cooperatorName
        },
        {
          name: "业务公司",
          content: this.selectedRows[0].companyName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.selectedRows[0].invoiceType,
              this.selectedRows[0].taxRate
            ) || "--"
        },
        {
          name: "开单金额",
          content: this.selectedRows[0].billAmount
        },
        {
          name: "实际金额",
          content: this.selectedRows[0].taxedAmount
        },
        {
          name: "佣金",
          content: this.selectedRows[0].brokerageAmount
        },
        {
          type: "amount"
        },
        {
          type: "settledAmount"
        },
        // {
        //   type: "discountAmount"
        // },
        {
          type: "unSettledAmount"
        }
      ];
      this.settleDialogVisible = true;
    },
    handleSettleRes(value) {
      this.settleDialogVisible = false;
      if (value) {
        this.currentPage = 1;
        this.salesOutList(this.searchForm, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Out/" + this.curSelect.id
        }).href,
        "print"
      );
    },
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    }
  }
};
</script>
