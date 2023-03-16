import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

export const routeList = [
  {
    path: '/index',
    name: 'Index',
    redirect: '/indexPage',
    meta: {
      title: "首页管理",
    },
    component: () => import("@/views/ContainerMain.vue"),
    children: [
      {
        path: "/indexPage",
        name: "IndexPage",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/index/index.vue")
      },
    ]
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/userList',
    meta: {
      title: "用户管理",
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/ContainerMain.vue"),
    children: [
      {
        path: "/userList",
        name: "UserList",
        meta: {
          title: "用户列表",
        },
        component: () => import('@/views/user/userList/index.vue')
      },
      {
        path: "/userOrder",
        name: "UserOrder",
        meta: {
          title: "用户订单",
        },
        component: () => import('@/views/user/userOrder/index.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/index" },
    ...routeList]
})

export default router
