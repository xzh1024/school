import request from "@/utils/request";

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
