import { CELL_WIDTH } from "../table-columns/cell-width";
import { BILL_TYPE } from "../store";
import { TYPE_MAP_STATUS } from "@/constants/states/type_map_status";

export const TABLE_COLUMN_PURCHASE_SUMMARY = {
  name: "financialLogInSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: 100,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "settlementType",
      label: "结算方式",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.personName
    },
    {
      prop: "financialBillCount",
      label: "财务已审核单据数",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.role
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "taxedAmount",
      label: "进货金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisPeriodSettleAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisPeriodDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "settleAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "discountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    }
  ]
};

export const TABLE_COLUMN_PURCHASE_DETAIL = {
  name: "financialLogInSummary",
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
      label: "采购单号",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.personName,
      formatter: value => {
        return BILL_TYPE[value] || "";
      }
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.personName,
      formatter: (_, row) => {
        const { billType, status } = row;
        let statusLabel = "";
        if (TYPE_MAP_STATUS[billType]) {
          statusLabel = TYPE_MAP_STATUS[billType][status];
        }
        return statusLabel;
      }
    },
    {
      prop: "createdAt",
      label: "开单日期",
      width: CELL_WIDTH.phone,
      type: "time"
    },
    {
      prop: "cooperatorName",
      label: "供应商名称",
      width: CELL_WIDTH.time
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.role
    },
    {
      prop: "taxAmount",
      label: "税额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "taxedAmount",
      label: "进货金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisPeriodSettleAmount",
      label: "本期实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "thisPeriodDiscountAmount",
      label: "本期优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "settleAmount",
      label: "累计实付金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "discountAmount",
      label: "累计优惠金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.dept
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.dept
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "financialAuditByName",
      label: "财务审核人",
      width: CELL_WIDTH.dept
    }
  ]
};
