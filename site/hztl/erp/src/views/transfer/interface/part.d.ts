import {
  BasisPartItem,
  PartStore,
  PricesItem
} from "@/constants/interface/part";

interface RelatedAction {
  submitByName: string; // 提交人
  submitAt: string; // 提交时间
  revokeByName: string; // 撤回人
  revokeAt: string; // 撤回时间
  auditByName: string; // 审核人
  auditAt: string; // 审核时间
  returnByName: string; // 退回人
  returnAt: string; // 退回时间
  refuseByName: string; // 拒绝人
  refuseAt: string; // 拒绝时间
  financialByName: string; // 财务审核人
  financialAt: string; // 财务审核时间
  warehouseAuditByName: string; // 仓库审核人
  warehouseAuditAt: string; // 仓库审核时间
}

interface SourceAction {
  submitByName: string; // 提交人
  submitAt: string; // 提交时间
  revokeByName: string; // 撤回人
  revokeAt: string; // 撤回时间
  auditByName: string; // 审核人
  auditAt: string; // 审核时间
  returnByName: string; // 退回人
  returnAt: string; // 退回时间
  refuseByName: string; // 拒绝人
  refuseAt: string; // 拒绝时间
  financialByName: string; // 财务审核人
  financialAt: string; // 财务审核时间
  warehouseAuditByName: string; // 仓库审核人
  warehouseAuditAt: string; // 仓库审核时间
}

// 配件完整字段
interface BaseExtendPart extends BasisPartItem {
  partId: number;
}
export interface BasePartItem extends PartStore {
  id: number; // 自增ID
  accountSetId: number; // 账套ID
  companyId: number; // 公司ID
  billId: number; // 单据ID
  partSnapshotId: number; // 配件快照ID
  relatedId: number; // 关联单据明细ID
  sourceId: number; // 来源单据明细ID
  remark: string; // 备注
  reason: string; // 原因(用于调拨退货)
  batchNo: string; // 批次号
  supplierId: number; // 供应商ID
  supplierName: string; // 供应商ID
  property: string; // 配件性质
  createdBy: number; // 创建者员工ID
  createdAt: string; // 创建时间
  updatedBy: number; // 更新者员工ID
  updatedAt: string; // 更新时间
  part: BaseExtendPart;

  outWarehouseId?: number; // 调出仓库ID
  outWarehouseName?: string; // 调出仓库
  outQty: string; // 已出库数量
  outAmount: string; // 已出库金额
  waitOutQty: string; // 待出库数量(对应调拨出库单中的未出库数)
  waitOutAmount: string; // 待出库金额
  waitDeliverQty: string; // 待交货数量(申请数量-已出库数量)
  onTransQty: string; // 待转调拨出库数量(申请数量-已转出库数量)
  canceledQty: string; // 已取消数量
  untaxedPrice: string; // 未税单价
  untaxedAmount: string; // 未税金额
  maxAllocPrice: string; // 调拨价格(调拨申请单转出库单时默认单价)
}

// 配件完整字段
export interface TransferBillPartItem extends BasePartItem {
  groupId: number;
  relatedBillNo: string;
  relatedBillAction: RelatedAction;
  sourceBillNo: string;
  sourceBillAction: SourceAction;
  returnedDetail: {
    qty: string; // 退货总数量
  };
}

export interface EditBillPart {
  id?: number; //明细ID
  groupId?: number; // 明细组ID，更新时使用
  partId?: number; // 配件ID
  property?: string; // 配件性质
  warehouseId?: number; // 仓库ID
  positionId?: number; // 货位ID
  stockId?: number; // 库存ID
  qty?: string; // 数量
  price?: string; // 单价
  amount?: string; // 金额
  amount2Price?: boolean; // 是否金额算单价，默认单价算金额
  preDiscountTaxedPrice?: string; // 含税单价
  reason?: string; // 退货原因
  remark?: string; // 备注
  salePrices?: PricesItem; //批发价等
  outWarehouseId?: number; // 调出仓库ID
}

export interface ReturnablePartData {
  partId?: number; // 配件ID
  code?: string; // 配件编码
  name?: string; // 配件名称
  brand?: string; // 配件品牌
  productionPlace?: string;
  property?: string; // 配件性质
  batchNo?: string; // 批次号
  qty?: string; // 实际数
  lockedQty?: string; // 锁定数
  dynamicQty?: string; // 动态数
  price?: string; // 退货单价
  inQty?: string; // 调入数
  returnedQty?: string; // 已退数
  returnableQty?: string; // 可退数
}

export interface ReturnablePartPrams {
  detailId?: number;
  inDetailId?: number;
  stockId?: number;
}

export interface TransDetailData {
  id: number;
  qty: string;
  price: string;
  amount: string;
  amount2Price: boolean;
  warehouseIds: number[];
}

export interface TransReqData {
  [index: number]: TransDetailData;
}
