import request from "@/utils/request";

/* 回访列表 */
export async function visitList(params) {
  return request({
    module: "erp",
    url: "/repairs/reviews/list",
    method: "get",
    params
  });
}

/* 更新回访 */
export async function visitUpdate(data) {
  return request({
    module: "erp",
    url: "/repairs/reviews/update",
    method: "post",
    data
  });
}

/* 转交回访 */
export async function visitTransfer(data) {
  return request({
    module: "erp",
    url: "/repairs/reviews/transfer",
    method: "post",
    data
  });
}

/* 获取设置信息 */
export async function getSettings(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-company",
    method: "get",
    params
  });
}

/* 更新设置信息 */
export async function updateSettings(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-company",
    method: "post",
    data
  });
}
