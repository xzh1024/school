<script>
import { mapState } from "vuex";
import { loadStorageList } from "@/api/basketHistory";
import { CELL_WIDTH } from "@/constants";

export default {
  name: "Storage",
  props: {
    partId: {
      type: [Number, String],
      default: null
    },
    companyId: {
      type: [Number, String],
      default: null
    },
    keyScope: {
      type: [Symbol, String],
      default: Symbol("partHistoryStockDetail")
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalSize: 0,
      tableData: [],
      tableName: "partHistoryStockDetail",
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
          label: "所在仓库",
          prop: "warehouseName",
          width: CELL_WIDTH.warehouseName
        },
        {
          label: "库存数量",
          prop: "qty",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "padding-right"
        }
      ],
      selectedRows: [],
      totalQty: ""
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
    },
    companyId() {
      this.tableData = [];
      if (this.companyId) {
        this.loadData();
      }
    }
  },
  mounted() {
    if (this.partId && this.companyId) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      loadStorageList({
        partId: this.partId,
        companyId: this.companyId,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => {
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
          this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
          this.totalQty = res.totalQty;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(page) {
      this.page = page;
      this.loadData();
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
          case "qty":
            sums[index] = this.totalQty;
            break;
          default:
            break;
        }
      });
      return sums;
    }
  },
  render() {
    return (
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
        pagination
        total={this.totalSize}
        current-page={this.page}
        onPageChange={this.pageChange}
        summary-method={this.setTotals}
        show-summary
      />
    );
  }
};
</script>
