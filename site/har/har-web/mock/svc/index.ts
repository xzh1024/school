import { create, mockList, resData } from '../utils';
import { mock } from 'mockjs';
// import activity from './activity';
// import finance from './finance';
// import home from './home';
// import electronCard from './electronCard'; //导入电子管理卡模块
// import serviceCounter from './service-counter';
// import login from './login';

export default create([
  // ...electronCard(),
  // ...login(),
  // ...serviceCounter(),
  // ...activity(),
  // ...finance(),
  // ...home()
  {
    url: '/svc-web/service-counter/page',
    method: 'GET',
    response: resData(
      mockList(
        {
          'memberCardId|+1': 1,
          'projectName': '@cname',
          'cardName': '@cname',
          'cardCode': '@id',
          'status|1': [1, 2, 3],
          'memberName': '@cname',
          'memberPhone': /1\d{0,10}/,
          'rechargeAmount': 100.1,
          'consumeAmount': 200,
          'balance': 20,
          'cardSoldDate': '@date'
        },
        {}
      )
    )
  },
  {
    url: `/svc-web/service-counter/info/:memberCardId`,
    method: 'GET',
    response: resData(
      mock({
        'memberCardId|1': 1,
        'projectName': '@cname',
        'cardName': '@ctitle',
        'cardCode': '@id',
        'beforeStatus|1': [1, 2, 3],
        'status|1': [1, 2, 3],
        'memberName': '@cname',
        'memberPhone': /1\d{0,10}/,
        'rechargeAmount': 100,
        'consumeAmount': 200,
        'balance': 20,
        'canRefundBalance': 122,
        'RefundBalance': 10,
        'refundMemberName': '@cname',
        'refundTime': '@date'
      })
    )
  },
  {
    url: '/svc-web/service-counter/freeze-history/:memberCardId',
    method: 'GET',
    response: resData(
      mockList(
        {
          'memberCardFreezeId|+1': 1,
          'type|1': [1, 2],
          'code': '@id',
          'freezeBy': '@cname',
          'freezeTime': '@date'
        },
        {}
      )
    )
  },
  {
    url: '/svc-web/service-counter/recharge-history/:memberCardId',
    method: 'GET',
    response: resData(
      mockList(
        {
          'memberCardRechargeId|1': 1,
          'type|1': [1],
          'code': '@id',
          'paymentAmount': 21,
          'discountAmount': 23,
          'receivedAmount': 2,
          'rechargeBy': '充值人',
          'rechargeTime': '@date'
        },
        {}
      )
    )
  },
  {
    url: '/svc-web/service-counter/consume-history/:memberCardId',
    method: 'GET',
    response: resData(
      mockList(
        {
          'type|1': [1, 2, 3, 4, 5],
          'time': '@date',
          'serialNo': '@id',
          'storeCode': '@id',
          'storeName': '@ctitle',
          'operator': '@cname',
          'operationAmount': 123,
          'balance': 166
        },
        {}
      )
    )
  },
  {
    url: '/svc-web/service-counter/return-history/:memberCardId',
    method: 'GET',
    response: resData(
      mock({
        'list|1': [
          {
            payWay: 1,
            amount: 1
          }
        ]
      }).list
    )
  },
  {
    url: '/svc-web/member/card/recharge/detail/:id',
    method: 'GET',
    response: resData(
      mock({
        'id|+1': 1,
        'orderNo': '@id',
        'projectName': '@ctitle',
        'source|1': [1, 2],
        'status|1': [1, 2, 3, 4],
        'cardName': '@ctitle',
        'memberCardCode': '@id',
        'memberCode': '@id',
        'memberName': '@cname',
        'memberPhone': /1\d{10}/,
        'rechargeAmount': 12,
        'actuallyAmount': 123,
        'discountAmount': 22,
        'receivedAmount': 136,
        'balance': 123,
        'createBy': '@cname',
        'createTime': '@date',
        'activityName': '@cname',
        'modeList|1-3': [
          {
            'payment|1': [1, 2, 3],
            'amount': 23
          }
        ]
      })
    )
  },
  {
    url: '/svc-web/member/card/freeze/detail/:id',
    method: 'GET',
    response: resData(
      mock({
        'id|1': 1,
        'orderNo': '@id',
        'projectName': '@ctitle',
        'cardName': '@ctitle',
        'memberCardCode': '@id',
        'memberCode': '@id',
        'memberName': '@cname',
        'memberPhone': /1\d{10}/,
        'balance': 1,
        'currentStatus|1': [1, 2, 3],
        'beforeStatus|1': [1, 2, 3],
        'freezeBy': '@cname',
        'freezeTime': '@date',
        'unfreezeBy': '@cname',
        'unfreezeTime': '@date'
      })
    )
  },
  {
    url: '/svc-web/common/activity/select/code',
    method: 'POST',
    response: resData(
      mock({
        'list|6-10': [
          {
            value: '@id',
            label: '@ctitle'
          }
        ]
      }).list
    )
  },
  {
    url: '/svc-web/common/project-select',
    method: 'POST',
    response: resData(
      mock({
        'list|6-10': [
          {
            value: '@id',
            label: '@ctitle'
          }
        ]
      }).list
    )
  },
  {
    url: '/svc-web/common/project-select',
    method: 'POST',
    response: resData(
      mock({
        'list|6-10': [
          {
            value: '@id',
            label: '@ctitle'
          }
        ]
      }).list
    )
  },
  {
    url: '/svc-web/captchaImage',
    method: 'get',
    response: resData(
      mock({
        captchaOnOff: false
      })
    )
  },
  {
    url: '/svc-web/login',
    method: 'post',
    response: resData(
      mock({
        token: '@id'
      })
    )
  },
  {
    url: '/svc-web/getInfo',
    method: 'get',
    response: resData(
      mock({
        user: {
          userId: '@id',
          userName: '@cname',
          realName: '@cname',
          nickName: '@cname',
          email: '@email',
          sex: 1,
          avatar: '@image'
        },
        roles: [],
        permissions: []
      })
    )
  },
  {
    url: '/svc-web/getRouters',
    method: 'get',
    response: resData(
      mock([
        {
          name: '储值卡服务台',
          path: '/svc/service-counter',
          hidden: false,
          redirect: '',
          meta: {
            title: '储值卡服务台',
            icon: '',
            noCache: false
          },
          isFrame: 1
        }
      ])
    )
  },
  {
    url: '/svc-web/home/data',
    method: 'get',
    response: resData(
      mock({
        open: {
          amount: '@integer',
          orderNum: 1313
        },
        recharge: {
          amount: '@integer',
          orderNum: 256
        },
        consume: {
          amount: '@integer',
          orderNum: 256
        },
        refund: {
          amount: '@integer',
          orderNum: 150
        },
        chart: [
          {
            name: '@string',
            value: 435
          },
          {
            name: '@string',
            value: 5346
          },
          {
            name: '@string',
            value: 867
          },
          {
            name: '@string',
            value: 956
          }
        ]
      })
    )
  },
  {
    url: '/svc-web/home/history-data',
    method: 'GET',
    response: resData(
      mock({
        x: [
          {
            showData: '7-3',
            fullData: '1号店铺'
          },
          {
            showData: '7-4',
            fullData: '2号店铺'
          },
          {
            showData: '7-5',
            fullData: '3号店铺'
          },
          {
            showData: '7-6',
            fullData: '4号店铺'
          },
          {
            showData: '7-7',
            fullData: '5号店铺'
          },
          {
            showData: '7-8',
            fullData: '6号店铺'
          }
        ],
        buyY: {
          name: '支付宝支付',
          value: [15, 1313, 546, 48.1, 568.2, 456]
        },
        rechargeY: {
          name: '微信支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        consumeY: {
          name: 'POS机支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        refundY: {
          name: '现金支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        returnY: {
          name: '支付宝支付',
          value: [15, 133, 46, 485.1, 500, 456]
        }
      })
    )
  },
  {
    url: '/svc-web/store_statement/page',
    method: 'get',
    response: resData(
      mockList(
        {
          projectId: '@id',
          projectName: '@ctitle',
          billDate: '@date',
          billNo: '@id',
          storeCode: '@id',
          storeName: '@ctitle',
          amount: '@integer'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/store_statement/info',
    method: 'get',
    response: resData(
      mockList(
        {
          tradeTime: '@datetime',
          serialNo: '@id',
          memberCardId: '@id',
          cardName: '@ctitle',
          walletCode: '@id',
          type: '@pick([1,2,3,4,5])',
          amount: '@id'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/store_statement/export',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/svc-web/trade_history/page',
    method: 'get',
    response: resData(
      mockList(
        {
          projectId: '@id',
          projectName: '@ctitle',
          type: '@pick([1,2,3,4,5])',
          tradeTime: '@datetime',
          tradeNo: '@id',
          cardId: '@id',
          cardName: '@ctitle',
          walletCode: '@id',
          clientId: '@id',
          memberCode: '@id',
          memberName: '@ctitle',
          memberPhone: '@phone',
          storeCode: '@id',
          storeName: '@ctitle',
          createBy: '@cname',
          discount: '@pick(7,8,8,9,10)',
          principal: '@cname',
          balance: '@id'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/trade_history/export',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/svc-web/common/store/list',
    method: 'GET',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: 1
        },
        {
          label: '@ctitle',
          value: 2
        },
        {
          label: '@ctitle',
          value: 3
        }
      ])
    )
  },
  {
    //查询储值卡列表
    url: '/svc-web/card/pageList',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@cname',
          'marketName': '@cname',
          'createBy': '@cname',
          'createTime': '@date',
          'updateBy': '@cname',
          'updateTime': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    //查询储值卡详情
    url: '/svc-web/card/detail/:id',
    method: 'get',
    response: resData(
      mock({
        projectName: '@cname',
        cardName: '@cname',
        marketName: '@cname',
        cardAmountList: [100, 200, 300],
        applyType: '@pick([1,2,3])',
        cardStoreList: [
          {
            id: 1,
            storeName: '@cname',
            contacts: '@cname',
            contactsPhone: '@phone',
            spaceApplyType: '@pick([1,2,3])',
            venueIds: '@pick([1,2,3])'
          }
        ],
        marketLogo: {
          id: '@id',
          name: '@cname',
          type: 'image/png',
          size: 2000,
          previewAddress:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
        },
        cardBack: {
          id: '@id',
          name: '@cname',
          type: 'image/png',
          size: 2000,
          previewAddress:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
        },
        cardDetail: '@ctitle',
        createBy: '@cname',
        createTime: '@date',
        updateBy: '@cname',
        updateTime: '@date'
      })
    )
  },
  //新增储值卡
  {
    url: '/svc-web/card/save',
    method: 'post',
    response: resData(mock({}))
  },
  //储值卡下拉
  {
    url: '/svc-web/common/card/selectList',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@name'
          }
        ]
      }).list
    )
  },
  //首页列表
  {
    //查询储值卡列表
    url: '/svc-web/card/home/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectId': '@id',
          'projectName': '@cname',
          'status|1': [1, 2],
          'num|1-10': 6,
          'createBy': '@cname',
          'createTime': '@date',
          'updateBy': '@cname',
          'updateTime': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }, //新增首页
  {
    url: '/svc-web/card/home/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    //查询首页详情
    url: '/svc-web/card/home/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'helpInfo': '@cname',
        'applyGuide': '@cname',
        'advertList|1-10': [
          {
            'type|1': [1, 2],
            'content': '@cname',
            'activityName': '@cname',
            'pic': {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            }
          }
        ],

        'cardDetail': '@ctitle',
        'createBy': '@cname',
        'createTime': '@date',
        'updateBy': '@cname',
        'updateTime': '@date'
      })
    )
  },
  //解冻列表
  {
    url: '/svc-web/member/card/freeze/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@cname',
          'type|1': [1, 2], //1解冻，2冻结
          'orderNo|3': /\d{5,10}\-/,
          'memberCardCode': /\d{5,10}\-/,
          'createTime': '@date',
          'cardName': '@cname',
          'memberName': '@cname',
          'memberPhone': '@cname',
          'createBy': '@cname',
          'memberCode': '@cname'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }, //模糊匹配储值卡
  {
    url: '/svc-web/member/card/info',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'memberCardId|+1': 1,
            'cardName': '@cname',
            'status|1': [1, 2, 3],
            'memberCardCode': /\d{5,10}\-/,
            'createTime': '@date',
            'projectName': '@cname',
            'memberName': '@cname',
            'memberPhone': '@cname',
            'balance|1-100': 2,
            'refundableBalance|1-1000': 3
          }
        ]
      }).list
    )
  },
  //冻结详情
  {
    url: '/svc-web/member/card/freeze/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'projectName': '@cname',
        'type|1': [1, 2], //1解冻，2冻结
        'orderNo|3': /\d{5,10}\-/,
        'memberCardCode': /\d{5,10}\-/,
        'createTime': '@date',
        'cardName': '@cname',
        'memberName': '@cname',
        'memberPhone': '@cname',
        'createBy': '@cname',
        'memberCode': '@cname',
        'currentStatus|1': [1, 2, 3],
        'beforeStatus|1': [1, 2, 3],
        'balance|1-100': 2,
        'freezeBy': '@cname',
        'freezeTime': '@date',
        'unfreezeBy': '@cname',
        'unfreezeTime': '@date'
      })
    )
  }, //冻结解冻
  {
    url: '/svc-web/member/card/freeze',
    method: 'post',
    response: resData(mock({}))
  },
  //退卡列表
  {
    url: '/svc-web/member/card/cancel/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@cname',
          'type|1': [1, 2], //1解冻，2冻结
          'orderNo|3': /\d{5,10}\-/,
          'memberCardCode': /\d{5,10}\-/,
          'createTime': '@date',
          'cardName': '@cname',
          'memberName': '@cname',
          'memberPhone': '@phone',
          'createBy': '@cname',
          'memberCode': '@cname',
          'balance|1-10000': 8,
          'refundableAmount|1-10000': 100,
          'actuallyAmount|1-10000': 88
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  //退卡详情
  {
    url: '/svc-web/member/card/cancel/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'projectName': '@cname',
        'type|1': [1, 2], //1解冻，2冻结
        'orderNo|3': /\d{5,10}\-/,
        'memberCardCode': /\d{5,10}\-/,
        'createTime': '@date',
        'cardName': '@cname',
        'memberName': '@cname',
        'memberPhone': '@cname',
        'createBy': '@cname',
        'memberCode': '@cname',
        'currentStatus|1': [1, 2, 3],
        'beforeStatus|1': [1, 2, 3],
        'balance|1-100': 2,
        'freezeBy': '@cname',
        'freezeTime': '@date',
        'unfreezeBy': '@cname',
        'unfreezeTime': '@date',
        'modeList|1-10': [
          {
            'payment|1': [1, 2, 3],
            'amount': 100
          }
        ]
      })
    )
  },
  //充值列表
  {
    url: '/svc-web/member/card/recharge/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'source|1': [1, 2],
          'status|1': [1, 2, 3, 4],
          'projectName': '@cname',
          'type|1': [1, 2], //1解冻，2冻结
          'orderNo|3': /\d{5,10}\-/,
          'memberCardCode': /\d{5,10}\-/,
          'createTime': '@date',
          'cardName': '@cname',
          'memberName': '@cname',
          'memberPhone': '@phone',
          'createBy': '@cname',
          'memberCode': '@cname',
          'rechargeAmount|1-1000': 99,
          'discountAmount|1-1000': 88,
          'receivedAmount|1-10000': 8,
          'actuallyAmount|1-10000': 100
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  //消费明细列表
  {
    url: '/svc-web/member/card/consumer/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'status|1': [1, 2, 3, 4],
          'projectName': '@cname',
          'serialNo|3': /\d{5,10}\-/,
          'memberCardCode': /\d{5,10}\-/,
          'cardName': '@cname',
          'storeCode': '@cname',
          'storeName': '@cname',
          'createBy': '@cname',
          'createTime': '@date',
          'changeBalance|1-1000': 99,
          'balance|1-1000': 88
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  // 修改基础设置
  {
    url: '/svc-web/card/modify',
    method: 'put',
    response: resData(mock({}))
  },
  //退卡
  {
    url: '/svc-web/member/card/cancel',
    method: 'post',
    response: resData(mock({}))
  },
  // 充值
  {
    url: '/svc-web/member/card/cancel',
    method: 'post',
    response: resData(mock({}))
  },
  // 活动优惠区间
  {
    url: '/svc-web/member/card/recharge/activity/sectionList',
    method: 'get',
    response: resData(
      mock([
        {
          'id': '@id',
          'type|1': ['discount', 'gift', 'decrement'],
          'startAmount': 100,
          'endAmount': 200,
          'amount': 5
        }
      ])
    )
  },
  {
    url: '/svc-web/member/card/recharge',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/svc-web/activity/stat/page',
    method: 'post',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'code': '@id',
          'name': '@ctitle',
          'scene': '@pick("purchase","recharge")',
          'type': '@pick(["decrement","gift","discount"])',
          'startTime': '@datetime',
          'endTime': '@datetime',
          'status': '@pick([1,2,3,4,5])',
          'budget': '@integer',
          'balanceBudget': '@integer'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/activity/stat/recharge/page',
    method: 'get',
    response: resData(
      mockList(
        {
          orderNo: '@id',
          cardName: '@ctitle',
          cardCode: '@id',
          memberName: '@cname',
          phone: '@phone',
          createBy: '@cname',
          rechargeAmount: '@integer',
          discountAmount: '@integer',
          balance: '@integer',
          createTime: '@datetime'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/activity/stat/info/:id',
    method: 'get',
    response: resData(
      mock({
        projectName: '@ctitle',
        code: '@id',
        name: '@ctitle',
        scene: '@ctitle',
        type: '@pick(["decrement","gift","discount"])',
        startTime: '@datetime',
        endTime: '@datetime',
        status: '@pick([1,2,3,4,5])',
        budget: '@integer',
        cardIds: [1, 2, 3],
        rangeList: [
          {
            start: 0,
            end: 10,
            amount: 4
          },
          {
            start: 10,
            end: 30,
            amount: 6
          },
          {
            start: 30,
            end: 100,
            amount: 15
          }
        ],
        balanceBudget: '@integer'
      })
    )
  },
  {
    url: '/svc-web/activity/discount/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'code': '@id',
          'name': '@ctitle',
          'scene': '@pick(["purchase","recharge"])',
          'type': '@pick(["decrement","gift","discount"])',
          'startTime': '@datetime',
          'endTime': '@datetime',
          'status': '@pick([1,2,3,4])',
          'createBy': '@cname',
          'createTime': '@datetime',
          'updateBy': '@cname',
          'updateTime': '@datetime'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/svc-web/activity/discount/suspend/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/svc-web/activity/discount/resume/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/svc-web/activity/discount/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/svc-web/activity/discount/info/:id',
    method: 'get',
    response: resData(
      mock({
        projectName: '@ctitle',
        code: '@id',
        name: '@ctitle',
        scene: 'consume',
        type: '@pick(["decrement","gift","discount"])',
        startTime: '@datetime',
        endTime: '@datetime',
        status: '@pick([1,2,3,4,5])',
        budget: '@integer',
        cardIds: [1, 2, 3],
        rangeList: [
          {
            start: 0,
            end: 10,
            amount: 4
          },
          {
            start: 10,
            end: 30,
            amount: 6
          },
          {
            start: 30,
            end: 100,
            amount: 15
          }
        ],
        desc: '@ctitle',
        balanceBudget: '@integer',
        adPictureResourceCodes: [
          {
            id: '@id',
            name: '@cname',
            type: 'image/png',
            size: 2000,
            previewAddress:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
          }
        ],
        cardStoreList: [
          {
            id: 1,
            storeName: '@ctitle',
            contacts: '@cname',
            contactsPhone: '@phone',
            spaceApplyType: 2,
            venueIds: [1, 2]
          }
        ]
      })
    )
  },
  {
    url: '/svc-web/common/activity/select/name',
    method: 'post',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: 1
        },
        {
          label: '@ctitle',
          value: 2
        },
        {
          label: '@ctitle',
          value: 3
        }
      ])
    )
  },
  {
    url: '/svc-web/common/activity/select/code_name',
    method: 'post',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: 1
        },
        {
          label: '@ctitle',
          value: 2
        },
        {
          label: '@ctitle',
          value: 3
        }
      ])
    )
  },
  {
    url: '/svc-web/common/activity/select/code',
    method: 'post',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: 1
        },
        {
          label: '@ctitle',
          value: 2
        },
        {
          label: '@ctitle',
          value: 3
        }
      ])
    )
  }
]);
