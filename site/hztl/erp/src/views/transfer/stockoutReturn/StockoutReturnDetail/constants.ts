import {
  EditBillPart,
  ReturnablePartData,
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

export interface EditPartFormData {
  qty?: number; // 数量
  price?: number; // 价格
  amount?: number; // 金额
  amount2Price?: boolean; // 是否金额算单价，默认单价算金额
  warehouseId?: number; // 仓库ID
  warehouseName?: string; // 仓库名称
  positionId?: number; // 货位ID
  positionName?: string; // 货位名称
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

export type EditBillPartParams = Partial<
  Pick<EditBillPart, "id" | "warehouseId" | "positionId" | "remark">
>;
