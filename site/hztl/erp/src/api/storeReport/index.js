import request from "@/utils/request";

export async function loadReportPanel(data) {
  return request({
    module: "erp",
    url: "/reports/storage/detail/general-view",
    method: "post",
    data
  });
}

export async function exportReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/storage/list/in-and-out/export",
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
    url: "/reports/storage/list/in-and-out",
    method: "post",
    data
  });
}

export async function loadReportChildList(data) {
  return request({
    module: "erp",
    url: "/reports/storage/list/in-and-out/subs",
    method: "post",
    data
  });
}

export async function loadReportOrderList(data) {
  return request({
    module: "erp",
    url: "/reports/storage/detail/stock-sort",
    method: "post",
    data
  });
}
