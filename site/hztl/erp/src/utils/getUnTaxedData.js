import { add, subtract, multiply, divide } from "./numberAPI";
const getUnTaxedData = {
  untaxedPrice(taxedPrice, taxRate = 0) {
    const untaxedPrice = divide(
      Number(taxedPrice || 0),
      add(Number(taxRate || 0), 1)
    );
    return untaxedPrice;
  },
  untaxedAmount(untaxedPrice, qty) {
    const untaxedAmount = multiply(Number(untaxedPrice || 0), Number(qty || 0));
    return untaxedAmount;
  },
  taxAmount(taxedAmount, untaxedAmount) {
    const taxAmount = subtract(
      Number(taxedAmount || 0),
      Number(untaxedAmount || 0)
    );
    return taxAmount;
  },
  minTaxAmount(taxedAmount, untaxedAmount, taxAdjustRange) {
    const minTaxAmount = subtract(
      subtract(Number(taxedAmount || 0), Number(untaxedAmount || 0)),
      divide(Number(taxAdjustRange || 0), 100)
    );
    return minTaxAmount;
  },
  maxTaxAmount(taxedAmount, untaxedAmount, taxAdjustRange) {
    const maxTaxAmount = add(
      subtract(Number(taxedAmount || 0), Number(untaxedAmount || 0)),
      divide(Number(taxAdjustRange || 0), 100)
    );
    return maxTaxAmount;
  }
};

export default getUnTaxedData;
