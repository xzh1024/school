export default [
  {
    path: "/setup",
    name: "Setup",
    icon: "icon-menu-setup",
    meta: {
      title: "设置"
    },
    component: () =>
      import(/* webpackChunkName: "setup" */ "@/views/setup/index.vue")
  }
];
