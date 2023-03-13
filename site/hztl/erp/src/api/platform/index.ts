import request from "@/utils/request";
import { Platform } from "@/constants/platform";

export function fetchPlatformList(): Promise<null | Platform[]> {
  return request({
    module: "erp",
    url: "/platforms/auth/ec",
    method: "get"
  });
}

interface GetUrlParams {
  type: string;
  id: number;
}

interface GetLicenseParams {
  platformKey: string;
}
export interface PlatformLicense {
  licenseCode: string; // 当前生效授权码
  urlAuth: string; // 平台授权url
}

export function getPlatformLicense(
  data: GetLicenseParams
): Promise<PlatformLicense> {
  return request({
    module: "erp",
    url: "/platforms/auth/license",
    method: "post",
    data,
    ignoreErr: true
  });
}

export function getPlatformUrl(params: GetUrlParams): Promise<any> {
  return request({
    module: "erp",
    url: "/platforms/apis/urls",
    method: "get",
    params
  });
}

interface SearchedPart {
  id: number;
  code: string;
  name: string;
  brand: string;
  productionPlace: string;
}

interface SearchedPartsRes {
  parts: SearchedPart[];
}

export function searchParts(data: {
  keyword: string;
}): Promise<SearchedPartsRes> {
  return request({
    module: "erp",
    url: "/platforms/mapping/parts-search",
    method: "post",
    data
  });
}

export interface BillMapPart {
  code: string;
  name: string;
  brand: string;
  productionPlace: string;
  orderDetailId: number;
  mappingId: number;
  mappingname: string;
  mappingcode: string;
  mappingbrand: string;
  mappingproductionPlace: string;
}

export interface BillMapRes {
  needMappingCooperator: boolean;
  needMappingParts: boolean;
  cooperatorMap: {
    name: string;
    mappingId: number;
    mappingName: string;
  };
  partsMap: BillMapPart[];
}

export async function platformBillMap(data: {
  billId: number;
  billType: 0 | 1;
  platformKey: string;
}): Promise<BillMapRes> {
  return request({
    module: "erp",
    url: "/platforms/mapping/pre-mapping",
    method: "post",
    data
  });
}

export function fetchDataServiceList(): Promise<null | Platform[]> {
  return request({
    module: "erp",
    url: "/platforms/auth/data-services",
    method: "get"
  });
}

interface ToggleParams {
  platformKey: string;
}

export function toggleDataService(data: ToggleParams) {
  return request({
    module: "erp",
    url: "/platforms/auth/toggle",
    method: "post",
    data
  });
}

export function getPaidGoods(params: any) {
  return request({
    module: "erp",
    url: "/platforms/apis/goods/paid",
    method: "get",
    params
  });
}
