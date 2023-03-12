import request from "@/utils/request";

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/sales/list/customer-increase/export",
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
    url: "/reports/sales/list/customer-increase",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/sales/list/customer-increase-subs",
    method: "post",
    data
  });
}
