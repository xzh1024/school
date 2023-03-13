import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/member/label/page',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': '@id',
          'name': '@ctitle', // 标签名称
          'createBy': '@cname', // 创建人
          'createTime': '@dateTime', // 创建时间
          'memberNum': '@integer(0,10000)' // 会员数量
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/ground-pc-api/member/label/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/label/edit',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/member/label/delete/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: 'ground-pc-api/member/label/allow_delete/id',
    method: 'GET',
    response: resData(mock({}))
  }
]);
