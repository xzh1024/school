<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "manageMode",
    name: "仓库管理模式",
    remark:
      "标准模式：按仓库\\货区\\货架\\货层\\货位层级关系管理仓位。简易模式：按仓库\\货位层级关系管理仓库。注：请慎重选择仓库管理模式，随意切换管理模式可能造成仓库货位混乱。"
  },
  {
    type: "negativeStockOut",
    name: "负库存出库",
    remark: "是否允许销售时使用负库存进行开单操作。"
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
