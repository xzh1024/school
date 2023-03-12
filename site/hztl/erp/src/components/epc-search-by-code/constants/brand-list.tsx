import { CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { BasicPartByCode } from "@/api/epc";

export const EPC_SEARCH_BY_CODE_DIALOG_BRAND_TABLE: TableSettingConfig<BasicPartByCode> = {
  name: "epcSearchByCodeDialogBrandTable",
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
      type: "controls",
      label: "操作",
      width: 40,
      cantExport: true
    },
    {
      prop: "code",
      label: "完整配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "brand",
      label: "品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "name",
      label: "名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "partPrice",
      label: "4S/品牌价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "untaxedPartPrice",
      label: "未税4S/品牌价",
      width: 120,
      type: "number"
    },
    {
      prop: "purchasePrice",
      label: "进货价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "untaxedPurchasePrice",
      label: "未税进货价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    {
      prop: "stdName",
      label: "标准名",
      width: CELL_WIDTH.name
    },
    {
      prop: "comment",
      label: "备注",
      width: CELL_WIDTH.remark
    }
  ]
};
