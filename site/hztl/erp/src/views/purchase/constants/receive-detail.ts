import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_PURCHASE_RECEIVE_DETAILS: TableSettingConfig<any> = {
  name: "purchaseReceiveDetails",
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
      label: "到货仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName
    },
    {
      label: "到货货位",
      prop: "positionName",
      width: CELL_WIDTH.positionName
    },
    {
      label: "规格",
      prop: "model",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "进货数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "进货价",
      prop: "taxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "进货金额",
      prop: "taxedAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税进货价",
      prop: "untaxedPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税进货金额",
      prop: "untaxedAmount",
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
      prop: "freight",
      label: "运费",
      type: "number",
      width: CELL_WIDTH.money,
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "预计到货日期",
      prop: "arrivalDate",
      width: CELL_WIDTH.date,
      type: "date"
    },
    // {
    //   label: "运费",
    //   prop: "freight",
    //   width: CELL_WIDTH.money,
    //   type: "number"
    // },
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
      label: "订货计划单号",
      prop: "orderBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "CD",
      information: {
        billDetailKey: "orderId"
      }
    },
    {
      label: "单据来源",
      prop: "sourceType",
      width: CELL_WIDTH.type
    },
    {
      label: "来源单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
    },
    ...OTHER_PIRCE_LIST,
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
