<script>
import { mapState } from "vuex";
import { loadQuotationSalesHistory } from "@/api/basketHistory";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export default {
  name: "Sales",
  props: {
    partId: {
      type: [Number, String],
      default: null
    },
    searchData: {
      type: Object,
      default() {
        return {};
      }
    },
    keyScope: {
      type: [Symbol, String],
      default: Symbol("partHistoryQuotationSales")
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: "partHistoryQuotationSales",
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
          label: "客户",
          prop: "cooperatorName",
          width: 150
        },
        {
          label: "价格",
          prop: "price",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        },
        {
          label: "报价时间",
          prop: "createdAt",
          width: 100,
          type: "time"
        },
        {
          label: "报价分公司",
          prop: "companyName",
          width: 150
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
    },
    searchData() {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      if (!this.partId) {
        return;
      }
      this.loading = true;
      loadQuotationSalesHistory({
        ...this.searchData,
        partId: this.partId,
        page: this.page,
        pageSize: this.pageSize
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
      />
    );
  }
};
</script>
