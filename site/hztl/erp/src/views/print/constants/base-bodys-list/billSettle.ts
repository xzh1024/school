import { FEE_PROPERTY } from "@/constants/repair/partColumns";

export const billSettle = [
  {
    tableName: "服务项目",
    soureFile: "item",
    content: [
      {
        name: "No.",
        sampleData: "序号",
        width: 38,
        textAlign: "center",
        type: "index",
        file: "_index"
      },
      {
        name: "项目编码",
        file: "itemCode"
      },
      {
        name: "项目名称",
        file: "itemName"
      },
      {
        name: "工时",
        file: "chargeManHour"
      },
      {
        name: "工时单价",
        file: "manHourPrice"
      },
      {
        name: "折扣",
        file: "discountRate",
        formatter: (value: any) => {
          return value ? (Number(value) * 10).toFixed(2) : "";
        }
      },
      {
        name: "工时金额",
        file: "dueAmount"
      },
      {
        name: "收费性质",
        file: "feeProperty",
        formatter: (value: string) => FEE_PROPERTY[value]
      },
      {
        name: "备注",
        file: "remark"
      }
    ]
  },
  {
    tableName: "配件材料",
    soureFile: "part",
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
        name: "配件编码",
        file: "partCode"
      },
      {
        name: "配件名称",
        file: "partName"
      },
      {
        name: "已领数量",
        file: "dueQty"
      },
      {
        name: "单价",
        file: "price"
      },
      {
        name: "折扣",
        file: "discountRate",
        formatter: (value: any) => {
          return value ? Number(value) * 10 : 10;
        }
      },
      {
        name: "配件金额",
        file: "dueAmount"
      },
      {
        name: "收费性质",
        file: "feeProperty",
        formatter: (value: string) => FEE_PROPERTY[value]
      },
      {
        name: "备注",
        file: "remark"
      }
    ]
  },
  {
    tableName: "其他费用",
    soureFile: "extraFee",
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
        name: "费用名称",
        file: "name"
      },
      {
        name: "数量",
        file: "qty"
      },
      {
        name: "单价",
        file: "price"
      },
      {
        name: "金额",
        file: "dueAmount"
      },
      {
        name: "备注",
        file: "remark"
      }
    ]
  }
];
