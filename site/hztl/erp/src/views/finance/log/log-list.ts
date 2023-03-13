import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { FinanceLogData } from "@/constants/finance";

export const FINANCE_LOG_LIST: TableSettingConfig<FinanceLogData> = {
  name: "financeLogList",
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
      label: "记账公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "fundAccountName",
      label: "账户名称",
      width: CELL_WIDTH.fundAccountName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "fundAccountType",
      label: "账户类型",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "previousBalance",
      label: "上期余额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "income",
      label: "本期收入",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "expend",
      label: "本期支出",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "balance",
      label: "本期余额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    { prop: "bankAccount", label: "银行账号", width: CELL_WIDTH.bankAccount },
    { prop: "bank", label: "开户行", width: CELL_WIDTH.bankName }
  ]
};
