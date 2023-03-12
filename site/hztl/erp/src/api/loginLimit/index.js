import request from "@/utils/request";

export async function getLoginLimit() {
  return await request({
    module: "erp",
    url: "/settings/login-time-limit"
  });
}

export async function updateLoginLimit(data) {
  return await request({
    module: "erp",
    url: "/settings/login-time-limit",
    method: "POST",
    data
  });
}

export async function getCurLoginLimit() {
  return await request({
    module: "erp",
    url: "/settings/login-time-limit/info"
  });
}

export function getLoginLimitMsg() {
  return request({
    module: "erp",
    url: "/settings/login-time-limit/sms"
  });
}

export async function applyDelayTime(params) {
  return await request({
    module: "erp",
    url: "/settings/login-time-limit/apply",
    method: "PUT",
    data: params
  });
}

export async function sendCode(params) {
  return await request({
    module: "erp",
    url: "/settings/login-time-limit/sms",
    method: "POST",
    data: params
  });
}
