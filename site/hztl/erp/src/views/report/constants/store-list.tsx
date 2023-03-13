/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";
import { multiply } from "@/utils/numberAPI";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const STORE_REPORT_LIST_CHILDREN = {
  name: "storeReportListChildren",
  columns: [
    {
      prop: "warehouseId",
      label: "仓库",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.warehouseName;
      }
    },
    {
      prop: "positionId",
      label: "货位",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.positionName;
      }
    },
    {
      prop: "ownerCompanyId",
      label: "货主",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.ownerCompanyName;
      }
    },
    {
      prop: "inOrOutType",
      label: "出入库类型",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "inOrOutDate",
      label: "出入库日期",
      width: CELL_WIDTH.time,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "warehouseAuditByMan",
      label: "库房审核人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "supplierId",
      label: "供应商名称",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.supplierName;
      }
    },
    {
      prop: "cooperatorName",
      label: "业务往来单位/分公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billType",
      label: "业务类型",
      width: CELL_WIDTH.status,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billDate",
      label: "业务日期",
      width: CELL_WIDTH.time,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialAuditDate",
      label: "财务审核日期",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billNo",
      label: "业务单据号",
      width: CELL_WIDTH.no,
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
      prop: "partCode",
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partBrand",
      label: "品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partProductionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partProperty",
      label: "配件性质", //没有这个字段
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCategory",
      label: "配件分类",
      width: CELL_WIDTH.categoryName,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.partCategory;
      }
    }
  ]
};

//父列表指标字段
export const STORE_REPORT_LIST_SEARCH = {
  name: "storeReportListSearch",
  columns: [
    {
      prop: "purchasePrice",
      label: "进货价",
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
      prop: "untaxedPurchasePrice",
      label: "未税进货价",
      width: 120,
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
      label: "销售价",
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
      prop: "untaxedRetailPrice",
      label: "未税销售价",
      width: 120,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "beginStockQty",
      label: "期初库存数量",
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
      prop: "beginStockTaxedAmount",
      label: "期初库存金额",
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
      prop: "beginStockUntaxedAmount",
      label: "期初未税库存金额",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "stockInQty",
      label: "入库数量",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "stockInTaxedAmount",
      label: "入库金额",
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
      prop: "stockInUntaxedAmount",
      label: "未税入库金额",
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
      prop: "stockOutQty",
      label: "出库数量",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "stockOutTaxedAmount",
      label: "出库成本金额",
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
      prop: "stockOutUntaxedAmount",
      label: "未税出库成本金额",
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
      prop: "taxedStockOutSaleAmount",
      label: "出库销售金额",
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
      prop: "untaxedStockOutSaleAmount",
      label: "未税出库销售金额",
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
      prop: "benefitAmount",
      label: "优惠金额",
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
      prop: "taxedGrossProfit",
      label: "毛利",
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
      prop: "taxedGrossProfitRate",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "untaxedGrossProfit",
      label: "未税毛利",
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
      prop: "untaxedGrossProfitRate",
      label: "未税毛利率",
      width: 120,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "priceUpRate",
      label: "加价率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "endStockQty",
      label: "期末库存数量",
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
      prop: "endStockTaxedAmount",
      label: "期末库存金额",
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
      prop: "endStockUntaxedAmount",
      label: "期末未税库存金额",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    }
    // {
    //   prop: "turnOverRatio",
    //   label: "库存周转率",
    //   width: CELL_WIDTH.name,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // }
  ]
};

//子列表维度字段
export const STORE_REPORT_LIST_CHILD = {
  name: "storeReportListChild",
  columns: [
    {
      prop: "purchasePrice",
      label: "进货价",
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
      prop: "untaxedPurchasePrice",
      label: "未税进货价",
      width: 120,
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
      label: "销售价",
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
      prop: "untaxedRetailPrice",
      label: "未税销售价",
      width: 120,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "stockInQty",
      label: "入库数量",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "stockInTaxedAmount",
      label: "入库金额",
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
      prop: "stockInUntaxedAmount",
      label: "未税入库金额",
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
      prop: "stockOutQty",
      label: "出库数量",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "stockOutTaxedAmount",
      label: "出库成本金额",
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
      prop: "stockOutUntaxedAmount",
      label: "未税出库成本金额",
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
      prop: "taxedStockOutSaleAmount",
      label: "出库销售金额",
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
      prop: "untaxedStockOutSaleAmount",
      label: "未税出库销售金额",
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
      prop: "benefitAmount",
      label: "优惠金额",
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
      prop: "taxedGrossProfit",
      label: "毛利",
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
      prop: "taxedGrossProfitRate",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "untaxedGrossProfit",
      label: "未税毛利",
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
      prop: "untaxedGrossProfitRate",
      label: "未税毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "priceUpRate",
      label: "加价率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0
          ? multiply(Number(value).toFixed(4), 100) + "%"
          : "--";
      }
    },
    {
      prop: "endStockQty",
      label: "期末库存数量",
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
      prop: "endStockTaxedAmount",
      label: "期末库存金额",
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
      prop: "endStockUntaxedAmount",
      label: "期末未税库存金额",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    }
    // {
    //   prop: "turnOverRatio",
    //   label: "库存周转率",
    //   width: CELL_WIDTH.name,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // }
  ]
};
