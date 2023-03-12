import { IndexStatusEmun, KeyStatusEmun } from "./interface";

// 权限所属
export const BELONGS: string[] = [
  "self",
  "our",
  "others",
  "rests",
  "toOur",
  "byOur"
];

// 申请状态
export const APPLY_TYPES: IndexStatusEmun = {
  1: "开通云配管家账套",
  2: "加入公司"
};

// 所有单据状态
export const BILL_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待财务审核",
  2: "待仓库审核",
  3: "待仓库/财务审核",
  5: "财务审核不通过",
  6: "仓库审核不通过",
  4: "完成"
};

// 数量判断方式
export const NUM_JUDGE_WAY: IndexStatusEmun = {
  0: "大于",
  1: "小于",
  2: "等于",
  3: "大于等于",
  4: "小于等于",
  5: "不等于"
};
export const QTY_LIMIT_OPS = [
  { id: ">", name: "大于" },
  { id: "<", name: "小于" },
  { id: "=", name: "等于" }
];
// 配件销售状态
export const PARTS_SALE_STATUS = {
  0: "空",
  1: "可销售",
  2: "不可销售"
};

// 配件编码匹配方式
export const PART_CODE_WAY = {
  0: "模糊匹配",
  1: "左匹配",
  2: "右匹配",
  3: "全匹配"
};

// 库存上下限
export const STOCK_LIMITS_OPTINS = [
  { id: 0, name: "正常" },
  { id: 1, name: "超出上限" },
  { id: 2, name: "低于下限" }
];

// 打印状态
export const PRINT_STATUS = [
  // { id: undefined, name: "全部" },
  { id: 0, name: "已打印" },
  { id: 1, name: "未打印" }
];
export const NEW_PRINT_STATUS = [
  { id: 1, name: "未打印" },
  { id: 2, name: "已打印" }
];
// 比较条件
export const COMPARE_OPTIONS = [
  { id: 0, name: "大于" },
  { id: 1, name: "小于" },
  { id: 2, name: "等于" }
];

export const CODEPATTERN_OPTIONS = [
  { id: "模糊匹配", name: "模糊匹配" },
  { id: "左匹配", name: "左匹配" },
  { id: "右匹配", name: "右匹配" },
  { id: "全匹配", name: "全匹配" }
];

// 开单模式
export const MODE_OPTIONS = [
  { id: 0, name: "按配件+货主公司+性质+仓库+货位+批次" },
  { id: 1, name: "按配件+货主公司+性质+仓库+货位" },
  { id: 2, name: "按配件+货主公司+性质+仓库" },
  { id: 3, name: "按配件+货主公司+性质" }
];
// 开单模式
export const NEW_MODE_OPTIONS = [
  { id: 0, name: "配件+货主+性质+仓库+货位+批次" },
  { id: 1, name: "配件+货主+性质+仓库+货位" },
  { id: 2, name: "配件+货主+性质+仓库" },
  { id: 3, name: "配件+货主+性质" }
];
// 调拨出库开单模式
export const TRANSF_MODE_OPTIONS = [
  { id: 2, name: "配件+性质+仓库" },
  { id: 3, name: "配件+性质" },
  { id: 4, name: "配件" }
];
// 查询月时段
export const MONTH_RANGE = [
  { id: 0, name: "最近三月" },
  { id: 1, name: "最近半年" },
  { id: 2, name: "最近一年" },
  { id: 3, name: "不限" }
];

export const MONTH_RANGE_MAP = {
  0: () => {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    return [start, end];
  },
  1: () => {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
    return [start, end];
  },
  2: () => {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
    return [start, end];
  },
  3: () => {
    return [];
  }
};

// 对账情况
export const STATMENT_STATUS: IndexStatusEmun = {
  0: "未对账",
  1: "部分对账",
  2: "已对账"
};

export const SETTLE_STATUS: IndexStatusEmun = {
  0: "未结算",
  1: "部分结算",
  2: "已结算"
};

export const PAYMENT_BILL_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待确认",
  2: "待结算",
  3: "部分结算",
  4: "完成"
};

export const TRANSFER_RECONCILE_STATUS: IndexStatusEmun = {
  0: "待提交",
  3: "部分结算",
  // 5: "待审核",
  // 6: "审核驳回",
  7: "待付款",
  8: "待收款",
  9: "收款驳回",
  10: "待付款方付款",
  11: "待收款方确认",
  4: "完成"
};

export const SOURCE_BILL_TYPE: IndexStatusEmun = {
  0: "销售出库",
  1: "销售退货",
  2: "采购入库",
  3: "采购退货",
  4: "代垫运费"
};

// 单据类型显示值全统一
export const BILL_TYPE: KeyStatusEmun = {
  LR: "手工账",
  XD: "客户订单",
  XS: "配件销售",
  XT: "销售退货",
  SR: "补充登记单",
  CD: "订货计划",
  CG: "配件采购",
  JJ: "急件采购",
  CT: "采购退货",
  DS: "代收对账",
  DZ: "应收付对账",
  YS: "预收",
  TS: "预收冲销",
  OATS: "预收冲销",
  YF: "预付",
  TF: "预付冲销",
  OATF: "预付冲销",
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
  RAO: "收货运费垫付应收款",
  KZ: "账户开账",
  ZZ: "账户转账",
  BL: "保险理赔单",
  XC: "洗车单",
  WX: "维修单",
  FX: "返修单"
};

