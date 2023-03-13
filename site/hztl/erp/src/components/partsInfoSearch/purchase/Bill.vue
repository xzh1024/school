<script>
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { showBillDetail } from "@/components/table";
import { loadPurchaseBillHistory } from "@/api/basketHistory";

export default {
  name: "Bill",
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
      default: Symbol("partHistoryPurchaseBill")
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: "partHistoryPurchaseBill",
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
          label: "供应商",
          prop: "supplierName",
          width: 150
        },
        {
          label: "数量",
          prop: "qty",
          width: 70,
          type: "number",
          classNames: "padding-right"
        },
        {
          label: "含税单价",
          prop: "taxedPrice",
          width: 70,
          type: "number",
          formatter: value => getNoPricePermTips(value),
          classNames: "padding-right"
        },
        {
          label: "单号",
          prop: "billNo",
          width: 170,
          type: "billNo",
          billTypeField: "billType"
        },
        {
          label: "结算方式",
          prop: "settlementType",
          width: 100
        },
        {
          label: "发票类型",
          prop: "invoiceType",
          width: 100
        },
        {
          label: "分公司",
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
    partId(val) {
      this.tableData = [];
      if (val) {
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
      loadPurchaseBillHistory({
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
    },
    rowClassName({ row }) {
      let className = "";
      if (row.billType == "CT") {
        className += "row-font-danger";
      }
      return className;
    },
    handleRowOperation(row) {
      showBillDetail(row.billType, row.billId);
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
        onRowOperation={this.handleRowOperation}
      />
    );
  }
};
</script>
