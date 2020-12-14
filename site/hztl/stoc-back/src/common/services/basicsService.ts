import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";

const serviceName = ServiceType.basicsService;

export class BasicsService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getCompanies() {
    return this.request({
      url: "/whsc/companies/my",
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new BasicsService());
}
