import React, { Component } from "react";

class Field extends Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          value={this.props.value}
          onChange={(event) => {
            this.props.onChangeEvent(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    username: "123456",
    password: "admin",
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  handleCancel = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <h3>登录页面</h3>
        <Field
          label="用户名"
          type="text"
          value={this.state.username}
          onChangeEvent={(value) => {
            console.log(value);
            this.setState({
              username: value,
            });
          }}
        ></Field>
        <Field
          label="密码"
          type="password"
          value={this.state.password}
          onChangeEvent={(value) => {
            console.log(value);
            this.setState({
              password: value,
            });
          }}
        ></Field>
        <button onClick={this.handleSubmit}>登录</button>
        <button onClick={this.handleCancel}>取消</button>
      </div>
    );
  }
}
