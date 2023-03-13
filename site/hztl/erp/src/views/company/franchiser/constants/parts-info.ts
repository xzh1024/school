import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FRANCHISERS_AUTHORIZE_PATS_LIST: TableSettingConfig<any> = {
  name: "FranchisersAuthorizePartsList",
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
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "enName",
      label: "英文名称",
      width: CELL_WIDTH.name,
      isHide: true
    },
    {
      prop: "stdOeCode",
      label: "标准编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "stdName",
      label: "标准名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.vehModel
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
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.categoryName
    },
    {
      prop: "model",
      label: "规格",
      width: CELL_WIDTH.model
    },
    {
      prop: "productionCode",
      label: "生产码",
      width: CELL_WIDTH.code
    },
    {
      prop: "posCode",
      label: "部位码",
      width: CELL_WIDTH.code
    },
    {
      prop: "engineNo",
      label: "发动机型号",
      width: CELL_WIDTH.code
    },
    {
      prop: "unit",
      label: "计量单位",
      width: CELL_WIDTH.unit,
      isHide: true
    },
    {
      prop: "barCode",
      label: "条形码",
      width: CELL_WIDTH.code,
      isHide: true
    },
    {
      prop: "remark",
      label: "配件备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "length",
      label: "长度",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      prop: "width",
      label: "宽度",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      prop: "height",
      label: "高度",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      prop: "volume",
      label: "体积",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      prop: "weight",
      label: "重量",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      prop: "dosagePerCar",
      label: "每车用量",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    }
  ]
};
