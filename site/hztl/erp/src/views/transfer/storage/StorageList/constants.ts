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
  toFinancial: "toFinancial",
  completed: "completed"
};

export const TRANSFER_BILL_STATUS_TEXT: { [key: string]: string } = {
  toSubmit: "待提交",
  toAudit: "待审核",
  returned: "已退回",
  refused: "已拒绝",
  toWarehouse: "待调出方出库",
  toFinancial: "待结算",
  completed: "已完成"
};

export const STORAGE_TABLE: TableSettingConfig<TransferBillItem> = {
  name: "transferStorageList",
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
      label: "单据日期",
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
      width: CELL_WIDTH.type
    },
    {
      prop: ["relatedBill", "companyName"],
      label: "调出分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: ["relatedBill", "billNo"],
      label: "调出单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "KD",
      billIdField: ["relatedBill", "id"]
    },
    {
      prop: "qty",
      label: "总数量",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "amount",
      label: "总金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "costAmount",
      label: "成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedCostAmount",
      label: "未税成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: ["sourceBill", "billNo"],
      label: "调拨申请单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "QD",
      billIdField: ["sourceBill", "id"]
    },
    {
      prop: ["logistics", "freight"],
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "returnQty",
      label: "退货数",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: ["logistics", "packMethod"],
      label: "包装方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: ["logistics", "pickMethod"],
      label: "提货方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: ["logistics", "transportMethod"],
      label: "运输方式",
      width: CELL_WIDTH.method,
      isHide: true
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "auditByName",
      label: "审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "auditAt",
      label: "审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "warehouseAuditByName",
      label: "入库审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "warehouseAuditAt",
      label: "入库审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "financialByName",
      label: "财务结算人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "financialAt",
      label: "财务结算时间",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "printCount",
      label: "打印次数",
      width: CELL_WIDTH.number,
      isHide: true
    },
    {
      prop: "remark",
      label: "单据备注",
      width: CELL_WIDTH.remark,
      isHide: true
    }
  ]
};
