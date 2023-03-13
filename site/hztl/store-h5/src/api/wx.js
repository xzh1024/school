import request from "@/request";

export function wxSign(params) {
  return request({
    url: "/offiaccount/js-sdk-sign",
    params
  });
}