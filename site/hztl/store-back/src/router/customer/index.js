export default {
  path: "/customer",
  name: "客户",
  iCons: "icon-client-menu",
  component: () => import("@/views/ManageCenter"),
  redirect: "/customer/customerQuery",
  children: [
    {
      path: "/customer/auditedCustomer",
      name: "待审核客户",
      meta: {
        keepAlive: false
      },
      component: () => import("@/views/customer/auditedCustomer/auditedCustomer.vue")
    },
    {
      path: "/customer/customerQuery",
      name: "客户查询",
      meta: {
        keepAlive: false,
        level: 2
      },
      component: { render(h) { return h('router-view') } },
      redirect: "/customer/customerQuery/list",
      children: [
        {
          path: "/customer/customerQuery/list",
          name: "客户列表",
          component: () => import("@/views/customer/customerQuery/customerQuery.vue"),
        },
        {
          path: "/customer/customerQuery/pollablePartsSetting",
          name: "查件设置",
          component: () => import("@/views/customer/pollablePartsSetting/pollablePartsSetting.vue"),
        },
        {
          path: "/customer/customerQuery/customerInfo",
          name: "客户资料",
          component: () => import("@/views/customer/customerInfo/customerInfo.vue")
        },
      ]
    },
    {
      path: "/customer/carQuery",
      name: "车辆查询",
      isHide: true, //隐藏不显示
      component: () => import("@/views/customer/carQuery.vue")
    },
    {
      path: "/customer/labelManage",
      name: "标签管理",
      component: () => import("@/views/customer/labelManage/labelManage.vue")
    },
    {
      path: "/customer/vipGrade",
      name: "会员等级",
      component: () => import("@/views/customer/vipGrade/vipGrade.vue")
    },
    {
      path: "/customer/vipCard",
      name: "会员卡",
      component: { render(h) { return h('router-view') } },
      meta: {
        level: 2
      },
      redirect: "/customer/vipCard/list",
      children: [
        {
          path: "/customer/vipCard/list",
          name: "会员列表",
          component: () => import("@/views/customer/vipCard/index.vue")
        },
        {
          path: "/customer/vipCard/add",
          name: "新建会员卡",
          isHide: true,
          component: () => import("@/views/customer/vipCard/vipCardEdit/add.vue")
        }, {
          path: "/customer/vipCard/edit",
          name: "编辑会员卡",
          isHide: true,
          component: () => import("@/views/customer/vipCard/vipCardEdit/edit.vue")
        }
      ]
    }
  ]
};
