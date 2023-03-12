import { BackEndPageParams, PageData } from "@/constants/interface";
import { SeachPartFilters } from "@/constants/interface/part";
import request from "@/utils/request";
import { TransferOutSearchData } from "./interface";

export interface SearchParams extends SeachPartFilters, BackEndPageParams {
  mode: number;
  sort?: string;
  relatedCompanyId?: number; // 调入分公司
}

interface SearchRes extends PageData<TransferOutSearchData> {
  brands: string[];
  productionPlaces: string[];
  isPartExist: boolean;
}

export function fetchSearchList(data: SearchParams): Promise<SearchRes> {
  return request({
    url: `/bills/search`,
    method: "post",
    data
  });
}

export function getBillDefultMode(
  module: string
): Promise<{
  value: number;
}> {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-staff",
    method: "get",
    params: {
      module,
      type: "billingMode"
    }
  });
}
