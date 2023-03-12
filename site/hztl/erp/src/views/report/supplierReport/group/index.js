//累计中展示的指标字段
export const ACCUMULATION = [
  {
    key: "billNumber",
    label: "单据数"
  },
  {
    key: "lastReturn",
    prepend: "￥",
    label: "退前期进货金额"
  },
  {
    key: "purchasesUntaxedAmount",
    prepend: "￥",
    label: "未税进货金额"
  },
  {
    key: "stockTaxedAmount",
    prepend: "￥",
    label: "库存金额"
  },
  {
    key: "stockUntaxedAmount",
    prepend: "￥",
    label: "未税库存金额"
  },
  {
    key: "saleTaxedAmount",
    prepend: "￥",
    label: "销售金额"
  },
  {
    key: "saleUntaxedAmount",
    prepend: "￥",
    label: "未税销售金额"
  },
  {
    key: "taxCost",
    prepend: "￥",
    label: "成本"
  },
  {
    key: "untaxdCost",
    prepend: "￥",
    label: "未税金额"
  },
  {
    key: "taxeGrossProfit",
    prepend: "￥",
    label: "毛利"
  },
  {
    key: "untaxedGrossProfit",
    prepend: "￥",
    label: "未税毛利"
  },
  {
    key: "grossProfitPercentage",
    append: "%",
    label: "毛利率"
  },
  {
    key: "markupPercentage",
    append: "%",
    label: "加价率"
  }
];

export const DEFAULT_INDEX = {
  billNumber: "单据数",
  lastReturn: "退前期进货金额",
  purchasesTaxedAmount: "本期进货金额",
  purchasesTaxedPercent: "占总进货金额比例",
  purchasesUntaxedAmount: "未税进货金额",
  purchasesUntaxedPercent: "占总未税进货金额比例",
  stockTaxedAmount: "库存金额",
  stockTaxedPercent: "占库存金额比例",
  stockUntaxedAmount: "未税库存金额",
  stockUntaxedPercent: "占总未税库存金额比例",
  saleTaxedAmount: "销售金额",
  saleTaxedPercent: "占总销售金额比例",
  saleUntaxedAmount: "未税销售金额",
  saleUntaxedPercent: "占总未税销售金额比例",
  taxeCost: "成本",
  taxeGrossProfit: "毛利",
  untaxedCost: "未税成本",
  untaxedGrossProfit: "未税毛利",
  taxedGrossProfitRate: "毛利率",
  markupPercentage: "加价率"
};
