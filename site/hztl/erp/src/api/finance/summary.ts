import request from "@/utils/request";
import {
  BackEndExportColumn,
  BackEndPageParams,
  TotalPageData
} from "@/constants/interface";
import {
  FinanceSubSummaryData,
  FinanceSummaryData,
  FinanceSummaryDetail
} from "@/constants/finance";

export interface SummaryListParams {
  companyIds?: number[];
  fundAccountType?: string;
  dateType?: number;
  dateStart?: string;
  dateEnd?: string;
  receivePayType?: number[];
  settleStatus?: number[];
  businessManId?: number;
  businessType: 0 | 1; // 业务类型：0-应收付、1-物流代收
  cooperatorType?: 0 | 1; // 物流代收汇总 一级汇总单位类型 0-物流公司、1-往来单位
}

interface GetSummaryListParams extends SummaryListParams, BackEndPageParams {
  sort?: string;
}

export async function getSummaryList(
  data: GetSummaryListParams
): Promise<TotalPageData<FinanceSummaryData>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level1",
    method: "post",
    data
  });
}
export async function getLgSummaryList(
  data: GetSummaryListParams
): Promise<TotalPageData<FinanceSummaryData>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level1",
    method: "post",
    data
  });
}
interface ExportSummaryListParams extends SummaryListParams {
  columnsSettings: BackEndExportColumn[];
}

export async function exportSummaryList(
  data: ExportSummaryListParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level1/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
export async function exportLgSummaryList(
  data: ExportSummaryListParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level1/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

interface GetSubSummaryParams extends GetSummaryListParams {
  businessType: 1; // 业务类型: 只能 1-物流代收
  cooperatorId: number; //物流公司或往来单位混用
}

export async function getSubSummaryList(
  data: GetSubSummaryParams
): Promise<TotalPageData<FinanceSubSummaryData>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level1_sub",
    method: "post",
    data
  });
}
export async function getLgSubSummaryList(
  data: GetSubSummaryParams
): Promise<TotalPageData<FinanceSubSummaryData>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level1_sub",
    method: "post",
    data
  });
}

interface ExportSummarySubParams extends SummaryListParams {
  businessType: 1; // 业务类型: 只能 1-物流代收
  cooperatorId: number; //物流公司或往来单位混用
  columnsSettings: BackEndExportColumn[];
}

export async function exportSummarySub(
  data: ExportSummarySubParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level1_sub/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
export async function exportLgSummarySub(
  data: ExportSummarySubParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level1_sub/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
interface GetSummaryDetailParams extends GetSummaryListParams {
  cooperatorId?: number;
  logisticsId?: number;
}

export async function getSummaryDetail(
  data: GetSummaryDetailParams
): Promise<TotalPageData<FinanceSummaryDetail>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level2",
    method: "post",
    data
  });
}
export async function getLgSummaryDetail(
  data: GetSummaryDetailParams
): Promise<TotalPageData<FinanceSummaryDetail>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level2",
    method: "post",
    data
  });
}
export async function getLgSummaryDetail3(
  data: GetSummaryDetailParams
): Promise<TotalPageData<FinanceSummaryDetail>> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level3",
    method: "post",
    data
  });
}
interface ExportSummaryDetailParams extends SummaryListParams {
  cooperatorId?: number; // 往来单位ID
  logisticsId?: number; // 物流公司ID
  columnsSettings: BackEndExportColumn[];
}

export async function exportSummaryDetail(
  data: ExportSummaryDetailParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/rb/level2/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
export async function exportLgSummaryDetail(
  data: ExportSummaryDetailParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level2/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
export async function exportLgSummaryDetail3(
  data: ExportSummaryDetailParams
): Promise<Blob> {
  return await request({
    module: "erp",
    url: "/financials/receivable_payables/summary/lg/level3/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
