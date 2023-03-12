import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { SearchStockItem } from "../../constants";

export const STOCKIN_RETURN_STOCK_TABLE: TableSettingConfig<SearchStockItem> = {
  name: "transferStockinReturnStocks",
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
      label: "选择",
      prop: "multiple",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      label: "操作",
      prop: "controls",
      type: "controls",
      width: 60,
      cantExport: true
    },
    {
      label: "实际数",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "动态数",
      prop: "dynamicQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "配件性质",
      prop: "property",
      width: CELL_WIDTH.property
    },
    {
      label: "仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName
    },
    {
      label: "货位",
      prop: "positionName",
      width: CELL_WIDTH.positionName
    },
    {
      label: "批次号",
      prop: "batchNo",
      width: CELL_WIDTH.no
    }
  ]
};
