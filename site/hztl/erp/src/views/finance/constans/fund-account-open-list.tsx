import eventBus from "@/event";
import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const FINANCE_FUND_ACCOUNT_OPEN_LIST: TableSettingConfig<any> = {
  name: "financeFundAccountOpenList",
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
      prop: "fundAccountName",
      label: "账户名称",
      width: CELL_WIDTH.accountName
    },
    {
      prop: "fundAccountType",
      label: "账户类型",
      width: 80
    },
    {
      prop: "bank",
      label: "开户行",
      width: CELL_WIDTH.bankName
    },
    {
      prop: "bankAccount",
      label: "银行账号",
      width: CELL_WIDTH.bankAccount
    },
    {
      prop: "bankedBy",
      label: "开户人",
      width: CELL_WIDTH.personName
    },
    {
      label: "期初金额",
      prop: "openingAmount",
      width: CELL_WIDTH.money
    }
  ]
};
