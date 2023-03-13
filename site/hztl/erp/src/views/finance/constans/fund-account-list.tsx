import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const FINANCE_FUND_ACCOUNT_LIST: TableSettingConfig<any> = {
  name: "financeFundAccountList",
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
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      label: "默认账户",
      prop: "isDefault",
      width: CELL_WIDTH.isDefault,
      cantExport: true
    },
    {
      prop: "isDisable",
      label: "状态",
      width: 60
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
      prop: "openingAmount",
      label: "期初金额",
      width: CELL_WIDTH.money,
      type: "amount"
    },
    {
      prop: "amount",
      label: "账户余额",
      width: CELL_WIDTH.money,
      type: "amount"
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
    }
  ]
};
