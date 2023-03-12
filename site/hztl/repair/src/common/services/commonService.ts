import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { MODULE_KEY_ENUM } from "@/common/utils/config";
import { AreaModel } from "@/common/interface/commonInterface";

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
  public updeteGuided() {
    return this.request({
      method: "put",
      url: "/whsc/guided"
    });
  }

  public getIndexInfo() {
    return this.request({
      url: "/open/whsc/info"
    });
  }

  // 地区
  public getAreas(): Promise<AreaModel[]> {
    return this.request({
      url: "/open/areas/tree",
      module: MODULE_KEY_ENUM.basic
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new CommonService());
}
