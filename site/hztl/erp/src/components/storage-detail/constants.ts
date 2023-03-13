import { BILL_TYPE, CELL_WIDTH } from "@/constants";
import { TableSettingConfig } from "@/constants/interface";
import { StocksHistory, StocksLocked } from "./services";

export const STORAGE_STOCKS_HISTORY: TableSettingConfig<StocksHistory> = {
  name: "storageStocksHistory",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    // {
    //   prop: "controls",
    //   label: "操作",
    //   type: "controls",
    //   width: 110,
    //   cantExport: true
    // },
    {
      prop: "billDate",
      label: "单据日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType"
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.type,
      formatter: value => {
        const FULL_TYPE = {
          ...BILL_TYPE,
          LL: "维修领料单",
          TL: "维修退料单"
        };
        return FULL_TYPE[value];
      }
    },
    {
      key: "outQty",
      prop: "qty",
      label: "出库数量",
      width: CELL_WIDTH.number,
      type: "number",
      formatter: value => (Number(value) > 0 ? "-" : -Number(value))
    },
    {
      key: "inQty",
      prop: "qty",
      label: "入库数量",
      width: CELL_WIDTH.number,
      type: "number",
      formatter: value => (Number(value) > 0 ? value : "-")
    },
    {
      prop: "businessCompanyName",
      label: "业务公司",
      width: CELL_WIDTH.companyName
    }
  ]
};

export const STORAGE_STOCKS_LOCKED: TableSettingConfig<StocksLocked> = {
  name: "storageStocksLocked",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    // {
    //   prop: "controls",
    //   label: "操作",
    //   type: "controls",
    //   width: 110,
    //   cantExport: true
    // },
    {
      prop: "billDate",
      label: "单据日期",
      width: CELL_WIDTH.date,
      type: "date"
    },
    {
      prop: "billNo",
      label: "单据号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeField: "billType"
    },
    {
      prop: "billType",
      label: "单据类型",
      width: CELL_WIDTH.type,
      formatter: value => {
        const FULL_TYPE = {
          ...BILL_TYPE,
          LL: "维修领料单",
          TL: "维修退料单"
        };
        return FULL_TYPE[value];
      }
    },
    {
      prop: "qty",
      label: "锁定数量",
      width: CELL_WIDTH.number,
      type: "number"
    },
    {
      prop: "businessCompanyName",
      label: "业务公司",
      width: CELL_WIDTH.companyName
    },
    {
      label: "仓库",
      prop: "warehouseName",
      width: CELL_WIDTH.warehouseName,
      isHide: false
    },
    {
      label: "货位",
      prop: "positionName",
      width: CELL_WIDTH.positionName,
      isHide: false
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no,
      isHide: false
    },
    {
      prop: "createdByName",
      label: "制单人",
      width: CELL_WIDTH.personName
    }
  ]
};
