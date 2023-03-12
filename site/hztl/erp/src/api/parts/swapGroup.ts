import request from "@/utils/request";

export interface SearchSwapGroupParams {
  name?: string;
  partCode?: string;
}
export interface SwapGroup {
  id: number;
  name: string;
  partsCount: string;
  codeCount: string;
}

export function loadReplacementsGroupsCodes(data: {
  code: string;
}): Promise<{ code: string }[]> {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/codes",
    method: "post",
    data
  });
}

export function loadReplacementsGroupsNames(data: {
  name: string;
}): Promise<{ name: string }[]> {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/names",
    method: "post",
    data
  });
}

export function searchSwapGroup(
  data: SearchSwapGroupParams
): Promise<{ rows: SwapGroup[] }> {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/list",
    method: "post",
    data
  });
}

export function getDefultSwapGroupName(): Promise<{ number: number }> {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/number",
    method: "get"
  });
}

export function createSwapGroup(data: { name: string }) {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/create",
    method: "post",
    data
  });
}
export function updateSwapGroup(data: { name: string; id: number }) {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/update",
    method: "post",
    data
  });
}

export function removeSwapGroup(data: { id: number }) {
  return request({
    module: "erp",
    url: "/goods/replacements/groups/delete",
    method: "post",
    data
  });
}
