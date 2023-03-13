import request from "@/utils/request";

export async function loadReportPanel(data) {
  return request({
    module: "erp",
    url: "/reports/purchases/detail/general-view",
    method: "post",
    data
  });
}

//新增导出页面接口，需要新开窗口传递参数
export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

export async function loadReportList(data) {
  return request({
    module: "erp",
    url: "/reports/purchases/list",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/subs",
    method: "post",
    data
  });
}

export async function loadReportOrderList(params) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/sort",
    method: "get",
    params
  });
}

export async function loadBussiness(data) {
  return request({
    module: "erp",
    url: "/account-sets/staffs/business_mans",
    method: "post",
    data
  });
}
export async function loadFinancialAudit(data) {
  return request({
    module: "erp",
    url: "/account-sets/staffs/financial-audit-mans",
    method: "post",
    data
  });
}
export async function loadCreated(data) {
  return request({
    module: "erp",
    url: "/account-sets/staffs/created_mans",
    method: "post",
    data
  });
}
