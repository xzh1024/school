import React from 'react';
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import Redirect from '../components/Redirect';

export default function MRouter() {
  /*
    <Routes>
      <Route path="/films" element={LazyLoad('Film')}>
        <Route index element={<Redirect to="/films/nowPlaying" />} />
        <Route path="nowPlaying" element={LazyLoad('films/NowPlaying')} />
        <Route path="comingSoon" element={LazyLoad('films/ComingSoon')} />
      </Route>
      <Route path="/cinemas" element={LazyLoad('Cinema')} />
      <Route path="/cinemas/search" element={LazyLoad('Search')} />
      <Route
        path="/center"
        element={<AuthComponent>{LazyLoad('Center')}</AuthComponent>}
      />
      <Route path="/login" element={LazyLoad('Login')} />
      <Route path="/detail/:id" element={LazyLoad('Detail')} />
      <Route path="/" element={<Navigate to="/films" />} />
      <Route path="*" element={LazyLoad('NotFound')} />
    </Routes>
  */
  const element = useRoutes([
    {
      path: '/films',
      element: LazyLoad('Film'),
      children: [
        {
          index: true,
          element: <Redirect to="/films/nowPlaying" />
        },
        {
          path: 'nowPlaying',
          element: LazyLoad('films/NowPlaying')
        },
        { path: 'comingSoon', element: LazyLoad('films/ComingSoon') }
      ]
    },
    {
      path: '/cinemas',
      element: LazyLoad('Cinema')
    },
    {
      path: '/center',
      element: <AuthComponent>{LazyLoad('Center')}</AuthComponent>
    },
    {
      path: '/login',
      element: LazyLoad('Login')
    },
    {
      path: '/detail/:id',
      element: LazyLoad('Detail')
    },
    {
      path: '/',
      element: <Navigate to="/films" />
    },
    {
      path: '*',
      element: LazyLoad('NotFound')
    }
  ]);
  return element;
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
