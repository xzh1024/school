// 移仓单据状态
export { MOVEING_BILL_STATUS } from "@/constants";
// 收货单据状态
export const STOCK_RECEIVING_BILL_STATUS = {
  0: "待验收",
  1: "验收中",
  2: "待调度处理",
  7: "取消",
  6: "完成"
};
// 入库单据状态
export const STOCKIN_BILL_STATUS = {
  0: "待入库",
  1: "入库中",
  3: "取消",
  2: "完成"
};
// 拣货单据状态
export const STOCKPICKING_BILL_STATUS = {
  0: "待拣货",
  1: "拣货中",
  2: "缺货",
  4: "取消",
  3: "完成"
};
// 出库单据状态
export const STOCKOUT_BILL_STATUS = {
  4: "待出库",
  5: "出库中",
  7: "取消",
  6: "完成"
};
// 移仓单单据状态
export const STOCKMOVING_BILL_STATUS = {
  0: "待提交",
  1: "待确认",
  2: "已确认"
};
// 盘点单据状态
export const STOCKTAKING_BILL_STATUS = {
  0: "待提交",
  1: "待财务审核",
  2: "待仓库审核",
  3: "待仓库/财务审核",
  4: "完成"
};
