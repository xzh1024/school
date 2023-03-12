import { CELL_WIDTH } from "../table-columns/cell-width";
import { PAYER_OPTINS } from "../store";

export const TABLE_COLUMN_LOGREG_SUMMARY = {
  name: "allocOutSummary",
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
      prop: "settlementType",
      label: "结算方式",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.personName
    },
    {
      prop: "financialBillCount",
      label: "财务已审核单据数",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "freight",
      label: "运输费",
      width: CELL_WIDTH.role
    },
    {
      prop: "packCharges",
      label: "包装费",
      width: CELL_WIDTH.role
    },
    {
      prop: "insuredCharges",
      label: "保价费",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "otherCharges",
      label: "其他费",
      width: CELL_WIDTH.role
    },
    {
      prop: "totalCharges",
      label: "合计费用",
      width: CELL_WIDTH.role
    },
    {
      prop: "thisPeriodActuallyAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodActuallyAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodDiscountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    }
  ]
};

export const TABLE_COLUMN_LOGREG_DETAIL = {
  name: "allocOutSummary",
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
      prop: "settlementType",
      label: "结算方式",
      width: CELL_WIDTH.personName
    },
    {
      prop: "freightNo",
      label: "运单号",
      width: CELL_WIDTH.personName
    },
    {
      prop: "type",
      label: "业务类型",
      width: CELL_WIDTH.accountName,
      formatter: value => {
        return value ? "发货" : "收货";
      }
    },
    {
      prop: "createdAt",
      label: "发货日期",
      width: CELL_WIDTH.role
    },
    {
      prop: "logisticsCompanyName",
      label: "物流公司",
      width: CELL_WIDTH.role
    },
    {
      prop: "cooperatorName",
      label: "收/发货单位",
      width: CELL_WIDTH.role
    },
    {
      prop: "freight",
      label: "运输费",
      width: CELL_WIDTH.role
    },
    {
      prop: "packCharges",
      label: "包装费",
      width: CELL_WIDTH.role
    },
    {
      prop: "insuredCharges",
      label: "保价费",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "otherCharges",
      label: "其他费",
      width: CELL_WIDTH.role
    },
    {
      prop: "totalCharges",
      label: "合计费用",
      width: CELL_WIDTH.role
    },
    {
      prop: "thisPeriodActuallyAmount",
      label: "本期付款金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodActuallyAmount",
      label: "累计付款金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodDiscountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "payer",
      label: "付款方",
      width: CELL_WIDTH.dept,
      formatter: value => PAYER_OPTINS[value]
    },
    {
      prop: "receiverName",
      label: "收货人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "senderName",
      label: "发货人",
      width: CELL_WIDTH.dept
    }
  ]
};
