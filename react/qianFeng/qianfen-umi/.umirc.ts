import { defineConfig } from 'umi';

/**
 * 1.约定式路由
 *    通过文件路径来渲染
 * 2.配置式路由
 *    umi3 配置方式
 * **/
export default defineConfig({
  // history: { type: 'hash' },
  // 配置式路由
  routes: [
    { path: '/', component: 'index' },
    { path: '/film', component: './Film' },
    { path: '/cinema', component: './cinema/index' },
    { path: '/detail/:id', component: '@/pages/detail/$id.tsx' },
    { path: '/center', component: './Center', wrappers: ['@/wrappers/Auth'] },
    { path: '/login', component: './Login' },
    { path: '/*', component: '@/pages/404' }
  ],
  // npmClient: 'npm',
  proxy: {
    '/api': {
      target: 'https://i.maoyan.com',
      changeOrigin: true
      // 'pathRewrite': { '^/api' : '' },
    }
  }
});
