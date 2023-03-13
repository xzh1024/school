import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';
export default create([
  {
    url: '/ground-pc-api/order/list',
    method: 'get',
    response: resData(
      mockList(
        {
          orderId: '@id',
          orderNo: '@id',
          storeName: '@cname',
          orderTotalPrice: '@integer',
          createTime: '@datetime',
          orderStatus: '@pick([-1,0,1,2,3,10,11])',
          storeCode: '@id',
          orderSource: '@pick([1,2])',
          updateTime: '@datetime'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/order/info',
    method: 'get',
    response: resData(
      mock({
        storeName: '@ctitle',
        customerServiceTel: '@phoneNumber',
        feature: '@ctitle',
        location: '@ctitle',
        region: '@ctitle',
        address: '@address',
        orderNo: '@id',
        orderType: '@pick([1,2])',
        orderTotalPrice: '@integer',
        createTime: '@datetime',
        orderStatus: '@pick([-1,0,1,2,3,10,11])',
        fundFlowNo: '@id',
        userCode: '@id',
        nickName: '@cname',
        memberLevel: '@ctitle',
        phone: '@phoneNumber',
        memberDiscount: '@integer',
        integralDiscount: '@integer',
        couponDiscount: '@integer',
        discountAmount: '@integer',
        payAmount: '@integer',
        promotionAmount: '@integer',
        cashAmt: '@integer',
        wxAmt: '@integer',
        alipayAmt: '@integer',
        posAmt: '@integer',
        otherAmt: '@integer',
        prdList: [
          {
            prdId: '@id',
            prdName: '@ctitle',
            prdPic: {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            },
            prdSpecNames: '@ctitle',
            prdNum: '@Integer',
            prdPrice: '@Integer',
            prdTotalPrice: '@Integer'
          }
        ]
      })
    )
  }
]);
