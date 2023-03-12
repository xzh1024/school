import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { TableSettingConfig } from "@/constants/interface";
import { TransferBillPartItem } from "@/views/transfer/interface";
import { TransferService } from "@/views/transfer/services";

const TYPE = "QD";

export const transferApplyService = new TransferService(TYPE);

export const TRANSFER_APPLY_ENUM = [
  {
    label: "单据号",
    value: "billNo"
  },
  {
    label: "状态",
    value: "statusName"
  },
  {
    label: "调出分公司",
    value: "outCompanyName"
  },
  {
    label: "调入分公司",
    value: "inCompanyName"
  },
  {
    label: "支付方式",
    value: "paymentType"
  },
  {
    label: "申请日期",
    value: "billDate",
    type: "date"
  },
  {
    label: "预期到货日期",
    value: "planDate",
    type: "date"
  },
  {
    label: "备注",
    value: "reason"
  }
];

export const TRANSFER_APPLY_DETAIL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "onTransQty", type: "qty" },
  { file: "outQty", type: "qty" },
  { file: "waitOutQty", type: "qty" },
  { file: "waitDeliverQty", type: "qty" }
];

export const TRANSFER_APPLY_DETAIL: TableSettingConfig<TransferBillPartItem> = {
  name: "globalTransferApplyDetail",
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
      prop: ["part", "code"],
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: ["part", "name"],
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: ["part", "brand"],
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "qty",
      label: "申请数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "onTransQty",
      label: "待转调拨出库数量",
      width: 120,
      type: "number"
    },
    {
      prop: "canceledQty",
      label: "取消数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outQty",
      label: "已出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitOutQty",
      label: "待出库数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "waitDeliverQty",
      label: "待交货数量",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "outWarehouseName",
      label: "调出仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: ["part", "productionPlace"],
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: ["part", "vehModel"],
      label: "车型",
      width: CELL_WIDTH.vehModel
    },
    {
      prop: ["part", "avaVehModel"],
      label: "适用车型",
      width: CELL_WIDTH.avaVehModels
    }
  ]
};
