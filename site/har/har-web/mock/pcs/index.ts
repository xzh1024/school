import { create, mockList, resData } from '../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/flowable-engine/instance/page/todo',
    method: 'get',
    response: resData(
      mockList(
        {
          'taskId': '@id',
          'taskName': '@cname',
          'taskDefKey': '@guid',
          'assigneeId': '@id',
          'deptName|1': ['部门1', '部门2'],
          'startDeptName|1': ['部门1', '部门2'],
          'assigneeName': '@cname',
          'startUserId': '@id',
          'startUserName': '@name',
          'category': '@integer(1, 2)',
          'procVars': {},
          'taskLocalVars': {},
          'deployId': '@id',
          'procDefId': '@id',
          'procDefKey': 'procDefKey',
          'procDefName': '流程定义名称',
          'procDefVersion': '1.0',
          'procInsId': '@id',
          'hisProcInsId': '@id',
          'duration': '100',
          'commentList|1-2': [],
          'candidate': '@cname',
          'createTime': '@datetime',
          'finishTime': '@datetime'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/category/page',
    method: 'get',
    response: resData(
      mockList(
        {
          code: '@id',
          name: '@cname',
          remark: '@ctitle'
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/category/add',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/category/update',
    method: 'put',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/category/delete',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/deployment/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'key': '@id',
          'code': '@id',
          'name': '@cname',
          'version|1': [1, 2],
          'status|1': [1, 2],
          'deploymentTime': '@date'
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/model/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'key': '',
          'name': '@cname',
          'category': '',
          'version|1': [1, 2],
          'createTime': '@date'
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/model/delete/:id',
    method: 'delete',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/model/add',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/model/deploy/:id',
    method: 'get',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/deployment/delete',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/model/page/historyVersion',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'key': '',
          'name': '@cname',
          'category': '',
          'version|1': [1, 2],
          'createTime': '@date'
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/deployment/page/publish',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'processId': '@id',
          'key': '@id',
          'name': '@cname',
          'category': '',
          'version|1': [1, 2],
          'status|1': [1, 2]
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/form/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+2': 2,
          'name': '@cname',
          'content': '@string',
          'remark': '@string'
        },
        { pageNum: 3, pageSize: 10 }
      )
    )
  },
  {
    url: '/flowable-engine/form/delete',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/deployment/changeState',
    method: 'post',
    response: mock({ code: 200 })
  },
  {
    url: '/flowable-engine/model/latest/:id',
    method: 'get',
    response: mock({ code: 200 })
  }
]);
