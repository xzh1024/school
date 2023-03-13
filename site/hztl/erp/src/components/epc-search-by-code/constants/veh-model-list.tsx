import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";

export const EPC_SEARCH_BY_CODE_DIALOG_VEH_MODEL_TABLE: TableSettingConfig<any> = {
  name: "epcSearchByCodeDialogVehModelTable",
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
      width: 100,
      cantExport: true
    },
    {
      prop: "vehBrand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "facBrand",
      label: "厂牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "vehGroup",
      label: "车型组",
      width: CELL_WIDTH.vehGroup
    },
    {
      prop: "modeYear",
      label: "年款",
      width: CELL_WIDTH.type
    },
    {
      prop: "displacement",
      label: "排量｜发动机",
      width: CELL_WIDTH.vehGroup,
      formatter: (value, row) => `${row.displacement}｜${row.engine}`
    },
    {
      prop: "transmission",
      label: "变速箱",
      width: CELL_WIDTH.type
    },
    {
      prop: "saleVehModel",
      label: "销售版型",
      width: CELL_WIDTH.vehGroup
    }
  ]
};
