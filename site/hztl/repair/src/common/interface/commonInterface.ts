export interface PageResponseResult<T> {
  rows: T;
  totalSize: number;
  totalPage: number;
}
export interface PageParams {
  page?: number;
  pageSize?: number;
  totalSize?: number;
  totalPage?: number;
}
export interface BannerModel {
  pic: string;
  name: string;
  url: string;
}
export interface FloorModel {
  name: string;
  value: string;
}
export interface NameModel {
  id: number;
  name: string;
}
export interface AreaModel {
  id: number;
  name: string;
  children?: AreaModel[];
  active?: boolean;
}
export interface AreaParams {
  type: string;
  id: number;
}
export interface SearchBarModel {
  path: string;
  keyword: string;
}
export interface BrandPicModel {
  name: string;
  pic: string;
}
export interface GroupVehBrandModel {
  mnemonic: string;
  datas: BrandPicModel[];
  active?: boolean;
}