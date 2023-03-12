<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "repairDispatch",
    name: "维修派工",
    remark: "控制维修工单是否需要派工步骤，默认需要。"
  },
  {
    type: "repairWorkOrderStartEndStep",
    name: "开工/完工",
    remark: "控制维修工单是否需要开工/完工步骤，默认需要。"
  },
  {
    type: "repairWorkOrderAmountFloor",
    name: "工单结算金额抹零",
    remark: "控制工单结算金额是否自动抹掉小数部分金额，默认不抹零。"
  },
  {
    type: "repairCustomerSituationRemind",
    name: "客情提醒",
    remark: "控制是否需要提醒"
  },
  {
    type: "repairHealth",
    name: "健康档案上传参数",
    remark:
      "用于设置上传工单维修档案时所需的维修厂编号、用户名、密码及所属地区参数"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Repaire`,
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
