//累计中展示的指标字段
export const ACCUMULATION = [
  {
    key: "stockQty",
    label: "当前库存数量"
  },
  {
    key: "overStockNumber",
    label: "超储数量"
  },
  {
    key: "overStockAmount",
    prepend: "￥",
    label: "超储金额"
  },
  {
    key: "purchasesOrderQty",
    label: "采购在订数"
  },
  {
    key: "purchasesOrderAmount",
    label: "采购在途数"
  },
  {
    key: "saleOrderQty",
    label: "销售在订数"
  },
  {
    key: "saleDeliverQty",
    label: "销售待交货数"
  }
];

export const DEFAULT_INDEX = {
  stockQty: "当前库存数",
  overStockNumber: "超储数量",
  overStockAmount: "超储金额",
  purchasesOrderAmount: "采购在途数",
  purchasesOrderQty: "采购在订数",
  saleOrderQty: "销售在订数",
  saleDeliverQty: "销售待提交货数"
};
