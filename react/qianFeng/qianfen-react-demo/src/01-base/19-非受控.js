import React, { Component } from "react";

export default class App extends Component {
  myUsername = React.createRef();
  myPassword = React.createRef();

  handleSubmit = () => {
    console.log(this.myUsername.current.value);
    console.log(this.myPassword.current.value);
  };
  handleReset = () => {
    this.myUsername.current.value = "";
    this.myPassword.current.value = "";
  };
  render() {
    return (
      <div>
        <h3>登录页</h3>
        <div>
          <input
            type="text"
            placeholder="请输入用户名"
            defaultValue="hahah"
            ref={this.myUsername}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="请输入密码"
            ref={this.myPassword}
          />
        </div>
        <button onClick={this.handleSubmit}>登录</button>
        <button onClick={this.handleReset}>重置</button>
      </div>
    );
  }
}
