export default [
  {
    path: "transfer",
    name: "调拨",
    meta: {
      perm: "allocation"
    },
    icon: "menu-transfer-icon",
    icons: "menu-transfer-icon",
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "调拨业务",
        title: "调拨业务",
        isTitle: true,
        list: [
          "调拨申请",
          "调拨入库",
          "调拨出库",
          "调拨入库退货",
          "调拨出库退货"
        ]
      },
      {
        path: "applyList",
        name: "transferApplyList",
        meta: {
          perm: "allocation.apply",
          tags: ["in", "out"],
          hasBelongs: true,
          title: "调拨申请",
          tagName: "调拨申请单列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/apply/ApplyList"
          )
      },
      {
        path: "applyDetail",
        name: "transferApplyDatail",
        hidden: true,
        meta: {
          selectedPath: "/transfer/applyList",
          tags: ["in", "out"],
          perm: "allocation.apply",
          hasBelongs: true,
          title: "调拨申请开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/apply/ApplyDetail"
          )
      },
      {
        path: "applyDetailAudit",
        name: "transferApplyDatailAudit",
        hidden: true,
        meta: {
          selectedPath: "/transfer/applyList",
          tags: ["in", "out"],
          perm: "allocation.apply",
          hasBelongs: true,
          title: "调拨申请审核"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/apply/ApplyDetail/Audit"
          )
      },
      {
        path: "storageList",
        name: "transferStorageList",
        meta: {
          perm: "allocation.in",
          hasBelongs: true,
          title: "调拨入库",
          tagName: "调拨入库列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/storage/StorageList"
          )
      },
      {
        path: "storageDetail",
        name: "transferStorageDatail",
        hidden: true,
        meta: {
          selectedPath: "/transfer/storageList",
          perm: "allocation.in",
          hasBelongs: true,
          title: "调拨入库开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/storage/StorageDetail"
          )
      },
      {
        path: "outList",
        name: "transferOutList",
        meta: {
          perm: "allocation.out",
          hasBelongs: true,
          title: "调拨出库",
          tagName: "调拨出库单列表"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/transferOut/OutList"
          )
      },
      {
        path: "outDetail",
        name: "transferOutDetail",
        hidden: true,
        meta: {
          selectedPath: "/transfer/outList",
          perm: "allocation.out",
          hasBelongs: true,
          title: "调拨出库开单"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/transferOut/OutDetail"
          )
      },
      {
        path: "stockinReturnList",
        name: "transferStockinReturnList",
        meta: {
          perm: "allocation.inReturn",
          hasBelongs: true,
          title: "调拨入库退货"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/stockinReturn/StockinReturnList"
          )
      },
      {
        path: "stockinReturnDetail",
        name: "transferStockinReturnDetail",
        hidden: true,
        meta: {
          selectedPath: "/transfer/stockinReturnList",
          perm: "allocation.inReturn",
          hasBelongs: true,
          title: "调拨入库退货单"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/stockinReturn/StockinReturnDetail"
          )
      },
      {
        path: "stockoutReturnList",
        name: "transferStockoutReturnList",
        meta: {
          perm: "allocation.outReturn",
          hasBelongs: true,
          title: "调拨出库退货"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/stockoutReturn/StockoutReturnList"
          )
      },
      {
        path: "stockoutReturnDetail",
        name: "transferStockoutReturnDetail",
        hidden: true,
        meta: {
          selectedPath: "/transfer/stockoutReturnList",
          perm: "allocation.outReturn",
          hasBelongs: true,
          title: "调拨出库退货单"
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/stockoutReturn/StockoutReturnDetail"
          )
      },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["调拨权限分配"]
      },
      {
        path: "warehousePerm",
        name: "warehousePerm",
        meta: {
          perm: "allocation.storehouse",
          title: "调拨权限分配"
          //hasBelongs: true,
          //tags: ["companyTransfer", "crossCompanySale"]
        },
        component: () =>
          import(
            /* webpackChunkName: "transfer" */ "@/views/transfer/warehousePerm"
          )
      }
    ]
  }
];
