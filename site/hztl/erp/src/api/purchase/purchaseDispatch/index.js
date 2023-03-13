import request from "@/utils/request";
/**
 * 急件采购单
 */

export function reqPurchaseDispatchList(billId) {
  return request({
    module: "erp",
    url: "/purchases/urgent/arrival/order/" + billId
  });
}

export function reqPurchaseDispatchReceiveList(billId) {
  return request({
    module: "erp",
    url: "/purchases/urgent/reception/detail/" + billId
  });
}

export function reqPurchaseDispatchReceive(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/reception",
    method: "post",
    data
  });
}

// 急件到货单详情
export function reqPurchaseDispatchArrivalDetail(id) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/" + id + "/with_details"
  });
}

// 急件到货单详情部分
export function reqPurchaseDispatchArrivalDetails(id, sort) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/" + id + "/with_details/print",
    params: {
      sort
    }
  });
}

// 查询急件到货单
export function reqPurchaseDispatchArrivalList(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/list",
    method: "post",
    data
  });
}
// 更新急件到货单或添加到已有
export function updatePurchaseDispatch(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival",
    method: "put",
    data,
    useOriginData: true // 可合并弹框
  });
}
// 拆分急件到货单
export function splitPurchaseDispatch(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/split",
    method: "post",
    data,
    useOriginData: true // 可合并弹框
  });
}
// 删除急件到货单
export function reqPurchaseDispatchArrivalDelete(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival",
    method: "delete",
    data
  });
}

// 提交急件到货单
export function reqPurchaseDispatchArrivalSubmit(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/workflow/submit",
    method: "post",
    data
  });
}

// 撤回急件到货单
export function reqPurchaseDispatchArrivalRecall(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/workflow/recall",
    method: "post",
    data
  });
}
// 收货
export function reqPurchaseDispatchArrivalReceive(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/workflow/receive",
    method: "post",
    data
  });
}

// 更新急件到货明细
export function reqPurchaseDispatchArrivalDetailUpdate(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival-detail",
    method: "put",
    data
  });
}

// 删除急件到货明细
export function reqPurchaseDispatchArrivalDetailDelete(params) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival-detail/delete",
    method: "delete",
    params
  });
}
