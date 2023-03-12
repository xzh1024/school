// import { PageData } from "@/constants/interface";
import request from "@/utils/request";
import {
  SummaryRequestModel,
  SummaryResponseModel,
  SummaryModel,
  SummaryDetailResponseModel,
  SummaryDetailModel,
  ExportSummaryListParams,
  SelectSearchModel,
  PersonModel,
  ExportSummaryDetailParams,
  WarehousesUsersModle
} from "../interface";

export class PerformanceService {
  getSummaryList(
    params: SummaryRequestModel
  ): Promise<SummaryResponseModel<SummaryModel>> {
    return request({
      url: "/storage/bill_assignments/staff_summary_list",
      method: "post",
      data: params
    });
  }
  getSummaryDetail(
    params: SummaryRequestModel
  ): Promise<SummaryDetailResponseModel<SummaryDetailModel>> {
    return request({
      url: "/storage/bill_assignments/staff_bills_list",
      method: "post",
      data: params
    });
  }

  // 仓储公司列表
  getStorageCompany(params?: SelectSearchModel): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/storage-company",
      method: "get",
      params: params
    });
  }
  // 有权限的仓库列表
  getWarehouses(params?: SelectSearchModel): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/warehouses",
      method: "get",
      params: params
    });
  }
  // 获取有指定仓库权限的员工
  getWarehousesUsers(params: WarehousesUsersModle): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/warehouses/staffs",
      method: "get",
      params: params
    });
  }

  async exportSummaryList(data: ExportSummaryListParams): Promise<Blob> {
    return await request({
      module: "erp",
      url: "/storage/bill_assignments/staff_summary_export",
      method: "post",
      data,
      isExportData: true,
      contentType: "application/json; charset=utf-8",
      responseType: "blob"
    });
  }

  async exportSummaryDetail(data: ExportSummaryDetailParams): Promise<Blob> {
    return await request({
      module: "erp",
      url: "/storage/bill_assignments/staff_bills_export",
      method: "post",
      data,
      isExportData: true,
      contentType: "application/json; charset=utf-8",
      responseType: "blob"
    });
  }
}
