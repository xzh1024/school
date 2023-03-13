import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const FRANCHISER_PARTS_STORE_LIST: TableSettingConfig<any> = {
  name: "FranchiserPartsStoreList",
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
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
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
      prop: "label",
      label: "标记",
      width: 60
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "dynaQty",
      label: "自有库存（动态数）",
      width: 140,
      type: "number",
      formatter: (value, row) => (row.isPurchased ? value : "--")
    },
    {
      prop: "transitQty",
      label: "在途数",
      width: CELL_WIDTH.qty,
      type: "number",
      formatter: (value, row) => (row.isPurchased ? value : "--")
    }
  ]
};
