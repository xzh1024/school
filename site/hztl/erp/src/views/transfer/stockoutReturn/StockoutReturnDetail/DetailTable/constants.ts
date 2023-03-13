import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TransferBillPartItem } from "@/views/transfer/interface";

export const STOCKOUT_RETURN_DETAL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "amount", type: "money" },
  { file: "costAmount", type: "money" },
  { file: "untaxedCostAmount", type: "money" }
];

export const STOCKOUT_RETURN_DETAL_TABLE: TableSettingConfig<TransferBillPartItem> = {
  name: "transferStockoutReturnDetail",
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
      width: 60,
      cantExport: true
    },
    {
      label: "配件编码",
      prop: ["part", "code"],
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件名称",
      prop: ["part", "name"],
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "配件品牌",
      prop: ["part", "brand"],
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "产地",
      prop: ["part", "productionPlace"],
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
      prop: ["part", "model"],
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      label: "退货数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "退货单价",
      prop: "price",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "退货金额",
      prop: "amount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName
    },
    {
      label: "货位",
      prop: "positionName",
      width: CELL_WIDTH.positionName
    },
    {
      label: "退货原因",
      prop: "reason",
      width: CELL_WIDTH.reason
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    },
    {
      label: "原调拨出库单单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "KD",
      billIdField: "sourceBillId"
    },
    {
      label: "原调拨出库时间",
      prop: ["sourceBillAction", "warehouseAuditAt"],
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "批次号",
      prop: "batchNo",
      width: CELL_WIDTH.no
    },
    {
      label: "进价",
      prop: "costPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "成本额",
      prop: "costAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税进价",
      prop: "untaxedCostPrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "未税成本额",
      prop: "untaxedCostAmount",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "供应商",
      prop: "supplierName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "车型",
      prop: ["part", "vehModel"],
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      label: "适用车型",
      prop: ["part", "avaVehModel"],
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};
