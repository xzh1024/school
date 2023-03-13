import { DetailFormData } from "../../constants";

export interface Part {
  id: number; // 配件ID
  name: string; // 配件名称
  code: string; // 配件名称
}

export type AuditFormData = Partial<
  Pick<DetailFormData, "planDate" | "remark">
>;

export const defaultFormData = {
  relatedCompanyId: null,
  companyId: null,
  planDate: "",
  remark: ""
};

export const PART_DETAIL_ENUM1 = [
  { label: "实际数", value: "qty" },
  { label: "动态数", value: "dynamicQty" },
  { label: "可调拨数", value: "allocableQty" },
  { label: "锁定数", value: "lockedQty" }
];

export const PART_DETAIL_ENUM2 = [
  { label: "采购在订数", value: "purchaseQtyInOrdering" },
  { label: "采购在途数", value: "purchaseQtyInTransit" },
  { label: "销售在订数", value: "saleQtyInOrdering" },
  { label: "销售待交货数", value: "saleQtyToDeliver" }
];

export const PART_DETAIL_ENUM3 = [
  { label: "调拨在订数", value: "allocQtyInOrdering" },
  { label: "调拨在途数", value: "allocQtyInTransit" }
];

export const PART_DETAIL_ENUM4 = [
  { label: "实际数", value: "qty" },
  { label: "月均销量", value: "monthlySaleQty" },
  { label: "调拨在订数", value: "allocQtyInOrdering" },
  { label: "调拨在途数", value: "allocQtyInTransit" }
];
