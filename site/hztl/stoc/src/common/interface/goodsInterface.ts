import { CompanyModel } from "./companyInterface";
import { PageParams } from "./commonInterface";

export interface PartParams extends PageParams {
  keyword?: string; // 关键字
  areas?: string; // 发货地
  brands?: string; // 品牌名称
  companyIds?: string; // 公司ID
  insurCertTypes?: string; // 配件保险认证分类
  orderByAreas?: string; // 发货地排序
}
export interface PartAllParams {
  keyword?: string; // 关键字
  firstMnemonic?: string; // 首字母助记符
}

export interface PartModel {
  companyId: number; // 公司ID
  swPartId: number; // 软件内配件ID
  code: string; // 配件编码
  name: string; // 配件名称
  brand: string; // 品牌名称
  productionPlace: string; // 产地
  partType: string; // 配件类别
  dosagePerCar: number; // 每车用量
  minOrderQty: number; // 起订量
  stockTopLimit: string; // 库存上限
  stockLowerLimit: string; // 库存下限
  insurCertType: string; // 配件保险认证分类
  guarPeriod: number; // 质保期（天）
  category: string; // 配件分类
  enName: string; // 英文名称
  mnemonic: string; // 助记符（拼音首字母）
  model: string; // 规格
  unit: string; // 计量单位
  length: string; // 长度（单位：m）
  width: string; // 宽度（单位：m）
  height: string; //高度（单位：m）
  volume: string; // 体积（单位：m³）
  weight: string; // 重量（单位：kg）
  packingNum: string; // 包装数
  imageUrls: string; // 图片存储路径
  vehModel: string; // 车型名称
  vehMnemonic: string; // 车型助记符（拼音首字母）
  avaVehModel: string; // 适用车型名称
  avaMnemonic: string; // 适用车型助记符（拼音首字母）
  cusVehModels: string; // 自定义车型
  productionCode: string; // 生产码
  posCode: string; // 部位码
  featureCode: string; // 特征码
  engineNo: string; // 发动机号
  barCode: string; // 条形码
  customCodes: string; // 图号，第一条为默认
  priceFactory: string; // 正厂价
  priceRmb: string; // 人民币价
  currency: string; // 正厂价币种
  property: string; // 属性
  company: CompanyModel;
  qty: string; // 库存
  price: string; // 价格，可能为null，null代表需要询价
}