<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants/index";

const TABLE_DATA = [
  {
    type: "noUpProperties",
    name: "禁止同步配件性质"
  },
  {
    type: "noUpWarehouses",
    name: "禁止同步库存仓库"
  },
  {
    type: "noUpPriceTypesOfZero",
    name: "配件价格类型价格为0时，禁止同步"
  }
  // {
  //   type: "notShowStockQty",
  //   name: "在平台销售，库存显示为"
  // },
  // {
  //   type: "customerDefaultPriceType",
  //   name: "平台客户默认享受价格类型"
  // }
  // {
  //   type: "allocatingPriceRaiseRatio",
  //   name: "联盟成员商品对客户加价比例"
  // }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Financial`,
      tableColumns: SYSTEM_PARAMS_SETTING_PARAMS_LIST.columns,
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
