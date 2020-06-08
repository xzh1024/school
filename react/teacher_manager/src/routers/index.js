import React from 'react';
// 配置路由规则
import {Router, Route, Switch, Redirect} from 'dva/router';
import Home from '../components/Home'
// const Home = () => <h1>你好</h1>

const fn = function({ history, app }) {
  return (
    <Router history={history}>
      <React.Fragment>
        <Route path="/home" exact component={Home} />
      </React.Fragment>
    </Router>
  )
}

export default fn;