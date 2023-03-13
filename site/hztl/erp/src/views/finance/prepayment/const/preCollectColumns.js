import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
export const TABLE_COLUMN_PRECOLLECT_LOG = type => {
  return [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.personName
    },
    {
      prop: "cooperatorName",
      label: "往来单位",
      width: CELL_WIDTH.personName
    },
    {
      prop: "amount",
      label: type === "YS" ? "预收款" : "预付款",
      width: CELL_WIDTH.personName
    },
    {
      prop: "deductedAmount",
      label: "已结款",
      width: CELL_WIDTH.personName
    },
    {
      prop: "balanceAmount",
      label: "余额",
      width: CELL_WIDTH.personName
    },
    {
      prop: "toSettleAmount",
      label: "待结算总额",
      width: CELL_WIDTH.personName
    }
  ];
};
