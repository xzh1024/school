<template>
  <ht-card no-padding class="auto-card">
    <ht-table
      ref="tableDom"
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      :table-name="tableName"
      :selected-rows.sync="selectedRows"
      :loading="loading"
      :pagination="isShowPagination"
      :current-page="page"
      :total="totalSize"
      :columns="tableFormatColumns"
      :key-scope="keyScope"
      table-ref="tableDom"
      setting-all-column
      show-table-setting
      @pageChange="pageChangeHandle"
      @hotkeysUp="handleKeyCode"
      @selectChange="handleSelectChange"
      @rowOperation="addHandle"
      @table-setting="handleTableSetting"
      @click.native.stop="handleSetPartScope"
      @sort-change="handleSortChange"
    />
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />

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
  </ht-card>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels";
import eventBus from "@/event";
import { mapState } from "vuex";
import { TABLE_SALES_PART_LIST } from "@/views/sales/constants";
// import { getPartAttributes } from "@/api/parts";
import { EditColumns } from "@/components/table";
import { getExtraColumns } from "@/views/sales/util/extraColumns";
import { TAG_TOOLTIP } from "@/constants";
import EpcSearchByCode, { controlsEnum } from "@/components/epc-search-by-code";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import SubstitutePartsBox from "@/components/substitute-parts-box";
import BrandPartsBox from "@/components/brand-parts-box";
import { getPartDetailsAndStocks } from "@/api/base/search";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";

const PART = "part";

