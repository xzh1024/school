import request from "@/utils/request";

//退货单列表部分
export function reqReturnList(data) {
  return request({
    module: "erp",
    url: "/purchases/return/list",
    method: "post",
    data
  });
}
export function reqReturnBillingDelete(data) {
  return request({
    module: "erp",
    url: "/purchases/return",
    method: "delete",
    data
  });
}
export function reqReturnBillingSubmit(billId) {
  return request({
    module: "erp",
    url: "/purchases/return/workflow/submit/" + billId,
    method: "post"
  });
}
export function reqReturnBillingRecall(billId) {
  return request({
    module: "erp",
    url: "/purchases/return/workflow/recall/" + billId,
    method: "post"
  });
}

// 退货开单部分
export function reqReturnBillingInit(billId, sort, neg) {
  return request({
    module: "erp",
    url: "/purchases/return/" + billId,
    params: {
      sort,
      neg
    }
  });
}
export function reqReturnBillingCreate(data) {
  return request({
    module: "erp",
    url: "/purchases/return",
    method: "post",
    data
  });
}
export function reqReturnHeadersUpdate(data) {
  return request({
    module: "erp",
    url: "/purchases/return/" + data.id,
    method: "put",
    data
  });
}
export function reqReturnNoHistoryInit(data) {
  return request({
    module: "erp",
    url: "/purchases/return/returnable/no-history",
    method: "post",
    data
  });
}
export function reqReturnHasHistoryInit(data) {
  return request({
    module: "erp",
    url: "/purchases/return/returnable/has-history",
    method: "post",
    data
  });
}
export function reqReturnpartsInfoInit(data) {
  return request({
    module: "erp",
    url: "/purchases/return/returnable/has-history/stock/search",
    method: "post",
    data
  });
}
export function reqReturnBillingDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail/part-info",
    method: "post",
    data
  });
}
export function reqReturnAddPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail",
    method: "post",
    data
  });
}
export function reqReturnCreateAllPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return/batch-details/has-history",
    method: "post",
    data
  });
}
export function reqReturnAddAllPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail/batch",
    method: "post",
    data
  });
}
export function reqReturnCreateAllNHPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return/batch-details/nohistory",
    method: "post",
    data
  });
}
export function reqReturnAddAllNHPartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail/batch/nohistory",
    method: "post",
    data
  });
}
export function reqReturnCreateAllStoreDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return/batch-details/has-history/whole-stock",
    method: "post",
    data
  });
}
export function reqReturnAddAllStoreDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail/return-all-stock",
    method: "post",
    data
  });
}
export function reqReturnCreateAllBillDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return/batch-details/has-history/whole-bill",
    method: "post",
    data
  });
}
export function reqReturnAddAllBillDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail/return-all-bill",
    method: "post",
    data
  });
}
export function reqReturnUpdatePartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail",
    method: "put",
    data
  });
}
export function reqReturnDeletePartsDetails(data) {
  return request({
    module: "erp",
    url: "/purchases/return-detail",
    method: "delete",
    data
  });
}
