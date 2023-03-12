import request from "@/utils/request";
import qs from "qs";
export function loginByAccount(data) {
  // 账号密码登录
  return request({
    contentType: "application/x-www-form-urlencoded",
    url: "/password-login",
    method: "post",
    data: qs.stringify(data)
  });
}
export function logoutByAccount() {
  return request({
    contentType: "application/x-www-form-urlencoded",
    url: "/logout",
    method: "post"
  });
}
export function erpAccounts(ignoreAllErr = false) {
  // erp账套验证
  return request({
    module: "erp",
    url: "/account-sets/base",
    method: "get",
    ignoreAllErr
  });
}
export function registerAccount(data) {
  return request({
    // 注册
    contentType: "application/x-www-form-urlencoded",
    url: "/register-new",
    method: "post",
    data: qs.stringify(data)
  });
}
export function checkToken(params) {
  return request({
    // 邦邦检查token
    url: "/check-token",
    method: "get",
    params
  });
}
export function forceLogout(data) {
  return request({
    // 强制退出登录
    url: "/force_logout",
    method: "post",
    data: data
  });
}
export function captchasSmes(data) {
  return request({
    // 短信验证码
    contentType: "application/x-www-form-urlencoded",
    url: "/captchas/sms",
    method: "post",
    data: qs.stringify(data)
  });
}
export function checkIsExist(data) {
  return request({
    // 检查用户是否在系统中
    url: "/phone/exist",
    method: "get",
    params: data
  });
}
export function resetPasswords(data) {
  return request({
    url: "/password/reset",
    method: "post",
    data
  });
}
export function checkPhone(data) {
  return request({
    // 更换密码检测手机号码
    contentType: "application/x-www-form-urlencoded",
    url: "/check-phone",
    method: "post",
    data: qs.stringify(data)
  });
}

export function checkAccounts(params) {
  return request({
    url: "/check-accounts",
    params
  });
}
export function changePhone(data) {
  return request({
    // 重新绑定手机号码
    url: "/change-phone",
    method: "post",
    data
  });
}

export async function deviceAuthSms(data) {
  return await request({
    module: "erp",
    url: "/device/auth/sms",
    method: "post",
    data
  });
}

export async function deviceAuth(data) {
  return await request({
    module: "erp",
    url: "/device/auth",
    method: "post",
    data
  });
}

export async function checkDeviceAuth(data) {
  return await request({
    url: "/device/auth/check",
    method: "post",
    data
  });
}
