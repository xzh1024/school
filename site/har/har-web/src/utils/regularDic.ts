//小数和整数
export const regularDecimalAndInteger = /^(\d{0,9})(\.\d{0,2})?$/;
export const regularDecimalAndIntegerMessage = '仅支持9位以内的整数和2位小数';

//小数整数 保留4位小数
export const regularDecimalAndIntegerFour = /^(\d{0,9})(\.\d{0,4})?$/;
export const regularDecimalAndIntegerFourMessage = '仅支持9位以内的整数和4位小数';
//整数
export const regularInteger = /^[1-9]\d*$/;
//整数
export const regularIntegerZero = /^\d*$/;
