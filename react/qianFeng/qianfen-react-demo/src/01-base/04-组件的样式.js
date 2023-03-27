import React, { Component } from "react";
// import "./css/01-index.scss";
import "./css/01-index.css";

export default class App extends Component {
  render() {
    //   console.log(style);
    const myStyle = {
      display: "inline-block",
      width: "100px",
      height: "100px",
      backgroundColor: "bisque",
    };
    return (
      <div>
        10 + 20
        <div style={{ backgroundColor: "red" }}>1111</div>
        <div style={myStyle}>222</div>
        <div className="box">333</div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id="username" placeholder="请输入用户名"></input>
      </div>
    );
  }
}
