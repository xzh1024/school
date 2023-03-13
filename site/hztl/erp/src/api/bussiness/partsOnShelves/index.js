import request from "@/utils/request";

export function searchPartsForShelvesOn(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/list",
    method: "post",
    data
  });
}
//配件清洗上架ex
export function cleanPartsOnShelvesEx(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/up-by-ids",
    method: "post",
    data
  });
}
//配件清洗全部上架ex
export function cleanAllPartsOnShelvesEx(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/up-by-search",
    method: "post",
    data
  });
}
export function handlePartsOnShelves(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/up-by-unverified",
    method: "post",
    data
  });
}
export function handlePartsOffShelves(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/down-by-ids",
    method: "post",
    data
  });
}
export function handleAllPartsOffShelves(data) {
  return request({
    module: "erp",
    url: "/goods/parts/platforms/down-by-search",
    method: "post",
    data
  });
}
