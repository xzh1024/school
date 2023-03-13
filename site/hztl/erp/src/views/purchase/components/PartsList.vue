<template>
  <div class="full-container">
    <ht-table
      ref="tableDom"
      v-bind="$attrs"
      v-on="$listeners"
      :data="relTableData"
      :pagination="isShowPagination"
      :current-page="page"
      :total="totalSize"
      :columns="tableFormatColumns"
      :loading="loading"
      :key-scope="keyScope"
      :selected-rows.sync="relSelectedRows"
      table-ref="tableDom"
      setting-all-column
      show-table-setting
      @pageChange="pageChangeHandle"
      @table-setting="handleTableSetting"
      @rowOperation="handleRowEdit"
      @sort-change="handleSortChange"
    />
    <edit-columns
      :base-columns="getBaseColumn"
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
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels";
import eventBus from "@/event";
import { mapState } from "vuex";
import { TABLE_PURCHASE_PART_LIST } from "../constants";
import { getPartDetailsAndStocks } from "@/api/base/search";
// import { getPartAttributes } from "@/api/parts";
import { EditColumns } from "@/components/table";
import hotkeys from "hotkeys-js";
import { TAG_TOOLTIP } from "@/constants";
import EpcSearchByCode, { controlsEnum } from "@/components/epc-search-by-code";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import SubstitutePartsBox from "@/components/substitute-parts-box";
import BrandPartsBox from "@/components/brand-parts-box";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";

const PART = "part";

export default {
  name: "PartsList",
  components: {
    EditColumns,
    AvaVehModels,
    EpcSearchByCode,
    EpcVehModelsBox,
    SubstitutePartsBox,
    BrandPartsBox
  },
  props: {
    keyScope: {
      type: [String, Symbol],
      default: Symbol()
    },
    canAdd: {
      type: Boolean,
      default: true
    },
    selectedRows: {
      type: Array,
      default() {
        return [];
      }
    },
    tableData: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: "CD"
    },
    isPlatform: Boolean,
    mode: {
      type: [Number, String]
    }
  },
  data() {
    return {
      isEpcSearch: false,
      searchParams: {},
      loading: false,
      epcLoading: false,
      totalSize: 0,
      page: 1,
      isShowPagination: false,
      editColumnsVisible: false,
      tableName: `${TABLE_PURCHASE_PART_LIST.name}_${this.type}`,
      baseTableColumns: TABLE_PURCHASE_PART_LIST.columns,
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
    tableFormatColumns() {
      const addHandle = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.addHandle(row);
      };
      const handlePartSwapChange = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.$emit("part-swap", { ...row });
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.$emit("part-detail-change", { ...row });
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      const showEpcSearchByCode = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcSearchByCodeVisible = true;
      };
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.epcType = Number(row.type);
        this.code = row.code;
        this.epcVehModelsBoxVisible = true;
      };
      const showSubstitutePartsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.brand = row.brand;
        this.code = row.code;
        this.substitutePartsBoxVisible = true;
      };
      const showBrandPartsBox = (row, e) => {
        e.stopPropagation();
        this.relSelectedRows = [row];
        hotkeys.setScope(this.keyScope);
        this.code = row.code;
        this.brandPartsBoxVisible = true;
      };
      return this.tablecolumns
        .filter(item => this.canAdd || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <el-tooltip placement="top" content="添加" enterable={false}>
                  <i
                    class="icon operation-icon icon-add-info"
                    on-click={e => addHandle(row, e)}
                  ></i>
                </el-tooltip>
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
    },
    getBaseColumn() {
      return this.baseTableColumns.filter(item => {
        if (this.mode === undefined) return true;
        switch (this.mode) {
          case 0:
            return true;
          case 1:
            return !(item.prop === "batchNo");
          case 2:
            return !(item.prop === "batchNo" || item.prop === "positionName");
          case 3:
            return !(
              item.prop === "batchNo" ||
              item.prop === "positionName" ||
              item.prop === "warehouseName"
            );
          default:
            return true;
        }
      });
    },
    relSelectedRows: {
      get() {
        return this.selectedRows;
      },
      set(value) {
        this.$emit("update:selectedRows", value);
      }
    },
    relTableData: {
      get() {
        return this.tableData;
      },
      set(value) {
        this.$emit("update:tableData", value);
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
      if (!this.relTableData.length) {
        return;
      }
      this.page = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, `${this.type}${PART}`);
      this.loadData();
    },
    loadData(mode) {
      this.loading = true;
      const _searchData = {
        ...this.searchParams,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort
      };
      if (mode !== undefined) {
        _searchData.mode = mode;
      }
      return getPartDetailsAndStocks(_searchData)
        .then(res => {
          this.totalSize = res.totalSize;
          this.relTableData = [];
          this.relSelectedRows = [];
          if (res.rows && res.rows.length) {
            this.relTableData = res.rows.map(item => ({
              ...item.part,
              ...item.stock,
              ...item.bill
            }));
            console.log(this.relTableData);
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
    handleRowEdit(row) {
      if (row.labels && row.labels.includes("无此商品")) {
        this.$confirm("配件不存在，是否新增？", "无查询结果提示")
          .then(() => {
            eventBus.$emit("direct-add-part", row);
          })
          .catch(() => {});
      } else {
        this.$emit("handle-row", row);
      }
    },
    addHandle(row) {
      if (row.labels && row.labels.includes("无此商品")) {
        this.$confirm("配件不存在，是否新增？", "无查询结果提示")
          .then(() => {
            eventBus.$emit("direct-add-part", row);
          })
          .catch(() => {});
      } else {
        this.$emit("on-add-data", row);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.full-container {
    width: 100%;
    height: 100%;
}
</style>
