import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Redirect from '../components/Redirect/Redirect';
import Login from '../views/login/Login';
// import NewsSandBox from '../views/sandbox/NewsSandBox';

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <AuthComponent>{LazyLoad('sandbox/NewsSandBox')}</AuthComponent>
          }
        >
          <Route index element={<Redirect to="/home" />} />
          <Route path="home" element={LazyLoad('sandbox/home/Home')}></Route>
          <Route
            path="user-manage/list"
            element={LazyLoad('sandbox/user-manage/UserList')}
          ></Route>
          <Route
            path="right-manage/role/list"
            element={LazyLoad('sandbox/right-manage/RoleList')}
          ></Route>
          <Route
            path="right-manage/right/list"
            element={LazyLoad('sandbox/right-manage/RightList')}
          ></Route>
        </Route>
        <Route
          path="*"
          element={LazyLoad('sandbox/nopermission/Nopermission')}
        />
      </Routes>
    </HashRouter>
  );
}

// 路由拦截组件的封装
function AuthComponent({ children }) {
  return localStorage.getItem('token') ? children : <Redirect to="/login" />;
}

// 路由懒加载的封装
const LazyLoad = (path) => {
  const Comp = React.lazy(() => import(`../views/${path}`));
  return (
    <React.Suspense fallback={<div>加载中...</div>}>
      <Comp />
    </React.Suspense>
  );
};
