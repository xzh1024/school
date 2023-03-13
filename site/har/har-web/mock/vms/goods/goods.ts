import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/product-attribute/classify-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'pid|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'allow|1': [true, false],
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'name': '@cname',
                'remark': '@ctitle',
                'allow|1': [true, false]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/product-attribute/classify-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/classify-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/classify-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: `/ground-pc-api/product-attribute/classify-info/:id`,
    method: 'get',
    response: resData({
      'id|+1': 1,
      'pid|+1': 1,
      'sort|+1': 1,
      'name': '@cname',
      'remark': '@ctitle'
    })
  },
  {
    url: '/ground-pc-api/product-attribute/specifications-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'pid|+1': '',
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'pid|+1': 1,
                'name': '@cname',
                'remark': '@ctitle'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: `/ground-pc-api/product-attribute/specifications-info/:id`,
    method: 'get',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'pid': '',
      'name': '@cname',
      'remark': '@ctitle',
      'allow|1': [true, false],
      'children|0-10': [
        {
          'id|+1': 1,
          'sort|+1': 1,
          'pid|+1': 1,
          'name': '@cname',
          'remark': '@ctitle',
          'allow|1': [true, false]
        }
      ]
    })
  },
  {
    url: '/ground-pc-api/product-attribute/specifications-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/specifications-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/specifications-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/brand-list',
    method: 'GET',
    response: resData([
      {
        'id|+1': 1,
        'sort|+1': 1,
        'name': '@cname',
        'remark': '@ctitle',
        'file': [
          {
            'id|1': 1,
            'name': '@cname',
            'type': 'image',
            'size': 50025142142,
            'previewAddress':
              'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
          }
        ]
      }
    ])
  },
  {
    url: '/ground-pc-api/product-attribute/brand-info/:id',
    method: 'GET',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'name': '@cname',
      'remark': '@ctitle',
      'file': []
    })
  },
  {
    url: '/ground-pc-api/product-attribute/brand-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/brand-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/brand-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/units-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname'
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/product-attribute/units-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/units-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/units-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/product-attribute/units-info/:id',
    method: 'GET',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'name': '@cname'
    })
  },
  {
    url: '/ground-pc-api/store-product/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@cname',
          'classifyName': '@ctitle',
          'brandName': '@ctitle',
          'weightName': '@ctitle',
          'weightNum': 2,
          'unitName|1': ['种', '只', '支', '件'],
          'status|1': [0, 1],
          'updateTime': '@date'
        },
        {}
      )
    )
  },
  {
    url: '/ground-pc-api/store-product/save',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/store-product/update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/store-product/updateStatus/:id',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/store-product/info/:id',
    method: 'get',
    response: resData({
      'id|+1': 1,
      'name': '@cname',
      'classifyName': '@ctitle',
      'brandName': '@ctitle',
      'weightName': '@ctitle',
      'unitName': '@ctitle',
      'status|1': [0, 1],
      'classifyId': '@pick(["1","2","3","4","5"])',
      'brandId|+1': 1,
      'unitId|+1': 1,
      'coverCode': {
        'id|+1': 1,
        'name': '@cname',
        'type': 'image',
        'size': 50161616,
        'previewAddress':
          'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
      },
      'detailsCodes|1-3': [
        {
          'id|+1': 1,
          'name': '@cname',
          'type': 'image',
          'size': 50161616,
          'previewAddress':
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
        }
      ],
      'specNames|3': [
        {
          'psnId|+1': 1,
          'specId|+1': 1,
          'name': '@cname',
          'specVals|2': [
            {
              'psvId|+1': 1,
              'name': '@cname'
            }
          ]
        }
      ],
      'weights|3': [
        {
          specValueIds: [],
          names: '@ctitle',
          picCode:
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          code: '@id',
          barcode: '@id',
          scribingPrice: '@integer(1,100)'
        }
      ],
      'instructions': '@sentence',
      'graphicDetails': '<p>测试富文本美容</p>'
    })
  },
  {
    url: '/ground-pc-api/common/product/attribute/classify',
    method: 'get',
    response: resData(
      mock({
        'list|1-5': [
          {
            'id': '@id',
            'pid|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'allow|1': [true, false],
            'children|0-10': [
              {
                'id': '@id',
                'sort|+1': 1,
                'name': '@cname',
                'remark': '@ctitle',
                'allow|1': [true, false]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/common/product/attribute/specifications',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'pid|+1': '',
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'pid|+1': 1,
                'name': '@cname',
                'remark': '@ctitle'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/common/product/attribute/brand',
    method: 'get',
    response: resData(
      mock({
        'list|1-3': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'file': [
              {
                'id|1': 1,
                'name': '@cname',
                'type': 'image',
                'size': 50025142142,
                'previewAddress':
                  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/common/product/attribute/units',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname'
          }
        ]
      }).list
    )
  }
]);
