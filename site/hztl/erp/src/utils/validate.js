import { Message } from "hztl-ui";
import { isString } from "lodash";
import { throttle } from "throttle-debounce";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/* 网址 */
export function validateURL(str) {
  const urlregex = /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(str);
}
export const validateURLTips = "网址格式不正确";

/* 邮箱 */
export function validateEmail(str) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
}
export const validateEmailTips = "邮箱格式不正确";

/* QQ号码 */
export function validateQq(str) {
  const re = /^[1-9]\d{4,10}$/;
  return re.test(str);
}
export const validateQqTips = "QQ号码格式不正确";

/* tel 固话和手机 */
export function validatePhone(str) {
  const re = /(^0[1-9]\d{1,2}-?\d{7,8}$)|(\d{7,8})|(^1[3-9]\d{9}$)/;
  return re.test(str);
}
export const validatePhoneTips = "电话号码格式不正确";

/* 手机 */
export function validateCellPhone(str) {
  const re = /^1[3-9]\d{9}$/;
  return re.test(str);
}
export const validateCellPhoneTips = "手机号格式不正确";

/* 注册密码 */
export function validatePassword(str) {
  const re = /^[\w[\]\\!@#$%&^*-_=+|;:/?.()<>{}]{8,16}$/;
  return re.test(str);
}
export const validatePasswordTips =
  "密码8~16个字符，包含数字、大小写字母和英文符号";

/* 身份证 */
export function validateIdcard(str) {
  const re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return re.test(str);
}
export const validateIdcardTips = "身份证号码格式不正确";

/* 工商营业执照 */
export function validateBusinessLicense(str) {
  const re = /^[0-9a-zA-Z]{18}$/;
  return re.test(str);
}
export const validateBusinessLicenseTips = "税号格式不正确";

/* 只允许是字母 */
export function validateLetter(str) {
  const re = /^[A-Za-z]+$/;
  return re.test(str);
}
export const validateLetterTips = "只能是字母";

/* 整数 */
export function validateParseInt(str) {
  const re = /^[0-9]*[1-9][0-9]*$/;
  return re.test(str);
}
export const validateParseIntTips = "只能是正整数";

/* 数字和字母 */
export function validateParseNumLetter(str) {
  const re = /^[0-9a-zA-Z]+$/;
  return re.test(str);
}
export const validateParseNumLetterTips = "只能是字母、数字";

/* 数字且只有2位小数 */
export function validateNumFloat(str) {
  const re = /^[0-9]+(.[0-9]{2})?$/;
  return re.test(str);
}
export const validateNumFloatTips = "只能是数字且最多两位小数";

/* 公司名称 */
export function validateCompanyName(str) {
  const re = /^[\u4e00-\u9fa5]+([(（][\u4e00-\u9fa5]+[)）])*[\u4e00-\u9fa5]*$/;
  return re.test(str);
}
export const validateCompanyNameTips = "企业名称格式不正确";

export function validateMoney(str) {
  const re = /^\d+\.?\d{0,2}$/;
  return re.test(str);
}

/* 不必须表单，单独的正则验证 */
export const validateObj = {
  checkParseInt: /^[0-9]*[1-9][0-9]*$/,
  checkParseIntTps: "只能输入整数",
  checkNumLeeter: /^[0-9a-zA-Z]*$/,
  checkNumLeeterTips: "只能输入数字、字母",
  checkNumFloat: /^[0-9]+(.[0-9]{2})?$/,
  checkNumFloatTips: "只能是数字且最多两位小数",
  checkTelPhone: /^1[3-9]\d{9}$/,
  checkQq: /^[1-9]\d{4,10}$/,
  checkHttp: /^((https?|ftp):\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
  checkEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

function showErrorMessage(error) {
  Message.warning(isString(error) ? error : error.message);
}

export const throttleShowErrorMessage = throttle(700, showErrorMessage);

export function formateRules(rules, cb) {
  const keys = Object.keys(rules);
  const showError = cb || throttleShowErrorMessage;
  const formated = {};
  keys.forEach(key => {
    formated[key] = rules[key].map(rule => {
      const { trigger, required, message, validator } = rule;
      let formateValidator = (_, __, callback) => callback();
      if (required) {
        formateValidator = (rule, value, callback) => {
          if (["", null, undefined].includes(value)) {
            showError(new Error(message));
            callback(new Error());
          } else {
            callback();
          }
        };
      } else if (validator) {
        formateValidator = (rule, value, callback) => {
          let error;
          const setError = res => {
            error = res;
          };
          validator(rule, value, setError);
          if (error) {
            showError(error);
            callback(new Error());
          } else {
            callback();
          }
        };
      }

      return {
        message: "  ",
        required,
        trigger,
        validator: formateValidator
      };
    });
  });

  return formated;
}

export const validPhone = (rule, value, callback) => {
  if (!validatePhone(value)) {
    callback(new Error(validatePhoneTips));
  } else {
    callback();
  }
};

export const validCellPhone = (rule, value, callback) => {
  if (!validateCellPhone(value)) {
    callback(new Error(validateCellPhoneTips));
  } else {
    callback();
  }
};

export const validQty = (rule, value, callback) => {
  if (Number(value) > 0) {
    callback();
  } else if (Number(value) <= 0) {
    callback(new Error("数量需大于0"));
  } else {
    callback(new Error(rule.message));
  }
};

export const validMoney = (rule, value, callback) => {
  if (Number(value) > 0 || [0, "0"].includes(value)) {
    callback();
  } else {
    callback(new Error(rule.message));
  }
};
