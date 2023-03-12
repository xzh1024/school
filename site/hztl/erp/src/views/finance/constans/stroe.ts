export const OPERATIONS = {
  remove: "删除",
  commit: "提交",
  revoke: "撤回",
  confirm: "确认",
  revokeConfirm: "反账单"
};

export const ACCOUNT_TYPES = [
  { id: 0, name: "实账" },
  { id: 1, name: "虚账" }
];

export const PAYMENT_TYPES = [
  { id: 0, name: "应收" },
  { id: 1, name: "应付" }
];

export const CHARGE_OPTIONS = [
  { id: "all", name: "全部" },
  { id: "notDeducted", name: "未冲完" },
  { id: "deducted", name: "已冲完" }
];

export const SETTLE_STATUS = [
  { id: "toSettle", name: "待结算" },
  { id: "partialSettle", name: "部分结算" },
  { id: "settled", name: "已结算" }
];

export const CHARGE_STATUS = [
  { id: "notDeducted", name: "未冲销" },
  { id: "partialDeducted", name: "部分冲销" },
  { id: "deducted", name: "全部冲销" }
];

export const BILL_SATUS = [
  { id: "toSettle", name: "待结算" },
  { id: "partialSettle", name: "部分结算" },
  { id: "settled", name: "已结算" }
];

export const PREPAY_ORIGIN = [
  { id: 0, name: "定金" },
  { id: 1, name: "资金申请" },
  { id: 2, name: "余额结转" },
  { id: 3, name: "补充登记" }
];

export const CATE_STATUS = [
  { id: "all", name: "全部" },
  { id: "enable", name: "启用" },
  { id: "disable", name: "停用" }
];

export const BUILT_IN = [
  { id: "all", name: "全部" },
  { id: true, name: "是" },
  { id: false, name: "否" }
];
