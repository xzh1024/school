import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { formatterDetailBillMarks } from "@/utils/formatterDetailBillMarks";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const DETAIL_SALES_OUT = {
  name: "salesOutDialog",
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
      label: "标签",
      prop: "marks",
      width: CELL_WIDTH.labels,
      render: (value, row) => (
        <span
          class={
            (row.type === 2 && row.status === 2) ||
            (row.type === 3 && row.status === 2) ||
            row.type === 1
              ? "sales-out-active-type"
              : ""
          }
        >
          {formatterDetailBillMarks(row)}
        </span>
      )
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
    { prop: "bookQty", label: "数量", type: "number", width: CELL_WIDTH.qty },
    {
      prop: "billPrice",
      label: "开单价",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "billAmount",
      label: "开单金额",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "preDiscountTaxedPrice",
      label: "销售价",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "preDiscountTaxedAmount",
      label: "销售额",
      type: "number",
      width: CELL_WIDTH.money
    },
    {
      prop: "preDiscountUntaxedPrice",
      label: "未税单价",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "preDiscountUntaxedAmount",
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
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
