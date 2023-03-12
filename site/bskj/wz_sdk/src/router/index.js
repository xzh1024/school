import Vue from 'vue'
import Router from 'vue-router'
import User from '@/pages/user'
import Passwd from '@/pages/user/passwd'
import Playercashlog from '@/pages/user/playercashlog'

import Rebate from '@/pages/rebate' //返利
import RebateApply from '@/pages/rebate/rebateApply' //返利申请


import Kac from '@/pages/kac'
import Message from '@/pages/message'
import MessageDetails from '@/pages/message/messageDetails'

import Psp from '@/pages/psp' //攻略
import PspDetails from '@/pages/psp/pspDetail' //攻略详情
import Service from '@/pages/service' //客服

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',  // 默认进入路由
      redirect: '/user'   //重定向
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta:{
        title: '用户中心',
        index: 0
      }
    },
    {
      path: '/rebate',
      name: 'Rebate',
      component: Rebate,
      meta:{
        title: '返利',
        index: 1
      }
    },
    {
      path: '/kac',
      name: 'Kac',
      component: Kac,
      meta:{
        title: '礼包',
        index: 2
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta:{
        title: '消息',
        index: 3
      }
    },
    {
      path: '/psp',
      name: 'Psp',
      component: Psp,
      meta:{
        title: '攻略',
        index: 4
      }
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      meta:{
        title: '客服',
        index: 5
      }
    },
    {
      path: '/passwd',
      name: 'Passwd',
      component: Passwd,
      meta:{
        title: '修改密码',
        index: 100
      }
    },
    {
      path: '/playercashlog',
      name: 'Playercashlog',
      component: Playercashlog,
      meta:{
        title: '消费记录',
        index: 100
      }
    },
    {
      path: '/rebateApply',
      name: 'RebateApply',
      component: RebateApply,
      meta:{
        title: '返利申请',
        index: 100
      }
    },
    {
      path: '/messageDetails/:msgid/:action',
      name: 'MessageDetails',
      component: MessageDetails,
      meta:{
        title: '消息详情',
        index: 100
      }
    },
    {
      path: '/pspDetail/:id',
      name: 'PspDetails',
      component: PspDetails,
      meta:{
        title: '攻略详情',
        index: 100
      }
    },
    {
      path: '**',   // 错误路由
      redirect: '/user'   //重定向
    }
  ]
})
