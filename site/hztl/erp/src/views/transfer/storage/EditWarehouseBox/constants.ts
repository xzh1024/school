import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export interface Position {
  id: number;
  name: string;
}

export interface BatchSetWarehouse {
  warehouseId?: number;
  warehouseName: string;
  positionId?: number;
  positionName: string;
}

export interface EditWarehouseItem {
  code: string;
  name: string;
  brand: string;
  productionPlace: string;
  property: string;
  qty: string;
  warehouseName: string;
  positionName: string;
}

export const STORAGE_EDIT_WAREHOUSE_TABLE: TableSettingConfig<EditWarehouseItem> = {
  name: "transferStorageEditWarehouseBoxList",
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
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "qty", label: "数量", width: CELL_WIDTH.qty },
    {
      prop: "warehouseName",
      label: "到货仓库",
      width: CELL_WIDTH.warehouseName
    },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName }
  ]
};
