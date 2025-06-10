// 报账单状态
export const PROCESS_STATE = {
  0: '全部',
  1: '草稿',
  2: '审批中',
  3: '已结束',
  4: '未通过',
  5: '退回起草',
  6: '已作废',
  51: '退回起草人',
  52: '退回补充原始单据',
  53: '退回起草人补充附件',
  54: '退回修改供应商信息',
};
// 已处理影响列表流程状态
export const SHADOW_PROCESS_STATE = {
  1: '草稿',
  2: '审批中',
  3: '通过',
  4: '未通过',
  5: '退回起草人',
  6: '作废',
  7: '删除',
  
};

// 获取特定报账单状态
export const getProcessState = (state = []) => {
  if (state.length === 0) {
    return Object.values(PROCESS_STATE);
  }
  let res = [];
  state.forEach(key => {
    if (PROCESS_STATE[key]) {
      res.push({
        value: key,
        label: PROCESS_STATE[key],
      });
    }
  });
  return res;
};

export const PAY_STATE = {
  1: '未付款',
  2: '待付款',
  3: '付款中',
  4: '已付完',
  5: '拒绝付款',
};
