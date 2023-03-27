import React, { Component } from "react";

class Field extends Component {
  state = {
    value: "",
  };

  clear = () => {
    this.setState({
      value: "",
    });
  };
  setValue = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          value={this.state.value}
          onChange={(event) => {
            this.setState({
              value: event.target.value,
            });
          }}
        />
      </div>
    );
  }
}

export default class App extends Component {
  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleSubmit = () => {
    console.log(this.usernameRef.current.state.value);
    console.log(this.passwordRef.current.state.value);
  };

  handleCancel = () => {
    this.usernameRef.current.clear();
    this.passwordRef.current.setValue("");
  };

  render() {
    return (
      <div>
        <h3>登录页面</h3>
        <Field label="用户名" type="text" ref={this.usernameRef}></Field>
        <Field label="密码" type="password" ref={this.passwordRef}></Field>
        <button onClick={this.handleSubmit}>登录</button>
        <button onClick={this.handleCancel}>取消</button>
      </div>
    );
  }
}
