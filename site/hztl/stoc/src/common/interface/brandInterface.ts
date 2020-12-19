import { PageParams } from "./commonInterface";

export interface BrandParams extends PageParams {
  keyword?: string; // 关键字
  firstMnemonic?: string; // 首字母助记符
}

export interface BrandModel {
  name: string; // 品牌名称
  pic: string; // 品牌图片
  companyCount: number; //商家数
}
