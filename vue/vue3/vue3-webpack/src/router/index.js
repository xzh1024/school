import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import layout from '@/layout';

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: '/userGroup',
        name: 'userGroup',
        component: () => import('@/views/userGroup/index.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/views/rights/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@/views/home/index.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
