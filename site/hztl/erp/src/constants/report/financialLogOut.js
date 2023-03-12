import { CELL_WIDTH } from "../table-columns/cell-width";
import { BILL_TYPE } from "../store";

export const TABLE_COLUMN_FINANICIALLOGOUT_SUMMARY = {
  name: "financialLogInSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.date,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "fundAccountName",
      label: "资金账户",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "purchaseAmount",
      label: "采销现付结算",
      width: CELL_WIDTH.personName,
      formatter: (_, row) => {
        const { purchaseAmount, saleAmount, totalPurchaseAndSale } = row;
        return totalPurchaseAndSale
          ? totalPurchaseAndSale
          : +purchaseAmount + +saleAmount;
      }
    },
    {
      prop: "prevAmount",
      label: "应付结算",
      width: CELL_WIDTH.phone
    },
    {
      prop: "agentAmount",
      label: "代付结算",
      width: CELL_WIDTH.time
    },
    {
      prop: "allocAmount",
      label: "调拨结算",
      width: CELL_WIDTH.role
    },
    {
      prop: "commissionAmount",
      label: "佣金结算",
      width: CELL_WIDTH.dept
    },
    {
      prop: "feeAmount",
      label: "费用结算",
      width: CELL_WIDTH.dept
    },
    {
      prop: "manualAmount",
      label: "手工记帐",
      width: CELL_WIDTH.dept
    },
    {
      prop: "subtotalAmount",
      label: "小计",
      width: CELL_WIDTH.dept
    }
  ]
};

export const TABLE_COLUMN_FINANICIALLOGOUT_DETAIL = {
  name: "financialLogInDetail",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "billNo",
      label: "结算单号",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "remark",
      label: "结算备注",
      width: CELL_WIDTH.personName
    },
    {
      prop: "paymentDate",
      label: "结算日期",
      width: CELL_WIDTH.phone
    },
    {
      prop: "settleCooperatorName",
      label: "结算单位",
      width: CELL_WIDTH.time
    },
    {
      prop: "sourceBillType",
      label: "来源类型",
      width: CELL_WIDTH.role,
      formatter: value => {
        return BILL_TYPE[value] || "";
      }
    },
    {
      prop: "sourceBillNo",
      label: "来源单号",
      width: CELL_WIDTH.dept
    },
    {
      prop: "settleAmount",
      label: "付款金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "discountAmount",
      label: "优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "createdByName",
      label: "结算人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "tradingManName",
      label: "交易对象",
      width: CELL_WIDTH.dept
    }
  ]
};
