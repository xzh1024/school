import { CELL_WIDTH } from "../cell-width";
import { BILL_TYPE } from "../../store";

export const FINANCE_TRANSFER_STATEMENT_DETAIL = {
  name: "financeTransferStatementDetail",
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
      prop: "sourceBillType",
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: (value: string) => BILL_TYPE[value]
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "data"
    },
    {
      prop: "sourceBillNo",
      label: "业务单号",
      width: CELL_WIDTH.date,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      prop: "amountIn",
      label: "单据应收",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "amountOut",
      label: "单据应付",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "uncheckAmount",
      label: "未对金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName
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
      prop: "financialConfirmByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "financialConfirmAt",
      label: "财务审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "单据备注",
      prop: "businessRemark",
      width: CELL_WIDTH.remark
    }
  ]
};
