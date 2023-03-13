import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  CompanyModel,
  CompanyParams,
  CompanyFilterParams,
  CompanyFilterModel
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
      method: "post",
      data: params,
      url: "/open/whsc/companies"
    });
  }

  public getCompaniesFilter(
    params: CompanyFilterParams = {}
  ): Promise<CompanyFilterModel> {
    return this.request({
      method: "post",
      data: params,
      url: "/open/whsc/companies/filter"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new CompanyService());
}
