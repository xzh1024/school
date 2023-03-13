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

/* 获取设置信息 */
export async function getWashingsSet(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/set",
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

/* 洗车列表 */
export async function getWashingsList(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/list",
    method: "get",
    params
  });
}

/* 洗车工列表 */
export async function getWasherList(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/washer-list",
    method: "get",
    params
  });
}

/* 洗车开单 */
export async function washAdd(data) {
  return request({
    module: "erp",
    url: "/repairs/washings/create",
    method: "post",
    data
  });
}

/* 洗车单更新 */
export async function washUpdate(data) {
  return request({
    module: "erp",
    url: "/repairs/washings/update",
    method: "post",
    data
  });
}

/* 开始洗车 */
export async function washStart(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/start-washing",
    method: "get",
    params
  });
}

/* 删除洗车单 */
export async function washDelete(data) {
  return request({
    module: "erp",
    url: "/repairs/washings/delete",
    method: "delete",
    data
  });
}

/* 获取会员卡列表 */
export async function washDiscount(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/washing-discount",
    method: "get",
    params
  });
}

/* 获取会员信息 */
export async function memberInfo(params) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/member-info",
    method: "get",
    params
  });
}

/* 修改洗车单车辆档案快照 */
export async function updateWashingsSnapshot(data) {
  return request({
    module: "erp",
    url: "/repairs/washings/vehicle-snapshot",
    method: "put",
    data: data
  });
}
