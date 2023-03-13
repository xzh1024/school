import request from "@/utils/request";

export function getSettingsExport(params) {
  return request({
    module: "erp",
    url: "/settings/tables",
    method: "get",
    params
  });
}

export function postSettingsExport(data) {
  return request({
    module: "erp",
    url: "/settings/tables",
    method: "post",
    data
  });
}
