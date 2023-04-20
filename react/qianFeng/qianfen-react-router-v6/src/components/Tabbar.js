import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tabbar.css';

/**
 * 声明式导航与编程式导航
 * 
 * 声明式导航
 * **/
export default function Tabbar() {
  return (
    <footer>
      <ul>
        <li>
          <NavLink
            to="/films"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            电影
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cinemas"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            影院
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/center"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            我的
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}
