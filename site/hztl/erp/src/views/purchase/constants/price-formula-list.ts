import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH, SCOPETYPES } from "@/constants";

export const PURCHASE_PRICE_FORMULA_LIST: TableSettingConfig<any> = {
  name: "purchasePriceFormulaList",
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
      prop: "scopeType",
      label: "公式类型",
      width: 100,
      formatter: value =>
        (SCOPETYPES.find(item => item.id === value) || {}).name || ""
    },
    { prop: "name", label: "公式名称", width: CELL_WIDTH.formula },
    {
      prop: "companyName",
      label: "作用分公司",
      width: CELL_WIDTH.companyName
    },
    { prop: "effectedTypeName", label: "作用范围", width: CELL_WIDTH.name },
    { prop: "retailPrice", label: "零售价", width: CELL_WIDTH.formula },
    { prop: "transferPrice", label: "调拨价", width: CELL_WIDTH.formula },
    { prop: "platformPrice", label: "平台价", width: CELL_WIDTH.formula },
    { prop: "wholeSalePrice", label: "批发价", width: CELL_WIDTH.formula },
    { prop: "wholeSalePrice1", label: "批发价一", width: CELL_WIDTH.formula },
    { prop: "wholeSalePrice2", label: "批发价二", width: CELL_WIDTH.formula },
    { prop: "wholeSalePrice3", label: "批发价三", width: CELL_WIDTH.formula },
    { prop: "wholeSalePrice4", label: "批发价四", width: CELL_WIDTH.formula },
    {
      prop: "createdByCompanyName",
      label: "创建公式分公司",
      width: CELL_WIDTH.companyName
    }
  ]
};
