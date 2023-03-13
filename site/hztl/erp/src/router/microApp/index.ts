// 系统管理路由
export default [
  {
    name: "Basics-next",
    path: "/app1",
    icon: "icon-img-workbench-base-white",
    icons: "icon-img-workbench-base-white",
    redirect: "/basics/definition",
    meta: {
      title: "测试菜单",
      perm: "basics"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "reportPanel",
        name: "reportPanel",
        meta: {
          title: "采购面板"
        },
        component: () =>
          import(/* webpackChunkName: "main" */ "@/views/BlankPage")
      },
      {
        path: "reportList",
        name: "reportList",
        meta: {
          title: "采购列表"
        },
        component: () =>
          import(/* webpackChunkName: "main" */ "@/views/BlankPage")
      }
    ]
  }
];
