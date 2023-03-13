export const insurance = [
  {
    tableName: "维修项目",
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
        name: "索赔工时",
        file: "chargeManHour"
      },
      {
        name: "工时单价",
        file: "manHourPrice"
      },
      {
        name: "索赔金额",
        file: "amount"
      },
      {
        name: "备注",
        file: "remark"
      }
    ]
  },
  {
    tableName: "维修配件材料",
    soureFile: "parts",
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
        file: "code"
      },
      {
        name: "配件名称",
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
        name: "索赔金额",
        file: "amount"
      },
      {
        name: "备注",
        file: "remark"
      }
    ]
  }
];
