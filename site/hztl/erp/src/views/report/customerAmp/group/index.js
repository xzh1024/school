// 分公司
export const COMPANY = {
  companyName: "分公司名称"
};
// 供应商
export const SUPPLIER = {
  cooperatorArea: "供应商区域",
  cooperatorName: "供应商名称"
};
// 单据
export const BILLS = {
  settlementType: "支付方式",
  invoiceType: "发票类型",
  businessMan: "单据号",
  billType: "单据类型"
};
// 人员
export const PEOPLE = {
  businessMan: "业务员",
  createdBy: "制单人",
  financialAuditBy: "财务审核人"
};
// 配件
export const PARTS = {
  code: "配件编码",
  name: "配件名称",
  brand: "配件品牌",
  categoryName: "配件分类",
  vehModel: "车型",
  productionPlace: "产地"
};
// 配件
export const DATE = {
  0: "按日",
  1: "按月"
};
//支付方式
export const PAY_TYPE = {};
// 发票类型
export const INVIOCE_TYPE = {};
//单据类型
export const BILL_TYPE = {
  cg: "普通采购单",
  jj: "急件采购单",
  ct: "采购退货"
};
// 状态
export const STATUS = {
  1: "待仓库审核",
  2: "待财务审核",
  4: "完成"
};
//指标比较
export const INDEX_PATTERN = {
  0: "=",
  1: ">",
  2: "<",
  3: ">=",
  4: "<="
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
    key: "returnEarlyAmount",
    label: "退前期销售金额",
    prepend: "￥"
  },
  {
    key: "taxedBillAmount",
    label: "开单金额",
    prepend: "￥"
  },
  {
    key: "taxedSaleAmount",
    prepend: "￥",
    label: "销售额"
  },
  {
    key: "taxedPurchaseAmount",
    prepend: "￥",
    label: "成本额"
  },
  {
    key: "taxedGrossProfit",
    prepend: "￥",
    label: "毛利"
  },
  {
    key: "untaxedGrossProfit",
    prepend: "￥",
    label: "未税毛利"
  },
  {
    key: "taxedGrossProfitRate",
    append: "%",
    label: "毛利率"
  },
  {
    key: "priceUpRate",
    label: "加价率",
    append: "%"
  },
  {
    key: "returnedAmount",
    prepend: "￥",
    label: "已退货金额"
  },
  {
    key: "returnedRatio",
    append: "%",
    label: "退货率"
  },
  {
    key: "yearSaleAmount",
    label: "去年同期销售金额",
    prepend: "￥"
  },
  {
    key: "yoyIncreaseAmount",
    prepend: "￥",
    label: "同比增幅"
  },
  {
    key: "yoyIncreaseRatio",
    append: "%",
    label: "同比增幅占比"
  },
  {
    key: "lastSaleAmount",
    prepend: "￥",
    label: "上期销售金额"
  },
  {
    key: "momIncreaseAmount",
    prepend: "￥",
    label: "环比增幅"
  },
  {
    key: "momIncreaseRatio",
    append: "%",
    label: "环比增幅占比"
  }
];

export const DEFAULT_INDEX = {
  returnEarlyAmount: "退前期销售金额",
  taxedBillAmount: "开单金额",
  taxedSaleAmount: "销售额",
  taxedPurchaseAmount: "成本额",
  taxedGrossProfit: "毛利",
  untaxedGrossProfit: "未税毛利",
  taxedGrossProfitRatio: "毛利率",
  priceUpRate: "加价率",
  returnedAmount: "已退货金额",
  returnedRatio: "退货率",
  yearSaleAmount: "去年同期销售金额",
  yoyIncreaseAmount: "同比增幅",
  yoyIncreaseRatio: "同比增幅占比",
  lastSaleAmount: "上期销售金额",
  momIncreaseAmount: "环比增幅",
  momIncreaseRatio: "环比增幅占比"
};
