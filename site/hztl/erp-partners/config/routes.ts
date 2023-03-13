import { IRoute } from "umi-types";

const routes: IRoute[] = [
  {
    path: "/",
    component: "../layouts",
    routes: [
      { path: "/", redirect: "electricity" },
      {
        path: "electricity",
        // icon: "setting",
        title: "平台目录",
        name: "平台目录",
        component: "./Platform/PlatformList",
      },
      {
        path: "part",
        // icon: "setting",
        title: "配件上下架",
        name: "配件上下架",
        component: "./Part/PartList",
      },
      {
        path: "platcustomer",
        title: "平台客户",
        name: "平台客户",
        component: "./platcus/platCustomerList",
      },
      {
        path: "penguinAutoParts",
        title: "企鹅汽配",
        name: "企鹅汽配",
        component: "../layouts",
        hide: true,
        routes: [
          {
            path: "authManage",
            title: "授权管理",
            name: "授权管理",
            component: "./PenguinAutoParts/AuthManage",
          },
          {
            path: "parameterSetting",
            title: "参数设置",
            name: "参数设置",
            component: "./PenguinAutoParts/ParameterSetting",
          },
          {
            path: "CustomerManage",
            title: "客户关系管理",
            name: "客户关系管理",
            component: "./PenguinAutoParts/CustomerManage",
          }
        ]
      },
      // {
      //   path: "platformManage",
      //   title: "管理页面",
      //   name: "管理页面",
      //   component: "./PlatformManage/PartList",
      // },
      {
        component: "404",
      },
    ],
  },
];

export default routes;
