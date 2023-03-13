import {
  EditBillPart,
  ReturnablePartData,
  ReturnablePartPrams,
  TransferEditBillHeader
} from "../../interface";

export type DetailFormData = Partial<
  Pick<
    TransferEditBillHeader,
    | "companyId"
    | "relatedCompanyId"
    | "paymentType"
    | "billDate"
    | "businessManId"
    | "remark"
    | "freightPayer"
    | "transportMethod"
    | "logisticsCompanyId"
    | "packMethod"
    | "pickMethod"
    | "receiverName"
    | "receiverPhone"
    | "receiverAreaId"
    | "receiverAddress"
  >
>;
export interface SearchPartItem {
  id?: number; // 明细ID
  billId?: number; // 单据ID
  purchaseDate?: string; // 调入日期
  billNo?: string; // 调入单号
  relatedCompanyId?: number; // 往来公司ID
  relatedCompanyName?: string; // 往来公司名称
  partId?: number; // 配件ID
  code?: string; // 配件编码
  name?: string; // 配件名称
  brand?: string; // 配件品牌
  productionPlace?: string; // 产地
  property?: string; // 配件性质
  model?: string; // 规格
  warehouseId?: number; // 仓库ID
  vehModel?: string; // 车型
  avaVehModel?: string; // 适用车型
  qty?: string; // 入库数
  returnedQty?: string; // 已退数
  returnableQty?: string; // 可退数
  price?: string; // 退货单价
  pickMethod?: string; // 提货方式
  transportMethod?: string; // 运输方式
  logisticsCompanyId?: number; // 物流公司ID
  logisticsCompanyName?: string; // 物流公司名称
  packMethod?: string; // 包装方式
  businessManId?: number; // 业务员ID
  businessManName?: string; // 业务员名称
  customCodes?: string[]; // 图号
  labels?: string[]; // 标记
  belongs?: string[]; // 权限
}

export interface SearchStockItem {
  id?: number; // 库存ID
  qty?: number; // 实际数
  dynamicQty?: number; // 动态数
  property?: string; // 配件性质
  warehouseId?: string; // 仓库ID
  warehouseName?: number; // 仓库名称
  positionId?: string; // 货位ID
  positionName?: number; // 货位名称
  batchNo?: string; // 批次号
}

export interface EditPartFormData {
  qty?: number; // 数量
  price?: number; // 价格
  amount?: number; // 金额
  amount2Price?: boolean; // 是否金额算单价，默认单价算金额
  reason?: string; // 退货原因
  remark?: string; // 备注
}

export type EditPartInfoData = Partial<
  Pick<
    ReturnablePartData,
    | "code"
    | "name"
    | "brand"
    | "property"
    | "batchNo"
    | "qty"
    | "dynamicQty"
    | "lockedQty"
    | "inQty"
    | "returnedQty"
    | "returnableQty"
  >
>;

export interface ReturnEditBillPart
  extends Partial<
      Pick<
        EditBillPart,
        "qty" | "price" | "amount" | "amount2Price" | "reason" | "remark"
      >
    >,
    ReturnablePartPrams {}
