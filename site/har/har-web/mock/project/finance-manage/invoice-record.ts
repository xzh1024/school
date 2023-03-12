import { create, mockList, resData } from '../../utils';

export default create([
  {
    url: '/cbd-api-project/bill-invoice/page',
    method: 'get',
    response: resData(
      mockList(
        {
          id: '@id',
          clientId: '@id',
          projectName: '@ctitle',
          merchantName: '@ctitle',
          storeName: '@ctitle',
          misPaymentCode: '@id',
          expenseItemsName: '@ctitle',
          type: '@pick([1,2])',
          billSourceType: '@pick([1,2])',
          paymentDays: '@date("yyyy-MM-dd")',
          startAt: '@date("yyyy-MM-dd")',
          endAt: '@date("yyyy-MM-dd")',
          amount: '@integer(1000,6000)',
          status: '@pick([1,2,3,4,5,6])',
          openFailureReason: '@ctitle',
          invoice: '@ctitle',
          isCrossMonth: '@pick([1,2])',
          certificationStatus: '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/bill-invoice/open',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/bill-invoice/revocation',
    method: 'post',
    response: resData({})
  }
]);
