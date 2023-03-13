import request from "@/utils/request";

export function salesReturnSearchHasHistoryParts(data) {
  // 销售退货开单查询有历史配件
  return request({
    module: "erp",
    url: "/sales/returns/search/has-history",
    method: "post",
    data
  });
}

export function salesReturnSearchNoHistoryParts(data) {
  // 销售退货开单查询无历史配件
  return request({
    module: "erp",
    url: "/sales/returns/search/no-history",
    method: "post",
    data
  });
}

export function salesReturnList(data) {
  // 销售退货列表
  return request({
    module: "erp",
    url: "/sales/returns/list",
    method: "post",
    data
  });
}

export function getSalesReturnDetailsDefault(params) {
  // 销售退货开单获取默认值
  return request({
    module: "erp",
    url: "/sales/returns/details/returnable-info",
    method: "get",
    params
  });
}

export function createSalesReturnDetails(data) {
  // 销售退货开单
  return request({
    module: "erp",
    url: "/sales/returns",
    method: "post",
    data
  });
}

export function salesReturnDetails(id, sort) {
  // 销售退货明细子表(包含单头)
  return request({
    module: "erp",
    url: "/sales/returns/" + id + "/details/list_with_bill",
    method: "get",
    params: {
      sort
    }
  });
}

export function updateSalesReturnDetailsHeaders(data, id) {
  // 更新销售退货明细单头
  return request({
    module: "erp",
    url: "/sales/returns/" + id,
    method: "put",
    data
  });
}

export function deleteSalesReturnBills(params) {
  // 删除销售退货单据
  return request({
    module: "erp",
    url: "/sales/returns/" + params,
    method: "delete"
  });
}

export function updateSalesReturnDetailsRow(data, id) {
  // 销售退货更新明细
  return request({
    module: "erp",
    url: "/sales/returns/details/" + id,
    method: "put",
    data
  });
}

export function shareFreight(data) {
  // 销售退货分摊运费
  return request({
    module: "erp",
    url: "/sales/returns/share_freight",
    method: "post",
    data
  });
}

export function addSalesReturnDetails(data) {
  // 销售退货明细新增单据
  return request({
    module: "erp",
    url: "/sales/returns/details",
    method: "post",
    data
  });
}

export function deleteSalesReturnDetails(data, id) {
  // 删除销售退货明细
  return request({
    module: "erp",
    url: "/sales/returns/" + id + "/details",
    method: "delete",
    data
  });
}

export function returnSalesReturnHeadersBills(data, id) {
  // 销售退货整单退(单头已创建)
  return request({
    module: "erp",
    url: "/sales/returns/" + id + "/return_whole_sale",
    method: "post",
    data
  });
}

export function returnSalesReturnBills(data) {
  // 销售退货整单退(无单头)
  return request({
    module: "erp",
    url: "/sales/returns/return_whole_sale",
    method: "post",
    data
  });
}

export function salesReturnBillSubmit(id) {
  // 销售退货单提交
  return request({
    module: "erp",
    url: "/sales/returns/" + id + "/submit",
    method: "put"
  });
}

export function salesReturnBillCancel(id) {
  // 销售退货单撤回提交
  return request({
    module: "erp",
    url: "/sales/returns/" + id + "/cancel",
    method: "put"
  });
}

export function salesReturnCostPriceAudit(data) {
  // 销售退货单撤回提交
  return request({
    module: "erp",
    url: "sales/returns/cost-price-audit",
    method: "put",
    data
  });
}
