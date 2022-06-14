import React, { Component } from "react";
import "./index.css";

export default class Navbar extends Component {
  state = {
    list: [
      {
        name: "首页",
        id: 1,
      },
      {
        name: "列表",
        id: 2,
      },
      {
        name: "购物车",
        id: 3,
      },
    ],
  };
  render() {
    console.log(this.props);
    const { id } = this.props;
    return (
      <div>
        {this.state.list.map((item) => (
          <div key={item.id} className={id === item.id ? "active" : ""}>
            {item.name}
          </div>
        ))}
      </div>
    );
  }
}
