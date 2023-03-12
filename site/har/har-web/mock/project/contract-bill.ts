import { create, mockList, resData } from '../utils';

export default create([
  {
    url: '/cbd-api-project/contract/clear/bill/list',
    method: 'GET',
    response: resData({
      total: 1,
      rows: [
        {
          // { number } 审批状态1、未提交2、审批中3、已驳回4、已撤销5、已通过
          verifyStatus: 1,
          // { number } 业务状态1、草稿2、待确认3、已确认4、已作废
          businessStatus: 1,
          // { string } 品牌名称
          brandName: '肆同包子',
          // { string } 店铺名称
          storeName: '肆同包子',
          // { string } 商户名称
          merchantName: '肆同包子',
          // { string } 合同号
          contractCode: 'XSEW85421457485',
          // { string } 项目名称
          projectName: '肆同包子租赁',
          // { string } 清算单号
          code: 'WESSS4585421548112',
          // { number } 清算单id
          id: -1
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/contract/clear/bill/delete',
    method: 'DELETE',
    response: resData(null)
  },
  {
    url: '/cbd-api-project/contract/clear/bill/confirm',
    method: 'POST',
    response: resData(null)
  },
  {
    url: '/cbd-api-project/contract/clear/bill/batch/confirm',
    method: 'POST',
    response: resData(null)
  },
  {
    url: '/cbd-api-project/contract/clear/bill/info/-1',
    method: 'GET',
    response: resData({
      // { number } 清算单id
      id: -1,
      // { string } 项目名称
      projectName: '肆同包子',
      // { string } 商户名称
      merchantName: '肆同包子',
      // { string } 店铺名称
      storeName: '肆同包子',
      // { string } 品牌名称
      brandName: '肆同包子',
      // { string } 合同号
      contractCode: 'XES748574545454554D',
      // { Array<string> } 铺位 ,String
      doorPlates: [],
      // { number } 业务状态1、草稿2、待确认3、已确认4、已作废
      businessStatus: 1,
      // { number } 审批状态1、未提交2、审批中3、已驳回4、已撤销5、已通过
      verifyStatus: 1,
      // { Array<object> } 应收费用 ,ContractReceivableFee
      receivableFeeList: [
        {
          // { number } 费用单id
          id: -1,
          // { string } 费用项目
          expenseItemsName: '肆同包子',
          // { string } 收费方式
          chargingMethod: '支付宝',
          // { number } 应收金额
          receivableAmount: 30,
          // { number } 实收金额
          actualAmount: 25,
          // { number } 欠缴金额
          arrearsAmount: 5
        }
      ],
      // { Array<object> } 销售返款 ,ContractBackFee
      backFeeList: [
        {
          // { number } 未付金额
          arrearsAmount: 5,
          // { number } 已付金额
          actualAmount: 25,
          // { number } 转预付款金额
          transferAmount: 20,
          // { number } 应付金额
          receivableAmount: 5,
          // { number } 销售额
          salesAmount: 5,
          // { number } 费用单id
          id: -1,
          // { string } 费用项目
          expenseItemsName: '肆同包子'
        }
      ],
      // { Array<object> } 存款费用 ,ContractDepositFee
      depositFeeList: [
        {
          // { number } 费用单id
          id: -1,
          // { string } 费用项目
          expenseItemsName: '肆同包子',
          // { number } 实收金额
          receivableAmount: 30,
          // { number } 已处理金额
          actualAmount: 5,
          // { number } 可处理金额
          arrearsAmount: 5
        }
      ]
    })
  }
]);
