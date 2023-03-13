import { CELL_WIDTH } from "@/constants/table-columns/cell-width";

export const SERVICE_COLUMNS = [
  {
    prop: "billChargeManHour",
    label: "工单结算工时",
    width: CELL_WIDTH.date,
    formatter: value => {
      return value != 0 ? value : "-";
    }
  },
  {
    prop: "billDiscountRate",
    label: "工单折扣",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { billDiscountRate, billItemId } = row;
      return billItemId > 0 && billDiscountRate
        ? Number(billDiscountRate * 10)
        : "-";
    }
  },
  {
    prop: "billAmount",
    label: "工单结算金额",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { billAmount, billItemId } = row;
      return billItemId > 0 && billAmount ? billAmount : "-";
    }
  }
];
export const PART_COLUMNS = [
  {
    prop: "code",
    label: "配件编码",
    width: CELL_WIDTH.date
  },
  {
    prop: "name",
    label: "配件名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "brand",
    label: "品牌",
    width: CELL_WIDTH.date
  },
  {
    prop: "productionPlace",
    label: "产地",
    width: CELL_WIDTH.date
  },
  {
    prop: "avaVehModel",
    label: "适用车型",
    width: CELL_WIDTH.date
  }
];
export const INSURANCE_LIST_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "billNo",
    label: "申请单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "索赔金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerPhone",
    label: "客户电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionManName",
    label: "理赔人",
    width: CELL_WIDTH.date
  },
  {
    prop: "applicationTime",
    label: "申请时间",
    width: CELL_WIDTH.time,
    type: "time"
  },
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.time,
    type: "time"
  }
];
