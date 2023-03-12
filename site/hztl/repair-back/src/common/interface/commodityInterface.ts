import { PageParams } from "./commonInterface";

export interface AuthSettingModel {
  name?: string;
  priceTypes: string[];
  properties: string[];
  stores: string[];
  storeNames?: string[];
}

export interface AuthPriceTypeModel {
  id: string;
  name: string;
}

export interface AuthStoreModel {
  depotName: string;
  depotNo: string;
}

export interface PartsParams extends PageParams {
  code?: string;
  name?: string;
  brand?: string;
  isUp?: boolean;
}

export interface PartsModel {
  partId: number;
  partNo: string;
  partName: string;
  brand: string;
  factory: string;
  insurCertType: string;
}
export interface PartsPublishParams {
  partIds?: number[];
  isAll?: boolean;
}