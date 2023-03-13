import request from "@/utils/request";

export function reqPurchaseReturnSearchSumList(data) {
  return request({
    module: "erp",
    url: "/purchases/summary/sum",
    method: "post",
    data
  });
}

export function reqPurchaseReturnSearchDetailList(data) {
  return request({
    module: "erp",
    url: "/purchases/summary/detail",
    method: "post",
    data
  });
}

export function reqPurchaseReturnSearchSumOutExport(data) {
  return request({
    module: "erp",
    url: "/purchases/summary/sum/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

export function reqPurchaseReturnSearchDetailOutExport(data) {
  return request({
    module: "erp",
    url: "/purchases/summary/detail/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
