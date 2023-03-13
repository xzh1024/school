import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const PURCHASE_DISPATCH_BY_BILL_DETAIL: TableSettingConfig<any> = {
  name: "purchaseDispatchByBillDetail",
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
    // {
    //     prop: "warehouseName",
    //     label: "仓库",
    //     width: CELL_WIDTH.warehouseName
    // },
    { prop: "qty", label: "急需数量", width: CELL_WIDTH.qty, type: "number" },
    {
      prop: "taxedSalePrice",
      label: "实售价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    }
    // { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
