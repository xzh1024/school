import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';
export default create([
  //删除
  {
    url: '/cbd-api-project/deposit/delete/:changeId',
    method: 'GET',
    response: resData({})
  },
  //批量审批
  {
    url: '/cbd-api-project/deposit/batch/approve',
    method: 'post',
    response: resData({})
  },
  //获取批量审批状态
  {
    url: '/cbd-api-project/deposit/task_status',
    method: 'post',
    response: resData(
      mock({
        totalCount: '@integer(100, 1000)',
        successCount: '@integer(5, 12)'
      })
    )
  },
  //确认(提交审批)
  {
    url: '/cbd-api-project/deposit/commit',
    method: 'post',
    response: resData(
      mock({
        totalCount: '@integer(100, 1000)',
        successCount: '@float(100, 1200, 2, 2)'
      })
    )
  },
  //导出
  {
    url: '/cbd-api-project/deposit/export',
    method: 'post',
    response: resData({})
  },
  //修改
  {
    url: '/cbd-api-project/deposit/update',
    method: 'post',
    response: resData({})
  },
  //存款费用项目树
  {
    url: '/cbd-api-project/common-mis/deposit/treeExpense/:projectId',
    method: 'get',
    response: resData(
      mock({
        list: [
          {
            expenseCode: '@id',
            expenseName: '保证金',
            children: [
              {
                expenseCode: 1001,
                expenseName: '合同保证金'
              }
            ]
          },
          {
            expenseCode: '@id',
            expenseName: '预付款',
            children: [
              {
                expenseCode: 1002,
                expenseName: '合同预付款'
              }
            ]
          },
          {
            expenseCode: '@id',
            expenseName: '意向金',
            children: [
              {
                expenseCode: 1003,
                expenseName: '合同意向金'
              }
            ]
          }
        ]
      }).list
    )
  },
  //获取账单支付方式
  {
    url: '/cbd-api-project/common-mis/pay_method/bill',
    method: 'GET',
    response: resData(
      mock({
        list: [
          {
            value: 9000,
            label: '微信',
            feeRate: '@float(10, 100, 2, 2)'
          },
          {
            value: 9001,
            label: '支付宝',
            feeRate: '@float(10, 100, 2, 2)'
          },
          {
            value: 9002,
            label: '银行卡',
            feeRate: '@float(10, 100, 2, 2)'
          },
          {
            value: 9003,
            label: '储值卡',
            feeRate: '@float(10, 100, 2, 2)'
          }
        ]
      }).list
    )
  },
  //转移
  {
    url: '/cbd-api-project/deposit/transfer',
    method: 'post',
    response: resData({})
  },
  //归还
  {
    url: '/cbd-api-project/deposit/return',
    method: 'post',
    response: resData({})
  },
  //查阅
  {
    url: '/cbd-api-project/deposit/info/:changeId',
    method: 'get',
    response: resData(
      mock({
        'projectId': '@id',
        'projectName|1': ['成都体投', '无锡体投', '世界体育组织俱乐部协会'],
        'merchantId': '@id',
        'merchantName|1': ['万达广场', '奥特莱斯商场', '时代广场'],
        'storeId': '@id',
        'storeName|1': ['耐克旗舰店', '特步旗舰店', '回力旗舰店'],
        'contractCode': '@guid',
        'changeNo': '@guid',
        'changType': '@integer(1, 2)',
        'flowId': '@id',
        'businessStat': '@integer(0, 3)',
        'auditStat': '@integer(1, 5)',
        'expenseItem': [
          {
            'expenseCode': '',
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1001,
            'expenseItemName|1': [
              '费用保证金',
              '意向保证金',
              '合同意向金',
              '铺位保证金',
              '合同预付款'
            ],
            'availableAmount': '850.22',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'expenseCode': '',
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1002,
            'expenseItemName|1': [
              '费用保证金',
              '意向保证金',
              '合同意向金',
              '铺位保证金',
              '合同预付款'
            ],
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'expenseCode': '',
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1003,
            'expenseItemName|1': [
              '费用保证金',
              '意向保证金',
              '合同意向金',
              '铺位保证金',
              '合同预付款'
            ],
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'expenseCode': '',
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1004,
            'expenseItemName|1': [
              '费用保证金',
              '意向保证金',
              '合同意向金',
              '铺位保证金',
              '合同预付款'
            ],
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'expenseCode': '',
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1005,
            'expenseItemName|1': [
              '费用保证金',
              '意向保证金',
              '合同意向金',
              '铺位保证金',
              '合同预付款'
            ],
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          }
        ],
        'receiptList|1-5': [
          {
            'contractCode': '@guid',
            'expenseCode|1': ['', '', ''],
            'expenseItemId': '',
            'expenseItemName|1': [
              '租赁保证金',
              '合同意向金',
              '签约预付款',
              '合同保证金'
            ],
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'receiptBillId': '@id',
            'receiptNo': '@id',
            'payMethodId': '@integer(9000, 9003)',
            'payMethodName|1': ['微信', '支付宝', '现金'],
            'paymentDay': '@datetime("yyyy-MM-dd")',
            'operationName': '@cname',
            'operationDate': '@datetime("yyyy-MM-dd")'
          }
        ],
        'transferRecord': [
          {
            expenseItemId: 1001,
            expenseItemName: '意向保证金',
            availableAmount: '850.22',
            changeAmount: '150.22',
            changeDate: '@datetime("yyyy-MM-dd")',
            acceptExpenseItemId: 1001,
            acceptExpenseItemName: '',
            operationName: '@cname',
            operationDate: '@datetime("yyyy-MM-dd")'
          },
          {
            expenseItemId: 1001,
            expenseItemName: '意向保证金',
            availableAmount: '700',
            changeAmount: '150',
            changeDate: '@datetime("yyyy-MM-dd")',
            acceptExpenseItemId: 1002,
            acceptExpenseItemName: '',
            operationName: '@cname',
            operationDate: '@datetime("yyyy-MM-dd")'
          },
          {
            expenseItemId: 1001,
            expenseItemName: '意向保证金',
            availableAmount: '550',
            changeAmount: '150',
            changeDate: '@datetime("yyyy-MM-dd")',
            acceptExpenseItemId: 1002,
            acceptExpenseItemName: '',
            operationName: '@cname',
            operationDate: '@datetime("yyyy-MM-dd")'
          },
          {
            expenseItemId: 1001,
            expenseItemName: '意向保证金',
            availableAmount: '400',
            changeAmount: '100',
            changeDate: '@datetime("yyyy-MM-dd")',
            acceptExpenseItemId: 1002,
            acceptExpenseItemName: '',
            operationName: '@cname',
            operationDate: '@datetime("yyyy-MM-dd")'
          }
        ],
        'returnRecord': [
          {
            'expenseItemId': 1001,
            'expenseItemName': '费用保证金',
            'changeAmount': '@float(100, 1200, 2, 2)',
            'changeDate': '@datetime("yyyy-MM-dd")',
            'payMethodId': '@integer(9000, 9003)',
            'payMethodName|1': ['微信', '支付宝', '银行卡'],
            'operationName': '@cname',
            'operationDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'expenseItemId': 1002,
            'expenseItemName': '意向保证金',
            'changeAmount': '@float(100, 1200, 2, 2)',
            'changeDate': '@datetime("yyyy-MM-dd")',
            'payMethodId': '@integer(9000, 9003)',
            'payMethodName|1': ['微信', '支付宝', '银行卡'],
            'operationName': '@cname',
            'operationDate': '@datetime("yyyy-MM-dd")'
          }
        ],
        'resourceList|1-5': [
          {
            id: '@id',
            name: '@name',
            type: 'image',
            format: '',
            size: '@integer(1024, 2048)',
            previewAddress: '@image'
          }
        ]
      })
    )
  },
  //查询费用项目存款记录
  {
    url: '/cbd-api-project/deposit/receipt/list',
    method: 'post',
    response: resData(
      mock({
        'list|1-5': [
          {
            'contractCode': '@guid',
            'expenseCode|1': ['', '', ''],
            'expenseItemId': '',
            'expenseItemName|1': [
              '租赁保证金',
              '合同意向金',
              '签约预付款',
              '合同保证金'
            ],
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'receiptBillId': '@id',
            'receiptNo': '@id',
            'payMethodId': '@integer(1, 2)',
            'payMethodName|1': ['微信', '支付宝', '现金'],
            'paymentDay': '@datetime("yyyy-MM-dd")',
            'operationName': '@cname',
            'operationDate': '@datetime("yyyy-MM-dd")'
          }
        ]
      }).list
    )
  },
  //选择存款费用
  {
    url: '/cbd-api-project/deposit/account/list',
    method: 'get',
    response: resData(
      mock({
        list: [
          {
            'id': 1,
            'projectId': '@id',
            'projectName': '项目—— @name',
            'contractCode|1': [1, 2, 3, 4],
            'merchantId': '@id',
            'merchantName': '商户- @name',
            'storeId': '@id',
            'storeName': '商铺—— @name',
            'expenseCode|1': ['', '', ''],
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1001,
            'expenseItemName': '费用保证金',
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivableAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'id': 2,
            'projectId': '@id',
            'projectName': '项目—— @name',
            'contractCode|1': [1, 2, 3, 4],
            'merchantId': '@id',
            'merchantName': '商户- @name',
            'storeId': '@id',
            'storeName': '商铺—— @name',
            'expenseCode|1': ['', '', ''],
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1002,
            'expenseItemName': '意向保证金',
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivableAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'id': 3,
            'projectId': '@id',
            'projectName': '项目—— @name',
            'contractCode|1': [1, 2, 3, 4],
            'merchantId': '@id',
            'merchantName': '商户- @name',
            'storeId': '@id',
            'storeName': '商铺—— @name',
            'expenseCode|1': ['', '', ''],
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1003,
            'expenseItemName': '合同意向金',
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivableAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'id': 4,
            'projectId': '@id',
            'projectName': '项目—— @name',
            'contractCode|1': [1, 2, 3, 4],
            'merchantId': '@id',
            'merchantName': '商户- @name',
            'storeId': '@id',
            'storeName': '商铺—— @name',
            'expenseCode|1': ['', '', ''],
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1004,
            'expenseItemName': '铺位保证金',
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivableAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          },
          {
            'id': 5,
            'projectId': '@id',
            'projectName': '项目—— @name',
            'contractCode|1': [1, 2, 3, 4],
            'merchantId': '@id',
            'merchantName': '商户- @name',
            'storeId': '@id',
            'storeName': '商铺—— @name',
            'expenseCode|1': ['', '', ''],
            'expenseName|1': ['保证金', '意向金', '预付款'],
            'expenseItemId': 1005,
            'expenseItemName': '合同预付款',
            'availableAmount': '@float(100, 1200, 2, 2)',
            'processedAmount': '@float(100, 1200, 2, 2)',
            'receivableAmount': '@float(100, 1200, 2, 2)',
            'receivedAmount': '@float(100, 1200, 2, 2)',
            'contractRangeDate': '@datetime("yyyy-MM-dd")'
          }
        ]
      }).list
    )
  },
  //存款单据统计
  {
    url: '/cbd-api-project/deposit/statistics',
    method: 'get',
    response: resData(
      mock({
        totalCount: '@integer(100, 1000)',
        totalAmount: '@float(100, 1200, 2, 2)',
        passedCount: '@integer(100, 1000)',
        passedAmount: '@float(100, 1200, 2, 2)',
        approvingCount: '@integer(100, 1000)',
        approvingAmount: '@float(100, 1200, 2, 2)'
      })
    )
  },
  //存款处理记录分页列表
  {
    url: '/cbd-api-project/deposit/change/page',
    method: 'get',
    response: resData(
      mockList(
        {
          changeId: '@id',
          projectId: '@id',
          projectName: '项目—— @word(5, 10)',
          changeNo: '@guid',
          changeType: '@integer(1, 2)',
          contractCode: '@guid',
          merchantId: '@id',
          merchantName: '商户—— @word(5, 10)',
          storeId: '@id',
          storeName: '商铺—— @word(5, 10)',
          expenseId: '@integer(1, 3)',
          expenseItemId: '@id',
          changeAmount: '@float(100, 1200, 2, 2)',
          changeDate: '@datetime("yyyy-MM-dd")',
          businessStat: '@integer(0, 3)',
          auditStat: '@integer(1, 5)',
          // businessStat: 1,
          // auditStat: 2,
          contractRange: '@datetime("yyyy-MM-dd") ~ @datetime("yyyy-MM-dd")',
          contractStatus: '@integer(0, 4)'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }
]);
