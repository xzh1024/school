import { CELL_WIDTH } from "../cell-width";

export const FINANCE_PAYMENT_SETTLE_DETAIL = {
  name: "financePaymenSettleDetail",
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
      prop: "paymentDate",
      label: "结算时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "billNo",
      label: "结算单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "amount",
      label: "结算金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "discountAmount",
      label: "结算优惠",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "fundAccountName",
      label: "账户名称",
      width: CELL_WIDTH.fundAccountName
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "handledByName",
      label: "结算人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
