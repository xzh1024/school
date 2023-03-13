<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "purchaseOrder",
    name: "订货计划流程"
  },
  {
    type: "purchase",
    name: "采购开单流程"
  },
  {
    type: "purchaseReturn",
    name: "采购退货流程"
  },
  {
    type: "saleOrder",
    name: "客户订单流程"
  },
  {
    type: "sale",
    name: "销售开单流程"
  },
  {
    type: "saleReturn",
    name: "销售退货流程"
  },
  {
    type: "urgent",
    name: "急件流程"
  },
  {
    type: "stockTaking",
    name: "盘点流程"
  },
  {
    type: "receiveSettlement",
    name: "应收付对账流程"
  },
  {
    type: "logisticReconciliation",
    name: "物流代收对账流程"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Sale`,
      tableColumns: SYSTEM_PARAMS_SETTING_PARAMS_LIST.columns.filter(
        item => item.label !== "参数说明"
      ),
      tableData: TABLE_DATA,
      selectedRows: []
    };
  },
  watch: {
    selectedRows(val) {
      this.$emit("rows-change", val);
    }
  },
  mounted() {
    this.selectedRows = [this.tableData[0]];
  },
  render() {
    return (
      <ht-setting-table
        tableName={this.tableName}
        columns={this.tableColumns}
        data={this.tableData}
        selectedRows={this.selectedRows}
        on={{
          "update:selectedRows": val => (this.selectedRows = val)
        }}
      />
    );
  }
};
</script>
