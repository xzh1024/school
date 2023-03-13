// 0:有货;1:充足;2:紧张;3:缺货;4:真实库存;5:设置展示上限
export const SKU_TYPES = [
  {
    id: 0,
    name: "有货"
  },
  {
    id: 1,
    name: "充足"
  },
  {
    id: 2,
    name: "紧张"
  },
  {
    id: 3,
    name: "缺货"
  },
  {
    id: 4,
    name: "真实库存"
  },
  {
    id: 5,
    name: "设置展示上限"
  }
];

// 价格展示类型,None:不展示价格,Alliance:平台价格,Allot:调货价格,Retail:零售价,P:批发价,P1:批发价1,P2:批发价2,P3:批发价3,P4:批发价4,P5:批发价5,P6:批发价6,P7:批发价7,P8:批发价8,P9:批发价9,P10:批发价10
export const PRICE_TYPES = [
  {
    id: "None",
    name: "不展示价格"
  },
  {
    id: "Alliance",
    name: "平台价格"
  },
  {
    id: "Allot",
    name: "调货价格"
  },
  {
    id: "Retail",
    name: "零售价"
  },
  {
    id: "P",
    name: "批发价"
  },
  {
    id: "P1",
    name: "批发价1"
  },
  {
    id: "P2",
    name: "批发价2"
  },
  {
    id: "P3",
    name: "批发价3"
  },
  {
    id: "P4",
    name: "批发价4"
  }
  // {
  //   id: "P5",
  //   name: "批发价5"
  // },
  // {
  //   id: "P6",
  //   name: "批发价6"
  // },
  // {
  //   id: "P7",
  //   name: "批发价7"
  // },
  // {
  //   id: "P8",
  //   name: "批发价8"
  // },
  // {
  //   id: "P9",
  //   name: "批发价9"
  // },
  // {
  //   id: "P10",
  //   name: "批发价10"
  // }
];

export const AUTH_PRICE_TYPES = [
  {
    id: "alliance",
    name: "平台价"
  },
  {
    id: "retail",
    name: "零售价"
  },
  {
    id: "p",
    name: "批发价"
  },
  {
    id: "p1",
    name: "批发价一"
  },
  {
    id: "p2",
    name: "批发价二"
  },
  {
    id: "p3",
    name: "批发价三"
  },
  {
    id: "p4",
    name: "批发价四"
  }
];
