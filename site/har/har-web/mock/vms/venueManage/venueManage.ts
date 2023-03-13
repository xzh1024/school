import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/venue/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': /\d{1,10}/, // 场地编码
          'name': /场地-\d{1,10}/, // 场地名称
          'projectId': '@id', // 项目id
          'projectName': /项目-\d{1,10}/, // 项目名称
          'storeId': '@id', // 店铺id
          'storeName': /店铺-\d{1,10}/, // 店铺名称
          'venueClassifyId': '@id', // 分类id
          'venueClassifyName': /分类-\d{1,4}/, // 分类名称
          'status': '@pick([1,2])', // 状态1启用;2禁用;
          'coverFileCode': '@word(10, 20)', // 封面(文件code)
          'detailsFileCode': '@word(10, 20)', // 详情图片文件Code
          'sales': '@integer(0,10000)', // 销量
          'updateTime': '@datetime', // 更新时间
          'updateBy': '@cname', // 更新人
          'ruleTypes': '@pick([1,2,3])' // 包含规则类型1散客；2时段；3包场
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/venue/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue/info/:id',
    method: 'GET',
    response: resData(
      mock({
        id: '@id',
        code: '@guid',
        name: '场地 @word(5, 20)',
        projectId: '@id',
        projectName: '项目 @word(5, 20)',
        storeId: '@id',
        storeName: '店铺 @word(5, 20)',
        estateId: '@id',
        estateName: '场地 @word(5, 20)',
        venueClassifyId: '@id',
        venueClassifyName: '分类 @word(5, 20)',
        status: '@pick([1,2])', // 状态1启用;2禁用;
        coverFileCode: '@guid',
        coverFiles: {
          id: '@word(5, 20)',
          name: '@word(5, 20)',
          type: '@word(5, 20)',
          format: '@word(5, 20)',
          size: '@integer(0,5000)',
          previewAddress: '@word(5, 20)'
        },
        detailsFiles: [
          {
            id: '@cname',
            name: '@word(5, 20)',
            type: '@cname',
            format: '@cname',
            size: '@integer(0,5000)',
            previewAddress: '@ctitle'
          }
        ],
        rules: [
          {
            id: '@id',
            rule: '@pick([1,2,3])', // 规则类型1散客；2时段；3包场
            title: '@ctitle',
            days: '@integer(0,100)',
            hours: '@integer(0,100)',
            configs: [
              {
                id: '@id',
                week: ['@integer(0,100)'],
                priceRules: [
                  {
                    id: '@id',
                    price: '@integer(0,10000)',
                    startTime: '1677641961',
                    endTime: '1677641961'
                  }
                ]
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/ground-pc-api/venue/updateStatus',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue/batchUpdateStatus',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue-rule-price/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'venueId': '@id',
          'venueName': '@ctitle',
          'classifyName': '@ctitle',
          'venueCode': '@guid',
          'ruleType': '@pick([1,2,3])',
          'ruleDesc': '@cname',
          'price': '@integer(0,10000)'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  }
]);
