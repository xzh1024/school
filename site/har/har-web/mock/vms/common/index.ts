import { create, resData } from '../../utils';
import { mock } from 'mockjs';
export default create([
  {
    url: '/ground-pc-api/common/project/selectList',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@integer',
            label: '@ctitle'
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/merchantEmployee/listByStoreId',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            id: '@id',
            userCode: '@id',
            userId: '@id',
            realName: '@cname'
          }
        ]
      }).list
    )
  },
  {
    url: '/ground-pc-api/common/store/select',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@integer',
            label: '@ctitle',
            code: '@word'
          }
        ]
      }).list
    )
  }
]);
