<script>
import { mapState } from "vuex";
import { loadSalesStatsHistory } from "@/api/basketHistory";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export default {
  name: "SalesVolume",
  props: {
    partId: {
      type: [Number, String],
      default: null
    },
    keyScope: {
      type: [Symbol, String],
      default: Symbol("partHistorySalesVolume")
    }
  },
  data() {
    return {
      loading: false,
      searchData: {},
      page: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: "partHistorySalesVolume",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          label: "月份",
          prop: "month",
          width: 100
        },
        {
          label: "销量",
          prop: "saleQty",
          width: 70,
          type: "number",
          classNames: "padding-right"
        },
        {
          label: "平均售价",
          prop: "averagePrice",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        },
        {
          label: "最高售价",
          prop: "maxPrice",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        },
        {
          label: "最低售价",
          prop: "minPrice",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        }
      ]
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    partId() {
      this.tableData = [];
      if (this.partId) {
        this.loadData();
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onSearchChange(searchData) {
      this.searchData = { ...searchData };
    },
    loadData() {
      if (!this.partId) {
        return;
      }
      this.loading = true;
      loadSalesStatsHistory({
        partId: this.partId
      })
        .then(res => {
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
          this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
    }
  },
  render() {
    return (
      <div style="height: 100%;">
        <div class="container-box" style="height: calc(100% - 45px);">
          <ht-card no-padding class="auto-card">
            <ht-setting-table
              loading={this.loading}
              data={this.tableData}
              key-scope={this.keyScope}
              selected-rows={this.selectedRows}
              on={{
                "update:selectedRows": val => (this.selectedRows = val)
              }}
              table-name={this.tableName}
              columns={this.tableColumns}
              current-page={this.page}
              onPageChange={this.pageChange}
            />
          </ht-card>
        </div>
      </div>
    );
  }
};
</script>
