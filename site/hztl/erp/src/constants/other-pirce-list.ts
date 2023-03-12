import { TableColumn } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OTHER_PIRCE_LIST: TableColumn<any>[] = [
  {
    label: "零售价",
    prop: "retail",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.retail)
  },
  {
    label: "平台价",
    prop: "platform",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.platform),
    isHide: true
  },
  {
    label: "调拨价",
    prop: "allot",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.allot),
    isHide: true
  },
  {
    label: "批发价",
    prop: "wholesale",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale),
    isHide: true
  },
  {
    label: "批发价一",
    prop: "wholesale1",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale1),
    isHide: true
  },
  {
    label: "批发价二",
    prop: "wholesale2",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale2),
    isHide: true
  },
  {
    label: "批发价三",
    prop: "wholesale3",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale3),
    isHide: true
  },
  {
    label: "批发价四",
    prop: "wholesale4",
    width: CELL_WIDTH.money,
    type: "number",
    formatter: (value, row) => getNoPricePermTips(row.salePrices?.wholesale4),
    isHide: true
  }
];
