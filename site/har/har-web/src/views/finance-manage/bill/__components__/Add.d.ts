export type EditForm = {
  /**
   * 业务主键
   */
  id?: number;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 项目名字
   */
  projectName?: string;
  /**
   * 商户id
   */
  merchantId?: number;
  /**
   * 商户名字
   */
  merchantName?: string;
  /**
   * 商铺id
   */
  storeId?: number;
  /**
   * 商铺名字
   */
  storeName?: string;
  expenseKey: string;
  /**
   * 账单类型1收款单2付款单,,@seeBillTypeEnum
   */
  billType?: number;
  /**
   * 费用项目id
   */
  expenseItemsId?: number;
  /**
   * 费用项目名称
   */
  expenseItemsName?: string;
  /**
   * 收费方式手工账单默认为固定费用：1,,@seeChargingMethodEnum
   */
  chargingMethod?: number;
  /**
   * 账单生成日期(应收日)
   */
  billCreateAt?: string;
  /**
   * 账期
   */
  paymentDays?: string;
  /**
   * 费用开始日期
   */
  startAt?: string;
  /**
   * 费用结束日期
   */
  endAt?: string;
  /**
   * 金额
   */
  amount?: number;
  /**
   * 是否含税1是0否,,@seeYesOrNoEnum
   */
  hasTax?: number;
  /**
   * 税率,单位%
   */
  taxRate?: number;
  /**
   * 税额
   */
  taxAmount?: number;
  /**
   * 不含税金额
   */
  taxExclusiveAmount?: number;
  /**
   * 应收金额
   */
  receivableAmount?: number;
  /**
   * 业务状态0草稿1待确认2未支付3已作废4部分支付5已结清,@seeBusinessStatEnum
   */
  businessStat?: number;
};
