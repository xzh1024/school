import request from "@/utils/request";

export function storageOutEnterBillDetails(params) {
  // 出入库单弹框详情
  return request({
    module: "erp",
    url: "/storage/bill_assignments/details",
    method: "post",
    data: params
  });
}

export function queryStorage(params) {
  // 出入库单弹框详情
  return request({
    module: "erp",
    url: "/storage/stocks/query",
    method: "post",
    data: params
  });
}
