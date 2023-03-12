export interface ItemType {
  label: string;
  value: string | number;
}

export interface ObjectEnumType {
  [key: string | number]: string;
}

export const workerType = [
  { label: '报事报修', value: 1 },
  { label: '巡场', value: 2 },
  { label: '进场装修', value: 3 },
  { label: '撤场', value: 4 }
] as ItemType[];

export const workerStatusType = [
  { label: '启用', value: 1 },
  { label: '停用', value: 2 }
];

export const timeoutStateType = [
  { label: '已超时', value: 1 },
  { label: '未超时', value: 2 }
];

// 	工单状态（0：草稿、1：待处理、2：处理中、3：已撤销、4：已完成、5：已关闭）
export const workerStatusData = [
  { label: '草稿', value: 0 },
  { label: '待处理', value: 1 },
  { label: '处理中', value: 2 },
  { label: '已撤销', value: 3 },
  { label: '已完成', value: 4 },
  { label: '已关闭', value: 5 }
];

// 紧急程度（1：一般、2：重要、3：紧急）
export const urgencyType = [
  { label: '一般', value: 1 },
  { label: '重要', value: 2 },
  { label: '紧急', value: 3 }
];

// 审批类类型（1：我发起的、2：待我处理、3：抄送我的、4：我的已办）
export const approvalType = [
  { label: '我发起的', value: 2 },
  { label: '待我处理', value: 1 },
  { label: '抄送我的', value: 4 },
  { label: '我的已办', value: 3 }
];
