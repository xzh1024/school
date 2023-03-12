export const PRICE_TYPES = {
  alliance: "平台价",
  retail: "零售价",
  p: "批发价",
  p1: "批发价一",
  p2: "批发价二",
  p3: "批发价三",
  p4: "批发价四"
}

export const PICKER_OPTIONS = {
  shortcuts: [
    {
      text: "今天",
      onClick(picker) {
        const start = new Date();
        const end = new Date();
        const end0 = new Date(end.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
        picker.$emit("pick", [start, end0]);
      }
    },
    {
      text: "明天",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() + 3600 * 1000 * 24);
        end.setTime(end.getTime() + 3600 * 1000 * 24);
        const start0 = new Date(start.setHours(0, 0, 0, 0));
        const end0 = new Date(end.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
        picker.$emit("pick", [start0, end0]);
      }
    },
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      }
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      }
    }
  ]
}

export const TABEL_LIST_COLUMNS = [
  {
    label: "操作",
    prop: "controls",
    width: "110"
  },
  {
    label: "是否可查件",
    prop: "canSearch",
    width: "100",
  },
  {
    label: "享受价格类型",
    prop: "priceType",
    width: "110"
  },
  {
    label: "享受折扣率",
    prop: "discount",
    width: "100"
  },
  {
    label: "限购信息",
    prop: "purchaseLimit",
    width: "500"
  },
  {
    label: "配件名称",
    prop: "swOeName",
    width: "200"
  },
  {
    label: "配件编码",
    prop: "swOeCode",
    width: "150"
  },
  {
    label: "配件分类",
    prop: "swCategory",
    width: "200"
  },
  {
    label: "汽车品牌",
    prop: "vehBrand",
    width: "100"
  },
  {
    label: "配件品牌",
    prop: "swBrand",
    width: "100"
  },
  {
    label: "车型",
    prop: "swVehModel",
    width: "100"
  },
  {
    label: "产地",
    prop: "swProductionPlace",
    width: "100"
  },
  {
    label: "配件性质",
    prop: "property",
    width: "100"
  },
  {
    label: "规格",
    prop: "swSpec",
    width: "150"
  },
  {
    label: "库存数量",
    prop: "qty",
    width: "100"
  },
  {
    label: "锁定数量",
    prop: "lockedQty",
    width: "100"
  },
  {
    label: "可订货数量",
    prop: "orderQty",
    width: "100"
  },
  {
    label: "平台价",
    prop: "priceAlliance",
    width: "100"
  },
  {
    label: "零售价",
    prop: "priceRetail",
    width: "100"
  },
  {
    label: "批发价",
    prop: "priceP",
    width: "100"
  },
  {
    label: "批发价一",
    prop: "priceP1",
    width: "100"
  },
  {
    label: "批发价二",
    prop: "priceP2",
    width: "100"
  },
  {
    label: "批发价三",
    prop: "priceP3",
    width: "100"
  },
  {
    label: "批发价四",
    prop: "priceP4",
    width: "100"
  }
]