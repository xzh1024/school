import {
  validateLetter,
  validateLetterTips,
  validateParseInt,
  validateParseNumLetter,
  validateParseNumLetterTips
} from "@/utils/validate";

export function stockLowerLimitMsg(value, part) {
  let msg = "";
  if (msg) {
    if (!/(^[1-9]+\d*$)|(^0$)/.test(value)) {
      msg = "只支持正数";
    } else if (part && Number(value) <= Number(part.stockTopLimit)) {
      msg = "不能超过配件上限";
    }
  }
  return msg;
}

export function codeValidator(rule, value, callback) {
  let msg;
  if (value) {
    if (!validateParseNumLetter(value)) {
      msg = new Error(validateParseNumLetterTips);
    }
  }
  msg ? callback(msg) : callback();
}

export function enNameValidator(rule, value, callback) {
  let msg;
  if (value) {
    if (!validateLetter(value)) {
      msg = new Error(validateLetterTips);
    }
  }
  msg ? callback(msg) : callback();
}

export function dosagePerCarValidator(rule, value, callback) {
  let msg;
  if (value) {
    if (!validateParseInt(value)) {
      msg = new Error(rule.message);
    }
  }
  msg ? callback(msg) : callback();
}
