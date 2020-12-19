import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  CompanyModel,
  CompanyParams
} from "@/common/interface/companyInterface";

const serviceName = ServiceType.companyService;

export class CompanyService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getCompanies(
    params: CompanyParams = {}
  ): Promise<PageResponseResult<CompanyModel[]>> {
    return this.request({
      params: params,
      url: "/open/whsc/companies"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new CompanyService());
}
