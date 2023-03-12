/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export async function loadBillSettle(data: any) {
  return request({
    module: "erp",
    url: "/financials/settles/list_of_bill",
    method: "post",
    data
  });
}

export async function loadBillSettleDetail(data: any) {
  return request({
    module: "erp",
    url: "/financials/settles/details_of_bill",
    method: "post",
    data
  });
}

export interface BillSettleParams {
  confirmDate: string; // 确认日期
  enhancedSettlementType: string; // 支付方式 现付/挂账/物流代收
  billType: string; // 单据类型 销售开单/销售退单/采购开单/采购退单/采购急件 /对账单/收发货登记单/佣金(YJ)/预支款(YZ)/报销(BX)
  billId: number; // 业务单ID
  paymentBy?: string | null; // 收/付款人
  discountAmount: number; // 优惠金额
  prepayedAmount?: number; // 预收/付抵消金额
  transPrepayedAmount?: number; // 转预收/付金额
  remark?: string | null; // 备注
  isUnsettle?: boolean; // 是否反结算
  billNo?: string; // 单据号
  invoiceType?: string; // 发票类型
  details?: [
    // 结算明细 仅现付时存在
    {
      fundAccountId: number; // 资金账户ID
      amount: number; // 金额
      checkNumber?: string; // 支票号码
      remark?: string; // 备注
    }
  ];
}
export interface SettleBillsParams {
  billType: string; // 单据类型 销售开单/销售退单/采购开单/采购退单/采购急件 /对账单/收发货登记单/佣金(YJ)/预支款(YZ)/报销(BX)
  billId: number; // 业务单ID
  billNo?: string; // 单据号
  settleAmount?: number; // 佣金应结金额
}
export interface BatchSettleParams {
  confirmDate: string; // 确认日期
  enhancedSettlementType: string; // 支付方式 现付/挂账/物流代收
  fundAccountId: number; // 资金账户ID
  paymentBy?: string | null; // 收/付款人
  amount: number; // 金额
  discountAmount: number; // 优惠金额
  remark?: string | null; // 备注
  settleBills?: SettleBillsParams[];
}

export async function billSettle(data: { billSettles: BillSettleParams[] }) {
  return request({
    module: "erp",
    url: "/financials/settles/bill_settle",
    method: "post",
    data
  });
}

export async function billBatchSettle(data: BatchSettleParams) {
  return request({
    module: "erp",
    url: "/financials/commissions/batch-settle",
    method: "post",
    data
  });
}

export async function loadSettledList(data: any) {
  return request({
    module: "erp",
    url: "/financials/logs/list_of_settle",
    method: "post",
    data
  });
}

export async function loadSettledDetail(data: any) {
  return request({
    module: "erp",
    url: "/financials/logs/list_of_settle_detail",
    method: "post",
    data
  });
}

export async function backSettle(data: any) {
  return request({
    module: "erp",
    url: "/financials/settles/unsettle",
    method: "post",
    data
  });
}
