import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const FRANCHISER_SALES_BUSINESS_CASE_LIST: TableSettingConfig<any> = {
  name: "FranchiserSalesBusinessCaseList",
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
      prop: "saleQty",
      label: "销量（已完成）",
      width: CELL_WIDTH.qty,
      type: "number",
      formatter: (value, row) => (row.canViewSale ? value : "--")
    },
    {
      prop: "returnQty",
      label: "退货销量（已完成）",
      width: CELL_WIDTH.qty,
      type: "number",
      formatter: (value, row) => (row.canViewSale ? value : "--")
    }
  ]
};
