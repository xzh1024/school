import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface AxiosRequestConfigEx extends AxiosRequestConfig {
  showLoad?: boolean;
  module?: string;
}

// 创建axios实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
  withCredentials: true // 请求为跨域类型时是否在请求中协带cookie
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfigEx) => {
    if (config.module) {
      config.baseURL = `/${config.module}`;
      delete config.module;
    } else {
      config.baseURL = "/united";
    }
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
    if (res.code === "ok") {
      return Promise.resolve(res);
    } else if (res.code === "token-err") {
      sessionStorage.clear();
      return Promise.reject(res);
    } else if (res.code === "no-login") {
      sessionStorage.clear();
      return Promise.reject(res);
    } else if (res.code !== "ok") {
      return Promise.reject(res);
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default service;
