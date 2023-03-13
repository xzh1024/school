import { create, mockList1, resData } from '../utils';
import { mock } from 'mockjs';
export default create([
  {
    url: '/ground-pc-api/ground/contract_template/get_template_by_store_id',
    method: 'GET',
    response: resData(
      mockList1({
        'memberCardId|+1': 1,
        'content': '@string',
        'title': '@cname',
        'templateType|1': [1, 2],
        'printType|1': [1, 2, 3]
      })
    )
  },
  {
    url: '/ground-pc-api/ground/contract_template/modify_template',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-base/drop-list',
    method: 'GET',
    response: resData(
      mockList1({
        'label': '@cname',
        'value|2': 1
      })
    )
  },
  {
    url: '/ground-pc-api/card-base/page-list',
    method: 'GET',
    response: resData({
      rows: mockList1({
        'id|+1': 1,
        'projectName': '@cname',
        'storeName': '@string',
        'name': '@string',
        'limitTimes': '@integer',
        'expirationDate': '@integer',
        'venuesArea': '@string',
        'salePrice': '@integer',
        'shelfStatusName': '@string',
        'saleStatusName': '@string',
        'saleChannelName': '@string'
      })
    })
  },
  {
    url: '/ground-pc-api/card-base/shelf',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-base/card',
    method: 'DELETE',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-base/off-sale',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-base/card',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-base/card',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-order/sign',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/ground-pc-api/card-order/save',
    method: 'POST',
    response: resData({})
  }
]);
