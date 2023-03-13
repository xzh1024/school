import request from "@/utils/request";

/* 健康诊断报告列表 */
export async function healthsList(params) {
  return request({
    module: "erp",
    url: "/repairs/check-healths/list",
    method: "get",
    params
  });
}

/* 健康诊断报告列表 */
export async function reportsList(params) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/list",
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
