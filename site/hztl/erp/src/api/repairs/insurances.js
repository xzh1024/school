import request from "@/utils/request";

/* 保险单列表 */
export async function insurancesList(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/list",
    method: "get",
    params
  });
}

/* 更新保险单 */
export async function updateInsurances(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/update",
    method: "post",
    data
  });
}

/* 结算保险单 */
export async function settleInsurances(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/settle",
    method: "post",
    data
  });
}

/* 保险项目列表 */
export async function insurancesItemList(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/items/list",
    method: "get",
    params
  });
}

/* 新增保险项目 */
export async function createInsurancesItem(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/items/create",
    method: "post",
    data
  });
}
/* 删除保险项目 */
export async function deleteInsurancesItem(data) {
  return request({
    module: "erp",
    url:
      "/repairs/insurances/items/delete?id=" +
      data.id +
      "&insuranceId=" +
      data.insuranceId,
    method: "delete",
    data
  });
}
/* 修改保险项目 */
export async function updateInsurancesItem(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/items/update",
    method: "post",
    data
  });
}

/* 保险配件列表 */
export async function insurancesPartsList(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/parts/list",
    method: "get",
    params
  });
}

/* 新增保险配件 */
export async function createInsurancesParts(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/parts/create",
    method: "post",
    data
  });
}
/* 删除保险配件 */
export async function deleteInsurancesParts(data) {
  return request({
    module: "erp",
    url:
      "/repairs/insurances/parts/delete?id=" +
      data.id +
      "&insuranceId=" +
      data.insuranceId,
    method: "delete",
    data
  });
}
/* 修改保险配件 */
export async function updateInsurancesParts(data) {
  return request({
    module: "erp",
    url: "/repairs/insurances/parts/update",
    method: "post",
    data
  });
}
