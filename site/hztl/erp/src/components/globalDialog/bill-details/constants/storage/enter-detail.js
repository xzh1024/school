import { CELL_WIDTH } from "@/constants/table-columns/cell-width";

export const DETAIL_STORAGE_ENTER = {
  name: "storageEnterDialog",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "partCode", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "partName", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "qty", label: "数量", width: CELL_WIDTH.qty, type: "number" },
    { prop: "position", label: "货位", width: CELL_WIDTH.positionName },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel",
      isHide: true
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel",
      isHide: true
    },
    {
      prop: "ownerCompanyName",
      label: "货主",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    { prop: "unit", label: "单位", width: CELL_WIDTH.unit, isHide: true },
    { prop: "model", label: "规格", width: CELL_WIDTH.model, isHide: true }
  ]
};
