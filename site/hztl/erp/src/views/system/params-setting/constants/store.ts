export const BILL_NO_RULE_OPTIONS = [
  { id: 0, name: "年月日+流水号" },
  { id: 1, name: "年月+流水号" },
  { id: 2, name: "年+流水号" },
  { id: 3, name: "流水号" }
];

export const BUSIBESS_MAN_CHANGEABLE_OPTIONS = [
  { id: true, name: "可修改" },
  { id: false, name: "不可修改" }
];

export const DEFAULT_BUSINESS_MAN_OPTIONS = [
  { id: 0, name: "制单人" },
  { id: 1, name: "置空" }
];

export const QUERY_DEFAULT_MONTHS = {
  step: 1,
  min: 1,
  max: 12
};

export const QUERY_DEFAULT_DAYS_FOR_BILL = {
  step: 1,
  min: 1,
  max: 365
};

export const MODIFIABLE_AFTER_PRINT_OPTIONS = [
  { id: true, name: "可修改" },
  { id: false, name: "不可修改" }
];

export const AUTO_SUBMIT_WHEN_CLOSE_OPTIONS = [
  { id: true, name: "自动提交" },
  { id: false, name: "不自动提交" }
];

export const BILL_PRINT_FLOW_OPTIONS = [
  { id: 0, name: "单据任意状态均可打印" },
  { id: 1, name: "单据提交后可打印" },
  { id: 2, name: "单据结算后可打印" }
];

export const LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS = [
  { id: false, name: "本公司" },
  { id: true, name: "全部分公司" }
];

export const TRANSFER_APPLY_TO_OUT_AUDIT_OPTIONS = [
  { id: true, name: "需要审核" },
  { id: false, name: "不需要审核" }
];

export const MANAGE_MODE_OPTIONS = [
  { id: 0, name: "标准模式" },
  { id: 1, name: "简易模式" }
];

export const NEGATIVE_STOCK_OUT_OPTIONS = [
  { id: true, name: "允许" },
  { id: false, name: "不允许" }
];

export const CREDIT_LINE_CTRL_OPTIONS = [
  { id: true, name: "可交易" },
  { id: false, name: "不可交易" }
];

export const NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS = [
  { id: 0, name: "客户可挂账" }
  // { id: 1, name: "供应商可挂账" },
  // { id: 2, name: "物流公司可挂账" }
];

export const COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS = [
  { id: true, name: "可交易" },
  { id: false, name: "不可交易" }
];

export const SETTLE_AUTO_REVIEW_OPTIONS = [
  { id: false, name: "手动复核" },
  { id: true, name: "自动复核" }
];

export const ALLOC_SUPPLEMENT_MUST_AUDIT_OPTIONS = [
  { id: true, name: "必须审核" },
  { id: false, name: "可跳过审核" }
];

export const ALLOC_OUT_SETTLE_BEFORE_ALLOC_IN_OPTIONS = [
  { id: true, name: "允许" },
  { id: false, name: "不允许" }
];

export const SHARE_TO_ALL_COMPANIES_OPTIONS = [
  { id: true, name: "共享" },
  { id: false, name: "不共享" }
];

export const PURCHASE_ORDER_OPTIONS = [
  { id: 0, name: "完整流程" },
  { id: 1, name: "完整流程一" },
  { id: 2, name: "简易流程" },
  { id: 3, name: "简易流程一" }
];

export const PURCHASE_OPTIONS = [{ id: 1, name: "简易流程" }];

export const PURCHASE_RETURN_OPTIONS = [{ id: 1, name: "简易流程" }];

export const SALE_ORDER_OPTIONS = [
  { id: 0, name: "完整流程" },
  { id: 1, name: "完整流程一" },
  { id: 2, name: "简易流程" },
  { id: 3, name: "简易流程一" }
];

export const SALE_OPTIONS = [
  { id: 0, name: "简易流程（一）" },
  { id: 1, name: "简易流程（二）" }
];

export const SALE_RETURN_OPTIONS = [{ id: 1, name: "简易流程" }];

export const URGENT_OPTIONS = [{ id: 1, name: "简易流程" }];

export const STOCK_TAKING_OPTIONS = [
  { id: 1, name: "简易流程" },
  { id: 3, name: "财务审核后库房审核" },
  { id: 4, name: "库房审核后财务审核" },
  { id: 5, name: "财务库房同时审核流程" }
];

export const RECEIVE_SETTLEMENT_OPTIONS = [
  { id: 0, name: "简易流程" },
  { id: 1, name: "完整流程" }
];

export const LOGISTIC_RECONCILIATION_OPTIONS = [
  { id: 0, name: "简易流程" },
  { id: 1, name: "完整流程" }
];

export const IS_NEED_OPTIONS = [
  { id: true, name: "需要" },
  { id: false, name: "不需要" }
];

export const IS_IGNORE_ACCOUNT_OPTIONS = [
  { id: true, name: "抹零" },
  { id: false, name: "不抹零" }
];

export const REMIND_OPTIONS = [
  { id: 1, name: "简易流程" },
  { id: 3, name: "财务审核后库房审核" },
  { id: 4, name: "库房审核后财务审核" },
  { id: 5, name: "财务库房同时审核流程" }
];

export const CUSTOMER_REMIND_OPTIONS = [
  { id: "returnVisit", name: "回访" },
  { id: "maintain", name: "保养" },
  { id: "renewalOfInsurance", name: "续保" },
  { id: "yearCheck", name: "年审" },
  { id: "memberCardExpired", name: "会员卡到期" }
];
