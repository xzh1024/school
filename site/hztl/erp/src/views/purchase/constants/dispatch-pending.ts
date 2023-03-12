import { CELL_WIDTH } from "@/constants";
// SALES_OUT_STATUS
import { TableSettingConfig } from "@/constants/interface";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

export const TABLE_DISPATCH_PENDING_LIST: TableSettingConfig<any> = {
  name: "PurchaseDispatchPendingList",
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
      label: "业务单号",
      prop: "sourceBillNo",
      width: CELL_WIDTH.no
    },
    {
      label: "业务日期",
      prop: "billDate",
      width: CELL_WIDTH.date
    },
    { prop: "sourceType", label: "业务类型", width: CELL_WIDTH.no },
    // {
    //   label: "业务单据状态",
    //   prop: "sourceStatus",
    //   width: CELL_WIDTH.status,
    //   formatter: (value: number) => {
    //     return SALES_OUT_STATUS[value] || "";
    //   }
    // },
    {
      label: "供应商",
      prop: "supplierName",
      width: CELL_WIDTH.companyName
    },
    {
      label: "标签",
      prop: "labels",
      width: CELL_WIDTH.labels,
      cantExport: true
    },
    {
      label: "配件编码",
      prop: "code",
      width: CELL_WIDTH.no
    },
    {
      label: "配件名称",
      prop: "name",
      width: CELL_WIDTH.name
    },
    {
      label: "配件品牌",
      prop: "brand",
      width: CELL_WIDTH.brand
    },
    {
      label: "产地",
      prop: "productionPlace",
      width: CELL_WIDTH.productionPlace
    },
    {
      label: "急需数量",
      prop: "qty",
      width: CELL_WIDTH.qty,
      type: "number"
    },
    {
      label: "进货价",
      prop: "taxedPurchasePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "收货仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName
    },
    {
      label: "实售价",
      prop: "taxedSalePrice",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      label: "备注",
      prop: "remark",
      width: CELL_WIDTH.remark
    }
  ]
};
