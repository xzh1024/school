/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//父列表指标字段
export const UNSALE_REPORT_LIST_SEARCH = {
  name: "unsaleReportListSearch",
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
      prop: "ownerCompanyName",
      label: "货主公司",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperator",
      label: "供应商名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCode",
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partName",
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partBrand",
      label: "品牌",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partProductionPlace",
      label: "产地",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCategory",
      label: "配件分类",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.partCategory;
      }
    },
    {
      prop: "positionName",
      label: "货位",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseDate",
      label: "进货日期",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "stockInDate",
      label: "入库日期",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseCreatedByMan",
      label: "采购制单人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchaseBusinessMan",
      label: "采购业务员",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partUnit",
      label: "单位",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "stockQty",
      label: "实际库存数",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "inventoryAge",
      label: "库龄",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "lastSaleDate",
      label: "最近销售日期",
      width: 150,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "unsalableDays",
      label: "滞销天数",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "stockTaxedAmount",
      label: "库存金额",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "stockUntaxedAmount",
      label: "未税库存金额",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "retailPrice",
      label: "零售价",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "platformPrice",
      label: "平台价",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "transferPrice",
      label: "调拨价",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "wholeSalePrice",
      label: "批发价",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "wholeSalePrice1",
      label: "批发价一",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "wholeSalePrice2",
      label: "批发价二",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "wholeSalePrice3",
      label: "批发价三",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "wholeSalePrice4",
      label: "批发价四",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    }
  ]
};
