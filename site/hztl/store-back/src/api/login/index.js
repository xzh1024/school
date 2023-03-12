import request, { SERVICE_MODULE_MAP } from "@/utils/request";
import qs from 'qs'
export function tokenLogin(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/token-login",
    method: "post",
    data: params
  });
}

export function loginOut(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/logout",
    method: "post",
    data: params
  });
}

export function login(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    url: "/password-login",
    method: "post",
    data: qs.stringify(params)
  });
}

export function getBaseFn() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/base",
    method: "get",
  });
}