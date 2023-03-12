const BILL_TYPE = {
    LR: "手工账",
    XD: "销售订单",
    XS: "配件销售",
    XT: "销售退货",
    SR: "补充登记单",
    CD: "采购订单",
    CG: "配件采购",
    JJ: "急件采购",
    CT: "采购退货",
    DS: "代收对账",
    DZ: "应收付对账",
    SS: "发货运费自付",
    SA: "发货运费垫付",
    SO: "发货运费对付",
    RS: "收货运费自付",
    RA: "收货运费垫付",
    RO: "收货运费对付"
};

export const BASE_BODYS_LIST = {
    orderPlan: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "qty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "taxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "taxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "untaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "untaxedAmount"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    orderArrival: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "生产码",
            file: "productionCode"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "qty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "taxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "taxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "untaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "untaxedAmount"
        },
        {
            name: "到货仓库",
            file: "warehouseName"
        },
        {
            name: "货位",
            file: "positionName"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    orderReturn: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "生产码",
            file: "productionCode"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "qty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "taxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "taxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "untaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "untaxedAmount"
        },
        {
            name: "仓库",
            file: "warehouseName"
        },
        {
            name: "货位",
            file: "positionName"
        },
        {
            name: "退货原因",
            file: "reason"
        },
        {
            name: "源单号",
            file: "sourceBillNo"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    customerOrder: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "销售车型",
            file: "saleVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "bookQty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "preDiscountTaxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "preDiscountTaxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "preDiscountUntaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "preDiscountUntaxedAmount"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    saleOut: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "生产码",
            file: "productionCode"
        },
        {
            name: "仓库",
            file: "warehouseName"
        },
        {
            name: "货位",
            file: "positionName"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "销售车型",
            file: "saleVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "bookQty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "taxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "taxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "untaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "untaxedAmount"
        },
        {
            name: "开单价",
            textAlign: "right",
            file: "billPrice"
        },
        {
            name: "开单额",
            textAlign: "right",
            file: "billAmount"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    saleReturn: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "生产码",
            file: "productionCode"
        },
        {
            name: "仓库",
            file: "warehouseName"
        },
        {
            name: "货位",
            file: "positionName"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "车型",
            file: "vehModel"
        },
        {
            name: "适用车型",
            file: "avaVehModel"
        },
        {
            name: "销售车型",
            file: "saleVehModel"
        },
        {
            name: "发动机型号",
            file: "engineNo"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "bookQty"
        },
        {
            name: "单价",
            textAlign: "right",
            file: "taxedPrice"
        },
        {
            name: "金额",
            textAlign: "right",
            file: "taxedAmount"
        },
        {
            name: "未税单价",
            textAlign: "right",
            file: "untaxedPrice"
        },
        {
            name: "未税金额",
            textAlign: "right",
            file: "untaxedAmount"
        },
        {
            name: "开单价",
            textAlign: "right",
            file: "billPrice"
        },
        {
            name: "开单额",
            textAlign: "right",
            file: "billAmount"
        },
        {
            name: "退货原因",
            file: "reason"
        },
        {
            name: "源单号",
            file: "sourceBillNo"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    storeTake: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "账面数",
            textAlign: "right",
            file: "bookQty"
        },
        {
            name: "实存数",
            textAlign: "right",
            file: "realQty"
        },
        {
            name: "盈亏数",
            textAlign: "right",
            file: "profitLossQty"
        },
        {
            name: "盈亏额",
            textAlign: "right",
            file: "profitLossAmount"
        },
        {
            name: "仓库",
            file: "warehouseName"
        },
        {
            name: "货位",
            file: "positionName"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    storeMove: [
        {
            name: "No.",
            sampleData: "序号",
            width: 40,
            textAlign: "center",
            type: "index",
            file: "_index"
        },
        {
            name: "配件编码",
            file: "code"
        },
        {
            name: "配件名称",
            file: "name"
        },
        {
            name: "配件品牌",
            file: "brand"
        },
        {
            name: "产地",
            file: "productionPlace"
        },
        {
            name: "性质",
            file: "property"
        },
        {
            name: "单位",
            file: "unit"
        },
        {
            name: "数量",
            textAlign: "right",
            file: "qty"
        },
        {
            name: "源仓库",
            file: "warehouse_name"
        },
        {
            name: "源货位",
            file: "positionName"
        },
        {
            name: "目标仓库",
            file: "to_warehouse_name"
        },
        {
            name: "目标货位",
            file: "toPositionName"
        },
        {
            name: "批次",
            file: "batchNo"
        },
        {
            name: "备注",
            file: "remark"
        }
    ],
    stetementList: [
        {
            tableName: "应收",
            soureFile: "details_in",
            content: [
                {
                    name: "No.",
                    sampleData: "序号",
                    width: 40,
                    textAlign: "center",
                    type: "index",
                    file: "_index"
                },
                {
                    name: "应收金额",
                    file: "amount"
                },
                {
                    name: "业务类型",
                    file: "sourceBillType",
                    formatter: value => BILL_TYPE[value]
                },
                {
                    name: "业务单号",
                    file: "sourceBillNo"
                },
                {
                    name: "业务员",
                    file: "businessManName"
                },
                {
                    name: "业务日期",
                    file: "businessDate"
                }
            ]
        },
        {
            tableName: "应付",
            soureFile: "details_out",
            content: [
                {
                    name: "No.",
                    sampleData: "序号",
                    width: 40,
                    textAlign: "center",
                    type: "index",
                    file: "_index"
                },
                {
                    name: "应付金额",
                    file: "amount"
                },
                {
                    name: "业务类型",
                    file: "sourceBillType",
                    formatter: value => BILL_TYPE[value]
                },
                {
                    name: "业务单号",
                    file: "sourceBillNo"
                },
                {
                    name: "业务员",
                    file: "businessManName"
                },
                {
                    name: "业务日期",
                    file: "businessDate"
                }
            ]
        }
    ],
    collectionStetementList: [
        {
            tableName: "应收",
            soureFile: "details_in",
            content: [
                {
                    name: "No.",
                    sampleData: "序号",
                    width: 40,
                    textAlign: "center",
                    type: "index",
                    file: "_index"
                },
                {
                    name: "应收金额",
                    file: "amount"
                },
                {
                    name: "业务类型",
                    file: "sourceBillType"
                },
                {
                    name: "业务单号",
                    file: "sourceBillNo"
                },
                {
                    name: "业务员",
                    file: "businessManName"
                },
                {
                    name: "业务日期",
                    file: "businessDate"
                }
            ]
        },
        {
            tableName: "应付",
            soureFile: "details_out",
            content: [
                {
                    name: "No.",
                    sampleData: "序号",
                    width: 40,
                    textAlign: "center",
                    type: "index",
                    file: "_index"
                },
                {
                    name: "应付金额",
                    file: "amount"
                },
                {
                    name: "业务类型",
                    file: "sourceBillType"
                },
                {
                    name: "业务单号",
                    file: "sourceBillNo"
                },
                {
                    name: "业务员",
                    file: "businessManName"
                },
                {
                    name: "业务日期",
                    file: "businessDate"
                }
            ]
        }
    ]
};
