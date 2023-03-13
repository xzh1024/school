import numberDecimalFormat from "./numberDecimalFormat";
import store from "@/store/store";

const precisions = {
  ...store.state.admin.systemParams.precisions
};

function getPrecision(binding) {
  let decimalPosition = 0;
  if (typeof binding.value === "number") {
    decimalPosition = binding.value;
  } else if (typeof binding.value === "object") {
    switch (binding.value.type) {
      case "qty":
        decimalPosition = precisions.qtyPrecision;
        break;
      case "price":
        decimalPosition = precisions.pricePrecision;
        break;
      case "untaxedPrice":
        decimalPosition = precisions.untaxedPricePrecision;
        break;
      case "money":
        decimalPosition = precisions.moneyPrecision;
        break;
      default:
        break;
    }
  }
  return decimalPosition;
}

export default function(el, binding) {
  let targetInput;
  if (el.nodeName != "INPUT") {
    targetInput = el.querySelector("input");
  } else {
    targetInput = el;
  }
  if (!targetInput) {
    return false;
  }
  targetInput.addEventListener(
    "input",
    function() {
      this.value = numberDecimalFormat(this.value, getPrecision(binding));
    },
    false
  );
  targetInput.addEventListener(
    "keyup",
    function() {
      this.value = numberDecimalFormat(this.value, getPrecision(binding));
    },
    false
  );
  targetInput.addEventListener(
    "blur",
    function() {
      if (this.value) this.value = parseFloat(this.value);
    },
    false
  );
}
