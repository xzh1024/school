import request from "@/utils/request";

export function stockoutList(data) {
  // 出库单列表
  return request({
    module: "erp",
    url: "/storage/stockout",
    method: "post",
    data
  });
}
export function stockoutBegin(params) {
  // 出库单开始收货
  return request({
    module: "erp",
    url: "/storage/stockout/" + params + "/begin",
    method: "put"
  });
}
export function stockoutWithDetail(params) {
  // 出库单开单详情含单头
  return request({
    module: "erp",
    url: "/storage/stockout/" + params + "/with_detail",
    method: "get"
  });
}
export function stockoutDetail(params) {
  // 出库单二级表单列表
  return request({
    module: "erp",
    url: "/storage/stockout/" + params + "/detail",
    method: "get"
  });
}
export function stockoutSub(data) {
  // 出库单开单子列表
  return request({
    module: "erp",
    url: "/storage/stockout/" + data.billId + "/sub",
    method: "post",
    data
  });
}
export function stockoutAudit(params) {
  // 出库单开单验货完成
  return request({
    module: "erp",
    url: "/storage/stockout/" + params + "/audit",
    method: "put"
  });
}
export function stockoutWhole(params) {
  // 出库单开单全部出库
  return request({
    module: "erp",
    url: "/storage/stockout/" + params + "/whole",
    method: "put"
  });
}
export function saveStockoutHeaders(data) {
  // 出库单明细单头保存
  return request({
    module: "erp",
    url: "/storage/stockout/" + data.id,
    method: "put",
    data
  });
}
export function saveStockoutDetails(data) {
  // 出库单明细表更新保存
  return request({
    module: "erp",
    url: "/storage/stockout/detail",
    method: "put",
    data
  });
}
export function saveStockoutDetailsSub(data) {
  // 出库单明细表子表更新保存
  return request({
    module: "erp",
    url: "/storage/stockout/sub",
    method: "put",
    data
  });
}
