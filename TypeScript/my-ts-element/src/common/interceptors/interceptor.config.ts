import Vue from 'vue';
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

// 添加请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log('请求拦截');
    // 在发送请求之前执行的操作
    // 过滤掉xxxx有关的请求接口
    // 配置token
    // 如果需要加密数据，则加密config.data
    return config;
}, (error) => {
    // 对请求错误执行的操作
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
    console.log('响应拦截');
    // 对响应数据执行的操作
    //如需要解密返回数据，则解密response.data
    return response;
}, (error: AxiosError) => {
   // 对响应错误执行的操作
    return Promise.reject(error);
});
// export default {
//     install: (Vue, options) => {   
//         Vue.prototype.Http = axios
//     }
// }

// const Http = axios
// export {Http}
