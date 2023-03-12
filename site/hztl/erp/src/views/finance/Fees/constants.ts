import { FeesData } from "@/api/finance/fees";
import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export enum FEES_BILL_STATUS {
  unSubmit,
  submited,
  rejected,
  audited,
  advance,
  unSettlement,
  hasSettlement,
  complete
}

export const BILL_STATUS = [
  "待提交",
  "待审核",
  "审核驳回",
  "待报销(预支)",
  "报销中(预支)",
  "待结算",
  "部分结算",
  "完成"
];

export const BILL_TYPES: {
  [key: string]: string;
} = {
  YZ: "预支款",
  BX: "报销",
  YBX: "预支报销"
};

export const FINANCE_FEES: TableSettingConfig<FeesData> = {
  name: "financeFees",
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
      width: 110,
      cantExport: true
    },
    {
      prop: "applyAt",
      label: "费用日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.type,
      formatter: value => BILL_STATUS[value]
    },
    {
      prop: "billNo",
      label: "费用单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "sourceBillType"
    },
    {
      prop: "billType",
      label: "申请类型",
      width: CELL_WIDTH.type,
      formatter: value => BILL_TYPES[value]
    },
    {
      prop: "applyByName",
      label: "申请人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "applyAmount",
      label: "申请金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "applyReason",
      label: "申请原因",
      width: CELL_WIDTH.remark
    },
    {
      prop: "advanceBillNo",
      label: "预支单号",
      width: CELL_WIDTH.no,
      formatter: value => value || "-"
    },
    {
      prop: "advanceAmount",
      label: "预支单预支金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => Number(value) || "-"
    },
    {
      prop: "amount",
      label: "应结金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "settledAmount",
      label: "已结金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "unSettleAmount",
      label: "未结金额",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "way",
      label: "支付方式",
      width: CELL_WIDTH.type,
      formatter: () => "现付"
    },
    {
      prop: "rejectReason",
      label: "拒绝原因",
      width: CELL_WIDTH.remark
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "auditByName",
      label: "审核人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "auditAt",
      label: "审核时间",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "settleByName",
      label: "结算人",
      width: CELL_WIDTH.personName,
      isHide: true
    },
    {
      prop: "settleAt",
      label: "结算时间",
      width: CELL_WIDTH.time,
      type: "time",
      isHide: true
    },
    {
      prop: "companyName",
      label: "发生公司",
      width: CELL_WIDTH.companyName,
      isHide: true
    },
    {
      prop: "settleCompanyName",
      label: "结算公司",
      width: CELL_WIDTH.companyName,
      isHide: true
    }
  ]
};
