import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { FinanceLogDetail } from "@/constants/finance";

export const FINANCE_LOG_DETAIL: TableSettingConfig<FinanceLogDetail> = {
  name: "financeLogDetail",
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
      prop: "paymentDate",
      label: "收付款日期",
      width: 110,
      type: "date",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settleCooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "paymentTypeName",
      label: "收支类型",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "digest",
      label: "摘要",
      width: CELL_WIDTH.remark,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "amountIn",
      label: "收款金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => (Number(value) ? value : "--"),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "amountOut",
      label: "支出金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => (Number(value) ? value : "--"),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "balance",
      label: "结余",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "statusName",
      label: "状态",
      width: 70,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billNo",
      label: "结算单号",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billDate",
      label: "结算日期",
      width: CELL_WIDTH.date,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "sourceBillNo",
      label: "业务单号",
      type: "billNo",
      width: CELL_WIDTH.no,
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
      prop: "reviewByName",
      label: "复核人",
      width: CELL_WIDTH.personName
    },

    {
      prop: "reviewDate",
      label: "复核时间",
      width: CELL_WIDTH.time,
      type: "time",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "handledByName",
      label: "经办人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "createdByName",
      label: "登记人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "companyName",
      label: "发生公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
