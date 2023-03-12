export * from "./part-list";
export * from "./order-list";
export * from "./order-detail";
export * from "./out-list";
export * from "./out-detail";
export * from "./serach-sum";
export * from "./serach-detail";
export * from "./return-list";
export * from "./return-detail";
export * from "./return-parts-has-history";
export * from "./return-parts-no-history";

export const SALES_ORDER_DETAIL_TOTAL_FILES = [
  { file: "bookQty", type: "qty" },
  { file: "taxedAmount", type: "money" },
  { file: "onTransSaleQty", type: "qty" },
  { file: "terminatedQty", type: "qty" },
  { file: "outQty", type: "qty" },
  { file: "waitOutQty", type: "qty" },
  { file: "waitDeliverQty", type: "qty" },
  { file: "onTransSaleAmount", type: "money" },
  { file: "terminatedAmount", type: "money" },
  { file: "outAmount", type: "money" },
  { file: "waitOutAmount", type: "money" },
  { file: "waitDeliverAmount", type: "money" },
  { file: "preDiscountUntaxedAmount", type: "money" },
  { file: "taxAmount", type: "money" }
];
