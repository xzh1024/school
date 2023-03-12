import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { MODULE_KEY_ENUM } from "@/common/utils/config";

const serviceName = ServiceType.loginService;

interface TokenLoginParam {
  token: string;
  allianceDomain: string;
}

export class LoginService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public tokenLogin(token: string) {
    const params = {
      token: token
      // allianceDomain: window.location.hostname
    } as TokenLoginParam;
    if (process.env.NODE_ENV !== "development") {
      params.allianceDomain = window.location.hostname;
    }
    return this.request({
      method: "post",
      data: params,
      url: "/token-login",
      module: MODULE_KEY_ENUM.accounts
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new LoginService());
}
