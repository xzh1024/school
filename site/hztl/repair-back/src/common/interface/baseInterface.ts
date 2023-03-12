export interface AreaModel {
  id: number;
  name: string;
  children?: AreaModel[];
  type?: string;
  cascadeName?: string;
}
export interface BaseFormParams {
  companyId?: string;
  name: string;
  pics?: any[];
  description: string;
  contacts: string;
  contacts1: string;
  contacts2: string;
  contacts3: string;
  phone: string;
  phone1: string;
  phone2: string;
  phone3: string;
  wechat: string;
  wechatPics?: any[];
  qq: string;
  qqPics?: any[];
  vehBrands: string[];
  areaId: number; // 区域ID
  areaName?: string; // 区域名称
  address?: string; // 详细地址
  areas: AreaModel[];
}
export interface ScopeModel {
  code: string;
  name: string;
}
export interface BrandModel {
  category: string;
  scopes: ScopeModel[];
}
export interface FileModel {
  name: string;
  url: string;
  origin: string;
}
