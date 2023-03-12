import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';
// import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/store-product-stock/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'storeProductId': '@id',
          'productName': '@ctitle',
          'classifyName': '@ctitle',
          'availableNum': '@integer',
          'amount': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/store-product-stock/info/:storeProductId',
    method: 'get',
    response: resData(
      mock({
        productInfo: {
          storeProductId: '@id',
          name: '@cname',
          classifyName: '@ctitle',
          brandName: '@ctitle',
          unitName: '@ctitle',
          status: '@pick([1,2,3])',
          coverPic: [
            {
              id: '@id',
              name: 'cname',
              type: '@title',
              size: 20000,
              previewAddress: '@title'
            }
          ],
          detailPic: [
            {
              id: '@id',
              name: 'cname',
              type: '@title',
              size: 20000,
              previewAddress: '@title'
            }
          ]
        },
        skuStockInfoList: [
          {
            storeProductId: '@id',
            storeProductWeightId: '@id',
            sku: '@ctitle',
            skuPic: [
              {
                id: '@id',
                name: 'cname',
                type: '@title',
                size: 20000,
                previewAddress: '@title'
              }
            ],
            skuCode: '@integer',
            barcode: '@integer',
            scribingPrice: '@integer',
            salePrice: '@integer',
            availableNum: '@integer',
            amount: '@integer'
          }
        ]
      })
    )
  },
  {
    url: '/ground-pc-api/store-product-in-out-order/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'amount': '@integer',
          'orderCode': '@id',
          'type': '@pick([1,2])',
          'code': '@id',
          'createBy': '@cname',
          'createTime': '@datetime',
          'way': '@pick([1,2])',
          'status': '@pick([1,2,3])',
          'num': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/store-product-in-out-order/info/:id',
    method: 'get',
    response: resData(
      mock({
        baseInfo: {
          amount: '@integer',
          type: '@pick([1,2])',
          code: '@id',
          createBy: '@cname',
          createTime: '@datetime',
          way: '@pick([1,2])',
          status: '@pick([1,2,3])',
          num: '@integer'
        },
        inOutInfoList: [
          {
            productName: '@ctitle',
            classifyName: '@ctitle',
            brandName: '@ctitle',
            unitName: '@ctitle',
            sku: '@ctitle',
            num: '@integer'
          }
        ]
      })
    )
  },
  {
    url: '/ground-pc-api/store-product-stock/single-product-list',
    method: 'get',
    response: resData(
      mockList(
        {
          type: '@pick([1,2])',
          code: '@id',
          createBy: '@cname',
          createTime: '@datetime',
          sku: '@ctitle',
          way: '@pick([1,2])',
          status: '@pick([1,2,3])',
          num: '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/store-product-stock/all-info',
    method: 'get',
    response: resData(
      mockList(
        {
          storeProductId: 23,
          name: '@cname',
          classifyName: '@ctitle',
          brandName: '@ctitle',
          unitName: '@ctitle',
          storeProductWeightId: '@id',
          sku: '@ctitle',
          skuPic: '@title',
          skuCode: '@integer',
          barcode: '@integer',
          scribingPrice: '@integer',
          salePrice: '@integer',
          availableNum: '@integer',
          amount: '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }
]);
