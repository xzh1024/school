import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
Vue.use(VueRouter);
import store from "@/store";
import { LoginService } from "@/common/services/loginService";
const loginService = new LoginService();

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "main" */ "@/views/index/index.vue")
  },
  {
    path: "/goods",
    name: "Goods",
    component: () =>
      import(/* webpackChunkName: "goods" */ "@/views/goods/index.vue")
  },
  {
    path: "/brand",
    name: "Brand",
    component: () =>
      import(/* webpackChunkName: "brand" */ "@/views/brand/index.vue")
  },
  {
    path: "/company",
    name: "Company",
    component: () =>
      import(/* webpackChunkName: "company" */ "@/views/company/index.vue")
  },
  {
    path: "/redirect/:path",
    name: "Redirect",
    component: () =>
      import(/* webpackChunkName: "redirect" */ "@/views/redirect.vue")
  },
  {
    path: "**",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [...routes],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to: Route, from: Route, next: Function): void => {
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
        next();
      });
  } else {
    next();
  }
});

export default router;
