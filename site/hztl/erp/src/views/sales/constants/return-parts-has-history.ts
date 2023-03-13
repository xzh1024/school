import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_SALES_RETURN_PARTS_HAS_HISTORY: TableSettingConfig<any> = {
  name: "salesReturnPartsHasHistory",
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
      width: 140,
      cantExport: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      prop: "cooperatorName",
      label: "客户名称",
      width: CELL_WIDTH.companyName
    },
    { prop: "billDate", label: "业务日期", width: CELL_WIDTH.date },
    { prop: "billNo", label: "销售单号", width: CELL_WIDTH.no },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code,
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
      prop: "saleVehModel",
      label: "销售车型",
      width: CELL_WIDTH.vehModel,
      type: "saleVehModel"
    },
    {
      prop: "avaVehModels",
      type: "avaVehModels",
      label: "标准适用车型",
      width: CELL_WIDTH.avaVehModels,
      defaultShow: true,
      cantExport: true
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
    {
      prop: "taxRate",
      label: "税率",
      width: CELL_WIDTH.taxRate,
      type: "percent"
    },
    { prop: "bookQty", label: "销售数", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "returnQty",
      label: "已退数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "canReturnQty",
      label: "可退数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedPrice",
      label: "实售价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "billPrice",
      label: "开单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "taxedPurchasePrice",
      label: "成本价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedPurchasePrice",
      label: "未税成本价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type
    },
    {
      prop: "pickMethod",
      label: "提货方式",
      width: CELL_WIDTH.method
    },
    {
      prop: "transportMethod",
      label: "运输方式",
      width: CELL_WIDTH.method
    },
    {
      prop: "plateNumber",
      label: "车牌号",
      width: CELL_WIDTH.code
    },
    {
      prop: "supplierName",
      label: "供应商",
      width: CELL_WIDTH.companyName
    },
    { prop: "batchNo", label: "批次", width: CELL_WIDTH.no },
    {
      prop: "ownerCompanyName",
      label: "货主",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property
    },
    {
      prop: "companyName",
      label: "归属集团",
      width: CELL_WIDTH.companyName
    }
  ]
};
