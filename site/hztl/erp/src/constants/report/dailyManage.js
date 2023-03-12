export const FINANCE_TYPE_OPTIONS = [
  { name: "收款", id: "FinancialLogIn" },
  { name: "付款", id: "FinancialLogOut" },
  { name: "采购", id: "Purchase" },
  { name: "销售", id: "Sale" },
  { name: "调拨出库", id: "AllocOut" },
  { name: "调拨入库", id: "AllocIn" },
  { name: "盘点", id: "Stocktaking" },
  { name: "应收登记", id: "ReceivablePayableIn" },
  { name: "应付登记", id: "ReceivablePayableOut" },
  { name: "收/发货登记", id: "LogisticRegistration" },
  { name: "纯利润", id: "NetProfit" }
];

export const FINACIAL_TYPE = ["FinancialLogIn", "FinancialLogOut"];

export const BUSINESS_TYPE = [
  "AllocIn",
  "AllocOut",
  "Purchase",
  "Sale",
  "ReceivablePayableIn",
  "ReceivablePayableOut",
  "LogisticRegistration",
  "Stocktaking"
];

export const FINACIAL_FINACIAL_TYPE = ["NetProfit"];

export const STATUS = [
  {
    label: "财务已审",
    value: "Financial"
  },
  {
    label: "仓库已审",
    value: "Warehouse"
  },
  {
    label: "仓库或财务已审",
    value: "FinancialOrWarehouse"
  }
];

export const PAY_TYPE = {
  0: "应收付对账",
  1: "物流代收对账",
  2: "调拨对账"
};
