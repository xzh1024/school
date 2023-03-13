import request from "@/utils/request";

export function BusinessScopes(data) {
  return request({
    url: "/alliances/business-scopes?type=" + data,
    method: "get"
  });
}

export function AllBrands(params) {
  return request({
    module: "erp",
    url: "/settings/brands",
    method: "get",
    params
  });
}

// 最新获取所有品牌
export function newAllBrands(data) {
  return request({
    module: "erp",
    url: "/settings/brands/list",
    method: "post",
    data
  });
}
