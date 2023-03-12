/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export function searchSaleVehModel(keyword: any) {
  return request({
    module: "erp",
    url: "/sales/sale-details/sale-veh-models",
    method: "post",
    data: { keyword }
  });
}
// 配件详情列表
export function getPartDetailsAndStocks(data: any) {
  return request({
    url: "/storage/stocks/query",
    method: "post",
    data
  });
}
// 商品+库存 单个查询
export function getStorageStocksBySingle(data: any) {
  return request({
    module: "erp",
    url: "/bills/single-query",
    method: "post",
    data
  });
}
// 开单明细 单个查询
export function getBillsPurchaseBySingle(data: any) {
  return request({
    module: "erp",
    url: "/bills/purchase/single-query",
    method: "post",
    data
  });
}
//指定仓库查询默认货位
export function getBillsPurchaseDefaultPosition(data: {
  warehouseId: number;
  partId: number;
  property: string;
}) {
  return request({
    module: "erp",
    url: "/bills/purchase/default-position",
    method: "post",
    data
  });
}

// 商品+库存 批量查询
export function getStorageStocksByBatch(data: any): Promise<{}> {
  return request({
    module: "erp",
    url: "/bills/batch-query",
    method: "post",
    data
  });
}
// 获取默认仓库货位
export function getDefaultWarehouses(data: any): Promise<{}> {
  return request({
    module: "erp",
    url: "/bills/default-warehouses",
    method: "post",
    data
  });
}
