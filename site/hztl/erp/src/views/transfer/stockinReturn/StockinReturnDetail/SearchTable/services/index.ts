import request from "@/utils/request";
import { BackEndPageParams, PageData } from "@/constants/interface";
import { SearchPartData, SearchStockData } from "../constants";
import { SearchPartItem, SearchStockItem } from "../../constants";

export interface SearchPartParams extends SearchPartData, BackEndPageParams {
  sort?: string;
}

export function fetchReturnablePartList(
  params: SearchPartParams
): Promise<PageData<SearchPartItem>> {
  return request({
    url: "/bills/returnable",
    method: "get",
    params
  });
}

export function fetchReturnableStockList(
  params: SearchStockData
): Promise<{
  rows: SearchStockItem[];
}> {
  return request({
    url: "/bills/returnable-stocks",
    method: "get",
    params
  });
}
