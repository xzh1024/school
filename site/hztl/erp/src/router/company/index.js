import { envConfig } from "envConfigPath";

const staffRouters = [
  {
    path: "",
    name: "员工管理",
    title: "员工管理",
    isTitle: true,
    list: ["员工管理"]
  },
  {
    path: "/Staffs",
    name: "Staffs",
    meta: {
      title: "员工管理",
      tagName: "员工管理",
      perm: "personnel.staffs",
      hasBelongs: true
    },
    component: () =>
      import(/* webpackChunkName: "company" */ "@/views/company/staffs")
  }
];

if (envConfig.routersOfYX.setupStaffs) {
  envConfig.routersOfYX.setupStaffs(staffRouters);
}

// 公司管理路由
export default [
  {
    path: "personnel",
    name: "人事管理",
    icon: "icon-img-workbench-personnel-management-white",
    icons: "icon-img-workbench-personnel-management-white",
    meta: {
      perm: "personnel"
    },
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "",
        name: "公司管理",
        title: "公司管理",
        isTitle: true,
        list: ["公司资料", "分公司列表", "组织架构"]
      },
      {
        path: "/CompanyInfo",
        name: "CompanyInfo",
        meta: {
          title: "公司资料",
          perm: "personnel.company.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "company" */ "@/views/company/company-info"
          )
      },
      {
        path: "/BranchCompanys",
        name: "BranchCompanys",
        meta: {
          title: "分公司列表",
          perm: "personnel.companyList.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "company" */ "@/views/company/branch-companys"
          )
      },
      {
        path: "/Teamer",
        name: "Teamer",
        meta: {
          title: "组织架构",
          perm: "personnel.departments.read"
        },
        component: () =>
          import(
            /* webpackChunkName: "company" */ "@/views/company/departments"
          )
      },
      // {
      //   path: "/TeamerOld",
      //   name: "TeamerOld",
      //   meta: {
      //     title: "组织架构老版",
      //     perm: "personnel.departments",
      //     hasBelongs: true
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "company" */ "@/views/company/departmentsOld"
      //     )
      // },
      ...staffRouters
    ]
  }
];
