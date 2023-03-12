export type TransferBillType = "QD" | "KD" | "RD" | "KT" | "RT";

export type TransferBillAction =
  | "submit"
  | "revoke"
  | "pass"
  | "return"
  | "refuse"
  | "financial";

interface PermAction {
  submit: boolean; // 提交
  revoke: boolean; // 撤回
  edit: boolean; // 编辑
  financial: boolean; // 财务审核
  audit: boolean; // 审核:
  delete: boolean; // 删除
  trans: boolean; // 转单
  cancel: boolean; // 取消
  import: boolean; // 导入
}

interface LogisticsDetail {
  billId: number; // 单据ID
  billType: string; // 单据类型(bill_no.Code)
  freight: string; // 运费
  freightPayer: string; // 运费付款方
  transportMethod: string; // 运输方式
  logisticsCompanyId: number; // 物流公司
  packMethod: string; // 包装方式
  pickMethod: string; // 提货方式
  arrivalDate: string; // 预计到货日期
  receiverName: string; // 收货人名称
  receiverPhone: string; // 收货人手机
  receiverAreaId: number; // 收货区域ID
  receiverAddress: string; // 收货地址
  logisticsCompanyName: string; // 物流公司名称
  receiverAreaIds: number[];
  receiverAreaNames: string[];
}

interface RelatedBillDetail {
  id: number; // 自增ID
  billNo: string; // 单据号
  companyId: number; // 公司ID
  qty: string; // 单据数量
  createdBy: number; // 创建人
  createdAt: string; // 创建时间
  companyName: string; // 公司名称
  createdByName: string; // 创建人名称
  submitByName: string; // 提交人
  submitAt: string; // 提交时间
  revokeByName: string; // 撤回人
  revokeAt: string; // 撤回时间
  auditByName: string; // 审核人
  auditAt: string; // 审核时间
  returnByName: string; // 退回人
  returnAt: string; // 退回时间
  refuseByName: string; // 拒绝人
  refuseAt: string; // 拒绝时间
  financialByName: string; // 财务审核人
  financialAt: string; // 财务审核时间
  warehouseAuditByName: string; // 仓库审核人
  warehouseAuditAt: string; // 仓库审核时间
}

interface SourceBillDetail {
  id: number; // 自增ID
  billNo: string; // 单据号
  companyId: number; // 公司ID
  qty: string; // 单据数量
  createdBy: number; // 创建人
  createdAt: string; // 创建时间
  companyName: string; // 公司名称
  createdByName: string; // 创建人名称
  submitByName: string; // 提交人
  submitAt: string; // 提交时间
  revokeByName: string; // 撤回人
  revokeAt: string; // 撤回时间
  auditByName: string; // 审核人
  auditAt: string; // 审核时间
  returnByName: string; // 退回人
  returnAt: string; // 退回时间
  refuseByName: string; // 拒绝人
  refuseAt: string; // 拒绝时间
  financialByName: string; // 财务审核人
  financialAt: string; // 财务审核时间
  warehouseAuditByName: string; // 仓库审核人
  warehouseAuditAt: string; // 仓库审核时间
}

interface BillReturnedDetail {
  qty: string; // 退货总数量
  billNos: string[]; // 退货单据号
}

interface AllocInfo {
  waitCompleteQty: string; // 待完成出库数量
  completedQty: string; // 已完成出库数量
}

export interface TransferBillItem {
  billId: number; //订单id
  groupId: number; //分组id
  id: number; // 单据ID
  outCompanyId: number; // 出库公司ID
  inCompanyId: number; // 入库公司ID
  outCompanyName: string; // 出库公司名称
  inCompanyName: string; // 入库公司名称
  type: TransferBillType; // 单据类型
  accountSetId: number; // 帐套ID
  companyId: number; // 公司ID
  companyName: string; // 公司名称
  billNo: string; // 单据号
  status: string; // 单据状态
  statusName: string; // 单据状态名称
  cooperatorId: number; // 往来单位ID
  relatedCompanyId: number; // 往来公司ID
  relatedCompanyName: string; // 往来公司名称
  relatedBillNo: number; // 往来公司单据号，调拨申请单使用
  relatedId: number; // 关联单据ID
  sourceId: number; // 来源单据ID,
  mode: number | null; // 开单模式
  billDate: string; // 业务日期
  paymentType: string; // 支付方式：内部挂账
  businessManId: number; // 业务员ID
  businessManName: string; // 业务员名称
  planDate: string; // 预计到货日期
  remark: string; // 备注
  qty: string; // 单据数量
  returnQty: string; // 已退货数
  amount: string; // 单据金额
  detailsCount: number; // 记录数
  paidAmount: string; // 实付金额
  printCount: number; // 打印次数
  createdBy: number; // 创建者员工ID
  createdAt: string; // 创建时间
  updatedBy: number; // 更新者员工ID
  updatedAt: string; // 更新时间

