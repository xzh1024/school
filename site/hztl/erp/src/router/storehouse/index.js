// 库房管理路由
export default [
  {
    path: "storage",
    name: "仓储管理",
    icon: "icon-img-workbench-store-white",
    icons: "icon-img-workbench-store-white",
    meta: {
      perm: "storage"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "仓储业务",
        title: "仓储业务",
        isTitle: true,
        list: ["出入库登记", "配件盘点", "内部移仓", "收发货登记"]
      },
      {
        path: "/BillAssignments",
        name: "BillAssignments",
        meta: {
          title: "出入库登记",
          tagName: "出入库登记",
          perm: "storage.billAssignments"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/billAssignments/billAssignments"
          )
      },
      {
        path: "/StocktakingList",
        name: "StocktakingList",
        meta: {
          title: "配件盘点",
          tagName: "配件盘点",
          perm: "storage.partStocktaking.stocktaking.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/stocktaking/StocktakingList"
          )
      },
      {
        path: "/StocktakingBill",
        name: "StocktakingBill",
        hidden: true,
        meta: {
          title: "盘点单开单",
          tagName: "盘点单开单",
          selectedPath: "/StocktakingList",
          perm: "storage.partStocktaking.stocktaking.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/stocktaking/StocktakingBill"
          )
      },
      {
        path: "/StockMovingLists",
        name: "StockMovingLists",
        meta: {
          perm: "storage.stockmoving.read",
          title: "内部移仓",
          tagName: "内部移仓"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/stockmoving/StockMovingLists"
          )
      },
      {
        path: "/StockMovingBill",
        name: "StockMovingBill",
        hidden: true,
        meta: {
          selectedPath: "/StockMovingLists",
          perm: "storage.stockmoving.read",
          title: "内部移仓开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/stockmoving/StockMovingBill"
          )
      },
      {
        path: "/LogisticsRegister",
        name: "LogisticsRegister",
        meta: {
          title: "收发货登记",
          perm: "storage.logisticsRegistration"
        },
        component: () =>
          import(
            /* webpackChunkName: "store" */ "@/views/store/logistics-register"
          )
      },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["库存查询"]
      },
      {
        path: "/StocksSearch",
        name: "StocksSearch",
        meta: {
          title: "库存查询",
          perm: "storage.stockSearch.read"
        },
        component: () =>
          import(/* webpackChunkName: "store" */ "@/views/store/stocks-search")
      },
      {
        path: "",
        name: "仓储设置",
        title: "仓储设置",
        isTitle: true,
        list: ["仓库设置", "仓库权限分配"]
      },
      {
        path: "/StoreSettings",
        name: "StoreSettings",
        meta: {
          title: "仓库设置",
          perm: "storage.basic"
        },
        component: () =>
          import(/* webpackChunkName: "store" */ "@/views/store/storeSettings")
      },
      {
        path: "/StorePerms",
        name: "StorePerms",
        meta: {
          title: "仓库权限分配",
          perm: "storage.manager",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "store" */ "@/views/store/StorePerms")
      }
    ]
  }
];
