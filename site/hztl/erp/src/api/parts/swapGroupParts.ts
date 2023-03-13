import request from "@/utils/request";
import { PageData } from "@/constants/interface";

export interface SwapGourpPart {
  id: number;
  code: string;
  isCustomize: boolean;
  partInfo: { name: string; brand: string; productionPlace: string }[];
}

export interface LocalPart {
  id: number;
  groupId: number;
  groupName: string;
  code: string;
  name: string;
  brand: string;
  productionPlace: string;
}

export function loadSwapGroupParts(data: {
  groupId: number;
  page: number;
  pageSize: number;
}): Promise<PageData<SwapGourpPart>> {
  return request({
    module: "erp",
    url: "/goods/replacements/details/list",
    method: "post",
    data
  });
}

export function loadLocalParts(data: {
  code: string;
  name: string;
  brand: string;
  productionPlace: string;
  codePattern: number;
  page: number;
  pageSize: number;
}): Promise<PageData<LocalPart>> {
  return request({
    module: "erp",
    url: "/goods/replacements/details/part-search",
    method: "post",
    data
  });
}
export function addLocalCode(data: { code: string; groupId: number }) {
  return request({
    module: "erp",
    url: "/goods/replacements/details/create-local",
    method: "post",
    data
  });
}

export function addAutoPartToSwapGroup(data: {
  groupId: number;
  code: string;
  name?: string;
  brand?: string;
  productionPlace?: string;
}) {
  return request({
    module: "erp",
    url: "/goods/replacements/details/create-customize",
    method: "post",
    data
  });
}

export function updateAutoPartToSwapGroup(data: {
  groupId: number;
  detailId: number;
  code: string;
  name?: string;
  brand?: string;
  productionPlace?: string;
}) {
  return request({
    module: "erp",
    url: "/goods/replacements/details/update-customize",
    method: "post",
    data
  });
}

export function removePartsFromSwapGroup(data: {
  groupId: number;
  detailIds: number[];
}) {
  return request({
    module: "erp",
    url: "/goods/replacements/details/delete",
    method: "post",
    data
  });
}
