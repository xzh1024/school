export default {
  path: "/trading",
  name: "交易",
  iCons: "icon-deal-menu",
  redirect: "/trading/bidManage",
  component: () => import("@/views/ManageCenter"),
  children: [
    {
      path: "/trading/customerOrderManage",
      name: "客户订单管理",
      isHide: true,
      component: () => import("@/views/trading/customerOrderManage.vue")
    },
    {
      path: "/trading/afterSalesManage",
      name: "售后管理",
      isHide: true,
      component: () => import("@/views/trading/afterSalesManage.vue")
    },
    {
      path: "/trading/bookingManage",
      name: "预约管理",
      isHide: true,
      component: () => import("@/views/trading/bookingManage.vue")
    },
    {
      path: "/trading/bidManage",
      name: "报价管理",
      component: () => import("@/views/trading/bidManage/bidManage.vue")
    },
    {
      path: "/trading/payNoteManage",
      name: "支付单管理",
      component: () => import("@/views/trading/payNoteManage/payNoteManage.vue")
    }
  ]
};
