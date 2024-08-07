import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TableSettingConfig } from "@/constants/interface";
import { TransferBillPartItem } from "@/views/transfer/interface";
import { TransferService } from "@/views/transfer/services";

const TYPE = "KT";

export const transferStockoutReturnService = new TransferService(TYPE);

export const TRANSFER_STOCKOUT_RETURN_ENUM = [
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
    value: "companyName"
  },
  {
    label: "调入分公司",
    value: "relatedCompanyName"
  },
  {
    label: "支付方式",
    value: "paymentType"
  },
  {
    label: "业务日期",
    value: "billDate",
    type: "date"
  },
  {
    label: "业务员",
    value: "businessManName"
  },
  {
    label: "备注",
    value: "reason"
  },
  {
    label: "收货人",
    value: ["logistics", "receiverName"]
  },
  {
    label: "收货地址",
    value: ["logistics", "receiverAddress"]
  },
  {
    label: "提货方式",
    value: ["logistics", "pickMethod"]
  },
  {
    label: "运输方式",
    value: ["logistics", "transportMethod"]
  },
  {
    label: "包装方式",
    value: ["logistics", "packMethod"]
  },
  {
    label: "物流公司",
    value: ["logistics", "logisticsCompanyName"]
  },
  {
    label: "对方单号",
    value: ["relatedBill", "billNo"]
  }
];

export const TRANSFER_STOCKOUT_RETURN_DETAIL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "onTransQty", type: "qty" },
  { file: "outQty", type: "qty" },
  { file: "waitOutQty", type: "qty" },
  { file: "waitDeliverQty", type: "qty" }
];

export const TRANSFER_STOCKOUT_RETURN_DETAIL: TableSettingConfig<TransferBillPartItem> = {
  name: "globalTransferStockoutReturnDetail",
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
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName
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
    },
    {
      label: "原调拨出库单单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
    },
    {
      label: "批次号",
      prop: "batchNo",
      width: CELL_WIDTH.no
    }
  ]
};
