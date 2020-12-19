import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { ModuleKeyEnum } from "@/common/config/config";

const serviceName = ServiceType.loginService;

export class LoginService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public tokenLogin(token: string) {
    const params = {
      token: token,
      allianceDomain: "qa2.hztl3.xyz"
    };
    return this.request({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: params,
      url: "/token-login",
      module: ModuleKeyEnum.accounts
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new LoginService());
}
