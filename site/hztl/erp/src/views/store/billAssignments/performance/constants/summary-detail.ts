import { CELL_WIDTH } from "@/constants";
import {
  OUT_OR_IN_TYPE,
  BILL_STATUS,
  SOURCE_BILL_TYPES
} from "../interface/enum";
import { OptionStringMap, OptionNumberMap } from "../interface";

export const SUMMARY_DETAIL = {
  name: "summaryDetail",
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
      prop: "billType",
      label: "出入库类型",
      width: CELL_WIDTH.type,
      formatter: function(status: string) {
        return (OUT_OR_IN_TYPE as OptionStringMap)[status] || "";
      }
    },
    {
      prop: "sourceBillType",
      label: "业务单据类型",
      width: CELL_WIDTH.type,
      formatter: function(status: string) {
        return (SOURCE_BILL_TYPES as OptionStringMap)[status] || "";
      }
    },
    {
      prop: "billNo",
      label: "出/入库单号",
      width: CELL_WIDTH.no,
      type: "billId",
      billTypeField: "billType"
    },
    {
      prop: "stockDate",
      label: "出/入库日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "status",
      label: "状态",
      width: CELL_WIDTH.status,
      formatter: function(status: number) {
        return (BILL_STATUS as OptionNumberMap)[status] || "";
      }
    },
    { prop: "companyName", label: "业务公司", width: CELL_WIDTH.companyName },
    {
      prop: "sourceBillDate",
      label: "业务时间",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "sourceBillNo",
      label: "业务单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      prop: "partCount",
      label: "单据配件数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "amount",
      label: "单据配件金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "stockPartCount",
      label: "拣货/上架数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "stockAmount",
      label: "拣货/上架总金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "stockRemark",
      label: "拣货/上架备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "checkPartCount",
      label: "验货配件数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "checkAmount",
      label: "验货金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "checkRemark",
      label: "验货备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "auditByName",
      label: "审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "auditRemark",
      label: "审核备注",
      width: CELL_WIDTH.remark
    }
  ]
};
