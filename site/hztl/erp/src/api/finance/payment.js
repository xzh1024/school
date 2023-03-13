import request from "@/utils/request";

export async function loadPaymentSummary(data) {
  return await request({
    module: "erp",
    url: "/financials/statement_sums/list_of_group",
    method: "post",
    data
  });
}

export async function loadHappendDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/statement_sums/list_of_happend ",
    method: "post",
    data
  });
}

export async function loadSettleDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/statement_sums/list_of_settle ",
    method: "post",
    data
  });
}

export async function loadSettleDetailSub(id) {
  return await request({
    module: "erp",
    url: `/financials/statement_sums/${id}/pays_of_settle`,
    method: "get"
  });
}

export async function loadBillDetailSub(id) {
  return await request({
    module: "erp",
    url: `/financials/statement_sums/${id}/bills_of_settle`,
    method: "get"
  });
}

export async function loadContactDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/eceivable_payables/list",
    method: "post",
    data
  });
}

export async function loadPaymentList(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/list",
    method: "post",
    data
  });
}

export async function loadPaymentStatementList(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/list`,
    method: "post",
    data
  });
}

export async function loadPaymentStatementDetail(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/info_by_id`,
    method: "post",
    data
  });
}

export async function loadSubPaymentDetail(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/subs_by_id`,
    method: "post",
    data
  });
}

export async function updateSubPayment(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/modify_num`,
    method: "post",
    data
  });
}

export async function resetSubPaymentCheckNum(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/reset`,
    method: "post",
    data
  });
}

export async function createPaymentStatementList(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/create`,
    method: "post",
    data
  });
}

export async function registerPaymentStatementList(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/register`,
    method: "post",
    data
  });
}

export async function updatePaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/update`,
    method: "post",
    data
  });
}

export async function updatePaymentStatementDetail(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/update_detail`,
    method: "post",
    data
  });
}

export async function removePaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/delete`,
    method: "post",
    data
  });
}

export async function commitPaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/commit`,
    method: "post",
    data
  });
}

export async function revokePaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/commit_revoke`,
    method: "post",
    data
  });
}

export async function confirmPaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/confirm`,
    method: "post",
    data
  });
}
export async function auditPaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/audit`,
    method: "post",
    data
  });
}

export async function revokeConfirmPaymentStatement(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/confirm_revoke`,
    method: "post",
    data
  });
}

export async function loadReceivablePayablesList(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/rb/list_of_summary",
    method: "post",
    data
  });
}

export async function loadCollectionStatementList(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/lg/list_of_summary",
    method: "post",
    data
  });
}
//调拨对账汇总查询
export async function loadReceivableTransferList(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/list_of_allocation_summary",
    method: "post",
    data
  });
}

export async function loadReceivablePayablesDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/list_of_detail",
    method: "post",
    data
  });
}
//调拨对账去对账明细列表
export async function loadReceivableTransferDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/list_of_allocation_detail",
    method: "post",
    data
  });
}

export async function loadReceivablePayablesParts(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/list_of_part",
    method: "post",
    data
  });
}

export async function getPaymentStatementNumber(data, type) {
  return await request({
    module: "erp",
    url: `/financials/statements-${type}/wait_handle_num`,
    method: "post",
    data
  });
}

export async function updateSettlementType(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/update_settlement_type",
    method: "post",
    data
  });
}

// 未结补充登记
export async function createUnsettleSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/supplement",
    method: "post",
    data
  });
}
// 应收付补充登记
export async function createPaymentSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-rb/supplement",
    method: "post",
    data
  });
}
// 物流代收补充登记
export async function createCollectionSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-lg/supplement",
    method: "post",
    data
  });
}
// 对账前补充登记(调拨)
export async function createTransferBefore(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/supplement_allocation",
    method: "post",
    data
  });
}
// 调拨补充登记
export async function createTransferSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/supplement",
    method: "post",
    data
  });
}
// 删除补充登记
export async function deleteSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/delete",
    method: "post",
    data
  });
}
//调拨对账单最新结算信息
export async function loadPaymentDetail(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/settle_info",
    method: "post",
    data
  });
}
//对账单付款
export async function payStatementsDb(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/pay",
    method: "post",
    data
  });
}
//对账单重新付款（收款驳回后）
export async function rePayStatementsDb(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/repay",
    method: "post",
    data
  });
}
//收款驳回
export async function payStatementsRefuse(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/receive_refuse",
    method: "post",
    data
  });
}
//对账单收款确认
export async function payStatementsReceive(data) {
  return await request({
    module: "erp",
    url: "/financials/statements-db/receive",
    method: "post",
    data
  });
}
// 应收付对账单详情导出
export function exportPaymentStatements(data) {
  return request({
    module: "erp",
    url: "/financials/statements-rb/export_by_id",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
