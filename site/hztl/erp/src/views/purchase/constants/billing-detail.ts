import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const PURCHASE_BILLING_DETAILS: TableSettingConfig<any> = {
  name: "purchaseBillingDetails",
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
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code,
      formatter: (value, row) => {
        return row.oeCode || value;
      },
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
      label: "单位",
      prop: "unit",
      width: CELL_WIDTH.unit,
      isHide: true
    },
    {
      label: "配件分类",
      prop: "categoryName",
      width: CELL_WIDTH.categoryName,
      isHide: true
    },
    {
      label: "配件类别",
      prop: "partType",
      width: CELL_WIDTH.partType,
      isHide: true
    },
    {
      label: "订货数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "订货价",
      prop: "taxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "订货金额",
      prop: "taxedAmount",
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
      label: "预计到货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "未税订货价",
      prop: "untaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税订货金额",
      prop: "untaxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "税额",
      prop: "taxAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
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
      label: "标准适用车型",
      prop: "avaVehModels",
      type: "avaVehModels",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
    },
    ...OTHER_PIRCE_LIST,
    {
      label: "完成时间",
      prop: "completedAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
