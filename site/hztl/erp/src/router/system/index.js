// 系统管理路由
export default [
  {
    path: "main",
    name: "main-next",
    meta: {
      title: ""
    },
    hidden: true,
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "/BaseIndex", // 路径名必须且唯一
        name: "dashboard", // 路径名称必须且唯一
        // 非必须
        meta: {
          title: "工作台"
        },
        component: () =>
          import(/* webpackChunkName: "system" */ "@/views/system/base-index")
      }
    ]
  },
  {
    name: "系统管理",
    path: "",
    icon: "icon-img-workbench-system-settings-white",
    icons: "icon-img-workbench-system-settings-white",
    meta: {
      perm: "system"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "系统设置",
        title: "系统设置",
        isTitle: true,
        list: [
          "系统参数设置",
          "角色管理",
          "登录策略设置",
          "在线员工管理",
          "数据初始化"
        ]
      },
      {
        path: "/ParamsSetting",
        name: "ParamsSetting",
        meta: {
          title: "系统参数设置",
          perm: "system.params.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "system" */ "@/views/system/params-setting"
          )
      },
      {
        path: "/Character",
        name: "Character",
        meta: {
          title: "角色管理",
          perm: "system.roles.read"
        },
        component: () =>
          import(/* webpackChunkName: "system" */ "@/views/system/character")
      },
      {
        path: "/LoginLimit",
        name: "LoginLimit",
        meta: {
          title: "登录策略设置",
          perm: "system.loginStrategies.read"
        },
        component: () =>
          import(/* webpackChunkName: "system" */ "@/views/system/login-limit")
      },
      {
        path: "/OnlineStaffManagement",
        name: "OnlineStaffManagement",
        meta: {
          title: "在线员工管理",
          perm: "system.onlineStaff"
        },
        component: () =>
          import(
            /* webpackChunkName: "system" */ "@/views/system/online-staff-management"
          )
      },
      {
        path: "/ResetData",
        name: "ResetData",
        meta: {
          title: "数据初始化",
          perm: "system.dataInit"
        },
        component: () =>
          import(/* webpackChunkName: "main" */ "@/views/system/resetData")
      }
    ]
  }
];
