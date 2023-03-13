<script>
import { SYSTEM_PARAMS_SETTING_PARAMS_LIST } from "../constants";

const TABLE_DATA = [
  {
    type: "billNoRule",
    name: "单据编号生成规则",
    remark:
      "单据号组成：分公司标识-单据标识-单据编号。分公司标识可在分公司资料中查看和设置。单据标识为系统默认标识，不同单据会有不同的标识字符。单据编号由此参数设置结果而生成。"
  },
  {
    type: "businessManChangeable",
    name: "是否能开单时修改业务员",
    remark:
      "可控制能否在开单页面业务员选择框选择修改业务员。默认业务员在往来单位中进行设置。"
  },
  {
    type: "defaultBusinessMan",
    name: "开单时往来单位无业务员时默认值",
    remark:
      "若往来单位未绑定默认业务员，则在开单页面业务员默认值将根据此参数进行调整。"
  },
  {
    type: "queryDefaultMonths",
    name: "汇总类查询时间条件默认月数",
    remark: "右侧边栏配件信息查询（Alt+P）及其他汇总查询默认时间区间。"
  },
  {
    type: "queryDefaultDaysForBill",
    name: "开单查询默认日期范围",
    remark: "系统中涉及历史汇总查询页面默认查询时间区间（1表示查询当天）。"
  },
  // {
  //   type: "modifiableAfterPrint",
  //   name: "单据打印后，允许修改",
  //   remark:
  //     "若选择不可修改，则在单据打印成功打印后将不再能够修改单据相关内容，仅能够操作单据主流程。"
  // },
  {
    type: "autoSubmitWhenClose",
    name: "单据开单时关闭页面自动提交单据",
    remark:
      "若具有提交权限的角色在开单页面被关闭或切换别的开单详情时将会自动将当前单据提交。"
  },
  {
    type: "billPrintFlow",
    name: "单据打印流程选择",
    remark: "选择单据在满足选择条件时可以打印。"
  }
];

export default {
  name: "ParamsList",
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMS_LIST.name}Common`,
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
