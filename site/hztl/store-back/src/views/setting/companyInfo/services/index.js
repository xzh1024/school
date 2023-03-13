import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class CompanyInfoApi {

  //获取公司详情
  getCompanyDetail(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies`,
      method: "get",
      params
    });
  }
  
  //获取汽车品牌
  getVehBrand(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/alliances/business-scopes`,
      method: "get",
      params
    });
  }

  //企业名片保存
  saveCompanyImg(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/business-card`,
      method: "post",
      data: params
    });
  }

  //收款信息 收款码
  savePaymentCode(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/payment-code`,
      method: "post",
      data: params
    });
  }

  //保存设置信息
  saveCompanyInfo(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/${params.id}`,
      method: "post",
      data: params
    });
  }
}
