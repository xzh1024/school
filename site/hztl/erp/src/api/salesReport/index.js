import request from "@/utils/request";

export async function loadReportPanel(data) {
  return request({
    module: "erp",
    url: "/reports/sales/detail/general-view",
    method: "post",
    data
  });
}

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/sales/list/export",
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
    url: "/reports/sales/list",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/sales/list/subs",
    method: "post",
    data
  });
}

export async function loadReportOrderList(data) {
  return request({
    module: "erp",
    url: "/reports/sales/detail",
    method: "post",
    data
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
