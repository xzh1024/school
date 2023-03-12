import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ORDER_STATUS } from "../../../workOrder/const/columns"; // 工单状态
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// 提成基数
export const COMMISSION_MODE_TYPES = {
  settle: "结算金额",
  grossProfit: "毛利",
  settleManHour: "结算工时",
  checkManHour: "考核工时",
  rework: "返工责任费",
  none: "无提成"
};

export const COMMISSION_MODE_WAY = {
  settleManHour: "结算工时",
  checkManHour: "考核工时",
  rework: "返工责任费"
};

// 维修人员绩效统计-接待顾问-汇总统计
export const MAINTENANCE_SUMMARY_COLUMNS = [
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
    prop: "staffName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "settleAmount",
    label: "合计结算金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfit",
    label: "合计毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfitRate",
    label: "合计毛利率",
    width: CELL_WIDTH.date,
    render: value => {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "commissionAmount",
    label: "合计提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionTimes",
    label: "合计接待台次",
    width: CELL_WIDTH.date
  },
  {
    prop: "repairBill",
    label: "维修业务",
    align: "center",
    children: [
      {
        prop: ["repairBill", "receptionTimes"],
        label: "台次",
        width: 80
      },
      {
        prop: ["repairBill", "settleAmount"],
        label: "结算金额",
        width: 80
      },
      {
        prop: ["repairBill", "partTaxedCostAmount"],
        label: "材料成本",
        width: 80
      },
      {
        prop: ["repairBill", "itemTaxedCostAmount"],
        label: "项目成本",
        width: 80
      },
      {
        prop: ["repairBill", "taxedGrossProfit"],
        label: "毛利",
        width: 80
      },
      {
        prop: ["repairBill", "taxedGrossProfitRate"],
        label: "毛利率",
        width: 80,
        render: value => {
          return Number(value * 100).toFixed(2) + "%";
        }
      },
      {
        prop: ["repairBill", "commissionAmount"],
        label: "提成金额",
        width: 80
      }
    ]
  },
  {
    prop: "repairInsurance",
    label: "保险业务",
    align: "center",
    children: [
      {
        prop: ["repairInsurance", "receptionTimes"],
        label: "台次",
        width: 80
      },
      {
        prop: ["repairInsurance", "settleAmount"],
        label: "结算金额",
        width: 80
      },
      {
        prop: ["repairInsurance", "partTaxedCostAmount"],
        label: "材料成本",
        width: 80
      },
      {
        prop: ["repairInsurance", "itemTaxedCostAmount"],
        label: "项目成本",
        width: 80
      },
      {
        prop: ["repairInsurance", "taxedGrossProfit"],
        label: "毛利",
        width: 80
      },
      {
        prop: ["repairInsurance", "taxedGrossProfitRate"],
        label: "毛利率",
        width: 80,
        render: value => {
          return Number(value * 100).toFixed(2) + "%";
        }
      },
      {
        prop: ["repairInsurance", "commissionAmount"],
        label: "提成金额",
        width: 80
      }
    ]
  },
  {
    prop: "repairWashing",
    label: "洗车业务",
    align: "center",
    children: [
      {
        prop: ["repairWashing", "receptionTimes"],
        label: "台次",
        width: 80
      },
      {
        prop: ["repairWashing", "settleAmount"],
        label: "结算金额",
        width: 80
      },
      {
        prop: ["repairWashing", "commissionAmount"],
        label: "提成金额",
        width: 80
      }
    ]
  }
];

// 维修人员绩效统计-接待顾问-维修工单
export const MAINTENANCE_COLUMNS = [
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.property
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "vehicle.plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.plateNumber;
    }
  },
  {
    prop: "vehicle.facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.facBrand;
    }
  },
  {
    prop: "vehicle.vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.companySortName,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.vehicleGroup;
    }
  },
  {
    prop: "vehicle.cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.cooperatorName;
    }
  },
  {
    prop: "vehicle.cooperatorPhone",
    label: "联系电话",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.cooperatorPhone;
    }
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
    prop: "receptionManName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemTaxedAmount",
    label: "结算工费",
    width: CELL_WIDTH.date
  },
  {
    prop: "partTaxedAmount",
    label: "结算料费",
    width: CELL_WIDTH.date
  },
  {
    prop: "extraFeeTaxedAmount",
    label: "其他费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxAmount",
    label: "税金",
    width: CELL_WIDTH.date
  },
  {
    prop: "discountAmount",
    label: "优惠金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "eraseAmount",
    label: "抹零金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "dueAmount",
    label: "结算金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "partTaxedCostAmount",
    label: "材料成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemTaxedCostAmount",
    label: "项目成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfit",
    label: "毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfitRate",
    label: "毛利率",
    width: CELL_WIDTH.date,
    render: value => {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "commissionMode",
    label: "提成基数",
    width: CELL_WIDTH.date,
    render: value => {
      return COMMISSION_MODE_TYPES[value];
    }
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  }
];

