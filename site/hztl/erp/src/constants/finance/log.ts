export interface FinanceLogData {
  fundAccountName: string;
  fundAccountType: string;
  companyId: number;
  companyName: string;
  byCompanyId: number;
  byCompanyName: string;
  bank: string;
  bankAccount: string;
  previousBalance: string;
  income: string;
  expend: string;
  balance: string;
  belongs: {
    our: boolean;
    byOur: boolean;
    others: boolean;
  };
}

export interface FinanceLogDetail {
  settleCooperatorId: number;
  settleCooperatorName: string; // 来往单位名称
  paymentTypeName: string;
  paymentType: number; // 收付款类型 0/1 收/付
  paymentDate: string; // 收付款日期
  amount: string; // 金额
  balance: string; // 余额
  reviewBy: number; // 复核确认人ID
  reviewByName: string; // 复核确认人名字
  reviewDate: string; // 复核确认日期
  updatedBy: number; // 最后修改人ID
  updatedByName: string; // 最后修改人名字
  updatedAt: string; // 最后修改时间
  createdBy: number; // 登记人ID
  createdByName: string; // 登记人名字
  createdAt: string; // 登记时间
  checkNumber: string; // 票据号码
  checkDate: string; // 票据日期
  digest: string; // 摘要
  remark: string; // 备注
  status: number;
  statusName: string;
}
