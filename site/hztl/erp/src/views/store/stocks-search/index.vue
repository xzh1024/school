<script>
import { hotkeyMixin } from "@/mixins";
import { SearchForm, StockDetail, SummaryTable } from "./components";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksHistoryDialog from "@/components/storage-detail/StorageStocksHistoryDialog";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";

const summaryTypes = [
  {
    name: "配件",
    isDisabled: true,
    file: "flagPart"
  },
  {
    name: "配件性质",
    file: "flagProperty"
  },
  {
    name: "仓库",
    file: "flagWarehouseId"
  },
  {
    name: "货位",
    file: "flagPositionId"
  },
  {
    name: "批次",
    file: "flagBatchNo"
  },
  {
    name: "货主",
    file: "flagOwnerCompanyId"
  },
  {
    name: "供应商",
    file: "flagSupplierId"
  }
];

const summaryFunc = [
  {
    name: "按配件汇总",
    value: "flagPart"
  },
  {
    name: "按货主汇总",
    value: "flagOwnerCompanyId"
  },
  {
    name: "按供应商汇总",
    value: "flagSupplierId"
  },
  {
    name: "按仓库汇总",
    value: "flagWarehouseId"
  },
  {
    name: "自定义汇总",
    value: "all"
  }
];
const TYPE = "KC";

