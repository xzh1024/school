import request from "@/utils/request";

export function reqPurchasePartsSuppliers(partId) {
  return request({
    module: "erp",
    url: "/purchases/order/part/cooperator/" + partId
  });
}
