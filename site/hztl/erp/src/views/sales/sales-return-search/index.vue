<template>
  <section class="container-box">
    <ht-card
      v-switch-focus="focusData"
      @click.native.stop="setKeyScope(keyScopes.form)"
    >
      <el-form
        ref="searchForm"
        :model="searchForm"
        class="form-item-small-margin-bottom"
        label-width="60px"
        label-position="left"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item prop="dateRange" label-width="75px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                class="date-label"
                :clearable="false"
                :options="dateTypeOptions"
              />
              <ht-date-range
                v-model="searchForm.dateRange"
                clearable
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="公司" prop="companyIds" label-width="75px">
              <ht-select
                v-model="searchForm.companyIds"
                :options="store().allCompanies()"
                placeholder="公司"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo" label-width="75px">
              <ht-input
                v-model="searchForm.billNo"
                class="switch-focus focus-billNo"
                placeholder="单据号"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item
              label="提货方式"
              prop="pickMethods"
              label-width="75px"
            >
              <ht-select
                v-model="searchForm.pickMethods"
                :options="store().deliveryTypeDictionary()"
                placeholder="提货方式"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户名称" prop="cooperatorName">
              <ht-autocomplete
                v-model="searchForm.cooperatorName"
                :fetch-suggestions="autocompleteSearchAllCustomers"
                :trigger-on-focus="false"
                clearable
                highlight-first-item
                placeholder="客户名称"
                class="switch-focus focus-cooperatorName"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="单据类型" prop="billTypes">
              <ht-select
                v-model="searchForm.billTypes"
                :options="billTypeOptions"
                placeholder="单据类型"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="支付方式" prop="enhancedSettlementTypes">
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
            <el-form-item label="运输方式" prop="transportMethods">
              <ht-select
                v-model="searchForm.transportMethods"
                :options="store().transportTypeDictionary()"
                placeholder="运输方式"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="发票类型" prop="invoiceTypes">
              <ht-select
                v-model="searchForm.invoiceTypes"
                :options="store().invoiceTypeDictionary()"
                placeholder="发票类型"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务员" prop="businessManId">
              <ht-autoselect
                v-model="searchForm.businessManId"
                :fetch-suggestions="searchLoadAllSalesMen"
                :trigger-on-focus="false"
                class="switch-focus focus-businessManId"
                placeholder="业务员"
                clearable
                remote
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="制单人" prop="createdBy">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :fetch-suggestions="
                  query => searchLoadAllCreatedMen(['XS', 'XT'], query)
                "
                :trigger-on-focus="false"
                class="switch-focus focus-createdBy"
                placeholder="制单人"
                remote
                clearable
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="包装方式" prop="packMethods">
              <ht-select
                v-model="searchForm.packMethods"
                :options="store().packingWayDictionary()"
                placeholder="包装方式"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="打印状态" prop="printStatus">
              <ht-select
                v-model="searchForm.printStatus"
                :options="printStatusOptions"
                placeholder="打印状态"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="审核状态" prop="auditStatuses">
              <ht-select
                v-model="searchForm.auditStatuses"
                :options="auditStatusesOptions"
                placeholder="审核状态"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="结算状态" prop="settlementStatus">
              <ht-select
                v-model="searchForm.settlementStatus"
                :options="settlementStatusOptions"
                placeholder="结算状态"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item prop="plateNumber" label="车牌号">
              <ht-input
                v-model="searchForm.plateNumber"
                minlength="7"
                maxlength="10"
                placeholder="车牌号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据备注" prop="remark">
              <ht-input
                v-model="searchForm.remark"
                class="switch-focus focus-remark"
                placeholder="单据备注"
                maxlength="100"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item class="placeholder-form-item">
              <span
                class="text-danger"
                style="cursor:pointer;float:right;"
                @click="openManualDialog"
              >
                <i class="el-icon-question"></i>如何使用销售查询
              </span>
              <!-- <br class="placeholder-form-item" /> -->
            </el-form-item>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                :disabled="!canHandleSearch"
                type="primary"
                size="mini"
                @click="searchHandle"
              >
                查询（F5）
              </el-button>
              <el-button
                :disabled="!canHandleSearch"
                type="primary"
                size="mini"
                @click="clearSearchForm"
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <div class="flex-container column-flex">
        <ht-tabs
          v-model="activeTab"
          :tabs="TABS"
          class="tabs-primary tabs-large"
          style="margin: 0"
        />
        <div
          v-if="activeTab === TABS[0].id"
          class="flex-container column-flex auto-block"
        >
          <ht-table
            :loading="tableLoading"
            :data="tableData"
            :columns="tablecolumns"
            :total="totalSize"
            :pagination="isShowedPagination"
            :summary-method="setTotals"
            :current-page="currentPage"
            :key-scope="keyScopes.table"
            :selected-rows.sync="selectedRows"
            :row-class-name="rowClassName"
            show-summary
            class="auto-block"
            setting-all-column
            show-table-setting
            height="calc(100% - 32px)"
            @hotkeysUp="handleKeyCode"
            @pageChange="pageChange"
            @sort-change="handleSortChange"
            @table-setting="handleTableSetting"
            @click.native.stop="setKeyScope(keyScopes.table)"
            @rowOperation="handleRowOperation"
          />
          <div style="margin: -32px 0 4px 4px; width: 115px">
            <el-button
              :disabled="!canExport"
              type="primary"
              size="mini"
              @click="exportTableVisible = true"
            >
              导出（Alt+D）
            </el-button>
          </div>
        </div>
        <SalesReturnSearchDetail
          v-if="activeTab === TABS[1].id"
          :activeTab.sync="activeTab"
          :tabs="TABS"
          :sum-search-header="fomateSearchForm()"
        />
      </div>
    </ht-card>
    <edit-columns
      :base-columns="defalutColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
      @show-pagination-change="handleIsShowedPagination"
    />
    <export-table
      :base-columns="defalutColumns"
      :default-data="tableData"
      :table-name="detailsName"
      :visible.sync="exportTableVisible"
      :end-export-func="outExoportHandle"
      file-name="销售及退货查询"
      is-end-export
    />
  </section>
