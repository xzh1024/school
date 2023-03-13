import { BackEndExportColumn } from "@/constants/interface";
export interface OptionNumberMap {
  [index: number]: string;
}
export interface OptionStringMap {
  [key: string]: string;
}
export interface InfoModel {
  completedBillCount: number; // 已完成业务单据数
  unCompletedBillCount: number; // 未完成业务单据数
  stockPartCount: string; // 出库-拣货配件数，入库-上架配件数
  checkPartCount: string; // 验货配件数
  stockPartAmount: string; // 出库-拣货总金额，入库-上架总金额
  checkPartAmount: string; // 验货配件总金额
}

export interface TotalInfoModel {
  outInfo: InfoModel;
  inInfo: InfoModel;
}
export interface DetailTotalInfoModel {
  partCount: string; // 单据配件数量
  amount: string; // 单据配件总金额
  stockPartCount: string; //拣货/上架数
  stockAmount: string; //拣货/上架总金额
  checkPartCount: string; // 验货配件数
  checkAmount: string; //验货金额
}

export interface SummaryModel extends TotalInfoModel {
  companyId: number; // 业务分公司ID
  companyName: string; // 业务分公司名称
  staffId: number; // 员工ID
  staffName: string; // 员工名称
  belongs?: boolean;
}

export interface SummaryResponseModel<T> {
  rows: T[];
  totalInfo: TotalInfoModel; // 合计信息
  totalSize: number;
  totalPage: number;
}
export interface SummaryDetailResponseModel<T> {
  rows: T[];
  totalInfo: DetailTotalInfoModel;
  totalSize: number;
  totalPage: number;
}

export interface SummaryRequestModel {
  dateType: number; // 日期类型：0-出入库日期，1-业务日期
  dateStart?: string; // 业务日期
  dateEnd?: string; // 业务日期
  billNo: string; // 单据号：出入库单号/来源业务单号
  staffs: number[]; // 仓库人员ID数组
  warehouseIds: number[]; // 仓库ID数组,
  storageCompanyIds: number[]; // 仓储公司ID数组
  companyIds: number[]; // 业务公司ID数组
  billType: string[]; // 出入库类型数组：CK-出库，RK-入库
  sourceBillTypes: string[]; // 业务单据类型数组： XS-销售出库单,XT-销售退货单,CG-采购到货单,CT-采购退货单,JJ-急件到货单 KD-调拨出库单,RD-调拨入库单,KT-调拨出库退货单,RT-调拨入库退货单
  status: number[]; // 出入库单据状态数组： 0-待出库拣货，1-待出库验货，2-待入库验货，3-待入库上架，4-待审核确认，5-完成
  page?: number;
  pageSize?: number;
}
export interface SummaryDetailRequestModel {
  dateType: number; // 日期类型：0-出入库日期，1-业务日期
  dateStart?: string; // 业务日期
  dateEnd?: string; // 业务日期
  billNo: string; // 单据号：出入库单号/来源业务单号
  staffs: number[]; // 仓库人员ID数组
  warehouseIds: number[]; // 仓库ID数组,
  storageCompanyIds: number[]; // 仓储公司ID数组
  companyIds: number[]; // 业务公司ID数组
  billType: string[]; // 出入库类型数组：CK-出库，RK-入库
  sourceBillTypes: string[]; // 业务单据类型数组： XS-销售出库单,XT-销售退货单,CG-采购到货单,CT-采购退货单,JJ-急件到货单 KD-调拨出库单,RD-调拨入库单,KT-调拨出库退货单,RT-调拨入库退货单
  status: number[]; // 出入库单据状态数组： 0-待出库拣货，1-待出库验货，2-待入库验货，3-待入库上架，4-待审核确认，5-完成
  page?: number;
  pageSize?: number;
  companyId?: number; // 上级表中选中行的业务公司ID
  staffId?: number; // 上级表中选中行的员工ID
}

export interface SummaryDetailModel {
  id: number; // ID
  accountSetId: number; // 账套ID
  companyId: number; // 业务公司ID
  billNo: string; // 出/入库单号
  billType: string; // 单据类型： RK-入库单，CK-出库单
  status: number; // 单据状态： 0-待出库拣货，1-待出库验货，2-待入库验货，3-待入库上架，4-待审核确认，5-完成
  sourceBillType: string; // 来源单据类型：XS,XT,CG,CT...
  sourceBillId: number; // 来源单ID
  sourceBillNo: string; // 来源单号
  sourceBillDate: string; // 来源单据业务日期
  warehouseId: number; // 仓库ID
  partCount: string; // 配件数量
  amount: string; // 总金额
  stockRemark: string; // 上下架备注：拣货/上架时的备注
  checkRemark: string; // 验货备注
  auditRemark: string; // 审核确认备注
  stockAt: string; // 拣货/上架时间
  checkAt: string; // 验货时间
  auditAt: string; // 审核确认时间
  stockBy: number; // 拣货/上架登记人ID
  checkBy: number; // 验货人登记人ID
  auditBy: number; // 审核确认人ID
  printCount: number; // 打印次数
  createdBy: number; // 创建者员工ID
  createdAt: string; // 创建时间
  updatedBy: number; // 更新者员工ID
  updatedAt: string; // 更新时间
  stockDate: string; // 出/入库日期
  stockPartCount: string; // 拣货/上架数
  stockAmount: string; // 拣货/上架总金额
  checkPartCount: string; // 验货配件数
  checkAmount: string; // 验货金额
  companyName: string; // 业务公司名称
  warehouseName: string; // 仓库名称
  stockByName: string; // 拣货/上架人名称
  checkByName: string; // 验货人名称
  auditByName: string; // 审核确认人名称
  createdByName: string; // 制单人名称
  belongs?: boolean;
}

export interface SelectSearchModel {
  name: string;
}

export interface PersonModel {
  id: number;
  name: string;
}

export interface WarehousesUsersModle {
  name: string;
  warehouseId?: number;
  roleCodes: string[];
}
export interface ExportDataModel {
  prop: string;
  label: string;
  width: number;
}

// export
export interface ExportSummaryListParams extends SummaryRequestModel {
  columnsSettings: BackEndExportColumn[];
}
export interface ExportSummaryDetailParams extends SummaryDetailRequestModel {
  columnsSettings: BackEndExportColumn[];
}
