import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const PURCHASE_DISPATCH_BY_PART_LIST: TableSettingConfig<any> = {
  name: "purchaseDispatchByPartList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    },
    { prop: "qty", label: "急件需求总数", width: 120, type: "number" },
    {
      prop: "otherCompanyDynaQty",
      label: "它店可售库存数",
      width: 140,
      type: "number"
    },
    {
      prop: "replacementQty",
      label: "互换库存数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "customersCount",
      label: "客户数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "billsCount",
      label: "单据数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "purchaseQtyInOrdering",
      label: "采购在订数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "purchaseQtyInTransit",
      label: "采购在途数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "monthlySaleQty",
      label: "月均销售数",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      prop: "companyDynaQty",
      label: "动态数",
      width: CELL_WIDTH.qty,
      type: "number"
    }
  ]
};
