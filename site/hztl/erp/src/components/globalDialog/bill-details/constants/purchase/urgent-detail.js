import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const PURCHASE_URGENT_DETAILS = {
  name: "purchaseUrgentDialog",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    {
      prop: "brand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    { prop: "vehModel", label: "车型", width: CELL_WIDTH.vehModel },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property
    },
    {
      prop: "qty",
      label: "数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedPrice",
      label: "进货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedAmount",
      label: "进货总额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPrice",
      label: "未税单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    { prop: "unit", label: "单位", width: CELL_WIDTH.unit },
    {
      prop: "warehouseName",
      label: "到货仓库",
      width: CELL_WIDTH.warehouseName
    },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