export default {
  name: "PartsTable",
  components: {
    EditColumns,
    AvaVehModels,
    EpcSearchByCode,
    EpcVehModelsBox,
    SubstitutePartsBox,
    BrandPartsBox
  },
  props: {
    canAdd: {
      type: Boolean
    },
    isPlatform: Boolean,
    isBatchSearch: {
      type: Boolean,
      default: false
    },
    keyScope: {
      type: [String, Symbol],
      default: Symbol()
    },
    searchInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    type: {
      type: String,
      default: "XD"
    },
    mode: {
      type: [String, Number],
      default: 0
    },
    companyId: {
      type: [String, Number]
    },
    isSalesBilling: {
      type: Boolean,
      default: false
    },
    isKB: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEpcSearch: false,
      loading: false,
      epcLoading: false,
      showEditStock: false,
      stockData: {},
      totalSize: 0,
      searchParams: {},
      tableData: [],
      page: 1,
      selectedRows: [],
      cacheSelectedRows: [],
      columns: [],
      curAddData: {},
      editSalesDialog: false,
      isShowPagination: false,
      editColumnsVisible: false,
      tableName: `${TABLE_SALES_PART_LIST.name}_${this.type}`,
      tablecolumns: [],
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
      cacheRoutePath: "",
      sort: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/user", {
      myCompanyId: state => state.userInfoMsg.companyId
    }),
    baseTableColumns() {
      const baseTableColumns = [...TABLE_SALES_PART_LIST.columns];
      if (this.type === "XS") {
        baseTableColumns.splice(11, 0, ...getExtraColumns(this.mode));
      }
      return baseTableColumns;
    },
    tableFormatColumns() {
      const addHandle = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.addHandle(row);
      };
      const handlePartSwapChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.$emit("part-swap", { ...row });
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.$emit("part-detail-change", { ...row });
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      const showEpcSearchByCode = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcSearchByCodeVisible = true;
      };
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcVehModelsBoxVisible = true;
      };
      const showSubstitutePartsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.brand = row.brand;
        this.code = row.code;
        this.substitutePartsBoxVisible = true;
      };
      const showBrandPartsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handleSelectRow", this.selectedRows);
        this.code = row.code;
        this.brandPartsBoxVisible = true;
      };
      return this.tablecolumns
        .filter(item => this.canAdd || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => {
                //跨公司的判断，货主公司id存在 且大于0，且货主公司id不等于公司id
                const isCorssSale =
                  //不是客户订货开单，这个组件客户订货也用到了
                  !this.isSalesBilling &&
                  //不是快速报价
                  !this.isKB &&
                  row.ownerCompanyId &&
                  Number(row.ownerCompanyId || 0) > 0 &&
                  row.ownerCompanyId != this.companyId;
                //跨公司且动态数量小于等于0 禁用
                const disable = isCorssSale && Number(row.dynaQty || 0) <= 0;
                return (
                  <el-tooltip placement="top" content="添加" enterable={false}>
                    <i
                      class={
                        disable
                          ? "icon operation-icon icon-add-info disable"
                          : "icon operation-icon icon-add-info "
                      }
                      on-click={e => addHandle(row, e)}
                    ></i>
                  </el-tooltip>
                );
              }
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
                            {label === "互" ? (
                              <el-button
                                type="primary"
                                circle
                                size="mini"
                                on-click={e => handlePartSwapChange(row, e)}
                              >
                                {label}
                              </el-button>
                            ) : label === "图" ? (
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
    }
  },
  watch: {
    tableData(arr) {
      if (arr && arr.length) {
        this.$emit("hasLength", true);
      } else {
        this.$emit("hasLength", false);
      }
    }
  },
  mounted() {
    eventBus.$on("quickAddPartRes", this.handleQuickAddPartRes);
    eventBus.$on("epc-search", this.handleEpcSearch);
    this.sort = getLocalTableSort(`${this.type}${PART}`);
  },
  activated() {
    this.cacheRoutePath = this.$route.path;
  },
  beforeDestroy() {
    eventBus.$off("quickAddPartRes", this.handleQuickAddPartRes);
    eventBus.$off("epc-search", this.handleEpcSearch);
  },
  methods: {
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
      this.$emit("handleKeyCode", e);
    },
    cleanSelectedRows() {
      this.selectedRows = [];
    },
    clear() {
      this.tableData = [];
      this.totalSize = 0;
      this.$forceUpdate();
    },
    handleSetSelectRow() {
      this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
      this.$emit("handleSelectRow", this.selectedRows);
    },
    handleSelectChange(row) {
      this.$emit("handleSelectRow", row);
    },
    handleQuickAddPartRes(params, path) {
      if (this.cacheRoutePath !== path) {
        return;
      }
      if (this.isEpcSearch) {
        this.handleEpcSearch(this.searchParams, path);
      } else {
        this.handleLocalSearch(
          this.searchParams.fields &&
            this.searchParams.fields.bookQties &&
            this.searchParams.fields.bookQties.length
            ? this.searchParams
            : { condsBeforeAgg: { parts: params } }
        );
      }
    },
    pageChangeHandle(page) {
      this.page = page;
      this.loadData();
    },
    handleLocalSearch(parmas = this.searchParams) {
      this.page = 1;
      this.searchParams = parmas;
      this.isEpcSearch = false;
      this.loadData();
    },
    handleEpcSearch(parmas, path) {
      if (this.cacheRoutePath !== path) {
        return;
      }
      this.searchParams = parmas;
      this.page = 1;
      this.isEpcSearch = true;
      this.loadData();
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.page = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, `${this.type}${PART}`);
      this.loadData();
    },
    loadData() {
      this.loading = true;
      return getPartDetailsAndStocks({
        mode: this.searchParams.type === "XS" ? this.mode || 0 : 3,
        ...this.searchParams,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort
      })
        .then(res => {
          this.totalSize = res.totalSize;
          this.tableData = [];
          this.selectedRows = [];
          if (res.rows && res.rows.length) {
            this.tableData = res.rows.map(item => ({
              ...item.part,
              ...item.stock,
              ...item.bill
            }));
            this.selectedRows = this.tableData.length
              ? [this.tableData[0]]
              : [];
            // this.loadEpcRemark(
            //   res.rows.map(item => ({
            //     ...item.part,
            //     ...item.stock,
            //     ...item.bill
            //   }))
            // );
          } else if (res.partNotExist) {
            eventBus.$emit("no-match-part", this.searchParams);
          }
          this.$emit("getPartsTableData", this.tableData);
          this.$emit("handleSelectRow", this.selectedRows);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
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
    //       this.tableData = rows.map(item => {
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
    //       this.$emit("getPartsTableData", this.tableData);
    //       this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
    //       this.$emit("handleSelectRow", this.selectedRows);
    //       this.epcLoading = false;
    //     })
    //     .catch(() => {
    //       this.epcLoading = false;
    //     });
    // },
    handleSetPartScope() {
      this.$emit("handleSetPartScope");
    },
    setCacheSelectRows() {
      if (this.selectedRows.length) {
        this.cacheSelectedRows = [...this.selectedRows];
      }
    },
    getCacheSelectRows() {
      this.selectedRows = this.cacheSelectedRows.length
        ? [...this.cacheSelectedRows]
        : [this.tableData[0]];
      this.$emit("handleSelectRow", this.selectedRows);
    },
    addHandle(row) {
      //跨公司的判断，货主公司id存在 且大于0，且货主公司id不等于公司id
      const isCorssSale =
        //不是客户订货开单，这个组件客户订货也用到了
        !this.isSalesBilling &&
        //不是快速报价
        !this.isKB &&
        row.ownerCompanyId &&
        Number(row.ownerCompanyId || 0) > 0 &&
        row.ownerCompanyId != this.companyId;
      //跨公司且动态数量小于等于0 禁用
      const disable = isCorssSale && Number(row.dynaQty || 0) <= 0;
      if (disable) {
        this.$message.warning({
          message: "该配件库存不足，无法新增配件",
          showClose: true
        });
        return;
      }
      if (!this.canAdd) {
        this.$message.warning({
          message: "当前状态不能新增配件",
          showClose: true
        });
        return;
      }
      if (row.labels && row.labels.includes("无此商品")) {
        this.$confirm("配件不存在，是否新增？", "无查询结果提示")
          .then(() => {
            eventBus.$emit("direct-add-part", row);
          })
          .catch(() => {});
      } else {
        if (this.searchInfo.cooperatorId) {
          this.$emit("on-add", row, "add");
        } else {
          if (this.type !== "KB") {
            this.$message.warning({
              message: "请选择客户名称",
              showClose: true
            });
          }
          eventBus.$emit("showCreateBill", row, true);
          this.$emit("on-add-data", row);
          this.$emit("updateFocusIndex");
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.icon.disable{
  filter: grayscale(1);
  cursor: not-allowed;
}
.right-click-div {
    position: fixed;
    height: 40px;
    line-height: 40px;
    width: 100px;
    border-radius: 5px;
    background: #ffffff;
    z-index: 9;
    cursor: pointer;
    color: #333333;
    font-size: 13px;
    text-align: center;
}
</style>
