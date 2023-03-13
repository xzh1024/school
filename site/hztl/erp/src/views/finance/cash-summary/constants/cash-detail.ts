import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { FinanceSummaryDetail } from "@/constants/finance";

export const CASH_SUMMARY_DETAIL: TableSettingConfig<FinanceSummaryDetail> = {
  name: "cashSummaryDetail",
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
      prop: "companyName",
      label: "发生公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "receivableAmount",
      label: "应收金额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "payableAmount",
      label: "应付金额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settledAmount",
      label: "已结金额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "currentBalance",
      label: "余额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "sourceBillNo",
      label: "业务单号",
      width: CELL_WIDTH.personName,
      type: "billNo",
      billTypeField: "sourceBillType",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "sourceBillType",
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: value => BILL_TYPE[value],
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialDate",
      label: "财务日期",
      width: CELL_WIDTH.date,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "status",
      label: "状态",
      width: CELL_WIDTH.status,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "businessMan",
      label: "开单业务员",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialAudiByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "handleByName",
      label: "经办人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "createdByName",
      label: "登记人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "settleCompanyName",
      label: "记账公司",
      width: CELL_WIDTH.companyName,
      isHide: true
    }
  ]
};
