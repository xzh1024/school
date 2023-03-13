<template>
  <div class="container-box">
    <ht-card style="margin: 0 0 5px 0;">
      <el-form
        ref="searchForm"
        v-switch-focus="focusData"
        :model="searchForm"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
        label-position="left"
        @click.native.stop="setKeyScope(keyScopes.form)"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label-width="75px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="dateTypes"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range
                v-model="searchForm.billDate"
                shortcuts-type="all"
              />
            </el-form-item>
            <el-form-item label="业务单号" prop="billNo" label-width="75px">
              <ht-input
                v-model="searchForm.billNo"
                class="switch-focus focus-billNo"
                placeholder="业务单号"
                @keyup.enter.native="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="配件编码" prop="code" label-width="75px">
              <ht-input
                v-model="searchForm.code"
                class="switch-focus focus-code input-with-select"
                placeholder="配件编码"
                @keyup.enter.native="debouncedHandleInputEnter"
              >
                <ht-select
                  slot="append"
                  v-model="searchForm.codePattern"
                  :clearable="false"
                  :options="PART_CODE_WAY"
                  class="code-pattern"
                  placeholder
                />
              </ht-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="配件名称" prop="name">
              <ht-autocomplete
                v-model="searchForm.name"
                :fetch-suggestions="autocompleteSearchPartName"
                :trigger-on-focus="false"
                class="switch-focus focus-name"
                placeholder="配件名称"
                clearable
                highlight-first-item
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
                clearable
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="产地" prop="productionPlace">
              <ht-autoselect
                v-model="searchForm.productionPlace"
                :options="store().productionPlaceDictionary()"
                :trigger-on-focus="false"
                class="switch-focus focus-productionPlace"
                placeholder="产地"
                clearable
                highlight-first-item
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
            <el-form-item label="客户名称" prop="cooperatorId">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                remote
                clearable
                filter-zero
                highlight-first-item
                class="switch-focus focus-cooperatorId"
                placeholder="客户名称"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="需求来源" prop="sourcetypes">
              <ht-select
                v-model="searchForm.sourcetypes"
                :options="['销售订单', '采购建议']"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                clearable
                placeholder="需求来源"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="库存上下限"
              prop="stockLimits"
              label-width="75px"
            >
              <ht-select
                v-model="searchForm.stockLimits"
                :options="STOCK_LIMITS_OPTINS"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
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
          <el-col :span="3">
            <el-form-item label-width="0">
              <el-popover placement="top" width="500" trigger="click">
                <p>
                  在销售开单时，库存不足但该配件不是非常紧急需求的，可以转为需求处理。此时可在此页面选择添加需求配件订货，订货配件将加入采购篮中。
                </p>
                <span
                  slot="reference"
                  class="text-danger"
                  style="cursor:pointer;float:right"
                  ><i class="el-icon-question"></i>什么是需求处理</span
                >
              </el-popover>
              <!-- <br class="placeholder-form-item" /> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" style="margin: 0;" no-padding>
      <ht-table
        v-bind="$attrs"
        :loading="tableLoading"
        :data="relTableData"
        :selected-rows.sync="relSelectedRows"
        :pagination="isShowPagination"
        :total="totalSize"
        :columns="tableFormatColumns"
        :key-scope="keyScopes.table"
        :current-page.sync="currentPage"
        setting-all-column
        show-table-setting
        v-on="$listeners"
        @pageChange="pageChange"
        @rowOperation="addHandle"
        @table-setting="handleTableSetting"
      />
      <div style="margin: -32px 0 4px 4px; width: 300px">
        <el-button
          :disabled="!canShowPartDetailBox"
          type="primary"
          size="mini"
          @click="showPartDetailBox"
        >
          配件详情（F10）
        </el-button>
        <el-button
          :disabled="!relSelectedRows.length"
          type="primary"
          size="mini"
          @click="showStocksLockedBox"
        >
          锁定数明细
        </el-button>
      </div>
    </ht-card>

    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />

    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <EpcSearchByCode
      :visible.sync="epcSearchByCodeVisible"
      :code="code"
      :type="epcType"
      :controls="[controlsEnum.view]"
      useOutType
    />
    <EpcVehModelsBox
      :visible.sync="epcVehModelsBoxVisible"
      :code="code"
      :type="epcType"
    />
    <SubstitutePartsBox
      :visible.sync="substitutePartsBoxVisible"
      :code="code"
      :brand="brand"
    />
    <BrandPartsBox :visible.sync="brandPartsBoxVisible" :code="code" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      @close="storageStocksLockedVisible = false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import { dateFormat } from "@/utils/date";
