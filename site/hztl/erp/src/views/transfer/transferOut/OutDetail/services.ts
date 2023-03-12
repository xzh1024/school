import request from "@/utils/request";
import { EditBillPart } from "../../interface";

export function updateBillPart(
  billpart: EditBillPart,
  id: number
): Promise<{
  value: number;
}> {
  return request({
    url: `/bills/KD/${id}/details`,
    method: "post",
    data: billpart
  });
}
