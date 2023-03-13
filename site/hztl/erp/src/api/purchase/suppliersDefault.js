import request from "@/utils/request";

export function reqPurchaseSupplierDefault(id) {
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/supplier-defaults"
  });
}
