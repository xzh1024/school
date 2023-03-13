import { TypeMapStatusEmun } from "../interface";
import {
  PURCHASE_RETURN_STATUS,
  PURCHASE_ORDER_STATUS,
  PURCHASE_RECEIVE_STATUS,
  PURCHASE_URGENT_STATUS
} from "./purchase";
import { SALES_ORDER_STATUS, SALES_RETURN_STATUS } from "./sales";
import { PARTS_SALE_STATUS } from "../store";
export const TYPE_MAP_STATUS: TypeMapStatusEmun = {
  LR: "手工账",
  XD: SALES_ORDER_STATUS,
  XS: PARTS_SALE_STATUS,
  XT: SALES_RETURN_STATUS,
  SR: "补充登记单",
  CD: PURCHASE_ORDER_STATUS,
  CG: PURCHASE_RECEIVE_STATUS,
  JJ: PURCHASE_URGENT_STATUS,
  CT: PURCHASE_RETURN_STATUS,
  DS: "代收对账",
  DZ: "应收付对账",
  SS: "发货运费自付",
  SA: "发货运费垫付",
  SO: "发货运费对付",
  RS: "收货运费自付",
  RA: "收货运费垫付",
  RO: "收货运费对付",
  YZ: "预支款",
  BX: "报销",
  YBX: "预支报销",
  YJ: "佣金",
  FEE: "费用",
  AS: "补充登记",
  AF: "补充登记",
  YJXS: "佣金",
  YJXT: "佣金",
  KD: "调拨出库单",
  RD: "调拨入库单",
  KT: "调拨出库退货单",
  RT: "调拨入库退货单",
  YC: "移仓单",
  PD: "盘点单",
  DD: "调拨对账",
  SAO: "发货运费垫付应收款",
  RAO: "收货运费垫付应收款"
};
