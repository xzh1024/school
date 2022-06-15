import React, { Component } from "react";
import "./index.scss";
import propTypes from "prop-types";
console.log(propTypes);

export default class Navbar extends Component {
  // 静态属性  类型检测
  static propTypes = {
    title: propTypes.string.isRequired,
  };

  state = {
    list: [
      {
        title: "首页",
        id: 1,
      },
      {
        title: "列表",
        id: 2,
      },
      {
        title: "购物车",
        id: 3,
      },
    ],
  };

  render() {
    console.log(this.props);
    const { title, leftShow } = this.props;
    console.log(leftShow);
    return (
      <div className="navbar">
        {this.state.list.map((item) => (
          <div
            key={item.id}
            className={
              title === item.title ? "navbar-item active" : "navbar-item"
            }
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}

// 指定props的默认值，这个方法会一直生效
Navbar.defaultProps = {
  title: "购物车",
  leftShow: true,
};
