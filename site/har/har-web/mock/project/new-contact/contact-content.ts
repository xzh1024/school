import { create, mockList, resData } from '../../utils';

export default create([
  {
    url: '/cbd-api-project/intention/contract/history/1',
    method: 'get',
    response: resData([
      {
        contractId: '1',
        prevVersionId: '2',
        version: '1',
        contractCode: 'xxxx1',
        contractPaperCode: 'xxxx1223',
        content: 'ID变了',
        creator: '张三',
        createTime: '2022-12-26'
      }
    ])
  },
  {
    url: '/cbd-api-project/intention/contract/abstract/info/1',
    method: 'get',
    response: resData({
      // { number } 合同id
      contractId: '1',
      // { string } 合同编号
      contractCode: 'xxxx1',
      // { string } 项目名称
      projectName: '菁蓉大厦租赁',
      // { number } 商户id
      merchantId: '100',
      // { string } 商户名称
      merchantName: '肆同包子',
      // { string } 合同备注
      contractRemark: '无',
      // { number } 店铺id
      storeId: '123',
      // { string } 店铺名称
      storeName: '肆同包子天府二街店',
      // { number } 品牌id
      brandId: '102',
      // { string } 品牌名称
      brandName: '肆同包子',
      // { number } 业态id
      formatId: 12,
      // { string } 业态名称
      formatName: '肆同包子',
      // { number } 楼宇id
      buildingId: 12,
      // { string } 楼宇名称
      buildingName: 'A座',
      // { number } 楼层id
      floorId: 13,
      // { string } 楼层名称
      floorName: '13层',
      // { number } 铺位总建筑面积
      estateFloorage: 200,
      // { number } 铺位总使用面积
      estateUseArea: 180,
      // { string } 铺位ids
      estateId: '1',
      // { string } 铺位名称
      estateName: '1铺',
      // { number } 主营铺位id
      mainEstateId: 1,
      // { string } 主营铺位名称
      mainEstateName: '主营铺位名称',
      // { string } 签约时间
      signDate: '2022-12-01',
      // { string } 合同租赁开始时间
      leaseStartDate: '2022-12-01',
      // { string } 合同租赁结束时间
      leaseEndDate: '2023-12-01',
      // { string } 返款信息
      refundInfo: '返款100元',
      // { string } 意向金或保证金信息
      intentionInfo: '无',
      // { number } 费用总项数
      expenseNum: 1,
      // { Array<object> } 费用项数 ,MisContractAbstractExpenseResp
      ['expenseList|2-6']: [
        {
          // { number } 合同摘要id
          abstractId: 1,
          // { number } 费用项目id
          expenseId: 1,
          // { string } 费用项目名称
          expenseName: '购置费用',
          // { number } 费用阶段id
          stageId: 1,
          // { string } 费用阶段开始时间
          stageStart: '2022-12-01',
          // { string } 费用阶段结束时间
          stageEnd: '2023-12-01',
          // { number } 账单生成日(按日出账为空)
          billGenDate: 30,
          // { number } 是否含税(0：否，1：是)
          taxFlag: 0,
          // { number } 税率
          tax: 3,
          // { string } 收款调整信息
          paymentInfo: '收款调整信息数据',
          // { string } 结算条款信息
          settlementInfo: '结算条款信息数据',
          // { string } 免租条款信息
          rentFreeInfo: '免租条款信息数据',
          // { string } 滞纳金条款信息
          lateFeeInfo: '滞纳金条款信息数据'
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/common-mis/pay/method/select-contract',
    method: 'get',
    response: resData([
      {
        // { number } 支付方式id
        value: 1,
        // { string } 支付方式名称
        label: '支付宝',
        // { number } 费率单位千分之
        feeRate: 3.5
      },
      {
        // { number } 支付方式id
        value: 2,
        // { string } 支付方式名称
        label: '微信',
        // { number } 费率单位千分之
        feeRate: 4.5
      }
    ])
  },
  {
    url: '/cbd-api-project/formal/contract/late/fee/save',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/formal/contract/file/save',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/formal/contract/file/info/-1',
    method: 'get',
    response: resData({
      // { number } 合同ID
      contractId: -1,
      // { Array<object> } 铺位明细 ,MisContractFileDetailVo
      misContractFileDetailVos: [
        {
          // { number } 资源ID
          fileId: -1,
          // { string } 附件名称
          fileName: '商品租赁合同.pdf',
          // { string } 描述
          describe: '描述信息'
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/formal/contract/back/info/-1',
    method: 'get',
    response: resData([
      {
        // { number } 合同id
        contractId: -1,
        // { number } 费用项目
        itemType: 10,
        // { string } 费用项目名称
        itemTypeName: '费用',
        // { number } 账期单位21、月2、日
        periodUnit: 2,
        // { number } 账期
        period: 2,
        // { number } 返款调整单位11、延后2、提前
        backUnitOne: 1,
        // { number } 返款调整单位1、月2、自然日3、工作日
        backUnitTwo: 1,
        // { number } 返款调整
        back: 10,
        // { number } 账单生成日
        billGenDay: 10,
        // { number } 是否按比例转预付款0、否1、是
        advancePayment: 0,
        // { number } 是否收取手续费0、否1、是
        serviceCharge: 0,
        // { number } 转预付款比例
        proportion: 3.5,
        // { number } 转入预付款费用项目
        intoTaxIncluded: 3.2,
        // { string } 转入费用项目名称
        intoTaxIncludedName: 'fuw',
        // { Array<object> } 返款方式 ,BackPayment
        backPayment: [
          {
            // { number } 支付方式
            method: 1,
            // { number } 手续费率
            rate: 3.5
          }
        ]
      }
    ])
  }
]);
