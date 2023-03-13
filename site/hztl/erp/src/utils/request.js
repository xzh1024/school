import axios from "axios";
import { Message, MessageBox } from "hztl-ui";
import router from "@/router/router";
import store from "@/store/store";
import {
  createGlobalReqLoading,
  deleteGlobalReqLoading
} from "@/utils/handleGlobalReqLoading";
import { envConfig } from "envConfigPath";
import { dueMessageBox } from "@/utils/message";

const DURATION = 3500;
export const ERROR_CODES = [
  "price-change",
  "stocks-lack",
  "sku-out",
  "not-enough"
];

if (process.env.NODE_ENV === "development") {
  //开启会影响文件上传
  // require('@/mock');
}

const service = axios.create({
  timeout: 0,
  withCredentials: true
});
service.interceptors.request.use(
  config => {
    createGlobalReqLoading(config);
    const module = config.module || "erp";
    config.baseURL =
      module == "erp" ? envConfig.ErpApiUrl : envConfig.CrmApiUrl;
    config.headers["content-type"] = config.contentType || "application/json";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
let hasOnlineErrTip = false;
service.interceptors.response.use(
  response => {
    deleteGlobalReqLoading(response.config);
    const {
      useOriginData,
      ignoreAllErr,
      ignoreErr,
      useAuditErrors,
      isExportData,
      showLackingErr
    } = response.config;
    const res = response.data;

    /**
     * isExportData 为导出接口适用
     *
     * useOriginData 返回源数据
     *
     * 根据code判断处理情况
     *   ok正常返回res.data
     *
     *   不为ok
     *   ignoreAllErr 返回错误逻辑
     *
     *   其次判断特殊错误处理 全局api报错采用统一逻辑
     *     token-err no-login  login-time-limit-err  beyondMaxLoginNumber
     *
     *   再次判断ignoreErr则返回错误逻辑
     *
     *   useAuditErrors 为特殊处理，目前只有个别接口适用
     *
     *   其余错误统一处理
     *
     **/
    if (isExportData) {
      if (res.message) {
        Message({
          message: res.message,
          type: "error",
          duration: DURATION,
          showClose: true
        });
        return Promise.reject(res);
      } else {
        return Promise.resolve(res);
      }
    } else if (useOriginData) {
      return Promise.resolve(res);
    } else if (res.code === "ok") {
      return Promise.resolve(res.data);
    } else if (ignoreAllErr) {
      return Promise.reject(res);
    } else if (res.code === "lacking-err" && showLackingErr) {
      return Promise.reject(res);
    } else if (res.code === "token-err") {
      if (!hasOnlineErrTip) {
        hasOnlineErrTip = true;
        router.push("/Login");
        return MessageBox({
          type: "warning",
          message: res.message,
          title: "提示",
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          showClose: false
        }).finally(() => {
          hasOnlineErrTip = false;
          return Promise.reject(res);
        });
      }
      return Promise.reject(res);
    } else if (res.code === "no-login") {
      router.push("/Login");
      return Promise.reject(res);
    } else if (res.code === "login-time-limit-err") {
      store.dispatch("admin/limitTime/refreshTimeout");
      return Promise.reject(res);
    } else if (res.code == "beyondMaxLoginNumber") {
      return Promise.reject(res);
    } else if (ignoreErr) {
      return Promise.reject(res);
    } else if (useAuditErrors && ERROR_CODES.includes(res.code)) {
      return Promise.resolve(res);
    } else if (res.code === "device-check") {
      return Promise.reject(res);
    } else if (res.code === "account-set-expired") {
      dueMessageBox();
      return Promise.reject(res);
    } else if (res.code !== "ok") {
      Message({
        message: res.message,
        type: "error",
        duration: DURATION,
        showClose: true
      });
      return Promise.reject(res);
    }
  },
  error => {
    deleteGlobalReqLoading();
    let errTxt;
    if (error.response) {
      if (error.response.data) {
        errTxt =
          error.response.data.message + " 错误码：" + error.response.data.code;
      } else {
        errTxt = error.response.message + " 错误码：" + error.response.status;
      }
    } else {
      errTxt = "错误信息：" + error.message;
    }

    Message({
      message: errTxt,
      type: "error",
      duration: DURATION,
      showClose: true
    });

    return Promise.reject(error);
  }
);
export default service;
