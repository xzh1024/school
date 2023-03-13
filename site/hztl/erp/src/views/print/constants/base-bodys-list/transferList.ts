import { BILL_TYPE } from "@/constants";

export const transferList = [
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
        formatter: (value: string) => BILL_TYPE[value]
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
        formatter: (value: string) => BILL_TYPE[value]
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
];
