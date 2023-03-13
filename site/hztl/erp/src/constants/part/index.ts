export * from "./interface";
import { SalePrice, SeacrchMatch } from "./interface";

export const SeacrchMatchText: Record<SeacrchMatch, string> = {
  fuzzy: "模糊匹配",
  left: "左匹配",
  right: "右匹配",
  full: "全匹配"
};

export const salePriceText: SalePrice = {
  retail: "零售价",
  platform: "平台价",
  allot: "调拨价",
  wholesale: "批发价",
  wholesale1: " 批发价1",
  wholesale2: "批发价2",
  wholesale3: " 批发价3",
  wholesale4: "批发价4",
  // 兼容最早的其他售价
  retailPrice: "零售价",
  platformPrice: "平台价",
  transferPrice: "调拨价",
  wholeSalePrice: "批发价",
  wholeSalePrice1: " 批发价1",
  wholeSalePrice2: "批发价2",
  wholeSalePrice3: " 批发价3",
  wholeSalePrice4: "批发价4"
};
