export const BUSINESS_STATUS: Recordable = {
  1: '草稿',
  2: '待确定',
  3: '已确认',
  4: '已作废'
};

export const VERIFY_STATUS: Recordable = {
  1: '未提交',
  2: '审批中',
  3: '已驳回',
  4: '已撤销',
  5: '已通过'
};

export class BillSaveReq {
  // { number } 合同id
  contractId = -1;
}

export class BillInfoResp extends BillSaveReq {
  // { number } 清算单id
  id = '';
  // 流程ID
  flowProcessId = '';
  // { string } 清算单号
  code = '';
  // { number } 项目id
  projectId = null;
  // { string } 项目名称
  projectName = '';
  // { string } 商户id
  merchantId = '';
  // { string } 商户名称
  merchantName = '';
  // { number } 店铺id
  storeId = '';
  // { string } 店铺名称
  storeName = '';
  // { number } 品牌id
  brandId = '';
  // { string } 品牌名称
  brandName = '';
  // { string } 合同号
  contractCode = '';
  // { Array<string> } 铺位 ,String
  doorPlates = [];
  // { number } 业务状态1、草稿2、待确认3、已确认4、已作废
  businessStatus = 1;
  // { number } 审批状态1、未提交2、审批中3、已驳回4、已撤销5、已通过
  verifyStatus = 1;
  // { string } 租赁开始日期
  leaseStartDate = '';
  // { string } 租赁结束日期
  leaseEndDate = '';
  // { Array<object> } 应收费用 ,ContractReceivableFee
  receivableFeeList = [];
  // { Array<object> } 销售返款 ,ContractBackFee
  backFeeList = [];
  // { Array<object> } 存款费用 ,ContractDepositFee
  depositFeeList = [];
  without = false;
}
