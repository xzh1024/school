import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/venue-classify/list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'name': /分类-\d{1,4}/, // 名称
            'projectName': '@ctitle',
            'storeName': '@ctitle',
            'sort': '@integer(1,100)', // 序号
            'remark': '@ctitle' // 备注
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/venue-classify/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue-classify/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/venue-classify/info/:id',
    method: 'GET',
    response: resData(
      mock({
        id: '@id',
        name: /分类-\d{1,4}/, // 名称
        sort: '@integer(1,100)', // 序号
        remark: '@ctitle' // 备注
      })
    )
  },
  {
    url: '/ground-pc-api/venue-classify/make/use/:id',
    method: 'GET',
    response: resData(mock('@boolean'))
  },
  {
    url: '/ground-pc-api/venue-classify/delete',
    method: 'POST',
    response: resData(mock({}))
  }
]);
