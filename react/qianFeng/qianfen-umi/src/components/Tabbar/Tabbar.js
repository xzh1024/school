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
              film
            </NavLink>
          </li>
          <li>
            <NavLink to="/cinema" activeclassname="active">
              cinema
            </NavLink>
          </li>
          <li>
            <NavLink to="/center" activeclassname="active">
              center
            </NavLink>
          </li>
        </ul>
      </footer>
    );
  }
}
