import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_SALES_ORDER_DETAIL_TABLE: TableSettingConfig<any> = {
  name: "salesOrderDetail",
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
      formatter: (value, row) => row.oeCode || value,
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
      prop: "bookQty",
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
      label: "预计交货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      label: "未税订货价",
      prop: "preDiscountUntaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税订货金额",
      prop: "preDiscountUntaxedAmount",
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

export const TABLE_SALES_ORDER_AUDIT_TABLE: TableSettingConfig<any> = {
  name: "salesOrderDetail",
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
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.code,
      formatter: (value, row) => row.oeCode || value,
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
      prop: "bookQty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "订货金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
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
      label: "预计交货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "taxAmount",
      label: "税额",
      type: "number",
      width: CELL_WIDTH.money,
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
      label: "平台价",
      prop: "platform",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.platform),
      isHide: true
    },
    {
      label: "调拨价",
      prop: "allot",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.allot),
      isHide: true
    },
    {
      label: "批发价",
      prop: "wholesale",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale),
      isHide: true
    },
    {
      label: "批发价一",
      prop: "wholesale1",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale1),
      isHide: true
    },
    {
      label: "批发价二",
      prop: "wholesale2",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale2),
      isHide: true
    },
    {
      label: "批发价三",
      prop: "wholesale3",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale3),
      isHide: true
    },
    {
      label: "批发价四",
      prop: "wholesale4",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale4),
      isHide: true
    },
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
