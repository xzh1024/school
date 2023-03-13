export const BILL_TYPE_ENUM = {
  RK: "入库单",
  CK: "出库单"
};

// 业务单据类型： XS-销售出库单,XT-销售退货单,CG-采购到货单,CT-采购退货单,JJ-急件到货单 KD-调拨出库单,RD-调拨入库单,KT-调拨出库退货单,RT-调拨入库退货单
export const SOURCE_BILL_TYPE_ENUM = {
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

export const BILL_STATUS_ENUM = {
  0: "待出库拣货",
  1: "待出库验货",
  2: "待入库验货",
  3: "待入库上架",
  4: "待审核确认",
  5: "完成"
};

export const OUT_BILL_ENUM = [
  // {
  //   label: "单据类型",
  //   value: "billType",
  //   enum: BILL_TYPE_ENUM
  // },
  {
    label: "业务单据类型",
    value: "sourceBillType",
    enum: SOURCE_BILL_TYPE_ENUM
  },
  {
    label: "出库单号",
    value: "billNo"
  },
  {
    label: "出库日期",
    value: "stockDate"
  },
  {
    label: "仓库",
    value: "warehouseName"
  },
  {
    label: "状态",
    value: "status",
    enum: BILL_STATUS_ENUM
  },
  {
    label: "业务公司",
    value: "companyName"
  },
  {
    label: "业务日期",
    value: "sourceBillDate"
  },
  {
    label: "货主公司",
    value: "ownerCompanyName"
  },
  {
    label: "往来单位/分公司",
    value: "oppositeName"
  },
  {
    label: "业务单号",
    value: "sourceBillNo"
  },
  {
    label: "配件数",
    value: "partCount"
  },
  {
    label: "总金额",
    value: "amount"
  },
  {
    label: "制单人",
    value: "createdByName"
  }
];

export const ENTER_BILL_ENUM = [
  // {
  //   label: "单据类型",
  //   value: "billType",
  //   enum: {
  //     RK: "入库单",
  //     CK: "出库单"
  //   }
  // },
  {
    label: "业务单据类型",
    value: "sourceBillType",
    enum: SOURCE_BILL_TYPE_ENUM
  },
  {
    label: "入库单号",
    value: "billNo"
  },
  {
    label: "入库日期",
    value: "stockDate"
  },
  {
    label: "仓库",
    value: "warehouseName"
  },
  {
    label: "状态",
    value: "status",
    enum: BILL_STATUS_ENUM
  },
  {
    label: "业务公司",
    value: "companyName"
  },
  {
    label: "业务日期",
    value: "sourceBillDate"
  },
  {
    label: "货主公司",
    value: "ownerCompanyName"
  },
  {
    label: "往来单位/分公司",
    value: "oppositeName"
  },
  {
    label: "业务单号",
    value: "sourceBillNo"
  },
  {
    label: "配件数",
    value: "partCount"
  },
  {
    label: "总金额",
    value: "amount"
  },
  {
    label: "制单人",
    value: "createdByName"
  }
];
