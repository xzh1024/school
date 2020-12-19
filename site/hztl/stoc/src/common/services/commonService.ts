import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
// import { ModuleKeyEnum } from "@/common/config/config";

const serviceName = ServiceType.commonService;

export class CommonService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getIndexInfo() {
    return this.request({
      url: "/open/whsc/info"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new CommonService());
}
