import { create, mockList, resData, MOCK } from '../../utils';
import { mock } from 'mockjs';
export default create([
  {
    url: '/ground-pc-api/visitRecord/add',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/visitRecord/findAppointmentTime',
    method: 'get',
    response: resData(
      mockList(
        {
          'id': MOCK.id,
          'clientId': MOCK.id,
          'projectId': MOCK.id,
          'storeId': MOCK.id,
          'visitType|1': [0, 1],
          'memberId': MOCK.id,
          'merchantEmployeeId': MOCK.id,
          'visitTime': MOCK.datatetime,
          'visitStatus': '@pick([1,2,3])',
          'verificationTime': MOCK.datatetime,
          'deleted': MOCK.integer,
          'createBy': MOCK.cname,
          'createTime': MOCK.datatetime,
          'updateBy': MOCK.cname,
          'updateTime': MOCK.datatetime,
          'remark': MOCK.string
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  }
]);
