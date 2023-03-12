import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/cbd-api-project/mis/bill/list',
    method: 'post',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'billType': '@pick([1,2])',
          'billNum': '@id',
          'merchantName': '@cname',
          'contractCode': '@id',
          'storeName': '@ctitle',
          'expenseItemsName': '@ctitle',
          'billSourceType': '@pick([1,2])',
          'billCreateAt': '@date',
          'expensePeriod': '@date' + '~' + '@date',
          'amount': '@integer(1000,6000)',
          'businessStat': '@pick([0,1,2,3,4,5])',
          'auditStat': '@pick([1,2,3,4,5])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/mis/bill/addCollection',
    method: 'post',
    response: resData(
      mock([
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'projectId': '@id',
          'billType': '@pick([1,2])',
          'billNum': '@id',
          'merchantName': '@cname',
          'contractCode': '@id',
          'storeName': '@ctitle',
          'expenseItemsName': '@ctitle',
          'billSourceType': '@pick([1,2])',
          'billCreateAt': '@date',
          'paymentDays': '@date',
          'expensePeriod': '@date' + '~' + '@date',
          'receivableAmount': '@integer(1000,6000)',
          'collectionAndPaymentAmount': '@integer(1000,6000)',
          'amountNotReceived': '@integer(1000,6000)',
          'deductionAmount': '@integer(1000,6000)',
          'businessStat': '@pick([0,1,2,3,4,5])',
          'auditStat': '@pick([1,2,3,4,5])'
        },
        {
          'id|+1': 2,
          'projectName': '@ctitle',
          'projectId': '@id',
          'billType': '@pick([1,2])',
          'billNum': '@id',
          'merchantName': '@cname',
          'contractCode': '@id',
          'storeName': '@ctitle',
          'expenseItemsName': '@ctitle',
          'billSourceType': '@pick([1,2])',
          'billCreateAt': '@date',
          'paymentDays': '@date',
          'expensePeriod': '@date' + '~' + '@date',
          'receivableAmount': '@integer(1000,6000)',
          'collectionAndPaymentAmount': '@integer(1000,6000)',
          'amountNotReceived': '@integer(1000,6000)',
          'deductionAmount': '@integer(1000,6000)',
          'businessStat': '@pick([0,1,2,3,4,5])',
          'auditStat': '@pick([1,2,3,4,5])'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/mis/bill/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/confirm',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/info',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        projectId: '@id',
        projectName: '@ctitle',
        merchantId: '@id',
        merchantName: '@cname',
        storeId: '@id',
        storeName: '@ctitle',
        billType: '@pick([1,2])',
        expenseItemsId: '@id',
        expenseItemsName: '@ctitle',
        chargingMethod: '@pick([1])',
        billCreateAt: '@date',
        paymentDays: '@date',
        startAt: '@date',
        endAt: '@date',
        amount: '@integer(5000,9000)',
        hasTax: '@pick([1,2])',
        taxRate: '@integer(0,100)',
        taxAmount: '@integer(5000,9000)',
        taxExclusiveAmount: '@integer(5000,9000)',
        receivableAmount: '@integer(5000,9000)',
        businessStat: '@pick([0,1,2,3,4,5])'
      })
    )
  },
  {
    url: '/cbd-api-project/mis/bill/detail',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        billNum: '@id',
        projectName: '@ctitle',
        merchantName: '@ctitle',
        storeName: '@ctitle',
        contractCode: '@id',
        auditStat: '@pick([1,2,3,4,5])',
        businessStat: '@pick([0,1,2,3,4,5])',
        billType: '@pick([1,2])',
        expenseItemsId: '@id',
        expenseItemsName: '@ctitle',
        chargingMethod: '@pick([1])',
        billCreateAt: '@date',
        paymentDays: '@date',
        expensePeriod: '@date',
        amount: '@integer(200,5000)',
        taxRate: '@float(0,1,0,2)',
        taxAmount: '@integer(200,5000)',
        taxExclusiveAmount: '@integer(200,5000)',
        receivableAmount: '@integer(200,5000)',
        revertAmount: '@integer(200,5000)',
        advanceAmount: '@integer(200,5000)',
        shouldRevertAmount: '@integer(200,5000)',
        billAdjustableDetails: [
          {
            'id': '@id',
            'order|+1': 1,
            'originalBillAmount': '@integer(200,5000)',
            'adjustableAmount': '@integer(200,5000)',
            'changeAmount': '@integer(200,5000)',
            'changeType': '@pick([1,2])',
            'afterAdjustableTaxAmount': '@integer(200,5000)',
            'afterShouldAmount': '@integer(200,5000)',
            'afterNotAmount': '@integer(200,5000)',
            'remarks': '@citle',
            'isDelete': '@boolean'
          }
        ],
        initReceivableAmount: '@integer(200,5000)',
        deductionAmount: '@integer(200,5000)',
        collectionAndPaymentAmount: '@integer(200,5000)',
        amountNotReceived: '@integer(200,5000)'
      })
    )
  },
  {
    url: '/cbd-api-project/mis/bill/adjustable',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/saveAndConfirm',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/adjustableAndConfirm',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/view',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        billNum: '@id',
        projectName: '@ctitle',
        merchantName: '@cname',
        contractCode: '@id',
        storeName: '@ctitle',
        // billType: '@pick([1,2])',
        billType: 1,
        expenseItemsId: '@id',
        expenseItemsName: '@ctitle',
        chargingMethod: '@pick([1])',
        billCreateAt: '@date',
        paymentDays: '@date',
        expensePeriod: '@date' + '~' + '@date',
        amount: '@integer(5000,9000)',
        hasTax: '@pick([1,2])',
        taxRate: '@integer(0,100)',
        taxAmount: '@integer(5000,9000)',
        receivableAmount: '@integer(5000,9000)',
        revertAmount: '@integer(5000,9000)',
        shouldRevertAmount: '@integer(5000,9000)',
        taxExclusiveAmount: '@integer(5000,9000)',
        advanceAmount: '@integer(5000,9000)',
        auditStat: '@pick([0,1,2,3,4,5])',
        businessStat: '@pick([0,1,2,3,4,5])',
        billAdjustableDetails: [
          {
            id: '@id',
            originalBillAmount: '@integer(5000,9000)',
            adjustableAmount: '@integer(5000,9000)',
            changeAmount: '@integer(100,300)',
            changeType: '@pick([1,2])',
            afterAdjustableTaxAmount: '@integer(5000,9000)',
            afterShouldAmount: '@integer(5000,9000)',
            afterNotAmount: '@integer(5000,9000)',
            remarks: '@ctitle',
            isDelet: '@pick([0,1])'
          }
        ],
        paymentBillModel: [
          {
            paymentNum: '@code',
            expenseItemName: '@ctitle',
            paymentDays: '@date',
            amount: '@integer(5000,9000)',
            payDay: '@date',
            payAccountName: '@ctitle',
            cutAmount: '@integer(5000,9000)',
            updateBy: '@cname',
            updateTime: '@datetime',
            invoiceId: '@id'
          }
        ],
        paymentRefundBillModel: [
          {
            refundCode: '@code',
            expenseItemName: '@ctitle',
            paymentDays: '@date',
            refundAmount: '@integer(5000,9000)',
            refundAt: '@date',
            payMethodName: '@ctitle',
            updateBy: '@cname',
            updateTime: '@datetime',
            invoiceId: '@id'
          }
        ],
        invoiceList: [
          {
            id: '@id',
            misPaymentCode: '@code',
            type: '@pick([1,2])',
            amount: '@integer(5000,9000)',
            updateBy: '@cname',
            updateTime: '@datetime'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/mis/bill/delete',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/doScrap',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/mis/bill/print',
    method: 'post',
    response: resData([
      {
        projectName: '@ctitle',
        merchantName: '@cname',
        storeName: '@ctitle',
        contractCode: '@id',
        amount: '@integer(5400,88920)',
        adjustAmount: '@integer(5400,88920)',
        afterAdjustableTaxAmount: '@integer(5400,88920)',
        afterShouldAmount: '@integer(5400,88920)',
        handleAmount: '@integer(5400,88920)',
        afterNotAmount: '@integer(5400,88920)',
        saleAmount: '@integer(5400,88920)',
        feeAmount: '@integer(5400,88920)',
        advanceAmount: '@integer(5400,88920)',
        rebateAmount: '@integer(5400,88920)',
        amountNotReceived: '@integer(5400,88920)',
        overdueFineAmount: '@integer(5400,88920)',
        expenseKey: '@id',
        printModelType: [4],
        billDetailPrintRespList: [
          {
            expenseItemsName: '@ctitle',
            chargingMethod: '@pick([1,2])',
            billCreateAt: '@date',
            paymentDays: '@date',
            expensePeriod: '@date' + '~' + '@date',
            amount: '@integer(5400,88920)',
            adjustAmount: '@integer(5400,88920)',
            taxRate: '@integer(1,100)',
            afterTaxExclusiveAmount: '@integer(5400,88920)',
            afterAdjustableTaxAmount: '@integer(5400,88920)',
            afterShouldAmount: '@integer(5400,88920)',
            handleAmount: '@integer(5400,88920)',
            afterNotAmount: '@integer(5400,88920)'
          }
        ],
        billPrintAccountRespList: [
          {
            expenseItemsName: '@ctitle',
            account: '@cname',
            accountName: '@cname',
            backName: '@ctitle'
          }
        ]
      }
    ])
  },
  {
    url: '/cbd-api-project/mis/payment/query_deposit_account',
    method: 'GET',
    response: resData([
      {
        expenseItemName: '@cname',
        expenseItemId: '@id',
        availableAmount: '@integer(1,99999)'
      },
      {
        expenseItemName: '@cname',
        expenseItemId: '@id',
        availableAmount: '@integer(1,99999)'
      }
    ])
  },
  {
    url: '/cbd-api-project/mis/bill/summary',
    method: 'post',
    response: resData({
      amount: '@integer(3000,9000)',
      counts: '@integer(3000,9000)',
      receivableAmount: '@integer(3000,9000)',
      receivableCount: '@integer(3000,900)',
      copeAmount: '@integer(3000,9000)',
      copeCount: '@integer(3000,900)'
    })
  },
  {
    url: '/cbd-api-project/mis/bill/task_status',
    method: 'post',
    response: resData({
      totalCount: '@integer(1,20)',
      successCount: '@integer(1,20)'
    })
  },
  {
    url: '/cbd-api-project/mis/bill/batch/approve',
    method: 'post',
    response: resData({})
  }
]);
