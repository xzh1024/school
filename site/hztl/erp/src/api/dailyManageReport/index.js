import request from "@/utils/request";

// 收款
// 明细
export async function financialLogIn(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-in",
    method: "get",
    params
  });
}
// 汇总
export async function financialLogInSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-in/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function financialLogInGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-in/group",
    method: "get",
    params
  });
}

// 付款
// 明细
export async function financialLogOut(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-out",
    method: "get",
    params
  });
}
// 汇总
export async function financialLogOutSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-out/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function financialLogOutGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/financial-log-out/group",
    method: "get",
    params
  });
}

// 采购
// 明细
export async function purchase(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/purchase",
    method: "get",
    params
  });
}
// 汇总
export async function purchaseSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/purchase/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function purchaseGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/purchase/group",
    method: "get",
    params
  });
}

// 销售
// 明细
export async function sale(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/sale",
    method: "get",
    params
  });
}
// 汇总
export async function saleSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/sale/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function saleGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/sale/group",
    method: "get",
    params
  });
}

// 调拨入库
// 明细
export async function allocIn(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-in",
    method: "get",
    params
  });
}
// 明细分组
export async function allocInGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-in/group",
    method: "get",
    params
  });
}
// 汇总
export async function allocInSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-in/summary",
    method: "get",
    params
  });
}

// 调拨出库
// 明细
export async function allocOut(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-out",
    method: "get",
    params
  });
}
// 明细分组
export async function allocOutGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-out/group",
    method: "get",
    params
  });
}
// 汇总
export async function allocOutSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/alloc-out/summary",
    method: "get",
    params
  });
}

// 盘点
// 明细
export async function stocktaking(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/stocktaking",
    method: "get",
    params
  });
}
// 明细分组
export async function stocktakingGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/stocktaking/group",
    method: "get",
    params
  });
}
// 汇总
export async function stocktakingSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/stocktaking/summary",
    method: "get",
    params
  });
}

// 收发货登记
// 明细
export async function logisticReg(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/logistic-registration",
    method: "get",
    params
  });
}
// 明细分组
export async function logisticRegGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/logistic-registration/group",
    method: "get",
    params
  });
}
// 汇总
export async function logisticRegSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/logistic-registration/summary",
    method: "get",
    params
  });
}

// 应收
// 明细
export async function payIn(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-in",
    method: "get",
    params
  });
}
// 汇总
export async function payInSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-in/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function payInGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-in/group",
    method: "get",
    params
  });
}

// 应付
// 明细
export async function payOut(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-out",
    method: "get",
    params
  });
}
// 汇总
export async function payOutSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-out/summary",
    method: "get",
    params
  });
}
// 明细分组
export async function payOutGroup(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/receivable-payable-out/group",
    method: "get",
    params
  });
}

// 净利润
export async function netProfitSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/net-profit/summary",
    method: "get",
    params
  });
}

// 导出
// 汇总
export async function exportSummary(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/export/summery",
    method: "get",
    params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
// 明细
export async function exportDetail(params) {
  return request({
    module: "erp",
    url: "/reports/businesses/export",
    method: "get",
    params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
