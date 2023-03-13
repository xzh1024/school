import { CELL_WIDTH } from "../cell-width";
import { IndexStatusEmun } from "@/constants/interface";

export const MOVEING_BILL_STATUS: IndexStatusEmun = {
  0: "待提交",
  1: "待确认",
  2: "已确认"
};

export const TABLE__MOVEING_LIST_TABLE = {
  name: "movingListTable",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "billNo", label: "单据号", width: CELL_WIDTH.no },
    {
      prop: "toWarehouseAt",
      label: "移仓日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.status,
      formatter: (value: number) => {
        return MOVEING_BILL_STATUS[value] || "";
      }
    },
    { prop: "createdByName", label: "制单人", width: CELL_WIDTH.personName },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    // { prop: "submitByName", label: "提交人", width: CELL_WIDTH.personName },
    // {
    //   prop: "submitAt",
    //   label: "提交时间",
    //   width: CELL_WIDTH.time,
    //   type: "time"
    // },
    {
      prop: "confirmByName",
      label: "审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "confirmAt",
      label: "审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "printCount", label: "打印次数", width: CELL_WIDTH.count },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
