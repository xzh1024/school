import { CELL_WIDTH } from "../cell-width";
import {
  BILL_TYPE,
  LOGISTICS_REGISTER_STATUS,
  PAYER_OPTINS
} from "../../store";

export const LOGISTICS_REGISTER_DETAIL_TABLE = {
  name: "logisticsRegisterDetailTable",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "freightNo", label: "运单号", width: CELL_WIDTH.no },
    {
      prop: "status",
      label: "登记状态",
      width: CELL_WIDTH.type,
      formatter: (value: number) => LOGISTICS_REGISTER_STATUS[value]
    },
    {
      prop: "logisticsCompanyName",
      label: "物流公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "qty", label: "发货件数", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "charges",
      label: "托运费用",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "payer",
      label: "付款方",
      width: CELL_WIDTH.method,
      formatter: (value: number) => PAYER_OPTINS[value]
    },
    {
      prop: "collectingAmount",
      label: "代收金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "billNos",
      label: "业务单号",
      width: CELL_WIDTH.no,
      formatter: (value: string[]) => {
        let billNoText = "";
        if (value && value.length) {
          billNoText = value.join(",");
        }
        return billNoText;
      }
    },
    {
      prop: "cooperatorName",
      label: "收货单位",
      width: CELL_WIDTH.companyName
    },
    { prop: "receiverName", label: "收货人", width: CELL_WIDTH.personName },
    { prop: "receiverPhone", label: "收货人电话", width: CELL_WIDTH.phone },
    { prop: "receiverAddress", label: "收货人地址", width: CELL_WIDTH.address },
    { prop: "remark", label: "发货备注", width: CELL_WIDTH.remark },
    { prop: "senderName", label: "发货人", width: CELL_WIDTH.personName },
    { prop: "date", label: "发货日期", width: CELL_WIDTH.date, type: "date" },
    { prop: "createdName", label: "登记人", width: CELL_WIDTH.personName },
    {
      prop: "createdAt",
      label: "登记时间",
      width: CELL_WIDTH.time,
      type: "time"
    }
  ]
};

export const LOGISTICS_REGISTER_TO_BE_HANDLE_TABLE = {
  name: "logisticsRegisterToBeHandleTable",
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
      prop: "billType",
      label: "业务类型",
      width: CELL_WIDTH.type,
      formatter: (value: string) => BILL_TYPE[value]
    },
    {
      prop: "enhancedSettlementType",
      label: "支付方式",
      width: CELL_WIDTH.method
    },
    {
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    { prop: "billNo", label: "业务单号", width: CELL_WIDTH.no },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    { prop: "qty", label: "总数量", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "taxedAmount",
      label: "总金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "freight",
      label: "运费",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "logisticsCompanyName",
      label: "物流公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "transportMethod", label: "运输方式", width: CELL_WIDTH.method },
    { prop: "packMethod", label: "包装方式", width: CELL_WIDTH.method },
    { prop: "companyName", label: "业务公司", width: CELL_WIDTH.companyName },
    { prop: "businessMan", label: "业务员", width: CELL_WIDTH.personName },
    { prop: "createdName", label: "制单人", width: CELL_WIDTH.personName },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "receiverName", label: "联系人", width: CELL_WIDTH.personName },
    { prop: "receiverPhone", label: "联系手机号", width: CELL_WIDTH.phone },
    { prop: "receiverAddress", label: "联系地址", width: CELL_WIDTH.address },
    { prop: "remark", label: "单据备注", width: CELL_WIDTH.remark }
  ]
};
