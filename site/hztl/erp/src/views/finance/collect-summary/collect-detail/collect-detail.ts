import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { FinanceSummaryDetail } from "@/constants/finance";

export const COLLECT_SUMMARY_DETAIL: TableSettingConfig<FinanceSummaryDetail> = {
  name: "collectSummaryDetail",
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
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: value => BILL_TYPE[value]
    },
    {
      prop: "businessDate",
      label: "业务日期",
      width: CELL_WIDTH.date
    },
    {
      prop: "sourceBillNo",
      label: "业务单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      prop: "status",
      label: "收付类型",
      width: CELL_WIDTH.status,
      formatter: value => (value ? "应收" : "应付")
    },
    {
      prop: "receivableAmount",
      label: "应收金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "payableAmount",
      label: "应付金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "settledAmount",
      label: "已结金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "currentBalance",
      label: "余额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "freightNo",
      label: "运单号",
      width: CELL_WIDTH.no
    },
    {
      prop: "businessMan",
      label: "开单业务员",
      width: CELL_WIDTH.personName
    }
  ]
};
