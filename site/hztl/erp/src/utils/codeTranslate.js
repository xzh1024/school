/**
 * 将 status(单据状态) 转换为 中文
 * @param status 需要转换的单据状态
 * @returns {*} 转换后的字符串
 */
import { BILL_STATUS } from "@/constants";
export function getBillStatus(status) {
  if (status != null) {
    return BILL_STATUS[status];
  } else {
    return null;
  }
}
