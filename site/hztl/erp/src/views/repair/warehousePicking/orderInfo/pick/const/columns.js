import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { URGENT_CSTATUS } from "../../../const/columns";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const WAIT_COLUMNS = [
  {
    prop: "multiple",
    label: "选择",
    type: "multiple",
    width: CELL_WIDTH.multiple,
    cantExport: true
  },
  {
    label: "配件编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.code;
    }
  },
  {
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.name;
    }
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      const statu = URGENT_CSTATUS[value];
      const color = statu.color;
      return <span style={color ? { color: color } : ""}>{statu.label}</span>;
    }
  },
  {
    prop: "qty",
    label: "急采数",
    width: CELL_WIDTH.date
  },
  {
    prop: "warehouseName",
    label: "到货仓库",
    width: CELL_WIDTH.date
  },
  {
    prop: "supplierName",
    label: "供应商",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedPurchasePrice",
    label: "进价",
    width: CELL_WIDTH.date
  }
];
export const PROCESS_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    label: "配件编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.code;
    }
  },
  {
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.name;
    }
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      const statu = URGENT_CSTATUS[value];
      const color = statu.color;
      return <span style={color ? { color: color } : ""}>{statu.label}</span>;
    }
  },
  {
    prop: "qty",
    label: "急采数",
    width: CELL_WIDTH.date
  },
  {
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.brand;
    }
  },
  {
    prop: "itemCode",
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.name;
    }
  },
  {
    label: "单位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.unit;
    }
  },
  {
    label: "零件类别",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.partType;
    }
  },
  {
    label: "规格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.model;
    }
  },
  {
    prop: "warehouseName",
    label: "到货仓库",
    width: CELL_WIDTH.date
  },
  {
    prop: "supplierName",
    label: "供应商",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedPurchasePrice",
    label: "进价",
    width: CELL_WIDTH.date
  }
];
export const OK_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "multiple",
    label: "选择",
    type: "multiple",
    width: CELL_WIDTH.multiple,
    cantExport: true
  },
  {
    label: "配件编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.code;
    }
  },
  {
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.name;
    }
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      const statu =
        value == "returned"
          ? {
              label: "已取消领料",
              color: "#909399"
            }
          : URGENT_CSTATUS[value];
      const color = statu.color;
      return <span style={color ? { color: color } : ""}>{statu.label}</span>;
    }
  },
  {
    prop: "qty",
    label: "急采数",
    width: CELL_WIDTH.date
  }
];
