import request from "@/utils/request";

/* 客情提醒列表 */
export async function remindsList(params) {
  return request({
    module: "erp",
    url: "/repairs/reminds/list",
    method: "get",
    params
  });
}

/* 客情提醒计数 */
export async function remindsTodo(params) {
  return request({
    module: "erp",
    url: "/repairs/reminds/todo",
    method: "get",
    params
  });
}

/* 客情提醒列表 */
export async function remindsUpdate(data) {
  return request({
    module: "erp",
    url: "/repairs/reminds/update",
    method: "post",
    data
  });
}

/* 获取设置信息 */
export async function getSettings(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-company",
    method: "get",
    params
  });
}

/* 更新设置信息 */
export async function updateSettings(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-company",
    method: "post",
    data
  });
}

/* 导出 */
export async function exportReminds(data) {
  return request({
    module: "erp",
    url: "/repairs/reminds/remind_export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
