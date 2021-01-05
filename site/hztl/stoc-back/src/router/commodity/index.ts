export default [
  {
    path: "/commodity",
    name: "Commodity",
    icon: "icon-menu-commodity",
    meta: {
      title: "商品"
    },
    component: () =>
      import(/* webpackChunkName: "base" */ "@/views/commodity/index.vue")
  }
];
