import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { BaseFormParams, AreaModel } from "@/common/interface/baseInterface";
import { ModuleKeyEnum } from "@/common/config/config";

const serviceName = ServiceType.basicsService;

export class BasicsService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getCompanies() {
    return this.request({
      url: "/whsc/companies/my"
    });
  }

  public updateCompanies(params: BaseFormParams) {
    return this.request({
      method: "put",
      data: params,
      url: "/whsc/companies",
      showLoad: true
    });
  }

  public getBrands() {
    return this.request({
      method: "get",
      params: {
        type: 1
      },
      url: "/brands/group-category",
      module: ModuleKeyEnum.basic
    });
  }

  // 获取省份列表
  public getProvinces() {
    return this.request({
      method: "get",
      url: "/provinces",
      module: ModuleKeyEnum.accounts
    });
  }
  // 获取城市列表
  public getCities(provinceId: number) {
    return this.request({
      params: {
        provinceId
      },
      url: "/cities",
      module: ModuleKeyEnum.accounts
    });
  }
  // 获取区县列表
  public getCounties(cityId: number) {
    return this.request({
      params: {
        cityId
      },
      url: "/counties",
      module: ModuleKeyEnum.accounts
    });
  }
  // 地区
  public getAreas(): Promise<AreaModel[]> {
    return this.request({
      url: "/open/areas/tree",
      module: ModuleKeyEnum.basic
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new BasicsService());
}
