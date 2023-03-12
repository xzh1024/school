<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "allocApply2OutAudit",
    name: "申请单转出库单后审核规则",
    remark:
      "申请单转出库单后若出库单包含配件数量大于申请数量或有其他申请单未申请配件是否需要审核。"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Storage`,
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
