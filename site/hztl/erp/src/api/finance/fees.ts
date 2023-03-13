import { TotalPageData } from "@/constants/interface";
import request from "@/utils/request";

interface LoadFeesParams {
  dateStart?: string; // 费用查询开始日期
  dateEnd?: string; // 费用查询结束日期
  billNo?: string; // 费用单据号
  billTypes?: ("YZ" | "BX" | "YBX") | [];
  companyIds?: number[]; // 发生公司ID
  settleCompanyIds?: number[]; // 结算公司Id
  applyBys?: number[]; // 申请人（员工ID）
  auditBys?: number[]; // 审核人（员工ID）
  settleBys?: number[]; // 结算人（员工ID）
  status?: number[]; // 状态:0-待提交、1-待审核、2-审核驳回、3-待报销(预支)、4-待结算、5-部分结算、6-完成
  page: number;
  pageSize: number;
}

export interface BaseFeesData {
  billType: "YZ" | "BX" | "YBX"; // 类型：YZ-预支款,BX-报销, YBX-预支报销
  applyAt: string; // 费用时间
  applyAmount: string; // 申请金额
  applyReason: string; // 申请原因
  advanceBillId?: number; // 预支单ID
  remark?: string; // 备注
}

export interface FeesData {
  id: number; // 费用ID
  applyAt: string; // 费用时间
  status: number; // 状态
  billNo: string; // 费用单号
  billType: "YZ" | "BX" | "YBX"; // 类型：YZ-预支款,BX-报销, YBX-预支报销
  applyBy: number; // 申请人员工id
  applyByName: string;
  applyAmount: string; // 申请金额
  applyReason: string; // 申请原因
  advanceBillId: number; // 预支单ID
  advanceBillNo: string; // 预支单号
  advanceAmount: string; // 预支金额
  amount: string; // 应结金额
  settledAmount: string; // 已结金额
  unSettleAmount: string; // 未结金额
  rejectReason: string; // 拒绝原因
  remark: string; // 备注
  auditBy: number; // 审核人员工id
  auditByName: string; // 审核人员工名称
  auditAt: string; // 审核时间
  settleBy: number; // 结算人（员工ID）
  settleByName: string; // 结算人名称）
  settleAt: string; // 结算时间）
  companyId: number; // 发生公司id
  companyName: string; // 发生公司名称
  settleCompanyId: number; // 结算公司id
  settleCompanyName: string; // 结算公司名称
  reimbursementBillId: number; //预支单关联的报销单ID
  belongs: string[];
}

export async function loadFeesist(
  data: LoadFeesParams
): Promise<TotalPageData<FeesData>> {
  return await request({
    url: "/financials/fees/list",
    method: "post",
    data
  });
}

export async function getFeesDetail(id: number): Promise<FeesData> {
  return await request({
    url: `/financials/fees/detail/${id}`,
    method: "get"
  });
}

export async function createData(data: BaseFeesData) {
  return await request({
    url: "/financials/fees/create",
    method: "post",
    data
  });
}

interface UpdateBaseFeesParams extends BaseFeesData {
  id: number;
}

export async function updateFees(data: UpdateBaseFeesParams) {
  return await request({
    url: "/financials/fees/update",
    method: "post",
    data
  });
}

export async function deleteFees(id: number) {
  return await request({
    url: `/financials/fees/delete/${id}`,
    method: "delete"
  });
}

interface ChangeFeesStatus {
  id: number;
  rejectReason?: string;
  status: number;
}
export async function changeFeesStatus(data: ChangeFeesStatus) {
  return await request({
    url: "/financials/fees/status",
    method: "post",
    data
  });
}
