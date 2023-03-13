import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const SYSTEM_PARAMS_SETTING_PARAMS_LIST: TableSettingConfig<any> = {
  name: "systemParamsSettingParamsList",
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
      prop: "name",
      label: "参数名称",
      width: 200
    },
    {
      prop: "remark",
      label: "参数说明",
      width: 400
    }
  ]
};
