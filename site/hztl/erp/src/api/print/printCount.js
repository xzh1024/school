import request from "@/utils/request";

export function addPrintCountByType(type, id) {
  let promise;
  switch (type) {
    case "orderPlan":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintPurchaseNormal(id);
      break;
    case "orderArrival":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintPurchaseReceive(id);
      break;
    case "orderReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintPurchaseReturn(id);
      break;
    case "dispatchArrival":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintPurchaseDispatch(id);
      break;
    case "customerOrder":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintSalesOrders(id, "xd");
      break;
    case "saleOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintSalesSales(id, "xs");
      break;
    case "saleReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addPrintSalesReturns(id, "xt");
      break;
    case "storeTake":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreTake(id);
      break;
    case "storeMove":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreMove(id);
      break;
    case "storeRegisterIn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreRegister(id, "RK");
      break;
    case "storeRegisterOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreRegister(id, "CK");
      break;
    case "storeReceive":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreReceive(id);
      break;
    case "storeIn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreIn(id);
      break;
    case "storePick":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStorePick(id);
      break;
    case "storeOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStoreOut(id);
      break;
    case "stetementList":
    case "collectionStetementList":
    case "transferList":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addStatementsDetail(id);
      break;
    case "logsReceipt":
    case "logsProof":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addLogsDetail(id);
      break;
    case "transferApply":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addTransferDetail(id, "QD");
      break;
    case "transferOut":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addTransferDetail(id, "KD");
      break;
    case "transferOutReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addTransferDetail(id, "KT");
      break;
    case "transferStorage":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addTransferDetail(id, "RD");
      break;
    case "transferStorageReturn":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      promise = addTransferDetail(id, "RT");
      break;
    case "partLabel":
    case "partLabelLate":
      promise = Promise.resolve(type);
      break;
    case "shippingLabel":
      promise = Promise.resolve(type);
      break;
    case "billConfirm":
      promise = Promise.resolve(type);
      break;
    case "billSettle":
      promise = Promise.resolve(type);
      break;
    default:
      promise = Promise.reject();
  }

  return promise;
}

export function addPrintPurchaseNormal(id) {
  return request({
    module: "erp",
    url: `/purchases/print-bill/order/${id}`,
    method: "post"
  });
}

export function addPrintPurchaseReceive(id) {
  return request({
    module: "erp",
    url: `/purchases/print-bill/arrival/${id}`,
    method: "post"
  });
}

export function addPrintPurchaseDispatch(id) {
  return request({
    module: "erp",
    url: `/purchases/print-bill/urgent-arrival/${id}`,
    method: "post"
  });
}

export function addPrintPurchaseReturn(id) {
  return request({
    module: "erp",
    url: `/purchases/print-bill/return/${id}`,
    method: "post"
  });
}

export function addStoreReceive(id) {
  return request({
    module: "erp",
    url: `/storage/print/stockreceiving/${id}`,
    method: "PUT"
  });
}

export function addStoreIn(id) {
  return request({
    module: "erp",
    url: `/storage/print/stockin/${id}`,
    method: "PUT"
  });
}

export function addStorePick(id) {
  return request({
    module: "erp",
    url: `/storage/print/stockpicking/${id}`,
    method: "PUT"
  });
}

export function addStoreOut(id) {
  return request({
    module: "erp",
    url: `/storage/print/stockout/${id}`,
    method: "PUT"
  });
}

export function addStoreTake(id) {
  return request({
    module: "erp",
    url: `/storage/print/stocktaking/${id}`,
    method: "PUT"
  });
}

export function addStoreMove(id) {
  return request({
    module: "erp",
    url: `/storage/print/stockmoving/${id}`,
    method: "PUT"
  });
}

export function addStoreRegister(id, type) {
  return request({
    module: "erp",
    url: "/storage/bill_assignments/print_count",
    method: "post",
    data: {
      billId: Number(id),
      billType: type
    }
  });
}

export function addPrintSalesOrders(id, billType) {
  return request({
    module: "erp",
    url: "/sales/orders/print-count",
    method: "PATCH",
    data: {
      billId: parseInt(id),
      billType
    }
  });
}

export function addPrintSalesSales(id, billType) {
  return request({
    module: "erp",
    url: "/sales/sales/print-count",
    method: "PATCH",
    data: {
      billId: parseInt(id),
      billType
    }
  });
}

export function addPrintSalesReturns(id, billType) {
  return request({
    module: "erp",
    url: "/sales/returns/print-count",
    method: "PATCH",
    data: {
      billId: parseInt(id),
      billType
    }
  });
}

export function addStatementsDetail(id) {
  return request({
    module: "erp",
    url: `/financials/print/statement/${id}`,
    method: "PUT"
  });
}

export function addLogsDetail(id) {
  return request({
    module: "erp",
    url: `/financials/print/settle/${id}`,
    method: "PUT"
  });
}

export function addTransferDetail(id, type) {
  return request({
    module: "erp",
    url: `/bills/${type}/${id}/print-count`,
    method: "PATCH"
  });
}
