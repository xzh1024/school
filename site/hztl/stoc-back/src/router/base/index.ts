export default [
  {
    path: "/base",
    name: "Base",
    icon: "icon-menu-base",
    meta: {
      title: "基础"
    },
    component: () =>
      import(/* webpackChunkName: "base" */ "@/views/base/index.vue")
  }
];
