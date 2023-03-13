export interface BasisPartItem {
  // 配件信息
  accountSetId: number; // 账套ID
  companyId: number; // 创建配件的公司ID
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
  category: number; // 配件分类
  categoryName: string; // 配件分类名称
  enName: string; // 英文名称
  mnemonic: string; // 助记符（拼音首字母）
  model: string; // 规格
  unit: string; // 计量单位
  length: string; // 长度（单位：m）
  width: string; // 宽度（单位：m）
  height: string; // 高度（单位：m）
  volume: string; // 体积（单位：m³）
  weight: string; // 重量（单位：kg）
  packingNum: number; // 包装数
  imageUrls: string[];
  vehModel: string; // 车型名称
  vehMnemonic: string; // 车型助记符（拼音首字母）
  avaVehModel: string; // 适用车型名称
  avaMnemonic: string; // 适用车型助记符（拼音首字母）
  avaVehModels: number[];
  cusVehModels: string[];
  productionCode: string; // 生产码
  posCode: string; // 部位码
  engineNo: string; // 发动机号
  barCode: string; // 条形码
  customCodes: string[];
  priceFactory: string; // 正厂价
  priceRmb: string; // 人民币价
  currency: string; // 正厂价币种
  Define1: string; // 自定义字段
  Define2: string;
  Define3: string;
  Define4: string;
  Define5: string;
  Define6: string;
  Define7: string;
  Define8: string;
  Define9: string;
  Define10: string;
  remark: string; // 备注
}

export interface SearchAvaVehModel {
  vehBrand?: string; // 品牌
  facBrand?: string; // 厂牌
  vehicleGroup?: string; // 车型组
  year?: string; // 年款
  displacement?: string; // 排量
  engine?: string; // 发动机
  displacementEngine?: string; // 排量 | 发动机，需要将 排量 发动机数据组装，中间适用‘ | ’分隔，插入、更新时该字段无效
  transmission?: string; // 变速箱
  salesModel?: string; // 销售版型
}

export interface SeachPartFilters {
  name?: string;
  code?: string; // 编码
  codePattern?: number; // 配件编码匹配模式
  category?: number; // 配件分类
  categoryName?: string; // 配件分类名称
  model?: string; // 规格
  stockLimits?: [
    // 库存上下限， 0：正常，1：超出上限，2：低于下限
    number
  ];
  info?: string; // 配件信息:名称
  vehModel?: string; // 车型
  customCode?: string; // 图号
  customCodePattern?: number; // 图号匹配模式
  codes?: string[]; // 配件编码，批量查询时,不为空，则批量查询
  demandQties?: string[]; //需求数量
  brand?: string; // 品牌
  productionPlace?: string; // 产地
  brands?: string[];
  productionPlaces?: string[];
  property?: string; // 性质
  partId?: number; // 互换件本身ID
  isSale?: boolean; // 是否可销售
  isPurchase?: boolean; // 是否可采购
  warehouseId?: number; // 仓库ID
  warehouseIds?: number[]; // 仓库IDs
  filterZero?: boolean; // 是否过滤零库存
  qtyLimitType?: number; // 数量限制方式
  qty?: number; // 数量
  isCollection?: boolean; // 是否集采
  supplierId?: number; // 供应商ID
  isReplacement?: boolean; // 是否互换件查询
  positionId?: number; // 货位ID
  companyId?: number; // 单据所属公司ID

  avaVehModel?: SearchAvaVehModel;
}

export interface SeachPartRes extends BasisPartItem, PartStore {
  // 增加字段
  id: number;

  categoryName: string; // 分类名
  model: string; // 规格
  qty: string; // 库存实际数
  lockedQty: string; // 库存锁定数
  dynaQty: string; // 库存动态数
  companyDynaQty: string; // 本店实际可售库存数
  otherCompanyDynaQty: string; // 它店实际可售库存
  demandQty: string; // 需求数量(采购数/销售数)

  status: number;
  labels: string[];
  replacementQty: string; // 互换库存数
  onPurchaseOrderingQty: string; // 采购在订数
  onPurchaseTransitQty: string; // 采购在途数
  purchaseQtyInOrdering: string; // 采购在订数
  purchaseQtyInTransit: string; // 采购在途数
  monthlySaleQty: string; // 月均销售数
  replacementCodes: string[]; // 互换编码数组
  belongs: string[];
}
export interface SalePricesMapRes {
  priorityCategory: number;
  salePrices: {
    allot?: string;
    platform?: string;
    retail?: string;
    wholesale?: string;
    wholesale1?: string;
    wholesale2?: string;
    wholesale3?: string;
    wholesale4?: string;
  };
}
export interface PricesItem {
  retail: string; //零售价
  platform: string; //平台价
  allot: string; //调拨价
  wholesale: string; //批发价
  wholesale1: string; //批发价一
  wholesale2: string; //批发价二
  wholesale3: string; //批发价三
  wholesale4: string; //批发价四
}

export interface CostPrices {
  taxed: string; // 含税价
  untaxed: string; // 未税价
}
export interface PartPrice {
  costPrice: string; // 含税成本价
  costAmount: string; // 含税成本额
  untaxedCostPrice: string; // 未税成本价
  untaxedCostAmount: string; // 未税成本金额
  taxRate: string; // 税率
  price: string; // 单价
  amount: string; // 金额
  salePrices: PricesItem; //售价
  costPrices: CostPrices; // 成本价
  amount2Price: boolean; // 是否金额算单价，默认单价算金额
}

// 配件库存字段
export interface PartStore extends PartPrice {
  qty: string; // 数量
  returnQty: string; // 已退货数
  stockId: number; // 库存ID
  warehouseId: number; // 仓库ID
  positionId: number; // 货位ID
  batchNo: string; // 批次号
  supplierId: number; // 供应商ID
  warehouseName: string; // 仓库名称
  positionName: string; // 货位名称
  property: string; // 性质
}
