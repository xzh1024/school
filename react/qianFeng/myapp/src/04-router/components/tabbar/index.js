import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export default function Tabbar() {
  return (
    <div>
      <ul>
        <li>
          {/* <a href="#/films">电影</a> */}
          <NavLink to="/films" activeClassName="k-active">
            电影
          </NavLink>
        </li>
        <li>
          {/* <a href="#/cinemas">影院</a> */}
          <NavLink to="/cinemas" activeClassName="k-active">
            影院
          </NavLink>
        </li>
        <li>
          {/* <a href="#/center">我的</a> */}
          <NavLink to="/center" activeClassName="k-active">
            我的
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
