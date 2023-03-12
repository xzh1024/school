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
          <el-col :span="5">
            <el-form-item label="配件编码" prop="code">
              <ht-input
                v-model="searchForm.code"
                class="switch-focus focus-code input-with-select"
                placeholder="配件编码"
                size="mini"
                @keyup.enter.native="debouncedHandleInputEnter"
              >
                <ht-select
                  slot="append"
                  v-model="searchForm.codePattern"
                  :clearable="false"
                  :options="PART_CODE_WAY"
                  class="code-pattern"
                />
              </ht-input>
            </el-form-item>
            <el-form-item label="配件名称" prop="name">
              <ht-autocomplete
                v-model="searchForm.name"
                :fetch-suggestions="autocompleteSearchPartName"
                :trigger-on-focus="false"
                class="switch-focus focus-name"
                placeholder="配件名称"
                highlight-first-item
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="配件品牌" prop="brand">
              <ht-autoselect
                v-model="searchForm.brand"
                :options="store().partBrandDictionary()"
                :trigger-on-focus="false"
                class="switch-focus focus-brand"
                placeholder="配件品牌"
                highlight-first-item
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="产地"
              prop="productionPlace"
              label-width="94px"
            >
              <ht-autoselect
                v-model="searchForm.productionPlace"
                :options="store().productionPlaceDictionary()"
                :trigger-on-focus="false"
                class="switch-focus focus-productionPlace"
                placeholder="产地"
                highlight-first-item
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item
              label="车型/适用车型"
              prop="vehModel"
              label-width="94px"
            >
              <ht-autocomplete
                v-model="searchForm.vehModel"
                :fetch-suggestions="autocompleteSearchVehModel"
                :trigger-on-focus="false"
                class="switch-focus focus-vehModel"
                placeholder="车型/适用车型"
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item
              label="配件分类"
              prop="categoryName"
              label-width="94px"
            >
              <ht-autoselect
                v-model="searchForm.categoryName"
                :fetch-suggestions="searchLoadCategory"
                remote
                filter-zero
                clearable
                :trigger-on-focus="false"
                highlight-first-item
                class="switch-focus focus-categoryName"
                placeholder="配件分类"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="规格" prop="model">
              <ht-input
                v-model="searchForm.model"
                class="switch-focus focus-model"
                placeholder="规格"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="配件性质" prop="property">
              <ht-autoselect
                v-model="searchForm.property"
                :options="store().propertyDictionary()"
                :trigger-on-focus="false"
                class="switch-focus focus-property"
                placeholder="配件性质"
                highlight-first-item
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="所属仓库" prop="warehouseId">
              <ht-autoselect
                v-model="searchForm.warehouseId"
                :options="store().administerWareHouse()"
                :trigger-on-focus="false"
                class="switch-focus focus-warehouseId"
                placeholder="所属仓库"
                filter-zero
                clearable
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属货位" prop="positionName">
              <ht-input
                v-model="searchForm.positionName"
                placeholder="所属货位"
                class="switch-focus focus-positionName"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="订单号" prop="orderBillNo">
              <ht-input
                v-model="searchForm.orderBillNo"
                class="switch-focus focus-orderBillNo"
                placeholder="订单号"
                @keyup.enter.native="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="明细备注" prop="detailRemark">
              <ht-input
                v-model="searchForm.detailRemark"
                class="switch-focus focus-detailRemark"
                placeholder="明细备注"
                @keyup.enter.native="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="原进货单号"
              prop="sourceBillNo"
              label-width="73px"
            >
              <ht-input
                v-model="searchForm.sourceBillNo"
                class="switch-focus focus-sourceBillNo"
                placeholder="原进货单号"
                @keyup.enter.native="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="clearSearchForm">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <div class="flex-container column-flex">
        <ht-table
          :loading="tableLoading"
          :data="tableData"
          :columns="tablecolumns"
          :total="totalSize"
          :summary-method="setTotals"
          :pagination="isShowedPagination"
          :current-page="currentPage"
          :key-scope="keyScopes.table"
          :selected-rows.sync="selectedRows"
          :row-class-name="rowClassName"
          height="calc(100% - 32px)"
          setting-all-column
          show-summary
          show-table-setting
          @hotkeysUp="handleKeyCode"
          @pageChange="pageChange"
          @table-setting="handleTableSetting"
          @click.native.stop="setKeyScope(keyScopes.table)"
        />
        <div style="margin: -32px 0 4px 4px; width: 300px">
          <el-button
            :disabled="!canExport"
            type="primary"
            size="mini"
            @click="exportTableVisible = true"
          >
            导出（Alt+D）
          </el-button>
          <el-button
            :disabled="!canShowPartDetailBox"
            type="primary"
            size="mini"
            @click="showPartDetailBox"
          >
            配件详情（F10）
          </el-button>
        </div>
      </div>
    </ht-card>
    <edit-columns
      :base-columns="defalutColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
      @show-pagination-change="value => (isShowedPagination = value)"
    />
    <export-table
      :base-columns="defalutColumns"
      :default-data="tableData"
      :table-name="detailsName"
      :visible.sync="exportTableVisible"
      :end-export-func="outExoportHandle"
      file-name="采购及退货查询明细"
      is-end-export
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
  </section>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import {
  reqPurchaseReturnSearchDetailList,
  reqPurchaseReturnSearchDetailOutExport
} from "@/api/purchase/purchaseReturnSearch";
// import { saleStorePositions, saleCleanStorePositions } from "@/api/store/positions";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import debounce from "throttle-debounce/debounce";
import { searchMixin } from "@/mixins";
import { EditColumns, ExportTable } from "@/components/table";
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { TABLE_PURCHASE_SEARCH_DETAIL_LIST } from "@/views/purchase/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TAG_TOOLTIP, PART_CODE_WAY } from "@/constants";
import * as store from "@/utils/store";

