// 配件
export const DATE = {
  0: "按日",
  1: "按月"
};
export const FIELDS = {
  warehouseName: "仓库",
  positionName: "货位",
  ownerCompanyName: "货主",
  inOrOutType: "出入库类型",
  inOrOutDate: "出入库日期",
  warehouseAuditByMan: "库房审核人",
  batchNo: "批次号",
  supplierName: "供应商名称",
  cooperatorName: "业务往来单位",
  billType: "业务类型",
  billDate: "业务日期",
  financialAuditDate: "财务审核日期",
  billNo: "业务单据号",
  partCode: "配件编码",
  partName: "配件名称",
  partBrand: "品牌",
  partProductionPlace: "产地",
  partProperty: "性质",
  partCategory: "配件分类"
};
// 指标
export const INDEX = {
  1: "待仓库审核",
  2: "待财务审核",
  4: "完成"
};
//累计中展示的指标字段
export const ACCUMULATION = [
  {
    key: "beginStockQty",
    label: "期初库存数量"
  },
  {
    key: "beginStockTaxedAmount",
    prepend: "￥",
    label: "期初库存金额"
  },
  {
    key: "beginStockUntaxedAmount",
    prepend: "￥",
    label: "期初未税库存金额"
  },
  {
    key: "taxedStockOutSaleAmount",
    prepend: "￥",
    label: "出库销售金额"
  },
  {
    key: "untaxedStockOutSaleAmount",
    prepend: "￥",
    label: "未税出库销售金额"
  },
  {
    key: "stockInQty",
    label: "入库数量"
  },
  {
    key: "stockInTaxedAmount",
    prepend: "￥",
    label: "入库金额"
  },
  {
    key: "stockInUntaxedAmount",
    prepend: "￥",
    label: "未税入库金额"
  },
  {
    key: "stockOutQty",
    label: "出库数量"
  },
  {
    key: "stockOutTaxedAmount",
    prepend: "￥",
    label: "出库成本金额"
  },
  {
    key: "stockOutUntaxedAmount",
    prepend: "￥",
    label: "未税出库成本金额"
  },
  {
    key: "benefitAmount",
    prepend: "￥",
    label: "优惠金额"
  },
  {
    key: "taxedGrossProfit",
    prepend: "￥",
    label: "毛利"
  },
  {
    key: "taxedGrossProfitRate",
    append: "%",
    label: "毛利率"
  },
  {
    key: "untaxedGrossProfit",
    prepend: "￥",
    label: "未税毛利"
  },
  {
    key: "untaxedGrossProfitRate",
    append: "%",
    label: "未税毛利率"
  },
  {
    key: "priceUpRate",
    append: "%",
    label: "加价率"
  },
  {
    key: "endStockQty",
    label: "期末库存数量"
  },
  {
    key: "endStockTaxedAmount",
    prepend: "￥",
    label: "期末库存金额"
  },
  {
    key: "endStockUntaxedAmount",
    prepend: "￥",
    label: "期末未税库存金额"
  },
  {
    key: "turnOverRatio",
    append: "%",
    label: "本期库存周转率"
  }
];

export const CURRENT_INDEX = {
  stockInQty: "本期入库数量",
  stockInTaxedAmount: "本期入库金额",
  stockInUntaxedAmount: "本期未税入库金额",
  stockOutQty: "本期出库数量",
  stockOutTaxedAmount: "本期出库金额",
  stockOutUntaxedAmount: "本期未税出库金额"
};

export const BEGIN_END_INDEX = {
  endStockQty: "期末库存",
  endStockTaxedAmount: "期末库存金额",
  endStockUntaxedAmount: "期末未税库存金额",
  beginStockQty: "期初库存",
  beginStockTaxedAmount: "期初库存金额",
  beginStockUntaxedAmount: "期初未税库存金额"
};

export const DATE_INDEX = {
  outOrInDate: "出入库日期",
  billDate: "业务日期",
  financialAuditDate: "财务审核日期"
};
export const TYPE = {
  出库: "出库",
  入库: "入库"
};

export const BUSINESSTYPE1 = {
  //  入库
  cg: "采购到货",
  jj: "急件到货",
  ct: "采购退货",
  pdr: "盘盈入库",
  qc: "期初导入",
  rd: "调拨入库",
  rt: "调拨入库退货"
};
export const BUSINESSTYPE2 = {
  // 出库
  xt: "销售退货",
  xs: "销售出库",
  pdc: "盘亏出库",
  ycc: "移仓出库",
  kd: "调拨出库",
  kt: "调拨出库退货"
};

export const BUSINESSTYPE3 = {
  cg: "采购到货",
  jj: "急件到货",
  xt: "销售退货",
  pdr: "盘盈入库",
  qc: "期初导入",
  xs: "销售出库",
  ct: "采购退货",
  pdc: "盘亏出库",
  kd: "调拨出库",
  rd: "调拨入库",
  kt: "调拨出库退货",
  rt: "调拨入库退货"
};

export const OUT_IN_INDEX = {
  cg: "本期入库数量",
  jj: "本期入库金额",
  xt: "本期未税入库金额",
  pdr: "本期出库数量",
  ycr: "本期出库金额",
  qc: "本期未税出库金额"
};

export const STOCK_INDEX = {
  cg: "期末库存",
  jj: "期末库存金额",
  xt: "期末未税库存金额",
  pdr: "期初库存",
  ycr: "期初库存金额",
  qc: "期初未税库存金额"
};

export const CRU_IN_OUT_STATUSES = [
  { id: 0, name: "全部" },
  { id: 1, name: "本期有出入库" },
  { id: 2, name: "本期未出入库" }
];
