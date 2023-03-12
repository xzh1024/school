import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { FormData } from "../constants";

export interface BindAuthPlatFormData extends FormData {
  platformKey: string; // 平台Key
}

export interface PlatformWarehousesParams {
  platformKey: string; // 平台Key
  dealerId: string; // 平台账号ID
}

export interface PlatformWarehousesItem {
  facilityId: string; // 平台仓库ID
  facilityName: string; // 平台仓库名称
}

export interface PlatformSmsCaptchaData {
  platformKey: string; // 平台Key
  phone: string; // 平台手机号
}

export function getAuthPlatform(): Promise<{
  has: boolean;
  loginUrl: string;
}> {
  return request({
    url: "/platforms/auth/has-store",
    method: "get"
  });
}

export function bindAuthPlatform(forceUpdate = false): AxiosPromise<unknown> {
  return request({
    url: `/platforms/auth/bind-store`,
    method: "post",
    data: {
      forceUpdate
    }
  });
}

export function bindAuthPlatformId(
  data: BindAuthPlatFormData
): AxiosPromise<unknown> {
  return request({
    url: `/platforms/auth/bind`,
    method: "post",
    data
  });
}

export function getPlatformWarehouses(
  params: PlatformWarehousesParams
): Promise<PlatformWarehousesItem[]> {
  return request({
    url: `/platforms/auth/warehouses`,
    method: "get",
    params
  });
}

export function getPlatformSmsCaptcha(
  data: PlatformSmsCaptchaData
): AxiosPromise<unknown> {
  return request({
    url: `/platforms/auth/sms`,
    method: "post",
    data
  });
}
