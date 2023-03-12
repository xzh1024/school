<script>
import { EPC_SEARCH_STOCK_DETAILS_TABLE } from "./constants";
import { resInitStocks } from "@/api/store/stocks";

export default {
  name: "StockDetails",
  props: {
    curData: {
      type: Object,
      required: true
    },
    searchStockParams: {
      type: Object,
      required: true
    }
  },
  watch: {
    searchStockParams: {
      handler(val) {
        if (val === this.curData) {
          this.loadData();
        }
      },
      immediate: true
    }
  },
  methods: {
    loadData() {
      if (!this.searchStockParams.partNumber && !this.searchStockParams.code) {
        return;
      }
      this.loading = true;
      resInitStocks({
        partCode:
          this.searchStockParams.partNumber || this.searchStockParams.code,
        flagProperty: true,
        flagLock: false,
        flagPart: true,
        flagWarehouseId: false,
        flagPositionId: false,
        flagBatchNo: false,
        flagOwnerCompanyId: false,
        flagSupplierId: false,
        qtyLimitType: 0,
        ageLimitType: 0
      })
        .then(res => {
          this.tableData = res.rows || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: EPC_SEARCH_STOCK_DETAILS_TABLE.name,
      tableColumns: EPC_SEARCH_STOCK_DETAILS_TABLE.columns
    };
  },

  render() {
    return (
      <ht-setting-table
        v-loading={this.loading}
        data={this.tableData}
        tableName={this.tableName}
        columns={this.tableColumns}
        disabledHotkeys
        style="height: 200px;"
      />
    );
  }
};
</script>
