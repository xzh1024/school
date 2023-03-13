interface PageModel {
  page?: number;
  pageSize?: number;
}

export interface TagModel {
  id: string;
  name: string;
}
export interface OptionModel {
  id: number;
  name: string;
}

export interface FundCategoriesOptionModel {
  id: number; // 主键ID
  name: string; // 名称
  parentNames: string[]; // 父名称，从高到低
  fullName: string; // 全名称
  code: string; // 编码
  type: string; // 收支方向 收入：in 支出：out
  status: string; // 状态 停用：disable 启用：enable
  billTypes: string[]; // 映射的单据类型 有元素时为指定类型单据可使用 无元素时为公共类目
}

export interface OaCountModel {
  toProcess: number; // 待处理OA审批数
  applied: number; // 已发起OA审批数
  max?: number;
}

export interface ImageFileModel {
  name: string;
  url: string;
  origin: string;
}

export interface AccountInfoModel {
  paymentType?: string; // 支付方式
  bank?: string; // 银行
  bankAccount?: string; // 银行账户
  contact?: string; // 联系人
  phone?: string; // 联系电话
}

export interface ApprovalParams {
  id: number; // 费用审批Id
  billType: string; // 单据类型
  reason?: string; // 驳回原因
}

export interface FinancialsBalanceParams {
  billType: string; // 单据类型 必传 预收：YS 预付：YF
  companyId?: number; // 公司ID
  cooperatorId?: number; // 往来单位ID
  sourceBillType?: string; // 来源单据类型，获取专款使用
  sourceBillId?: number; // 来源单据ID，获取专款使用
}

export interface FinancialsBalanceModel {
  commonBalance: string; // 公共余额
  specialBalance: string; // 专款余额
}

export interface FeeApplicationCreateParams {
  billType?: string; // 费用类型：OAYS：预收款，OAYF：预付款， OATS：退预收款，OATF：退预付款，YZ：员工预支款，YBX：预支费用报销，BX：普通费用报销
  companyId?: number | string; // 业务分公司Id
  cooperatorId?: number | string; // 往来单位Id
  relatedCompanyId?: number | string; // 往来公司ID
  fundCategoryId?: number | string; // 收支类目ID
  applyDate?: string; // 申请时间
  applyAmount?: string; // 申请金额
  applyReason?: string; // 申请原因
  advanceBillId?: number | string; // 待报销的预支费用Id
  voucherImages?: Array<ImageFileModel | string>; // 凭证图片
  remark?: string; // 备注
  accountInfo?: AccountInfoModel; // 支付信息
  businessManId?: number | null; // 业务员Id
}
export interface FundCategoriesOptionQueryParams {
  keyword?: string; // 关键字
  status?: string; // 状态 停用：disable 启用：enable
  type?: string; // 收支方向，不传全部 收入：in 支出：out
  pageSize?: number; // 列出数量
  queryBillType: string; // 列出收支类目方式 none:无需任何方式 common:公共收支类目 special:特殊收支类目
  billTypes?: string[]; // 映射的单据类型 传null为全部单据类型 传[]为所有公共类型 传['XXX']为所有包含XXX单据类型
}

export interface FeeApplicationQueryParams extends PageModel {
  type?: string; // 查询类型， toProcess：待处理，initiated：已发起，approvalQuery：审批查询
  createdByCompanyIds?: number[]; // 发起人分公司Id
  companyIds?: number[]; // 业务分公司Id
  billTypes?: string[]; // 审批类型：YZ-预支费用,BX-费用报销,YBX-预支报销
  billNo?: string; // 审批单号
  statuses?: string[]; // 审批状态
  applicantId?: number | null; // 发起人
  approvedBy?: number | null; // 审批人
  dateType?: string; // 日期类型：apply：申请时间，finish：完成时间
  fromDate?: string; // 开始日期
  toDate?: string; // 结束日期
  timeRange: string[];
  cooperatorId?: number; // 往来单位Id
  fundCategoryIds?: []; // 收支类目IDs
}

export interface FeeApplicationActions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  cancel?: boolean;
  approve?: boolean;
}

