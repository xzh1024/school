import request from "@/utils/request";

export function reqImportSalseOrders(data) {
  return request({
    module: "erp",
    url: "/sales/orders/import",
    method: "post",
    data
  });
}
export function reqImportPurchasesOrders(data) {
  return request({
    module: "erp",
    url: "/purchases/order/create/import",
    method: "post",
    data
  });
}
export function reqImportPurchasesFixedPrice(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/import2",
    method: "post",
    data
  });
}
export function reqImportPurchasesBills(data) {
  return request({
    module: "erp",
    url: "/purchases/arrival/import",
    method: "post",
    data
  });
}
export function reqImportParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/import",
    method: "post",
    data
  });
}
export function reqImportCooperators(data) {
  return request({
    module: "erp",
    url: "/cooperators/import",
    method: "post",
    data
  });
}
export function reqImportStocks(data) {
  return request({
    module: "erp",
    url: "/storage/stocks/import",
    method: "post",
    data
  });
}
export function reqImportPaymentsOrReceptions(data) {
  return request({
    module: "erp",
    url: "/financials/receivable_payables/pay_import",
    method: "post",
    data
  });
}
export function reqImportBillHis(data) {
  return request({
    module: "erp",
    url: "/settings/import",
    method: "post",
    data
  });
}
export function reqImportStockMoveBill(data) {
  return request({
    module: "erp",
    url: "/purchases/arrival/import",
    method: "post",
    data
  });
}
export function reqImportRepairsItems(data) {
  return request({
    module: "erp",
    url: "/repairs/items/import",
    method: "post",
    data
  });
}
export function reqImportTransferBill(data, type) {
  return request({
    module: "erp",
    url: `/bills/import/${type}`,
    method: "post",
    data
  });
}
export function reqImportVehicles(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/import",
    method: "post",
    data
  });
}
export function reqImportStockMoving(data) {
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/import",
    method: "post",
    data
  });
}
