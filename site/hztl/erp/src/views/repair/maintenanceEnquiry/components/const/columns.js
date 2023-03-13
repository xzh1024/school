import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";
import { ORDER_STATUS } from "../../../workOrder/const/columns";
import { dateFormatToSecond } from "@/utils/date";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const SETTLE_TYPES = {
  settled: "已结清",
  unsettle: "未结清"
};

// 维修业务
export const REPAIR_BUSINESS_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "billNo",
    label: "工单号",
    width: CELL_WIDTH.name
  },
  {
    prop: "receptionTime",
    label: "接待时间",
    width: CELL_WIDTH.name,
    render(value) {
      return dateFormatToSecond(value);
    },
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "工单状态",
    width: CELL_WIDTH.date,
    render(value) {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vin",
    label: "车架号",
    width: CELL_WIDTH.date
  },
  {
    prop: "engineNo",
    label: "发动机号",
    width: CELL_WIDTH.date
  },
  {
    prop: "facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date
  },
  {
    prop: "sourceBillNo",
    label: "预约单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorNumber",
    label: "客户编号",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorContactsPhone",
    label: "联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "送修人",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsPhone",
    label: "送修人电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "mileage",
    label: "进场里程",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      if (!row) return "";
      return row.mileage ? row.mileage + "km" : "";
    }
  },
  {
    prop: "oilDegree",
    label: "存油量",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionManName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "inspectBusinessName",
    label: "完检人",
    width: CELL_WIDTH.date
  },
  {
    prop: "inspectTime",
    label: "完检时间",
    width: CELL_WIDTH.name,
    render(value) {
      return dateFormatToSecond(value);
    }
  },
  {
    prop: "settleBusinessName",
    label: "收款人",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleConfirmBusinessName",
    label: "财务确认人",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleTime",
    label: "结算时间",
    width: CELL_WIDTH.name,
    render(value) {
      return dateFormatToSecond(value);
    }
  },
  {
    prop: "taxAmount",
    label: "税额",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalAmount",
    label: "合计报价金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "discountAmount",
    label: "整单优惠金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "eraseAmount",
    label: "抹零",
    width: CELL_WIDTH.date
  },
  {
    prop: "dueAmount",
    label: "应结金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "feePropertyGuaranteeAmount",
    label: "保修金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "feePropertyInsuranceAmount",
    label: "保险金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "feePropertyReworkAmount",
    label: "返修金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "feePropertyFreeAmount",
    label: "免费金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemTaxedCostAmount",
    label: "工费成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "partTaxedCostAmount",
    label: "材料成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfit",
    label: "含税毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "untaxedGrossProfit",
    label: "未税毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfitRate",
    label: "毛利率",
    width: CELL_WIDTH.date,
    render(value) {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "paymentTypes",
    label: "支付方式",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      if (!row) return "";
      return (
        row.settlementType +
        `${row.paymentTypes[0] ? "（" + row.paymentTypes[0] + "）" : ""}`
      );
    }
  },
  {
    prop: "invoiceType",
    label: "发票类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "invoiceNumber",
    label: "发票号",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionRemark",
    label: "接待备注",
    width: CELL_WIDTH.date
  },
  {
    prop: "inspectRemark",
    label: "完检备注",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleConfirmRemark",
    label: "结算备注",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleRemark",
    label: "收款备注",
    width: CELL_WIDTH.date
  },
  {
    prop: "flags.uploadedHealth",
    label: "健康档案上传状态",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      const { flags } = row;
      if (!flags) return "";
      return flags.uploadedHealth ? "已上传" : "未上传";
    }
  },
  {
    prop: "uploadHealthTime",
    label: "健康档案上传时间",
    width: CELL_WIDTH.name
  },
  {
    prop: "uploadHealthBusinessName",
    label: "健康档案上传人",
    width: CELL_WIDTH.name
  },
  {
    prop: "settleStatus",
    label: "结账状态",
    width: CELL_WIDTH.date,
    render(value) {
      return SETTLE_TYPES[value];
    }
  },
  {
    prop: "nextMaintenanceMileage",
    label: "下次保养里程",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      if (!row) return "";
      return row.nextMaintenanceMileage
        ? row.nextMaintenanceMileage + "km"
        : "";
    }
  },
  {
    prop: "nextMaintenanceDate",
    label: "下次保养日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "auditMonth",
    label: "年审月份",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceExpiry",
    label: "保险到期",
    width: CELL_WIDTH.date
  }
];