export interface FeeApplicationModel {
  id: number; // 费用审批ID
  billType: string; // 审批类型
  billNo: string; // 审批单号
  applyDate: string; // 申请日期
  status: string; // 状态：toAudit：待审核，otherToAudit：待对方审核，rejected：已驳回，otherRejected：对方已驳回，cancelled：已取消，otherCancelled：对方已取消， toSettle：待结算，partialSettled：部分结算，toReimburse：待报销，completed：完成
  fundCategoryId: number; // 收支类目ID
  fundCategoryName: string; // 收支类目名称
  cooperatorId: number; // 往来单位ID
  cooperatorName: string; // 往来单位名称
  sourceBillId: number; // 来源单据ID
  sourceBillNo: string; // 来源单据号
  sourceBillType: string; // 来源单据类型
  sourceAmount: string; // 来源单金额
  applyAmount: string; // 申请金额
  createdByCompanyId: number; // 发起人分公司Id
  createdByCompanyName: string; // 发起人分公司名称
  companyId: number; // 业务分公司Id
  companyName: string; // 业务分公司名称
  applicantId: number; // 发起人Id
  applicantName: string; // 发起人名称
  approvedBy: number; // 审批人
  approvedByName: string; // 审批人名称
  approvedByCompanyId: number; // 审批人分公司Id
  approvedByCompanyName: string; // 审批人分公司名称
  reason: string; // 驳回原因
  remark: string; // 备注
  actions: FeeApplicationActions; // 可以做的操作
  relatedCompanyId: number;
  relatedCompanyName: string; // 往来公司名称
}

export interface FeeApplicationInfoModel {
  id: number; // 费用ID
  accountSetId: number; // 账套ID
  createdByCompanyId: number; // 公司ID
  companyId: number; // 业务公司公司ID
  cooperatorId: number; // 往来单位ID
  businessManId: number; // 业务员ID
  billNo: string; // 费用单号
  billType: string; // 费用类型：OAYS：预收申请，OAYF：预付申请， OATS：预收退款申请，OATF：预付退款申请，YZ：预支费用，YBX：报销预支费用，BX：报销费用
  status: string; // 状态：toAudit：待审核，rejected：已驳回，cancelled：已取消， toSettle：待结算，partialSettled：部分结算，toReimburse：待报销，completed：完成
  fundCategoryId: number; // 收支类目ID billType为员工预支款、员工预支款报销、普通费用报销时有效
  applyAmount: string; // 申请金额
  settledAmount: string; // 已结算金额
  sourceBillId: number; // 来源单据ID
  sourceBillNo: string; // 来源单据号
  sourceBillType: string; // 来源单据类型
  reason: string; // 拒绝原因
  voucherImages: string[]; // 凭证图片
  // 支付信息
  accountInfo: {
    paymentType: string; // 支付方式
    bank: string; // 银行
    bankAccount: string; // 银行账户
    contact: string; // 联系人
    phone: string; // 联系电话
  };
  applyDate: string; // 申请日期
  approvedAt: string; // 审批时间
  approvedBy: number; // 审批人
  settleAt: string; // 结算时间
  settleBy: number; // 结算人
  completedAt: string; // 完成时间
  completedBy: number; // 完成人
  remark: string; // 备注
  createdBy: number; // 创建者员工ID
  createdAt: string; // 创建时间
  updatedBy: number; // 更新者员工ID
  updatedAt: string; // 更新时间
  createdByCompanyName: string; // 发起人分公司名称
  cooperatorName: string; // 往来单位名称
  companyName: string; // 业务分公司名称
  fundCategoryName: string; // 收支类目名称
  applicantName: string; // 发起人名称
  approvedByName: string; // 审批人名称
  approvedByCompanyId: number; // 审批人名称
  approvedByCompanyName: string; // 审批人名称
  toFinancialAmount: number; // 待结算
  actions: FeeApplicationActions; // 可以做的操作
  sourceAmount: string; // 来源单据金额
  relatedCompanyId: number;
  relatedCompanyName: string; // 往来公司名称
}

export interface FeeApplicationSelectModel {
  billId: number;
  billNo: string;
  amount: string | number;
  fundCategoryName: string;
  toFinancialAmount: number;
}
