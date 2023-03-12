export * from "./search-part";
export * from "./billing-list";
export * from "./billing-detail";
export * from "./receive-list";
export * from "./receive-detail";
export * from "./return-list";
export * from "./return-has-history-list";
export * from "./return-parts-info-list";
export * from "./return-no-history-list";
export * from "./return-detail";
export * from "./serach-detail";
export * from "./serach-sum";
export * from "./urgent-detail";
export * from "./dispatch-pending";
export * from "./dispatch-by-bill-detail";
export * from "./dispatch-by-bill-list";
export * from "./dispatch-by-part-detail";
export * from "./dispatch-by-part-list";
export * from "./demands";
export * from "./price-formula-list";

export const PURCHASE_ORDER_DETAIL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "taxedAmount", type: "money" },
  { file: "waitPurchaseQty", type: "qty" },
  { file: "terminatedQty", type: "qty" },
  { file: "arrivaledQty", type: "qty" },
  { file: "waitArrivalQty", type: "qty" },
  { file: "transitQty", type: "qty" },
  { file: "waitPurchaseAmount", type: "money" },
  { file: "terminatedAmount", type: "money" },
  { file: "arrivaledAmount", type: "money" },
  { file: "waitArrivalAmount", type: "money" },
  { file: "transitAmount", type: "money" },
  { file: "untaxedAmount", type: "money" },
  { file: "taxAmount", type: "money" }
];
