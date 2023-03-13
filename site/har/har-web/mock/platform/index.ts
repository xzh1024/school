import { create, resData } from '../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/cbd-api-portal/captchaImage',
    method: 'GET',
    response: resData({
      captchaOnOff: true,
      uuid: '@id',
      img: '@image'
    })
  },
  {
    url: '/cbd-api-portal/login',
    method: 'POST',
    response: resData({
      token: '@id'
    })
  },
  {
    url: '/cbd-api-portal/getInfo',
    method: 'GET',
    response: resData({
      roles: [],
      permissions: [],
      user: {
        'userId': '@id',
        'code': '@id',
        'userName': '@cname',
        'realName': '@cname',
        'nickName': '@cname',
        'phoneNumber': /1\d{10}/,
        'sex|1': ['男', '女'],
        'avatar': '@image',
        'status': 0
      }
    })
  },
  {
    url: '/cbd-api-portal/getRouters',
    method: 'GET',
    response: resData(
      mock({
        'row|1-10': [
          {
            name: '资产管理系统',
            nameEn: 'MIS',
            path: 'http://192.168.40.31:5173/#/',
            hidden: '',
            redirect: '',
            component: '',
            query: '',
            alwaysShow: '',
            meta: {
              title: '',
              icon: '',
              noCache: '',
              link: ''
            },
            children: [],
            isFrame: true,
            groupType: '',
            remark:
              '招商管理功能帮助引入租客，合同管理 功能快捷算租户租金支持固定租金和抽成租金等各种收租手段。还支持报修、 巡检等日常维护功能。'
          }
        ]
      }).row
    )
  },
  {
    url: '/cbd-api-portal/logout',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-portal/oauth2/genCredential',
    method: 'GET',
    response: resData('basfubasuigbueboawnaofb12jdiasjnng')
  }
]);
