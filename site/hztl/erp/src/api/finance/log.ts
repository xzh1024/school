import request from "@/utils/request";
import {
  BackEndExportColumn,
  BackEndPageParams,
  TotalPageData
} from "@/constants/interface";
import { FinanceLogData, FinanceLogDetail } from "@/constants/finance";

interface LogListParams {
  companyIds?: number[];
  fundAccountType?: string;
  dateType?: number;
  fromDate?: string;
  toDate?: string;
  isIncludeUnreview?: boolean;
  page: number;
  pageSize: number;
}

interface GetLogListParams extends LogListParams, BackEndPageParams {}

export async function loadLog(
  data: GetLogListParams
): Promise<TotalPageData<FinanceLogData>> {
  return await request({
    module: "erp",
    url: "/financials/logs/list_of_group",
    method: "post",
    data
  });
}

interface ExportLogListParams extends LogListParams {
  columnsSettings: BackEndExportColumn[];
}

export async function exportLogList(data: ExportLogListParams): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/logs/list_of_group/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

interface LogDetailParams extends LogListParams {
  fundAccountId?: number;
  byCompanyId?: number;
}

interface GetLogDetailParams extends LogDetailParams, BackEndPageParams {}

export async function loadLogDetail(
  data: GetLogDetailParams
): Promise<TotalPageData<FinanceLogDetail>> {
  return await request({
    module: "erp",
    url: "/financials/logs/list_of_group_detail",
    method: "post",
    data
  });
}

interface ExportLogDetailParams extends LogDetailParams {
  columnsSettings: BackEndExportColumn[];
}

export async function exportLogDetail(
  data: ExportLogDetailParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/logs/list_of_group_detail/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
