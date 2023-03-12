import Vue from "vue";
import VueRouter from "vue-router";
// import homeRouter from "./homeRouter";
// import manageCenterRouter from './manageCenterRouter'
import mainRouters from "./routers";
import { envConfig } from "envConfigPath";

Vue.use(VueRouter);
const originalReplace = VueRouter.prototype.replace;
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(e => e)
}
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(e => e)
}
const routes = [
  {
    path: "*",
    name: "/",
    redirect: "/workbench/initGuide"
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: ()=> import('@/views/login.vue')
  // },
  {
    path: "/redirect/:path",
    name: "Redirect",
    component: () => import("@/views/redirect.vue")
  },
  // {
  //   path: '/home',
  //   name: '首页',
  //   component: () => import('@/views/Home.vue'),
  //   redirect:'/home/infoManage',
  //   children:[
  //     ...homeRouter
  //   ]
  // },
  // {
  //   path: '/manageCenter',
  //   name: '管理中心',
  //   component: () => import('@/views/ManageCenter.vue'),
  //   redirect:'/goods',
  //   children:[
  //     ...manageCenterRouter
  //   ]
  // },
  ...mainRouters
];

const router = new VueRouter({
  mode: "history",
  base: envConfig.routerPrefix,
  routes
});
router.beforeEach((to, from, next) => {
  // let userInfo = sessionStorage.getItem("userInfo");
  // if (!userInfo){
  //   if (to.path != "/error") {
  //     next('/error');
  //   } else {
  //     next();
  //   }
  // } else{
  next();
  // } 
});

export default router;
