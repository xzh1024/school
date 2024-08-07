import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL), // hash模式
  history: createWebHistory(import.meta.env.BASE_URL), // vite.config文件中的base设置值
  // history: createWebHistory('/mode'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/Me.vue')
    }
  ]
})

export default router
