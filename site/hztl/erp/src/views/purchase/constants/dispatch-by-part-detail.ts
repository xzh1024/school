import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const PURCHASE_DISPATCH_BY_PART_DETAIL: TableSettingConfig<any> = {
  name: "purchaseDispatchByPartDetail",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true
    },
    { prop: "sourceType", label: "业务类型", width: CELL_WIDTH.no },
    { prop: "sourceBillNo", label: "业务单号", width: CELL_WIDTH.no },
    {
      prop: "customerName",
      label: "客户名称",
      width: CELL_WIDTH.companyName
    },
    { prop: "qty", label: "急件需求总数", width: 120, type: "number" },
    {
      prop: "taxedSalePrice",
      label: "实售价",
      width: CELL_WIDTH.money,
      type: "number"
    },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
