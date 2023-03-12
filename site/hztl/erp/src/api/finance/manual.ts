import request from "@/utils/request";

import {
  BackEndExportColumn,
  BackEndPageParams,
  TotalPageData
} from "@/constants/interface";
import { ManulData } from "@/constants/finance/manul";

export interface ManulParams {
  companyIds?: number[];
  cooperatorId?: number;
  paymentTypes?: number[];
  description?: string;
  statuses?: number[];
  checkNumber?: string;
  dateType?: number;
  fromDate?: string;
  toDate?: string;
  fundAccountId?: number[];
  billNo?: string;
  fundAccountType?: string[];
  businessType?: string[];
}

export interface LoadgListParams extends ManulParams, BackEndPageParams {}

export interface FundCategoriesParams {
  keyword?: string; // 关键字
  status?: string; // 状态 停用：disable 启用：enable
  type?: string; // 收支方向，不传全部 收入：in 支出：out
  queryBillType?: string; // 列出收支类目方式 none:无需任何方式 common:公共收支类目 special:特殊收支类目
  pageSize?: number; // 列出数量
  billTypes?: string[]; // 映射的单据类型 传null为全部单据类型 传[]为所有公共类型 传['XXX']为所有包含XXX单据类型
}

export interface FundCategories {
  id?: number;
  name?: string;
  fullName?: string;
  parentNames?: [];
  code?: string;
  type?: string;
  status?: string;
  billTypes: string[];
}

export async function loadManulList(
  data: LoadgListParams
): Promise<TotalPageData<ManulData>> {
  return await request({
    module: "erp",
    url: "/financials/manuls/list",
    method: "post",
    data
  });
}

interface ExportManulParams extends ManulParams {
  columnsSettings: BackEndExportColumn[];
}

export async function exportManulList(data: ExportManulParams): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/manuls/list/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

export async function createManul(data: ManulData) {
  return await request({
    module: "erp",
    url: "/financials/manuls/create",
    method: "post",
    data
  });
}

export async function getAuthorityFundAccountList() {
  return await request({
    module: "erp",
    url: "financials/manuls/fund-account-list",
    method: "get"
  });
}

export async function updateManul(data: ManulData) {
  return await request({
    module: "erp",
    url: "/financials/manuls/update",
    method: "post",
    data
  });
}

export async function reviewManual(data: {
  reviewMode: 0 | 1;
  ids?: number[];
  reviewSearchReq?: ManulParams;
}) {
  return await request({
    module: "erp",
    url: "/financials/manuls/review",
    method: "post",
    data
  });
}

export async function transferManul(data: {
  srcFundAccountId: number;
  dstFundAccountId: number;
  paymentDate: string;
  amount: number;
  checkDate: string;
  checkNumber?: string;
  handledBy?: string;
  description?: string;
  remark?: string;
}) {
  return await request({
    module: "erp",
    url: "/financials/manuls/transfer",
    method: "post",
    data
  });
}

export async function removeManulLog(data: { id: number }) {
  return await request({
    module: "erp",
    url: "/financials/manuls/delete",
    method: "post",
    data
  });
}

export async function loadManulsCompanies(data: { operatorType: number }) {
  return await request({
    module: "erp",
    url: "/financials/manuls/companies",
    method: "post",
    data
  });
}

export async function searchFundCategories(
  params: FundCategoriesParams
): Promise<FundCategories[]> {
  return await request({
    module: "erp",
    url: "financials/fund-categories/option",
    method: "get",
    params
  });
}
