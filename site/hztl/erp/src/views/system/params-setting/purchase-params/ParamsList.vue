<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "lastPriceFromAllCompanies",
    name: "供应商上次进价获取途径",
    remark:
      "采购等开单页面进行开单时可查看上次进价，此参数将设置查看进价获取范围是全账套或是所在公司。"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Purchase`,
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
