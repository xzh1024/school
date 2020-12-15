import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import base from "./base";
import setup from "./setup";

// import { ServiceFactory } from "@/common/services/ServiceFactory";
// import { ServiceType } from "@/common/services/base/serviceType";
// import "@/common/services/basicsService";
import { LoginService } from "@/common/services/loginService";
const loginService = new LoginService();

Vue.use(VueRouter);

export const mainIndexRoutes = [...base, ...setup];

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/base" },
  ...mainIndexRoutes
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!sessionStorage.token) {
    const token = to.query.token as string;
    if (token) {
      loginService
        .tokenLogin(token)
        .then(() => {
          sessionStorage.token = token;
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next(false);
    }
  } else {
    next();
  }
  // next();
});

export default router;
