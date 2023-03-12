import request from "@/common/utils/request";
import {
  SetupFormParams,
  SkuSettingModel
} from "@/common/interface/setupInterface";

export class SetupService {
  public getSettings(): Promise<SetupFormParams<SkuSettingModel>> {
    return request({
      url: "/whsc/companies/settings/my"
    });
  }

  public updateSettings(params: SetupFormParams<SkuSettingModel>) {
    return request({
      method: "put",
      data: params,
      url: "/whsc/companies/settings/my",
      showLoad: true
    });
  }
}
