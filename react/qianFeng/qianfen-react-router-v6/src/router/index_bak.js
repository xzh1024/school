import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Redirect from '../components/Redirect';
// import NotFound from '../views/NotFound';
// import Film from '../views/Film';
// import Cinema from '../views/Cinema';
// import Center from '../views/Center';
// import Search from '../views/Search';
// import NowPlaying from '../views/films/NowPlaying';
// import ComingSoon from '../views/films/ComingSoon';
// import Detail from '../views/Detail';
// import Login from '../views/Login';

export default function MRouter() {
  return (
    <Routes>
      {/* <Route path='/' element={<Film />} /> */}
      {/* <Route index element={<Film />} /> */}
      <Route path="/films" element={LazyLoad('Film')}>
        {/* index用于嵌套路由，仅匹配父路径时，设置渲染的组件 */}
        {/* <Route index element={<NowPlaying />} /> */}
        <Route index element={<Redirect to="/films/nowPlaying" />} />
        {/* 绝对路径 */}
        {/* <Route path="/films/nowPlaying" element={<NowPlaying />} /> */}
        {/* <Route path="/films/comingSoon" element={<ComingSoon />} /> */}
        {/* 相对路径 */}
        {/* <Route path="nowPlaying" element={<NowPlaying />} /> */}
        {/* <Route path="comingSoon" element={<ComingSoon />} /> */}
        <Route path="nowPlaying" element={LazyLoad('films/NowPlaying')} />
        <Route path="comingSoon" element={LazyLoad('films/ComingSoon')} />
      </Route>
      {/* <Route path="/cinemas" element={<Cinema />} /> */}
      <Route path="/cinemas" element={LazyLoad('Cinema')} />
      <Route path="/cinemas/search" element={LazyLoad('Search')} />
      {/* 路由拦截 */}
      {/* 
        <Route
          path="/center"
          element={isAuth() ? <Center /> : <Redirect to="/login" />}
        />
      */}
      <Route
        path="/center"
        element={<AuthComponent>{LazyLoad('Center')}</AuthComponent>}
      />
      <Route path="/login" element={LazyLoad('Login')} />
      {/* 动态路由/detail/***** */}
      <Route path="/detail/:id" element={LazyLoad('Detail')} />
      {/* 两种实现重定向的方法 */}
      <Route path="/" element={<Navigate to="/films" />} />
      {/* <Route path="/" element={<Redirect to="/films" />} />*/}
      <Route path="*" element={LazyLoad('NotFound')} />
    </Routes>
  );
}

// function isAuth() {
//   return localStorage.getItem('token');
// }

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
