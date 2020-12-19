import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
