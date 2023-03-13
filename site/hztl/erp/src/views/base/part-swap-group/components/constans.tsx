import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";
import { SwapGroup } from "@/api/parts/swapGroup";
import { LocalPart, SwapGourpPart } from "@/api/parts/swapGroupParts";
import eventBus from "@/event";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

export const SWAP_GROUP_LIST: TableSettingConfig<SwapGroup> = {
  name: "SwapGroupList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      prop: "name",
      label: "互换组名",
      width: CELL_WIDTH.name
    },
    {
      prop: "partsCount",
      label: "配件数",
      width: CELL_WIDTH.number
    },
    {
      prop: "codeCount",
      label: "编码数",
      width: CELL_WIDTH.number
    }
  ]
};

export const SWAP_GROUP_PART_LIST: TableSettingConfig<SwapGourpPart> = {
  name: "SwapGroupPartList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name,
      render: (value, row) => (
        <div>
          {row.partInfo.map(item => (
            <div class="fake-table-cell">{item.name}</div>
          ))}
        </div>
      )
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand,
      render: (value, row) => (
        <div>
          {row.partInfo.map(item => (
            <div class="fake-table-cell">{item.brand}</div>
          ))}
        </div>
      )
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace,
      render: (value, row) => (
        <div>
          {row.partInfo.map(item => (
            <div class="fake-table-cell">{item.productionPlace}</div>
          ))}
        </div>
      )
    }
  ]
};

export const EDIT_SWAP_GROUP_PART_LIST: TableSettingConfig<SwapGourpPart> = {
  name: "EditSwapGroupPartList",
  columns: SWAP_GROUP_PART_LIST.columns.filter(item => item.type !== "multiple")
};

export const EDIT_LOCAL_PART_LIST: TableSettingConfig<LocalPart> = {
  name: "EditSwapGroupLocalParts",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "controls",
      label: "操作",
      type: "controls",
      width: 80,
      cantExport: true
    },
    {
      prop: "groupName",
      label: "互换组名",
      width: CELL_WIDTH.name
    },
    {
      prop: "code",
      label: "配件编码",
      width: CELL_WIDTH.code
    },
    {
      prop: "name",
      label: "配件名称",
      width: CELL_WIDTH.name
    },
    {
      prop: "brand",
      label: "配件品牌",
      width: CELL_WIDTH.brand
    },
    {
      prop: "productionPlace",
      label: "产地",
      width: CELL_WIDTH.productionPlace
    }
  ]
};