export default {
  name: "StocksSearch",
  components: {
    AvaVehModels,
    PartsDetailBox,
    StorageStocksHistoryDialog,
    StorageStocksLockedDialog
  },
  mixins: [hotkeyMixin],
  data() {
    return {
      lockVisible: false,
      historyVisible: false,
      detailVisible: false,
      detailFilter: {},
      detailData: {},
      summaryTypesData: {
        flagPart: true,
        flagProperty: false,
        flagWarehouseId: false,
        flagPositionId: false,
        flagBatchNo: false,
        flagOwnerCompanyId: false,
        flagSupplierId: false
      },
      selectedRows: [],
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      partDetailBoxVisible: false,
      partId: null,
      summaryFun: summaryFunc[0].value,
      hasSearched: false
    };
  },
  computed: {
    summaryTableRef() {
      return this.$refs.summaryTable;
    },
    searchFormRef() {
      return this.$refs.searchForm;
    },
    canShowPartDetailBox() {
      return !!this.selectedRows.length;
    }
  },
  methods: {
    hanndleExportSum() {
      this.summaryTableRef.exportData();
    },
    searchSummaryData(summaryTypes, hasSearched) {
      this.hasSearched = hasSearched;
      if (summaryTypes) {
        this.summaryTypesData = { ...summaryTypes.summaryTypesData };
        this.chooseFunc(summaryTypes.value || this.summaryFun);
      }
    },
    setDetailFilter(row) {
      const params = {
        ...this.summaryTypesData
      };
      if (this.summaryTypesData.flagPart) {
        params.partId = row.partInfoId;
      }
      if (this.summaryTypesData.flagProperty) {
        params.property = row.property;
      }
      if (this.summaryTypesData.flagWarehouseId) {
        params.warehouseId = row.warehouseId;
      }
      if (this.summaryTypesData.flagPositionId) {
        params.positionId = row.positionId;
      }
      if (this.summaryTypesData.flagBatchNo) {
        params.batchNo = row.batchNo;
      }
      if (this.summaryTypesData.flagOwnerCompanyId) {
        params.ownerCompanyId = row.ownerCompanyId;
      }
      if (this.summaryTypesData.flagSupplierId) {
        params.supplierId = row.supplierId;
      }
      this.detailFilter = params;
    },
    showLockDilog(row) {
      if (row) {
        this.setDetailFilter(row);
        this.lockVisible = true;
      }
    },
    hanndleOpenDetail(row) {
      this.setDetailFilter(row);
      this.detailData = row;
      this.detailVisible = true;
    },
    handleOpenHistory(row) {
      this.setDetailFilter(row);
      this.historyVisible = true;
    },
    syncDetailVisible(value) {
      this.detailVisible = value;
    },
    handleDetailChange() {
      this.$message({
        type: "warning",
        message: "明细已更新，若要更新汇总统计请重新查询！",
        showClose: true
      });
    },
    handleRowsChange(rows) {
      this.selectedRows = rows || [];
    },
    viewAvaVehModels(row) {
      this.avaVehModelsPart = {
        id: row.partInfoId,
        code: row.partInfoCode
      };
      this.avaVehModelsVisible = true;
    },
    showPartDetailBox(row) {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partId = row.partId || row.partInfoId;
      this.partDetailBoxVisible = true;
    },
    chooseFunc(value) {
      this.summaryTableRef.currentPage = 1;
      this.summaryFun = value;
      if (this.summaryFun != "all") {
        this.summaryTypesData = {
          ...this.summaryTypesData,
          flagPart: true,
          flagProperty: false,
          flagWarehouseId: false,
          flagPositionId: false,
          flagBatchNo: false,
          flagOwnerCompanyId: false,
          flagSupplierId: false
        };
        this.summaryTypesData[value] = true;
      } else {
        this.summaryTypesData = {
          ...this.summaryTypesData,
          flagPart: true,
          flagProperty: true,
          flagWarehouseId: true,
          flagPositionId: true,
          flagBatchNo: true,
          flagOwnerCompanyId: true,
          flagSupplierId: true
        };
      }
    }
  },
  render() {
    return (
      <div class="stock-container flex-container column-flex">
        <div class="flex-block-bg flex-block-padding">
          <el-button
            type="primary"
            size="mini"
            disabled={!this.hasAutoPerm("export")}
            on-click={this.hanndleExportSum}
          >
            导出（Alt+D）
          </el-button>
          <el-button
            disabled={!this.canShowPartDetailBox}
            type="primary"
            size="mini"
            on-click={() => this.showPartDetailBox(this.selectedRows[0])}
          >
            配件详情（F10）
          </el-button>
          <el-button
            disabled={!this.selectedRows[0]}
            type="primary"
            size="mini"
            on-click={() => this.showLockDilog(this.selectedRows[0])}
          >
            锁定数明细
          </el-button>
        </div>
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <SearchForm
            on-search-data={this.searchSummaryData}
            ref="searchForm"
          />
        </div>
        <div class="auto-block flex-block-bg flex-block-margin flex-container column-flex">
          <div class="flex-block-padding">
            {summaryFunc.map(item => (
              <span
                class={`fun-block-padding ${
                  this.summaryFun === item.value ? "has-checked" : ""
                }`}
                on-click={() => this.chooseFunc(item.value)}
              >
                {item.name}
              </span>
            ))}
          </div>
          {this.summaryFun === "all" ? (
            <div style="margin: 0 0 10px 30px;">
              <span>汇总方式:&emsp;</span>
              {summaryTypes.map(item => (
                <el-checkbox
                  disabled={item.isDisabled}
                  v-model={this.summaryTypesData[item.file]}
                >
                  {item.name}
                </el-checkbox>
              ))}
            </div>
          ) : null}
          <SummaryTable
            class="auto-block"
            ref="summaryTable"
            summary-types={this.summaryTypesData}
            hasSearched={this.hasSearched}
            type={TYPE}
            tabType={this.summaryFun}
            on-rows-change={this.handleRowsChange}
            on-open-detail={this.hanndleOpenDetail}
            on-open-history={this.handleOpenHistory}
            on-view-ava-veh-models={this.viewAvaVehModels}
            on-handle-part-detail-change={this.showPartDetailBox}
          />
        </div>
        <StockDetail
          visible={this.detailVisible}
          summary-types={this.summaryTypesData}
          stock-summary={this.detailData}
          stock-filter={this.detailFilter}
          on={{
            "detail-change": this.handleDetailChange,
            "update:visible": this.syncDetailVisible
          }}
          type={TYPE}
        />
        <AvaVehModels
          visible={this.avaVehModelsVisible}
          part={this.avaVehModelsPart}
          on={{
            "update:visible": val => (this.avaVehModelsVisible = val)
          }}
        />
        <PartsDetailBox
          visible={this.partDetailBoxVisible}
          value={this.partId}
          on={{
            "update:visible": val => (this.partDetailBoxVisible = val)
          }}
        />
        <StorageStocksHistoryDialog
          visible={this.historyVisible}
          stock-filter={this.detailFilter}
          on-close={() => (this.historyVisible = false)}
        />
        <StorageStocksLockedDialog
          visible={this.lockVisible}
          stock-filter={this.detailFilter}
          on-close={() => (this.lockVisible = false)}
        />
      </div>
    );
  }
};
</script>
<style lang="scss" scoped>
.stock-container {
  padding-top: 5px;
}
.fun-block-padding {
  padding: 2px 20px;
  cursor: pointer;
}
</style>
