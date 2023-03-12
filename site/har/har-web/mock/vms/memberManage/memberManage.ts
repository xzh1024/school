import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/member/page',
    method: 'POST',
    response: resData(
      mockList(
        {
          'id': '@id',
          'projectName': '项目-@ctitle',
          'code': 'DFAHCwN', // 用户编号
          'avatarUrl': 'AHCwN', // 用户头像
          'name': '@cname', // 会员名称
          'phone': /1\d{10}/, // 手机号码
          'nickName': '@cname', // 用户昵称
          'sourceType': '@pick([1,2,3,4,5])', // 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
          'createTime': '@dateTime', // 注册时间
          'labelNames': '@ctitle' // 会员标签
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/member/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/edit',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/detail/:id',
    method: 'GET',
    response: resData(
      mock({
        'id': '@id',
        'projectId': '@id',
        'clientId': '@id',
        'code': 'd86k', // 用户编号
        'name': '@cname', // 会员名称
        'nickName': '@cname', // 用户昵称
        'avatarUrl': 'Zkb10@', // 用户头像
        'phone': /1\d{10}/, // 用户手机号
        'createTime': '@dateTime', // 注册时间
        'remark': 'z(F!gp', // 备注
        'identityNo': /\d{18}/, // 身份证
        'sourceType': '@pick([1,2,3,4,5])', // 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
        'gender': '@pick([0,1])', // 性别
        'birthDay': '@date', // 生日
        'personType': '@pick([0,1])', // 0-未成年,1-成年人
        'fitnessGoal': '!$*', // 健身目标
        'fitnessLevel': 'nO&', // 健身等级
        'weight': '@integer(40,100)', // 体重
        'height': '@integer(111,200)', // 身高
        'labelIds': [11] // 标签
      })
    )
  },
  {
    url: '/ground-pc-api/member/delete/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/export',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/label/select_list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '标签_ @name'
          }
        ]
      }).list
    )
  }
]);