// 维修人员绩效统计-接待顾问-保险申请单
export const INSURANCE_COLUMNS = [
  {
    prop: "createdAt",
    label: "申请时间",
    width: CELL_WIDTH.name
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "billStatus",
    label: "状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalChargeManHour",
    label: "结算工费",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalChargeParts",
    label: "结算料费",
    width: CELL_WIDTH.date
  },
  {
    prop: "otherCharge",
    label: "其他费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "billCalcAmount",
    label: "结算金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalCostChargeParts",
    label: "材料成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "totalCostChargeManHour",
    label: "项目成本",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfit",
    label: "毛利",
    width: CELL_WIDTH.date
  },
  {
    prop: "taxedGrossProfitRate",
    label: "毛利率",
    width: CELL_WIDTH.date,
    render: value => {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionModeName",
    label: "提成基数",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
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
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
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
    prop: "insuranceNo",
    label: "保单号",
    width: CELL_WIDTH.date
  },
  {
    prop: "staffName",
    label: "理赔人",
    width: CELL_WIDTH.date
  },
  {
    prop: "receptionManName",
    label: "原工单接待顾问",
    width: CELL_WIDTH.name
  }
];

// 维修人员绩效统计-接待顾问-洗车单
export const WASH_CAR_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "sourceBillNo",
    label: "洗车单号",
    width: CELL_WIDTH.name
  },
  {
    prop: "billStatus",
    label: "状态",
    width: CELL_WIDTH.date
  },
  {
    prop: "staffName",
    label: "接待顾问",
    width: CELL_WIDTH.date
  },
  {
    prop: "billCalcAmount",
    label: "金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
    label: "联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "送洗人",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsPhone",
    label: "送洗人电话",
    width: CELL_WIDTH.date
  }
];

// 维修人员绩效统计-维修技师-汇总统计
export const WORKING_HOURS_SUMMARY_COLUMNS = [
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
    prop: "staffName",
    label: "维修技师",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "合计提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "reworkCommissionAmount",
    label: "合计返工责任费用",
    width: CELL_WIDTH.name
  },
  {
    prop: "item",
    label: "项目业绩",
    align: "center",
    children: [
      {
        prop: ["item", "itemQty"],
        label: "项目数",
        width: 70
      },
      {
        prop: ["item", "itemChargeManHour"],
        label: "收费工时",
        width: 80
      },
      {
        prop: ["item", "itemCheckManHour"],
        label: "考核工时",
        width: 80
      },
      {
        prop: ["item", "itemChargeAmount"],
        label: "收费工时费用",
        width: 100
      },
      {
        prop: ["item", "itemCheckAmount"],
        label: "考核工时费用",
        width: 100
      },
      {
        prop: ["item", "reworkCommissionAmount"],
        label: "返工责任费用",
        width: 100
      },
      {
        prop: ["item", "commissionAmount"],
        label: "提成金额",
        width: 80
      }
    ]
  },
  {
    prop: "part",
    label: "配件业绩",
    align: "center",
    children: [
      {
        prop: ["part", "partQty"],
        label: "配件数量",
        width: 80
      },
      {
        prop: ["part", "partAmount"],
        label: "配件费用",
        width: 80
      },
      {
        prop: ["part", "reworkCommissionAmount"],
        label: "返工责任费用",
        width: 100
      },
      {
        prop: ["part", "commissionAmount"],
        label: "提成金额",
        width: 80
      }
    ]
  }
];

// 维修人员绩效统计-维修技师-工费明细
export const WORKING_HOURS_COLUMNS = [
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "staffName",
    label: "维修技师",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "vehicle.plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.plateNumber;
    }
  },
  {
    prop: "vehicle.facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.facBrand;
    }
  },
  {
    prop: "vehicle.vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.vehicleGroup;
    }
  },
  {
    prop: "chargeManHour",
    label: "收费工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "checkManHour",
    label: "考核工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "manHourPrice",
    label: "工时单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "chargeAmount",
    label: "收费工时费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "checkAmount",
    label: "考核工时费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "distributeRate",
    label: "分配比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date,
    render: value => {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "commissionMode",
    label: "绩效计算方式",
    width: CELL_WIDTH.date,
    render: value => {
      return COMMISSION_MODE_WAY[value];
    }
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
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
    prop: "itemCode",
    label: "项目编码",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemName",
    label: "项目名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "technicianGroupName",
    label: "维修班组",
    width: CELL_WIDTH.date
  },
  {
    prop: "majorTechnicianName",
    label: "主修人",
    width: CELL_WIDTH.date
  },
  {
    prop: "stationName",
    label: "工位",
    width: CELL_WIDTH.date
  }
];

