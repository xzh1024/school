// 系统管理路由
export default [
  {
    name: "交易",
    path: "platform",
    icon: "icon-img-workbench-business-white",
    icons: "icon-img-workbench-business-white",
    meta: {
      perm: "transaction"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "交易业务",
        title: "交易业务",
        isTitle: true,
        list: ["三方平台", "配修社区", "我的店铺", "加盟管理（试运行）"]
      },
      {
        path: "/PlatformList",
        name: "PlatformList",
        meta: {
          title: "三方平台",
          perm: "transaction.platforms.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/platform-list"
          )
      },
      {
        path: "/RepairCommunity",
        name: "RepairCommunity",
        meta: {
          title: "配修社区"
        },
        component: () =>
          import(/* webpackChunkName: "platform" */ "@/views/platform/Repair")
      },
      {
        path: "/RepairAuthPlatformManagement",
        name: "RepairAuthPlatformManagement",
        hidden: true,
        meta: {
          title: "配修社区-商品管理"
        },
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/RepairAuthPlatformManagement"
          )
      },
      {
        path: ":key",
        name: "PlatformManagement",
        meta: {
          title: "平台管理",
          perm: "transaction.platforms.read"
        },
        hidden: true,
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/management"
          )
      },
      {
        path: "/platformManagementQQ",
        name: "PlatformManagementQQ",
        meta: {
          title: "平台管理",
          perm: "transaction.platforms.read"
        },
        hidden: true,
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/management/qq"
          )
      },
      {
        path: "/AuthPlatform",
        name: "AuthPlatform",
        meta: {
          title: "我的店铺",
          perm: "transaction.store.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/AuthPlatform"
          )
      },
      {
        path: "/AuthPlatform/:key",
        name: "authPlatformManagement",
        meta: {
          title: "店铺配件管理",
          perm: "transaction.store.read"
        },
        hidden: true,
        component: () =>
          import(
            /* webpackChunkName: "platform" */ "@/views/platform/AuthPlatformManagement"
          )
      },
      {
        path: "/Franchiser",
        name: "Franchiser",
        meta: {
          title: "加盟管理（试运行）",
          perm: "transaction.franchise.read"
        },
        component: () =>
          import(/* webpackChunkName: "company" */ "@/views/company/franchiser")
      }
    ]
  }
];
