<script>
import { mapState } from "vuex";
import { precisionsFixed } from "@/mixins";
import { resInitStocks, stocksDetailsExport } from "@/api/store/stocks";
import { SUMMARY_TYPE_LIST, TABLE_STOCKS_SEARCH_SUM_LIST } from "./constants";
import { TAG_TOOLTIP } from "@/constants";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { postSettingsTables } from "@/api/setting";

const SUM = "summary";
const summariesFiles = [
  "qty",
  "autoQty",
  "lockedQty",
  "taxedAllPrice",
  "untaxedAllPrice"
];

export default {
  mixins: [precisionsFixed],
  props: {
    summaryTypes: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    tabType: {
      type: String
    },
    hasSearched: Boolean
  },
  data() {
    return {
      loading: false,
      exportVisible: false,
      totalSize: null,
      tableData: [],
      totals: {},
      currentPage: 1,
      selectedRows: [],
      tableName: TABLE_STOCKS_SEARCH_SUM_LIST.name,
      hideColumns: [
        "property",
        "batchNo",
        "ownerCompanyName",
        "supplierName",
        "warehouseName",
        "positionName"
      ],
      sort: ""
    };
  },
  computed: {
    ...mapState("admin", {
      pageSize: state => state.table.pageSize
    }),
    columns() {
      const columns = TABLE_STOCKS_SEARCH_SUM_LIST.columns;

      const openDetail = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.openDetail(row);
      };
      const openHistory = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("open-history", row);
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("view-ava-veh-models", row);
      };
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.$emit("handle-part-detail-change", row);
      };
      return columns
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-button
                    size="mini"
                    type="text"
                    on-click={e => openDetail(row, e)}
                  >
                    查看明细
                  </el-button>

                  <el-button
                    size="mini"
                    type="text"
                    on-click={e => openHistory(row, e)}
                  >
                    查看历史
                  </el-button>
                </div>
              )
            };
          }
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
          if (this.hideColumns.some(column => column === item.prop)) {
            item.forcedHide = true;
          } else {
            item.forcedHide = false;
          }
          return item;
        })
        .filter(item => {
          return !this.hideColumns.some(column => column === item.prop);
        });
    }
  },
  watch: {
    summaryTypes: {
      deep: true,
      async handler() {
        this.hideColumns = [
          "property",
          "batchNo",
          "ownerCompanyName",
          "supplierName",
          "warehouseName",
          "positionName"
        ];
        SUMMARY_TYPE_LIST.forEach(item => {
          this.deleteHideCloumns(item.type, item.value);
        });
        this.loadData();
      }
    },
    selectedRows(rows) {
      this.$emit("rows-change", rows);
    }
  },
  mounted() {
    this.sort = getLocalTableSort(`${this.type}${SUM}`);
  },
  methods: {
    async setSettingsTables(columns) {
      await postSettingsTables({
        name: `${this.tableName}-${this.tabType}`,
        columnsSettings: columns,
        isShowedPagination: true
      });
    },
    //删除不展示字段
    deleteHideCloumns(type, value) {
      if (this.summaryTypes[type]) {
        const index = this.hideColumns.findIndex(item => item === value);
        this.hideColumns.splice(index, 1);
      }
    },
    // 外部调用
    exportData() {
      this.exportVisible = true;
    },
    // 外部调用
    searchData(filterData) {
      this.filterData = filterData;
      this.handlePageChange(1);
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      if (!this.hasSearched) {
        return;
      }

      this.loading = true;
      return resInitStocks({
        ...this.filterData,
        ...this.summaryTypes,
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sort
      })
        .then(res => {
          if (res.rows && res.rows.length) {
            this.totals = {
              qty: res.totalInfo.totalQty,
              autoQty: res.totalInfo.totalAutoQty,
              taxedAllPrice: res.totalInfo.totalTaxedPrice,
              untaxedAllPrice: res.totalInfo.totalUntaxedPrice,
              lockedQty: this.precisionFormat(
                res.totalInfo.totalQty - res.totalInfo.totalAutoQty,
                "qty"
              )
            };
            this.tableData = res.rows || [];
          } else {
            this.tableData = [];
            this.totals = {};
          }
          this.totalSize = res.totalSize;
          this.selectedRows = this.tableData[0] ? [this.tableData[0]] : [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, `${this.type}${SUM}`);
      this.loadData();
    },
    openDetail(row) {
      this.$emit("open-detail", row);
    },
    handleSelectChange(rows) {
      this.selectedRows = rows;
    },
    syncExportVisible(value) {
      this.exportVisible = value;
    },
    exportHandle(sampleColums) {
      return stocksDetailsExport({
        searchParam: {
          ...this.filterData,
          ...this.summaryTypes
        },
        isExportDetail: false,
        columnsSettings: sampleColums
      });
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        summariesFiles.forEach(key => {
          if (column.property === key) {
            sums[index] = this.totals[key];
          }
        });
      });
      return sums;
    }
  },
  render() {
    return (
      <ht-setting-table
        v-loading={this.loading}
        pagination
        data={this.tableData}
        columns={this.columns}
        table-name={`${this.tableName}-${this.tabType}`}
        file-name={`库存汇总`}
        export-table-visible={this.exportVisible}
        end-export-func={this.exportHandle}
        selected-rows={this.selectedRows}
        on-selectChange={this.handleSelectChange}
        on-rowOperation={this.openDetail}
        total={this.totalSize}
        current-page={this.currentPage}
        on-pageChange={this.handlePageChange}
        on={{
          "update:exportTableVisible": this.syncExportVisible
        }}
        show-summary
        summary-method={param => this.getSummaries(param)}
        on-sort-change={this.handleSortChange}
      />
    );
  }
};
</script>
