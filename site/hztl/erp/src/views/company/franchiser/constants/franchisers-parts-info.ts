import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import { dateFormatFull } from "@/utils/date";

export const FRANCHISERS_PARTS_INFO_LIST: TableSettingConfig<any> = {
  name: "FranchisersPartsInfoList",
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
      width: 190,
      cantExport: true
    },
    {
      prop: "label",
      label: "标签",
      width: 80
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    {
      prop: "dynaQty",
      label: "可售库存（动态数）",
      width: 140,
      type: "number",
      formatter: (value, row) =>
        row.isPurchased && row.canViewStorage ? value : "--"
    },
    // {
    //   prop: "transitQty",
    //   label: "在途数",
    //   width: CELL_WIDTH.qty,
    //   type: "number",
    //   formatter: (value, row) => (row.isPurchased ? value : "--")
    // },
    // {
    //   prop: "monthAverageSaleQty",
    //   label: "月均销量",
    //   width: CELL_WIDTH.qty,
    //   type: "number",
    //   formatter: (value, row) => (row.isPurchased ? value : "--")
    // },
    {
      prop: "lastPurchaseQty",
      label: "上次进货量",
      width: CELL_WIDTH.qty,
      type: "number",
      formatter: (value, row) => (row.isPurchased ? value : "--")
    },
    {
      prop: "lastPurchasePrice",
      label: "上次进货单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => (row.isPurchased ? value : "--")
    },
    {
      prop: "lastPurchaseAmount",
      label: "上次进货金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: (value, row) => (row.isPurchased ? value : "--")
    },
    {
      prop: "lastPurchaseTime",
      label: "上次进货时间",
      width: CELL_WIDTH.time,
      formatter: (value, row) =>
        row.isPurchased ? dateFormatFull(value) : "--"
    }
  ]
};