  outQty: string; // 已出库数量
  outAmount: string; // 已出库金额
  waitOutQty: string; // 待出库数量(对应调拨出库单中的未出库数)
  waitOutAmount: string; // 待出库金额
  waitDeliverQty: string; // 待交货数量(申请数量-已出库数量)
  onTransQty: string; // 待转调拨出库数量(申请数量-已转出库数量)
  canceledQty: string; // 已取消数量
  untaxedPrice: string; // 未税单价
  untaxedAmount: string; // 未税金额
  costAmount: string; // 总成本
  untaxedCostAmount: string; // 总未税成本

  submitByName: string; // 提交人
  submitAt: string; // 提交人
  revokeByName: string; // 撤回人
  revokeAt: string; // 撤回时间
  auditByName: string; // 审核人
  auditAt: string; // 审核时间
  returnByName: string; // 退回人
  returnAt: string; // 退回时间
  refuseByName: string; // 拒绝人
  refuseAt: string; // 拒绝时间
  financialByName: string; // 财务审核人
  financialAt: string; // 财务审核时间
  warehouseAuditByName: string; // 仓库审核人
  warehouseAuditAt: string; // 仓库审核时间
  createdByName: string; // 创建人名称
  canPrint: boolean; // 是否能打印
  hasNoWarehouse?: boolean; // 是否有未设置仓库

  logistics: LogisticsDetail | null; // 物流信息
  relatedBill: RelatedBillDetail | null; // 关联信息
  sourceBill: SourceBillDetail | null; // 来源信息
  returned: BillReturnedDetail | null; // 退货信息
  billNos: string[]; // 多单据号
  reason: string; // 备注

  allocOut: boolean; // 是否为调出方

  actions: PermAction; // 权限
  allocInfo: AllocInfo | null; // 调拨出库额外数据，只有调拨申请单使用
}

export interface TotalInfo {
  detailsCount?: number; // 记录数
  qty?: string; // 单据数量
  amount?: string; // 单据金额
  costAmount?: string; // 总成本
  untaxedCostAmount?: string; // 总未税成本

  outQty?: string; // 已出库数量
  outAmount?: string; // 已出库金额

  waitOutQty?: string; // 待出库数量(对应调拨出库单中的未出库数)
  waitOutAmount?: string; // 待出库金额
  waitDeliverQty?: string; // 待交货数量(申请数量-已出库数量)
  onTransQty?: string; // 待转调拨出库数量(申请数量-已转出库数量)
  canceledQty?: string; // 已取消数量
}

type TransferBillHeaderBase = Partial<
  Pick<
    TransferBillItem,
    | "id" // 单据id
    | "billNo" //单据号
    | "status" //状态
    | "sourceId" // 来源单据号
    | "companyId" // 业务公司id
    | "relatedCompanyId" // 往来公司id
    | "relatedCompanyName" // 往来公司名称
    | "paymentType" // 支付方式：内部挂账
    | "billDate" // 申请日期
    | "planDate" // 预计到货日期
    | "businessManId" // 业务员id
    | "businessManName" // 业务员名称
    | "remark" // 备注
    | "mode" // 申请模式
    | "allocOut" // 是否为调出方
  >
>;

type TransferBillHeaderLogistics = Partial<
  Pick<
    LogisticsDetail,
    | "arrivalDate" // 预计到货日期
    | "freightPayer" // 运费付款方
    | "transportMethod" // 运输方式
    | "logisticsCompanyId" // 物流公司id
    | "packMethod" // 包装方式
    | "pickMethod" // 提货方式
    | "receiverName" // 收货人名称
    | "receiverPhone" // 收货人手机
    | "receiverAreaId" // 收货区域id
    | "receiverAddress" // 收货地址
    | "logisticsCompanyName" //物流公司名称
  >
>;

export interface TransferEditBillHeader
  extends TransferBillHeaderBase,
    TransferBillHeaderLogistics {}

export interface TransferListFilters {
  sort?: string; //排序
  dateQueryType?: string; // 日期类型
  billNo?: string; //单据号
  statuses?: string[]; // 单据状态 toSubmit:待提交 toAudit:待审核 returned:已退回 refused:已拒绝 toFinancial:待财务审核 toWarehouse:待仓库审核 completed:已完成
  companyIds?: number[]; // 业务公司ID
  relatedCompanyIds?: number[]; //往来公司ID
  businessManIds?: number[]; //业务员ID
  createdBys?: number[]; //创建人ID
  dateStart?: string; //单据日期开始
  dateEnd?: string; //单据日期结束
  printStatus?: string; //打印状态 不传：全部， 0：已打印， 1：未打印
}

export interface TransferListFormData {
  dateQueryType?: string; // 日期类型
  timeRange?: [string, string] | []; // 日期范围
  billNo?: string; // 单据号
  relatedCompanyIds?: number[]; // 往来分公司
  statuses?: string[]; // 单据状态
  businessManId?: number; // 业务员
  createdBy?: number; // 制单人
  printStatuses?: [] | [number] | [number, number]; // 打印状态
}

export interface Company {
  id: number;
  name: string;
}
