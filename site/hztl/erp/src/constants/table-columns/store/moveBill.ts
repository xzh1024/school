import { CELL_WIDTH } from "../cell-width";
import { TableSettingConfig } from "@/constants/interface";

export const TABLE__MOVEING_PART_TABLE: TableSettingConfig<any> = {
  name: "movingPartTable",
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
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    { prop: "ownerCompanyName", label: "货主", width: CELL_WIDTH.companyName },
    {
      prop: "status",
      label: "状态",
      width: CELL_WIDTH.status,
      formatter: val => (val === 1 ? "不可移仓" : "可移仓")
    },
    { prop: "supplierName", label: "供应商", width: CELL_WIDTH.companyName },
    { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    {
      prop: "customCodes",
      label: "图号",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : "")
    },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "model",
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "qty", label: "实际数", width: CELL_WIDTH.qty, type: "number" },
    { prop: "autoQty", label: "动态数", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "lockedQty",
      label: "锁定数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
    { prop: "vehModel", label: "车型", width: CELL_WIDTH.vehModel },
    {
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    }
  ]
};
