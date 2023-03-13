import request from "@/utils/request";

export function setDeaultPriceAndPosition(data) {
  return request({
    module: "erp",
    url: "/purchases/default/price_position",
    method: "post",
    data
  });
}
