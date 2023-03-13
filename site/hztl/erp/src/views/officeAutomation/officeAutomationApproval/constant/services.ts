import request from "@/utils/request";
// import { PageData } from "@/constants/interface";
import {
  FundCategoriesOptionModel,
  FeeApplicationCreateParams,
  FeeApplicationQueryParams,
  FeeApplicationModel,
  FeeApplicationInfoModel,
  OaCountModel,
  FundCategoriesOptionQueryParams,
  ApprovalParams,
  FinancialsBalanceParams,
  FinancialsBalanceModel
} from "./interfaces";

export interface OaPageData<T> {
  rows: T[];
  totalPage: number;
  totalSize: number;
  totalAmount: string;
}

export class OfficeAutomationService {
  // 新建费用审批
  createFeeApplication(params: FeeApplicationCreateParams) {
    return request({
      url: "/financials/fee-applications/create",
      method: "post",
      data: params
    });
  }
  // 列出费用审批
  getFeeApplications(
    params: FeeApplicationQueryParams
  ): Promise<OaPageData<FeeApplicationModel>> {
    return request({
      url: "/financials/fee-applications/list",
      method: "post",
      data: params
    });
  }

  // 获取费用审批详情
  getFeeApplicationInfo(id: number): Promise<FeeApplicationInfoModel> {
    return request({
      url: "/financials/fee-applications/" + id
    });
  }

  // 获取OA审批数
  getFeeApplicationsCount(): Promise<OaCountModel> {
    return request({
      url: "/financials/fee-applications/count"
    });
  }

  // 余额数据
  getFinancialsBalance(
    params: FinancialsBalanceParams
  ): Promise<FinancialsBalanceModel> {
    return request({
      url: "/financials/prev-funds/balance",
      params
    });
  }

  // 通过OA审批
  agreeFeeApplications(params: ApprovalParams) {
    return request({
      url: "/financials/fee-applications/agree",
      method: "post",
      data: params
    });
  }
  // 取消OA审批
  cancelFeeApplications(params: ApprovalParams) {
    return request({
      url: "/financials/fee-applications/cancel",
      method: "post",
      data: params
    });
  }
  // 拒绝OA审批
  refuseFeeApplications(params: ApprovalParams) {
    return request({
      url: "/financials/fee-applications/refuse",
      method: "post",
      data: params
    });
  }

  // 列出收支类目选项
  getFundCategoriesOptions(
    keyword: string
  ): Promise<FundCategoriesOptionModel[]> {
    const params: FundCategoriesOptionQueryParams = {
      keyword,
      status: "enable",
      type: "out",
      queryBillType: "common"
    };
    return request({
      url: "/financials/fund-categories/option",
      params
    });
  }
}
