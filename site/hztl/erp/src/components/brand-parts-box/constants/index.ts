import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export const BRAND_PARTS_BOX_TABLE: TableSettingConfig<any> = {
  name: "brandPartsBoxTable",
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
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 120,
      cantExport: true
    },
    {
      prop: "brand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "code",
      label: "品牌件号",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "qty",
      label: "实际库存",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "dynamicQty",
      label: "动态库存",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "vehModel",
      label: "适用车型",
      width: CELL_WIDTH.vehModel
    }
  ]
};
