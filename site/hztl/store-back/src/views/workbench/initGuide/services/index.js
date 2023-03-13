import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class InitGuideApi {

  //店铺初始化引导
  getInitGuide(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/init-guide",
      method: "get",
      params
    });
  }
}
