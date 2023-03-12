import { IndexStatusEmun } from "@/constants/interface";

export const FRANCHISE_AUDIT_STATUS: IndexStatusEmun = {
  0: "加盟审核中",
  1: "已加盟",
  2: "拒绝",
  3: "退出审核中",
  4: "已退出",
  5: "已取消"
};

export const BILL_TYPE_OPTIONS = [
  { id: 1, name: "销售单" },
  { id: 2, name: "销售退货单" }
];

export const ZERO_STOCK_OPTIONS = [
  { id: 0, name: "全部" },
  { id: 1, name: "是" },
  { id: 2, name: "否" }
];

export const UNDISPOSED_OPTIONS = [
  { id: 0, name: "全部" },
  { id: 1, name: "是" },
  { id: 2, name: "否" }
];

export const TRANSIT_STATUS_OPTIONS = [
  { id: 0, name: "全部" },
  { id: 1, name: "是" },
  { id: 2, name: "否" }
];

export const HEAD_REMIND_OPTIONS = [
  { id: 0, name: "全部" },
  { id: 1, name: "是" },
  { id: 2, name: "否" }
];
