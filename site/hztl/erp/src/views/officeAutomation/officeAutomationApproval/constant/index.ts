// 审批列表查询类型
export enum QUERY_TYPE {
  toProcess = "toProcess", // 待处理
  initiated = "initiated", // 已发起
  approvalQuery = "approvalQuery" // 审批查询
}

// 资金类型
export enum BILL_TYPE {
  OAYS = "OAYS", // 预收款
  OAYF = "OAYF", // 预付款
  OATS = "OATS", // 退预收款
  OATF = "OATF", // 退预付款
  YZ = "YZ", // 员工预支款
  YBX = "YBX", // 预支费用报销
  BX = "BX", // 普通费用报销
  OAAS = "OAAS", // 应收调拨对账补充登记
  OAAF = "OAAF" // 应付调拨对账补充登记
}

export enum BILL_TYPE_NAME {
  OAYS = "预收款",
  OAYF = "预付款",
  OATS = "退预收款",
  OATF = "退预付款",
  YZ = "员工预支款",
  YBX = "预支费用报销",
  BX = "普通费用报销",
  OAAS = "应收调拨对账补充登记",
  OAAF = "应付调拨对账补充登记"
}

export const IN_BILL_TYPES = [
  {
    id: BILL_TYPE.OAYS,
    name: "预收款"
  },
  {
    id: BILL_TYPE.OAYF,
    name: "预付款"
  }
];

export const OUT_BILL_TYPES = [
  {
    id: BILL_TYPE.OATS,
    name: "预收退款"
  },
  {
    id: BILL_TYPE.OATF,
    name: "预付退款"
  }
];

export const APPLY_AT_TYPES = [
  {
    id: "apply",
    name: "申请时间"
  },
  {
    id: "finish",
    name: "结算时间"
  }
];

export const BILL_TYPES = [
  {
    id: BILL_TYPE.OAYS,
    name: "预收款"
  },
  {
    id: BILL_TYPE.OAYF,
    name: "预付款"
  },
  {
    id: BILL_TYPE.OATS,
    name: "退预收款"
  },
  {
    id: BILL_TYPE.OATF,
    name: "退预付款"
  },
  {
    id: BILL_TYPE.YZ,
    name: "员工预支款"
  },
  {
    id: BILL_TYPE.YBX,
    name: "预支费用报销"
  },
  {
    id: BILL_TYPE.BX,
    name: "普通费用报销"
  },
  {
    id: BILL_TYPE.OAAS,
    name: "应收调拨对账补充登记"
  },
  {
    id: BILL_TYPE.OAAF,
    name: "应付调拨对账补充登记"
  }
];

// 审批状态
export enum APPROVAL_STATUS {
  toAudit = "toAudit", // 待审批
  otherToAudit = "otherToAudit", // 待对方审批
  rejected = "rejected", // 已驳回
  otherRejected = "otherRejected", // 对方已驳回
  cancelled = "cancelled", // 已取消
  otherCancelled = "otherCancelled", // 对方已取消
  toSettle = "toSettle", // 待结算
  partialSettled = "partialSettled", // 部分结算
  toReimburse = "toReimburse", // 待报销
  reimbursing = "reimbursing", // 报销中
  completed = "completed" // 完成
}

export enum APPROVAL_STATUS_NAME {
  toAudit = "待审批",
  otherToAudit = "待对方审批",
  rejected = "已驳回",
  otherRejected = "对方已驳回",
  cancelled = "已取消",
  otherCancelled = "对方已取消",
  toSettle = "待结算",
  partialSettled = "部分结算",
  toReimburse = "待报销",
  reimbursing = "报销中",
  completed = "完成"
}

// 状态：toAudit：待审核，otherToAudit：待对方审核，rejected：已驳回，otherRejected：对方已驳回，cancelled：已取消，otherCancelled：对方已取消， toSettle：待结算，partialSettled：部分结算，toReimburse：待报销，completed：完成
export const STATUSES = [
  {
    id: APPROVAL_STATUS.toAudit,
    name: "待审批"
  },
  {
    id: APPROVAL_STATUS.otherToAudit,
    name: "待对方审批"
  },
  {
    id: APPROVAL_STATUS.rejected,
    name: "已驳回"
  },
  {
    id: APPROVAL_STATUS.otherRejected,
    name: "对方已驳回"
  },
  {
    id: APPROVAL_STATUS.cancelled,
    name: "已取消"
  },
  {
    id: APPROVAL_STATUS.otherCancelled,
    name: "对方已取消"
  },
  {
    id: APPROVAL_STATUS.toSettle,
    name: "待结算"
  },
  {
    id: APPROVAL_STATUS.partialSettled,
    name: "部分结算"
  },
  {
    id: APPROVAL_STATUS.toReimburse,
    name: "待报销"
  },
  {
    id: APPROVAL_STATUS.reimbursing,
    name: "报销中"
  },
  {
    id: APPROVAL_STATUS.completed,
    name: "完成"
  }
];

export const DATE_TYPES = [
  { id: "apply", name: "申请日期" },
  { id: "finish", name: "完成时间" }
];

export const TRANSFER_TYPES = [
  {
    id: BILL_TYPE.OAAS,
    name: "应收"
  },
  {
    id: BILL_TYPE.OAAF,
    name: "应付"
  }
];

export const APPROVAL_BILL_ENUM = [
  {
    label: "往来分公司",
    value: "relatedCompanyName"
  },
  {
    label: "申请日期",
    value: "applyDate"
  },
  {
    label: "收支类目",
    value: "fundCategoryName"
  },
  {
    label: "往来单位",
    value: "cooperatorName"
  },
  {
    label: "申请金额",
    value: "applyAmount"
  },
  {
    label: "备注",
    value: "remark"
  },
  {
    label: "支付方式",
    value: "paymentType"
  },
  {
    label: "支付银行",
    value: "bank"
  },
  {
    label: "银行账户",
    value: "bankAccount"
  },
  {
    label: "联系人",
    value: "contact"
  },
  {
    label: "联系电话",
    value: "phone"
  }
];
