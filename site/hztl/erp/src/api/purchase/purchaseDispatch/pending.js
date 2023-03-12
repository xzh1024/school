import request from "@/utils/request";
/**
 * 待采购急件
 */

export function reqPendingSalesList(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/list/to-purchase",
    method: "post",
    data
  });
}

export function reqPendingPartsDetails(partId, warehouseId) {
  return request({
    module: "erp",
    url:
      "/purchases/urgent/list/to-purchase/detail/" + partId + "/" + warehouseId
  });
}

// 批量创建/添加急件到货单
export function batchCreatePurchaseDispatch(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/create/batch",
    method: "post",
    data,
    useOriginData: true
  });
}

export function createPurchaseDispatch(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/create",
    method: "post",
    data,
    useOriginData: true
  });
}

export function reqPurchaseDispatchDefaultPrice(
  urgentId,
  cooperatorId,
  taxedPrice
) {
  return request({
    module: "erp",
    url: "/purchases/urgent-arrival/create/default-price",
    params: {
      urgentId: urgentId,
      cooperatorId: cooperatorId || 0,
      taxedPrice
    }
  });
}
