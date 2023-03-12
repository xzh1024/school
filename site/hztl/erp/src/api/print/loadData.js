import request from "@/utils/request";

import { reqReceiveDetails } from "@/api/purchase/purchaseReceive";
import { reqReturnBillingInit } from "@/api/purchase/purchaseReturn";
import { reqPurchaseDispatchArrivalDetails } from "@/api/purchase/purchaseDispatch";

export async function loadPrintDataByType(type, id, sort = "", neg = false) {
  let res;
  switch (type) {
    case "orderPlan":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadPurchasePlan(id, sort);
      break;
    case "orderArrival":
      res = reqReceiveDetails(id, sort);
      break;
    case "orderReturn":
      res = reqReturnBillingInit(id, sort, neg);
      break;
    case "dispatchArrival":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = reqPurchaseDispatchArrivalDetails(id, sort);
      break;
    case "customerOrder":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadSalesNormal(id, sort);
      break;
    case "saleOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadSalesOut(id, sort);
      break;
    case "saleReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadSalesReturn(id, sort, neg);
      break;
    case "storeTake":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStoreTake(id, sort);
      break;
    case "storeMove":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStoreMove(id, sort);
      break;
    case "storeRegisterIn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStoreRegister(id, sort, "RK");
      break;
    case "storeRegisterOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStoreRegister(id, sort, "CK");
      break;
    case "stetementList":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStatementsDetail(id, sort, "rb");
      break;
    case "collectionStetementList":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadStatementsDetail(id, sort, "lg");
      break;
    case "transferApply":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransfer(id, sort, "QD");
      break;
    case "transferOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransfer(id, sort, "KD");
      break;
    case "transferOutReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransfer(id, sort, "KT", neg);
      break;
    case "transferStorage":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransfer(id, sort, "RD");
      break;
    case "transferStorageReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransfer(id, sort, "RT", neg);
      break;
    case "transferList":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadTransferList(id, sort);
      break;
    case "insurance":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = insurancesDetail({ id, sort });
      break;
    case "billConfirm":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = offerDetail({ id, sort });
      break;
    case "billSettle":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = settlesDetail({ id, sort });
      break;
    case "pick":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = pickPrint({ id, sort });
      break;
    case "returnPart":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = pickPrint({ id, sort });
      break;
    case "partLabel":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadPartLabels(id);
      break;
    case "partLabelLate":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadPartLabelsLate(id);
      break;
    case "shippingLabel":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      res = loadPartShippingLabel(id, sort);
      break;
  }
  return res;
}

/* 领料单详情 */
export function pickPrint(data) {
  return request({
    module: "erp",
    url: `/repairs/bills/picks/full-detail?id=${data.id}`,
    method: "get",
    data
  });
}

/* 确认单详情 */
export function settlesDetail(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/settles/print",
    method: "get",
    params: data
  });
}

/* 报价单详情 */
export function offerDetail(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/offers/print",
    method: "get",
    params: data
  });
}

/* 保险单详情 */
export function insurancesDetail({ id, sort }) {
  return request({
    module: "erp",
    url:
      "/repairs/insurances/detail?id=" + id + "&sort=" + sort + "&type=print",
    method: "get"
  });
}

export function loadPurchasePlan(id, sort) {
  return request({
    module: "erp",
    url: `/purchases/order/${id}`,
    method: "get",
    params: {
      sort
    }
  });
}

export function loadSalesNormal(id, sort) {
  return request({
    module: "erp",
    url: `/sales/orders/${id}/print`,
    params: {
      sort
    }
  });
}

export function loadStoreTake(id, sort) {
  return request({
    module: "erp",
    url: `/storage/print/stocktaking/${id}`,
    params: {
      sort
    }
  });
}

export function loadStoreMove(id, sort) {
  return request({
    module: "erp",
    url: `/storage/print/stockmoving/${id}`,
    params: {
      sort
    }
  });
}
export function loadStoreRegister(id, sort, type) {
  return request({
    module: "erp",
    url: "/storage/bill_assignments/print",
    method: "get",
    params: {
      billId: Number(id),
      billType: type,
      sort
    }
  });
}

export function loadSalesOut(id, sort) {
  return request({
    module: "erp",
    url: `/sales/sales/${id}/print`,
    params: {
      sort
    }
  });
}

export function loadSalesReturn(id, sort, neg) {
  return request({
    module: "erp",
    url: `/sales/returns/${id}/print`,
    params: {
      sort,
      neg
    }
  });
}

export function loadLogsDetail(id, sort) {
  return request({
    module: "erp",
    url: `financials/print/settle/${id}`,
    params: {
      sort
    }
  });
}

export function loadStatementsDetail(id, sort, type) {
  return request({
    module: "erp",
    url: `/financials/print/statement-${type}/${id}`,
    params: {
      sort
    }
  });
}

export function loadTransfer(id, sort, type, neg) {
  //调拨申请单: QD;调拨出库单: KD;调拨入库单: RD;调拨出库退货单: KT;调拨入库退货单: RT;
  return request({
    module: "erp",
    url: `/bills/${type}/${id}/print`,
    params: {
      sort,
      neg
    }
  });
}
export function loadTransferList(id, sort) {
  return request({
    module: "erp",
    url: `/financials/statements-db/print/${id}`,
    params: {
      sort
    }
  });
}

export function loadPartLabels(id) {
  return request({
    module: "erp",
    url: `/purchases/arrival/printer/${id}`,
    method: "get"
  });
}

export function loadPartLabelsLate(id) {
  return request({
    module: "erp",
    url: `/storage/stocks/stocks/label_printer/${id}`,
    method: "get"
  });
}

export function loadPartShippingLabel(id, sort) {
  return request({
    module: "erp",
    url: `/print-label/${sort}/${id}`,
    method: "get"
  });
}