import { reqPurchaseDemandsList } from "@/api/purchase/purchaseDemands";
import { EditColumns } from "@/components/table";
import debounce from "throttle-debounce/debounce";
import { searchMixin } from "@/mixins";
import hotkeys from "hotkeys-js";
import { TABLE_PURCHASE_DEMANDS_LIST } from "../constants";
import { STOCK_LIMITS_OPTINS, TAG_TOOLTIP, PART_CODE_WAY } from "@/constants";
// import { getPartAttributes } from "@/api/parts";
import AvaVehModels from "@/components/AvaVehModels";
import EpcSearchByCode, { controlsEnum } from "@/components/epc-search-by-code";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import SubstitutePartsBox from "@/components/substitute-parts-box";
import BrandPartsBox from "@/components/brand-parts-box";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: 1,
  billDate: [],
  billNo: "",
  code: "",
  codePattern: 0,
  name: "",
  brand: "",
  productionPlace: "",
  model: "",
  cooperatorId: null,
  sourcetypes: [],
  stockLimits: []
};
export default {
  name: "LocalDemands",
  components: {
    PartsDetailBox,
    StorageStocksLockedDialog,
    EditColumns,
    AvaVehModels,
    EpcSearchByCode,
    EpcVehModelsBox,
    SubstitutePartsBox,
    BrandPartsBox
  },
  mixins: [searchMixin],
  props: {
    keyScope: {
      type: [Symbol, String],
      default: Symbol("LocalDemands")
    },
    tableData: {
      type: Array,
      required: true
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keyScopes: {
        form: Symbol("localDemandsForm"),
        table: this.keyScope
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      searchForm: {
        ...defaultSearchForm
      },
      PART_CODE_WAY,
      dateTypes: [
        { id: 0, name: "业务日期" },
        { id: 1, name: "制单日期" }
      ],
      STOCK_LIMITS_OPTINS,
      currentPage: 1,
      totalSize: 0,
      isShowPagination: true,
      editColumnsVisible: false,
      tableLoading: false,
      tableName: TABLE_PURCHASE_DEMANDS_LIST.name,
      tableColumns: [],
      baseTableColumns: TABLE_PURCHASE_DEMANDS_LIST.columns,
      partId: null,
      partDetailBoxVisible: false,
      epcLoading: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      epcSearchByCodeVisible: false,
      controlsEnum,
      code: "",
      epcType: 0,
      epcVehModelsBoxVisible: false,
      substitutePartsBoxVisible: false,
      brand: "",
      brandPartsBoxVisible: false,
      storageStocksLockedVisible: false,
      stockFilter: {}
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/user", {
      myCompanyId: state => state.userInfoMsg.companyId
    }),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    tableFormatColumns() {
      const addHandle = (row, e) => {
        e.stopPropagation();
        hotkeys.setScope(this.keyScopes.form);
        this.addHandle(row);
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.showPartDetailBox();
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      const showEpcSearchByCode = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcSearchByCodeVisible = true;
      };
      const showBrandPartsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.code = row.code;
        this.brandPartsBoxVisible = true;
      };
      const showSubstitutePartsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.brand = row.brand;
        this.code = row.code;
        this.substitutePartsBoxVisible = true;
      };
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcVehModelsBoxVisible = true;
      };
      return this.tableColumns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value, row) =>
              this.canAddBasket ? (
                <el-tooltip placement="top" content="添加" enterable={false}>
                  <i
                    class="icon operation-icon icon-add-info"
                    on-click={e => addHandle(row, e)}
                  ></i>
                </el-tooltip>
              ) : null
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
        if (item.type === "avaVehModels") {
          return {
            ...item,
            render: (value, row) =>
              !this.isPlatform &&
              (!row.labels ||
                !row.labels.length ||
                !row.labels.includes("无此商品")) ? (
                <a
                  onClick={e => viewAvaVehModels(row, e)}
                  class="ht-link text-font-primary"
                >
                  查看
                </a>
              ) : null
          };
        }
        if (item.prop === "dwg") {
          return {
            ...item,
            render: (value, row) =>
              row.type === "0" ? (
                <div v-loading={this.epcLoading}>
                  <a
                    onClick={e => showEpcSearchByCode(row, e)}
                    class="ht-link text-font-primary"
                  >
                    查看装配图
                  </a>
                </div>
              ) : null
          };
        }
        if (item.prop === "epcRemark") {
          return {
            ...item,
            render: (value, row) => (
              <div v-loading={this.epcLoading}>
                {this.epcLoading ? (
                  <div>正在加载...</div>
                ) : (
                  <div>
                    {row.brandParts === "1" ? (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP["品"]}</span>
                          <el-button
                            type="primary"
                            circle
                            size="mini"
                            onClick={e => showBrandPartsBox(row, e)}
                          >
                            {"品"}
                          </el-button>
                        </el-tooltip>
                      </span>
                    ) : null}
                    {row.substituteParts === "1" ? (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP["替"]}</span>
                          <el-button
                            type="primary"
                            circle
                            size="mini"
                            onClick={e => showSubstitutePartsBox(row, e)}
                          >
                            {"替"}
                          </el-button>
                        </el-tooltip>
                      </span>
                    ) : null}
                    {row.vehModels === "1" ? (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP["适"]}</span>
                          <el-button
                            type="primary"
                            circle
                            size="mini"
                            onClick={e => showEpcVehModelsBox(row, e)}
                          >
                            {"适"}
                          </el-button>
                        </el-tooltip>
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            )
          };
        }
        return item;
      });
    },
    relTableData: {
      get() {
        return this.tableData;
      },
      set(value) {
        this.$emit("update:tableData", [...value]);
      }
    },
    relSelectedRows: {
      get() {
        return this.selectedRows;
      },
      set(value) {
        this.$emit("update:selectedRows", value);
      }
    },
    canAddBasket() {
      return (
        this.relSelectedRows.length === 1 &&
        this.hasBelongsPerm("update", this.relSelectedRows[0].belongs)
      );
    },
    canShowPartDetailBox() {
      return this.relSelectedRows.length === 1;
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    hotkeys(
      "f5,f6,f10,up,down",
      { scope: this.keyScopes.form },
      (e, handler) => {
        switch (handler.key) {
          case "f5":
            this.searchHandle();
            break;
          case "f6":
            this.clearSearchForm();
            break;
          case "f10":
            this.showPartDetailBox();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          default:
        }
      }
    );
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    this.clearSearchForm();
    this.searchHandle();
  },
  activated() {
    if (!this.relTableData.length) {
      hotkeys.setScope(this.keyScopes.form);
      this.$nextTick(() => {
        this.updateFocusData({ initial: "focus-billNo" });
      });
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.form);
  },
  methods: {
    store() {
      return store;
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
    setKeyScope(keyScope) {
      this.relSelectedRows = [];
      hotkeys.setScope(keyScope);
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    searchHandle() {
      this.pageChange(1);
    },
    pageChange(page = this.currentPage) {
      const searchData = { ...this.searchForm };
      if (searchData.billDate && searchData.billDate.length) {
        searchData.fromdate = dateFormat(searchData.billDate[0]);
        searchData.todate = dateFormat(searchData.billDate[1]);
        searchData.billDate = undefined;
      }
      if (!this.searchForm.sourcetypes || !this.searchForm.sourcetypes.length) {
        searchData.sourcetype = "全部";
      } else if (this.searchForm.sourcetypes.includes("全部")) {
        searchData.sourcetype = "全部";
      } else if (this.searchForm.sourcetypes.includes("采购建议")) {
        searchData.sourcetype = "采购建议";
      } else if (this.searchForm.sourcetypes.includes("销售订单")) {
        searchData.sourcetype = "销售订单";
      }
      this.tableLoading = true;
      reqPurchaseDemandsList({
        ...searchData,
        page,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableLoading = false;
          this.relTableData = res.rows || [];
          this.totalSize = res.totalSize;
          // if (res.rows && res.rows.length) {
          //   this.loadEpcRemark(res.rows);
          // }
          if (this.relTableData.length) {
            this.updateFocusData({ initial: null });
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    // loadEpcRemark(rows) {
    //   this.epcLoading = true;
    //   const parmas = {};
    //   rows.forEach(item => {
    //     if (parmas[item.brand]) {
    //       parmas[item.brand] = {
    //         ...parmas[item.brand],
    //         [item.code]: 1
    //       };
    //     } else {
    //       parmas[item.brand] = { [item.code]: 1 };
    //     }
    //   });
    //   getPartAttributes({ brand2Codes: parmas })
    //     .then(res => {
    //       this.relTableData = rows.map(item => {
    //         const newItem = {
    //           ...item,
    //           type: res[item.brand]
    //             ? res[item.brand][item.code]
    //               ? res[item.brand][item.code].type
    //               : undefined
    //             : undefined,
    //           brandParts: res[item.brand]
    //             ? res[item.brand][item.code]
    //               ? res[item.brand][item.code].brandParts
    //               : undefined
    //             : undefined,
    //           substituteParts: res[item.brand]
    //             ? res[item.brand][item.code]
    //               ? res[item.brand][item.code].substituteParts
    //               : undefined
    //             : undefined,
    //           vehModels: res[item.brand]
    //             ? res[item.brand][item.code]
    //               ? res[item.brand][item.code].vehModels
    //               : undefined
    //             : undefined
    //         };
    //         return newItem;
    //       });
    //       this.epcLoading = false;
    //     })
    //     .catch(() => {
    //       this.epcLoading = false;
    //     });
    // },
    clearSearchForm() {
      this.searchForm = { ...defaultSearchForm };
    },
    addHandle(row) {
      this.relSelectedRows = [row];
      if (!this.canAddBasket) {
        this.$message.error({
          message: "您没有权限添加该配件到采购篮，请重新选择！",
          showClose: true
        });
        return;
      } else {
        this.$emit("on-add-data", { ...row });
      }
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partId = this.relSelectedRows[0].partId;
      this.partDetailBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.relSelectedRows.length) {
        return;
      }
      this.stockFilter = {
        partId: this.relSelectedRows[0].partId,
        ownerCompanyId: this.myCompanyId
      };
      this.storageStocksLockedVisible = true;
    }
  }
};
</script>
