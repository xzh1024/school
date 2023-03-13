/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore

module.exports = [
  {
    path: "repair",
    name: "维修",
    meta: {
      perm: "repairs"
    },
    icon: "icon-img-repaire-white",
    icons: "icon-img-repaire-white",
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "维修业务",
        title: "维修业务",
        isTitle: true,
        list: [
          "客户预约",
          "在厂工单",
          "库房领料",
          "保险理赔申请",
          "洗车",
          "客户回访",
          "客情提醒"
        ]
      },
      {
        path: "/customersBooking",
        name: "customersBooking",
        meta: {
          perm: "repairs.booking",
          tags: ["bill", "setting"],
          hasBelongs: true,
          title: "客户预约"
        },
        component: () =>
          import(
            /* webpackChunkName: "repair" */ "@/views/repair/customersBooking"
          )
      },
      {
        path: "/WorkOrder",
        name: "WorkOrder",
        meta: {
          perm: "repairs.bill",
          title: "在厂工单",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "repair" */ "@/views/repair/workOrder")
      },
      {
        path: "/WarehousePicking",
        name: "WarehousePicking",
        meta: {
          perm: "repairs.billPick",
          title: "库房领料",
          hasBelongs: true
        },
        component: () =>
          import(
            /* webpackChunkName: "repair" */ "@/views/repair/warehousePicking"
          )
      },
      {
        path: "/Insurance",
        name: "Insurance",
        meta: {
          perm: "repairs.insurance",
          title: "保险理赔申请",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "repair" */ "@/views/repair/insurance")
      },
      {
        path: "/washCar",
        name: "washCar",
        meta: {
          perm: "repairs.washing",
          tags: ["bill", "setting"],
          hasBelongs: true,
          title: "洗车"
        },
        component: () =>
          import(/* webpackChunkName: "repair" */ "@/views/repair/washCar")
      },
      {
        path: "/customersReturnVisit",
        name: "customersReturnVisit",
        meta: {
          perm: "repairs.review",
          tags: ["bill", "setting"],
          hasBelongs: true,
          title: "客户回访"
        },
        component: () =>
          import(
            /* webpackChunkName: "repair" */ "@/views/repair/customersReturnVisit"
          )
      },
      {
        path: "/guestRemind",
        name: "guestRemind",
        meta: {
          perm: "repairs.remind",
          ags: ["maintain", "renewalInsurance", "annualReview", "setting"],
          hasBelongs: true,
          title: "客情提醒"
        },
        component: () =>
          import(/* webpackChunkName: "repair" */ "@/views/repair/guestRemind")
      },
      {
        path: "",
        name: "查询业务",
        title: "查询业务",
        isTitle: true,
        list: ["维修综合查询", "维修人员绩效统计"]
      },
      {
        path: "/maintenanceEnquiry",
        name: "maintenanceEnquiry",
        meta: {
          perm: "repairs.comprehensive",
          tags: ["bill", "insurance", "checkReport"],
          hasBelongs: true,
          title: "维修综合查询"
        },
        component: () =>
          import(
            /* webpackChunkName: "repair" */ "@/views/repair/maintenanceEnquiry"
          )
      },
      {
        path: "/performanceStatistics",
        name: "performanceStatistics",
        meta: {
          perm: "repairs.achievementStatistics",
          tags: ["reception", "technician", "washer"],
          hasBelongs: true,
          title: "维修人员绩效统计"
        },
        component: () =>
          import(
            /* webpackChunkName: "repair" */ "@/views/repair/performanceStatistics"
          )
      }
    ]
  }
];
