const qty = 17;
const money = 15;

export const OUT_INFO = [
  {
    prop: "outInfo.completedBillCount",
    label: "出库已完成单数",
    width: qty
  },
  {
    prop: "outInfo.unCompletedBillCount",
    label: "出库未完成单数",
    width: qty
  },
  {
    prop: "outInfo.stockPartCount",
    label: "出库拣货配件数",
    width: qty
  },
  {
    prop: "outInfo.checkPartCount",
    label: "出库验货配件数",
    width: qty
  },
  {
    prop: "outInfo.stockPartAmount",
    label: "出库拣货配件总金额",
    width: money
  },
  {
    prop: "outInfo.checkPartAmount",
    label: "出库验货配件总金额",
    width: money
  }
];
export const IN_INFO = [
  {
    prop: "inInfo.completedBillCount",
    label: "入库已完成单数",
    width: qty
  },
  {
    prop: "inInfo.unCompletedBillCount",
    label: "入库未完成单数",
    width: qty
  },
  {
    prop: "inInfo.stockPartCount",
    label: "入库拣货配件数",
    width: qty
  },
  {
    prop: "inInfo.checkPartCount",
    label: "入库验货配件数",
    width: qty
  },
  {
    prop: "inInfo.stockPartAmount",
    label: "入库拣货配件总金额",
    width: money
  },
  {
    prop: "inInfo.checkPartAmount",
    label: "入库验货配件总金额",
    width: money
  }
];
