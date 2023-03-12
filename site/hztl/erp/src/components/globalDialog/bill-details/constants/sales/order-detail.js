import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const SALES_ORDER_DETAIL = {
  name: "salesDetailDialog",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "ownerCompanyName", label: "货主", width: CELL_WIDTH.companyName },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "saleVehModel",
      label: "销售车型",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel"
    },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    {
      prop: "bookQty",
      label: "订购数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedPrice",
      label: "订货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedAmount",
      label: "订货金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "待转销售数量",
      prop: "onTransSaleQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "取消数量",
      prop: "terminatedQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "已出库数量",
      prop: "outQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待出库数量",
      prop: "waitOutQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待交货数量",
      prop: "waitDeliverQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待转销售金额",
      prop: "onTransSaleAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "取消金额",
      prop: "terminatedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "已出库金额",
      prop: "outAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "待出库金额",
      prop: "waitOutAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "待交货金额",
      prop: "waitDeliverAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      prop: "preDiscountUntaxedPrice",
      label: "未税订货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "preDiscountUntaxedAmount",
      label: "未税订货金额",
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
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
