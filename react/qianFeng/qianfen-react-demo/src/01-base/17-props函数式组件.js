import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 类组件 */}
        <Navbar></Navbar>

        {/* 函数式组件 */}
        <Sidebar bg="#ff0000" position="right"></Sidebar>
      </div>
    );
  }
}
