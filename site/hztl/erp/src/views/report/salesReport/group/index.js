// 供应商
export const SUPPLIER = {
  cooperatorArea: "客户区域",
  cooperatorNameStr: "客户名称",
  cooperatorProperty: "客户性质"
};
// 单据
export const BILLS = {
  settlementType: "支付方式",
  invoiceType: "发票类型",
  billNo: "单据号",
  billType: "单据类型",
  status: "单据状态",
  saleChannel: "销售渠道",
  saleNo: "原销售单号"
};
export const BILL_TYPE = {
  xs: "销售出库单",
  xt: "销售退货单"
};
// 状态
export const STATUS = {
  4: "待仓库审核",
  5: "待财务审核",
  99: "完成"
};
// 配件
export const PARTS = {
  partCode: "配件编码",
  partName: "配件名称",
  partBrand: "配件品牌",
  partCategory: "配件分类",
  partVehModel: "车型",
  partProductionPlace: "产地"
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
    key: "saleQty",
    label: "销售数量"
  },
  {
    key: "taxedPurchaseAmount",
    prepend: "￥",
    label: "成本额"
  },
  {
    key: "untaxedPurchaseAmount",
    prepend: "￥",
    label: "未税成本额"
  },
  {
    key: "taxedBillAmount",
    prepend: "￥",
    label: "开单金额"
  },
  {
    key: "taxedSaleAmount",
    prepend: "￥",
    label: "销售额"
  },
  {
    key: "untaxedSaleAmount",
    prepend: "￥",
    label: "未税销售额"
  },
  {
    key: "taxAmount",
    prepend: "￥",
    label: "税额"
  },
  {
    key: "taxedGrossProfit",
    prepend: "￥",
    label: "毛利"
  },
  {
    key: "untaxedGrossProfit",
    prepend: "￥",
    label: "未税毛利"
  },
  {
    key: "taxedGrossProfitRate",
    append: "%",
    label: "毛利率"
  },
  {
    key: "priceUpRate",
    append: "%",
    label: "加价率"
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
    label: "实收金额"
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
    key: "urgentArrivalCount",
    label: "急件数"
  },
  {
    key: "urgentArrivalAmount",
    prepend: "￥",
    label: "急件销售金额"
  },
  {
    key: "stockoutQty",
    label: "已出库数"
  },
  {
    key: "returnedQty",
    label: "已退货数"
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
  saleQty: "销售数量",
  taxedPurchaseAmount: "成本额",
  untaxedPurchaseAmount: "未税成本额",
  taxedBillAmount: "开单金额",
  untaxedAmountRatio: "占未税金额比例",
  taxedSaleAmount: "销售额",
  taxedSaleRatio: "占销售比例",
  untaxedSaleAmount: "未税销售额",
  untaxedSaleRatio: "占未税销售额比例",
  taxAmount: "税额",
  taxedGrossProfit: "毛利",
  taxedGrossProfitRatio: "占毛利比例",
  untaxedGrossProfit: "未税毛利",
  taxedGrossProfitRate: "毛利率",
  priceUpRate: "加价率",
  dueAmount: "应结金额",
  benefitAmount: "优惠金额",
  paidAmount: "实收金额",
  settledAmount: "已结金额",
  unSettledAmount: "未结金额",
  urgentArrivalCount: "急件数",
  urgentArrivalAmount: "急件销售金额",
  stockoutQty: "已出库数",
  returnedQty: "已退货数",
  returnedAmount: "已退货金额",
  returnedRatio: "退货率"
};

export const PEOPLE_TYPE = {
  0: "业务员",
  1: "制单人",
  2: "财务审核人"
};
