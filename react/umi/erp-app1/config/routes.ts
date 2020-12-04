const pages = [
  {
    path: 'welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '列表',
    icon: 'table',
    path: 'list',
    component: './TableBasic',
  },
];

export default [
  {
    path: '/',
    component: '../layouts/LangLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
          // 外部使用
          {
            path: '/app1',
            component: '../layouts/PositionLayout',
            routes: [...pages],
          },
          // 内部调试
          {
            path: '/main',
            component: '../layouts/BasicLayout',
            routes: [...pages],
          },
        ],
      },
    ],
  },
];
