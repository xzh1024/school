import { SALES_OUT_DETAIL_MARKS } from "@/constants/states/sales";

export function formatterDetailBillMarks(row) {
  let statusType;
  if (row.type === 2) {
    statusType = row.status === 2 ? 1 : 4;
  } else if (row.type === 1) {
    statusType = 2;
  } else if (row.type === 3) {
    statusType = 3;
  } else {
    statusType = 0;
  }
  return SALES_OUT_DETAIL_MARKS[statusType];
}
