import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export function getAuthSetting() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/companies/erp/authorizations/setting/whsc"
  });
}

export function updateAuthSetting() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/companies/erp/authorizations/setting/whsc"
  });
}

export function getAuthPropertys() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/companies/erp/authorizations/basic/whsc/property"
  });
}

export function getAuthStores() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/companies/erp/authorizations/basic/whsc/store"
  });
}

export function getParts(params) {
  return request({
    url: "/whsc/m8/parts/whsc",
    params
  });
}

// 授权配件
export function partsPublish(params) {
  return request({
    method: "post",
    url: "/whsc/m8/parts/whsc/publish",
    data: params
  });
}

// 取消授权配件
export function partsUnpublish(params) {
  return request({
    method: "post",
    url: "/whsc/m8/parts/whsc/unpublish",
    data: params
  });
}