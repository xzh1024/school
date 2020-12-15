import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { moduleKeyMap } from "@/common/config/config";

const serviceName = ServiceType.commonService;

export class CommonService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getBase() {
    return this.request({
      url: "/whsc/base"
    });
  }

  public getUploadToken() {
    return this.request({
      module: moduleKeyMap.accounts,
      url: "/img/upToken"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new CommonService());
}
