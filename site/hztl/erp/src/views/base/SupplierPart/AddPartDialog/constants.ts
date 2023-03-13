import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { SearchPartItem } from "../interface";

export const SYPPLIER_PART_SEARCH_PART: TableSettingConfig<SearchPartItem> = {
  name: "supplierPartSearchPart",
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
      prop: "partCode",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "partName",
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
      label: "图号",
      prop: "customCodes",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : "")
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.avaVehModels
    }
  ]
};
