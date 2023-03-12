import { create, resData } from '../../utils';
import { mock } from 'mockjs';
//货品组下拉
export default create([
  {
    url: '/cbd-api-project/common/goods/group/select',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@cname'
          }
        ]
      }).list
    )
  }, //招商计划下拉
  {
    url: '/cbd-api-project/common/invest-channel/list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@cname'
          }
        ]
      }).list
    )
  }, //添加货品组
  {
    url: '/cbd-api-project/goods/group/save',
    method: 'post',
    response: resData(mock({}))
  }, //添加正式主体信息
  {
    url: '/cbd-api-project/formal/contract/subject/save',
    method: 'post',
    response: resData(mock({}))
  }, //添加意向主体信息
  {
    url: '/cbd-api-project/intention/contract/subject/save',
    method: 'put',
    response: resData(mock({}))
  },
  //查看主体信息
  {
    url: '/cbd-api-project/formal/contract/subject/info/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'projectId': '@id',
        'projectName': '@cname',
        'investPlanId': '@id',
        'code': '@cname',
        'paperCode': '@cname',
        'merchantId|+1': 1,
        'merchantName': '@cname',
        'brandId|+1': 1,
        'brandName': '@cname',
        'formatId|+1': 1,
        'formatName': '@cname',
        'storeName': '@cname',
        'operatMode|1': [1, 2],
        'signDate': '@date', //1、自营2、联营
        'leaseStartDate': '@date',
        'leaseEndDate': '@date',
        'effectStartDate': '@date',
        'effectEndDate': '@date',
        'defaultAmount': '@integer',
        'mainStores|1': [1, 2],
        'unifiedCashier|1': [1, 2],
        'goodsGroupIds': [1, 2, 3, 4, 5],
        'remark': '@cname',
        'invoice': {
          'invoiceType|1': [1, 2],
          'invoiceRise': '@cname',
          'categoryType|1': [1, 2],
          'category': '@cname',
          'bank': '@cname',
          'bankNo': '@integer',
          'phone': '@integer',
          'address': '@cname'
        }
      })
    )
  }, //招商计划下拉列表
  {
    url: '/cbd-api-project/invest/plan/select',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@cname'
          }
        ]
      }).list
    )
  }, //招商计划详情
  {
    url: '/cbd-api-project/invest/plan/contract/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'type|1': [1, 2],
        'code': '@cname',
        'merchantName': '@cname',
        'merchantShortName': '@cname',
        'companyName': '@cname',
        'businessLicenseNumber': '@cname',
        'idNumber': '@integer',
        'legalPerson': '@cname',
        'bankAccountName': '@cname',
        'bank': '@cname', //1、自营2、联营
        'bankAccount': '@integer',
        'linkman': '@cname',
        'linkTel': '@cname',
        'address': '@cname',
        'estateName': '@cname',
        'brandName': '@cname',
        'startDate': '@date',
        'endDate': '@date'
      })
    )
  }
]);
