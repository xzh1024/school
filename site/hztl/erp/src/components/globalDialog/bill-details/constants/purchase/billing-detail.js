import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const PURCHASE_BILLING_DETAILS = {
  name: "purchaseDetailsDialog",
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
      label: "配件品牌",
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
      label: "待转采购数量",
      prop: "waitPurchaseQty",
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
      label: "已入库数量",
      prop: "arrivaledQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待入库数量",
      prop: "waitArrivalQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "在途数量",
      prop: "transitQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "待转采购金额",
      prop: "waitPurchaseAmount",
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
      label: "已入库金额",
      prop: "arrivaledAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "待入库金额",
      prop: "waitArrivalAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "在途金额",
      prop: "transitAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      prop: "untaxedPrice",
      label: "未税订货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
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
