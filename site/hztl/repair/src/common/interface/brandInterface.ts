import {
  PageParams,
  NameModel,
  AreaParams,
  GroupVehBrandModel
} from "./commonInterface";

export interface BrandParams extends PageParams {
  keyword?: string; // 关键字
  firstMnemonic?: string; // 首字母助记符
}
export interface BrandModel {
  name: string; // 品牌名称
  pic: string; // 品牌图片
  companyCount: number; //商家数
}
export interface PartFilterParams {
  id?: number; // 配件ID
  keyword?: string; // 关键字
  vehBrands?: string[]; // 汽车品牌
  partBrands?: string[]; // 配件品牌
  productionPlaces?: string[]; // 产地
  areas?: AreaParams[]; // 区域
  companyIds?: number[]; // 公司ID
}
// export interface PartFilterModel {
//   brands: string[];
//   companies: NameModel[];
//   insurCertTypes: string[];
// }
export interface PartFilterModel {
  groupVehBrands: GroupVehBrandModel[];
  partBrands: string[];
  productionPlaces: string[];
  companies: NameModel[];
}