// 维修人员绩效统计-维修技师-料费明细
export const MATERIAL_COLUMNS = [
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "staffName",
    label: "维修技师",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "vehicle.plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.plateNumber;
    }
  },
  {
    prop: "vehicle.facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.facBrand;
    }
  },
  {
    prop: "vehicle.vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.vehicleGroup;
    }
  },
  {
    prop: "part.code",
    label: "配件编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.code;
    }
  },
  {
    prop: "part.name",
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.name;
    }
  },
  {
    prop: "part.brand",
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.brand;
    }
  },
  {
    prop: "part.productionPlace",
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.productionPlace;
    }
  },
  {
    prop: "qty",
    label: "数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "partAmount",
    label: "配件费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date,
    render: value => {
      return Number(value * 100).toFixed(2) + "%";
    }
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
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
  }
];

// 维修人员绩效统计-维修技师-工费扣减明细
export const WORKING_HOURS_TWO_COLUMNS = [
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "staffName",
    label: "维修技师",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "vehicle.plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.plateNumber;
    }
  },
  {
    prop: "vehicle.facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.facBrand;
    }
  },
  {
    prop: "vehicle.vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.vehicleGroup;
    }
  },
  {
    prop: "chargeManHour",
    label: "收费工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "checkManHour",
    label: "考核工时",
    width: CELL_WIDTH.date
  },
  {
    prop: "manHourPrice",
    label: "工时单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "chargeAmount",
    label: "收费工时费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "checkAmount",
    label: "考核工时费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionMode",
    label: "绩效计算方式",
    width: CELL_WIDTH.date,
    render: value => {
      return COMMISSION_MODE_WAY[value];
    }
  },
  {
    prop: "commissionAmount",
    label: "返工责任费",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
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
    prop: "itemCode",
    label: "项目编码",
    width: CELL_WIDTH.date
  },
  {
    prop: "itemName",
    label: "项目名称",
    width: CELL_WIDTH.date
  },
  {
    prop: "technicianGroupName",
    label: "维修班组",
    width: CELL_WIDTH.date
  },
  {
    prop: "majorTechnicianName",
    label: "主修人",
    width: CELL_WIDTH.date
  },
  {
    prop: "stationName",
    label: "工位",
    width: CELL_WIDTH.date
  }
];

// 维修人员绩效统计-维修技师-料费扣减明细
export const MATERIAL_TWO_COLUMNS = [
  {
    prop: "companyName",
    label: "分公司名称",
    width: CELL_WIDTH.name
  },
  {
    prop: "staffName",
    label: "维修技师",
    width: CELL_WIDTH.date
  },
  {
    prop: "businessCategoryName",
    label: "业务类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "status",
    label: "状态",
    width: CELL_WIDTH.date,
    render: value => {
      return ORDER_STATUS[value];
    }
  },
  {
    prop: "vehicle.plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.plateNumber;
    }
  },
  {
    prop: "vehicle.facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.facBrand;
    }
  },
  {
    prop: "vehicle.vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { vehicle } = row;
      if (!vehicle) return "";
      return vehicle.vehicleGroup;
    }
  },
  {
    prop: "part.code",
    label: "配件编码",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.code;
    }
  },
  {
    prop: "part.name",
    label: "配件名称",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.name;
    }
  },
  {
    prop: "part.brand",
    label: "品牌",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.brand;
    }
  },
  {
    prop: "part.productionPlace",
    label: "产地",
    width: CELL_WIDTH.date,
    formatter: (_, row) => {
      const { part } = row;
      if (!part) return "";
      return part.productionPlace;
    }
  },
  {
    prop: "qty",
    label: "数量",
    width: CELL_WIDTH.date
  },
  {
    prop: "price",
    label: "单价",
    width: CELL_WIDTH.date
  },
  {
    prop: "partAmount",
    label: "配件费用",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "返工责任费",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorName",
    label: "客户",
    width: CELL_WIDTH.date
  },
  {
    prop: "cooperatorPhone",
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
  }
];

// 维修人员绩效统计-洗车人员-汇总统计
export const SUMMARY_COLUMNS = [
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
    prop: "staffName",
    label: "洗车人",
    width: CELL_WIDTH.no
  },
  {
    prop: "subCount",
    label: "台次",
    width: CELL_WIDTH.date
  },
  {
    prop: "subCommissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  }
];

// 维修人员绩效统计-洗车人员-洗车明细
export const WASH_CARS_COLUMNS = [
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
    prop: "staffName",
    label: "洗车人",
    width: CELL_WIDTH.no
  },
  {
    prop: "sourceBillNo",
    label: "洗车单号",
    width: CELL_WIDTH.name
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "送洗人",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsPhone",
    label: "送洗人电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "billCalcAmount",
    label: "结算金额",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionRate",
    label: "提成比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "distributeRate",
    label: "分配比例",
    width: CELL_WIDTH.date
  },
  {
    prop: "commissionAmount",
    label: "提成金额",
    width: CELL_WIDTH.date
  }
];
