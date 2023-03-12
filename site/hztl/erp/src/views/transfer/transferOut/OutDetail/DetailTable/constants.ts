import { CELL_WIDTH } from "@/constants";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { TableSettingConfig } from "@/constants/interface";
import { dateFormat } from "@/utils/date";
import {
  TransferBillPartItem,
  TransferEditBillHeader
} from "@/views/transfer/interface";

export type DetailFormData = Partial<
  Pick<
    TransferEditBillHeader,
    | "companyId"
    | "relatedCompanyId"
    | "relatedCompanyName"
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

export const defaultFormData: DetailFormData = {
  companyId: undefined,
  relatedCompanyId: undefined,
  relatedCompanyName: "",
  businessManId: undefined,
  billDate: dateFormat(new Date()),
  paymentType: "内部挂账",
  remark: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaId: undefined,
  receiverAddress: "",
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "",
  logisticsCompanyId: undefined
};

export interface ImportInfo
  extends Partial<
    Pick<DetailFormData, "relatedCompanyId" | "relatedCompanyName" | "billDate">
  > {
  options: any;
  hasSetting: boolean;
  offset: number;
  mode: number | null;
}

export interface EditBillPart {
  partId?: number; // 配件ID
  property?: string; // 配件性质
  warehouseId?: number; // 仓库ID
  positionId?: number; // 货位ID
  ownerCompanyId?: number; // 货主ID
  stockId?: number; // 库存ID
  qty?: string; // 数量
  price?: string; // 调拨价
  amount?: string; // 金额
  saleVehModel?: string[]; // 销售车型
  remark?: string; // 备注
}

export const OUT_DETAIL_TOTAL_FILES = [
  { file: "qty", type: "qty" },
  { file: "amount", type: "money" },
  { file: "costAmount", type: "money" },
  { file: "untaxedCostAmount", type: "money" }
];

export const OUT_DETAIL_TABLE: TableSettingConfig<TransferBillPartItem> = {
  name: "transferOutDetailTable",
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
      width: CELL_WIDTH.qty,
      type: "number"
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
      width: CELL_WIDTH.vehModel
    },
    {
      prop: "positionName",
      label: "货位",
      width: CELL_WIDTH.avaVehModels
    },
    {
      prop: "batchNo",
      label: "批次号",
      width: CELL_WIDTH.no
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
      prop: "costPrice",
      label: "进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "costAmount",
      label: "成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedCostPrice",
      label: "未税进价",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
    {
      prop: "untaxedCostAmount",
      label: "未税成本额",
      width: CELL_WIDTH.money,
      type: "number",
      formatter: value => getNoPricePermTips(value)
    },
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
      width: CELL_WIDTH.avaVehModels,
      attrs: {
        sortable: "custom"
      }
    }
  ]
};
