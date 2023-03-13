import { create, mockList, resData } from '../../utils';

export default create([
  {
    url: '/ground-pc-api/card/order/frequency/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@id',
          'projectName': '@ctitle',
          'storeName': '@ctitle',
          'orderNo': '@id', // 订单编号
          'cardName': '@ctitle', // 卡名称
          'cardType': '@pick([1,2])', // 卡类型 1:期限卡 2:次卡
          'buyNum': '@integer(0,6000)', // 购买数量(期限卡为剩余天数，次卡为剩余次数）
          'membersName': '@cname', // 购卡人姓名
          'membersPhone|+1': 15000000000,
          'purchaseChannel': '@pick([1,2])', // 购买渠道 1:线上 2:线下
          'purchaseChannelName': '@pick(["线上","线下"])',
          'surplusNum': '@integer(0,1000)',
          'signStoreName': '@ctitle',
          'cardStatus': '@pick([1,2,3])',
          'cardStatusName': '@pick(["使用中","已冻结","已过期"])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/card/order/frequency/statistics',
    method: 'GET',
    response: resData({
      totalAmount: '@integer(1000,6000)',
      totalCardNum: '@integer(0,100)',
      totalNum: '@integer(100,600)',
      totalConsumedNum: '@integer(1000,100)',
      totalUnConsumedNum: '@integer(1000,6000)'
    })
  },
  {
    url: '/ground-pc-api/card/order/frequency/info/:id',
    method: 'GET',
    response: resData({
      'id': '@id',
      'projectName': '@ctitle', // 项目名称
      'venueName': '@ctitle', // 场馆名称
      'storeName': '@ctitle', // 店铺名字
      'activeStatus': '@pick([1,2])', // 激活状态 1:未激活 2:已激活
      'activeStatusName': '@pick(["未激活","已激活"])',
      'cardName': '@ctitle', // 卡名称
      'cardInfo': '@ctitle', // 卡介绍
      'surplusNum': '@integer(0,1000)', // 剩余次数
      'purchaseTime': '@date', // 购买时间
      'membersCode': '@id', // 会员号
      'membersName': '@cname', // 购卡人姓名
      'membersPhone|+1': 16000000000, // 购卡人手机号
      'idCard': '@id', // 购卡人身份证号
      'num': '@integer(0,999)', // 时间（天）
      'price': '@integer(1000,6000)', // 标价（元）
      'salePrice': '@integer(1000,6000)', // 售价（元）
      'giveNum': '@integer(0,100)', // 赠送次数
      'totalNum': '@integer(0,1000)', // 合计次数
      'payType': '@pick([1,2])', // 付款方式（1：微信、2：支付宝。。。。。。）
      'payTypeName': '@pick(["微信","支付宝"])', // 付款方式（1：微信、2：支付宝。。。。。。）
      'meetAmount': '@integer(3000,6000)', // 应付金额
      'payAmount': '@integer(1000,3000)', // 实付金额
      'expirationMethod': '@pick([1,2])', // 有效期类型，1、不限制 2、xx天内有效
      'expirationMethodName': '@pick(["不限制","xx天内有效"])', // 有效期
      'entrancePeriod': '@date()' + '~' + '@date()', // 入场时段
      'groundingInfo': '@pick(1,2])', // 上架信息
      'salesStaffName': '@cname', // 销售人员姓名
      'contractCode': '@id', // 合同编号
      'cardRemark': '@ctitle', // 卡说明
      'useRecords|1-10': [
        {
          'entranceDate': '@datetime', // 入场时间
          'exitDate': '@datetime', // 出场时间
          'duration|1-100': 1
        }
      ]
    })
  }
]);
