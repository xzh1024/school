import request from "@/utils/request";

export function getSettingsTables(params) {
  return request({
    module: "erp",
    url: "/settings/tables",
    method: "get",
    params
  });
}

export function postSettingsTables(data) {
  return request({
    module: "erp",
    url: "/settings/tables",
    method: "post",
    data
  });
}

export function resetSettingsTables(params) {
  return request({
    module: "erp",
    url: "/settings/tables/reset",
    method: "put",
    params
  });
}

/* 列出系统参数模块tab */
export function getParamsModule() {
  return request({
    module: "erp",
    url: "/settings/params/module",
    method: "get"
  });
}
