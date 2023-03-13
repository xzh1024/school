import request from "@/utils/request";

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/supplier/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

export async function loadReportList(params) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/supplier",
    method: "get",
    params
  });
}

export async function loadReportListTotal(params) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/supplier/count",
    method: "get",
    params
  });
}

export async function loadReportChildList(params) {
  return request({
    module: "erp",
    url: "/reports/purchases/list/supplier/subs",
    method: "get",
    params
  });
}
