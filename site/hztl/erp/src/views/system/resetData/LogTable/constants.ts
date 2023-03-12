import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export interface LogItem {
  initAt: string | null;
  initByName: string;
  initType: string;
}

export const SYSTEM_RESET_DATA_LOG_TABLE: TableSettingConfig<LogItem> = {
  name: "systemResetDataLogTable",
  columns: [
    {
      label: "序号",
      prop: "index",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      label: "初始化时间",
      prop: "initAt",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      label: "初始化员工",
      prop: "initByName",
      width: CELL_WIDTH.personName
    },
    {
      label: "初始化类型",
      prop: "initType",
      width: CELL_WIDTH.companyName
    }
  ]
};
