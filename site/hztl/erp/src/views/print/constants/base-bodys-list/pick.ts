export const pick = [
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
    file: "code",
    formatter: (_: any, row: any) => {
      const { part } = row;
      return part.code;
    }
  },
  {
    name: "配件名称",
    file: "name",
    formatter: (_: any, row: any) => {
      const { part } = row;
      return part.name;
    }
  },
  {
    name: "品牌",
    file: "brand",
    formatter: (_: any, row: any) => {
      const { part } = row;
      return part.brand;
    }
  },
  {
    name: "产地",
    file: "productionPlace",
    formatter: (_: any, row: any) => {
      const { part } = row;
      return part.productionPlace;
    }
  },
  {
    name: "维修工",
    file: "technicianName"
  },
  {
    name: "数量",
    file: "qty"
  },
  {
    name: "领料价格",
    file: "price"
  },
  {
    name: "备注",
    file: "remark"
  }
];
