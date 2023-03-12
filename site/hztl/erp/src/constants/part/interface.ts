export type SeacrchMatch = "left" | "right" | "full" | "fuzzy";

export interface BasePartSeacrch {
  codes?: string[]; // 配件编码数组，精确匹配，批量查询或者查询互换件时使用。 有codes时，忽略code、codePattern字段。
  code?: string; //配件编码
  codeMatch?: SeacrchMatch; // 配件编码匹配方式。 left：左匹配；right：右匹配；full：全匹配；任何其他值（包括空）：模糊匹配
  customCode?: string; // 图号
  customCodeMatch?: SeacrchMatch; // 图号匹配方式。 left：左匹配；right：右匹配；full：全匹配；任何其他值（包括空）：模糊匹配
  name?: string; // 名称
  info?: string; // 名称、车型、规格
  vehModel?: string; // 车型、适用车型
  avaVehModel?: string; // 标准适用车型
  brand?: string; // 品牌
  productionPlace?: string; // 产地
  categoryId?: number; // 配件分类ID
  categoryName?: string; // 配件分类名称
  canSale?: boolean; // 是否可销售
  canPurchase?: boolean; // 是否可采购
  groupPurchase?: boolean; // 是否集团采购
  excludePartIds?: number[]; // 需要排除的配件ID，查询互换件时用来排除原配件
}

export interface SalePrice {
  retail?: string; // 零售价
  platform?: string; // 平台价
  allot?: string; //调拨价
  wholesale?: string; //批发价
  wholesale1?: string; // 批发价
  wholesale2?: string; //批发价
  wholesale3?: string; // 批发价
  wholesale4?: string; //批发价
  // 兼容最早的其他售价
  retailPrice?: string; // 零售价
  wholeSalePrice?: string; // 平台价
  platformPrice?: string; //调拨价
  transferPrice?: string; //批发价
  wholeSalePrice1?: string; // 批发价
  wholeSalePrice2?: string; //批发价
  wholeSalePrice3?: string; // 批发价
  wholeSalePrice4?: string; //批发价
}
