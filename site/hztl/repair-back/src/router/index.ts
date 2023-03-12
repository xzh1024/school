import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import base from "./base";
import setup from "./setup";
import commodity from "./commodity";
import { LoginService } from "@/common/services/loginService";
const loginService = new LoginService();

Vue.use(VueRouter);

export const mainIndexRoutes = [...base, ...setup, ...commodity];

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/base" },
  ...mainIndexRoutes,
  {
    path: "/partsManage",
    name: "PartsManage",
    meta: {
      title: "商品管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "partsManage" */ "@/views/partsManage/index.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/back/" : "/",
  routes
});

router.beforeEach((to, from, next) => {
  const token = to.query.token as string;
  if (token) {
    loginService
      .tokenLogin(token)
      .then(() => {
        sessionStorage.token = token;
        store.dispatch("base/loadBase");
        next({ path: to.path });
      })
      .catch(() => {
        next(false);
      });
  } else if (sessionStorage.token) {
    next();
  } else {
    next(false);
  }
});

export default router;
