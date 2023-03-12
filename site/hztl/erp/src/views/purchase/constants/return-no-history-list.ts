import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const TABLE_RETURN_NO_HISTORY_LIST: TableSettingConfig<any> = {
  name: "purchaseReturnNoHistoryList",
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
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 60,
      cantExport: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    // {
    //   prop: "sourceBillNo",
    //   label: "原单号",
    //   width: CELL_WIDTH.no,
    //   type: "billNo",
    //   billTypeField: "sourceBillType",
    //   billIdField: "sourceBillId"
    // },
    {
      prop: "supplierName",
      label: "供应商",
      width: CELL_WIDTH.companyName
    },
    {
      label: "批次号",
      prop: "batchNo",
      width: CELL_WIDTH.no
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
    { prop: "warehouseName", label: "仓库", width: CELL_WIDTH.warehouseName },
    { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
    { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
    { prop: "dynaQty", label: "动态数", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "returnableQty",
      label: "可退数",
      width: CELL_WIDTH.qty,
      type: "number"
    }
  ]
};
