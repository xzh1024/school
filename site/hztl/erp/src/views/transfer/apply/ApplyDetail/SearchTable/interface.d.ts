import { SeachPartFilters, SeachPartRes } from "@/constants/interface/part";

interface ApplySearchFilters extends SeachPartFilters {
  mode: number | null;
  sort?: string;
}

export interface TransferApplySearchData extends SeachPartRes {
  id: number;
  allocOutQty: string; // 调出分公司实际数
  allocOutLockedQty: string; // 调出分公司锁定数
  allocOutDynaQty: string; // 调出分公司动态数
  allocQtyInTransit: string; // 调拨在途数
  monthlySaleQty: string; // 月均销售数
  onAllocApplyQty: string; // 调拨申请数
  allocOutUsableQty: string; // 可调拨数
  lastAllocPrice: string; // 上次调拨价
  outWarehouseId?: number; // 调出仓库ID
  outWarehouseName?: string; // 调出仓库
}
