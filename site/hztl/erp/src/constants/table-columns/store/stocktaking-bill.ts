import { CELL_WIDTH } from "../cell-width";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_STOCKTAKING_PARTS: TableSettingConfig<any> = {
  name: "stocktakingParts",
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
      width: 80,
      cantExport: true
    },
    // {
    //   label: "标签",
    //   prop: "labels",
    //   width: CELL_WIDTH.labels,
    //   cantExport: true
    // },
    {
      label: "状态",
      prop: "status",
      width: CELL_WIDTH.status,
      formatter: val => {
        if (val === 1) {
          return "库存锁定";
        } else if (val === 2) {
          return "盘点中";
        } else if (val === 3) {
          return "可盘点";
        } else if (val === 4) {
          return "负库存";
        } else {
          return "";
        }
      }
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
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "model",
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "ownerCompanyName", label: "货主", width: CELL_WIDTH.companyName },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "positionName",
      label: "货位",
      width: CELL_WIDTH.positionName,
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
      prop: "taxedPurchasePrice",
      label: "进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPurchasePrice",
      label: "未税进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedAmount",
      label: "库存金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税库存金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "vehModel",
      label: "车型",
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
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    }
    // { prop: "qty", label: "账面数", type: "number", width: CELL_WIDTH.qty },
    // {
    //   prop: "qtyPeriodBegin",
    //   label: "期初数",
    //   type: "number",
    //   width: CELL_WIDTH.qty
    // },
    // {
    //   prop: "qtyPeriodIn",
    //   label: "本期入",
    //   type: "number",
    //   width: CELL_WIDTH.qty
    // },
    // {
    //   prop: "qtyPeriodOut",
    //   label: "本期出",
    //   type: "number",
    //   width: CELL_WIDTH.qty
    // },
    // {
    //   prop: "qtyPeriodEnd",
    //   label: "期末数",
    //   type: "number",
    //   width: CELL_WIDTH.qty
    // }
  ]
};
