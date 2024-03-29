import React, { Component } from "react";
// import propTypes from 'prop-types';
import Navbar from "./Navbar/index";
import "./css/03-layout.scss";

export default class App extends Component {
  render() {
    const obj = {
      title: "首页",
      leftShow: false,
    };
    return (
      <div className="container">
        <div className="main">App</div>
        <Navbar {...obj}></Navbar>
      </div>
    );
  }
}

// 类属性
// Navbar.propTypes = {
//   title: propTypes.string.isRequired, // 验证是不是字符串
//   leftShow: propTypes.bool.isRequired // 验证是不是bool
// }
