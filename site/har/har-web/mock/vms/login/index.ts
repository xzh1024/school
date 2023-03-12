import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';
export default create([
  {
    url: '/ground-pc-api/auth/getRouters',
    method: 'get',
    response: resData(
      mock([
        {
          name: '场馆服务台',
          path: '/vms/service-counter',
          hidden: false,
          redirect: '',
          meta: {
            title: '场馆服务台',
            icon: '',
            noCache: false
          },
          isFrame: 1
        },
        {
          name: '卡项管理',
          path: '/vms/card',
          hidden: false,
          redirect: '',
          meta: {
            title: '卡项管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              title: '限期卡',
              path: '/vms/card/period',
              hidden: false,
              redirect: '',
              meta: {
                title: '限期卡',
                icon: '',
                noCache: false
              },
              isFrame: 1
            },
            {
              title: '次卡',
              path: '/vms/card/once',
              hidden: false,
              redirect: '',
              meta: {
                title: '次卡',
                icon: '',
                noCache: false
              },
              isFrame: 1
            }
          ],
          isFrame: 1
        },
        {
          name: '系统管理',
          path: '/vms/system',
          hidden: false,
          redirect: '',
          meta: {
            title: '卡项管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              title: '合同模板',
              path: '/vms/system/contract',
              hidden: false,
              redirect: '',
              meta: {
                title: '合同模板',
                icon: '',
                noCache: false
              },
              isFrame: 1
            }
          ],
          isFrame: 1
        }
      ])
    )
  },
  {
    url: '/ground-pc-api/auth/getUserInfo',
    method: 'get',
    response: resData(
      mock({
        userId: '@id',
        userName: '@cname',
        realName: '@cname',
        nickName: '@cname',
        email: '@email',
        sex: 1,
        avatar: '@image',

        roles: [],
        permissions: []
      })
    )
  },
  {
    url: '/ground-pc-api/oauth2/authorize',
    method: 'get',
    response: resData(
      mock({
        state: 200,
        redirectUrl: 'http://localhost/#/vms/service-counter'
      })
    )
  },
  {
    url: '/ground-pc-api/oauth2/exchange',
    method: 'get',
    response: resData(
      mock({
        token: '@id'
      })
    )
  }
]);
