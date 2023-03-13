import { CELL_WIDTH } from "../cell-width";
import { BILL_TYPE } from "../../store";

export const FINANCE_PAYMENT_STATEMENT_DETAIL = {
  name: "financePaymenStatementDetail",
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
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 50,
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
      prop: "sumAmount",
      label: "应对金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    // {
    //   prop: "lastSettleDate",
    //   label: "结款时间",
    //   width: CELL_WIDTH.time,
    //   type: "time"
    // },
    {
      prop: "companyName",
      label: "业务公司",
      width: CELL_WIDTH.companyName
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
      label: "业务备注",
      prop: "businessRemark",
      width: CELL_WIDTH.remark
    },
    {
      label: "物流公司名称",
      prop: "logisticsName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "运单号",
      prop: "freightNo",
      width: CELL_WIDTH.no
    }
  ]
};
