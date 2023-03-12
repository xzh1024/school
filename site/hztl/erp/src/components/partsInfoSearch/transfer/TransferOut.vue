<script>
import { mapState } from "vuex";
import { getBillsHistoryList } from "@/api/basketHistory";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export default {
  name: "TransferOut",
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
      default: Symbol("partHistoryTransferOut")
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalPage: 0,
      tableData: [],
      selectedRows: [],
      tableName: "partHistoryTransferOut",
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
          label: "业务日期",
          prop: "billDate",
          width: 100,
          type: "date"
        },
        {
          label: "调入分公司",
          prop: "relatedCompanyName",
          width: CELL_WIDTH.companyName
        },
        {
          label: "数量",
          prop: "qty",
          width: 70,
          type: "number",
          classNames: "padding-right"
        },
        {
          label: "单价",
          prop: "price",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        },
        {
          label: "单据号",
          prop: "billNo",
          width: 170,
          type: "billNo",
          billTypeField: "billType"
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
      getBillsHistoryList({
        ...this.searchData,
        partId: this.partId,
        types: ["KD", "KT"],
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
    },
    rowClassName({ row }) {
      let className = "";
      if (row.type == "KT") {
        className += "row-font-danger";
      }
      return className;
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
        row-class-name={this.rowClassName}
      />
    );
  }
};
</script>
