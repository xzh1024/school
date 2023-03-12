import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TransferApplySearchData } from "./interface";

export const APPLY_SEARCH_TABLE: TableSettingConfig<TransferApplySearchData> = {
  name: "transferApplySearch",
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
      prop: "outWarehouseName",
      label: "调出仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "allocOutQty",
      label: "调出公司实际数",
      width: 130,
      type: "number"
    },
    {
      prop: "allocOutDynaQty",
      label: "调出分公司动态数",
      width: 130,
      type: "number"
    },
    {
      prop: "allocOutUsableQty",
      label: "调出分公司可调拨数",
      width: 130,
      type: "number"
    },
    {
      label: "本公司实际数",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "本公司动态数",
      prop: "dynaQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "本公司锁定数",
      prop: "lockedQty",
      width: CELL_WIDTH.qty,
      type: "number"
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
      label: "调拨在途数",
      prop: "allocQtyInTransit",
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
      label: "月均销售数",
      prop: "monthlySaleQty",
      width: CELL_WIDTH.qty,
      type: "number"
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
    {
      label: "上次调拨价",
      prop: "lastAllocPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "库存进价",
      prop: ["costPrices", "taxed"],
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "库存未税进价",
      prop: ["costPrices", "untaxed"],
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    ...OTHER_PIRCE_LIST
  ]
};
