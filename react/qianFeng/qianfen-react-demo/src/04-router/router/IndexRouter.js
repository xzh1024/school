import React from 'react'
import {
  // HashRouter as Router, // 在路径中包含了#，相当于HTML的锚点定位。（# 符号的英文叫hash，所以叫HashRouter）
  BrowserRouter as Router, // 使用的是HTML5的新特性History，没有HashRouter(锚点定位)那样通用，低版本浏览器可能不支持。
  Switch,
  Redirect,
  Route,
  Suspense, // 是一个React组件，允许你定义一个加载指示器（如加载中的提示），当它在树中的子组件开始加载时显示。这对于动态导入的组件特别有用
  lazy // 允许你定义一个动态加载的组件。你需要提供一个函数，该函数必须调用import()方法。import()返回一个Promise，该Promise解决为模块的默认导出。
} from 'react-router-dom' // 版本v5
import Films from '../views/films'
import Cinemas from '../views/Cinemas'
import Center from '../views/Center'
import NotFound from '../views/NotFound'
import Detail from '../views/films/detail'
import Login from '../views/Login'
// 使用 React.lazy 按需加载页面组件
const User = lazy(() => import('../views/User'))

export default function IndexRouter(props) {
  function isAuth() {
    return localStorage.getItem('token')
  }
  const withLoadingComponent = (comp) => (
    <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>
  )
  return (
    <Router>
      {props.children}
      <Switch>
        <Route path="/films" component={Films} />
        <Route path="/films" component={import('../views/films')} />
        <Route path="/cinemas" component={Cinemas} />
        {/* <Route path="/center" component={Center} /> */}
        <Route
          path="/center"
          render={(props) => {
            console.log(props)
            return isAuth() ? (
              // <Center {...props} />
              <Center />
            ) : (
              <Redirect to="/login"></Redirect>
            )
          }}
        />
        <Route path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail} />
        {/* <Route path="/detail" component={Detail} /> */}
        <Route path="/user" component={withLoadingComponent(<User />)} />
        <Redirect exact from="/" to="/films" />
        <Route component={NotFound} />
        {/* <Route
          exact
          path="/"
          render={() => <Redirect to="/films"></Redirect>}
        ></Route>
        <Redirect to="/" /> */}
      </Switch>
    </Router>
  )
}
