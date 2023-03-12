import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export const EPC_SEARCH_STOCK_DETAILS_TABLE: TableSettingConfig<any> = {
  name: "epcSearchStockDetailsTable",
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
      prop: "partInfoCode",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "partInfoName",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "partInfoBrand",
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "partInfoProductionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property,
      cantHide: true
    },
    {
      prop: "qty",
      label: "实际库存",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedPurchasePrice",
      label: "平均进价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "retailPrice",
      label: "零售价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "transferPrice",
      label: "调拨价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "wholeSalePrice",
      label: "批发价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "wholeSalePrice1",
      label: "批发价一",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "wholeSalePrice2",
      label: "批发价二",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "wholeSalePrice3",
      label: "批发价三",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "wholeSalePrice4",
      label: "批发价四",
      width: CELL_WIDTH.money,
      type: "number"
    }
  ]
};
