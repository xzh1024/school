import { SalePrice } from "@/constants/part";

// import { SeachPartRes } from "@/constants/interface/part";
interface SearchPartItem {
  partId: number; // 配件ID
  partCode: string; // 配件编码
  partName: string; // 配件名称
  brand: string; // 品牌
  productionPlace: string; // 产地
  customCodes: string[]; // 图号
  categoryName: string; // 分类名称
  vehModel: string; // 车型
  avaVehModel: string; // 适用车型
}

export interface SupplierItem {
  cooperatorId: number; // 往来单位ID
  name: string; // 名称
  number: string; // 编号
  status: number; // 往来单位状态，0:有效，1:无效
  type: number; // 往来单位类型，0:专供，1:普通，-1：非供应商
  supportCount: number; // 供应配件数
  signCount: number; // 签约配件数
  contactName: string; // 主联系人姓名
  contactPhone: string; // 主联系人电话
  belongs: string[];
}

export interface SupplierSelectItem {
  id: number;
  name: string;
}

export interface SupplierPartItem {
  id: number; // 主键ID
  partId: number; // 配件ID
  partType: number; // 配件类型，0:供应配件，1:专供配件
  partCode: string; // 配件编码
  partName: string; // 配件名称
  supplierPartCode: string; // 供应商配件编码
  supplierPartName: string; // 供应商配件名称
  brand: string; // 品牌
  productionPlace: string; // 产地
  customCodes: string[]; // 图号
  categoryName: string; // 分类名称
  vehModel: string; // 车型
  avaVehModel: string; // 适用车型
  purchasePrice: string; // 采购价
  salePrices: SalePrice;
}

export interface EditPartData {
  partType?: number; // 配件类型，0:供应配件，1:专供配件
  partCode?: string; // 供应商配件编码
  partName?: string; // 供应商配件名称
  purchasePrice?: string; // 采购价
  retailPrice?: string; // 零售价
  wholeSalePrice?: string; // 批发价
  platformPrice?: string; // 平台价格
  transferPrice?: string; // 调拨价
  wholeSalePrice1?: string; // 批发价一
  wholeSalePrice2?: string; // 批发价二
  wholeSalePrice3?: string; // 批发价三
  wholeSalePrice4?: string; // 批发价四
}
