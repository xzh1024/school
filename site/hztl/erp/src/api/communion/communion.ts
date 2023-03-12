/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
import qs from "qs";
export function deleteContacts(id: number) {
  // 删除往来单位
  return request({
    module: "erp",
    url: "/cooperators/" + id,
    method: "delete"
  });
}

export function createCooperators(data: any) {
  // 创建往来单位
  return request({
    module: "erp",
    url: "/cooperators",
    method: "post",
    data
  });
}

export function stopContacts(data: any, id: number) {
  // 停用往来单位
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/disable",
    method: "post",
    data
  });
}

export function enableContacts(id: number) {
  // 启用往来单位
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/enable",
    method: "post"
  });
}

export function updateBasicInformation(data: any, id: number) {
  // 更新往来单位基本信息
  return request({
    module: "erp",
    url: "/cooperators/" + id,
    method: "put",
    data
  });
}

export function resBasicCooperators(id: number) {
  // 获取单位基本信息
  return request({
    module: "erp",
    url: "/cooperators/" + id,
    method: "get"
  });
}

export function cooperatorsContactsInfo(id: number) {
  // 获取单位基本信息
  return request({
    module: "erp",
    url: "/cooperators/cooperator-contacts-info?cooperatorId=" + id,
    method: "get"
  });
}

export function searchCooperators(params: any) {
  // 搜索类型往来单位列表
  return request({
    module: "erp",
    url: "/cooperators/search",
    method: "get",
    params
  });
}
export function searchAllCooperators(params: any) {
  // 搜索全部往来单位列表
  return request({
    module: "erp",
    url: "/cooperators/ls2",
    params
  });
}

export function searchCooperatorsBranches(params: any) {
  // 搜索全部往来单位名称列表+分公司名称列表
  return request({
    module: "erp",
    url: "/cooperators/list-with-company",
    params
  });
}

export function checkSelectCooperators(
  id: number,
  params: { type: string }
): Promise<{ code: number; perm: boolean }> {
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/check_availability",
    params
  });
}
export function updateSelectCooperators(
  id: number,
  params: { type: string; code: number }
) {
  // 搜索往来单位列表2
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/make_available",
    method: "put",
    params
  });
}

export function updateInvoice(data: any) {
  // 更新单位开票信息
  return request({
    module: "erp",
    url: "/cooperators/invoice",
    method: "put",
    data
  });
}
export function resInvoice(params: any) {
  // 获取单位开票信息
  return request({
    module: "erp",
    url: "/cooperators/invoice/" + params,
    method: "get"
  });
}

export function resCooperatorsContacts(id: number) {
  // 获取单位联系方式
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/contacts",
    method: "get"
  });
}
export function editOperationContacts(data: any) {
  // 编辑联系人
  return request({
    module: "erp",
    url: "/cooperators/contacts/" + data.id,
    method: "put",
    data
  });
}
export function addOperationContacts(data: any, id: number) {
  // 添加联系人
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/contacts",
    method: "post",
    data
  });
}
export function deleteOperationContacts(data: any) {
  // 删除联系人
  return request({
    module: "erp",
    url: "/cooperators/contacts",
    method: "delete",
    data
  });
}

export function resUnitCustomers(params: any) {
  // 获取往来单位客户设置信息
  return request({
    module: "erp",
    url: "/cooperators/" + params + "/customers",
    method: "get"
  });
}

export function updateCustomers(data: any, id: number) {
  // 更新客户信息
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/customers",
    method: "post",
    data
  });
}

export function resBusinessMen(id: number) {
  // 往来单位业务人员列表
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/business-men",
    method: "get"
  });
}

export function updateMansList(data: any, id: number) {
  // 跟新往来单位业务员
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/business-men",
    method: "post",
    data
  });
}

export function resUnitSuppliers(params: any) {
  // 供应商信息
  return request({
    module: "erp",
    url: "/cooperators/" + params + "/suppliers",
    method: "get"
  });
}

export function updateSuppliers(data: any, id: number) {
  // 更新供应商信息
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/suppliers",
    method: "post",
    data
  });
}

export function resUnitLogistics(params: any) {
  // 物流信息
  return request({
    module: "erp",
    url: "/cooperators/" + params + "/logistics",
    method: "get"
  });
}

export function updateLogistics(data: any, id: number) {
  // 更新新增物流信息
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/logistics",
    method: "post",
    data
  });
}

export function resUnitInsurance(params: any) {
  // 保险公司
  return request({
    module: "erp",
    url: "/cooperators/" + params + "/insurance-companies",
    method: "get"
  });
}

export function updateInsurance(data: any, id: number) {
  // 更新保险信息
  return request({
    module: "erp",
    url: "/cooperators/" + id + "/insurance-companies",
    method: "post",
    data
  });
}

// 下拉选择框往来单位接口-只适用于下拉
export function selectCooperators(params: any) {
  return request({
    module: "erp",
    url: "/cooperators/ls",
    method: "get",
    params
  });
}

export function analysisSupplierCode(params: any) {
  // 供应商解析邀请码
  return request({
    url: "/customers/invitation-code-parse",
    method: "get",
    params
  });
}
export function addSupplierCode(data: any) {
  // 邀请码添加供应商
  return request({
    contentType: "application/x-www-form-urlencoded",
    url: "/customers",
    method: "post",
    data: qs.stringify(data)
  });
}
export function mergeCooperatorsList(params: any) {
  // 合并往来单位搜索列表
  return request({
    module: "erp",
    url: "/cooperators/for-merge",
    method: "get",
    params
  });
}
export function checkCooperators(params: any) {
  // 检查往来单位
  return request({
    module: "erp",
    url: "/cooperators/dependents",
    method: "get",
    params
  });
}
export function mergeCheckedCooperators(data: any) {
  // 合并往来单位
  return request({
    module: "erp",
    url: "/cooperators/merge",
    method: "post",
    data
  });
}

export function fastCooperators(data: any) {
  // 快速新增往来单位
  return request({
    module: "erp",
    url: "/cooperators/fast-create",
    method: "post",
    data
  });
}

export function fastCooperatorsCode() {
  // 快速新增往来单位客户编码
  return request({
    module: "erp",
    url: "/cooperators/new-code",
    method: "get"
  });
}

export function createOrEditCooperators(data: any) {
  // 新增/编辑往来单位
  return request({
    module: "erp",
    url: "/cooperators",
    method: "post",
    data
  });
}
export function searchDepartments(params: any) {
  return request({
    module: "erp",
    url: "/account-sets/organizations/departments",
    method: "get",
    params
  });
}
