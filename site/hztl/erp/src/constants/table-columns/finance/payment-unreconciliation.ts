import { CELL_WIDTH } from "../cell-width";
import { PAYMENT_BILL_STATUS } from "../../store";

export const FINANCE_PAYMENT_UNRECONCILIATION = {
  name: "financePamentUnreconciliation",
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
      prop: "billNo",
      label: "对账单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "amount",
      label: "应结款",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "settledAmount",
      label: "已回款",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "unSettledAmount",
      label: "未回款",
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
      prop: "status",
      label: "对账状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => PAYMENT_BILL_STATUS[value]
    },
    {
      prop: "peerPaymenter",
      label: "对方对账人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "companyName",
      label: "对账公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "handledByName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billDate",
      label: "对账日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "preClearingDate",
      label: "预结算日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "commitedByName",
      label: "提交人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "commitedAt",
      label: "提交时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "confirmedByName",
      label: "确认人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "confirmedAt",
      label: "确认时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.count
    },
    {
      prop: "lastSettleAt",
      label: "最后结算时间",
      width: CELL_WIDTH.time,
      type: "time"
    }
  ]
};
