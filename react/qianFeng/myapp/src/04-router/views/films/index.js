import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Nowplaying from './Nowplaying';
import Comingsoon from './Comingsoon';

export default function Films() {
  return (
    <div>
      <h3>films</h3>
      <div style={{ height: '200ox', background: 'yellow' }}>大轮播</div>
      <div>导航栏</div>

      {/* 路由配置 嵌套路由 */}
      <Switch>
        <Route path="/films/nowplaying" component={Nowplaying}></Route>
        <Route path="/films/comingsoon" component={Comingsoon}></Route>
        <Redirect from="/films" to="/films/nowplaying" />
      </Switch>
    </div>
  );
}
