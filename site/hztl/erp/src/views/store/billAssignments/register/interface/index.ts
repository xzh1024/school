interface PageModel {
  page?: number;
  pageSize?: number;
}

export interface BillEnumModel {
  label: string;
  value: string;
}
export interface OptionNumberMap {
  [index: number]: string;
}
export interface OptionStringMap {
  [key: string]: string;
}

export interface TabsModule {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: any;
}
export interface PersonModel {
  id: number;
  name: string;
}

export interface SearchFormModule extends PageModel {
  dateType?: number; // 日期类型：0-出入库日期，1-业务日期
  timeRange: string[]; // 业务日期
  dateStart?: string;
  dateEnd?: string;
  billType?: string; // 出入库类型数组：CK-出库单，RK-入库单
  companyIds: number[]; //业务公司ID数组
  storageCompanyIds: number[]; // 仓储公司ID数组
  status: number[]; // 出入库单据状态数组： 0-待出库拣货，1-待出库验货，2-待入库验货，3-待入库上架，4-待审核确认，5-完成
  billNo: string; // 单据号：出入库单号/来源业务单号
  warehouseIds: number[]; // 仓库ID数组
  printStatus: number[]; // 打印状态：0-全部，1-已打印，2-未打印
  ownerCompanyIds: number[]; //货主公司ids
  oppositeCompanyIds: number[]; //对象公司id
  oppositeCooperatorIds: number[]; //对象往来单位id
}

export interface TotalInfo {
  partCount: string; //合计配件数量
  amount: string; //合计总金额
}

export interface WarehouseData<T> {
  rows: T[];
  totalPage: number;
  totalSize: number;
  otherSize: number; //另一个页签查询出来的总行数，当前页签总数量取TotalSize
  totalInfo: TotalInfo;
}
export interface RegisterModel {
  billId?: number; // 出入库单据ID
  billType?: string;
  checkRemark?: string; // 验货备注
  stockRemark?: string; // 出库拣货/入库上架备注
  auditRemark?: string; // 审核确认备注
  checkAssigneeIds?: number[]; // 验货人ID,NAME数组
  stockAssigneeIds?: number[]; // 出库拣货/入库上架人ID,NAME数组
  type?: number;
}
export interface RegisterRequest {
  billId: number; // 打印的单据ID
  billType: string; // 单据类型：CK-出库单,RK-入库单
}
export interface RegisterResponse {
  checkRemark: string; // 验货备注
  stockRemark: string; // 出库拣货/入库上架备注
  auditRemark: string; // 审核确认备注
  checkAssignees: PersonModel[]; // 验货人ID,NAME数组
  stockAssignees: PersonModel[]; // 出库拣货/入库上架人ID,NAME数组
}
export interface WarehousesUsersModle {
  name: string;
  warehouseId: number;
  roleCodes: string[];
}
export interface SelectSearchModel {
  name: string;
}
export interface ResponseModel {
  code: string;
  message: string;
}

export interface WarehouseBillItem {
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
  companyName: string; // 业务公司名称
  warehouseName: string; // 仓库名称
  stockDate: string; // 出/入库日期
  stockByName: string; // 拣货/上架人名称
  checkByName: string; // 验货人名称
  auditByName: string; // 审核确认人名称
  createdByName: string; // 制单人名称
  receiverName: string; // 收货人名称
  receiverPhone: string; // 收货人手机
  receiverAreaId: number; // 收货区域ID
  receiverAddress: string; // 收货地址
  freight: string; // 运费
  freightPayer: string; // 运费付款方
  transportMethod: string; // 运输方式
  logisticsCompanyId: number; // 物流公司
  packMethod: string; // 包装方式
  pickMethod: string; // 提货方式
  arrivalDate: string; // 预计到货日期
  logisticsCompanyName: string; // 物流公司名称
  belongs: string[];
}

export interface TabsCountModel {
  enter: number;
  out: number;
  max?: number;
}
