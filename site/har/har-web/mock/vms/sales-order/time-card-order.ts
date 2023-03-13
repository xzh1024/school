import { create, mockList, resData } from '../../utils';

export default create([
  {
    url: '/ground-pc-api/card/order/timeLimit/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@id',
          'projectName': '@ctitle', // 项目名称
          'storeName': '@ctitle', // 店铺名字
          'orderNo': '@id', // 订单编号
          'cardName': '@ctitle', // 卡名称
          'cardType': '@pick([1,2])', // 卡类型 1:期限卡 2:次卡
          'buyNum': '@integer(0,6000)', // 购买数量(期限卡为剩余天数，次卡为剩余次数）
          'membersName': '@cname', // 购卡人姓名
          'membersPhone|+1': 16000000000,
          'purchaseChannel': '@pick([1,2])', // 购买渠道 1:线上 2:线下
          'purchaseChannelName': '@pick(["线上","线下"])',
          'signStoreName': '@ctitle', // 签单门店(操作人所属门店)
          'activeStatus': '@pick([1,2])', // 激活状态 1:未激活 2:已激活
          'activeStatusName': '@pick(["未激活","已激活"])',
          'cardStatus': '@pick([1,2,3])', // 卡状态  1:使用中 2:已冻结 3:已过期
          'cardStatusName': '@pick(["使用中","已冻结","已过期"])',
          'contractId': '@id' // 合同id
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/card/order/timeLimit/statistics',
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
    url: '/ground-pc-api/card/order/timeLimit/freeze',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card/order/timeLimit/thaw',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card/order/timeLimit/info/:id',
    method: 'GET',
    response: resData({
      'id': '@id',
      'projectName': '@ctitle', // 项目名称
      'venueName': '@ctitle', // 场馆名称
      'storeName': '@ctitle', // 店铺名字
      'activeStatus': '@pick([1,2])', // 激活状态 1:未激活 2:已激活
      'activeStatusName': '@pick(["未激活","已激活"])',
      'cardName': '@ctitle', // 卡名称
      'cardIntroduce': '@ctitle', // 卡介绍
      'surplusNum': '@integer(0,999)', // 剩余天数
      'purchaseTime': '@date', // 购买时间
      'surplusFreezeNum': '@integer(0,100)', // 剩余冻结天数
      'membersCode': '@id', // 会员号
      'membersName': '@cname', // 购卡人姓名
      'membersPhone|+1': 16000000000, // 购卡人手机号
      'idCard': '@id', // 购卡人身份证号
      'days': '@integer(0,999)', // 时间（天）
      'price': '@integer(1000,6000)', // 售价（元）
      'freezeNum': '@integer(0,100)', // 允许冻结天数
      'giveDays': '@integer(0,100)', // 赠送时间（天）
      'totalDays': '@integer(0,1000)', // 合计天数
      'payType': '@pick([1,2])', // 付款方式（1：微信、2：支付宝。。。。。。）
      'meetAmount': '@integer(3000,6000)', // 应付金额
      'payAmount': '@integer(1000,3000)', // 实付金额
      'activeType': '@pick([1,2,3])', // 激活方式 1购买激活 2第一次到店激活 3指定日期激活
      'activeTypeName': '@pick(["购买激活","第一次到店激活","指定日期激活"])',
      'entrancePeriod': '@date()' + '~' + '@date()', // 入场时段
      'transferState': '@pick([1,2])', // 是否支持转让（1：是、2：否）
      'transferStateName': '@pick(["是","否"])',
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
