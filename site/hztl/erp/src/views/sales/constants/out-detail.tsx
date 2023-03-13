import eventBus from "@/event";
import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { formatterDetailBillMarks } from "@/utils/formatterDetailBillMarks";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TABLE_SALES_OUT_DETAIL_TABLE: TableSettingConfig<any> = {
  name: "salesOutDetail",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "操作",
      prop: "controls",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      label: "标签",
      prop: "marks",
      width: CELL_WIDTH.labels,
      render: (_, row) => (
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
    {
      label: "货主",
      prop: "ownerCompanyName",
      width: CELL_WIDTH.ownerCompanyName
    },
    {
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
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
      label: "配件性质",
      prop: "property",
      width: CELL_WIDTH.property
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "销售数量",
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "销售价",
      prop: "preDiscountTaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "销售金额",
      prop: "preDiscountTaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税销售价",
      prop: "preDiscountUntaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "preDiscountUntaxedAmount",
      label: "未税销售金额",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "开单价",
      prop: "billPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "开单金额",
      prop: "billAmount",
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
    {
      label: "成本价",
      prop: "taxedPurchasePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    // {
    //   prop: "freight",
    //   label: "运费",
    //   type: "number",
    //   width: CELL_WIDTH.money,
    //   formatter: value => getNoPricePermTips(value)
    // },
    {
      label: "未税成本价",
      prop: "untaxedPurchasePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "成本金额",
      prop: "taxedPurchaseAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "未税成本金额",
      prop: "untaxedPurchaseAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value),
      isHide: true
    },
    {
      label: "单位",
      prop: "unit",
      width: CELL_WIDTH.unit
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
      label: "销售车型",
      prop: "saleVehModel",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel"
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
      label: "标准适用车型",
      prop: "avaVehModels",
      type: "avaVehModels",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    {
      label: "发动机型号",
      prop: "engineNo",
      width: CELL_WIDTH.type,
      isHide: true
    },
    {
      label: "客户订单单号",
      prop: "orderNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "XD",
      information: {
        billDetailKey: "orderId"
      }
    },
    {
      label: "单据来源",
      prop: "sourceType",
      width: CELL_WIDTH.companyName
    },
    {
      label: "来源单号",
      prop: "platformOrderNo",
      width: CELL_WIDTH.no
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
