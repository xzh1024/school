/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
/**
 * 采购订单
 */

//  急件订单添加query参数type
function getTypeQuery(isDispatch?: string) {
  return isDispatch ? "?type=3" : "";
}
//订单列表
export function reqPurchaseList(data: any, isDispatch?: string): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/search" + getTypeQuery(isDispatch),
    method: "post",
    data
  });
}

export function reqPurchaseBillingMerge(ids: number[]): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/merge",
    method: "post",
    data: { orderIds: ids }
  });
}

export function submitPurchaseBilling(
  id: number,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url:
      "/purchases/order/workflow/" + id + "/submit" + getTypeQuery(isDispatch),
    method: "post"
  });
}

export function recallPurchaseBilling(
  id: number,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url:
      "/purchases/order/workflow/" + id + "/recall" + getTypeQuery(isDispatch),
    method: "post"
  });
}

export function auditPurchaseBilling(
  data: any,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/workflow/audit" + getTypeQuery(isDispatch),
    method: "post",
    data,
    useAuditErrors: true
  });
}

export function cancelPurchaseBillParts(id: number, data: any): Promise<any> {
  return request({
    module: "erp",
    url: `/purchases/order/term/${id}`,
    method: "put",
    data
  });
}

export function deletePurchaseBilling(
  ids: number[],
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order" + getTypeQuery(isDispatch),
    method: "delete",
    data: { ids: ids }
  });
}

// 订单开单部分

export function reqPurchasePartsDefaultPrice(data: any): Promise<any> {
  return request({
    module: "erp",
    url: "purchases/order-detail/default-price/query",
    method: "post",
    data
  });
}

export function reqPurchasePendingWithSupplier(
  id: number,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url:
      "/purchases/order/split/cooperator/" +
      id +
      "/unsubmit" +
      getTypeQuery(isDispatch)
  });
}

export function reqPurchaseBillingDetails(
  id: number,
  sort: string,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/" + id + getTypeQuery(isDispatch),
    params: {
      sort
    }
  });
}

export function reqPurchaseBillingCreate(
  data: any,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order" + getTypeQuery(isDispatch),
    method: "post",
    data
  });
}

export function reqPurchaseBillingHeadersUpdate(
  data: any,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order/" + data.id + getTypeQuery(isDispatch),
    method: "put",
    data
  });
}

export function reqPurchaseBillingDetailsUpdate(
  data: any,
  isDispatch?: string
): Promise<any> {
  let method = "post";
  if (data.id) {
    method = "put";
  }
  return request({
    module: "erp",
    url: "/purchases/order-detail" + getTypeQuery(isDispatch),
    method: method,
    data
  });
}
export function reqPurchaseBillingDetailsDelete(
  data: any,
  isDispatch?: string
): Promise<any> {
  return request({
    module: "erp",
    url: "/purchases/order-detail" + getTypeQuery(isDispatch),
    method: "delete",
    data
  });
}
