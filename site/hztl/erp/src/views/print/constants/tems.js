import { PRINT_KEY_LIST } from "./base";
import { PRINT_TEMS_CONTENTS } from "./tems-contents";
import { BASE_HEADERS_LIST } from "./base-headers-list";
import { BASE_TAIL_LIST } from "./base-tail-list";
import { BASE_BODYS_LIST } from "./base-bodys-list";
import {
  BASE_GOODS_INTO_LIST,
  BASE_GOODS_OUT_LIST,
  BASE_GOODS_LIST
} from "./base-goods-list/shippingLabel";

export const DEFAULT_PRINT_TEMS = PRINT_KEY_LIST.map(key => {
  return {
    id: 0,
    type: key,
    name: "默认模版",
    isDefault: false,
    builtin: true,
    cantModify: true,
    content: PRINT_TEMS_CONTENTS[key],
    canOperation: true
  };
});
export const BASE_FILES_LIST = PRINT_KEY_LIST.map(key => ({
  baseDetalisFiles: BASE_HEADERS_LIST[key],
  baseTableFiles: BASE_BODYS_LIST[key],
  baseTailFiles: BASE_TAIL_LIST[key],
  baseGoodsFiles: BASE_GOODS_LIST[key],
  baseGoodsOutFiles: BASE_GOODS_OUT_LIST[key],
  baseGoodsIntoFiles: BASE_GOODS_INTO_LIST[key],
  type: key
}));
