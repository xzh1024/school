import request from "@/utils/request";

/* 列出领退料单 */
export async function listPicks(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks",
    method: "get",
    params
  });
}

/* 列出领退料单明细 */
export async function picksDetails(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/details",
    method: "get",
    params
  });
}

/* 获取领退料单明细详情 */
export async function picksDetailsById(id) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/details/" + id,
    method: "get"
  });
}

/* 列出工单及工单配件领退料单明细 */
export async function picksDetailsForBills(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/details/for-bill",
    method: "get",
    params
  });
}
/* 获取待确认领料单 */
export async function picksReceiveToConfirm(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/to-confirm",
    method: "get",
    params
  });
}

/* 创建领料明细 */
export async function createReceiveDetail(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/details",
    method: "post",
    data,
    showLackingErr: true
  });
}
/* 修改领料明细 */
export async function updateReceiveDetail(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/details",
    method: "put",
    data
  });
}
/* 删除领料明细 */
export async function deleteReceiveDetail(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/details",
    method: "delete",
    data
  });
}
/* 确认 */
export async function confimReceive(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/confirm",
    method: "post",
    data
  });
}

/* 待确认的领料单添加明细 或 创建急采配件 */
export async function addStockToConfirm(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/receive/to-confirm",
    method: "post",
    data
  });
}
/* 列出急采配件 */
export async function listUrgentParts(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents",
    method: "get",
    params
  });
}
/* 获取急采配件状态数量 */
export async function statusCount(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents/status-count",
    method: "get",
    params
  });
}
/* 删除急采配件 */
export async function deleteParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents",
    method: "delete",
    data
  });
}
/* 撤回急采配件 */
export async function revokeParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents/revoke",
    method: "put",
    data
  });
}
/* 提交急采配件 */
export async function commitParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents/commit",
    method: "put",
    data
  });
}
/* 领取急采配件 */
export async function receiveParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents/receive",
    method: "put",
    data
  });
}
/* 退回急采配件 */
export async function returnParts(data) {
  return request({
    module: "erp",
    url: "/repairs/bills/picks/urgents/return",
    method: "put",
    data
  });
}
