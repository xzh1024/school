import React from 'react';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import Nowplaying from './Nowplaying';
import Comingsoon from './Comingsoon';
import style from '../css/Film.module.css';

export default function Films() {
  return (
    <div>
      <h3>films</h3>
      <div style={{ height: '200ox', background: 'yellow' }}>大轮播</div>
      <ul>
        <li>
          <NavLink to="/films/nowplaying" activeClassName={style.active}>正在热映</NavLink>
        </li>
        <li>
          <NavLink to="/films/comingsoon" activeClassName={style.active}>即将上映</NavLink>
        </li>
      </ul>

      {/* 路由配置 嵌套路由 */}
      <Switch>
        <Route path="/films/nowplaying" component={Nowplaying}></Route>
        <Route path="/films/comingsoon" component={Comingsoon}></Route>
        <Redirect from="/films" to="/films/nowplaying" />
      </Switch>
    </div>
  );
}
