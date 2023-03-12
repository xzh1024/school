export default [
  {
    path: "officeAutomation",
    name: "OA",
    hidden: true,
    icon: "icon-img-workbench-oa-white",
    icons: "icon-img-workbench-oa-white",
    component: () => import(/* webpackChunkName: "main" */ "@/views/MainIndex"),
    children: [
      {
        path: "/officeAutomationApproval",
        hidden: true,
        name: "OfficeAutomationApproval",
        meta: {
          perm: "oaApproval",
          title: "OA审批"
        },
        component: () =>
          import(
            /* webpackChunkName: "officeAutomation" */ "@/views/officeAutomation/officeAutomationApproval"
          )
      }
    ]
  }
];
