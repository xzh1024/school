/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const SUPPLIER_LIST_CHILDREN = {
  name: "supplierListChildren",
  columns: [
    {
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "area",
      label: "供应商区域",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorName",
      label: "供应商名称",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorNo",
      label: "供应商编号",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};

//父列表指标字段
export const SUPPLIER_LIST_SEARCH = {
  name: "supplierListSearch",
  columns: [
    {
      prop: "billNumber",
      label: "单据数",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "lastReturn",
      label: "退前期进货金额",
      width: 150,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "purchasesTaxedAmount",
      label: "本期进货金额",
      width: 150,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "purchasesTaxedPercent",
      label: "占总进货金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "purchasesUntaxedAmount",
      label: "未税进货金额",
      width: 150,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "purchasesUntaxedPercent",
      label: "占总未税进货金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
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
      prop: "stockTaxedPercent",
      label: "占总库存金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "stockUntaxedAmount",
      label: "未税库存金额",
      width: 150,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "stockUntaxedPercent",
      label: "占总未税库存金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "saleTaxedAmount",
      label: "销售金额",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "saleTaxedPercent",
      label: "占总销售金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "saleUntaxedAmount",
      label: "未税销售金额",
      width: 150,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "saleUntaxedPercent",
      label: "占总未税销售金额比例",
      width: 170,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "taxCost",
      label: "成本",
      width: CELL_WIDTH.money,
      cantExport: true,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "taxGrossProfit",
      label: "毛利",
      width: CELL_WIDTH.money,
      cantExport: true,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "untaxdCost",
      label: "未税成本",
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
      prop: "taxedGrossProfitRate",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "markupPercentage",
      label: "加价率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "contact",
      label: "联系人",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "phone",
      label: "联系电话",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "address",
      label: "地址",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};

//子列表维度字段
export const SUPPLIER_LIST_CHILD = {
  name: "supplierListChild",
  columns: [
    {
      prop: "purchasesCreatedAt",
      label: "业务日期",
      width: CELL_WIDTH.date,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "businessManName",
      label: "业务员",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "saleBillDate",
      label: "最近销售日期",
      width: 150,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "slowDays",
      label: "滞销天数",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "vehModel",
      label: "车型",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "unit",
      label: "单位",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "purchasesQty",
      label: "进货数量",
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
      prop: "purchasesTaxedAmount",
      label: "进货金额",
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
      prop: "purchasesUntaxedAmount",
      label: "未税进货金额",
      width: 140,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "saleQty",
      label: "销售数量",
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
      prop: "saleTaxedAmount",
      label: "销售金额",
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
      prop: "taxCost",
      label: "成本",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      cantExport: true,
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "taxGrossProfit",
      label: "毛利",
      width: CELL_WIDTH.money,
      cantExport: true,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "untaxCost",
      label: "未税成本",
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
      prop: "untaxGrossProfit",
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
      prop: "taxedGrossProfitRate",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "priceUpRate",
      label: "加价率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (Number(value) * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "stockQty",
      label: "库存数量",
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
      prop: "stockCost",
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
      prop: "untaxedStockCost",
      label: "未税库存金额",
      width: 140,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? Number(value).toFixed(2) : "--";
      }
    },
    {
      prop: "categoryName",
      label: "配件分类",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "productionCode",
      label: "生产码",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "posCode",
      label: "部位码",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "orginPurchasesBillNo",
      label: "原进货单号",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "orginPurchasesDate",
      label: "原进货日期",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "orginFinancialAuditAt",
      label: "原财务审核日期",
      width: 140,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialAuditAt",
      label: "财务日期",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};
