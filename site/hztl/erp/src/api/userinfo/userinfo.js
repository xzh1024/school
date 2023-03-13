import request from "@/utils/request";
import qs from "qs";

export function setUserInfoMsg(data) {
  // 设置个人帐号信息
  return request({
    contentType: "application/x-www-form-urlencoded",
    url: "/profile",
    method: "post",
    data: qs.stringify(data)
  });
}
export function getUserInfoMsg(params) {
  // 获取个人帐号信息
  return request({
    url: "/profile",
    method: "get",
    params
  });
}
