import { NO_PRICE_PERM_TIPS, NO_PRICE_PERM_VALUE } from "@/constants";

function getNoPricePermTips(value) {
  return value === NO_PRICE_PERM_VALUE ? NO_PRICE_PERM_TIPS : value;
}

export default getNoPricePermTips;
