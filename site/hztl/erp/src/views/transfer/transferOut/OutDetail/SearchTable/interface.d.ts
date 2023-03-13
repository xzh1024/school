import { SeachPartRes } from "@/constants/interface/part";

export interface TransferOutSearchData extends SeachPartRes {
  // 增加字段
  id: number;
  ownerCompanyId: number; //货主公司id
  allocOutUsableQty: string; // 可调拨数
  allocReturnableQty: string; // 可调拨退货数
}
