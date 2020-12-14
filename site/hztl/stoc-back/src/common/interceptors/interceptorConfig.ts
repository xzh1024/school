import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import router from "@/router";
import { Message, MessageBox, Loading } from "element-ui";

export interface AxiosRequestConfigEx extends AxiosRequestConfig {
  showLoad?: boolean;
  module?: string;
}

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 0, // 请求超时时间
  withCredentials: true
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfigEx) => {
    const module = config.module || "united";
    config.baseURL = `/${module}`;
    // 增加全局遮罩
    if (config.module) {
      config.baseURL = `/${config.module}`;
      delete config.module;
    } else {
      config.baseURL = "/united";
    }
    // 在发送请求之前执行的操作
    // 过滤掉xxxx有关的请求接口
    // 配置token
    // 如果需要加密数据，则加密config.data
    return config;
  },
  error => {
    // 对请求错误执行的操作
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // res.code = "token-err";
    if (res.code === "ok") {
      return Promise.resolve(res);
    } else if (res.code === "token-err") {
      sessionStorage.clear();
      router.push("/login");
      return Promise.reject(res);
    } else if (res.code === "no-login") {
      sessionStorage.clear();
      router.push("/login");
      return Promise.reject(res);
    } else if (res.code !== "ok") {
      Message({
        message: res.message,
        type: "error",
        duration: 3500,
        showClose: true
      });
      return Promise.reject(res);
    }
    return response;
  },
  (error: AxiosError) => {
    // 对响应错误执行的操作
    return Promise.reject(error);
  }
);

export default service;
