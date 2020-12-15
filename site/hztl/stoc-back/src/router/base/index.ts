export default [
  // {
  //   path: "/base",
  //   name: "Base",
  //   component: () =>
  //     import(/* webpackChunkName: "base" */ "@/views/base/index.vue")
  // },
  {
    path: "/base",
    name: "Base",
    icon: "icon-menu-base",
    meta: {
      title: "基础"
    },
    // component: () =>
    //   import(/* webpackChunkName: "main" */ "@/views/MainIndex.vue"),
    component: () =>
      import(/* webpackChunkName: "base" */ "@/views/base/index.vue")
    // children: [
    //   {
    //     path: "/",
    //     name: "BaseIndex",
    //     component: () =>
    //       import(/* webpackChunkName: "base" */ "@/views/base/index.vue")
    //   }
    // ]
  }
];
