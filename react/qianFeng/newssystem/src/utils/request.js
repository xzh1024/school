import axios from "axios";
// import { Message } from "element-ui";

// 创建axios实例
const service = axios.create({
  // baseURL: SERVICE_MODULE_MAP.united,
  // timeout: 30000, // 请求超时时间
  // withCredentials: true // 请求为跨域类型时是否在请求中协带cookie
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
    const { responseType } = response.config;
    const res = response.data;
    console.log(res)
    return Promise.resolve(res);
    // if (responseType === "blob") {
    //   if (res.message) {
    //     // Message({
    //     //   message: res.message,
    //     //   type: "error",
    //     //   duration: 3500,
    //     //   showClose: true
    //     // });
    //     return Promise.reject(res);
    //   } else {
    //     return Promise.resolve(res);
    //   }
    // } else if (res.code === "ok") {
    //   return Promise.resolve(res.data);
    // } else {
    //   // Message({
    //   //   message: res.message,
    //   //   type: "error",
    //   //   duration: 3500,
    //   //   showClose: true
    //   // });
    //   return Promise.reject(res);
    // }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
