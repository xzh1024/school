<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "shareToAllCompanies",
    name: "新增往来单位是否默认共享到所有分公司",
    remark:
      "若默认共享到所有分公司，则往来单位创建时将设置此往来单位账套下所有分公司用有权限用户均可查看或操作该往来单位。"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Cooperator`,
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
