import { IndexStatusEmun } from "../interface";

// 出库状态
export const STOCK_OUT_STATUS: IndexStatusEmun = {
  0: "不存在或已删除",
  1: "待提交",
  2: "待审核",
  4: "待仓库审核",
  5: "待财务审核",
  6: "待仓库/财务审核",
  90: "审批退回",
  99: "完成"
};
