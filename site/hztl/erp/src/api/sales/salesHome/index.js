import request from "@/utils/request";

export function reqSalesHomeList(data) {
  // 销售订单列表
  return request({
    module: "erp",
    url: "/sales/orders/list",
    method: "post",
    data
  });
}
export function reqSalesBillList(data) {
  // 销售订单开单搜索查询列表
  return request({
    module: "erp",
    url: "/sales/orders/search",
    method: "post",
    data
  });
}
export function createNewSalesBill(data) {
  // 新增销售订单开开单
  return request({
    module: "erp",
    url: "/sales/orders",
    method: "post",
    data
  });
}
export function createBatchNewSalesBill(data) {
  // 新增销售订单开开单
  return request({
    module: "erp",
    url: "/sales/orders/batch-create",
    method: "post",
    data
  });
}
export function addNewSalesBill(data) {
  // 添加销售订单明细
  return request({
    module: "erp",
    url: "/sales/order-details",
    method: "post",
    data
  });
}
export function addBatchNewSalesBill(data) {
  // 批量添加销售订单明细
  return request({
    module: "erp",
    url: "/sales/order-details/batch-create",
    method: "post",
    data
  });
}
export function updateSalesBillHeaders(data) {
  // 更新销售订单开开单单头
  return request({
    module: "erp",
    url: "/sales/orders",
    method: "put",
    data
  });
}
export function beforeAddNewSalesBill(data) {
  // 获取新增销售订单开单相关数据（新增之前无单据id时）
  return request({
    module: "erp",
    url: "/sales/formulate/query-qty-price",
    method: "post",
    data
  });
}
export function beforeAddNewSalesBillHasId(data) {
  // 获取新增销售订单开单相关数据（新增之前有单据id时）
  return request({
    module: "erp",
    url: "/sales/formulate/query-qty-price",
    method: "post",
    data
  });
}
export function resSalesBillDeatils(id, sort) {
  // 获取销售订单开单明细和单头
  return request({
    module: "erp",
    url: "/sales/orders/" + id,
    method: "get",
    params: {
      sort
    }
  });
}
export function resSalesBillDeatilList(params) {
  // 获取销售订单开单明细表
  return request({
    module: "erp",
    url: "/sales/order-details",
    method: "get",
    params
  });
}
export function deleteSalesBill(params) {
  // 删除销售订单
  return request({
    module: "erp",
    url: "/sales/orders/" + params,
    method: "delete"
  });
}
// export function addOldSalesBill(data) {
//     // 新增已有销售单据
// 	return request({
// 		module: 'erp',
//         url: '/sales/order-details',
// 		method: 'post',
// 		data
// 	});
// }
export function deleteSalesBillDeatil(data) {
  // 删除销售订单明细
  return request({
    module: "erp",
    url: "/sales/order-details",
    method: "delete",
    data
  });
}
export function editSalesBillDeatil(data) {
  // 编辑销售订单明细
  return request({
    module: "erp",
    url: "/sales/order-details/update",
    method: "post",
    data
  });
}
// export function resSwapList(data) {
//     // 互换组列表
// 	return request({
// 		module: 'erp',
//         url: '/sales/orders/replacements',
// 		method: 'post',
// 		data
// 	});
// }
export function reqSalesCustomerDefault(id) {
  // 销售-往来单位信息
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/customer-defaults",
    method: "get"
  });
}
export function resSalesGrossProfit(params) {
  // 销售-毛利率
  return request({
    module: "erp",
    url: "/sales/orders/" + params + "/gross-profit",
    method: "get"
  });
}
export function salesConfirmReceipt(params) {
  // 销售-确认收货
  return request({
    module: "erp",
    url: "/sales/orders/" + params + "/receiving",
    method: "post"
  });
}
export function salesBillAudit(data) {
  // 销售-审批
  return request({
    module: "erp",
    url: "/sales/orders/audit",
    method: "post",
    data,
    useAuditErrors: true
  });
}
export function salesBillSubmit(data) {
  // 销售-提交
  return request({
    module: "erp",
    url: "sales/orders/submit",
    method: "post",
    data
  });
}
export function salesBillCancelSubmit(params) {
  // 销售-撤回提交
  return request({
    module: "erp",
    url: "/sales/orders/" + params + "/cancel-submit",
    method: "post"
  });
}
export function salesBillCancelParts(id, data) {
  // 销售-取消配件
  return request({
    module: "erp",
    url: `/sales/orders/term/${id}`,
    method: "post",
    data
  });
}
export function salesBillTransSale(data) {
  // 销售-订单转销售出库
  return request({
    module: "erp",
    url: "/sales/orders/trans-sale",
    method: "post",
    data
  });
}
export function salesBillPlatformAudit(data) {
  // 销售-平台审批
  return request({
    module: "erp",
    url: `/sales/orders/audit`,
    method: "post",
    data
  });
}
