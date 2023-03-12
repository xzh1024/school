import { CELL_WIDTH } from "../cell-width";
import { BILL_TYPE } from "../../store";

export const FINANCE_PAYMENT_DEBT_DETAIL = {
  name: "financePaymentDebtDetail",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billNo",
      label: "业务单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billType",
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: (value: string) => BILL_TYPE[value],
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "amountIn",
      label: "单据应收",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "amountOut",
      label: "单据应付",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settledAmount",
      label: "结算金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "discountAmount",
      label: "优惠金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "unCheckedAmount",
      label: "未对金额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    // { prop: "unSettledAmount", label: "已对未结", width:CELL_WIDTH.money, type: "number" },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      type: "invoiceType"
    },
    { prop: "businessManName", label: "业务员", width: CELL_WIDTH.personName },
    { prop: "companyName", label: "业务公司", width: CELL_WIDTH.companyName },
    {
      prop: "confirmedAt",
      label: "财务审核时间",
      width: CELL_WIDTH.time,
      type: "time",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "confirmedByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time",
      attrs: {
        sortable: "custom"
      }
    },
    { prop: "createdByName", label: "制单人", width: CELL_WIDTH.personName },
    { prop: "businessRemark", label: "业务备注", width: CELL_WIDTH.remark }
  ]
};
