import { CELL_WIDTH } from "../table-columns/cell-width";
import { BILL_TYPE } from "../store";

export const TABLE_COLUMN_ALLOC_IN_SUMMARY = {
  name: "allocInSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "paymentType",
      label: "结算方式",
      width: CELL_WIDTH.personName
    },
    {
      prop: "totalBillCount",
      label: "单据数",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billCountFinancial",
      label: "财务已审核单据数",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "totalAmount",
      label: "总金额",
      width: CELL_WIDTH.role
    },
    {
      prop: "thisPeriodActuallyAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodActuallyAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodDiscountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    }
  ]
};

export const TABLE_COLUMN_ALLOC_IN_DETAIL = {
  name: "allocInSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "billNo",
      label: "调拨单号",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "type",
      label: "单据类型",
      width: CELL_WIDTH.personName,
      formatter: value => {
        return BILL_TYPE[value] || "";
      }
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdAt",
      label: "开单日期",
      width: CELL_WIDTH.phone,
      type: "time"
    },
    {
      prop: "relatedCompanyName",
      label: "调出分公司",
      width: CELL_WIDTH.time
    },
    {
      prop: "totalAmount",
      label: "总金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisPeriodActuallyAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodActuallyAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "allPeriodDiscountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.dept
    },
    {
      prop: "createdName",
      label: "制单人",
      width: CELL_WIDTH.dept
    }
  ]
};
