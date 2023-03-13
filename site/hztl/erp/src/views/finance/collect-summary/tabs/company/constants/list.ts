import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { FinanceSummaryData } from "@/constants/finance";

export const COMPANY_SUMMARY_LIST: TableSettingConfig<FinanceSummaryData> = {
  name: "companySummaryList",
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
      prop: "cooperatorNo",
      label: "单位编号",
      width: CELL_WIDTH.companyNo
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "previousBalance",
      label: "上期余额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "receivableAmount",
      label: "本期应收",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "payableAmount",
      label: "本期应付",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settledAmount",
      label: "已结金额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "currentBalance",
      label: "本期余额",
      width: CELL_WIDTH.money,
      type: "number",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "creditLimit",
      label: "信用额度",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "mainContact",
      label: "主联系人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "mainContactPhone",
      label: "主联系人电话",
      width: CELL_WIDTH.phone
    },
    { prop: "cooperatorType", label: "单位类型", width: 200 },
    {
      prop: "cooperatorArea",
      label: "所属区域",
      width: CELL_WIDTH.address
    },
    { prop: "cooperatorAddr", label: "单位地址", width: CELL_WIDTH.address },
    {
      prop: "purchaseManName",
      label: "采购业务员",
      width: CELL_WIDTH.personName
    },
    {
      prop: "salesManName",
      label: "销售业务员",
      width: CELL_WIDTH.personName
    }
  ]
};
