import { CELL_WIDTH } from "@/constants";

export const SUMMARY_LIST = {
  name: "summaryList",
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
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "staffName",
      label: "员工",
      width: CELL_WIDTH.personName
    },
    {
      prop: "outInfo",
      label: "出库业务统计",
      align: "center",
      children: [
        {
          prop: ["outInfo", "completedBillCount"],
          label: "已完成单数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["outInfo", "unCompletedBillCount"],
          label: "未完成单数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["outInfo", "stockPartCount"],
          label: "拣货配件数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["outInfo", "checkPartCount"],
          label: "验货配件数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["outInfo", "stockPartAmount"],
          label: "拣货配件总金额",
          width: CELL_WIDTH.money,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["outInfo", "checkPartAmount"],
          label: "验货配件总金额",
          width: CELL_WIDTH.money,
          type: "number",
          classNames: "number-font"
        }
      ]
    },
    {
      prop: "inInfo",
      label: "入库业务统计",
      align: "center",
      children: [
        {
          prop: ["inInfo", "completedBillCount"],
          label: "已完成单数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["inInfo", "unCompletedBillCount"],
          label: "未完成单数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["inInfo", "stockPartCount"],
          label: "上架配件数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["inInfo", "checkPartCount"],
          label: "验货配件数",
          width: CELL_WIDTH.qty,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["inInfo", "stockPartAmount"],
          label: "上架配件总金额",
          width: CELL_WIDTH.money,
          type: "number",
          classNames: "number-font"
        },
        {
          prop: ["inInfo", "checkPartAmount"],
          label: "验货配件总金额",
          width: CELL_WIDTH.money,
          type: "number",
          classNames: "number-font"
        }
      ]
    }
  ]
};
