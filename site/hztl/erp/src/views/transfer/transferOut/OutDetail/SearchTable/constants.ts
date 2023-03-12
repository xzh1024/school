import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TransferOutSearchData } from "./interface";

export const OUT_SEARCH_TABLE: TableSettingConfig<TransferOutSearchData> = {
  name: "transferOutSearch",
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
      width: 60,
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
      label: "图号",
      prop: "customCodes",
      width: CELL_WIDTH.code,
      formatter: val => (val && val.length ? val[0] : ""),
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
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
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property
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
      label: "可调拨数",
      prop: "allocOutUsableQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "可调拨退货数",
      prop: "allocReturnableQty",
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
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
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
    ...OTHER_PIRCE_LIST
  ]
};
