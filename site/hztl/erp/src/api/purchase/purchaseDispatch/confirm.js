import request from "@/utils/request";
/**
 * 待确认急件
 */

export function reqConfirmSalesList(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-bill",
    method: "post",
    data
  });
}

export function reqConfirmSalesDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-bill/details",
    method: "post",
    data
  });
}

export function reqConfirmPartsList(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-part",
    method: "post",
    data
  });
}

export function reqConfirmPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/list/to-confirm/by-part/details",
    method: "post",
    data
  });
}

export function reqConfirmBatchResolve(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/workflow/confirm",
    method: "post",
    data
  });
}

export function reqConfirmBatchReject(data) {
  return request({
    module: "erp",
    url: "/purchases/urgent/workflow/reject",
    method: "post",
    data
  });
}
