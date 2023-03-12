import request from "@/utils/request";

export function loadPurchaseBillHistory(params) {
  return request({
    module: "erp",
    url: "/purchases/histories/purchase_history",
    method: "get",
    params
  });
}

export function loadPurchaseOrderHistory(params) {
  return request({
    module: "erp",
    url: "/purchases/order/query",
    method: "get",
    params
  });
}

export function loadQuotationPurchasesHistory(params) {
  return request({
    module: "erp",
    url: "/purchases/carts/history",
    method: "get",
    params
  });
}

export function loadSalesBillHistory(params) {
  return request({
    module: "erp",
    url: "/sales/sales/history",
    method: "get",
    params
  });
}

export function loadSalesOrderHistory(params) {
  return request({
    module: "erp",
    url: "/sales/orders/query",
    method: "get",
    params
  });
}

export function loadQuotationSalesHistory(params) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket/history",
    method: "get",
    params
  });
}

export function loadSalesStatsHistory(params) {
  return request({
    module: "erp",
    url: "/sales/sales/stats/monthly",
    method: "get",
    params
  });
}

export function loadStorageSummary(params) {
  return request({
    module: "erp",
    url: "/storage/stocks/stocks/other_companies/summary",
    method: "get",
    params
  });
}

export function loadStorageList(params) {
  return request({
    module: "erp",
    url: "/storage/stocks/stocks/other_companies/list",
    method: "get",
    params
  });
}

export function getBillsHistoryList(params) {
  return request({
    module: "erp",
    url: "/bills/history",
    method: "get",
    params
  });
}
