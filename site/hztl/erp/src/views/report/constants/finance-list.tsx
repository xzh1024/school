/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const FINANCE_REPORT_LIST_CHILDREN = {
  name: "financeReportListChildren",
  columns: [
    {
      prop: "businessMan",
      label: "业务员",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "area",
      label: "客户地区",
      width: CELL_WIDTH.address,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "customer",
      label: "客户",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "companyName",
      label: "分公司",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};

//父列表指标字段
export const FINANCE_REPORT_LIST_SEARCH = {
  name: "financeReportListSearch",
  columns: [
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
      prop: "saleCost",
      label: "销售成本",
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
      prop: "saleGross",
      label: "销售毛利",
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
      prop: "grossProfit",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "receivableAmount",
      label: "回款金额",
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
      prop: "discountAmount",
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
      prop: "receivableProfit",
      label: "回款率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "receivableCost",
      label: "回款成本",
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
      prop: "receivableGross",
      label: "回款毛利",
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
      prop: "receivableGrossProfit",
      label: "回款毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "accumulatedReceivable",
      label: "累计已回款",
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
      prop: "accumulatedUnpaid",
      label: "未回款金额",
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

//子列表维度字段
export const FINANCE_REPORT_LIST_CHILD = {
  name: "financeReportListChild",
  columns: [
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
      prop: "saleCost",
      label: "销售成本",
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
      prop: "saleGross",
      label: "销售毛利",
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
      prop: "grossProfit",
      label: "毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "receivableAmount",
      label: "回款金额",
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
      prop: "discountAmount",
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
      prop: "receivableProfit",
      label: "回款率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "receivableCost",
      label: "回款成本",
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
      prop: "receivableGross",
      label: "回款毛利",
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
      prop: "receivableGrossProfit",
      label: "回款毛利率",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number) => {
        if (value != null) {
          return (value * 100).toFixed(2) + "%";
        } else {
          return "--";
        }
      }
    },
    {
      prop: "accumulatedReceivable",
      label: "累计已回款",
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
      prop: "accumulatedUnpaid",
      label: "未回款金额",
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
