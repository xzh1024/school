import eventBus from "@/event";
import * as store from "@/utils/store";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderParams(key: string, row: any) {
  let jsx;
  switch (key) {
    case "noUpProperties":
      jsx = (
        <ht-select
          v-model={row.value}
          size="mini"
          options={store.propertyDictionary()}
          multiple
        />
      );
      break;
    case "noUpWarehouses":
      jsx = (
        <ht-select
          v-model={row.value}
          size="mini"
          options={store.administerWareHouse()}
          multiple
        />
      );
      break;
    case "noUpPriceTypesOfZero":
      jsx = (
        <ht-select
          v-model={row.value}
          size="mini"
          options={store.priceTypeDictionary()}
          multiple
        />
      );
      break;
    case "notShowStockQty":
      jsx = (
        <el-radio-group v-model={row.value}>
          <el-radio label={false}>真实库存</el-radio>
          <el-radio label={true}>有货</el-radio>
        </el-radio-group>
      );
      break;
    case "customerDefaultPriceType":
      jsx = (
        <ht-select
          v-model={row.value}
          size="mini"
          options={store.priceTypeDictionary()}
        />
      );
      break;
    case "allocatingPriceRaiseRatio":
      jsx = <ht-percent-input size="mini" v-model={row.value} />;
      break;
    default:
      jsx = row.value;
  }
  return jsx;
}
