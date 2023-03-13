import request from "@/common/utils/request";
import { BaseFormParams, AreaModel } from "@/common/interface/baseInterface";
import { MODULE_KEY_ENUM } from "@/common/utils/config";

export class BasicsService {
  public getCompanies() {
    return request({
      url: "/whsc/companies/my"
    });
  }

  public updateCompanies(params: BaseFormParams) {
    return request({
      method: "put",
      data: params,
      url: "/whsc/companies",
      showLoad: true
    });
  }

  public getBrands() {
    return request({
      method: "get",
      params: {
        type: 1
      },
      url: "/brands/group-category",
      module: MODULE_KEY_ENUM.basic
    });
  }

  // 地区
  public getAreas(): Promise<AreaModel[]> {
    return request({
      url: "/open/areas/tree",
      module: MODULE_KEY_ENUM.basic
    });
  }
}
