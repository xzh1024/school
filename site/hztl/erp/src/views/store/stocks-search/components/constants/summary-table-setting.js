import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_STOCKS_SEARCH_SUM_LIST = {
  name: "stocksSearchSumList",
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
      width: 130,
      cantHide: true,
      cantExport: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      prop: "partInfoCode",
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partInfoName",
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partInfoBrand",
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partInfoProductionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partInfoModel",
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property,
      cantHide: true,
      forcedHide: true
    },
    {
      prop: "partInfoVehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partInfoAvaVehModel",
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
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no,
      cantHide: true,
      forcedHide: true
    },
    {
      prop: "ownerCompanyName",
      label: "货主",
      width: CELL_WIDTH.companyName,
      cantHide: true,
      forcedHide: true
    },
    {
      prop: "supplierName",
      label: "供应商",
      width: CELL_WIDTH.companyName,
      cantHide: true,
      forcedHide: true
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName,
      cantHide: true,
      forcedHide: true,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "positionName",
      label: "货位",
      width: CELL_WIDTH.positionName,
      cantHide: true,
      forcedHide: true,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "qty",
      label: "实际数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "autoQty",
      label: "动态数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "lockedQty",
      label: "锁定数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedAllPrice",
      label: "库存金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAllPrice",
      label: "未税库存金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedPurchasePrice",
      label: "平均进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPurchasePrice",
      label: "平均未税进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "age",
      label: "最大库龄",
      width: CELL_WIDTH.inventoryAge
    },
    ...OTHER_PIRCE_LIST
  ]
};
