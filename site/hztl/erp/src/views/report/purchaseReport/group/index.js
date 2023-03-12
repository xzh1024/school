// 状态
export const STATUS = {
  1: "待仓库审核",
  2: "待财务审核",
  4: "完成"
};

// 单据
export const BILLS = {
  settlementType: "支付方式",
  invoiceType: "发票类型",
  billNo: "单据号",
  billType: "单据类型",
  status: "单据状态",
  purchaseNo: "原采购单号"
};

//累计中展示的指标字段
export const ACCUMULATION = [
  {
    key: "billCount",
    label: "单据数"
  },
  {
    key: "partCount",
    label: "配件种类数"
  },
  {
    key: "purchaseQty",
    label: "采购数量"
  },
  {
    key: "amountIn",
    prepend: "￥",
    label: "进货金额"
  },
  {
    key: "untaxedAmount",
    prepend: "￥",
    label: "未税金额"
  },
  {
    key: "taxAmount",
    prepend: "￥",
    label: "税额"
  },
  {
    key: "dueAmount",
    prepend: "￥",
    label: "应结金额"
  },
  {
    key: "benefitAmount",
    prepend: "￥",
    label: "优惠金额"
  },
  {
    key: "paidAmount",
    prepend: "￥",
    label: "实付金额"
  },
  {
    key: "settledAmount",
    prepend: "￥",
    label: "已结金额"
  },
  {
    key: "unSettledAmount",
    prepend: "￥",
    label: "未结金额"
  },
  {
    key: "returnedQty",
    label: "已退货数量"
  },
  {
    key: "returnedAmount",
    prepend: "￥",
    label: "已退货金额"
  },
  {
    key: "returnedRatio",
    append: "%",
    label: "退货率"
  }
];

export const DEFAULT_INDEX = {
  billCount: "单据数",
  partCount: "配件种类数",
  purchaseQty: "采购数量",
  amountIn: "进货金额",
  amountInRatio: "占进货金额比例",
  untaxedAmount: "未税金额",
  untaxedAmountRatio: "占未税金额比例",
  taxAmount: "税额",
  dueAmount: "应结金额",
  benefitAmount: "优惠金额",
  paidAmount: "实付金额",
  settledAmount: "已结金额",
  unSettledAmount: "未结金额",
  returnedQty: "已退货数量",
  returnedAmount: "已退货金额",
  returnedRatio: "退货率"
};

export const PEOPLE_TYPE = {
  0: "业务员",
  1: "制单人",
  2: "财务审核人"
};
