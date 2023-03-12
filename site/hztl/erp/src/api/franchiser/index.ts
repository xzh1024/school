import request from "@/utils/request";

/** 总店 **/
// 获取加盟店权限设置
export function getFranchiserAuthSettings(): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/auth",
    method: "get"
  });
}
// 修改加盟店权限设置
export function eidtFranchiserAuthSettings(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/auth",
    method: "post",
    data
  });
}
// 加盟待审核列表
export function getPendingFranchisersList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/wait_audit",
    method: "post",
    data
  });
}
// 审核加盟店申请
export function auditFranchiserApply(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/audit",
    method: "post",
    data
  });
}
// 加盟店管理列表
export function getFranchisersList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/joins",
    method: "post",
    data
  });
}
// 未授权配件列表
export function getUnauthorizedPartsList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/unauthorized",
    method: "post",
    data
  });
}
// 授权配件
export function authorizParts(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/add",
    method: "post",
    data
  });
}
// 取消授权配件
export function revokeParts(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/cancel",
    method: "post",
    data
  });
}
// 加盟店配件详情列表
export function getFranchiserPartsList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/list",
    method: "post",
    data
  });
}
// 提醒加盟店补货
export function remindFranchiserPurchase(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/remind",
    method: "post",
    data
  });
}
// 加盟店采购来往订单列表
export function getFranchiserPurchasesBillList(
  data: unknown
): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/orders",
    method: "post",
    data
  });
}
// 加盟店销售统计列表
export function getFranchiserSalesDetailsList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/head/parts/sales",
    method: "post",
    data
  });
}

/** 加盟店 **/
// 获取总店权限设置
export function getMainStoreAuths(params: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/auths",
    method: "get",
    params
  });
}
// 申请加盟列表
export function getJoinRecordsList(): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/list_joins",
    method: "get"
  });
}
// 申请加盟
export function joinMainStore(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/join",
    method: "put",
    data
  });
}
// 退出加盟
export function exitMainStore(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/exit",
    method: "post",
    data
  });
}
// 加盟店已授权配件查询
export function getAuthorizedPartsList(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/parts",
    method: "post",
    data
  });
}
// 加盟店配件补货
export function purchaseParts(data: unknown): Promise<unknown> {
  return request({
    module: "erp",
    url: "/franchisees/sub/parts/supply",
    method: "post",
    data
  });
}
