import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { BILL_TYPE_NAME, APPROVAL_STATUS_NAME } from "./index";

export const AUDIT_TABLE_COLUMN = {
  name: "ApprovedTableColumn",
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
      label: "审批类型",
      width: CELL_WIDTH.type,
      formatter(value: string) {
        return BILL_TYPE_NAME[value];
      }
    },
    {
      prop: "billNo",
      label: "审批单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      prop: "applyDate",
      label: "申请日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "status",
      label: "审批状态",
      width: CELL_WIDTH.status,
      formatter(value: string) {
        return APPROVAL_STATUS_NAME[value];
      }
    },
    {
      prop: "applyAmount",
      label: "申请金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "companyName",
      label: "业务分公司",
      width: CELL_WIDTH.companyName
    }
  ]
};

export const ADVANCE_ACCOUNT_COLUMN = {
  name: "advanceAccountColumn",
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
      prop: "fundCategoryName",
      label: "收支类目",
      width: CELL_WIDTH.type,
      type: "billId",
      billTypeField: "billType"
    },
    {
      prop: "applyAmount",
      label: "预支金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark },
    {
      prop: "applyDate",
      label: "申请日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "settledDate",
      label: "结算日期",
      width: CELL_WIDTH.date,
      type: "date"
    }
  ]
};

export const SYSTEM_OA_COLUMNS = [
  {
    prop: "billType",
    label: "审批类型",
    width: CELL_WIDTH.type,
    type: "billId",
    billTypeField: "billType"
  },
  {
    prop: "applicantName",
    label: "发起人",
    width: CELL_WIDTH.personName
  }
];