export const PAYER_OPTINS: IndexStatusEmun = {
  0: "对付",
  1: "自付",
  2: "垫付"
};

export const LOGISTICS_REGISTER_STATUS: IndexStatusEmun = {
  0: "待确认",
  1: "待结算",
  2: "待签收",
  3: "完成"
};

export const TAG_TRANSLATE: KeyStatusEmun = {
  缺: "lack",
  互: "exchange",
  超: "exceed",
  滞: "unsalable",
  废: "reject",
  集: "reject"
};

export const TAG_TOOLTIP: KeyStatusEmun = {
  缺: "库存低于库存下限",
  互: "互换件",
  超: "库存超过库存上限",
  滞: "滞销",
  废: "废品",
  集: "集采配件",
  无此商品: "配件不存在",
  品: "品牌件",
  替: "替换件",
  适: "EPC适用车型",
  图: "有图片"
};

export const SCOPETYPES = [
  { name: "按品牌", id: 2 },
  { name: "按分类", id: 1 },
  { name: "指定配件", id: 3 },
  { name: "全部配件", id: 0 }
];

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_CURRENT_PAGE = 1;
export const PAGE_SIZE_LIST = [10, 20, 50, 100, 200];

export const FRONT_PRECISION_TYPES: { [key: string]: number } = {
  percentage: 2
};

export const PRECISION_TYPES = [
  "money",
  "price",
  "qty",
  "untaxedPrice",
  "percentage"
];

export const NOTICE_TYPE: KeyStatusEmun = {
  Personnel: "人事",
  PurchaseOrder: "订货计划",
  PurchaseArrival: "采购单",
  PurchaseUrgent: "急件处理",
  SaleOrder: "客户订单",
  SaleSale: "销售单",
  StorageStocktaking: "盘点单",
  StorageCollectCategory: "收发货",
  StorageStockmoving: "移仓单",
  PurchaseSettlement: "采购结算",
  SaleSettlement: "销售结算",
  PurchaseReturnSettlement: "采购退货结算",
  SaleReturnSettlement: "销售退货结算",
  UrgentArrivalSettlement: "急件结算",
  ReconciliationSettlement: "对账结算",
  CommissionSettlement: "佣金结算",
  FeeSettlement: "费用结算",
  StatementAllocation: "调拨对账单",
  PlatformPurchase: "平台采购",
  PlatformSale: "平台销售",
  AllocApply: "调拨申请单",
  AllocOut: "调拨出库单",
  AllocIn: "调拨入库单",
  AllocInReturn: "调拨入库退货",
  AllocOutReturn: "调拨出库退货",
  AllocSettlement: "调拨结算",
  PrevFundInSettlement: "预收结算",
  PrevFundOutSettlement: "预付结算",
  RepairBill: "维修工单"
};

export const DAYOPTIONS = [
  { name: "1", id: 1 },
  { name: "2", id: 2 },
  { name: "3", id: 3 },
  { name: "4", id: 4 },
  { name: "5", id: 5 },
  { name: "6", id: 6 },
  { name: "7", id: 7 },
  { name: "8", id: 8 },
  { name: "9", id: 9 },
  { name: "10", id: 10 },
  { name: "11", id: 11 },
  { name: "12", id: 12 },
  { name: "13", id: 13 },
  { name: "14", id: 14 },
  { name: "15", id: 15 },
  { name: "16", id: 16 },
  { name: "17", id: 17 },
  { name: "18", id: 18 },
  { name: "19", id: 19 },
  { name: "20", id: 20 },
  { name: "21", id: 21 },
  { name: "22", id: 22 },
  { name: "23", id: 23 },
  { name: "24", id: 24 },
  { name: "25", id: 25 },
  { name: "26", id: 26 },
  { name: "27", id: 27 },
  { name: "28", id: 28 }
];

export const CLEAN_ON_COUNT = 100;
export const UNVERIFIED_ON_COUNT = 100;
export const PARTS_OFF_COUNT = 100;
export const PARTS_REPEAT_ON_COUNT = 100;

export const NO_PRICE_PERM_TIPS = "无权查看";
export const NO_PRICE_PERM_VALUE = "0.00000001";

// 路由地址映射单据类型
export const ROUTE_MAP_BILL_TYPE: KeyStatusEmun = {
  "/PurchaseObtainPrice": "KX",
  "/PurchaseBilling": "CD",
  "/PurchaseReceiveBilling": "CG",
  "/SalesQuotationPrice": "KB",
  "/SalesBilling": "XD",
  "/SalesOutBilling": "XS",
  "/StocksSearch": "KC",
  "/Accessories": "PC"
};

// eslint-disable-next-line no-irregular-whitespace
export const ALL_SPACE_REG_EXP = /[\s　]+/g;

export const QUICK_ADD_POSITION_LEN = 20;

export const PRINT_LABEL_COMPLETED = "printLabelCompleted";

export const PRINT_LABEL_MAX = 200;

export const PRINT_LABEL_TIPS = `因性能原因，每次最多只允许打印${PRINT_LABEL_MAX}张`;

export const PRINT_LABEL_MAX_EX = 1000;

export const PRINT_LABEL_EX_TIPS = `因性能原因，每次最多只允许打印${PRINT_LABEL_MAX_EX}张`;
