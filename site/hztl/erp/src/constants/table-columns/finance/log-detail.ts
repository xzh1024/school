import { CELL_WIDTH } from "../cell-width";

export const FINANCE_LOG_DETAIL = {
  name: "financeLogDetail",
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
      label: "收付款日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "settleCooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    { prop: "paymentType", label: "收支类型", width: CELL_WIDTH.type },
    { prop: "amount", label: "金额", width: CELL_WIDTH.money, type: "number" },
    { prop: "balance", label: "余额", width: CELL_WIDTH.money, type: "number" },
    { prop: "createdByName", label: "登记人", width: CELL_WIDTH.personName },
    {
      prop: "createdAt",
      label: "登记时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "reviewByName", label: "复核人", width: CELL_WIDTH.personName },
    {
      prop: "reviewDate",
      label: "复核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "updatedByName",
      label: "最后修改人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "updatedAt",
      label: "最后修改时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "checkNumber", label: "票据号码", width: CELL_WIDTH.no },
    {
      prop: "checkDate",
      label: "票据日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
