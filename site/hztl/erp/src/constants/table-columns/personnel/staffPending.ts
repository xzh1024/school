import { CELL_WIDTH } from "../cell-width";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const TABLE_STAFFS_PENDING_LIST_TABLE = {
  name: "staffsPendingTable",
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
      width: 80,
      cantExport: true
    },
    { prop: "staffNumber", label: "编号", width: CELL_WIDTH.number },
    { prop: "staffName", label: "显示姓名", width: CELL_WIDTH.personName },
    { prop: "phone", label: "电话号码", width: CELL_WIDTH.phone },
    {
      prop: "companyName",
      label: "申请加入公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "status", label: "状态", width: 80 },
    {
      prop: "createdAt",
      label: "申请时间",
      width: CELL_WIDTH.date,
      type: "date"
    }
  ]
};
