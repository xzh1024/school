import request from "@/utils/request";

export function reqPurchaseDemandsList(data) {
  return request({
    module: "erp",
    url: "/purchases/demand",
    method: "post",
    data
  });
}
