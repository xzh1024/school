import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const TABLE_RETURN_HAS_HISTORY_LIST: TableSettingConfig<any> = {
  name: "purchaseReturnHasHistoryList",
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
      type: "controls",
      label: "操作",
      width: 200,
      cantExport: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      prop: "purchaseDate",
      label: "进货日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType",
      billIdField: "arrivalId"
    },
    {
      prop: "cooperatorName",
      label: "供应商",
      width: CELL_WIDTH.companyName
    },
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
      isHide: true,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "适用车型",
      prop: "avaVehModel",
      width: CELL_WIDTH.vehModel,
      isHide: true,
      attrs: {
        sortable: "custom"
      }
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
      prop: "taxRate",
      label: "税率",
      width: CELL_WIDTH.taxRate,
      type: "percent",
      isHide: true
    },
    {
      prop: "stockinQty",
      label: "到货入库数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "returnedQty",
      label: "已退数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "returnableQty",
      label: "可退数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "taxedPrice",
      label: "退货单价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.personName
    },
    {
      prop: "untaxedPrice",
      label: "未税单价",
      width: CELL_WIDTH.money,
      type: "number",
      isHide: true
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.type,
      isHide: true
    },
    {
      prop: "pickMethod",
      label: "提货方式",
      width: CELL_WIDTH.method,
      isHide: true
    }
  ]
};
