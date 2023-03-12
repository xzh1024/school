<script>
import { mapState } from "vuex";
import { precisionsFixed } from "@/mixins";
import EditStock from "@/components/edit-stock";
import { resInitStocksAggregate } from "@/api/store/stocks";
import { merge } from "lodash";
import StockPartLabelPrint from "./stock-part-label-print";
import {
  SUMMARY_TYPE_EMUN,
  TABLE_STOCKS_SEARCH_DETAIL_LIST
} from "./constants";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";

const DETAIL = "detail";
const summariesFiles = [
  "qty",
  "autoQty",
  "lockedQty",
  "taxedAllPrice",
  "untaxedAllPrice"
];

export default {
  components: { StockPartLabelPrint },
  mixins: [precisionsFixed],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    summaryTypes: {
      type: Object,
      required: true
    },
    stockSummary: {
      type: Object,
      required: true
    },
    stockFilter: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editStockData: {},
      hasUpdate: false,
      editVisible: false,
      loading: false,
      totalSize: null,
      tableData: [],
      currentPage: 1,
      selectedRows: [],
      tableName: TABLE_STOCKS_SEARCH_DETAIL_LIST.name,
      partLabelPrintVisible: false,
      sort: ""
    };
  },
  computed: {
    ...mapState("admin", {
      pageSize: state => state.table.pageSize
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.hasUpdate && this.$emit("detail-change");
        this.$emit("update:visible", value);
      }
    },
    columns() {
      const columns = TABLE_STOCKS_SEARCH_DETAIL_LIST.columns;

      const editStock = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.showEditDialog(row);
      };
      const printPartLabel = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.showPartLabelPrintDialog(row);
      };

      return columns
        .filter(
          item =>
            item.type !== "controls" ||
            this.canEditStock ||
            this.canPrintPartLabel
        )
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  {this.canEditStock && (
                    <el-tooltip
                      enterable={false}
                      placement="top"
                      content="编辑"
                    >
                      <span
                        class="icon operation-icon icon-edit-info"
                        on-click={e => editStock(row, e)}
                      />
                    </el-tooltip>
                  )}
                  {this.canPrintPartLabel && (
                    <el-tooltip
                      enterable={false}
                      placement="top"
                      content="打印配件标签"
                    >
                      <span
                        class="icon operation-icon icon-print-info"
                        on-click={e => printPartLabel(row, e)}
                      />
                    </el-tooltip>
                  )}
                </div>
              )
            };
          }
          return item;
        });
    },
    formList() {
      const list = [
        {
          name: "配件编码",
          file: "partInfoCode"
        },
        {
          name: "配件名称",
          file: "partInfoName"
        },
        {
          name: "配件品牌",
          file: "partInfoBrand"
        },
        {
          name: "产地",
          file: "partInfoProductionPlace"
        },
        {
          name: "性质",
          file: "property"
        },
        {
          name: "仓库",
          file: "warehouseName"
        },
        {
          name: "货位",
          file: "positionName"
        },
        {
          name: "批次号",
          file: "batchNo"
        },
        {
          name: "货主",
          file: "ownerCompanyName"
        },
        {
          name: "实际数",
          file: "qty"
        },
        {
          name: "动态数",
          file: "autoQty"
        },
        {
          name: "锁定数",
          file: "lockedQty"
        }
      ];
      return list.filter(item => {
        let flag = true;
        const type = SUMMARY_TYPE_EMUN[item.file];
        if (type) {
          flag = this.summaryTypes[type];
        }
        return flag;
      });
    },
    canEditStock() {
      return this.hasAutoPerm("update");
    },
    canPrintPartLabel() {
      return this.hasAutoPerm("labelPrint");
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.currentPage = 1;
        this.loadData();
      }
    }
  },
  mounted() {
    this.sort = getLocalTableSort(`${this.type}${DETAIL}`);
  },
  methods: {
    loadData() {
      this.loading = true;
      return resInitStocksAggregate({
        ...this.stockFilter,
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sort
      })
        .then(data => {
          if (data.rows && data.rows.length) {
            merge(this.stockSummary, {
              qty: data.totalInfo.totalQty,
              autoQty: data.totalInfo.totalAutoQty,
              taxedAllPrice: data.totalInfo.totalTaxedPrice,
              untaxedAllPrice: data.totalInfo.totalUntaxedPrice,
              lockedQty: this.precisionFormat(
                data.totalInfo.totalQty - data.totalInfo.totalAutoQty,
                "qty"
              )
            });
            this.tableData = data.rows || [];
          } else {
            this.tableData = [];
          }
          this.totalSize = data.totalSize;
          this.loading = false;
          let selectedIndex;
          let selectedRows = [];
          if (this.selectedRows && this.selectedRows.length) {
            selectedIndex = this.tableData.findIndex(
              item => item.stockId == this.selectedRows[0].stockId
            );
            if (selectedIndex >= 0) {
              selectedRows = [this.tableData[selectedIndex]];
            }
          }
          if (!selectedRows.length) {
            selectedRows = [this.tableData[0]];
          }
          this.selectedRows = selectedRows;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, `${this.type}${DETAIL}`);
      this.loadData();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    handleSelectChange(rows) {
      this.selectedRows = rows;
    },
    handleClose() {
      this.relVisible = false;
    },
    showEditDialog(row) {
      if (!this.canEditStock) {
        this.$message.error({
          message: "您暂无权限编辑库存明细！",
          showClose: true
        });
        return;
      }
      this.editStockData = {
        ...row,
        code: row.partInfoCode,
        name: row.partInfoName,
        brand: row.partInfoBrand,
        productionPlace: row.partInfoProductionPlace,
        id: row.stockId
      };
      this.editVisible = true;
    },
    syncEditVisible(value) {
      this.editVisible = value;
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
            sums[index] = this.stockSummary[key];
          }
        });
      });
      return sums;
    },
    handleUpdateSuccess() {
      this.hasUpdate = true;
      this.loadData();
    },
    showPartLabelPrintDialog() {
      if (!this.canPrintPartLabel) {
        return;
      }
      this.partLabelPrintVisible = true;
    }
  },
  render() {
    return (
      <ht-dialog
        title="库存明细"
        visible={this.relVisible}
        on-close={this.handleClose}
        width="1200px"
        top="7vh"
        class="ht-dialog-box"
      >
        <div class="flex-container">
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">汇总信息</div>
            <el-form
              v-model={this.stockSummary}
              show-message={false}
              size="mini"
              label-position="left"
              label-width="100px"
              class="search-box compact-form ignore-hotkeys"
            >
              {this.formList.map(item => (
                <el-form-item label={item.name} prop={item.file}>
                  <span title={this.stockSummary[item.file]} class="form-value">
                    {this.stockSummary[item.file]}
                  </span>
                </el-form-item>
              ))}
            </el-form>
          </div>
          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <div class="ht-page-title page-title-divider">库存明细</div>
            <ht-setting-table
              class="auto-block"
              v-loading={this.loading}
              pagination
              data={this.tableData}
              columns={this.columns}
              table-name={this.tableName}
              export-table-visible={this.exportVisible}
              end-export-func={this.exportHandle}
              selected-rows={this.selectedRows}
              on-selectChange={this.handleSelectChange}
              on-rowOperation={this.showEditDialog}
              total={this.totalSize}
              current-page={this.currentPage}
              on-pageChange={this.handlePageChange}
              show-summary
              summary-method={this.getSummaries}
              on-sort-change={this.handleSortChange}
            />
          </div>
        </div>

        <EditStock
          attrs={{
            stockData: this.editStockData,
            visible: this.editVisible,
            onlyModifyPrice: false
          }}
          canEditPurchasesPrices={this.canEditStock}
          canEditSalePrices={this.canEditStock}
          canEditStock={this.canEditStock}
          companyId={this.editStockData.ownerCompanyId}
          on={{
            "update:visible": this.syncEditVisible,
            "update-success": this.handleUpdateSuccess
          }}
        />
        <stock-part-label-print
          visible={this.partLabelPrintVisible}
          on-close={() => (this.partLabelPrintVisible = false)}
          partInfo={this.selectedRows[0]}
        />
      </ht-dialog>
    );
  }
};
</script>
