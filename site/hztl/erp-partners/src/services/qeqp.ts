/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
import {
  StaffParamsModel,
  StaffAuthParamsModel,
  CustomerParamModel,
  ErpCustomerParamModel,
  CustomerBindParamModel
} from "@/constant/interface";


/* 企鹅汽配-授权管理 */
// 员工列表
export async function loadStaffList(data: StaffParamsModel) {
  return await request("/companies/staffs", { params: data });
}

// 生成授权码
export async function generateStaffAuthCodeList(data: StaffAuthParamsModel) {
  return await request("/companies/staffs/generate", {
    method: "POST",
    data
  });
}
// 授权码解除授权
export async function unauthStaffList(data: StaffAuthParamsModel) {
  return await request("/companies/staffs/unauth", {
    method: "POST",
    data
  });
}

/* 企鹅汽配-参数设置 */
// 价格类型列表
export async function getPriceTypes() {
  return await request("/price-types");
}

// 配件仓库列表
export async function getPartsStores() {
  return await request("/parts/store");
}

export async function getSettingParam() {
  return await request("/companies/settings");
}

export async function saveSettingParam(data: any) {
  return await request("/companies/settings", {
    method: "POST",
    data
  });
}

/* 企鹅汽配-客户关系管理 */
// 平台客户列表
export async function loadCustomerList(data: CustomerParamModel) {
  return await request("/customers/QEQP", { params: data });
}

// ERP本地客户列表
export async function loadErpCustomerList(data: ErpCustomerParamModel) {
  return await request("/customers", { params: data });
}

// 平台客户批量关联ERP本地客户
export async function batchBindCustomer(data: CustomerBindParamModel) {
  return await request("/customers/relate/batch", {
    method: "POST",
    data
  });
}
// 平台客户批量解除绑定ERP本地客户
export async function batchUnbindCustomer(data: CustomerBindParamModel) {
  return await request("/customers/unbind/batch", {
    method: "POST",
    data
  });
}
