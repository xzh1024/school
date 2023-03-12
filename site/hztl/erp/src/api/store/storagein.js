import request from "@/utils/request";

export function reqStorageInList(data) {
  // 入库单列表
  return request({
    module: "erp",
    url: "/storage/stockin",
    method: "post",
    data
  });
}
export function storeComplete(data) {
  // 入库完成
  return request({
    module: "erp",
    url: "/storage/stockin/" + data + "/complete",
    method: "put"
  });
}
export function storeAllComplete(data) {
  // 全部入库完成
  return request({
    module: "erp",
    url: "/storage/stockin/" + data + "/whole",
    method: "put"
  });
}
export function stockinBegin(data) {
  // 开始入库
  return request({
    module: "erp",
    url: "/storage/stockin/" + data + "/begin",
    method: "put",
    data
  });
}
export function stockinDetail(params) {
  // 入库单详情（含基本信息、明细）
  return request({
    module: "erp",
    url: "/storage/stockin/" + params + "/with_detail",
    method: "get"
  });
}
export function stockinDetailDivide(data) {
  // 拆分货位
  return request({
    module: "erp",
    url: "/storage/stockin/" + data.id + "/detail/" + data.detailId + "/divide",
    method: "post",
    data
  });
}
export function saveBill(data) {
  // 保存单头
  return request({
    module: "erp",
    url: "/storage/stockin/" + data.id,
    method: "put",
    data
  });
}
export function saveDetails(data) {
  // 保存明细
  return request({
    module: "erp",
    url: "/storage/stockin/detail",
    method: "put",
    data
  });
}
export function getDetailList(params) {
  // 查询入库单明细列表
  return request({
    module: "erp",
    url: "/storage/stockin/" + params + "/detail",
    method: "get"
  });
}
