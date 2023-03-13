import { TableSettingConfig } from "@/constants/interface";
import { BILL_TYPE, CELL_WIDTH } from "@/constants";

export const FRANCHISER_PURCHASE_BILL_LIST: TableSettingConfig<any> = {
  name: "FranchiserPurchaseBillList",
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
      prop: "billDate",
      label: "日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "type"
    },
    { prop: "status", label: "状态", width: CELL_WIDTH.type },
    {
      prop: "type",
      label: "类型",
      width: CELL_WIDTH.type,
      formatter: (value: string) => BILL_TYPE[value]
    },
    {
      prop: "qty",
      label: "数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "amount",
      label: "金额",
      width: CELL_WIDTH.money,
      type: "number"
    }
  ]
};
