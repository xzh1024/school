import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user'

import './style.scss'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handlerUsername = this.handlerUsername.bind(this);
    this.handlerPassword = this.handlerPassword.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount() {
    console.log(this.props);
  }

  handlerUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlerPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  submit() {
    this.props.dispatch(userActions.login({
      username: this.state.username,
      password: this.state.password
    }));
    console.log(this);
    console.log(this.props.user);
  }

  render() {
    return (
      <ul className="login-form">
        <div>
          <p>用户名：{this.props.user.username}</p>
          <p>密码：{this.props.user.password}</p>
          <p>状态：{String(this.props.user.isLogin)}</p>
        </div>
        <div>
          <li>
            <label>用户名</label>
            <input type="text" value={this.state.username} onChange={this.handlerUsername}></input>
          </li>
          <li>
            <label>密码</label>
            <input type="password" value={this.state.password}  onChange={this.handlerPassword}></input>
          </li>
          <li>
            <button onClick={this.submit}>登录</button>
          </li>
        </div>
      </ul>
    );
  };
  
};

// export default Login;

export default connect((state) => {
  return {
    user: state.user
  }
})(Login);