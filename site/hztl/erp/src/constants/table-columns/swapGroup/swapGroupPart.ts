import { CELL_WIDTH } from "../cell-width";

export const SWAP_GROUP_PART_TABLE = {
  name: "swapGroupPart",
  columns: [
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    { prop: "groupName", label: "互换组", width: CELL_WIDTH.code },
    { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
    { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
    { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    }
  ]
};
