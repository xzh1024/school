import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export const EPC_SEARCH_LOCAL_PARTS_TABLE: TableSettingConfig<any> = {
  name: "epcSearchLocalPartsTable",
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
      prop: "dwg",
      label: "装配图",
      width: CELL_WIDTH.dwg,
      cantExport: true
    },
    {
      prop: "stockDetails",
      label: "查看本地配件资料",
      width: 120,
      cantExport: true
    },
    {
      label: "EPC说明",
      prop: "epcRemark",
      width: CELL_WIDTH.epc,
      cantExport: true
    },
    {
      prop: "partNumber",
      label: "OE号",
      width: CELL_WIDTH.code
    },
    {
      prop: "srcPartName",
      label: "名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "partPrice",
      label: "4S店价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "untaxedPartPrice",
      label: "未税4S店价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "purchasePrice",
      label: "进货价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "untaxedPurchasePrice",
      label: "未税进货价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "labels",
      label: "标记",
      width: CELL_WIDTH.type
    },
    {
      prop: "qty",
      label: "实际库存",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "autoQty",
      label: "动态库存",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "standardPartName",
      label: "标准名",
      width: CELL_WIDTH.name
    },
    {
      prop: "substitute",
      label: "曾用OE号",
      width: CELL_WIDTH.code
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
