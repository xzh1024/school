import request from "@/utils/request";

/* 在场工单列表 */
export async function listExtraFee(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/extra-fees",
    method: "get",
    params
  });
}

/* 创建工单 */
export async function createExtraFee(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/extra-fees",
    method: "post",
    data
  });
}

/* 修改工单服务项目 */
export async function updateExtraFee(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/extra-fees",
    method: "put",
    data
  });
}

/* 删除工单项目 */
export async function deleteExtraFee(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/extra-fees",
    method: "delete",
    data
  });
}
