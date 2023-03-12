import { CELL_WIDTH } from "../cell-width";

export const TABLE_MOVING_PART_DETAIL_TABLE = {
  name: "movingDetail",
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
      width: 80,
      cantExport: true
    },
    { prop: "ownerCompanyName", label: "货主", width: CELL_WIDTH.companyName },
    { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no },
    { prop: "supplierName", label: "供应商", width: CELL_WIDTH.companyName },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "availableQty",
      label: "移动前库存数量",
      width: 120,
      type: "number"
    },
    {
      prop: "movingQty",
      label: "移动数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    { prop: "warehouseName", label: "原仓库", width: CELL_WIDTH.warehouseName },
    { prop: "positionName", label: "原货位", width: CELL_WIDTH.positionName },
    {
      prop: "toWarehouseName",
      label: "目标仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "toPositionName",
      label: "目标货位",
      width: CELL_WIDTH.positionName
    },
    { prop: "vehModel", label: "车型", width: CELL_WIDTH.vehModel },
    {
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
