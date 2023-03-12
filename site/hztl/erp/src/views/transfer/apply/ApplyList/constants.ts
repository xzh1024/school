import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TableSettingConfig } from "@/constants/interface";
import { TransferBillItem } from "../../interface";

export const TRANSFER_BILL_STATUS = {
  toSubmit: "toSubmit",
  toAudit: "toAudit",
  returned: "returned",
  refused: "refused",
  toWarehouse: "toWarehouse",
  canceled: "canceled",
  completed: "completed"
};

export const TRANSFER_BILL_STATUS_TEXT: { [key: string]: string } = {
  toSubmit: "待提交",
  toAudit: "待调出方审核",
  returned: "调出方退回",
  refused: "调出方拒绝",
  toWarehouse: "待转调拨出库",
  canceled: "已取消",
  completed: "已完成"
};

export const APPLY_TABLE: TableSettingConfig<TransferBillItem> = {
  name: "transferApplyList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "billDate",
      label: "申请日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no
    },
    {
      prop: "statusName",
      label: "单据状态",
      width: CELL_WIDTH.status
    },
    {
      prop: "outCompanyName",
      label: "调出分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "inCompanyName",
      label: "调入分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "planDate",
      label: "预期到货日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "businessManName",
      label: "请调人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "qty",
      label: "申请数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "onTransQty",
      label: "待转调拨出库数量",
      width: 120,
      type: "number"
    },
    {
      prop: "canceledQty",
      label: "取消数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitOutQty",
      label: "待出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitDeliverQty",
      label: "待交货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outAmount",
      label: "已出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "waitOutAmount",
      label: "待出库金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "completedAt",
      label: "完成时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "创建时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "auditByName",
      label: "调出方审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "auditAt",
      label: "调出方审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.no
    },
    {
      prop: "remark",
      label: "单据备注",
      width: CELL_WIDTH.remark
    }
  ]
};
