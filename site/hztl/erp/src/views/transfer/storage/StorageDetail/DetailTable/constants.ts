import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TableSettingConfig } from "@/constants/interface";
import {
  TransferBillPartItem,
  TransferEditBillHeader
} from "@/views/transfer/interface";
import { dateFormat } from "@/utils/date";

export type DetailFormData = Partial<
  Pick<
    TransferEditBillHeader,
    | "companyId"
    | "relatedCompanyId"
    | "paymentType"
    | "billDate"
    | "businessManId"
    | "remark"
    | "receiverName"
    | "receiverPhone"
    | "receiverAreaId"
    | "receiverAddress"
    | "pickMethod"
    | "transportMethod"
    | "packMethod"
    | "freightPayer"
    | "logisticsCompanyId"
  >
>;

export interface EditBillPart {
  partId?: number; // 配件ID
  property?: string; // 配件性质
  warehouseId?: number; // 仓库ID
  positionId?: number; // 货位ID
  ownerCompanyId?: number; // 货主ID
  stockId?: number; // 库存ID
  qty?: string; // 数量
  price?: string; // 调拨价
  saleVehModel?: [
    // 销售车型
    string
  ];
  remark?: string; // 备注
}
export const defaultFormData: DetailFormData = {
  relatedCompanyId: undefined,
  companyId: undefined,
  paymentType: "内部挂帐",
  businessManId: undefined,
  billDate: dateFormat(new Date()),
  remark: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaId: undefined,
  receiverAddress: "",
  pickMethod: "",
  packMethod: "",
  transportMethod: "",
  freightPayer: "",
  logisticsCompanyId: undefined
};

export const STORAGE_DETAL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "amount", type: "money" },
  { file: "untaxedAmount", type: "money" }
];

export const STORAGE_DETAL_TABLE: TableSettingConfig<TransferBillPartItem> = {
  name: "transferStorageDetail",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 110,
      cantExport: true
    },
    {
      prop: ["part", "code"],
      label: "配件编码",
      width: CELL_WIDTH.code,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "name"],
      label: "配件名称",
      width: CELL_WIDTH.name,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "brand"],
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "productionPlace"],
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: "property",
      label: "配件性质",
      width: CELL_WIDTH.property
    },
    {
      prop: ["part", "model"],
      label: "规格",
      width: CELL_WIDTH.model,
      isHide: true
    },
    {
      prop: "qty",
      label: "数量",
      width: CELL_WIDTH.qty
    },
    {
      prop: "price",
      label: "单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "amount",
      label: "金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "warehouseName",
      label: "仓库",
      width: CELL_WIDTH.warehouseName
    },
    {
      prop: "positionName",
      label: "货位",
      width: CELL_WIDTH.positionName
    },
    {
      prop: "remark",
      label: "备注",
      width: CELL_WIDTH.remark
    },
    {
      prop: "sourceBillNo",
      label: "调拨申请单号",
      width: CELL_WIDTH.no,
      type: "billNo",
      billTypeData: "QD",
      billIdField: "sourceBillId"
    },
    {
      prop: "sourceCreatedAt",
      label: "调拨申请时间",
      width: CELL_WIDTH.time,
      type: "time"
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no
    },
    {
      prop: "untaxedPrice",
      label: "未税单价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedAmount",
      label: "未税金额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    ...OTHER_PIRCE_LIST,
    {
      prop: "supplierName",
      label: "供应商",
      width: CELL_WIDTH.companyName
    },
    {
      prop: ["part", "vehModel"],
      label: "车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    },
    {
      prop: ["part", "avaVehModel"],
      label: "适用车型",
      width: CELL_WIDTH.vehModel,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};
