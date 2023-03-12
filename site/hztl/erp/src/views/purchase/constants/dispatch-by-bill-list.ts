import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const PURCHASE_DISPATCH_BY_BILL_LIST: TableSettingConfig<any> = {
  name: "purchaseDispatchByBillList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "sourceType", label: "业务类型", width: CELL_WIDTH.no },
    { prop: "sourceBillNo", label: "业务单号", width: CELL_WIDTH.no },
    {
      prop: "createdAt",
      label: "制单时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "qty", label: "急件总数", width: 120, type: "number" },
    {
      prop: "customerName",
      label: "客户名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.date,
      type: "date"
    }
  ]
};
