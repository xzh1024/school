import { Component } from 'react';
import { NavLink } from 'umi';
import './Tabbar.less';

export default class Tabbar extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <NavLink to="/film" activeclassname="active">
              电影
            </NavLink>
          </li>
          <li>
            <NavLink to="/cinema" activeclassname="active">
              影院
            </NavLink>
          </li>
          <li>
            <NavLink to="/center" activeclassname="active">
              我的
            </NavLink>
          </li>
        </ul>
      </footer>
    );
  }
}
