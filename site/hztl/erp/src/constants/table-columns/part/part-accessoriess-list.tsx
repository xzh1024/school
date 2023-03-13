import eventBus from "@/event";
import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "../cell-width";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PART_ACCESSORIES_LIST_TABLE: TableSettingConfig<any> = {
  name: "accessoriesList",
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
      width: 100,
      cantExport: true
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "customCodes",
      label: "图号",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : ""),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "featureCode",
      label: "特征码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    { prop: "enName", label: "英文名称", width: CELL_WIDTH.name },
    { prop: "stdOeCode", label: "标准编码", width: CELL_WIDTH.code },
    { prop: "stdName", label: "标准名称", width: CELL_WIDTH.name },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "avaVehModel",
      label: "适用车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    { prop: "categoryName", label: "配件分类", width: CELL_WIDTH.categoryName },
    { prop: "model", label: "规格", width: CELL_WIDTH.model },
    { prop: "packingNum", label: "包装数", width: CELL_WIDTH.qty },
    { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
    { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
    { prop: "engineNo", label: "发动机型号", width: 200 },
    { prop: "unit", label: "计量单位", width: CELL_WIDTH.unit },
    { prop: "barCode", label: "条形码", width: CELL_WIDTH.code },
    { prop: "remark", label: "配件备注", width: CELL_WIDTH.remark },
    { prop: "length", label: "长度", width: CELL_WIDTH.number, type: "number" },
    { prop: "width", label: "宽度", width: CELL_WIDTH.number, type: "number" },
    { prop: "height", label: "高度", width: CELL_WIDTH.number, type: "number" },
    { prop: "weight", label: "重量", width: CELL_WIDTH.number, type: "number" },
    { prop: "volume", label: "体积", width: CELL_WIDTH.number, type: "number" },
    {
      prop: "dosagePerCar",
      label: "每车用量",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "isCollection",
      label: "是否集采配件",
      width: 120,
      formatter: (value: boolean) => {
        return value ? "是" : "否";
      }
    },
    {
      prop: "isPurchase",
      label: "是否可采购",
      width: 120,
      formatter: (value: boolean) => {
        return value ? "是" : "否";
      }
    },
    {
      prop: "isSale",
      label: "是否可销售",
      width: 120,
      formatter: (value: boolean) => {
        return value ? "是" : "否";
      }
    },
    {
      prop: "priceFactory",
      label: "正厂价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "currency", label: "正厂价币种", width: CELL_WIDTH.money },
    {
      prop: "priceRmb",
      label: "人民币价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "stockTopLimit",
      label: "库存上限",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "stockLowerLimit",
      label: "库存下限",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "isAccessories",
      label: "是否辅料",
      width: 120,
      formatter: (value: boolean) => {
        return value ? "是" : "否";
      }
    }
  ]
};
