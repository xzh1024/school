import request from "@/utils/request";

export function loadPurchaseBasket() {
  return request({
    module: "erp",
    url: "/purchases/carts",
    method: "get"
  });
}

export function batchAdd(data) {
  return request({
    module: "erp",
    url: "/purchases/carts/batch",
    method: "post",
    data
  });
}

export function batchDemandAdd(data) {
  return request({
    module: "erp",
    url: "/purchases/carts/batch_from_demand",
    method: "post",
    data
  });
}

export function addPurchaseBasketFromEnquiry(data) {
  return request({
    module: "erp",
    url: "/purchases/carts/from-enquiry",
    method: "post",
    data
  });
}

export function addPurchaseBasketFromDemand(data) {
  return request({
    module: "erp",
    url: "/purchases/carts/from-demand",
    method: "post",
    data
  });
}

export function updatePurchaseBasket({ id, ...data }) {
  return request({
    module: "erp",
    url: `/purchases/carts/${id}`,
    method: "PATCH",
    data
  });
}

export function deletePurchaseBasket(data) {
  return request({
    module: "erp",
    url: "/purchases/carts/batch",
    method: "delete",
    data
  });
}

export function clearPurchaseBasket() {
  return request({
    module: "erp",
    url: "purchases/carts/clear",
    method: "delete"
  });
}

export function createOrderByCarts(data) {
  return request({
    module: "erp",
    url: "/purchases/order/create/local-carts",
    method: "post",
    data
  });
}

export function createLocalOrder(data) {
  return request({
    module: "erp",
    url: "/purchases/order/create/local",
    method: "post",
    data
  });
}

export function addLocalOrder(data) {
  return request({
    module: "erp",
    url: "/purchases/order-detail/create/local",
    method: "post",
    data
  });
}

export function addLocalOrderByCarts(data) {
  return request({
    module: "erp",
    url: "/purchases/order-detail/create/local-carts",
    method: "post",
    data
  });
}

export function createPlatformOrder(data) {
  return request({
    module: "erp",
    url: "/purchases/order/create/platform",
    method: "post",
    data
  });
}

export function createPlatformOrderByCarts(data) {
  return request({
    module: "erp",
    url: "/purchases/order/create/platform-carts",
    method: "post",
    data
  });
}

export function addPlatformOrder(data) {
  return request({
    module: "erp",
    url: "/purchases/order-detail/create/platform",
    method: "post",
    data
  });
}

export function addPlatformOrderByCarts(data) {
  return request({
    module: "erp",
    url: "/purchases/order-detail/create/platform-carts",
    method: "post",
    data
  });
}
// 回去页签数量
export function loadPurchasesBasketInfoNum() {
  return request({
    module: "erp",
    url: "/purchases/carts/list_info",
    method: "get"
  });
}
