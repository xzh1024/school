import { BackEndPageParams, PageData } from "@/constants/interface";
import request from "@/utils/request";
import { ApplySearchFilters, TransferApplySearchData } from "./interface";

export interface ApplySearchParams
  extends ApplySearchFilters,
    BackEndPageParams {
  sort?: string;
  allocOutCompanyId?: number; // 调出分公司
}

interface ApplySearchRes extends PageData<TransferApplySearchData> {
  brands: string[];
  productionPlaces: string[];
  isPartExist: boolean;
}

export function fetchApplySearchList(
  data: ApplySearchParams
): Promise<ApplySearchRes> {
  return request({
    url: `/bills/search/apply`,
    method: "post",
    data
  });
}
