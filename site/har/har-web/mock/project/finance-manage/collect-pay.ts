import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/cbd-api-project/mis/payment/list',
    method: 'POST',
    response: resData(
      mockList(
        {
          id: '@id',
          projectName: '@ctitle',
          paymentNum: '@id',
          payMethodStr: '@ctitle',
          merchantName: '@cname',
          contractCode: '@id',
          storeName: '@ctitle',
          billType: '@pick([1,2])',
          amount: '@integer(2545,178454)',
          createTime: '@datetime',
          overdueFineAmount: '@integer(2545,178454)',
          auditStat: '@pick([1,2,3,4,5])',
          businessStat: '@pick([1,2,3,4,5])',
          invoiceId: '@id'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/mis/payment/statistics',
    method: 'post',
    response: resData(
      mock({
        collectSum: {
          totalCount: '@integer(56020,789456)',
          totalAmount: '@integer(56020,789456)'
        },
        paySum: {
          totalCount: '@integer(56020,789456)',
          totalAmount: '@integer(56020,789456)'
        }
      })
    )
  },
  {
    url: '/cbd-api-project/common-mis/pay/method/select-project',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: '@integer(1,100)'
        },
        {
          label: '@ctitle',
          value: '@integer(1,100)'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/mis/payment/export',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment/confirm',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment/audit',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment/print',
    method: 'POST',
    response: resData([
      {
        createBy: '@cname',
        createAt: '@date',
        cutAmount: '@integer(165498,789454)',
        recordAmount: '@integer(165498,789454)',
        receivableAmount: '@integer(165498,789454)',
        collectionAndPaymentAmount: '@integer(165498,789454)',
        printModelType: '@pick([1,2,3,4])',
        projectName: '@ctitle',
        billType: '@pick([1,2])',
        billNum: '@id',
        merchantName: '@cname',
        contractCode: '@id',
        storeName: '@ctitle',
        receivableAmountCapital: '@ctitle',
        collectionAndPaymentAmountCapital: '@ctitle',
        cutAmountCapital: '@ctitle',
        recordAmountCapital: '@ctitle',
        amountNotReceivedCapital: '@ctitle',
        billBackAmount: '@cname',
        billBackAmountCapital: '@ctitle',
        billFeeAmount: '@integer(165498,789454)',
        billFeeAmountCapital: '@ctitle',
        billTurnPreAmount: '@integer(165498,789454)',
        billTurnPreAmountCapital: '@ctitle',
        billSaleAmount: '@integer(165498,789454)',
        amountNotReceived: '@integer(165498,789454)',
        notPayAmount: '@integer(165498,789454)',
        billSaleAmountCapital: '@ctitle',
        detailList: [
          {
            expenseItemsName: '@ctitle',
            paymentDays: '2023110',
            expensePeriod: '@date' + '~' + '@date',
            billCreateAt: '@date',
            receivableAmount: '@integer(165498,789454)',
            collectionAndPaymentAmount: '@integer(165498,789454)',
            chargeTypeName: '@ctitle',
            cutSumAmount: '@integer(165498,789454)',
            cutExpenseItemName: '@ctitle',
            recordAmount: '@integer(165498,789454)',
            payMethodStr: '@ctitle'
          }
        ]
      }
    ])
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
        printModelType: '@pick([1,2,3,4])',
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
    url: '/cbd-api-project/mis/payment/delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment/detail',
    method: 'get',
    response: resData({
      billOutput: {
        billType: 2,
        billNum: 321312312,
        collectionAndPaymentAmount: '@integer(165498,789454)',
        receivableAmount: '@integer(165498,789454)',
        amountNotReceived: '@integer(165498,789454)',
        id: '@id',
        expenseItemsId: '@id',
        projectName: '@ctitle',
        merchantName: '@cname',
        contractCode: '@id',
        storeName: '@ctitle',
        expenseItemsName: '@ctitle',
        paymentDays: '2023110',
        expensePeriod: '@date' + '~' + '@date',
        billCreateAt: '@date',
        chargeTypeName: '@ctitle',
        cutSumAmount: '@integer(165498,789454)',
        cutExpenseItemName: '@ctitle',
        recordAmount: '@integer(165498,789454)',
        payMethodStr: '@ctitle'
      },
      recordOutputList: [],
      cutOutputList: [],
      resourceFilesRespList: [],
      refundDetailList: [],
      invoiceInfo: [],
      payAccountId: '@',
      payBankName: '@',
      payAccountNum: '@',
      payNum: '@',
      receiptAccountId: '@',
      receiptBankName: '@',
      receiptAccountNum: '@',
      receiptNum: '@',
      paymentType: '@',
      paymentNum: '@',
      amount: '@',
      auditStat: '@pick([1,2,3,4,5])',
      businessStat: '@pick([1,2,3,4,5])',
      invoiceId: '@',
      projectId: '@',
      merchantId: '@',
      storeId: '@',
      contractId: '@',
      billId: '@',
      refundAmount: '@',
      flowId: '@',
      payRemark: '@',
      receiptRemark: '@',
      resourceCode: '@',
      payAccountName: '@',
      receiptAccountName: '@',
      overdueFineAmount: '@',
      clientId: '@',
      contractCode: '@',
      paymentDays: '@',
      billAmount: '@',
      billHandleAmount: '@',
      refundableAmount: '@',
      outTradeNo: '@',
      billBackAmount: '@',
      billFeeAmount: '@',
      billTurnPreAmount: '@',
      id: '@',
      deleteFlag: '@',
      createBy: '@',
      createTime: '@',
      updateBy: '@',
      updateTime: '@'
    })
  }
]);
