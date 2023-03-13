import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class SettingApi {

  //获取设置详细
  getSettingDetail(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/company-settings/detail`,
      method: "get",
      params
    });
  }
  
  //获取字典 审核方式
  getDictsByType(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/dicts`,
      method: "get",
      params
    });
  }

  //保存设置信息
  saveSetting(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/company-settings`,
      method: "post",
      data: params
    });
  }
}
