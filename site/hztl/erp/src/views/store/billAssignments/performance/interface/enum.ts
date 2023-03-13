export const OUT_OR_IN_TYPE = {
  CK: "出库单",
  RK: "入库单"
};

export const BILL_STATUS = {
  0: "待出库拣货",
  1: "待出库验货",
  2: "待入库验货",
  3: "待入库上架",
  4: "待审核确认",
  5: "完成"
};

// "sourceBillTypes": [	 # 业务单据类型数组： XS-销售出库单,XT-销售退货单,CG-采购到货单,CT-采购退货单,JJ-急件到货单 KD-调拨出库单,RD-调拨入库单,KT-调拨出库退货单,RT-调拨入库退货单
export const SOURCE_BILL_TYPES = {
  XS: "销售出库单",
  XT: "销售退货单",
  CG: "采购到货单",
  CT: "采购退货单",
  JJ: "急件到货单",
  KD: "调拨出库单",
  RD: "调拨入库单",
  KT: "调拨出库退货单",
  RT: "调拨入库退货单"
};
