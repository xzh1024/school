import { create, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  //根据合同id获取费用详情
  {
    url: '/cbd-api-project/formal/contract/pay/paySchemeInfos',
    method: 'get',
    response: resData(
      mock({
        'list|1-5': [
          {
            'expenseId': '@integer(10, 1025)',
            'expenseType|1': ['固定租金', '抽成租金'],
            'chargingMethod': '@integer(1, 2)',
            'chargingMethodDesc|1': ['固定费用', '抽成费用'],
            'hasTax': '@integer(0, 1)',
            'hasTaxDesc|1': ['含税', '不含税'],
            'hasFree': '@integer(0, 1)',
            'hasFreeDesc|1': ['免租', '不免租'],
            'hasIncrease': '@integer(0, 1)',
            'hasIncreaseDesc|1': ['递增', '不递增'],
            'paySchemeStages|1-3': [
              {
                'id': '@id',
                'startDate': '@datetime("yyyy-MM-dd")',
                'endDate': '@datetime("yyyy-MM-dd")',
                'schemeType': '@integer(1, 3)',
                'schemeTypeDesc|1': ['非比较抽成', '比较抽成', '合并抽成'],
                'algMethod|1': ['@integer(11, 14)', '@integer(21, 26)'],
                'algMethodDesc|1': [
                  '日固定方式',
                  '月固定方式',
                  '日平方固定方式',
                  '月平方固定方式',
                  '固定',
                  '销售额分段抽成',
                  '销售额分段抽成递增',
                  '货品组别分类抽成',
                  '货品组别分段抽成',
                  '货品组别分段递增抽成'
                ],
                'commissionRatio': '@integer(1, 1000)',
                'fixedPrice': '@float(10, 1000, 2, 2)',
                'paymentType': '@integer(1, 2)',
                'paymentTypeDesc|1': ['日', '月'],
                'paymentScheme': '@integer(1, 10)',
                'statementDay': '@datetime("yyyy-MM-dd")',
                'repaymentType': '@integer(1, 2)',
                'repaymentTypeDesc|1': ['提前', '延后'],
                'repaymentMethod': '@integer(1, 3)',
                'repaymentMethodDesc|1': ['月', '自然日', '工作日'],
                'repaymentScheme': 'integer(1, 2)',
                'repaymentSchemeDesc|1': ['一天', '一个月'],
                'leaseMethod': '@integer(1, 2)',
                'leaseMethodDesc|1': ['按自然日月年顺延', '按起始日期顺延'],
                'taxRatio': '@integer(10, 1000)',
                'repairAlgMethod': '@integer(1, 2)',
                'repairAlgMethodDesc|1': ['按月', '按年'],
                'calculateAreaMethod': '@integer(1, 2)',
                'calculateAreaMethodDesc|1': ['按使用面积', '按建筑面积'],
                'calculateArea': '@float(10, 120, 2, 2)',
                'initPeriod': '@integer(1, 12)',
                'initPeriodDesc|1': [],
                'initPeriodMethod': '@integer(1, 2)',
                'initPeriodMethodDesc|1': ['月', '年'],
                'initPrice': '@float(1, 100, 2, 2)',
                'increasePeriod': '@integer(1, 2)',
                'increasePeriodMethod|1': ['年', '月'],
                'increasePeriodMethodDesc|1': ['1年', '1月'],
                'increaseMethod': '@integer(1, 2)',
                'increaseMethodDesc|1': ['金额(元)', '比例(%)'],
                'increaseValue': '@integer(1, 50)',
                'freeList|1-3': [
                  {
                    'id': '@id',
                    'freePayments|1-2': [
                      {
                        id: '@id',
                        paymentPeriod: '',
                        startDate: '@datetime("yyyy-MM-dd")',
                        endDate: '@datetime("yyyy-MM-dd")'
                      }
                    ],
                    'freeMethod': '@integer(1, 2)',
                    'freeMethodDesc|1': ['金额', '比例'],
                    'freeValue': '@integer(1, 1000)'
                  }
                ],
                'commissionList|1-3': [
                  {
                    'id': '@id',
                    'groupId': '@id',
                    'groupName|1': ['正价商品', '特价商品'],
                    'subCommissionList|1-3': [
                      {
                        id: '@id',
                        startVolume: '@float(1, 1000, 2, 2)',
                        endVolume: '@float(1000, 2500, 2, 2)',
                        commissionRatio: '@integer(1, 100)'
                      }
                    ],
                    'startVolume': '@float(1, 1000, 2, 2)',
                    'endVolume': '@float(1000, 2500, 2, 2)',
                    'commissionRatio': '@integer(1, 100)'
                  }
                ]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/common-mis/goods/group/select',
    method: 'get',
    response: resData(
      mock([
        {
          label: '正价商品',
          value: 1
        },
        {
          label: '特价商品',
          value: 2
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/formal/contract/pay/addOrUpdatePaySchemes',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/formal/contract/pay/previewPaymentInfos',
    method: 'post',
    response: resData(
      mock({
        'list|1-10': [
          {
            'expenseType': '@id',
            'paymentMethod|1': [1, 2],
            'paymentPeriod': '@integer(1,24)',
            'paymentPeriodStart': '@date',
            'paymentPeriodEnd': '@date',
            'statementDay': '@date',
            'contractPayment': '@integer(10000,1000000)',
            'hasTax|1': [0, 1],
            'taxRatio': '@integer(50,60)',
            'taxExcludePayment': '@integer(50,600)',
            'taxPayment': '@integer(50,600)',
            'freePayment': '@integer(50,600)',
            'actPayment': '@integer(50,600)'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/formal/contract/pay/previewPaymentInfosById',
    method: 'post',
    response: resData(
      mock({
        'list|1-10': [
          {
            'expenseType': '@id',
            'paymentMethod|1': [1, 2],
            'paymentPeriod': '@integer(1,24)',
            'paymentPeriodStart': '@date',
            'paymentPeriodEnd': '@date',
            'statementDay': '@date',
            'contractPayment': '@integer(10000,1000000)',
            'hasTax|1': [0, 1],
            'taxRatio': '@integer(50,60)',
            'taxExcludePayment': '@integer(50,600)',
            'taxPayment': '@integer(50,600)',
            'freePayment': '@integer(50,600)',
            'actPayment': '@integer(50,600)'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/formal/contract/pay/paySchemesUpdateInit',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'paySchemeStages': [
              {
                'id': '@id',
                'startDate': 'date',
                'endDate': '@date',
                'schemeType|1': [1, 2, 3],
                'algMethod|': [11, 12, 13, 14, 21, 22, 23, 24, 25, 26],
                'commissionRatio': '@integer(1,99)',
                'fixedPrice': '@integer(1,10000000)',
                'guaranteePrice': '@integer(1,10000000)',
                'paymentType|1': [1, 2],
                'paymentScheme': '@integer(1,12)',
                'statementDay': '@integer(1,30)',
                'repaymentType|1': [1, 2],
                'repaymentMethod|1': [1, 2, 3],
                'repaymentScheme': '@integer(1,12)',
                'leaseMethod|1': [1, 2],
                'taxRatio': '@integer(1,99)',
                'repairAlgMethod|1': [1, 2],
                'calculateAreaMethod|1': [1, 2],
                'calculateArea': '@integer(100,500)',
                'initPeriod': '@integer(1,12)',
                'initPeriodMethod|1': [1, 2],
                'initPrice': '@integer(100,500)',
                'increasePeriod|1': [1, 2],
                'increasePeriodMethod|1': [1, 2],
                'increaseMethod|!': [1, 2],
                'increaseValue': '@integer(1,12)',
                'freeList': [
                  {
                    'id': '@id',
                    'freePayments': [
                      {
                        id: '@id',
                        paymentPeriod: '@integer(1,12)',
                        startDate: '@date',
                        endDate: '@date'
                      }
                    ],
                    'freeMethod|1': [1, 2],
                    'freeValue': '@integer(1,99)'
                  }
                ],
                'commissionList': [
                  {
                    id: '@id',
                    groupId: '@id',
                    groupName: '@ctitle',
                    subCommissionList: [
                      {
                        id: '@id',
                        startVolume: 0,
                        endVolume: 100,
                        commissionRatio: '40'
                      }
                    ],
                    startVolume: 0,
                    endVolume: 100,
                    commissionRatio: '40'
                  }
                ]
              }
            ],
            'expenseId': '@id',
            'chargingMethod|1': [1, 2],
            'hasTax|1': [1, 0],
            'hasFree|1': [1, 0],
            'hasIncrease|1': [1, 0]
          }
        ]
      }).list
    )
  }
]);
