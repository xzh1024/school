/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const REPORT_SALES_LIST_CHILDREN = {
  name: "reportSalesListChildren",
  columns: [
    {
      prop: "date",
      label: "日期",
      width: CELL_WIDTH.date,
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
    },
    {
      prop: "cooperatorProperty",
      label: "客户性质",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorNameStr",
      label: "客户名称",
      width: CELL_WIDTH.companyName,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "cooperatorArea",
      label: "客户区域",
      width: CELL_WIDTH.no,
      type: "cooperatorArea",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "settlementType",
      label: "支付方式",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "invoiceType",
      label: "发票类型",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "businessMan",
      label: "业务员",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "createdByMan",
      label: "制单人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "financialAuditByMan",
      label: "财务审核人",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.status,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "status",
      label: "单据状态",
      width: CELL_WIDTH.type,
      attrs: {
        sortable: "custom"
      },
      formatter: (value: number, row: any) => {
        return row.statusStr;
      }
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
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
      label: "配件品牌",
      width: CELL_WIDTH.brand,
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
    },
    {
      prop: "partVehModel",
      label: "车型",
      width: CELL_WIDTH.vehModel,
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
      prop: "saleChannel",
      label: "销售渠道",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "saleNo",
      label: "原销售单号",
      width: CELL_WIDTH.no,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};

//父列表指标字段
export const REPORT_SALES_LIST_SEARCH = {
  name: "reportSalesListSearch",
  columns: [
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.no,
      type: "billCount",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCount",
      label: "配件种类数",
      width: CELL_WIDTH.no,
      type: "partCount",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "saleQty",
      label: "销售数量",
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
      prop: "taxedPurchaseAmount",
      label: "成本额",
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
      prop: "untaxedPurchaseAmount",
      label: "未税成本额",
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
      prop: "taxedBillAmount",
      label: "开单金额",
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
      prop: "taxedSaleAmount",
      label: "销售额",
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
      prop: "taxedSaleRatio",
      label: "占销售比例",
      width: CELL_WIDTH.name,
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
      prop: "untaxedSaleAmount",
      label: "未税销售额",
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
      prop: "untaxedSaleRatio",
      label: "占未税销售额比例",
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
      prop: "taxAmount",
      label: "税额",
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
      prop: "taxedGrossProfitRatio",
      label: "占毛利比例",
      width: CELL_WIDTH.name,
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
      prop: "dueAmount",
      label: "应结金额",
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
      prop: "paidAmount",
      label: "实收金额",
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
      prop: "settledAmount",
      label: "已结金额",
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
      prop: "unSettledAmount",
      label: "未结金额",
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
      prop: "urgentArrivalCount",
      label: "急件数",
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
      prop: "urgentArrivalAmount",
      label: "急件销售金额",
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
      prop: "stockoutQty",
      label: "已出库数",
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
      prop: "returnedQty",
      label: "已退货数量",
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
      prop: "returnedAmount",
      label: "已退货金额",
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
      prop: "returnedRatio",
      label: "退货率",
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
    }
  ]
};

//子列表维度字段
export const REPORT_SALES_LIST_CHILD = {
  name: "reportSalesListChild",
  columns: [
    {
      prop: "billCount",
      label: "单据数",
      width: CELL_WIDTH.no,
      type: "billCount",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "partCount",
      label: "配件种类数",
      width: CELL_WIDTH.no,
      type: "partCount",
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "saleQty",
      label: "销售数量",
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
      prop: "taxedPurchaseAmount",
      label: "成本额",
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
      prop: "untaxedPurchaseAmount",
      label: "未税成本额",
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
      prop: "taxedBillAmount",
      label: "开单金额",
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
      prop: "taxedSaleAmount",
      label: "销售额",
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
      prop: "taxedSaleRatio",
      label: "占销售比例",
      width: CELL_WIDTH.name,
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
      prop: "untaxedSaleAmount",
      label: "未税销售额",
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
      prop: "untaxedSaleRatio",
      label: "占未税销售额比例",
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
      prop: "taxAmount",
      label: "税额",
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
      prop: "taxedGrossProfitRatio",
      label: "占毛利比例",
      width: CELL_WIDTH.name,
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
    // {
    //   prop: "dueAmount",
    //   label: "应结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "benefitAmount",
    //   label: "优惠金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "paidAmount",
    //   label: "实收金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "settledAmount",
    //   label: "已结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    // {
    //   prop: "unSettledAmount",
    //   label: "未结金额",
    //   width: CELL_WIDTH.money,
    //   attrs: {
    //     sortable: "custom"
    //   },
    //   type: "number",
    //   formatter: (value: number) => {
    //     return value || value === 0 ? Number(value).toFixed(2) : "--";
    //   }
    // },
    {
      prop: "urgentArrivalCount",
      label: "急件数",
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
      prop: "urgentArrivalAmount",
      label: "急件销售金额",
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
      prop: "stockoutQty",
      label: "已出库数",
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
      prop: "returnedQty",
      label: "已退货数",
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
      prop: "returnedAmount",
      label: "已退货金额",
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
      prop: "returnedRatio",
      label: "退货率",
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
    }
  ]
};
