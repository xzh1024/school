export default {
  path: "/promote_center",
  name: "推广中心",
  iCons: "icon-promotion-menu",
  isHide: true, //隐藏不显示
  component: () => import("@/views/ManageCenter"),
  redirect: "/promoter_management",
  children: [
    {
      path: "/promoter_management",
      name: "推广员管理",
      component: () => import("@/views/promote_center/promoter_management.vue")
    },
    {
      path: "/promoter_description",
      name: "推广员说明",
      component: () => import("@/views/promote_center/promoter_description.vue")
    },
    {
      path: "/promoter_details",
      name: "推广明细",
      component: () => import("@/views/promote_center/promoter_details.vue")
    },
    {
      path: "/promote_goods_managment",
      name: "推广商品管理",
      component: () =>
        import("@/views/promote_center/promote_goods_managment.vue")
    },
    {
      path: "/promote_relation_managment",
      name: "推广关系管理",
      component: () =>
        import("@/views/promote_center/promote_relation_managment.vue")
    }
  ]
};
