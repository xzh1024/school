import { IndexMapStatusEmun, IndexStatusEmun } from "../interface";

//采购订单状态
export const PURCHASE_ORDER_STATUS: IndexStatusEmun = {
  0: "待提交",
  13: "待定金审核",
  14: "待定金结算",
  1: "待审核",
  2: "审批退回",
  3: "待卖家确认",
  12: "待付款",
  4: "待卖家发货",
  5: "待采购到货",
  6: "部分收货",
  8: "卖家取消",
  9: "买家取消",
  10: "系统取消",
  7: "完成"
};
//采购订单分类状态
export const PURCHASE_ORDER_SORT_STATUS: IndexStatusEmun = {
  1: "待提交",
  2: "待审核",
  3: "待转采购单",
  4: "已取消",
  5: "完成"
};
//采购订单映射状态
export const PURCHASE_ORDER_MAP_STATUS: IndexMapStatusEmun = {
  1: [0, 2],
  2: [1, 3],
  3: [4, 5, 6, 11, 12],
  4: [8, 9, 10],
  5: [7]
};

//采购到货单状态
export const PURCHASE_RECEIVE_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待仓库处理",
  2: "待财务处理",
  3: "待财务/仓库处理",
  5: "买家取消",
  6: "卖家取消",
  7: "系统取消",
  4: "完成"
};
//采购到货单分类状态
export const PURCHASE_RECEIVE_SORT_STATUS: IndexStatusEmun = {
  1: "待提交",
  2: "待财务审核",
  3: "待仓库审核",
  4: "已取消",
  5: "完成"
};
//采购到货单映射状态
export const PURCHASE_RECEIVE_MAP_STATUS: IndexMapStatusEmun = {
  1: [0],
  2: [2, 3],
  3: [1, 3],
  4: [5, 6, 7],
  5: [4]
};

//采购退货单状态
export const PURCHASE_RETURN_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待仓库处理",
  2: "待财务处理",
  3: "待财务/仓库处理",
  4: "完成"
};

export const PURCHASE_URGENT_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待收货",
  2: "待结算",
  3: "完成"
};

// 采购订单、采购到货单
export const PRIORITY_CATEGORYS = [
  { id: 1, name: "库存售价" },
  { id: 2, name: "固定售价" },
  { id: 3, name: "自定义公式" }
];
