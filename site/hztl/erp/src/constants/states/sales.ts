import { IndexMapStatusEmun, IndexStatusEmun } from "../interface";

// 销售订单状态
export const SALES_ORDER_STATUS: IndexStatusEmun = {
  1: "待提交",
  94: "待定金审核",
  95: "待定金结算",
  2: "待审核",
  3: "待买家付款",
  4: "待销售出库",
  5: "部分出库",
  6: "全部出库",
  7: "待买家收货",
  90: "审批退回",
  91: "买家取消",
  92: "卖家取消",
  93: "系统取消",
  99: "完成"
};
// 销售订单分类状态
export const SALES_ORDER_SORT_STATUS: IndexStatusEmun = {
  1: "待提交",
  2: "待审核",
  11: "待转销售单",
  91: "已取消",
  4: "待销售出库",
  99: "完成"
};
// 销售订单映射状态
export const SALES_ORDER_MAP_STATUS: IndexMapStatusEmun = {
  1: [1, 90],
  2: [2, 3],
  11: [11],
  4: [4],
  91: [91, 92, 93],
  99: [99]
};
// 销售来源类型
export const SALES_SOURCE_TYPE_STATUS: IndexStatusEmun = {
  0: "普通订单",
  1: "平台订单"
};
// 销售订单转出库状态
export const TRANS_SALES_OUT_STATUS: IndexStatusEmun = {
  1: "待转销售出库",
  2: "已转销售出库"
};

// 销售出库单状态
export const SALES_OUT_STATUS: IndexStatusEmun = {
  1: "待提交",
  // 2: "待审核",
  // 3: "待急件处理",
  4: "待仓库处理",
  5: "待财务处理",
  6: "待仓库/财务处理",
  90: "审批退回",
  91: "已撤回",
  93: "待外采确认",
  94: "外采驳回",
  99: "完成"
};
// 销售出库单分类状态
export const SALE_OUT_SORT_STATUS: IndexStatusEmun = {
  1: "待提交",
  2: "待财务审核",
  3: "待仓库审核",
  4: "外采处理中",
  5: "完成"
};
// 销售出库单映射状态
export const SALE_OUT_MAP_STATUS: IndexMapStatusEmun = {
  1: [1, 91],
  2: [5, 6],
  3: [4, 6],
  4: [93, 94],
  5: [99]
};
// 销售出库单明细状态
export const SALES_OUT_DETAIL_STATUS = {
  toBeSubmitted: { label: "待提交", value: 0 },
  tobeAuditted: { label: "待处理", value: 1 },
  rejected: { label: "被驳回", value: 2 },
  confirmed: { label: "外采已确认", value: 3 },
  finished: { label: "完成", value: 99 }
};
// 销售出库单明细标签
export const SALES_OUT_DETAIL_MARKS: IndexStatusEmun = {
  0: "",
  1: "急件驳回",
  2: "库存不足",
  3: "负库存销售",
  4: "急件"
};

// 销售退货单据状态
export const SALES_RETURN_STATUS: IndexStatusEmun = {
  1: "待提交",
  2: "待审核",
  4: "待仓库处理",
  5: "待财务审核",
  6: "待仓库/财务处理",
  7: "待成本价审核",
  91: "取消",
  90: "审批退货",
  99: "完成"
};
