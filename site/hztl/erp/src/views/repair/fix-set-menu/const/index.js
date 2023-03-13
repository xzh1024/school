import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
export const SERVICE_EDITOR_COLUMNS = [
  {
    prop: "code",
    label: "项目编码",
    width: CELL_WIDTH.index
  },
  {
    prop: "name",
    label: "项目名称",
    width: CELL_WIDTH.multiple
  },
  {
    prop: "categoryName",
    label: "项目类型",
    width: CELL_WIDTH.multiple
  },
  {
    label: "收费工时",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { chargeManHour } = prices[0];
      return <span>{chargeManHour}</span>;
    }
  },
  {
    label: "考核工时",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { checkManHour } = prices[0];
      return <span>{checkManHour}</span>;
    }
  },
  {
    label: "工时单价",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { manHourPrice } = prices[0];
      return <span>{manHourPrice}</span>;
    }
  },
  {
    label: "工时成本价",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { manHourCostPrice } = prices[0];
      return <span>{manHourCostPrice}</span>;
    }
  },
  {
    label: "收费金额",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { chargeManHour, manHourPrice } = prices[0];
      const price = chargeManHour * manHourPrice;
      return <span>{price}</span>;
    }
  },
  {
    label: "成本金额",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { prices } = row;
      if (!prices || !prices.length) return "";
      const { chargeManHour, manHourCostPrice } = prices[0];
      const price = chargeManHour * manHourCostPrice;
      return <span>{price}</span>;
    }
  },
  {
    label: "常用项目",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { flags } = row;
      const { commonUse } = flags;
      return <span>{commonUse ? "是" : "否"}</span>;
    }
  },
  {
    label: "允许打折",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { flags } = row;
      const { discount } = flags;
      return <span>{discount ? "是" : "否"}</span>;
    }
  },
  {
    label: "是否停用",
    width: CELL_WIDTH.multiple,
    render: (_, row) => {
      const { flags } = row;
      const { status } = flags;
      return <span>{status === "disable" ? "是" : "否"}</span>;
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.multiple
  }
];
