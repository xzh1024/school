import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index/Index.vue'
import Login from './views/Login/Login.vue'

Vue.use(Router)

// export default new Router({
const $router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',  // 默认进入路由
      redirect: '/index'   //重定向
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta:{
        title: '首页',
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title: '登录',
        index: 100
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '**',   // 错误路由
      redirect: '/index'   //重定向
    }
  ]
})

$router.beforeEach((to, from, next) => {
  console.log(to);

  next();
})

export default $router;
