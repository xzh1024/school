import { ServiceType } from "./base/serviceType";
import { BaseService } from "./base/baseService";
import { ServiceFactory } from "./ServiceFactory";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  PartModel,
  PartParams,
  VehModelParams,
  VehModelEnergy
} from "@/common/interface/goodsInterface";

const serviceName = ServiceType.goodsService;

export class GoodsService extends BaseService {
  public readonly name = serviceName;

  constructor() {
    super();
  }

  public getParts(
    params: PartParams = {}
  ): Promise<PageResponseResult<PartModel[]>> {
    return this.request({
      params: params,
      url: "/open/whsc/parts"
    });
  }

  public getVehModels(params: VehModelParams) {
    return this.request({
      params: params,
      url: "/open/veh-models"
    });
  }
}

if (!ServiceFactory.hasInit(serviceName)) {
  ServiceFactory.initService(new GoodsService());
}
