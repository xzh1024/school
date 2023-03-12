export * from "./summary-table-setting";
export * from "./detail-table-setting";

export const SUMMARY_TYPE_EMUN = {
  flagProperty: "property",
  flagWarehouseId: "warehouseName",
  flagPositionId: "positionName",
  flagBatchNo: "batchNo",
  flagOwnerCompanyId: "ownerCompanyName",
  flagSupplierId: "supplierName",

  property: "flagProperty",
  warehouseName: "flagWarehouseId",
  positionName: "flagPositionId",
  batchNo: "flagBatchNo",
  ownerCompanyName: "flagOwnerCompanyId",
  supplierName: "flagSupplierId"
};
export const SUMMARY_TYPE_LIST = [
  {
    type: "flagProperty",
    value: "property"
  },
  {
    type: "flagWarehouseId",
    value: "warehouseName"
  },
  {
    type: "flagPositionId",
    value: "positionName"
  },
  {
    type: "flagBatchNo",
    value: "batchNo"
  },
  {
    type: "flagOwnerCompanyId",
    value: "ownerCompanyName"
  },
  {
    type: "flagSupplierId",
    value: "supplierName"
  }
];
