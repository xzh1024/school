import request from "@/utils/request";

export function getSalesPrintGoodsLabelInfo(bill) {
  return request({
    url: `/sales/sales/${bill.billId}/label_print`,
    method: "get"
  });
}

export function getPurchaseReturnPrintGoodsLabelInfo(bill) {
  return request({
    url: `/purchases/return/${bill.billId}/label_print`,
    method: "get"
  });
}

export function getTransferPrintGoodsLabelInfo(bill) {
  return request({
    url: `/bills/${bill.billType}/${bill.billId}/label_print`,
    method: "get"
  });
}

export function getLogisticsDeliverReturnPrintGoodsLabelInfo(bill) {
  return request({
    url: `/storage/logistics_registrations/to_deliver/${bill.billId}/label_print`,
    method: "get"
  });
}
