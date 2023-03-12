export default {
  path: "/workbench",
  name: "账号",
  iCons: "icon-workbench-menu",
  isHide: true,
  redirect: "/workbench/initGuide",
  component: () => import("@/views/ManageCenter"),
  children: [
    {
      path: "/workbench/initGuide",
      name: "初始化指引",
      isHide: true,
      // iCons: "el-icon-document",
      component: () => import("@/views/workbench/initGuide/index.vue")
    },
    {
      path: "/workbench/overview",
      name: "概览",
      isHide: true,
      // iCons: "el-icon-document",
      component: () => import("@/views/workbench/overview/index.vue")
    }
  ]
};
