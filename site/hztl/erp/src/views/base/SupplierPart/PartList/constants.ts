import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { SupplierPartItem } from "../interface";

export const SYPPLIER_PART_SYPPLIER_LIST: TableSettingConfig<SupplierPartItem> = {
  name: "supplierPartSupplierList",
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
      prop: "partType",
      label: "签约配件",
      width: CELL_WIDTH.type
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
      prop: "supplierPartCode",
      label: "供应商配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "supplierPartName",
      label: "供应商配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "purchasePrice",
      label: "采购价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    ...OTHER_PIRCE_LIST,
    {
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.categoryName,
      isHide: true
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
      isHide: true
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.avaVehModels,
      isHide: true
    }
  ]
};
