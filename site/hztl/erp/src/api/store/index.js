import request from "@/utils/request";
//获取仓库列表
export function reqStoreList(params) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses",
    params
  });
}
//启用停用仓库
export function reqStoreStop(data) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/status",
    method: "put",
    data
  });
}
//删除仓库
export function reqStoreDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses",
    method: "delete",
    data: {
      id: id
    }
  });
}

export function reqWarehouses(params) {
  // 获取该公司有权使用的仓库
  return request({
    module: "erp",
    url: "/storehouses/assignments/warehouses",
    method: "get",
    params
  });
}
export function reqWarehousesPositions(params) {
  // 获取该公司有权使用的货位
  return request({
    module: "erp",
    url: "/storehouses/assignments/" + params + "/positions",
    method: "get"
  });
}

export function reqReceiptList(data) {
  // 收货列表
  return request({
    module: "erp",
    url: "/storage/stockreceiving",
    method: "post",
    data
  });
}
export function beginReceipts(params) {
  // 收货列表开始收货
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/begin",
    method: "put"
  });
}
export function stockreceivingValid(params) {
  // 收货验收完成、验收完成并收货验证接口
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/valid",
    method: "get"
  });
}
export function checkReceiptsOver(params) {
  // 收货列表验收完成
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/complete",
    method: "put"
  });
}
export function checkReceiptsAndInStore(params) {
  // 收货列表验收完成并入库
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/stock",
    method: "put"
  });
}
export function receiptsSaveForm(data) {
  // 收货开单单头保存
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + data.id,
    method: "put",
    data
  });
}
export function receiptsScheduleSaveRow(data) {
  // 收货开单明细表保存
  return request({
    module: "erp",
    url: "/storage/stockreceiving/detail",
    method: "put",
    data
  });
}
export function receiptsScheduleDetailSaveRow(data) {
  // 收货开单明细表子表保存
  return request({
    module: "erp",
    url: "/storage/stockreceiving/sub",
    method: "put",
    data
  });
}
export function receiptsChilds(params) {
  // 收货查询列表子表单
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/detail",
    method: "get"
  });
}
export function receiptsBillDetail(params) {
  // 收货开单单位详情(含表单单头)
  return request({
    module: "erp",
    url: "/storage/stockreceiving/" + params + "/with_detail",
    method: "get"
  });
}
export function receiptsBillQualified(params) {
  // 收货开单嵌套表单合格商品
  return request({
    module: "erp",
    url:
      "/storage/stockreceiving/" +
      params.receivingId +
      "/detail/" +
      params.detailId +
      "/sub?type=0",
    method: "get"
  });
}
export function receiptsBillFailed(params) {
  // 收货开单嵌套表单不合格商品
  return request({
    module: "erp",
    url:
      "/storage/stockreceiving/" +
      params.receivingId +
      "/detail/" +
      params.detailId +
      "/sub?type=1",
    method: "get"
  });
}
export function receiptsBillTableDle(params) {
  // 收货开单表单嵌套表单删除详情
  return request({
    module: "erp",
    url: "/storage/stockreceiving/sub/" + params,
    method: "delete"
  });
}
