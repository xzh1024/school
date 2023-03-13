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

let currentLoading: any = null;
let loadingCacheMap = {} as { [key: string]: boolean };

function getUrl(httpConfig: AxiosRequestConfigEx): string {
  if (!httpConfig) {
    console.warn("interceptor.getUrl httpConfig Error, httpConfig is null!");
  }
  return httpConfig.url as string;
}

// 开启加载动画
function openLoading(url: string) {
  if (!url) {
    console.error("interceptor.toggleLoading url Error, url is null!");
  }
  loadingCacheMap[url] = true;
  if (currentLoading) return;
  currentLoading = Loading.service({
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.1)"
  });
}

// 关闭加载动画
function closeLoading(url: string) {
  if (!url) {
    console.error("interceptor.toggleLoading url Error, url is null!");
  }
  if (currentLoading != null) {
    let flag = true;
    // 接口请求完毕置为false
    loadingCacheMap[url] = false;
    for (const item in loadingCacheMap) {
      if (loadingCacheMap[item]) {
        flag = false;
        break;
      }
    }
    if (!flag) return;
    currentLoading.close();
    currentLoading = null;
    loadingCacheMap = {};
  }
}

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfigEx) => {
    if (config.module) {
      config.baseURL = `/${config.module}`;
      delete config.module;
    } else {
      config.baseURL = "/united";
    }
    // 增加全局遮罩
    if (config.showLoad) {
      openLoading(getUrl(config));
      // 在这里清除掉showLoad配置, 不将此配置发送给后台
      delete config.showLoad;
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
    closeLoading(getUrl(response.config));
    const res = response.data;
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
    closeLoading(getUrl(error.config));
    return Promise.reject(error);
  }
);

export default service;
