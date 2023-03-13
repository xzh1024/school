export interface ManulData {
  logId: number; // 结算单ID
  subId: number; // 结算单资金明细ID
  companyId: number;
  companyName: string;
  byCompanyId: number;
  byCompanyName: string;
  cooperatorId: number;
  cooperatorName: string;
  paymentTypeName: string;
  paymentType: number; // 收付类型 0/1 收/付
  paymentDate: string;
  unsettleStatus: number; // 状态 0/1/2 待反结算/已反结算/反结算冲销
  status: number; // 状态 0/1 待复核/复核完成
  statusName: string;
  amountIn: string;
  amountOut: string;
  checkNumber: string;
  checkDate: string;
  reviewBy: number;
  reviewByName: string;
  reviewDate: string;
  handledBy: number;
  handledByName: string;
  description: string;
  remark: string;
  updatedBy: number;
  updatedByName: string;
  updatedAt: string;
  createdBy: number;
  createdByName: string;
  createdAt: string;
  // belongs: {
  //   our: boolean;
  //   byOur: boolean;
  //   others: boolean;
  // };
  belongs: string[];
  logNo: string;
  logDate: string;
  sourceBillId: number;
  sourceBillNo: string;
  sourceBillType: string;
}
