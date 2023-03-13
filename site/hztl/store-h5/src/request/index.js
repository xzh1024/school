import Vue from "vue";
import axios from "axios";
import * as envConfig from "envConfigPath";

export const URL_MODULE = {
  accounts: envConfig.accountsURL,
  united: envConfig.unitedURL,
  pay: envConfig.payURL,
  basic: envConfig.basicURL
};

// 创建axios实例
const service = axios.create({
  baseURL: URL_MODULE.accounts,
  timeout: 30000, // 请求超时时间
  withCredentials: true // 请求为跨域类型时是否在请求中协带cookie
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 对请求错误执行的操作
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const {
      data,
      config: { responseType }
    } = response;
    if (data.code === "ok") {
      return Promise.resolve(data.data);
    } else if (data.code == "token-err") {
      localStorage.removeItem("hasCookie");
      Vue.prototype.hasCookie = localStorage.hasCookie;
      const remenberUrl = location.href.split(".com")[1];
      if (axios.prototype.isH5) {
        if (remenberUrl) {
          localStorage.setItem(
            "remenberUrl",
            remenberUrl.replace(/\/[1-9][0-9]{0,}/, "")
          );
        }
        window.location.href = envConfig.urlPrefix + "/passwordLogin";
      } else {
        if (remenberUrl) {
          localStorage.setItem("remenberUrl", remenberUrl);
        }
        window.location.href = envConfig.urlPrefix + "/login";
      }
    } else if (responseType === "blob") {
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
