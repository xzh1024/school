import { CELL_WIDTH, SALES_RETURN_STATUS } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_RETURN_LIST_TABLE: TableSettingConfig<any> = {
  name: "salesReturnList",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "业务日期",
      prop: "billDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "单据号",
      prop: "billNo",
      width: CELL_WIDTH.no
    },
    {
      label: "单据状态",
      prop: "status",
      width: CELL_WIDTH.status,
      formatter: value => SALES_RETURN_STATUS[value] || ""
    },
    {
      label: "原销售单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
    },
    {
      label: "客户名称",
      prop: "cooperatorName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "退货数",
      prop: "realQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "退货金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税退货金额",
      prop: "untaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "开单金额",
      prop: "billAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "运费",
      prop: "freight",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "税率",
      prop: "taxRate",
      width: CELL_WIDTH.taxRate,
      type: "percent"
    },
    {
      label: "发票类型",
      prop: "invoiceType",
      width: CELL_WIDTH.type
    },
    {
      label: "支付方式",
      prop: "enhancedSettlementType",
      width: CELL_WIDTH.type
    },
    {
      label: "打印状态",
      prop: "printStatus",
      width: CELL_WIDTH.printStatus,
      formatter: (value: boolean) => (value ? "已打印" : "未打印")
    },
    {
      label: "业务员",
      prop: "businessManName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单人",
      prop: "createdByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单时间",
      prop: "createdAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "提交人",
      prop: "submitByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "提交时间",
      prop: "submitAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "成本价审核人",
      prop: "costPriceAuditByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "成本价审核时间",
      prop: "costPriceAuditAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "结算人",
      prop: "financialAuditName",
      width: CELL_WIDTH.personName
    },
    {
      label: "结算时间",
      prop: "financialAuditAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "收货人",
      prop: "receiverName",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      label: "收货电话",
      prop: "receiverPhone",
      width: CELL_WIDTH.phone,
      isHide: true
    },
    {
      label: "收货区域",
      prop: "receiverAreaNames",
      width: CELL_WIDTH.address,
      type: "area",
      isHide: true
    },
    {
      label: "收货地址",
      prop: "receiverAddress",
      width: CELL_WIDTH.address,
      isHide: true
    },
    {
      label: "归属集团",
      prop: "groupName",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      label: "提货方式",
      prop: "pickMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "运输方式",
      prop: "transportMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "包装方式",
      prop: "packMethod",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      label: "打印次数",
      prop: "printCount",
      width: CELL_WIDTH.qty,
      type: "number",
      isHide: true
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
