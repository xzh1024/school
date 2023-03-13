import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
Vue.use(VueRouter);
import store from "@/store";
import { LoginService } from "@/common/services/loginService";
const loginService = new LoginService();

const routes: Array<RouteConfig> = [];

const operatorRouter = new VueRouter({
  mode: "history",
  // base: "/",
  routes: [...routes],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

operatorRouter.beforeEach((to: Route, from: Route, next: Function): void => {
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

export default operatorRouter;
