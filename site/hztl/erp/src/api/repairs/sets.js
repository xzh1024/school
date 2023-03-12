import request from "@/utils/request";

/* 列出维修服务套餐 */
export async function listSets(params) {
  return request({
    module: "erp",
    url: "/repairs/sets/normal",
    method: "get",
    params
  });
}

/* 创建维修服务套餐 */
export async function createSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/normal",
    method: "post",
    data
  });
}

/* 删除维修服务套餐 */
export async function deleteSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/normal",
    method: "delete",
    data
  });
}

/* 更新维修服务套餐 */
export async function updateSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/normal",
    method: "put",
    data
  });
}

/* 列出维修服务套餐 */
export async function listFixSets(params) {
  return request({
    module: "erp",
    url: "/repairs/sets/tree",
    method: "get",
    params
  });
}

/* 列出定保套餐树 */
export async function listBandTree(params) {
  return request({
    module: "erp",
    url: "/repairs/sets/tree/tree",
    method: "get",
    params
  });
}

/* 创建定保套餐 */
export async function createFixSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/tree",
    method: "post",
    data
  });
}

/* 删除定保套餐 */
export async function deleteFixSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/tree",
    method: "delete",
    data
  });
}

/* 更新定保套餐 */
export async function updateFixSets(data) {
  return request({
    module: "erp",
    url: "/repairs/sets/tree",
    method: "put",
    data
  });
}
