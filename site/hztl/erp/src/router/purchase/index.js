export default [
  {
    path: "purchases",
    name: "采购管理",
    meta: {
      perm: "purchases"
    },
    icon: "icon-img-workbench-purchase-white",
    icons: "icon-img-workbench-purchase-white",
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "采购业务",
        title: "采购业务",
        isTitle: true,
        list: [
          "快速询价",
          "订货计划",
          "采购开单",
          "采购退货",
          "急件处理",
          "需求处理"
        ]
      },
      {
        path: "/PurchaseObtainPrice",
        name: "PurchaseObtainPrice",
        meta: {
          title: "快速询价",
          perm: "purchases.inquire.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/obtainPrice"
          )
      },
      {
        path: "/PurchaseList",
        name: "PurchaseList",
        meta: {
          perm: "purchases.orders",
          hasBelongs: true,
          title: "订货计划",
          tagName: "订货计划列表"
        },
        component: () =>
          import(
            /* webpackChunkName:"purchase"*/ "@/views/purchase/purchaseList/PurchaseList"
          )
      },
      {
        path: "/PurchaseBilling",
        name: "PurchaseBilling",
        hidden: true,
        meta: {
          selectedPath: "/PurchaseList",
          perm: "purchases.orders",
          hasBelongs: true,
          title: "订货计划开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseList/PurchaseBilling"
          )
      },
      {
        path: "/PurchaseReceiveList",
        name: "PurchaseReceiveList",
        meta: {
          perm: "purchases.arrivals",
          hasBelongs: true,
          title: "采购开单",
          tagName: "采购列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseReceive/PurchaseReceiveList"
          )
      },
      {
        path: "/PurchaseReceiveBilling",
        name: "PurchaseReceiveBilling",
        hidden: true,
        meta: {
          selectedPath: "/PurchaseReceive",
          title: "采购开单",
          perm: "purchases.arrivals",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseReceive/PurchaseReceiveBilling"
          )
      },
      {
        path: "/PurchaseReturnList",
        name: "PurchaseReturnList",
        meta: {
          perm: "purchases.returns",
          hasBelongs: true,
          title: "采购退货",
          tagName: "采购退货列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseReturn/PurchaseReturnList"
          )
      },
      {
        path: "/PurchaseReturnBilling",
        name: "PurchaseReturnBilling",
        hidden: true,
        meta: {
          selectedPath: "/PurchaseReturn",
          title: "采购退货开单",
          perm: "purchases.returns",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseReturn/PurchaseReturnBilling"
          )
      },
      {
        path: "/PurchaseDispatch",
        name: "PurchaseDispatch",
        meta: {
          perm: "purchases.urgents",
          tags: ["confirmAndCreate", "settle"],
          hasBelongs: true,
          title: "急件处理"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseDispatch/Index"
          )
      },
      {
        path: "/PurchaseDemands",
        name: "PurchaseDemands",
        meta: {
          title: "需求处理",
          perm: "purchases.demands",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchaseDemands/Index"
          )
      },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["采购查询"]
      },
      {
        path: "/PurchaseReturnSearch",
        name: "PurchaseReturnSearch",
        meta: {
          perm: "purchases.purchasesSearch",
          hasBelongs: true,
          title: "采购查询"
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchase-return-search"
          )
      },
      {
        path: "",
        name: "价格业务",
        title: "价格业务",
        isTitle: true,
        list: ["售价制定"]
      },
      {
        path: "/PurchasePrice",
        name: "PurchasePrice",
        meta: {
          title: "售价制定",
          perm: "purchases.salePriceSettings",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "purchase" */ "@/views/purchase/purchasePrice/Index"
          )
      }
    ]
  }
];
