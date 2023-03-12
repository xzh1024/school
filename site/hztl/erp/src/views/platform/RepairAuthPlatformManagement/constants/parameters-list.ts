import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const SYSTEM_PARAMS_SETTING_PARAMETERS_LIST: TableSettingConfig<any> = {
  name: "systemParamsSettingParametersList",
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
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "name",
      label: "分公司名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "value",
      label: "参数值",
      width: 200
    }
  ]
};
