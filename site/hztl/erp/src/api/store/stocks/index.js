import request from "@/utils/request";

export function resInitStocks(data) {
  // 库存汇总列表查询
  return request({
    module: "erp",
    url: "/storage/stocks/aggregate",
    method: "post",
    data
  });
}
export function resInitStocksAggregate(data) {
  // 库存明细列表查询
  return request({
    module: "erp",
    url: "/storage/stocks",
    method: "post",
    data
  });
}

export function updateStock(data) {
  // 库存明细列表查询
  return request({
    module: "erp",
    url: "/storage/stocks/stocks",
    method: "put",
    data
  });
}
export function loadSearchStorageCompanys() {
  // 库存明细列表查询
  return request({
    module: "erp",
    url: "/storehouses/warehouses/storage-company/option"
  });
}
export function loadSearchPosition(params) {
  // 库存查询--货位查询
  return request({
    module: "erp",
    url: "/storehouses/positions/option",
    params
  });
}

export function stocksDetailsExport(data) {
  // 导出
  return request({
    module: "erp",
    url: "/storage/stocks/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
