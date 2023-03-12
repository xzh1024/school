import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/guanli/Desktop/work/code/erp-partners/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/electricity',
    exact: true,
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts" */ '../../layouts'),
        })
      : require('../../layouts').default,
    routes: [
      {
        path: '/electricity',
        title: '平台目录',
        name: '平台目录',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Platform__models__platformList.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/Platform/models/platformList.ts').then(
                  m => {
                    return { namespace: 'platformList', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Platform__PlatformList" */ '../Platform/PlatformList'),
            })
          : require('../Platform/PlatformList').default,
        exact: true,
      },
      {
        path: '/part',
        title: '配件上下架',
        name: '配件上下架',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Part__models__baseData.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/Part/models/baseData.ts').then(
                  m => {
                    return { namespace: 'baseData', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__Part__models__part.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/Part/models/part.ts').then(
                  m => {
                    return { namespace: 'part', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Part__PartList" */ '../Part/PartList'),
            })
          : require('../Part/PartList').default,
        exact: true,
      },
      {
        path: '/platcustomer',
        title: '平台客户',
        name: '平台客户',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__platcus__models__part.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/platcus/models/part.ts').then(
                  m => {
                    return { namespace: 'part', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__platcus__platCustomerList" */ '../platcus/platCustomerList'),
            })
          : require('../platcus/platCustomerList').default,
        exact: true,
      },
      {
        path: '/penguinAutoParts',
        title: '企鹅汽配',
        name: '企鹅汽配',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts" */ '../../layouts'),
            })
          : require('../../layouts').default,
        hide: true,
        routes: [
          {
            path: '/penguinAutoParts/authManage',
            title: '授权管理',
            name: '授权管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__PenguinAutoParts__AuthManage__models__baseData.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/PenguinAutoParts/AuthManage/models/baseData.ts').then(
                      m => {
                        return { namespace: 'baseData', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__PenguinAutoParts__AuthManage__models__staff.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/PenguinAutoParts/AuthManage/models/staff.ts').then(
                      m => {
                        return { namespace: 'staff', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts" */ '../PenguinAutoParts/AuthManage'),
                })
              : require('../PenguinAutoParts/AuthManage').default,
            exact: true,
          },
          {
            path: '/penguinAutoParts/parameterSetting',
            title: '参数设置',
            name: '参数设置',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__PenguinAutoParts__ParameterSetting__models__parameterSetting.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/PenguinAutoParts/ParameterSetting/models/parameterSetting.ts').then(
                      m => {
                        return { namespace: 'parameterSetting', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts" */ '../PenguinAutoParts/ParameterSetting'),
                })
              : require('../PenguinAutoParts/ParameterSetting').default,
            exact: true,
          },
          {
            path: '/penguinAutoParts/CustomerManage',
            title: '客户关系管理',
            name: '客户关系管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__PenguinAutoParts__CustomerManage__models__baseData.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/PenguinAutoParts/CustomerManage/models/baseData.ts').then(
                      m => {
                        return { namespace: 'baseData', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__PenguinAutoParts__CustomerManage__models__customer.ts' */ '/Users/guanli/Desktop/work/code/erp-partners/src/pages/PenguinAutoParts/CustomerManage/models/customer.ts').then(
                      m => {
                        return { namespace: 'customer', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "layouts" */ '../PenguinAutoParts/CustomerManage'),
                })
              : require('../PenguinAutoParts/CustomerManage').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/guanli/Desktop/work/code/erp-partners/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/guanli/Desktop/work/code/erp-partners/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/guanli/Desktop/work/code/erp-partners/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
