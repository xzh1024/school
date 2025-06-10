import useStores from '@/store';
import { getToken } from '@api/index';
import Loading from '@c/loading';
import storage from '@u/storage';
import { getParamsByUrl } from '@u/tools';
import { observer } from 'mobx-react';
import { lazy, useLayoutEffect, useState } from 'react';
import { Route, BrowserRouter as RouterDom, Routes } from 'react-router-dom';
import NotFind from '../pages/404';
import LazyComponent from './LazyImport';
import routers from './router';

// 将3级嵌套路由拿到2级 以便只用使用一个outlet
const formatRoutes = route => {
  let res = [];
  const prePath = route.path === '/' ? '' : route.path;

  const findRoutes = (routes, res, rootPath = '') => {
    routes.forEach(item => {
      const path = rootPath + item.path;
      res.push({
        ...item,
        path,
      });
      if (item.routes && item.routes.length > 0) {
        findRoutes(item.routes, res, path);
      }
    });
  };

  if (route.routes && route.routes.length > 0) {
    findRoutes(route.routes, res, prePath);
  }
  return res;
};

// 渲染路由
const getRouter = (routers, pathWithRole) => {
  const routes = routers
    .map(item => {
      const children = formatRoutes(item);
      return {
        ...item,
        routes: children,
      };
    })
    .filter(item => pathWithRole.includes(item.path) || item.register);
  //  item.register

  console.log(routes, 9991111, pathWithRole);
  return routes.map(item => {
    return (
      <Route
        path={item.path}
        key={item.path}
        element={<LazyComponent lazyChildren={lazy(() => import(`pages/${item.component}`))} route={item} />}
      >
        {item.routes
          ? item.routes.map(route => {
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    <LazyComponent lazyChildren={lazy(() => import(`pages/${route.component}`))} route={route} />
                  }
                ></Route>
              );
            })
          : null}
      </Route>
    );
  });
};

const Router = observer(() => {
  const { globalStore, configStore, layout } = useStores();
  const { menuList } = layout;
  return (
    <RouterDom basename={['uat', 'prod'].includes(process.env.REACT_APP_ENV || '') ? '/ems-web' : '/'}>
      <Routes>
        {getRouter(
          routers,
          menuList.map(item => item.newEmsPath),
        )}
        {/* <Route path="*" key="404" element={<NotFind></NotFind>}></Route> */}
      </Routes>
    </RouterDom>
  );
});

const wrapperRouter = () => {
  const { globalStore, configStore, layout } = useStores();
  const [accessToken, setAccessToken] = useState('');
  useLayoutEffect(() => {
    const path = window.location.pathname;
    const code = getParamsByUrl('code');
    const token = storage.get(process.env.REACT_APP_TOKEN_FIELD, 'sessionStorage');
    if (!token && code) {
      getTokenByLdap(code, init);
      return;
    }
    if (token) {
      setAccessToken(token);
    }

    // 排除 imgae、receipt 子应用走init拉数据拉不到
    // 排除 travel-confirm  /login 去拉数据
    if (
      !['image', 'receipt'].includes(path.split('/')[2]) &&
      !path.includes('/travel-confirm') &&
      !path.includes('/login')
    ) {
      init();
    } else {
      setAccessToken('11');
    }
  }, [globalStore.reInit]);

  const getTokenByLdap = async (code, callback) => {
    const res = await getToken({
      userName: '',
      passWord: '',
      source: 'ldap',
      ldapCode: code,
    });
    console.log(res, 3182319);
    const data = res.data;
    setAccessToken(data.access_token);
    storage.set(process.env.REACT_APP_TOKEN_FIELD, data.access_token, 'sessionStorage');
    storage.set('refreshToken', data.refresh_token, 'sessionStorage');
    callback && callback();
  };

  const init = async () => {
    layout.constRouterList = layout.getList(routers, 'routes');
    await layout.getMenu();
    await globalStore.getCurrentUserInfo();
    await globalStore.getPositionList();
  };
  // 使用accessToken变量  防止子页面useEffect 拉数据时没token
  return accessToken ? <Router /> : <Loading className="w-screen h-screen"></Loading>;
};

export default observer(wrapperRouter);
