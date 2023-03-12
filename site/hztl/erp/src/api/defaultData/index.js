import request from "@/utils/request";

export async function getDefaultMainWarehouse() {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/by-main",
    method: "get"
  });
}
