import microPath from '@/microAppsConfig';
/*
 * 完整的一个路由如下
 *  {
 *    name: '示例',                                  路由名称 页面title名称
 *    path: '/example',                             访问路径
 *    component: 'example',                         组件路径 相对于/src/pages文件夹
 *    hide: true,                                   是否在菜单中展示    true | false
 *    icon: {                                       菜单icon定义
 *      name: 'DribbbleOutlined',                   基于antd icon的name
 *      fontSize: 16,                               icon图标大小
 *      custom: React.Node                          自定义图标
 *    },
 *    meta: {                                       自定义属性对象
 *      skeletonType: 'list                         骨架屏展示的type   list | 'result' | 'descriptions'
 *    },
 *    register: true,                               是否忽略后台权限注册到路由中  true | false
 *  },
 *
 *  注意：主菜单页面是基于Routers[0]的配置   所以需要放到菜单中的展示的页面 全部写在Routers[0].routes中
 *  路由的访问路径会根据嵌套规则 自动添加 例如： A路由下有一个B子路由  即B的访问路径为：/A/B
 */

// component默认pages目录下的页面
const Routers = [
  {
    name: 'home',
    path: '/',
    component: 'layout',
    routes: [
      {
        name: '首页',
        path: '/dashboard',
        component: 'dashboard',
        icon: {
          name: 'AppstoreAddOutlined',
        },
      },
      {
        name: '发起报账申请',
        path: '/categoryMenu',
        component: 'categoryMenu',
        unique: true,
        icon: {
          name: 'SignatureOutlined',
        },
      },

      {
        name: '我的报账单',
        path: '/my-bill',
        component: 'myBill/subsidyCalendar',
        icon: {
          name: 'CreditCardOutlined',
        },
        routes: [
          {
            name: '差补日历',
            path: '/subsidyCalendar',
            component: 'myBill/subsidyCalendar',
          },
          {
            name: '我的报账单',
            path: '/bills',
            component: 'myBill/bills',
            unique: true,
            mate: {
              skeletonType: 'list',
            },
          },
          {
            name: '我的待处理',
            path: '/pendProcess',
            component: 'myBill/pendProcess',
            unique: true,
            mate: {
              skeletonType: 'list',
            },
          },
          {
            name: '我的已处理',
            path: '/processed',
            component: 'myBill/processed',
            unique: true,
            mate: {
              skeletonType: 'list',
            },
          },
        ],
      },
      {
        name: '查询统计',
        path: '/query-statistics',
        component: 'queryStatistics/comprehensiveQuery',
        icon: {
          name: 'SearchOutlined',
        },
        routes: [
          {
            name: '报账单综合查询(新)',
            path: '/comprehensive-query',
            component: 'queryStatistics/comprehensiveQuery',
          },
          {
            name: '历史单据',
            path: '/history-claim',
            component: 'historyData/historyQuery',
            unique: true,
            icon: {
              name: 'DribbbleOutlined',
            },
          },
        ],
      },
      {
        name: '会计处理',
        path: '/accounting-treatment',
        component: 'comprehensiveQuery',
        icon: {
          name: 'PullRequestOutlined',
        },
        meta: {
          skeletonType: 'list',
        },
        routes: [
          {
            name: '初审抢单记录',
            path: '/account-wrest-record',
            component: 'accountingTreatment/accountWrestRecord',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '会计分组设置',
            path: '/group-info',
            component: 'accountingTreatment/groupInfo',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '小组工作范围',
            path: '/group-work',
            component: 'accountingTreatment/groupWork',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '生成发票监控[雪花]',
            path: '/snow-beer-monitoring',
            component: 'accountingTreatment/snowBeerMonitoring',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '生成发票监控[新]',
            path: '/new-invoice-monitoring',
            component: 'accountingTreatment/newInvoiceMonitoring',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '任务池监控',
            path: '/task-pool-monitoring',
            hide: true,
            component: 'accountingTreatment/taskPoolMonitoring',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '顶岗抢单[新]',
            path: '/rush-buy-order',
            component: 'accountingTreatment/rushBuyOrder',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '派单管理',
            path: '/dispatch-management',
            component: 'accountingTreatment/dispatchManagement',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '会计工作日历',
            path: '/account-work-calendar',
            component: 'accountingTreatment/accountWorkCalendar',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '顶岗管理',
            path: '/post-management',
            component: 'accountingTreatment/postManagement',

            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '会计不在岗设置',
            path: '/account-off-set',
            component: 'accountingTreatment/accountOffSet',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '会计在岗设置',
            path: '/account-on-set',
            component: 'accountingTreatment/accountOnSet',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '个人营业管理',
            path: '/personal-business',
            component: 'accountingTreatment/personalBusiness',
            meta: {
              skeletonType: 'descriptions',
            },
          },
          {
            name: '派单(总账)管理',
            path: '/dispatch-general-ledger',
            component: 'accountingTreatment/dispatchGeneralLedger',
            meta: {
              skeletonType: 'descriptions',
            },
          },
        ],
      },
      {
        name: '电子影像',
        path: '/electronic-image',
        component: 'electronicImage/backlog',
        icon: {
          name: 'FundViewOutlined',
        },
        routes: [
          {
            name: '影像待办',
            path: '/backlog',
            unique: true,
            component: 'electronicImage/backlog',
          },
          {
            name: '已处理影像列表',
            path: '/processed',
            unique: true,
            component: 'electronicImage/processed',
          },
          {
            name: '待扫描单据列表',
            path: '/tape-scanning',
            unique: true,
            component: 'electronicImage/tapeScanning',
          },
        ],
      },
      {
        name: '付款工作台',
        path: '/paymentDesk',
        component: 'paymentDesk/capitalPool',
        routes: [
          {
            name: '资金池管理',
            path: '/capitalPool',
            component: 'paymentDesk/capitalPool',
          },
        ],
      },

      {
        name: '嵌入页面',
        path: '/iframe-page',
        component: 'otherPage/iframePage',
        hide: true,
        register: true,
      },
      {
        name: '菜单自定义',
        path: '/menu-custom',
        component: 'otherPage/menuCustom',
        hide: true,
        register: true,
      },
      {
        name: '报账单实物跟踪',
        path: '/ems-receipt',
        component: 'receipt/addressManagement',
        routes: [
          {
            name: '收单柜管理',
            path: '/address-management',
            component: 'receipt/addressManagement',
          },
          {
            name: '收单管理',
            path: '/receipt-management',
            component: 'receipt/receiptManagement',
          },
          {
            name: '实物接收',
            path: '/physical-reception',
            component: 'receipt/physicalReception',
          },
          {
            name: '我的交单',
            path: '/presentation-management',
            component: 'receipt/presentationManagement',
          },
          {
            name: '退单邮寄管理',
            path: '/return-express',
            component: 'receipt/returnExpress',
          },
          {
            name: '退单查询',
            path: '/return-express-query',
            component: 'receipt/returnExpressQuery',
          },
          {
            name: '收件地址',
            path: '/default-address',
            component: 'receipt/defaultAddress',
          },
        ],
      },
      {
        name: '吸并业务',
        path: '/ems-suction',
        component: 'otherPage/suction',
        hide: true,
        mate: {
          unique: true,
          skeletonType: 'list',
        },
        register: true,
      },
      {
        name: '吸并业务',
        path: '/purchase/ems-suction',
        component: 'otherPage/suction',
        hide: true,
        mate: {
          unique: true,
          skeletonType: 'list',
        },
        register: true,
      },
    ],
  },
  {
    name: '差补确认',
    path: '/travel-confirm',
    component: 'otherPage/travelConfirm',
    hide: true,
    register: true,
  },
  {
    name: '生成发票监控[雪花]',
    path: '/snow-beer-monitoring',
    component: 'accountingTreatment/snowBeerMonitoring',
    meta: {
      skeletonType: 'descriptions',
    },
    hide: true,
  },
  {
    name: '生成发票监控[新]',
    path: '/new-invoice-monitoring',
    component: 'accountingTreatment/newInvoiceMonitoring',
    meta: {
      skeletonType: 'descriptions',
    },
    hide: true,
  },
  {
    name: '报账单综合查询(新)',
    path: '/comprehensive-query',
    component: 'queryStatistics/comprehensiveQuery',
    hide: true,
    register: true,
  },

  {
    name: '差补日历',
    path: '/subsidyCalendar',
    component: 'myBill/subsidyCalendar',
    hide: true,
  },
  {
    name: '顶岗抢单[新]',
    path: '/rush-buy-order',
    component: 'accountingTreatment/rushBuyOrder',
    hide: true,
  },
  {
    name: '警示中心',
    path: '/warning-message',
    component: 'otherPage/warningMessage',
    hide: true,
    register: true,
  },
  {
    name: '登录',
    path: '/login',
    component: 'login',
    hide: true,
    register: true,
  },
  {
    name: '打印预览',
    path: '/electronic-image/backlog/print',
    component: 'electronicImage/components/print.jsx',
    hide: true,
    register: true,
  },

  {
    name: '付款申请详情',
    path: '/pay-apply-detail',
    component: 'otherPage/payApplyDetail',
    hide: true,
    mate: {
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '吸并业务',
    path: '/suction',
    component: 'otherPage/suction',
    hide: true,
    mate: {
      unique: true,
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '吸并业务',
    path: '/purchase/suction',
    component: 'otherPage/suction',
    hide: true,
    mate: {
      unique: true,
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '预览',
    path: '/view',
    component: 'otherPage/noticeView',
    hide: true,
    register: true,
  },
  {
    name: '报账单详情',
    path: '/claim-order-detail',
    component: 'historyData/orderDetail',
    hide: true,
    mate: {
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '报账单详情警示信息',
    path: '/claim-order-detail/warning-message',
    component: 'historyData/warningMessage',
    hide: true,
    mate: {
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '智能提单',
    path: '/ai-submit',
    component: 'ai/submit',
    hide: true,
    mate: {
      skeletonType: 'list',
    },
    register: true,
  },
  {
    name: '财务智审-驾驶员交通费',
    path: '/ai-driver-fare',
    component: 'ai/audit/driverFare',
    hide: true,
    mate: {
      skeletonType: 'list',
    },
    register: true,
  },
];

const microPaths = microPath.map(item => item.activeRule);

const getAllRoutesPath = routes => {
  let paths = [];
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    paths.push(route.path);
    if (route.children && route.children.length > 0) {
      paths = [...paths, ...getAllRoutesPath(route.children)];
    }
  }
  return paths;
};

const allPath = getAllRoutesPath(Routers);

// 不允许使用以微应用activePath开头的路由
allPath.forEach(path => {
  microPaths.forEach(item => {
    if (path.startsWith(item)) {
      throw Error(`route path conflicts with the microApp path, "${path}" conflict with "${item}"`);
    }
  });
});

const formatUniqueRoutes = () => {
  const uniqueRoutes = [];

  const getUniqueRoutes = roots => {
    for (let i = 0; i < roots.length; i++) {
      const route = roots[i];
      const { path, routes } = route;
      if (route.unique) {
        uniqueRoutes.push({
          ...route,
          path: '/unique' + path,
          hide: true,
          register: true,
        });
      }
      if (routes && routes.length > 0) {
        getUniqueRoutes(routes);
      }
    }
  };
  getUniqueRoutes(Routers);
  // console.log(uniqueRoutes, 381282);
  return [...Routers, ...uniqueRoutes];
};

export default formatUniqueRoutes();
