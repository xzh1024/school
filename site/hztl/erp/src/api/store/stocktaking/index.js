import request from "@/utils/request";

export function stocktakingBillList(data) {
  // 盘点单列表查询
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/list",
    method: "post",
    data
  });
}

export function stocktakingBillQuery(data) {
  // 获取盘点单详情，包括单头、明细列表（后端接口命名不准确）
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_details/list",
    method: "post",
    data
  });
}
//盘点单导出
export function stocktakingBillExport(data) {
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_details/export",
    method: "post",
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob",
    data
  });
}
export function stocktakingBillCreate(data) {
  // 创建盘点单
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/create",
    method: "post",
    data
  });
}
export function stocktakingBillUpdate(data) {
  // 修改盘点单
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/update",
    method: "post",
    data
  });
}
export function stocktakingBillDetailCreate(data) {
  // 创建盘点单明细
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_details/create",
    method: "post",
    data
  });
}
export function stocktakingBillDetailUpdate(data) {
  // 修改盘点单明细
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_details/update",
    method: "post",
    data
  });
}
export function stocktakingStockGroupsQuery(data) {
  // 盘点单开单库存组查询（按货主、配件ID、货位、性质分组，也就是聚合了批次）
  return request({
    module: "erp",
    url: "/storage/stocks/stocks/list_of_taking_groups",
    method: "post",
    data
  });
}

export function stocktakingStocksQuery(data) {
  // 盘点单开单库存明细查询
  return request({
    module: "erp",
    url: "/storage/stocks/stocks/list_of_taking",
    method: "post",
    data
  });
}
export function stocktakingSubsList(data) {
  // 获取盘点单明细子表列表
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_subs/list",
    method: "post",
    data
  });
}

export function stocktakingSubmit(data) {
  // 盘点单提交
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/commit",
    method: "post",
    data
  });
}
export function stocktakingRevoke(data) {
  // 盘点单撤回提交
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/revoke",
    method: "post",
    data
  });
}
export function stocktakingWarehouseAudit(data) {
  // 盘点单库房审核
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/warehouse_audit",
    method: "post",
    data
  });
}
export function stocktakingFinancialAudit(data) {
  // 盘点单财务审核
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/financial_audit",
    method: "post",
    data
  });
}
export function stocktakingDelete(data) {
  // 盘点单删除
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking/delete",
    method: "post",
    data
  });
}
export function stocktakingDetailDelete(data) {
  // 盘点单明细删除
  return request({
    module: "erp",
    url: "/storage/stocktaking/stocktaking_details/delete",
    method: "post",
    data
  });
}
