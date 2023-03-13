import request from "@/utils/request";

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/storage/list/overstock/export",
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
    url: "/reports/storage/list/overstock",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/storage/list/overstock/detail",
    method: "post",
    data
  });
}
