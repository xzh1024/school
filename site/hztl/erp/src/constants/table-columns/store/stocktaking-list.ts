import { CELL_WIDTH } from "../cell-width";
import { STOCKTAKING_BILL_STATUS } from "@/views/store/billstatus";

export const TABLE_STOCKTAKING_LIST = {
  name: "stocktakingList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    { prop: "billNo", label: "单据号", width: CELL_WIDTH.no },
    {
      prop: "billDate",
      label: "盘点日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    { prop: "warehouseNames", label: "仓库", width: CELL_WIDTH.warehouseName },
    {
      prop: "profitLossQty",
      label: "盈亏数量",
      type: "number",
      width: CELL_WIDTH.qty
    },
    {
      prop: "profitLossTaxedAmount",
      label: "盈亏金额",
      type: "number",
      width: CELL_WIDTH.money
    },
    {
      prop: "Status",
      label: "单据状态",
      width: CELL_WIDTH.status,
      formatter: function(status: string) {
        return STOCKTAKING_BILL_STATUS[status] || "";
      }
    },
    { prop: "createdByName", label: "制单人", width: CELL_WIDTH.personName },
    {
      prop: "createdAt",
      label: "制单日期",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "warehouseByName",
      label: "仓库审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "warehouseAt",
      label: "仓库审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "financialByName",
      label: "财务审核人",
      width: CELL_WIDTH.personName
    },
    {
      prop: "financialAt",
      label: "财务审核时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    { prop: "printCount", label: "打印次数", width: CELL_WIDTH.count },
    { prop: "remark", label: "备注", width: CELL_WIDTH.remark }
  ]
};
