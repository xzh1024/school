import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_PURCHASE_DEMANDS_LIST: TableSettingConfig<any> = {
  name: "purchaseLocalDemandsTable",
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
      width: 60,
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
      width: CELL_WIDTH.code
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.brand
    },
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace
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
      label: "需求数",
      prop: "purchasingQty",
      width: CELL_WIDTH.qty,
      type: "number"
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
      label: "采购在订数",
      prop: "onPurchaseOrderingQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "采购在途数",
      prop: "onPurchaseTransitQty",
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
      label: "月均销售数",
      prop: "monthlySaleQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "需求来源",
      prop: "sourceType",
      width: CELL_WIDTH.qty
    },
    {
      label: "业务单号",
      prop: "billno",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "XS",
      information: {
        billDetailKey: "billId"
      }
    },
    {
      label: "客户名称",
      prop: "cooperatorName",
      width: CELL_WIDTH.personName
    },
    {
      label: "车型",
      prop: "vehModel",
      width: CELL_WIDTH.vehModel
    },
    {
      label: "适用车型",
      prop: "avaVehModel",
      width: CELL_WIDTH.vehModel
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
      prop: "taxedPurchasePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税进价",
      prop: "untaxedPurchasePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    ...OTHER_PIRCE_LIST,
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
