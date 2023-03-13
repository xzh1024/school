import request from "@/utils/request";
import {
  TransferBillType,
  TransferEditBillHeader
} from "@/views/transfer/interface";
import { ReturnEditBillPart } from "../constants";

export function wholeBillAddPart(
  id?: number
): Promise<{
  id: number;
  billNo: string;
  type: TransferBillType;
}> {
  return request({
    url: `/bills/RD/${id}/trans`,
    method: "post"
  });
}

export function batchOrAllStockAddPart(
  detailId?: number,
  stockIds?: (number | undefined)[]
): Promise<{
  id: number;
  billNo: string;
  type: TransferBillType;
}> {
  return request({
    url: `/bills/RD/details/${detailId}/returns`,
    method: "post",
    data: { stockIds }
  });
}

export function addOrUpdatePart(
  billpart: ReturnEditBillPart,
  billHeader?: TransferEditBillHeader
): Promise<{
  id: number;
  billNo: string;
  type: TransferBillType;
}> {
  return request({
    url: "bills/RT/details",
    method: "post",
    data: {
      header: billHeader,
      detail: billpart
    }
  });
}
