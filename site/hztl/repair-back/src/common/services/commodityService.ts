import request from "@/common/utils/request";
import { MODULE_KEY_ENUM } from "@/common/utils/config";
import {
  AuthSettingModel,
  AuthPriceTypeModel,
  AuthStoreModel,
  PartsModel,
  PartsParams,
  PartsPublishParams
} from "@/common/interface/commodityInterface";
import { PageResponseResult } from "@/common/interface/commonInterface";

export class CommodityService {
  public getAuthSetting(): Promise<AuthSettingModel> {
    return request({
      url: "/companies/erp/authorizations/setting/whsc",
      module: MODULE_KEY_ENUM.accounts
    });
  }
  
  public updateAuthSetting(params: AuthSettingModel) {
    return request({
      method: "put",
      data: params,
      url: "/companies/erp/authorizations/setting/whsc",
      module: MODULE_KEY_ENUM.accounts,
      showLoad: true
    });
  }

  public getAuthPriceTypes(): Promise<AuthPriceTypeModel[]> {
    return request({
      url: "/companies/erp/authorizations/basic/whsc/price-type",
      module: MODULE_KEY_ENUM.accounts
    });
  }

  public getAuthPropertys(): Promise<string[]> {
    return request({
      url: "/companies/erp/authorizations/basic/whsc/property",
      module: MODULE_KEY_ENUM.accounts
    });
  }

  public getAuthStores(): Promise<AuthStoreModel[]> {
    return request({
      url: "/companies/erp/authorizations/basic/whsc/store",
      module: MODULE_KEY_ENUM.accounts
    });
  }

  public getParts(
    params: PartsParams
  ): Promise<PageResponseResult<PartsModel[]>> {
    return request({
      url: "/whsc/m8/parts/whsc",
      params: params
    });
  }

  // 授权配件
  public partsPublish(params: PartsPublishParams) {
    return request({
      method: "post",
      data: params,
      url: "/whsc/m8/parts/whsc/publish"
    });
  }
  // 取消授权配件
  public partsUnpublish(params: PartsPublishParams) {
    return request({
      method: "post",
      data: params,
      url: "/whsc/m8/parts/whsc/unpublish"
    });
  }
}
