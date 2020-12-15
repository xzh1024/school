import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { SetupFormParams, SkuSettingModel } from "@/common/interface/setupInterface";

const serviceName = ServiceType.setupService;

export class SetupService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getSettings(): Promise<SetupFormParams<SkuSettingModel>> {
    return this.request({
      url: "/whsc/companies/settings/my"
    });
  }

  public updateSettings(params: SetupFormParams<SkuSettingModel>) {
    return this.request({
      method: "put",
      data: params,
      url: "/whsc/companies/settings/my",
      showLoad: true
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new SetupService());
}
