import request from "@/utils/request";

export function stockPicking(data) {
  // 拣货单列表
  return request({
    module: "erp",
    url: "/storage/stockpicking",
    method: "post",
    data
  });
}
export function stockPickingDetail(params) {
  // 拣货单明细列表
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/detail",
    method: "get"
  });
}
export function stockPickingSub(data) {
  // 拣货单子表列表
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + data.stockpickingId + "/sub",
    method: "post",
    data
  });
}
export function stockPickingBegin(data) {
  // 开始拣货
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + data + "/begin",
    method: "put",
    data
  });
}
export function stockPickingValid(params) {
  // 开始拣货拣货完成、拣货并出库验证
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/valid",
    method: "get"
  });
}
export function stockPickingComplete(params) {
  // 拣货完成
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/complete",
    method: "put"
  });
}
export function stockPickingStock(params) {
  // 拣货完成并出库
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/stock",
    method: "put"
  });
}
export function stockPickingWithdetail(params) {
  // 拣货单详情(含明细)
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/with_detail",
    method: "get"
  });
}
export function stockPickingSaveHeader(data) {
  // 拣货单保存单头
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + data.stockpickingId,
    method: "put",
    data
  });
}
export function stockPickingSaveDetail(data) {
  // 拣货单保存明细
  return request({
    module: "erp",
    url: "/storage/stockpicking/detail",
    method: "put",
    data
  });
}
export function stockPickingSaveDetailSub(data) {
  // 拣货单保存明细子表
  return request({
    module: "erp",
    url: "/storage/stockpicking/sub",
    method: "put",
    data
  });
}
export function stockPickingWhole(params) {
  // 全部拣货
  return request({
    module: "erp",
    url: "/storage/stockpicking/" + params + "/whole",
    method: "put"
  });
}
