import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ORDER_STATUS } from "../../workOrder/const/columns";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
export const BILL_PICK_STATUS = {
  toConfirm: "待确认",
  completed: "已领料"
};
export const URGENT_CSTATUS = {
  toCommit: {
    label: "待提交",
    color: "#409EFF"
  },
  toConfirm: {
    label: "待外采确认",
    color: "#E6A23C"
  },
  rejected: {
    label: "外采驳回",
    color: "#F56C6C"
  },
  inProcess: {
    label: "处理中",
    color: "#E6A23C"
  },
  toPick: {
    label: "待领料",
    color: "#67C23A"
  },
  picked: {
    label: "已领料",
    color: "#67C23A"
  },
  returned: {
    label: "已退料",
    color: "#909399"
  }
};
const BILL_PICK_TYPES = {
  LL: "领料单",
  TL: "退料单"
};
export const ORDER_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionManName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "cooperatorName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
    label: "客户电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    formatter: value => {
      return ORDER_STATUS[value] || "";
    }
  }
];
export const WAIT_PICK_COLUMNS = [
  {
    prop: "partCode",
    label: "配件编码",
    width: CELL_WIDTH.date
  },
  {
    prop: "partName",
    label: "配件名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "qty",
    label: "需求数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "pickedQty",
    label: "领料数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "工单价格",
    width: CELL_WIDTH.date
  },
  {
    prop: "urgentQty",
    label: "转急采数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "6",
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.brand : "-";
    }
  },
  {
    prop: "7",
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.productionPlace : "-";
    }
  },
  {
    prop: "8",
    label: "单位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.unit : "-";
    }
  },
  {
    prop: "9",
    label: "零件类别",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.partType : "-";
    }
  },
  {
    prop: "10",
    label: "适用车型",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.avaVehModel : "-";
    }
  },
  {
    prop: "11",
    label: "规格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part ? part.model : "-";
    }
  }
];
export const DETAIL_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "warehouseName",
    label: "仓库",
    width: CELL_WIDTH.warehouseName,
    cantHide: true
  },
  {
    prop: "positionName",
    label: "货位",
    width: CELL_WIDTH.positionName,
    cantHide: true
  },
  {
    prop: "property",
    label: "性质",
    width: CELL_WIDTH.date
  },
  {
    prop: "qty",
    label: "实际数",
    width: CELL_WIDTH.qty,
    type: "number"
  },
  {
    prop: "dynaQty",
    label: "动态数",
    width: CELL_WIDTH.qty,
    type: "number"
  },
  {
    label: "零售价",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.retail : "";
    }
  },
  {
    label: "平台价",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.platform : "";
    }
  },
  {
    label: "调拨价",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.allot : "";
    }
  },
  {
    label: "批发价",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.wholesale : "";
    }
  },
  {
    label: "批发价一",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.wholesale1 : "";
    }
  },
  {
    label: "批发价二",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.wholesale2 : "";
    }
  },
  {
    label: "批发价三",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.wholesale3 : "";
    }
  },
  {
    label: "批发价四",
    width: CELL_WIDTH.date,
    formatter: (_, value) => {
      const { salePrices } = value;
      return salePrices ? salePrices.wholesale4 : "";
    }
  },
  {
    prop: "batchNo",
    label: "批次号",
    width: CELL_WIDTH.date
  },
  {
    prop: "supplierName",
    label: "供应商",
    width: CELL_WIDTH.date
  }
];
export const PART_COLUMNS = [
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
    label: "仓库",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      return stock.warehouseName;
    }
  },
  {
    label: "货位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      return stock.positionName;
    }
  },
  {
    label: "领料数量",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { qty } = row;
      return qty;
    }
  },
  {
    label: "工单价格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { billPart } = row;
      return billPart.price;
    }
  },
  {
    label: "领料价格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { price } = row;
      return price;
    }
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
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      return part.productionPlace;
    }
  },
  {
    label: "供应商",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      return stock.supplierName;
    }
  },
  {
    label: "批次号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      return stock.batchNo;
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
    label: "维修工",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { technicianName } = row;
      return technicianName;
    }
  }
];
export const PART_INFO_COLUMNS = [
  { prop: "qty", label: "领料数", width: "100" },
  { prop: "otherQty", label: "其他库存", width: "120" },
  { prop: "lackingQty", label: "缺货数量", width: "120" }
];
export const LOG_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "businessTime",
    label: "时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "billNo",
    label: "单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "billType",
    label: "类型",
    width: CELL_WIDTH.date,
    formatter: value => {
      return BILL_PICK_TYPES[value];
    }
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: (_, row) => {
      const { status, billType } = row;
      let str = "";
      if (status == "toConfirm") {
        str = "待确认";
      } else {
        if (billType == "LL") {
          str = "已领料";
        } else {
          str = "已退料";
        }
      }
      return <span>{str}</span>;
    }
  },
  {
    prop: "partQty",
    label: "配件数量",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { partQty, billType } = row;
      return billType == "LL" ? partQty : "-" + partQty;
    }
  },
  {
    prop: "businessManName",
    label: "领/退料人",
    width: CELL_WIDTH.date
  },
  {
    prop: "createdByName",
    label: "仓库人员",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
export const LOG_DETAIL_COLUMNS = [
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
      if (!part) return "";
      return part.code;
    }
  },
  {
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.name;
    }
  },
  {
    label: "仓库",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.warehouseName;
    }
  },
  {
    label: "货位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.positionName;
    }
  },
  {
    prop: "qty",
    label: "领料数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "领料金额",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { qty, price } = row;
      return Number(qty) * Number(price);
    }
  },
  {
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.brand;
    }
  },
  {
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.productionPlace;
    }
  },
  {
    label: "供应商",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.supplierName;
    }
  },
  {
    label: "批次号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.batchNo;
    }
  },
  {
    label: "单位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.unit;
    }
  },
  {
    label: "零件类别",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.partType;
    }
  },
  {
    label: "规格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.model;
    }
  }
];
export const LOG_DETAIL_LL_COLUMNS = [
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
      if (!part) return "";
      return part.code;
    }
  },
  {
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.name;
    }
  },
  {
    label: "仓库",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.warehouseName;
    }
  },
  {
    label: "货位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.positionName;
    }
  },
  {
    prop: "qty",
    label: "领料数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "returnedQty",
    label: "退料数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "领料金额",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { qty, price } = row;
      return Number(qty) * Number(price);
    }
  },
  {
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.brand;
    }
  },
  {
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.productionPlace;
    }
  },
  {
    label: "供应商",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.supplierName;
    }
  },
  {
    label: "批次号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { stock } = row;
      if (!stock) return "";
      return stock.batchNo;
    }
  },
  {
    label: "单位",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.unit;
    }
  },
  {
    label: "零件类别",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.partType;
    }
  },
  {
    label: "规格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.model;
    }
  }
];
