import axios from "axios";
import { Component } from "react";
import { getToken, getUserValidVal } from './auth'
import { Message } from 'element-react';

const base = "/api/v1.0";

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: base, // api的base_url
    timeout: 60000 // 请求超时时间
})
let noPromptError = false // 不提示错误信息

// 请求前拦截
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        }
        if (getUserValidVal()) {
            config.headers['x-user-valid'] = getUserValidVal()
        }
        noPromptError = config.noPromptError
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
service.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status !== 200 && res.status !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            return res
        }
    },
    error => {
        if (error.response.status === 400 || error.response.status === 401 || error.response.status === 403 || error.response.data.status === 400) {
            if (!noPromptError) {
                Message({
                    message: error.response.data.message || error.response.data.error.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        } else {
            Message({
                message: '服务器异常',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error.response)
    }
);

export default service