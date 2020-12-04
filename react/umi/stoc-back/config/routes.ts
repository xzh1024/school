// import { IBestAFSRoute } from '@@/plugin-layout/layout/types/interface'

// const routes: IBestAFSRoute[] = [
//   {
//     path: '/',
//     component: '@/pages/index',
//     // menu: {
//     //   name: '欢迎', // 兼容此写法
//     //   icon: 'testicon',
//     // },
//     // // 更多功能查看
//     // // https://beta-pro.ant.design/docs/advanced-menu
//     // // 不展示顶栏
//     // headerRender: false,
//     // // 不展示页脚
//     // footerRender: false,
//     // // 不展示菜单
//     // menuRender: false,
//     // // 不展示菜单顶栏
//     // menuHeaderRender: false,
//     // // 权限配置，需要与 plugin-access 插件配合使用
//     // access: 'canRead',
//     // // 隐藏子节点
//     // hideChildrenInMenu: true,
//     // // 隐藏自己和子节点
//     // hideInMenu: true,
//     // // 子项往上提，仍旧展示,
//     // flatMenu: true,
//   },
//   { path: '/home', component: '@/home/index', access: 'canRead', },
// ];

// export default routes;


const pages = [
  {
    path: 'index',
    name: 'index',
    icon: 'smile',
    component: './index',
  },
  {
    path: 'home',
    name: 'home',
    icon: 'table',
    component: './home/index',
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

