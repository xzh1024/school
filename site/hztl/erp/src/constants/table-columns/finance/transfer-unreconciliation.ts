import { CELL_WIDTH } from "../cell-width";
import { TRANSFER_RECONCILE_STATUS } from "../../store";

export const FINANCE_TRANSFER_UNRECONCILIATION = {
  name: "financeTransferUnreconciliation",
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
      prop: "createCompanyName",
      label: "制单分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "relatedCompanyName",
      label: "往来分公司",
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
      label: "已结款",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "unSettledAmount",
      label: "未结款",
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
      formatter: (value: number) => TRANSFER_RECONCILE_STATUS[value]
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
      prop: "paymentMethods",
      label: "付款公司",
      align: "center",
      children: [
        {
          prop: "payLastSettleByName",
          label: "最后结算人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "payLastSettleAt",
          label: "最后结算时间",
          width: CELL_WIDTH.personName,
          type: "time"
        }
      ]
    },
    {
      prop: "receiveMethods",
      label: "收款分公司",
      align: "center",
      children: [
        {
          prop: "receiveLastSettleByName",
          label: "最后结算人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "receiveLastSettleAt",
          label: "最后结算时间",
          width: CELL_WIDTH.personName,
          type: "time"
        }
      ]
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.count
    }
  ]
};
