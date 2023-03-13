export default {
  path: "/store",
  name: "店铺",
  iCons: "icon-shop-menu",
  redirect: "/store/storeManage",
  component: () => import("@/views/ManageCenter"),
  children: [
    {
      path: "/store/storeManage",
      name: "店铺管理",
      component: () => import("@/views/store/storeManage/index.vue")
    }
  ]
};
