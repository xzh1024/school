import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  //新增费用项目
  {
    url: '/cbd-api-project/mis/expenseItems/save',
    method: 'post',
    response: resData(mock({}))
  },

  //新增支付方式
  {
    url: '/cbd-api-project/mis/payMethod/save',
    method: 'post',
    response: resData(mock({}))
  },
  //删除费用项目
  {
    url: '/cbd-api-project/mis/expenseItems/delete',
    method: 'get',
    response: resData(mock({}))
  },

  //删除支付方式
  {
    url: '/cbd-api-project/mis/payMethod/delete',
    method: 'get',
    response: resData(mock({}))
  },
  //费用设置列表
  {
    url: '/cbd-api-project/mis/expenseItems/list',
    method: 'post',
    response: resData(
      mock([
        {
          'expenseKey': '@cname',
          'expenseKeyName': '@cname',
          'details|1-5': [
            {
              'expenseCode': '@integer',
              'expenseType': '@cname',
              'print|1': [0, 1],
              'id': '@id',
              'chargingMethod|1': [0, 1],
              'projectId': '@id',
              'expenseKey': '@id'
            }
          ]
        }
      ])
    )
  },
  //支付列表
  {
    url: '/cbd-api-project/mis/payMethod/list',
    method: 'post',
    response: resData(
      mock([
        {
          'scenes': '@cname',
          'methodDetails|1-5': [
            {
              'code': '@integer',
              'paymentMethod': '@cname',
              'switchs|1': [0, 1],
              'scenes|1': [0, 1],
              'id': '@id',
              'chargingMethod|1': [0, 1],
              'projectId': '@id',
              'serviceRate': '@id',
              'sorts': '@integer'
            }
          ]
        }
      ])
    )
  },
  //支付列表
  {
    url: '/cbd-api-project/mis/collection/list',
    method: 'post',
    response: resData(
      mock([
        {
          'backName': '@cname',
          'accountListVos|1-5': [
            {
              'id|+1': 1,
              'code': '@integer',
              'accountName': '@cname',
              'backAccount': '@cname',
              'expenseTypeName': '@ctitle'
            }
          ]
        }
      ])
    )
  }
]);
