import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { TableSettingConfig } from "@/constants/interface";
import { AutoAvaVehModelRes } from "@/api/parts/partsModels";

export const AUTO_MODELS_TABLE: TableSettingConfig<AutoAvaVehModelRes> = {
  name: "AutoModelsTable",
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
      width: CELL_WIDTH.remark
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
