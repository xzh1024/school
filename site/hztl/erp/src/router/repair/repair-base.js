/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore

module.exports = [
  {
    path: "",
    name: "维修资料",
    title: "维修资料",
    isTitle: true,
    list: [
      "客户车辆档案",
      "车辆检测项目管理",
      "维修服务项目",
      "维修服务套餐",
      "工位设置",
      "外部设备管理"
    ]
  },
  {
    path: "/CarFiles",
    name: "CarFiles",
    meta: {
      title: "客户车辆档案",
      perm: "basics.vehicle"
    },
    component: () =>
      import(/* webpackChunkName: "repair" */ "@/views/repair/car-files")
  },
  {
    path: "/detectItemManage",
    name: "detectItemManage",
    meta: {
      title: "车辆检测项目管理",
      perm: "basics.vehicleCheck",
      tags: ["item", "template"],
      hasBelongs: true
    },
    component: () =>
      import(
        /* webpackChunkName: "repair" */ "@/views/repair/detect-item-manage"
      )
  },
  {
    path: "/FixService",
    name: "FixService",
    meta: {
      title: "维修服务项目",
      perm: "basics.item.read"
    },
    component: () =>
      import(/* webpackChunkName: "repair" */ "@/views/repair/fix-service")
  },
  {
    path: "/FixSetMenu",
    name: "FixSetMenu",
    meta: {
      title: "维修服务套餐",
      perm: "basics.set.read"
    },
    component: () =>
      import(/* webpackChunkName: "repair" */ "@/views/repair/fix-set-menu")
  },
  {
    path: "/Station",
    name: "Station",
    meta: {
      title: "工位设置",
      perm: "basics.station"
    },
    component: () =>
      import(/* webpackChunkName: "repair" */ "@/views/repair/station-set")
  },
  {
    path: "/Equipment",
    name: "Equipment",
    meta: {
      title: "外部设备管理",
      perm: "basics.device",
      hasBelongs: true
    },
    component: () =>
      import(/* webpackChunkName: "repair" */ "@/views/repair/equipment-manage")
  }
];
