import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { TableSettingConfig } from "@/constants/interface";
import {
  SysAvaVehModelMingJueRes,
  SysAvaVehModelBeiMaiRes
} from "@/api/parts/partsModels";

export const SYS_MODELS_MINGJUE_TABLE: TableSettingConfig<SysAvaVehModelMingJueRes> = {
  name: "SysModelsMingJueTable",
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
      type: "customMultiple",
      prop: "customMultiple",
      label: "多选",
      width: 50,
      cantExport: true
    },
    {
      prop: "vehBrand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "facBrand",
      label: "厂牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "vehicleGroup",
      label: "车型组",
      width: CELL_WIDTH.vehSeries
    },
    {
      prop: "year",
      label: "年款",
      width: CELL_WIDTH.type
    },
    {
      prop: "displacementEngine",
      label: "排量｜发动机",
      width: CELL_WIDTH.vehSeries
    },
    {
      prop: "transmission",
      label: "变速箱",
      width: CELL_WIDTH.partType
    },
    {
      prop: "salesModel",
      label: "销售版型",
      width: CELL_WIDTH.salesModel
    }
  ]
};

export const SYS_MODELS_BEIMAI_TABLE: TableSettingConfig<SysAvaVehModelBeiMaiRes> = {
  name: "SysModelsBeiMaiTable",
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
      type: "customMultiple",
      prop: "customMultiple",
      label: "多选",
      width: 50,
      cantExport: true
    },
    {
      prop: "vehBrand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "facBrand",
      label: "厂牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "vehicleGroup",
      label: "车系",
      width: CELL_WIDTH.vehSeries
    },
    {
      prop: "year",
      label: "年款名称",
      width: CELL_WIDTH.type
    },
    {
      prop: "displacement",
      label: "排量",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "engine",
      label: "发动机型号",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "transmission",
      label: "变速箱",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "driverType",
      label: "驱动形式",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "chassisNo",
      label: "底盘号",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "salesModel",
      label: "销售版型",
      width: CELL_WIDTH.salesModel
    }
  ]
};
