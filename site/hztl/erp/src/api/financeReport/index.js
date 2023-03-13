import request from "@/utils/request";

export async function loadReportPanel(data) {
  return request({
    module: "erp",
    url: "/reports/financials/detail/general-view",
    method: "post",
    data
  });
}
export async function loadCooperatorBillSort(data) {
  return request({
    module: "erp",
    url: "/reports/financials/list/cooperator-sort",
    method: "post",
    data
  });
}

export async function loadReportList(data) {
  return request({
    module: "erp",
    url: "/reports/financials/list/sale_outstanding",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/financials/list/sale_outstanding/detail",
    method: "post",
    data
  });
}

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/financials/list/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
