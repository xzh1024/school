import Vue from "vue";
import Router from "vue-router";
// 导入各部分路由
import syetem from "./system";
import company from "./company";
import base from "./base";
import storehouse from "./storehouse";
import sales from "./sales";
import purchase from "./purchase";
import finance from "./finance";
import platform from "./platform";
import transfer from "./transfer";
// import microApp from "./microApp";
import reportApp from "./reportApp";
import officeAutomation from "./officeAutomation";

import { envConfig } from "envConfigPath";

Vue.use(Router);

export const mainIndexRoutes = [
  ...syetem,
  ...company,
  ...base,
  ...purchase,
  ...sales,
  ...envConfig.routersOfYX.repair,
  ...transfer,
  ...storehouse,
  ...finance,
  ...platform,
  // ...microApp,
  ...reportApp,
  ...officeAutomation
];

export const routes = [
  { path: "/", redirect: "/BaseIndex" },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/layout/userLayout"),
    children: [
      {
        path: "/Login",
        name: "登录",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/entrance/Login")
      },
      {
        path: "/ForgetPsd",
        name: "忘记密码",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/entrance/ForgetPsd")
      },
      {
        path: "/Register",
        name: "注册",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/entrance/Register")
      }
    ]
  },
  {
    path: "/",
    name: "登录后用户状态管理页",
    component: () =>
      import(/* webpackChunkName: "main" */ "@/views/LoginedBase"),
    children: [
      ...mainIndexRoutes,
      {
        path: "/Selects",
        name: "选择",
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/selects")
      }
    ]
  }
];

const vueRouter = new Router({
  mode: "history",
  base: envConfig.routerPrefix,
  routes
});

export default vueRouter;
