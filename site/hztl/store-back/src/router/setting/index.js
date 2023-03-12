export default {
  path: "/setting",
  name: "设置",
  iCons: "icon-set-menu",
  redirect: "/setting/basicSetting",
  component: () => import("@/views/ManageCenter"),
  children: [
    {
      path: "/setting/companyInfo",
      name: "公司资料",
      component: () => import("@/views/setting/companyInfo/index.vue")
    },
    {
      path: "/setting/basicSetting",
      name: "基础设置",
      component: () => import("@/views/setting/basicSetting/index.vue")
    }
  ]
};
