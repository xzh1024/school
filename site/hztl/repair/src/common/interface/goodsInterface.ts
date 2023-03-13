import { CompanyModel } from "./companyInterface";
import { PageParams, AreaParams } from "./commonInterface";

export interface PartParams extends PageParams {
  id?: number; // 配件ID
  keyword?: string; // 关键字 配件名称、OE号、品牌
  vehBrands?: string[]; // 汽车品牌
  partBrands?: string[]; // 配件品牌
  productionPlaces?: string[]; // 产地
  areas?: AreaParams[]; // 发货地  [Province,City,County]:[ID] 多个 ”,“ 分隔 例如： Province:11,City:22,County:33
  companyIds?: number[]; // 公司ID
  orderByAreas?: AreaParams[]; // 排序区域
}
export interface PartAllParams {
  keyword?: string; // 关键字
  firstMnemonic?: string; // 首字母助记符
}
export interface VehModel {
  brand: string; // 品牌
  factoryBrand: string; // 厂牌
  series: string; // 车系
  year: string; // 年款
  displacement: string; // 排量
  gearbox: string; // 变速箱
}
export interface PartModel {
  id: number; // 配件ID
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
  height: string; // 高度（单位：m）
  volume: string; // 体积（单位：m³）
  weight: string; // 重量（单位：kg）
  packingNum: null; // 包装数
  imageUrls: null; // 图片存储路径
  vehModel: string; // 车型名称
  factoryBrands: string[]; // 适用车型
  vehMnemonic: string; // 车型助记符（拼音首字母）
  avaVehModel: string; // 适用车型名称
  avaMnemonic: string; // 适用车型助记符（拼音首字母）
  cusVehModels: null; // 自定义车型
  productionCode: string; // 生产码
  posCode: string; // 部位码
  featureCode: string; // 特征码
  engineNo: string; // 发动机号
  barCode: string; // 条形码
  customCodes: null; // 图号，第一条为默认
  priceFactory: string; // 正厂价
  priceRmb: string; // 人民币价
  currency: string; // 正厂价币种
  vehSeries: string; // 适用车系
  property: string; // 属性
  company: CompanyModel; // 公司信息
  vehModels: VehModel[]; // 适用车型
  qty: string; // 库存
  price: string; // 价格，可能为null，null代表需要询价
  popoverVisible?: boolean;
}
export interface VehModelParams {
  type: string; // 查询数据类型
  brand?: string; // 汽车品牌
  factoryBrand?: string; // 汽车厂牌
  series?: string; // 车系
  year?: string; // 年款
}
export interface VehModelEnergy {
  displacement: string;
  gearbox: string;
}
