import { KeyStatusEmun } from "./interface";

export const settlementTypes = ["现付", "挂账"];

export const SEETTLE_BILL_TYPES = [
  "销售现付",
  "销售挂账",
  "销售代收",
  "采购现付",
  "采购挂账",
  "采购代收",
  "应收付对账",
  "代收对账",
  "佣金",
  "费用",
  "调拨单",
  "调拨对账",
  "预收单",
  "预付单",
  "预收冲销单",
  "预付冲销单"
];
export const SETTLE_BILL_YX_TYPES = [
  "销售现付",
  "销售挂账",
  "销售代收",
  "采购现付",
  "采购挂账",
  "采购代收",
  "应收付对账",
  "代收对账",
  "佣金",
  "费用",
  "调拨单",
  "调拨对账",
  "预收单",
  "预付单",
  "预收冲销单",
  "预付冲销单",
  "维修工单现付",
  "维修工单挂账",
  "洗车单现付"
];

export const PAY_BUSINESS_TYPES: KeyStatusEmun = {
  XS: "销售现付",
  XT: "销售现付",
  CG: "采购现付",
  CT: "采购现付",
  JJ: "采购现付",
  DZ: "应收付对账",
  DS: "代收对账",
  YZ: "费用",
  BX: "费用",
  YBX: "费用",
  YJ: "佣金",
  DD: "调拨对账",
  YS: "预收单",
  TS: "预收冲销单",
  YF: "预付单",
  TF: "预付冲销单",
  WX: "维修单现付",
  FX: "返修单现付",
  XC: "洗车单现付"
};

export const CHARGE_BUSINESS_TYPES: KeyStatusEmun = {
  XS: "销售挂账",
  XT: "销售挂账",
  CG: "采购挂账",
  CT: "采购挂账",
  JJ: "采购挂账",
  WX: "维修单挂帐",
  FX: "返修单挂帐"
};

export const COLLECT_BUSINESS_TYPES: KeyStatusEmun = {
  XS: "销售代收",
  XT: "销售代收",
  CG: "采购代收",
  CT: "采购代收",
  JJ: "采购代收"
};

export const TRANSFER_BUSINESS_TYPES: KeyStatusEmun = {
  RD: "调拨单",
  RT: "调拨单",
  KD: "调拨单",
  KT: "调拨单"
};

export const KEY_MAP: { [key: string]: number } = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,

  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91,

  d: 68,
  i: 73,
  o: 79
};