let oldKeyScope;
const defaultSearchForm = {
  isDetail: true,
  code: "",
  codePattern: 0,
  name: "",
  brand: "",
  productionPlace: "",
  vehModel: "",
  categoryName: "",
  model: "",
  property: "",
  warehouseId: null,
  positionName: null,
  orderBillNo: "",
  detailRemark: "",
  sourceBillNo: ""
};
const TYPE = "CGCX";

export default {
  name: "PurchaseReturnSearchDetail",
  components: {
    EditColumns,
    AvaVehModels,
    ExportTable,
    PartsDetailBox
  },
  mixins: [searchMixin],
  props: {
    sumSearchHeader: {
      type: Object,
      default() {
        return {
          dateRange: []
        };
      }
    },
    activeTab: {
      type: [String, Number],
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      keyScopes: {
        form: Symbol("purchaseReturnSearchDetailForm"),
        table: Symbol("purchaseReturnSearchDetailTable")
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      searchForm: {
        ...defaultSearchForm
      },
      PART_CODE_WAY,
      tableLoading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      summaryTotals: {},
      selectedRows: [],
      tablecolumns: [],
      detailsName: TABLE_PURCHASE_SEARCH_DETAIL_LIST.name,
      exportTableVisible: false,
      editColumnsVisible: false,
      isShowedPagination: true,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      partDetailBoxVisible: false,
      partId: null
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/hasSearched", ["purchaseHasSearched"]),
    defalutColumns() {
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.showPartDetailBox();
      };
      return TABLE_PURCHASE_SEARCH_DETAIL_LIST.columns.map(item => {
        if (item.type === "avaVehModels") {
          return {
            ...item,
            render: (value, row) => (
              <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
                查看
              </a>
            )
          };
        }
        if (item.prop === "labels") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {value && value.length
                  ? value.map(label => (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP[label]}</span>
                          {label === "图" ? (
                            <el-button
                              type="primary"
                              circle
                              size="mini"
                              on-click={e => handlePartDetailChange(row, e)}
                            >
                              {label}
                            </el-button>
                          ) : (
                            <span class="label-style">{label}</span>
                          )}
                        </el-tooltip>
                      </span>
                    ))
                  : null}
              </div>
            )
          };
        }
        return item;
      });
    },
    curActiveTab: {
      get() {
        return this.activeTab;
      },
      set(value) {
        this.$emit("update:activeTab", value);
      }
    },
    canExport() {
      return this.tableData.length !== 0 && this.hasBelongsPerm("export");
    },
    canShowPartDetailBox() {
      return !!this.selectedRows.length;
    }
  },
  watch: {
    curActiveTab: {
      handler(value) {
        if (value === this.tabs[1].id) {
          oldKeyScope = hotkeys.getScope();
          if (this.selectedRows.length) {
            this.setKeyScope(this.keyScopes.table);
          } else {
            this.setKeyScope(this.keyScopes.form);
            this.$nextTick(() => {
              this.updateFocusData({ initial: "focus-code" });
            });
          }
          this.initFormData();
          this.pageChange();
        } else {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys(
      "up,down,left,right,f5,f6,f10,alt+d",
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
          case "F10":
            this.showPartDetailBox();
            break;
          case "KeyD":
            if (e.altKey && this.canExport) this.exportTableVisible = true;
            break;
          default:
            return;
        }
      }
    );
  },
  activated() {
    if (this.curActiveTab === this.tabs[1].id) {
      if (this.selectedRows.length) {
        this.setKeyScope(this.keyScopes.table);
      } else {
        this.setKeyScope(this.keyScopes.form);
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-code" });
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
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "freight":
            sums[index] = this.summaryTotals["totalFreight"];
            break;
          case "purchaseAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["totalPurchaseAmount"]
            );
            break;
          case "qty":
            sums[index] = getNoPricePermTips(this.summaryTotals["totalQty"]);
            break;
          case "returnQty":
            sums[index] = this.summaryTotals["totalReturnQty"];
            break;
          case "stockinQty":
            sums[index] = this.summaryTotals["totalStockinQty"];
            break;
          case "taxAmount":
            sums[index] = this.summaryTotals["totalTaxAmount"];
            break;
          case "taxedAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["totalTaxedAmount"]
            );
            break;
          case "untaxedAmount":
            sums[index] = getNoPricePermTips(
              this.summaryTotals["totalUntaxedAmount"]
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
        case "F10":
          this.showPartDetailBox();
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
        if (item != "codePattern") {
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
    initFormData() {
      let localSearchForm = {};
      try {
        if (localStorage.search) {
          localSearchForm = JSON.parse(localStorage.search)[TYPE] || {};
        }
      } catch (e) {
        console.log(e);
      }
      this.searchForm = {
        ...defaultSearchForm,
        ...localSearchForm
      };
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
    pageChange(page = 1) {
      if (!this.purchaseHasSearched) {
        return;
      }

      this.currentPage = page;
      this.tableLoading = true;
      reqPurchaseReturnSearchDetailList({
        ...this.sumSearchHeader,
        ...this.searchForm,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableData = data.rows ? [...data.rows] : [];
          this.summaryTotals = data.totalInfo;
          this.totalSize = data.totalSize;
          this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });

      const localParams = { codePattern: this.searchForm.codePattern };
      localStorage.search = JSON.stringify({
        ...(localStorage.search ? JSON.parse(localStorage.search) : {}),
        [TYPE]: localParams
      });
    },
    rowClassName({ row }) {
      let className = "";
      if (row.billType === "CT") {
        className += "row-font-danger";
      }
      return className;
    },
    outExoportHandle(sampleColums) {
      return reqPurchaseReturnSearchDetailOutExport({
        ...this.searchForm,
        ...this.sumSearchHeader,
        isDetail: true,
        columnsSettings: sampleColums
      });
    },
    searchHandle() {
      this.$store.commit(
        "admin/hasSearched/activateHasSearched",
        "purchaseHasSearched"
      );
      this.pageChange();
    },
    clearSearchForm() {
      this.$refs["searchForm"].resetFields();
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partId = this.selectedRows[0].partId;
      this.partDetailBoxVisible = true;
    }
  }
};
</script>
