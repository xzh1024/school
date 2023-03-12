import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const DETAIL_PURCHASE_RETURN = {
  name: "purchaseReturnDialog",
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
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    { prop: "vehModel", label: "车型", width: CELL_WIDTH.vehModel },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "qty", label: "退货数量", type: "number", width: CELL_WIDTH.qty },
    {
      prop: "taxedPrice",
      label: "退货单价",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedAmount",
      label: "退货金额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPrice",
      label: "未税单价",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      type: "number",
      width: CELL_WIDTH.money,
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
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
    { prop: "reason", label: "退货原因", width: CELL_WIDTH.reason },
    { prop: "sourceBillNo", label: "源单号", width: CELL_WIDTH.no },
    { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no }
  ]
};
