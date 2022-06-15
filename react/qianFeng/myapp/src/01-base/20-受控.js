import React, { Component } from "react";

export default class App extends Component {
  state = {
    username: "",
    password: "",
  };

  changeUsername = (event) => {
    this.setState(
      {
        username: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  changePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleSubmit = () => {
    console.log(this.state);
  };
  handleReset = () => {
    this.setState({
      username: "",
      password: "",
    });
  };
  render() {
    return (
      <div>
        <h3>登录页</h3>
        <div>
          <input
            type="text"
            placeholder="请输入用户名"
            value={this.state.username}
            onChange={this.changeUsername}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.changePassword}
          />
        </div>
        <button onClick={this.handleSubmit}>登录</button>
        <button onClick={this.handleReset}>重置</button>
      </div>
    );
  }
}
