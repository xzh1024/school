/* eslint-disable @typescript-eslint/no-explicit-any */
import eventBus from "@/event";
import { CELL_WIDTH } from "@/constants";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

//维度字段列表
export const OVERSTOCK_REPORT_LIST_CHILDREN = {
  name: "overstockListChildren",
  columns: []
};

//父列表指标字段
export const OVERSTOCK_REPORT_LIST_SEARCH = {
  name: "overstockListSearch",
  columns: [
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "brand",
      label: "品牌",
      width: CELL_WIDTH.qty,
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
      prop: "categoryName",
      label: "配件分类",
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
      prop: "stockQty",
      label: "当前库存数",
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
      prop: "stockLowerLimit",
      label: "库存下限",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "stockTopLimit",
      label: "库存上限",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "overStockNumber",
      label: "超储数量",
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
      prop: "overStockAmount",
      label: "超储金额",
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
      prop: "purchasesOrderQty",
      label: "采购在订数",
      width: 140,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "purchasesOrderAmount",
      label: "采购在途数",
      width: 140,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "saleOrderQty",
      label: "销售在订数",
      width: 140,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    },
    {
      prop: "saleDeliverQty",
      label: "销售待交货数",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    }
  ]
};

//子列表维度字段
export const OVERSTOCK_REPORT_LIST_CHILD = {
  name: "overstockListChild",
  columns: [
    {
      prop: "warehouse",
      label: "仓库",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "owner",
      label: "货主",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "supplier",
      label: "供应商名称",
      width: CELL_WIDTH.qty,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "position",
      label: "货位",
      width: CELL_WIDTH.money,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "qty",
      label: "当前库存数量",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      },
      type: "number",
      formatter: (value: number) => {
        return value || value === 0 ? value : "--";
      }
    }
  ]
};
