import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { BrandParams, BrandModel } from "@/common/interface/brandInterface";

const serviceName = ServiceType.brandService;

export class BrandService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getBrands(
    params: BrandParams = {}
  ): Promise<PageResponseResult<BrandModel[]>> {
    return this.request({
      params: params,
      url: "/open/whsc/brands"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new BrandService());
}
