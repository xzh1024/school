export const FIELDS = {
  businessMan: "业务员",
  area: "客户地区",
  customer: "客户",
  createdByName: "制单人",
  companyName: "分公司"
};

//累计中展示的指标字段
export const ACCUMULATION = [
  {
    key: "saleTaxedAmount",
    prepend: "￥",
    label: "销售金额"
  },
  {
    key: "saleCost",
    prepend: "￥",
    label: "销售成本"
  },
  {
    key: "saleGross",
    prepend: "￥",
    label: "销售毛利"
  },
  {
    key: "grossProfit",
    append: "%",
    label: "毛利率"
  },
  {
    key: "receivableAmount",
    prepend: "￥",
    label: "回款金额"
  },
  {
    key: "discountAmount",
    prepend: "￥",
    label: "优惠金额"
  },
  {
    key: "receivableProfit",
    append: "%",
    label: "回款率"
  },
  {
    key: "receivableCost",
    prepend: "￥",
    label: "回款成本"
  },
  {
    key: "receivableGross",
    prepend: "￥",
    label: "回款毛利"
  },
  {
    key: "receivableGrossProfit",
    append: "%",
    label: "回款毛利率"
  },
  {
    key: "accumulatedReceivable",
    prepend: "￥",
    label: "累计已回款金额"
  },
  {
    key: "accumulatedUnpaid",
    prepend: "￥",
    label: "未回款金额"
  }
];

export const AMOUNT_INDEX = {
  saleTaxedAmount: "销售金额",
  saleCost: "销售成本",
  saleGross: "销售毛利",
  grossProfit: "毛利率",
  receivableAmount: "回款金额",
  discountAmount: "优惠金额",
  receivableProfit: "回款率",
  receivableCost: "回款成本",
  receivableGross: "回款毛利",
  receivableGrossProfit: "回款毛利率",
  accumulatedReceivable: "累计已回款金额",
  accumulatedUnpaid: "未回款金额"
};
