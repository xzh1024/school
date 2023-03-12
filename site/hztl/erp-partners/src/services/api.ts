/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export async function loadUnOpenPartnerList() {
  return await request("/partners/list");
}

export async function sendSms(data: any) {
  return await request("/partners/sms", {
    method: "POST",
    data,
  });
}

export async function loadPartnerList() {
  return await request("/partners/my");
}

export async function loadPlatList() {
  return await request("/customers/HNW");
}

export async function featchHasPlat() {
  return await request("/customers/has");
}


export async function loadCustomerList(params: any) {
  return await request("/customers", { params });
}

export async function relevanceCustomer(data: any) {
  return await request("/customers/relate", {
    method: "POST",
    data,
  });
}

export async function getDealerParams(data: any) {
  return await request("/partners/verify", {
    method: "POST",
    data,
  });
}

export async function createPartner(data: any) {
  return await request("/partners", {
    method: "POST",
    data,
  });
}

export async function changePartner({ partnerKey, ...data }: any) {
  return await request(`/partners/${partnerKey}`, {
    method: "POST",
    data,
  });
}

export async function loadPartList(params: any) {
  return await request("/parts/list", { params });
}

export async function publishParts(data: any) {
  return await request("/parts/publish", {
    method: "POST",
    data,
  });
}

export async function unpublishParts(data: any) {
  return request("/parts/unpublish", {
    method: "POST",
    data,
  });
}

export async function toGetBase() {// 获取当前开关接口
  return await request("/base");
}

export async function toPostBranchMode(data: any) {//关闭状态打开时
  return await request("/branch-mode", {
    method: "POST",
    data,
  });
}

export async function loadPlatformList(params: any) {//已经开通的电商列表及信息
  return await request("/partners/my", { params });
}
export async function loadUnPlatformList(params: any) {//未开通的电商列表
  return await request("/partners/list", { params });
}
export async function toGetAuthCode(params: any) {//获取授权码
  return await request("/partners/auth-code", { params });
}

export async function toGetAuthToken(params: any) {//获取第三方平台登陆的token
  return await request("/partners/platform-token", { params });
}

export async function loadWarehouseList(params: any) {//获取三方平台仓库列表（开思）
  return await request("/partners/warehouses", { params });
}

export async function clearStock() {//同步全部库存按钮调用接口
  return await request("/parts/clear-stock", { method: "POST",});
}
