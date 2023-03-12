import request from "@/utils/request";

export function reqSalesSearchBillsList(data) {
  return request({
    module: "erp",
    url: "/sales/query/bills",
    method: "post",
    data
  });
}
export function reqSalesSearchDetailsList(data) {
  return request({
    module: "erp",
    url: "/sales/query/details",
    method: "post",
    data
  });
}
export function reqSalesReturnSearchOutExport(data) {
  return request({
    module: "erp",
    url: "/sales/query/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