// 维修综合查询-保险业务
export const INSURANCE_BUSINESS_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "billNo",
    label: "申请单号",
    width: CELL_WIDTH.no,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "applicationTime",
    label: "申请日期",
    width: CELL_WIDTH.name,
    attrs: {
      sortable: "custom"
    }
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceNo",
    label: "保单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "reporter",
    label: "报案人",
    width: CELL_WIDTH.date
  },
  {
    prop: "reportNo",
    label: "报案号",
    width: CELL_WIDTH.date
  },
  {
    prop: "accidentTime",
    label: "出险时间",
    width: CELL_WIDTH.name
  },
  {
    prop: "accidentAddress",
    label: "出险地点",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "单据状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleName",
    label: "结算人",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleAt",
    label: "结算时间",
    width: CELL_WIDTH.date
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalManHour",
    label: "收费工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalChargeManHour",
    label: "工时费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "partsCount",
    label: "配件材料数",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalChargeParts",
    label: "配件材料费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "otherCharge",
    label: "其他费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "amount",
    label: "保险合计金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "sourceBillNo",
    label: "工单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vin",
    label: "车架号",
    width: CELL_WIDTH.date
  },
  {
    prop: "engineNo",
    label: "发动机号",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "送修人",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerNumber",
    label: "客户编号",
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
    prop: "facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date
  },
  {
    prop: "year",
    label: "年款",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalCostChargeManHour",
    label: "工费成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalCostChargeParts",
    label: "含税料费成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "untaxedTotalCostChargeParts",
    label: "未税料费成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfit",
    label: "含税毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "untaxedGrossProfit",
    label: "未税毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfitRate",
    label: "毛利率",
    width: CELL_WIDTH.date,
    render(value) {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "billReceptionManName",
    label: "维修接待人",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionTime",
    label: "维修接待时间",
    width: CELL_WIDTH.name
  },
  {
    prop: "settleBusinessName",
    label: "维修结算人",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { billInfo } = row;
      if (!billInfo) return "";
      return billInfo.settleBusinessName;
    }
  },
  {
    prop: "settleTime",
    label: "维修收款交车时间",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      const { billInfo } = row;
      if (!billInfo) return "";
      return dateFormatToSecond(billInfo.settleTime);
    }
  },
  {
    prop: "settleConfirmBusinessName",
    label: "维修财务确认人",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      const { billInfo } = row;
      if (!billInfo) return "";
      return billInfo.settleConfirmBusinessName;
    }
  },
  {
    prop: "settleConfirmTime",
    label: "维修结算确认时间",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      const { billInfo } = row;
      if (!billInfo) return "";
      return dateFormatToSecond(billInfo.settleConfirmTime);
    }
  },
  {
    prop: "inspectTime",
    label: "维修完检日期",
    width: CELL_WIDTH.name,
    formatter: (_, row) => {
      const { billInfo } = row;
      if (!billInfo) return "";
      return dateFormatToSecond(billInfo.inspectTime);
    }
  },
  {
    prop: "invoiceType",
    label: "保险单发票类型",
    width: CELL_WIDTH.name
  }
];

//  车辆检测
export const VEHICLE_REPORT_COLUMNS = [
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
    label: "报告单号",
    width: CELL_WIDTH.name
  },
  {
    prop: "checkTime",
    label: "检测日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vin",
    label: "车架号",
    width: CELL_WIDTH.name
  },
  {
    prop: "snNumber",
    label: "诊断设备编码/SN",
    width: CELL_WIDTH.name
  },
  {
    prop: "deviceBinder",
    label: "设备绑定人",
    width: CELL_WIDTH.date
  }
];
