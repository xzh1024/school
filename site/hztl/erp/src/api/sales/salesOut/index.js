import request from "@/utils/request";

export function reqSalesOutList(data) {
  // 销售出库列表
  return request({
    module: "erp",
    url: "/sales/sales/list",
    method: "post",
    data
  });
}

export function salesOutBillSubmit(data) {
  // 销售出库提交
  return request({
    module: "erp",
    url: "/sales/sales/submit",
    method: "post",
    data,
    useAuditErrors: true
  });
}

export function salesOutBillCancelSubmit(params) {
  // 销售出库撤回提交
  return request({
    module: "erp",
    url: "/sales/sales/" + params + "/cancel-submit",
    method: "post"
  });
}

// export function salesOutPartsSearch(data) {
//     // 销售出库查询配件
// 	return request({
// 		module: 'erp',
//         url: '/sales/sales/search',
// 		method: 'post',
// 		data
// 	});
// }

// export function salesOutPartsDetails(data) {
//     // 销售出库查询配件二级列表
// 	return request({
// 		module: 'erp',
//         url: '/sales/sales/subs',
// 		method: 'post',
// 		data
// 	});
// }

// export function salesOutBeforeAddBill(data) {
//     // 销售出库新增获取弹框数据
// 	return request({
// 		module: 'erp',
//         url: '/sales/sale-details/qty-price-create',
// 		method: 'post',
// 		data
// 	});
// }

// export function salesOutBeforeUpdateBill(data) {
//     // 销售出库修改获取弹框数据
// 	return request({
// 		module: 'erp',
//         url: '/sales/sale-details/qty-price-update',
// 		method: 'post',
// 		data
// 	});
// }
// 本地开单/新增
export function createSalesOutBill(data) {
  // 销售出库单开单
  return request({
    module: "erp",
    url: "/sales/sales",
    method: "post",
    data
  });
}
// 平台开单/新增
// export function platformCreateSalesOutBill(data) {
//     // 销售出库单开单/新增
// 	return request({
// 		module: 'erp',
//         url: '/sales/sales/platform',
// 		method: 'post',
// 		data
// 	});
// }
export function addOutBillDetail(data) {
  // 新增销售出库明细
  return request({
    module: "erp",
    url: "/sales/sale-details",
    method: "post",
    data
  });
}
export function editOutBillDetail(data) {
  // 编辑销售出库明细单
  return request({
    module: "erp",
    url: "sales/sale-details",
    method: "PATCH",
    data
  });
}
export function salesOutBillDelete(params) {
  // 销售出库单据删除
  return request({
    module: "erp",
    url: "/sales/sales/" + params,
    method: "delete"
  });
}
export function salesOutBillUpdatePrice(data) {
  // 销售出库单据批量修改价格
  return request({
    module: "erp",
    url: "/sales/sales/batch-update-prices",
    method: "post",
    data
  });
}
export function salesOutBillDetails(params) {
  // 销售出库单明细含详情
  return request({
    module: "erp",
    url: "/sales/sales/" + params,
    method: "get"
  });
}
export function salesOutBillDetailsList(params) {
  // 销售出库单明细列表
  return request({
    module: "erp",
    url: "/sales/sale-details",
    method: "get",
    params
  });
}
export function salesOutBillGrossProfit(params) {
  // 销售出库单毛利
  return request({
    module: "erp",
    url: "/sales/sales/" + params + "/gross-profit",
    method: "get"
  });
}
export function salesOutBillScanPrice(data) {
  // 销售出库单价格浏览
  return request({
    module: "erp",
    url: "/sales/sale-details/prices",
    method: "post",
    data
  });
}

export function salesOutBillDetailDelete(data) {
  // 销售出库单明细删除
  return request({
    module: "erp",
    url: "/sales/sale-details",
    method: "DELETE",
    data
  });
}
export function updateSalesOutBillDetailHeaders(data) {
  // 销售出库单明细单头更新
  return request({
    module: "erp",
    url: "/sales/sales",
    method: "put",
    data
  });
}
export function salesOutOtherPositions(data) {
  // 新增销售出库单，数量不足选择其它货位(已开成功)
  return request({
    module: "erp",
    url: "/sales/sale-details/batch-add",
    method: "post",
    data
  });
}
export function salesOutOtherPositionsUrgent(data) {
  // 新增销售出库单 - 数量不足选择其它货位(直接急件)
  return request({
    module: "erp",
    url: "/sales/sales/batch-create",
    method: "post",
    data
  });
}
export function salesOutUrgent(id) {
  // 外采驳回其他货位
  return request({
    module: "erp",
    url: "/sales/sales-details/" + id + "/other-positions",
    method: "get"
  });
}
// export function saveSalesOutUrgent(data) {
//     // 新增销售出库单，保存急件修改
// 	return request({
// 		module: 'erp',
//         url: '/sales/sale-details/update-urgent',
// 		method: 'post',
// 		data
// 	});
// }

// 开单-库存不足接口
// export async function addLackBill(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/sales-details/handle-lack',
//         method: 'post',
//         data
//     });
//     return res
// }

// 本地批量添加
// export async function batchCreateSalesOutBill(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/sales/batch-create',
//         method: 'post',
//         data
//     });
//     return res
// }
// 平台批量添加
// export async function platformBatchCreateSalesOutBill(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/sales/batch-create/platform',
//         method: 'post',
//         data
//     });
//     return res
// }
// 外采驳回
// export async function purchaseReject(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/sales-details/handle-reject',
//         method: 'post',
//         data
//     });
//     return res
// }
// 终止外采驳回
// export async function endPurchaseReject(id) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/sales-details/'+ id +'/terminate-rejected-qty',
//         method: 'put'
//     });
//     return res
// }
// 获取销售出库单库存价格信息
export async function queryQtyPrice(data) {
  const res = await request({
    module: "erp",
    url: "/sales/formulate/query-qty-price",
    method: "post",
    data
  });
  return res;
}
// 报价篮生成销售出库订单
// export async function basketToSalesoutBill(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/quotation-basket/create-sale-sale',
// 		method: 'post',
// 		data
//     });
//     return res
// }
// 报价篮添加销售出库单
// export async function basketAddSalesoutBill(data) {
//     let res = await request({
//         module: 'erp',
//         url: '/sales/quotation-basket/add-to-sale-sale',
// 		method: 'post',
// 		data
//     });
//     return res
// }

// export function reqSettingSalesMode(data) {
//   return request({
//     module: "erp",
//     url: "/settings/params/sales",
//     method: "post",
//     data
//   });
// }
