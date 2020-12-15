export interface BaseFormParams {
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
  areas: any[];
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

export interface AreaItemModel {
  id: number;
  name: string;
}
