import React, { Component } from 'react'
import { Form, Input, Button } from 'element-react';
import { getToken, setToken, setUserValidVal } from '../../utils/auth'
import loginApi from '../../api/user/login';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handlerUsername = this.handlerUsername.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);

        this.state = {
            form: {
                username: '',
                password: ''
            }
        };
    }

    onSubmit() {
        // e.preventDefault();
        const form = this.state.form;
        loginApi.login(form.username.trim(), form.password.trim()).then(response => {
            console.log(response)
            const { token, userValidValue } = response;
            if (token && userValidValue) {
                setToken(token);
                setUserValidVal(userValidValue);
                this.userInfo();
            }
        }).catch(error => {
            // reject(error)
            console.log(error);
        })
    }

    userInfo = () => {
        loginApi.userInfo(getToken()).then(response => {
            const {
                success,
                data
            } = response;
            if (success) {
                console.log(data)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handlerUsername(value) {
        this.setState({
            form: {
                ...this.state.form,
                username: value
            }
        });
    }

    handlerPassword(value) {
        const form = this.state.form;
        form.password = value;
        this.setState({
            form
        });
    }

    render() {
        return (
            <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit}>
                <Form.Item label="用户名">
                    <Input value={this.state.form.username} onChange={this.handlerUsername}></Input>
                </Form.Item>
                <Form.Item label="密码">
                    <Input type="password" value={this.state.form.password} onChange={this.handlerPassword}></Input>
                </Form.Item>
                <Form.Item>
                    {/* <Button type="primary" nativeType="submit">登录</Button> */}
                    <Button type="primary" onClick={this.onSubmit}>登录</Button>
                </Form.Item>
            </Form>
        )
    }
}
