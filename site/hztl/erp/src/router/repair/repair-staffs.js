/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore

const routers = [
  {
    path: "/FixClassGroup",
    name: "FixClassGroup",
    meta: {
      title: "维修技师班组设置",
      perm: "personnel.technicianGroup",
      hasBelongs: true
    },
    component: () =>
      import(/* webpackChunkName: "base" */ "@/views/repair/fix-class-group")
  },
  {
    path: "/Performance",
    name: "Performance",
    meta: {
      title: "维修人员绩效设置",
      tagName: "维修人员绩效设置",
      perm: "personnel.achievementSetting",
      hasBelongs: true
    },
    component: () =>
      import(/* webpackChunkName: "company" */ "@/views/repair/performance")
  }
];

module.exports = function setupStaffs(staffsRouters) {
  for (const i in routers) {
    staffsRouters[0].list.push(routers[i].meta.title);
    staffsRouters.push(routers[i]);
  }
};
