import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_PART_LIST: TableSettingConfig<any> = {
  name: "salesSearchPartList",
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
      label: "操作",
      prop: "controls",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      label: "装配图",
      prop: "dwg",
      width: CELL_WIDTH.dwg,
      cantExport: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      label: "EPC说明",
      prop: "epcRemark",
      width: CELL_WIDTH.epc,
      cantExport: true
    },
    {
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "图号",
      prop: "customCodes",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : ""),
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件性质",
      prop: "property",
      width: CELL_WIDTH.property
    },
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件分类",
      prop: "categoryName",
      width: CELL_WIDTH.categoryName,
      isHide: true
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "发动机型号",
      prop: "engineNo",
      width: CELL_WIDTH.type,
      isHide: true
    },
    {
      label: "实际数",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "动态数",
      prop: "dynaQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "锁定数",
      prop: "lockedQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "货主",
      prop: "ownerCompanyName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "生产码",
      prop: "productionCode",
      width: CELL_WIDTH.code
    },
    { label: "部位码", prop: "posCode", width: CELL_WIDTH.code },
    {
      label: "车型",
      prop: "vehModel",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "适用车型",
      prop: "avaVehModel",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "标准适用车型",
      prop: "avaVehModels",
      type: "avaVehModels",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    {
      label: "采购在途数",
      prop: "purchaseQtyInTransit",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "采购在订数",
      prop: "purchaseQtyInOrdering",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "销售在订数",
      prop: "saleQtyInOrdering",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "销售待交货数",
      prop: "saleQtyToDeliver",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "调拨在订数",
      prop: "allocQtyInOrdering",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "调拨在途数",
      prop: "allocQtyInTransit",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "起订量",
      prop: "minOrderQty",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      label: "库存上限",
      prop: "stockTopLimit",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      label: "库存下限",
      prop: "stockLowerLimit",
      width: CELL_WIDTH.number,
      type: "number",
      isHide: true
    },
    {
      label: "正厂价",
      prop: "priceFactory",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      label: "进价",
      prop: ["costPrices", "taxed"],
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税进价",
      prop: ["costPrices", "untaxed"],
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    ...OTHER_PIRCE_LIST
  ]
};
