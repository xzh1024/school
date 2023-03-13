import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import { FRANCHISE_AUDIT_STATUS } from "./status";

export const FRANCHISE_RECORD_LIST: TableSettingConfig<any> = {
  name: "JoinRecordsList",
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
      width: 50,
      cantExport: true
    },
    {
      prop: "headCompanyName",
      label: "总店名称",
      width: 170
    },
    {
      prop: "status",
      label: "状态",
      width: 90,
      formatter: val => FRANCHISE_AUDIT_STATUS[val]
    },
    {
      prop: "partsQty",
      label: "授权配件数",
      width: 90,
      type: "number"
    },
    {
      prop: "createDate",
      label: "申请日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
