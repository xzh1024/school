import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import DefaultLayout from '@/layout/default-layout.vue';
import routes from 'virtual:generated-pages';
import createRouteGuard from './guard';

// console.log(routes);
NProgress.configure({ showSpinner: false }); // NProgress Configuration
const path = import.meta.env.BASE_URL;
const router = createRouter({
  history: createWebHashHistory(path),
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      name: 'root',
      path: '/',
      component: DefaultLayout,
      children: routes
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

createRouteGuard(router);

export default router;
