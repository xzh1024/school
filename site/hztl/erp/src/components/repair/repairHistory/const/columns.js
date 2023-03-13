import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { FEE_PROPERTY } from "@/constants/repair/partColumns";
export const ORDER_STATUS = {
  recepting: "接待中",
  repairing: "施工中",
  toFinancialConfirm: "待结算确认",
  toFinancial: "待收款交车",
  completed: "已完成"
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
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "companyName",
    label: "分店名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "工单类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "工单状态",
    width: CELL_WIDTH.date,
    formatter: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "receptionManName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "mileage",
    label: "进场里程",
    width: CELL_WIDTH.date,
    formatter: value => {
      return value ? `${value}km` : "";
    }
  },
  {
    prop: "oilDegree",
    label: "存油量",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "送修人",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionRemark",
    label: "接待备注",
    width: CELL_WIDTH.date
  }
];
export const SERVICE_COLUMNS = [
  {
    prop: "itemCode",
    label: "项目编号",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemName",
    label: "项目名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "feeProperty",
    label: "费用性质",
    width: CELL_WIDTH.date,
    formatter: value => {
      return FEE_PROPERTY[value];
    }
  },
  {
    prop: "itemCategory",
    label: "维修类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "chargeManHour",
    label: "收费工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "manHourPrice",
    label: "工时单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "discountLabel",
    label: "折扣",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "工时费用",
    width: CELL_WIDTH.date
    // formatter: (_, row) => {
    //   const { chargeManHour, manHourPrice } = row;
    //   return Number(chargeManHour * manHourPrice).toFixed(2);
    // }
  },
  {
    prop: "dueAmount",
    label: "收费金额",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
export const PART_COLUMNS = [
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
    label: "规格",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.model;
    }
  },
  {
    prop: "feeProperty",
    label: "收费性质",
    width: CELL_WIDTH.date,
    formatter: value => {
      return FEE_PROPERTY[value];
    }
  },
  {
    prop: "price",
    label: "单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "pickedQty",
    label: "数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "discountLabel",
    label: "折扣",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "总计金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "dueAmount",
    label: "收费金额",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  }
];
export const ITEM_COLUMNS = [
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "itemCode",
    label: "项目编号",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemName",
    label: "项目名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "companyName",
    label: "分店名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "feeProperty",
    label: "费用性质",
    width: CELL_WIDTH.date,
    formatter: value => {
      return FEE_PROPERTY[value];
    }
  },
  {
    prop: "businessCategoryName",
    label: "工单类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "chargeManHour",
    label: "收费工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "manHourPrice",
    label: "工时单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "discountLabel",
    label: "折扣",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "工时费用",
    width: CELL_WIDTH.date
    // formatter: (_, row) => {
    //   const { chargeManHour, manHourPrice } = row;
    //   return Number(chargeManHour * manHourPrice).toFixed(2);
    // }
  },
  {
    prop: "dueAmount",
    label: "收费金额",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  },
  {
    prop: "technicianGroupName",
    label: "维修班组",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
export const PART_HISTORY_COLUMNS = [
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.date,
    type: "time"
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
    prop: "companyName",
    label: "分店名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "feeProperty",
    label: "费用性质",
    width: CELL_WIDTH.date,
    formatter: value => {
      return FEE_PROPERTY[value];
    }
  },
  {
    prop: "businessCategoryName",
    label: "工单类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "pickedQty",
    label: "使用数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "单价",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  },
  {
    prop: "discountLabel",
    label: "折扣",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "总价",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  },
  {
    prop: "dueAmount",
    label: "收费金额",
    width: CELL_WIDTH.date,
    formatter: value => {
      return Number(value).toFixed(2);
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
export const ADVISE_COLUMNS = [
  {
    prop: "createdAt",
    label: "建议时间",
    width: CELL_WIDTH.date,
    type: "time"
  },
  {
    prop: "companyName",
    label: "分店名称",
    width: CELL_WIDTH.date
  },
  {
    label: "项目/套餐编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { setId, setCode, itemCode } = row;
      return setId > 0 ? setCode : itemCode;
    }
  },
  {
    label: "项目/套餐名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { setId, setName, itemName } = row;
      return setId > 0 ? setName : itemName;
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
