export const businessBillTypeList = [
  "CD",
  "CG",
  "CT",
  "XD",
  "XS",
  "XT",
  "JJ",
  "YJXS",
  "YJXT",
  "CK",
  "RK",
  "QD",
  "KD",
  "RD",
  "KT",
  "RT",
  "WX",
  "FX"
];

export function getBillTypeByBillNo(billNo) {
  const matched = billNo.match(/-([A-Z]{2,})-/);
  return matched && matched[1];
}

export function isBusinessBillNo(billNo) {
  return businessBillTypeList.includes(getBillTypeByBillNo(billNo));
}

export function isBusinessBillType(billType) {
  return businessBillTypeList.includes(billType);
}
