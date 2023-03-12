import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class PollablePartsSettingApi {

  getPriceTypesReq(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/dicts`,
      method: "get",
      params
    });
  }

  getCustomerSetting(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/sets/${params.customerSetId}`,
      method: "get",
    });
  }

  getCompanySkus(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/company-skus/field-value`,
      method: "get",
      params
    });
  }

  customerUpsert(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/company-skus/customer-settings/upsert`,
      method: "post",
      data: params
    });
  }

  customerSettings(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/company-skus/customer-settings`,
      method: "post",
      data: params
    });
  }

}
