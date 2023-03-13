// 整数验证
export function integerValidate(value, maxLen = 10) {
  value = String(value);
  value = value.replace(/[^\d]/g, "");
  value = value.replace(/^0{2,}/g, "0");
  if (value.length > maxLen) {
    value = value.substring(0, maxLen);
  }
  return String(value);
}
// 正整数验证
export function positiveIntegerValidate(value, maxLen = 10) {
  value = String(value);
  value = value.replace(/[^\d]/g, "");
  value = value.replace(/^0/g, "");
  if (value.length > maxLen) {
    value = value.substring(0, maxLen);
  }
  return String(value);
}

// 金额验证
export function floatNumberValidate(value) {
  value = String(value);
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, "");
  // 必须保证第一个为数字而不是.
  value = value.replace(/^\./g, "");
  // 当第一个是0时不能重复输入0
  value = value.replace(/^0{2,}/g, "0");
  // 保证.只出现一次，而不能出现两次以上
  value = value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  let index = -1;
  for (const i in value) {
    if (value[i] === ".") {
      index = i;
    }
    if (index !== -1) {
      if (i - index > 2) {
        value = value.substring(0, value.length - 1);
      }
    }
  }
  // 数字文本框，最多10位，最多两位小数
  if (Number(value) >= 10000000000) {
    value = "9999999999.99";
  }
  return value;
}
export function zeroValidate(value) {
  if(Number(value) > 0) {
    return value;
  } else {
    return "";
  }
}

// 折扣验证
export function discountValidate(value) {
  value = String(value);
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, "");
  // 必须保证第一个为数字而不是.
  value = value.replace(/^\./g, "");
  // value = value.replace(/^0/g, "");
  // 当第一个是0时不能重复输入0
  // value = value.replace(/^0{2,}/g, "0");
  value = value.replace(/^0+[^.]/g, "0");
  // 保证.只出现一次，而不能出现两次以上
  value = value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  let index = -1;
  for (const i in value) {
    if (value[i] === ".") {
      index = i;
    }
    if (index !== -1) {
      if (i - index > 1) {
        value = value.substring(0, value.length - 1);
      }
    }
  }
  // 数字文本框，最多10位，最多两位小数
  if (Number(value) >= 10) {
    value = "9.9";
  }
  return value;
}