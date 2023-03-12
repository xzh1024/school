import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  //* 意向合同 *//
  //查看滞纳金信息
  {
    url: '/cbd-api-project/intention/contract/late/fee/info/:contractId',
    method: 'GET',
    response: resData(
      mock({
        'list|1-5': [
          {
            contractId: '@id',
            itemType: '@integer(1, 10)',
            itemTypeName: '滞纳金',
            taxIncluded: '@integer(0, 1)',
            startDatum: '@integer(1, 2)',
            sectionUnit: '@integer(1, 2)',
            section: '@integer(5, 1000)',
            calculationMethod: '@integer(1, 2)',
            amount: '@integer(10, 20)',
            taxRate: '@integer(10, 20)'
          }
        ]
      }).list
    )
  },
  //添加修改滞纳金信息
  {
    url: '/cbd-api-project/intention/contract/late/fee/save',
    method: 'POST',
    response: resData({})
  },
  //查看保证金信息
  {
    url: '/cbd-api-project/intention/contract/bond/info/:contractId',
    method: 'GET',
    response: resData(
      mock({
        'list|0-1': [
          {
            'contractId': '@id',
            'itemType': '@integer(1, 10)',
            'itemTypeName': '保证金',
            'taxIncluded': '@integer(0, 1)',
            'amount': '@float(10, 1002, 2, 2)',
            'receivableDate': '@datetime("yyyy-MM-dd")',
            'taxRate': '@integer(1, 10)',
            'transfer': '@integer(0, 1)',
            'intoTaxIncluded': '@integer(1, 10)',
            'intoTaxIncludedName|1': ['保证金', '租金']
          }
        ]
      }).list
    )
  },
  //添加修改保证金信息
  {
    url: '/cbd-api-project/intention/contract/bond/save',
    method: 'POST',
    response: resData({})
  },
  //撤销审批
  {
    url: '/cbd-api-project/intention/contract/approval/revoke',
    method: 'GET',
    response: resData({})
  },
  //作废审批
  {
    url: '/cbd-api-project/intention/contract/approval/cancel',
    method: 'GET',
    response: resData({})
  },
  //转正式合同审批
  {
    url: '/cbd-api-project/intention/contract/approval/trans',
    method: 'GET',
    response: resData({})
  },
  //确认审批
  {
    url: '/cbd-api-project/intention/contract/approval/confirm',
    method: 'POST',
    response: resData({})
  },
  //删除
  {
    url: '/cbd-api-project/intention/contract/delete',
    method: 'PUT',
    response: resData({})
  },
  //导出
  {
    url: '/cbd-api-project/intention/contract/export',
    method: 'GET',
    response: resData({})
  },
  //合同列表
  {
    url: '/cbd-api-project/intention/contract/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          id: '@id',
          projectName: '项目 @word(5, 20)',
          code: '@guid',
          version: '@float(1, 10, 1, 1)',
          businessStatus: '@integer(1, 5)',
          verifyStatus: '@integer(1, 5)',
          // 'businessStatus|1': [1, 2],
          // 'verifyStatus|1': [1, 2],
          merchantName: '商户名称 —— @word(5, 10)',
          storeName: '店铺名称 - @word(5, 15)',
          brandName: '品牌名称 - @word(5, 15)',
          signDate: '@datetime',
          leaseStartDate: '@datetime("yyyy-MM-dd")',
          leaseEndDate: '@datetime("yyyy-MM-dd")'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  //* 正式合同 *//
  //查看滞纳金信息
  {
    url: '/cbd-api-project/formal/contract/late/fee/info/:contractId',
    method: 'GET',
    response: resData(
      mock({
        'list|1-5': [
          {
            contractId: '@id',
            itemType: '@integer(1, 10)',
            itemTypeName: '滞纳金',
            taxIncluded: '@integer(0, 1)',
            startDatum: '@integer(1, 2)',
            sectionUnit: '@integer(1, 2)',
            section: '@integer(5, 1000)',
            calculationMethod: '@integer(1, 2)',
            amount: '@integer(10, 20)',
            taxRate: '@integer(10, 20)'
          }
        ]
      }).list
    )
  },
  //添加修改滞纳金信息
  {
    url: '/cbd-api-project/formal/contract/late/fee/save',
    method: 'POST',
    response: resData({})
  },
  //查看保证金信息
  {
    url: '/cbd-api-project/formal/contract/bond/info/:contractId',
    method: 'GET',
    response: resData(
      mock({
        'list|0-1': [
          {
            'contractId': '@id',
            'itemType': '@integer(1, 10)',
            'itemTypeName': '保证金',
            'taxIncluded': '@integer(0, 1)',
            'amount': '@float(10, 1002, 2, 2)',
            'receivableDate': '@datetime("yyyy-MM-dd")',
            'taxRate': '@integer(1, 10)',
            'transfer': '@integer(0, 1)',
            'intoTaxIncluded': '@integer(1, 10)',
            'intoTaxIncludedName|1': ['保证金', '租金']
          }
        ]
      }).list
    )
  },
  //添加修改保证金信息
  {
    url: '/cbd-api-project/formal/contract/bond/save',
    method: 'POST',
    response: resData({})
  },
  // 费用项目树
  {
    url: '/cbd-api-project/common-mis/treeExpense',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'parentExpenseCode': '@id',
            'expenseId': '@id',
            'expenseCode': '@integer(1, 10)',
            'expenseType|1': [
              '租金',
              '物业费',
              '意向金',
              '保证金',
              '滞纳金',
              '能耗费',
              '临时费用',
              '维修费',
              '预付款',
              '返款'
            ],
            'chargingMethod|1': [1, 2],
            'print': '@integer(0, 1)',
            'level': 1,
            'children|0-1': [
              {
                'parentExpenseCode': '@id',
                'expenseId': '@id',
                'expenseCode': '@guid',
                'expenseType|1': ['1', '2', '3'],
                'chargingMethod': '@integer(1, 2)',
                'print': '@integer(0, 1)',
                'level': 2,
                'children': []
              }
            ]
          }
        ]
      }).list
    )
  },
  //撤销审批
  {
    url: '/cbd-api-project/formal/contract/approval/revoke',
    method: 'GET',
    response: resData({})
  },
  //清算审批
  {
    url: '/cbd-api-project/formal/contract/approval/clear',
    method: 'GET',
    response: resData({})
  },
  //终止审批
  {
    url: '/cbd-api-project/formal/contract/approval/termination',
    method: 'GET',
    response: resData({})
  },
  //作废审批
  {
    url: '/cbd-api-project/formal/contract/approval/cancel',
    method: 'GET',
    response: resData({})
  },
  //确认审批
  {
    url: '/cbd-api-project/formal/contract/approval/confirm',
    method: 'POST',
    response: resData({})
  },
  //删除
  {
    url: '/cbd-api-project/formal/contract/delete',
    method: 'PUT',
    response: resData({})
  },
  //导出
  {
    url: '/cbd-api-project/formal/contract/export',
    method: 'GET',
    response: resData({})
  },
  //合同-店铺下拉
  {
    url: '/cbd-api-project/common/contract/store/select',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            label: '店铺名称—— @word',
            value: '@id'
          }
        ]
      }).list
    )
  },
  //合同列表
  {
    url: '/cbd-api-project/formal/contract/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@id',
          'projectName': '项目 @word(5, 20)',
          'code': '@guid',
          'version': '@float(1, 10, 1, 1)',
          // businessStatus: '@integer(1, 6)',
          // verifyStatus: '@integer(1, 5)',
          'businessStatus|1': [1, 2],
          'verifyStatus|1': [1, 2],
          'merchantName': '商户名称 —— @word(5, 10)',
          'storeName': '店铺名称 - @word(5, 15)',
          'brandName': '品牌名称 - @word(5, 15)',
          'signDate': '@datetime'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }
]);
