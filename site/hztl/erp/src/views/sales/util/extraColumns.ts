import { CELL_WIDTH } from "@/constants";
import { TableColumn } from "@/constants/interface";

export const getExtraColumns = (mode: number): TableColumn<any>[] => {
  switch (mode) {
    case 0:
      return [
        {
          label: "仓库",
          prop: "warehouseName",
          width: CELL_WIDTH.warehouseName
        },
        {
          label: "货位",
          prop: "positionName",
          width: CELL_WIDTH.positionName
        },
        {
          label: "批次号",
          prop: "batchNo",
          width: CELL_WIDTH.no
        },
        {
          label: "供应商",
          prop: "supplierName",
          width: CELL_WIDTH.companyName,
          isHide: true
        }
      ];
    case 1:
      return [
        {
          label: "仓库",
          prop: "warehouseName",
          width: CELL_WIDTH.warehouseName
        },
        {
          label: "货位",
          prop: "positionName",
          width: CELL_WIDTH.positionName
        }
      ];
    case 2:
      return [
        {
          label: "仓库",
          prop: "warehouseName",
          width: CELL_WIDTH.no
        }
      ];
    case 3:
    default:
      return [];
  }
};
