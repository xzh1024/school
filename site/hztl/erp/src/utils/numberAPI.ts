import { Decimal } from "decimal.js";
import { getNumberByAcc } from "@/utils/tool";

function execute(
  x: string | number,
  y: string | number,
  op: 0 | 1 | 2 | 3,
  acc?: number
): number {
  let result = new Decimal(0);
  switch (op) {
    case 0:
      result = Decimal.add(Number(x || 0), Number(y || 0));
      break;
    case 1:
      result = Decimal.sub(Number(x || 0), Number(y || 0));
      break;
    case 2:
      result = Decimal.mul(Number(x || 0), Number(y || 0));
      break;
    case 3:
      result = Decimal.div(Number(x || 0), Number(y || 0));
      break;
  }

  //小数位数处理
  if (acc) {
    return getNumberByAcc(result, acc);
  } else {
    return Number(result);
  }
}

//加法运算
export function add(
  x: string | number,
  y: string | number,
  acc?: number
): number {
  return execute(x, y, 0, acc);
}

//减法运算
export function subtract(
  x: string | number,
  y: string | number,
  acc?: number
): number {
  return execute(x, y, 1, acc);
}

//乘法运算
export function multiply(
  x: string | number,
  y: string | number,
  acc?: number
): number {
  return execute(x, y, 2, acc);
}

//除法运算
export function divide(
  x: string | number,
  y: string | number,
  acc?: number
): number {
  return execute(x, y, 3, acc);
}
