import request, { SERVICE_MODULE_MAP } from "@/utils/request";

// 会员卡服务列表
export function getMemberCardServices(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services",
    params
  });
}

// 根据会员卡服务主键ID修改会员卡状态
export function uptateMemberCardServiceStatus(params, id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/status/" + id,
    method: "post",
    data: params
  });
}

// 根据会员卡服务主键ID获取退卡详情
export function getReturnCardInfo(id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/return-card/" + id
  });
}

// 根据会员卡服务主键ID退卡
export function memberCardServiceReturnCard(params, id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/return-card/" + id,
    method: "post",
    data: params
  });
}

// 新增会员卡服务（开卡）
export function addMemberCardService(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services",
    method: "post",
    data: params
  });
}

// 根据会员卡服务主键ID修改会员卡服务
export function updateMemberCardService(params, id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/" + id,
    method: "post",
    data: params
  });
}

// 根据会员卡服务主键ID获取会员卡服务详情
export function getMemberCardServiceInfo(id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/" + id
  });
}

// 根据会员卡服务主键ID充值会员卡服务
export function memberCardServiceRecharge(params, id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/recharge/" + id,
    method: "post",
    data: params
  });
}

// 获取会员卡日志列表
export function getMemberCardLogs(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services-logs",
    params
  });
}

// 获取会员卡种列表
export function getMemberCards(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-cards",
    params
  });
}
// 新增/修改会员卡种 会员卡主键id，id=0时为新增，id>0时为修改
export function addOrUpdateMemberCard(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-cards",
    method: "post",
    data: params
  });
}
// 根据ID获取会员卡种详情
export function getMemberCardInfo(id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-cards/" + id
  });
}
// 修改会员卡状态
export function updateMemberCardStatus(params, id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-cards/status/" + id,
    method: "post",
    data: params
  });
}

// 获取客户信息列表
export function getCustomers(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/customers/info",
    params
  });
}
// 会员卡id和名称列表
export function getMemberCardOptions(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-cards/id-and-name",
    params
  });
}
// 我的客户车辆id和name列表
export function getCustomerVehicles(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/customers/vehicles/id-and-name",
    params
  });
}

// 会员卡项目包选择商品信息列表
export function getProjectGoods(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: "/goods/my",
    method: "post",
    data: params
  });
}

// 生成会员卡服务卡号
export function generatingCardServiceCardNo() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/card-no"
  });
}
// 检查会员卡服务卡号
export function checkCardServiceCardNo(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/cardno-check",
    params
  });
}
// 获取公司员工列表
export function getStaffs(params = {}) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/staffs",
    params
  });
}
// 总公司和分公司列表
export function getCompanies() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/companies/id-and-names"
  });
}
// 导出会员卡服务列表
export function exportMembersCardServices(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services/export",
    responseType: "blob",
    params
  });
}
// 会员卡服务日志列表导出
export function exportMembersCardServiceLogs(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/members-card-services-logs/export",
    responseType: "blob",
    params
  });
}

