// status为单据状态值

export function getBillStatus(status) {
  switch (status) {
    case 0:
      return "待提交";
    case 1:
      return "待库房处理";
    case 2:
      return "待财务处理";
    case 3:
      return "待库房或财务处理";
    case 4:
      return "完成";
    default:
      return;
  }
}
