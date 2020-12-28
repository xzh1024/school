import Vue from "vue";
import VueRouter, { RouteConfig, Location } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/index/index.vue")
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
    path: "**",
    redirect: "/"
  }
];

// 处理重复点击同一路由控制台报错
const originalReplace: any = VueRouter.prototype.replace;
(VueRouter as any).prototype.replace = function(location: Location) {
  return originalReplace.call(this, location).catch((err: any) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;