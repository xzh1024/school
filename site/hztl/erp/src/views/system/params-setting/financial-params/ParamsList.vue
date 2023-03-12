<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "creditBalanceAlarmPercent",
    name: "信用余额预警提醒比例",
    remark:
      "往来单位若设置了信用额度，则开单时在信用余额达到该参数设置比例时将会进行预警提示。"
  },
  {
    type: "creditLineCtrl",
    name: "超过信用额度能否继续挂账交易",
    remark:
      "开单时若已挂账金额加上该单据挂账金额超过该往来单位信用额是否允许继续完成挂账交易。"
  },
  {
    type: "newCooperatorAllowOnAccount",
    name: "新增往来单位是否允许挂账",
    remark: "新增往来单位可根据单位类型设置是否允许挂账交易。"
  },
  {
    type: "cooperatorOnTickByOverAccount",
    name: "已过期往来单位是否允许继续挂账",
    remark:
      "设置了预结算日期的对账单，若超过预结算日期还未结算，是否允许继续挂账交易。"
  },
  {
    type: "settleAutoReview",
    name: "结算中心结算后是否自动复核",
    remark: "可控制结算中心结算后，单据是否需要手动复核。"
  },
  {
    type: "allocSupplementMustAudit",
    name: "调拨对账补充登记是否必须审核",
    remark: "调拨对账补充登记是否能够直接进行登记而不通过OA审批。"
  },
  {
    type: "allocOutSettleBeforeAllocIn",
    name: "调拨出库方出库结算后是否允许进行对账结算",
    remark:
      "调拨出库方出库结算后，是否允许在入库方入库结算前进行对账单对账结算。"
  }
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
