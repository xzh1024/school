import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const TABLE_RETURN_PARTS_INFO_LIST: TableSettingConfig<any> = {
  name: "purchaseReturnPartsInfoList",
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
      type: "controls",
      label: "操作",
      width: 60,
      cantExport: true
    },
    { prop: "dynaQty", label: "动态数", width: CELL_WIDTH.qty, type: "number" },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
    { prop: "batchNo", label: "批次", width: CELL_WIDTH.no },
    {
      prop: "supplierName",
      label: "供应商",
      width: CELL_WIDTH.companyName
    }
  ]
};
