import { CELL_WIDTH } from "../table-columns/cell-width";

export const TABLE_COLUMN_STOCK_SUMMARY = {
  name: "stocktakingSummary",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "totalBillCount",
      label: "单据数",
      width: CELL_WIDTH.no
    },
    {
      prop: "billCountFinancial",
      label: "财务已审核单据数",
      width: CELL_WIDTH.no
    },
    {
      prop: "profitLossQty",
      label: "盈亏数量",
      width: CELL_WIDTH.no
    },
    {
      prop: "profitLossTaxedAmount",
      label: "盈亏金额",
      width: CELL_WIDTH.no
    }
  ]
};

export const TABLE_COLUMN_STOCK_DETAIL = {
  name: "stocktakingDetail",
  columns: [
    {
      prop: "index",
      label: "序号",
      width: CELL_WIDTH.index,
      type: "index",
      cantHide: false,
      cantExport: true
    },
    {
      prop: "billNo",
      label: "盘点单号",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "warehouseNames",
      label: "盘点仓库",
      width: CELL_WIDTH.personName
    },
    {
      prop: "billData",
      label: "开单日期",
      width: CELL_WIDTH.phone
    },
    {
      prop: "profitLossQty",
      label: "盈亏数量",
      width: CELL_WIDTH.time
    },
    {
      prop: "profitLossTaxedAmount",
      label: "盈亏金额",
      width: CELL_WIDTH.dept
    },
    {
      prop: "CreatedName",
      label: "制单人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "WarehouseUserName",
      label: "仓库审核人",
      width: CELL_WIDTH.dept
    },
    {
      prop: "FinancialName",
      label: "财务审核人",
      width: CELL_WIDTH.dept
    }
  ]
};
