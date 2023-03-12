import request from "@/utils/request";

export function workBenchCollectsMenu(data) {
  return request({
    module: "erp",
    url: "/workbench/custom_menus",
    method: "post",
    data
  });
}
export function workBenchListMenu() {
  return request({
    module: "erp",
    url: "/workbench/menus",
    method: "get"
  });
}
export function workBenchCommounMenu(params) {
  return request({
    module: "erp",
    url: "/workbench/common_menus/increase",
    method: "put",
    params
  });
}
export function workBenchMenuTabsCount(params) {
  return request({
    module: "erp",
    url: "/workbench/notices/count",
    method: "get",
    params
  });
}
export function workBenchMenuTableList(params) {
  return request({
    module: "erp",
    url: "/workbench/notices/list",
    method: "get",
    params
  });
}

export function noticeRead(data) {
  return request({
    module: "erp",
    url: "/workbench/notices/read",
    method: "post",
    data
  });
}

export function noticeReadAll() {
  return request({
    module: "erp",
    url: "/workbench/notices/read-all",
    method: "post"
  });
}

export function deleteNotices(id) {
  return request({
    module: "erp",
    url: `/workbench/notices/${id}`,
    method: "delete"
  });
}

export function loadUnitedNotice(params) {
  return request({
    module: "erp",
    url: "/notices",
    method: "get",
    params: {
      ...params,
      status: 0
    }
  });
}

export function unitedNoticeRead(id) {
  return request({
    module: "erp",
    url: "/notices/update",
    method: "post",
    data: {
      noticeIds: id
    }
  });
}

export function workBenchReports() {
  return request({
    module: "erp",
    url: "/statistics/daily_statistics",
    method: "get"
  });
}

export function repairsBoardsBillsList(params) {
  return request({
    module: "erp",
    url: "/repairs/boards/bills",
    method: "get",
    params
  });
}

export function repairsBoardsBillsCount(params) {
  return request({
    module: "erp",
    url: "/repairs/boards/bills/count",
    method: "get",
    params
  });
}

export function repairsBoardsBillStatistics(params) {
  return request({
    module: "erp",
    url: "/repairs/boards/statistics",
    method: "get",
    params
  });
}

/* 客户看板 */
export function customersKanban(params) {
  return request({
    module: "erp",
    url: "/repairs/boards/bills/customers",
    method: "get",
    params
  });
}

/* 车间看板 */
export function workshopsKanban(params) {
  return request({
    module: "erp",
    url: "/repairs/boards/bills/workshops",
    method: "get",
    params
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
