import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { WAREHOUSE_STATUS_ENUM, SOURCE_BILL_TYPE_ENUM } from "./enum";
import { OptionNumberMap, OptionStringMap } from "./index";

export const COLUMN_ENTER = {
  name: "columnEnter",
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
      prop: "sourceBillType",
      label: "业务单据类型",
      width: CELL_WIDTH.type,
      formatter: function(status: string) {
        return (SOURCE_BILL_TYPE_ENUM as OptionStringMap)[status] || "";
      }
    },
    {
      prop: "billNo",
      label: "入库单号",
      width: CELL_WIDTH.no,
      type: "billId",
      billTypeField: "billType"
    },
    {
      prop: "stockDate",
      label: "入库日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    {
      prop: "storageCompanyName",
      label: "仓储公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "status",
      label: "状态",
      width: CELL_WIDTH.status,
      formatter: function(status: number) {
        return (WAREHOUSE_STATUS_ENUM as OptionNumberMap)[status] || "";
      }
    },
    { prop: "companyName", label: "业务公司", width: CELL_WIDTH.companyName },
    {
      prop: "oppositeName",
      label: "往来单位/分公司",
      width: CELL_WIDTH.oppositeName
    },
    {
      prop: "ownerCompanyName",
      label: "货主公司",
      width: CELL_WIDTH.ownerCompanyName
    },
    {
      prop: "sourceBillDate",
      label: "业务日期",
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
      label: "配件数",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "amount",
      label: "总金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "checkByName", label: "验货人", width: CELL_WIDTH.personName },
    {
      prop: "checkAt",
      label: "验货时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "checkRemark", label: "验货备注", width: CELL_WIDTH.remark },
    { prop: "stockByName", label: "上架人", width: CELL_WIDTH.personName },
    {
      prop: "stockAt",
      label: "上架时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "stockRemark", label: "上架备注", width: CELL_WIDTH.remark },
    { prop: "auditByName", label: "审核人", width: CELL_WIDTH.personName },
    {
      prop: "auditAt",
      label: "审核时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "auditRemark", label: "审核备注", width: CELL_WIDTH.remark },
    { prop: "createdByName", label: "制单人", width: CELL_WIDTH.personName },
    { prop: "printCount", label: "打印次数", width: CELL_WIDTH.count }
  ]
};

export const COLUMN_OUT = {
  name: "columnOut",
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
      prop: "sourceBillType",
      label: "业务单据类型",
      width: CELL_WIDTH.type,
      formatter: function(status: string) {
        return (SOURCE_BILL_TYPE_ENUM as OptionStringMap)[status] || "";
      }
    },
    {
      prop: "billNo",
      label: "出库单号",
      width: CELL_WIDTH.no,
      type: "billId",
      billTypeField: "billType"
    },
    {
      prop: "stockDate",
      label: "出库日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    {
      prop: "storageCompanyName",
      label: "仓储公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "status",
      label: "状态",
      width: CELL_WIDTH.status,
      formatter: function(status: number) {
        return (WAREHOUSE_STATUS_ENUM as OptionNumberMap)[status] || "";
      }
    },
    { prop: "companyName", label: "业务公司", width: CELL_WIDTH.companyName },
    {
      prop: "sourceBillDate",
      label: "业务日期",
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
      prop: "oppositeName",
      label: "往来单位/分公司",
      width: CELL_WIDTH.oppositeName
    },
    {
      prop: "ownerCompanyName",
      label: "货主公司",
      width: CELL_WIDTH.ownerCompanyName
    },
    {
      prop: "partCount",
      label: "配件数",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "amount",
      label: "总金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "pickMethod", label: "提货方式", width: CELL_WIDTH.method },
    {
      prop: "logisticsCompanyName",
      label: "物流公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "receiverName", label: "收货人", width: CELL_WIDTH.personName },
    { prop: "receiverPhone", label: "收货电话", width: CELL_WIDTH.phone },
    { prop: "receiverAddress", label: "收货地址", width: CELL_WIDTH.address },
    { prop: "stockByName", label: "拣货人", width: CELL_WIDTH.personName },
    {
      prop: "stockAt",
      label: "拣货时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "stockRemark", label: "拣货备注", width: CELL_WIDTH.remark },
    { prop: "checkByName", label: "验货人", width: CELL_WIDTH.personName },
    {
      prop: "checkAt",
      label: "验货时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "checkRemark", label: "验货备注", width: CELL_WIDTH.remark },
    { prop: "auditByName", label: "审核人", width: CELL_WIDTH.personName },
    {
      prop: "auditAt",
      label: "审核时间",
      width: CELL_WIDTH.date,
      type: "date",
      isHide: true
    },
    { prop: "auditRemark", label: "审核备注", width: CELL_WIDTH.remark },
    { prop: "createdByName", label: "制单人", width: CELL_WIDTH.personName },
    { prop: "printCount", label: "打印次数", width: CELL_WIDTH.count }
  ]
};
