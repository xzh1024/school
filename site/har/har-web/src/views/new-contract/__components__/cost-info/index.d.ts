import {
  cbdApiProjectIntentionContractPayAddOrUpdatePaySchemesPost,
  CbdApiProjectIntentionContractPayAddOrUpdatePaySchemesPostRequest
} from '@/api';

export interface contractPaySchemeStagesItem {
  id?: number;
  startDate: string;
  endDate: string;
  schemeType?: number;
  algMethod?: number;
  commissionRatio?: string;
  fixedPrice?: string;
  guaranteePrice?: number;
  paymentType?: number;
  paymentScheme?: number;
  statementDay?: number;
  repaymentType?: number;
  repaymentMethod?: number;
  repaymentScheme?: number;
  leaseMethod?: number;
  taxRatio?: string;
  repairAlgMethod?: number;
  calculateAreaMethod?: number;
  calculateArea?: string;
  initPeriod?: number;
  initPeriodMethod?: number;
  initPrice?: string;
  increasePeriod?: number;
  increasePeriodMethod?: number;
  increaseMethod?: number;
  increaseValue?: string;
  freeList: freeItemType[];
  commissionList?: commissionItem[];
}

export interface contractPaySchemesItem {
  key?: number;
  id?: number;
  paySchemeStages: contractPaySchemeStagesItem[];
  expenseId?: number;
  chargingMethod?: number;
  hasTax?: boolean;
  hasFree?: boolean;
  hasIncrease?: boolean;
}
export interface contractPaySchemesItemRequest {
  id?: number;
  paySchemeStages: CbdApiProjectIntentionContractPayAddOrUpdatePaySchemesPostRequest[number]['paySchemes'][number]['paySchemeStages'];
  expenseId: number;
  chargingMethod?: number;
  hasTax: number;
  hasFree: number;
  hasIncrease: number;
}

export interface freeItemType {
  id?: number;
  freePayments?: {
    id?: number;
    paymentPeriod?: string;
    startDate?: string;
    endDate?: string;
  }[];
  freeMethod?: number;
  freeValue?: string;
}

export interface commissionItemType {
  id?: number;
  groupId?: number;
  groupName?: string;
  subCommissionList?: {
    id?: number;
    startVolume?: string;
    endVolume?: string;
    commissionRatio: string;
  }[];
  startVolume?: string;
  endVolume?: string;
  commissionRatio?: string;
}

export interface previewPaymentType {
  id: number;
  expenseType: string;
  paymentMethod?: string;
  paymentPeriod: string;
  paymentPeriodStart?: string;
  paymentPeriodEnd?: string;
  statementDay: string;
  contractPayment: string;
  hasTax: number;
  /**
   * 税率千分比
   */
  taxRatio: string;
  /**
   * 不含税金额(元)
   */
  taxExcludePayment: string;
  /**
   * 税额(元)
   */
  taxPayment: string;
  /**
   * 免租金额(元)
   */
  freePayment: string;
  /**
   * 实付总金额
   */
  actPayment: string;
}

export interface previewTypeItem {
  /**
   * 费用项目id
   */
  expenseId: number;
  /**
   * 费用项目
   */
  expenseType: string;
  /**
   * 费用项目编号
   */
  expenseKeyCode: string;
  /**
   * 收费方式(租金与物业费时有值)
   */
  paymentMethod?: string;
  /**
   * 账期
   */
  paymentPeriod: string;
  /**
   * 账期开始日期yyyy-MM-dd(租金与物业费时有值，paymentPeriodStart冗余字段)
   */
  startDate: string;
  /**
   * 账期结束日期yyyy-MM-dd(租金与物业费时有值，paymentPeriodEnd冗余字段)
   */
  endDate: string;
  /**
   * 账单日(应收日)yyyy-MM-dd
   */
  statementDay: string;
  /**
   * 合同金额
   */
  contractPayment: string;
  /**
   * 是否含税1是；0否
   */
  hasTax: number;
  /**
   * 税率千分比
   */
  taxRatio: string;
  /**
   * 不含税金额(元)
   */
  taxExcludePayment: string;
  /**
   * 税额(元)
   */
  taxPayment: string;
  /**
   * 免租金额(元)
   */
  freePayment: string;
  /**
   * 实付总金额
   */
  actPayment: string;
}
