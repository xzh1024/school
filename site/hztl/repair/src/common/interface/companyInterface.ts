import { PageParams, AreaParams, GroupVehBrandModel } from "./commonInterface";

export interface CompanyParams extends PageParams {
  keyword?: string; // 关键字
  vehBrands?: string[]; // 汽车品牌
  areas?: AreaParams[]; // 区域
  orderByAreas?: AreaParams[]; // 排序区域
}
export interface CompanyModel {
  companyId: number; // 所属公司ID
  name: string; // 名称
  pics: string[]; // 商家图片
  description: string; // 商家描述
  contacts: string; // 联系人
  phone: string; // 联系电话
  contacts1: string; // 联系人1
  contacts2: string; // 联系人2
  contacts3: string; // 联系人3
  phone1: string; // 联系电话1
  phone2: string; // 联系电话2
  phone3: string; // 联系电话3
  wechat: string; // 微信
  wechatPics: string[]; // 微信图片
  qq: string; // QQ
  qqPics: string[]; // QQ图片
  vehBrands: string[]; // 经营汽车品牌
  areaId: number; // 区域ID
  areaName: string; // 区域名称
  address: string; // 详细地址
  areas: AreaModel[];
  partCount: number; // 配件数量
}

// 获取公司信息选项
export interface CompanyFilterParams {
  keyword?: string; // 关键字
  vehBrands?: string[]; // 主营品牌
  areas?: AreaParams[]; // 区域
  orderByAreas?: AreaParams[]; // 排序区域
}
export interface CompanyFilterModel {
  groupVehBrands: GroupVehBrandModel[];
}

// 所属地区
export interface AreaModel {
  type: string; // 区域类型，Province:省,City:市,County:区
  id: number; // 区域Id
  name: string; // 区域名称
}
