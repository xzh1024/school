import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TransferBillItem } from "../../interface";

export const TRANSFER_BILL_STATUS = {
  toSubmit: "toSubmit",
  toAudit: "toAudit",
  returned: "returned",
  refused: "refused",
  toFinancial: "toFinancial",
  toWarehouse: "toWarehouse",
  completed: "completed"
};

export const TRANSFER_BILL_STATUS_TEXT: { [key: string]: string } = {
  toSubmit: "待提交",
  toAudit: "待调出方审核",
  returned: "调出方退回",
  refused: "调出方拒绝",
  toFinancial: "待结算",
  toWarehouse: "待调出方入库",
  completed: "已完成"
};

export const STOCKIN_RETURN_TABLE: TableSettingConfig<TransferBillItem> = {
  name: "transferStockinReturnList",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },

    {
      label: "单据日期",
      prop: "billDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "单据号",
      prop: "billNo",
      width: CELL_WIDTH.no
    },
    {
      label: "单据状态",
      prop: "statusName",
      width: CELL_WIDTH.status
    },
    {
      label: "调拨入库单号",
      prop: ["sourceBill", "billNo"],
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "RD",
      billIdField: ["sourceBill", "id"]
    },
    {
      label: "调出分公司",
      prop: ["relatedBill", "companyName"],
      width: CELL_WIDTH.companyName
    },
    {
      label: "对方单号",
      prop: ["relatedBill", "billNo"],
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "KD",
      billIdField: ["relatedBill", "id"]
    },
    {
      label: "退货数",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "退货金额",
      prop: "amount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "成本额",
      prop: "costAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税成本额",
      prop: "untaxedCostAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "运费",
      prop: ["logistics", "freight"],
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      label: "提货方式",
      prop: ["logistics", "pickMethod"],
      width: CELL_WIDTH.method
    },
    {
      label: "运输方式",
      prop: ["logistics", "transportMethod"],
      width: CELL_WIDTH.method
    },
    {
      label: "包装方式",
      prop: ["logistics", "packMethod"],
      width: CELL_WIDTH.method
    },
    {
      label: "业务员",
      prop: "businessManName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单人",
      prop: "createdByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "制单时间",
      prop: "createdAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "入库审核人",
      prop: "warehouseAuditByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "入库审核时间",
      prop: "warehouseAuditAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "财务结算人",
      prop: "financialByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "财务结算时间",
      prop: "financialAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "打印次数",
      prop: "printCount",
      width: CELL_WIDTH.count
    },
    {
      label: "单据备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
