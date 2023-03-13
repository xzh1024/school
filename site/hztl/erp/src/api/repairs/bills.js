import request from "@/utils/request";

/* 在场工单列表 */
export async function listBills(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/repairs",
    method: "get",
    params
  });
}

/* 工单列表 */
export async function billsList(params) {
  return request({
    module: "erp",
    url: "/repairs/bills",
    method: "get",
    params
  });
}

/* 创建工单 */
export async function createBills(data) {
  return request({
    module: "erp",
    url: "/repairs/bills",
    method: "post",
    data
  });
}
/* 修改工单 */
export async function updateBills(data) {
  return request({
    module: "erp",
    url: "/repairs/bills",
    method: "put",
    data
  });
}
/* 删除工单 */
export async function deleteBills(data) {
  return request({
    module: "erp",
    url: "/repairs/bills",
    method: "delete",
    data
  });
}
/* 获取工单详情 */
export async function getBillsDetail(id) {
  return request({
    module: "erp",
    url: "/repairs/bills/" + id,
    method: "get"
  });
}

/* 工单服务项目列表 */
export async function getBillsItems(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/items",
    method: "get",
    params
  });
}
/* 创建工单服务项目 */
export async function createBillsItems(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items",
    method: "post",
    data
  });
}
/* 列出维修技师班组及班组技师 */
export async function getBillTechnicians() {
  return request({
    module: "erp",
    url: "/repairs/bills/items/technicians",
    method: "get"
  });
}
/* 修改工单服务项目 */
export async function updateBillsItems(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items",
    method: "put",
    data
  });
}

/* 工单报价确认 */
export async function confirmBills(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/confirm",
    method: "put",
    data
  });
}
/* 删除工单项目 */
export async function deleteBillsItems(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items",
    method: "delete",
    data
  });
}

/* 工单配件材料列表 */
export async function getBillsParts(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/parts",
    method: "get",
    params
  });
}
/* 创建工单配件材料 */
export async function createBillsParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/parts",
    method: "post",
    data
  });
}

/* 修改工单配件材料 */
export async function updateBillsParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/parts",
    method: "put",
    data
  });
}

/* 删除工单配件材料 */
export async function deleteBillsParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/parts",
    method: "delete",
    data
  });
}

/* 建议项目列表 */
export async function getBillsSuggestions(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/suggestions",
    method: "get",
    params
  });
}
/* 获取工单额外信息（包含数量等信息） */
export async function getBillsExtraInfo(id) {
  return request({
    module: "erp",
    url: `/repairs/bills/${id}/info`,
    method: "get"
  });
}
/* 创建工单建议项目 */
export async function createBillsSuggestions(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/suggestions",
    method: "post",
    data
  });
}

/* 修改工单建议项目 */
export async function updateBillsSuggestions(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/suggestions",
    method: "put",
    data
  });
}

/* 删除工单建议项目 */
export async function deleteBillsSuggestions(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/suggestions",
    method: "delete",
    data
  });
}

/* 服务项目派工 */
export async function dispatchItem(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items/dispatch",
    method: "put",
    data
  });
}
/* 服务项目开工 */
export async function startItem(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items/start",
    method: "put",
    data
  });
}
/* 服务项目完工 */
export async function completeItem(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items/complete",
    method: "put",
    data
  });
}
/* 服务项目返工 */
export async function reworkItem(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/items/rework",
    method: "put",
    data
  });
}
/* 获取、预览 工单报价确认单 */
export async function offersView(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/offers/view",
    method: "post",
    data
  });
}
/* 查看按钮-获取、预览 工单报价确认单 */
export async function offersCheckView(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/customer-offers/view",
    method: "post",
    data
  });
}
/* 工单报价确认单保存 */
export async function offersSave(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/offers/save",
    method: "post",
    data
  });
}
/* 工单报价确认单提交 */
export async function offersPush(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/customer-offers/push",
    method: "put",
    data
  });
}
/* 工单报价确认 */
export async function offersCommit(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/offers/commit",
    method: "put",
    data
  });
}
/* 获取、预览 工单结算确认单 */
export async function settlesView(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/settles/view",
    method: "post",
    data
  });
}
/* 查看按钮-获取、预览 工单结算确认单 */
export async function settlesCheckView(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/customer-settles/view",
    method: "post",
    data
  });
}
/* 工单报价结算单保存 */
export async function settlesSave(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/settles/save",
    method: "post",
    data
  });
}
/* 工单报价结算单提交 */
export async function settlesPush(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/customer-settles/push",
    method: "put",
    data
  });
}
/* 工单完检 */
export async function inspectBills(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/inspect",
    method: "put",
    data
  });
}
/* 工单结算确认 */
export async function settlesCommit(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/settles/commit",
    method: "put",
    data
  });
}
/* 返车间 */
export async function reinspect(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/reinspect",
    method: "put",
    data
  });
}
/* 列出领退料单 */
export async function getBillsPicksList(params) {
  return request({
    module: "erp",
    url: `/repairs/bills/picks`,
    method: "get",
    params
  });
}
/* 列出领退料单明细 */
export async function getBillsPicksDetails(params) {
  return request({
    module: "erp",
    url: `/repairs/bills/picks/details`,
    method: "get",
    params
  });
}
/* 已领料的领料单退料 */
export async function returnRecieve(data) {
  return request({
    module: "erp",
    url: `/repairs/bills/picks/receive/return`,
    method: "post",
    data
  });
}

/* 维修综合查询-维修业务-返修 */
export async function rework(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/rework",
    method: "put",
    data
  });
}

/* 维修综合查询-维修业务-上传健康档案 */
export async function uploadHealth(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/upload-health",
    method: "put",
    data
  });
}

/* 维修综合查询-维修业务-导出 */
export async function billsExport(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

/* 维修综合查询-保险业务-列表 */
export async function getInsurancesList(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/search-list",
    method: "get",
    params
  });
}

/* 维修综合查询-保险业务-导出 */
export async function getInsurancesListExport(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/search-list-export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

/* 修改工单车辆档案快照 */
export async function updateSnapshot(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/vehicle-snapshot",
    method: "put",
    data
  });
}