</template>

<script>
import {
  reqSalesReturnSearchOutExport,
  reqSalesSearchBillsList
} from "@/api/sales/salesReturnSearch";
import { EditColumns, ExportTable } from "@/components/table";
import SalesReturnSearchDetail from "./components/sales-return-search-detail";
import debounce from "throttle-debounce/debounce";
import { dateFormat } from "@/utils/date";
import { baseDataMixin, searchMixin } from "@/mixins";
import { showBillDetail } from "@/components/table";
import { mapState, mapGetters } from "vuex";
import hotkeys from "hotkeys-js";
import { TABLE_SALES_SEARCH_LIST } from "../constants";
import eventBus from "@/event";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: 0,
  dateRange: [],
  companyIds: [],
  billTypes: [],
  enhancedSettlementTypes: [],
  invoiceTypes: [],
  pickMethods: [],
  transportMethods: [],
  packMethods: [],
  auditStatuses: [],
  printStatus: [],
  settlementStatus: [],
  plateNumber: ""
};
const TABS = [
  { id: 1, name: "汇总" },
  { id: 2, name: "明细" }
];

export default {
  name: "SalesReturnSearch",
  components: {
    EditColumns,
    ExportTable,
    SalesReturnSearchDetail
  },
  mixins: [searchMixin, baseDataMixin],
  data() {
    return {
      keyScopes: {
        form: Symbol("salesReturnSearchform"),
        table: Symbol("salesReturnSearchTable")
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      TABS,
      activeTab: TABS[0].id,
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      searchForm: {
        ...defaultSearchForm
      },
      dateTypeOptions: [
        { id: 0, name: "业务日期" },
        { id: 1, name: "制单日期" },
        { id: 2, name: "提交日期" },
        { id: 3, name: "财务日期" },
        { id: 4, name: "出库日期" },
        { id: 5, name: "结款日期" }
      ],
      billTypeOptions: [
        { id: "XS", name: "销售出库单" },
        { id: "XT", name: "销售退货单" }
      ],
      printStatusOptions: [
        { id: 1, name: "未打印" },
        { id: 2, name: "已打印" }
      ],
      auditStatusesOptions: [
        { id: 0, name: "库房未审" },
        { id: 1, name: "财务未审" },
        { id: 2, name: "库房已审" },
        { id: 3, name: "财务已审" }
      ],
      settlementStatusOptions: [
        { id: 1, name: "未结清" },
        { id: 2, name: "已结清" }
      ],
      tableLoading: false,
      currentPage: 1,
      totalSize: 0,
      sortParams: {},
      tableData: [],
      summaryTotals: {},
      selectedRows: [],
      tablecolumns: [],
      detailsName: TABLE_SALES_SEARCH_LIST.name,
      defalutColumns: TABLE_SALES_SEARCH_LIST.columns,
      exportTableVisible: false,
      editColumnsVisible: false,
      isShowedPagination: true
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/myCompnayInfo", ["myCompnayInfoData"]),
    ...mapGetters("admin/systemParams", ["sumQueryDefaultDateRange"]),
    ...mapState("admin/hasSearched", ["salesHasSearched"]),
    canHandleSearch() {
      return this.activeTab === TABS[0].id;
    },
    canExport() {
      return this.tableData.length !== 0 && this.hasBelongsPerm("export");
    }
  },
  watch: {
    activeTab(value) {
      if (value === TABS[0].id) {
        if (this.selectedRows.length) {
          this.setKeyScope(this.keyScopes.table);
        } else {
          this.setKeyScope(this.keyScopes.form);
          this.$nextTick(() => {
            this.updateFocusData({ initial: "focus-cooperatorName" });
          });
        }
        this.loadTableData();
      }
    },
    sumQueryDefaultDateRange(val) {
      defaultSearchForm.dateRange = val;
      this.searchForm.dateRange = val;
    }
  },
  mounted() {
    this.$store.commit(
      "admin/hasSearched/deactivateHasSearched",
      "salesHasSearched"
    );
    hotkeys(
      "up,down,left,right,f5,f6,alt+d",
      { scope: this.keyScopes.form },
      (e, handler) => {
        switch (e.code) {
          case "ArrowUp":
          case "ArrowDown":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          case "F5":
            this.searchHandle();
            break;
          case "F6":
            this.clearSearchForm();
            break;
          case "KeyD":
            if (e.altKey && this.canExport) this.exportTableVisible = true;
            break;
          default:
            return;
        }
      }
    );
    defaultSearchForm.dateRange = this.sumQueryDefaultDateRange;
    this.clearSearchForm();
    this.initSearchForm();
  },
  activated() {
    if (this.activeTab === TABS[0].id) {
      if (this.selectedRows.length) {
        this.setKeyScope(this.keyScopes.table);
      } else {
        this.setKeyScope(this.keyScopes.form);
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorName" });
        });
      }
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.form);
    hotkeys.deleteScope(this.keyScopes.table);
  },
  methods: {
    store() {
      return store;
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 54);
    },
    handleRowOperation(row) {
      showBillDetail(row.billType, row.billId);
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
          case "amountIn":
            sums[index] = this.summaryTotals["amountIn"];
            break;
          case "benefitAmount":
            sums[index] = this.summaryTotals["benefitAmount"];
            break;
          case "billAmount":
            sums[index] = getNoPricePermTips(this.summaryTotals["billAmount"]);
            break;
          case "qty":
            sums[index] = this.summaryTotals["qty"];
            break;
          case "realAmountIn":
            sums[index] = this.summaryTotals["realAmountIn"];
            break;
          case "taxAmount":
            sums[index] = this.summaryTotals["taxAmount"];
            break;
          case "taxedAmount":
            sums[index] = getNoPricePermTips(this.summaryTotals["taxedAmount"]);
            break;
          case "taxedGrossProfit":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["taxedGrossProfit"]
            );
            break;
          case "taxedPurchaseAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["taxedPurchaseAmount"]
            );
            break;
          case "unsettleAmount":
            sums[index] = this.summaryTotals["unsettleAmount"];
            break;
          case "untaxedAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["untaxedAmount"]
            );
            break;
          case "untaxedGrossProfit":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["untaxedGrossProfit"]
            );
            break;
          case "untaxedPurchaseAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["untaxedPurchaseAmount"]
            );
            break;
          default:
            break;
        }
      });
      return sums;
    },
    handleKeyCode(e) {
      switch (e.code) {
        case "F5":
          this.searchHandle();
          break;
        case "F6":
          this.clearSearchForm();
          break;
        case "KeyD":
          if (e.altKey) this.exportTableVisible = true;
          break;
        default:
          return;
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    ergodicSearchForm() {
      const keys = Object.keys(this.searchForm);
      return keys.some(item => {
        if (!["dateRange", "dateType"].includes(item)) {
          if (this.searchForm[item] instanceof Array) {
            return this.searchForm[item].length;
          } else {
            return this.searchForm[item];
          }
        }
      });
    },
    handleInputEnter() {
      if (this.ergodicSearchForm()) {
        this.searchHandle();
      } else {
        this.updateFocusData({ type: "down" });
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    async initSearchForm() {
      if (!store.allCompanies() || !store.allCompanies().length) {
        await this.$store.dispatch("admin/baseData/loadAllCompanies");
      }
      if (!this.myCompnayInfoData) {
        await this.$store.dispatch("admin/myCompnayInfo/loadAll");
      }
      const defaultCompany = store
        .allCompanies()
        .find(item => item.name === this.myCompnayInfoData.name);
      this.searchForm.companyIds = defaultCompany ? [defaultCompany.id] : [];
    },
    createTimeRangeChangeHandle(newValue) {
      this.searchForm.dateRange = newValue;
    },
    detailsColumnsChange(columns) {
      this.tablecolumns = [];
      this.$nextTick(() => {
        this.tablecolumns = columns;
      });
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    handleIsShowedPagination(value) {
      this.isShowedPagination = value;
    },
    fomateSearchForm() {
      this.searchForm.dateStart =
        this.searchForm.dateRange && this.searchForm.dateRange.length
          ? dateFormat(this.searchForm.dateRange[0])
          : undefined;
      this.searchForm.dateEnd =
        this.searchForm.dateRange && this.searchForm.dateRange.length
          ? dateFormat(this.searchForm.dateRange[1])
          : undefined;
      const parmas = {
        ...this.searchForm,
        cooperatorId: (
          this.searchedData.customers.find(
            item => item.name === this.searchForm.cooperatorName
          ) || {}
        ).id
      };
      parmas.companyIds =
        parmas.companyIds.length == (0 || store.allCompanies().length)
          ? undefined
          : parmas.companyIds;
      parmas.billTypes =
        parmas.billTypes.length == (0 || this.billTypeOptions.length)
          ? undefined
          : parmas.billTypes;
      parmas.enhancedSettlementTypes =
        parmas.enhancedSettlementTypes.length ==
        (0 || store.enhancedSettlementTypeDictionary().length)
          ? undefined
          : parmas.enhancedSettlementTypes;
      parmas.invoiceTypes =
        parmas.invoiceTypes.length ==
        (0 || store.invoiceTypeDictionary().length)
          ? undefined
          : parmas.invoiceTypes;
      parmas.pickMethods =
        parmas.pickMethods.length ==
        (0 || store.deliveryTypeDictionary().length)
          ? undefined
          : parmas.pickMethods;
      parmas.transportMethods =
        parmas.transportMethods.length ==
        (0 || store.transportTypeDictionary().length)
          ? undefined
          : parmas.transportMethods;
      parmas.packMethods =
        parmas.packMethods.length == (0 || store.packingWayDictionary().length)
          ? undefined
          : parmas.packMethods;
      parmas.auditStatuses =
        parmas.auditStatuses.length == (0 || this.auditStatusesOptions.length)
          ? undefined
          : parmas.auditStatuses;
      parmas.printStatus =
        parmas.printStatus.length == (0 || this.printStatusOptions.length)
          ? undefined
          : parmas.printStatus[0];
      parmas.settlementStatus =
        parmas.settlementStatus.length ==
        (0 || this.settlementStatusOptions.length)
          ? undefined
          : parmas.settlementStatus[0];
      return {
        ...parmas,
        ...this.sortParams,
        page: this.currentPage,
        pageSize: this.pageSize
      };
    },
    handleSortChange(sortParams) {
      this.sortParams = sortParams;
      this.loadTableData();
    },
    pageChange(page = 1) {
      this.currentPage = page;
      this.loadTableData();
    },
    loadTableData() {
      if (!this.salesHasSearched) {
        return;
      }

      this.tableLoading = true;
      this.searchForm.page = this.currentPage;
      this.searchForm.pageSize = this.pageSize;
      reqSalesSearchBillsList({
        ...this.fomateSearchForm(),
        isDetail: false,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableData = data.rows ? [...data.rows] : [];
          this.summaryTotals.amountIn = data.amountIn;
          this.summaryTotals.benefitAmount = data.benefitAmount;
          this.summaryTotals.billAmount = data.billAmount;
          this.summaryTotals.qty = data.qty;
          this.summaryTotals.realAmountIn = data.realAmountIn;
          this.summaryTotals.taxAmount = data.taxAmount;
          this.summaryTotals.taxedAmount = data.taxedAmount;
          this.summaryTotals.taxedGrossProfit = data.taxedGrossProfit;
          this.summaryTotals.taxedPurchaseAmount = data.taxedPurchaseAmount;
          this.summaryTotals.unsettleAmount = data.unsettleAmount;
          this.summaryTotals.untaxedAmount = data.untaxedAmount;
          this.summaryTotals.untaxedGrossProfit = data.untaxedGrossProfit;
          this.summaryTotals.untaxedPurchaseAmount = data.untaxedPurchaseAmount;

          this.totalSize = data.totalSize;
          this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    rowClassName({ row }) {
      let className = "";
      if (row.billType == "XT") {
        className += "row-font-danger";
      }
      return className;
    },
    outExoportHandle(sampleColums) {
      return reqSalesReturnSearchOutExport({
        ...this.fomateSearchForm(),
        columnsSettings: sampleColums
      });
    },
    searchHandle() {
      if (!this.canHandleSearch) return;
      this.$store.commit(
        "admin/hasSearched/activateHasSearched",
        "salesHasSearched"
      );
      this.pageChange();
    },
    clearSearchForm() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
