import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //   history: createWebHashHistory(), // 路由器的工作模式
  history: createWebHistory(), // 路由器的工作模式
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/pages/about/index.vue'),
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/pages/news/index.vue'),
      children: [
        // {
        //   path: 'detail/:id/:title/:content?',
        //   name: 'NewsDetail',
        //   component: () => import('@/pages/news/detail/index.vue'),
        //   props: true,
        // },
        {
          path: 'detail',
          name: 'NewsDetail',
          component: () => import('@/pages/news/detail/index.vue'),
          props: (route) => route.query,
        },
      ],
    },
    // {
    //   path: '/newsDetail',
    //   name: 'NewsDetail',
    //   component: () => import('@/pages/news/detail/index.vue'),
    // },
    // 重定向页面，处理数据刷新
    {
      path: '/redirect/:path',
      name: 'Redirect',
      component: () => import('@/pages/redirect.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
})

router.beforeEach(async (to, from) => {
  //   if (
  //     // 检查用户是否已登录
  //     !isAuthenticated &&
  //     // ❗️ 避免无限重定向
  //     to.name !== 'Login'
  //   ) {
  //     // 将用户重定向到登录页面
  //     return { name: 'Login' }
  //   }
  console.log('to--')
  console.log(to)
  console.log(from)
  // 返回 false 以取消导航
  //   return false
  //   const token = to.query.token as string
  //   if (token) {
  //     loginService
  //       .tokenLogin(token)
  //       .then(() => {
  //         sessionStorage.token = token
  //         store.dispatch('base/loadBase')
  //         next({ path: to.path })
  //       })
  //       .catch(() => {
  //         next(false)
  //       })
  //   } else if (sessionStorage.token) {
  //     next()
  //   } else {
  //     next(false)
  //   }
})

export default router
