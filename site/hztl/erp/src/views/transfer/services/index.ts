import { TotalPageData, BackEndPageParams } from "@/constants/interface";
import { SalePrice } from "@/constants/part";
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  TransferBillPartItem,
  EditBillPart,
  TransferBillAction,
  TransferEditBillHeader,
  TransferBillItem,
  TransferBillType,
  ReturnablePartPrams,
  ReturnablePartData,
  TransferListFilters,
  TransReqData
} from "../interface";

export interface LatestBillPariceDetail {
  latestPrice: string; // 上次调出/调入价格
  qty: string; // 实际数
  dynamicQty: string; // 动态数
  lockedQty: string; // 锁定数
  allocableQty: string; // 可调数
  returnableQty?: string; // 可调拨退货数
  purchaseQtyInOrdering?: string; // 采购在订数
  purchaseQtyInTransit?: string; // 采购在途数
  saleQtyInOrdering?: string; // 销售在订数
  saleQtyToDeliver?: string; // 销售待交货数
  allocQtyInOrdering?: string; // 调拨在订数
  allocQtyInTransit?: string; // 调拨在途数
  applyIn?: {
    // 请调公司配件详情
    qty: string; // 实际数
    monthlySaleQty: string; // 月均销售数
    allocQtyInOrdering: string; // 调拨在订数
    allocQtyInTransit: string; // 调拨在途数
  };

  salePrices: SalePrice; // 其他售价
  price: string; // 当前价格
  warehouseId?: number; // 出库仓库ID
  warehouseName?: string; // 出库仓库名称
}
export interface TransferListParams
  extends TransferListFilters,
    BackEndPageParams {}

export class TransferService {
  private type: TransferBillType;
  constructor(type: TransferBillType) {
    this.type = type;
  }
  fetchTransferList(
    params: TransferListParams
  ): Promise<TotalPageData<TransferBillItem>> {
    return request({
      url: `/bills/${this.type}/list`,
      method: "get",
      params: params
    });
  }
  fetchTransferBill(
    id: number,
    sort?: string
  ): Promise<{
    header: TransferBillItem;
    details: TransferBillPartItem[];
  }> {
    return request({
      url: `/bills/${this.type}/${id}`,
      method: "get",
      params: { sort }
    });
  }
  cancelBill(
    id?: number,
    data?: TransReqData
  ): Promise<{
    id: number;
    billNo: string;
    type: TransferBillType;
  }> {
    return request({
      url: `/bills/${this.type}/${id}/cancel`,
      method: "post",
      data
    });
  }
  transBill(
    id?: number,
    data?: TransReqData
  ): Promise<{
    id: number;
    billNo: string;
    type: TransferBillType;
  }> {
    return request({
      url: `/bills/${this.type}/${id}/trans`,
      method: "post",
      data
    });
  }
  addPart(
    billHeader: TransferEditBillHeader,
    billpart: EditBillPart
  ): Promise<{
    id: number;
    billNo: string;
    type: TransferBillType;
  }> {
    return request({
      url: `/bills/${this.type}`,
      method: "post",
      data: {
        header: billHeader,
        detail: billpart
      }
    });
  }
  updateTransferBillStatus(params: {
    id: number;
    action: TransferBillAction;
    reason?: string;
    confirm?: boolean;
  }): AxiosPromise<unknown> {
    return request({
      url: `/bills/${this.type}/${params.id}/${params.action}`,
      method: "PUT",
      data: {
        reason: params.reason,
        confirm: params.confirm
      }
    });
  }
  updateTransferBillHeader(id: number, billHeader: TransferEditBillHeader) {
    return request({
      url: `/bills/${this.type}/${id}`,
      method: "post",
      data: billHeader
    });
  }
  updateTransferBillpart(data: EditBillPart[], id?: number) {
    const url = id
      ? `/bills/${this.type}/${id}/details`
      : `/bills/${this.type}/details`;
    return request({
      url,
      method: "post",
      data
    });
  }
  removeTransferBill(id: number) {
    return request({
      url: `/bills/${this.type}/${id}`,
      method: "DELETE"
    });
  }
  removeTransferBillPart(id: number, ids: number[], DB?: boolean) {
    //调拨出库用新接口
    const url = DB
      ? `/bills/${this.type}/${id}/group-details`
      : `/bills/${this.type}/${id}/details`;
    return request({
      url,
      method: "DELETE",
      data: ids
    });
  }
  getLatestBillDetail(params: {
    billId?: number; //订单id
    groupId?: number; //分组id
    allocOut?: boolean; // 是否为调拨出库
    detailId?: number; // 明细ID，编辑时使用，有DetailId时，其他可不传
    mode?: number; // 开单模式（0:按批次号,1:按货位,2:按仓库,3:按性质），有DetailId时可不传
    partId?: number; // 配件ID，没有DetailId时，PartId必需
    relatedCompanyId?: number; // 往来公司ID
    property?: string; // 配件性质，开单模式3/2/1时，Property必需
    warehouseId?: number; // 仓库ID，开单模式2/1时，WarehouseId必需
    positionId?: number; // 货位ID，开单模式1时，PositionId必需
    stockId?: number; // 库存ID，开单模式0时，StockId必需
  }): Promise<LatestBillPariceDetail> {
    return request({
      url: `/bills/${this.type}/latest`,
      method: "get",
      params
    });
  }
  getReturnablePartDetail(
    params: ReturnablePartPrams
  ): Promise<ReturnablePartData> {
    return request({
      url: `/bills/${this.type}/returnable-part`,
      method: "get",
      params
    });
  }
}
