import { envConfig } from "envConfigPath";

export default [
  {
    name: "Basics-next",
    path: "/basics",
    icon: "icon-img-workbench-base-white",
    icons: "icon-img-workbench-base-white",
    redirect: "/basics/definition",
    meta: {
      title: "基础数据",
      perm: "basics"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "基础资料",
        title: "基础资料",
        isTitle: true,
        list: ["基本字典", "配件资料", "配件互换组", "打印模版", "期初数据导入"]
      },
      {
        path: "/dictionary",
        name: "dictionary",
        meta: {
          title: "基本字典",
          perm: "basics.dicts.read"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/dictionary")
      },
      {
        path: "/Accessories",
        name: "Accessories",
        meta: {
          title: "配件资料",
          perm: "basics.parts.read"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/accessories")
      },
      {
        path: "/PartSwapGroup",
        name: "PartSwapGroup",
        meta: {
          title: "配件互换组",
          perm: "basics.replacements.read"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/part-swap-group")
      },
      {
        path: "/InvoiceEdit",
        name: "InvoiceEdit",
        meta: {
          title: "打印模版",
          perm: "basics.billPrintTemplate.read"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/print/edit-invoice")
      },
      {
        path: "/DataImport",
        name: "DataImport",
        meta: {
          title: "期初数据导入",
          perm: "basics.initialDataImport"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/data-import")
      },
      {
        path: "",
        name: "往来资料",
        title: "往来资料",
        isTitle: true,
        list: ["往来单位", "供应商配件管理"]
      },
      {
        path: "/Communion",
        name: "Communion",
        meta: {
          title: "往来单位",
          perm: "basics.cooperators",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/communion")
      },
      {
        path: "/SupplierPart",
        name: "supplierPart",
        meta: {
          title: "供应商配件管理",
          perm: "basics.supplierParts",
          hasBelongs: true
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "@/views/base/SupplierPart")
      },
      ...envConfig.routersOfYX.base
    ]
  }
];
