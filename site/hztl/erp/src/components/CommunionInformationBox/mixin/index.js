// import { Message } from "hztl-ui";

// 公共字段验证-
import {
  validateEmail,
  validateMoney,
  validateParseInt,
  validatePhone,
  validateQq,
  validateURL
} from "@/utils/validate";

// function tips(value) {
//     Message({
//         message: value,
//         type: "warning"
//     });
// }

export const commonValidator = {
  data() {
    // rules 组件定义校验
    // var handleValidator = (rule, value, calllback) => {
    //     if (value) {
    //         calllback()
    //     } else {
    //         // 返回错误
    //         calllback(new Error(rule.message));
    //         // 弹框显示错误信息
    //         // Message({
    //         //     message: rule.message,
    //         //     type: 'warning'
    //         // });
    //     }
    // }
    // 自定义 - 校验-1-10000的数字
    const validatorFloat = (rule, value, callback) => {
      if (value) {
        if (parseFloat(value) >= -1 && parseFloat(value) <= 10000) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    const validatorFloat2 = (rule, value, callback) => {
      if (value) {
        if (
          parseFloat(value) >= -1 &&
          parseFloat(value) <= 10000 &&
          parseFloat(this.ruleForm.bargainLowerRate) <
            parseFloat(this.ruleForm.bargainUpperRate)
        ) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 自定义 - 校验0-28的整数
    const validatorIntZeroAndT = (rule, value, callback) => {
      if (value) {
        if (
          validateParseInt(value) &&
          Number(value) >= 0 &&
          Number(value) <= 28
        ) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 自定义 - 校验大于30的整数
    const validatorIntAndThirty = (rule, value, callback) => {
      if (value) {
        if (this.ruleForm.reconciliationDay) {
          if (
            validateParseInt(value) &&
            Number(value) >= 30 &&
            Number(value) <= 100000
          ) {
            callback();
          } else {
            callback(new Error("30-100000的整数"));
          }
        } else {
          if (validateParseInt(value) >= 0 && Number(value) <= 100000) {
            callback();
          } else {
            callback(new Error("0-100000的整数"));
          }
        }
      } else {
        callback();
      }
    };
    // 自定义 - 校验金额
    const validatorMoney = (rule, value, callback) => {
      if (value) {
        if (validateMoney(value)) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    const onlyTips = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
        // 弹框显示错误信息
        // tips(rule.message);
      }
    };
    // 校验Url地址
    const validatorWebsite = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 校验Email地址
    const validatorEmail = (rule, value, callback) => {
      if (value) {
        if (validateEmail(value)) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 校验固话和手机
    const validatorPhones = (rule, value, callback) => {
      if (validatePhone(value)) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
        // 弹框显示错误信息
        // tips(rule.message);
      }
    };
    // 校验Qq
    const validatorQqs = (rule, value, callback) => {
      if (value) {
        if (validateQq(value)) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 校验整数
    const validatorInt = (rule, value, callback) => {
      if (value) {
        if (validateParseInt(value)) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    // 检验大于0的整数
    const validatorIntZero = (rule, value, callback) => {
      if (value) {
        if (validateParseInt(value) && Number(value) >= 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          // 弹框显示错误信息
          // tips(rule.message);
        }
      } else {
        callback();
      }
    };
    return {
      rules: {
        // defaultInvoiceType: [
        //     { required: true, validator: onlyTips, trigger: "change", message: "请选择发票类型" }
        // ],
        // defaultSettlementType: [
        //     { required: true, validator: onlyTips, trigger: "change", message: "请选择结算方式" }
        // ],
        bargainLowerRate: [
          {
            validator: validatorFloat2,
            trigger: "blur",
            message: "-1-10000的数字且不能大于上限"
          }
        ],
        bargainUpperRate: [
          {
            validator: validatorFloat,
            trigger: "blur",
            message: "-1-10000的数字"
          }
        ],
        reconciliationDay: [
          {
            validator: validatorIntZeroAndT,
            trigger: "blur",
            message: "0-28的整数"
          }
        ],
        accountPeriod: [
          { validator: validatorIntAndThirty, trigger: "blur", message: "" }
        ],
        creditAmount: [
          {
            validator: validatorMoney,
            trigger: "blur",
            message: "金额类型的值"
          }
        ],

        "flags.isCompany": [
          {
            required: true,
            validator: onlyTips,
            trigger: "change",
            message: "请选择创建类型"
          }
        ],
        // number: [
        //     { required: true, validator: onlyTips, trigger: "blur", message: "请输入单位编码"}
        // ],
        name: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入单位名称"
          }
        ],
        // shortName: [
        //     { required: true, validator: onlyTips, trigger: "blur", message: "请输入单位简称"}
        // ],
        website: [
          {
            validator: validatorWebsite,
            trigger: "blur",
            message: "网址格式不正确"
          }
        ],
        email: [
          {
            validator: validatorEmail,
            trigger: "blur",
            message: "邮箱格式不正确"
          }
        ],
        // phone: [
        //     { validator: validatorPhones, trigger: "blur", message: "电话号格式不对"}
        // ],

        "main.name": [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入联系人姓名"
          }
        ],
        "main.phone": [
          {
            required: true,
            trigger: "blur",
            message: "请输入电话号码"
          },
          {
            validator: validatorPhones,
            trigger: "blur",
            message: "电话号码格式不正确"
          }
        ],
        "main.cert_number": [
          {
            validator: validatorInt,
            trigger: "blur",
            message: "证件号码格式不正确"
          }
        ],

        agencyReceiptReturnDays: [
          {
            validator: validatorIntZero,
            trigger: "blur",
            message: "大于0的整数"
          }
        ]
      },
      rules2: {
        qq: [
          {
            validator: validatorQqs,
            trigger: "blur",
            message: "QQ号码格式不正确"
          }
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入联系人姓名"
          }
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入电话号码"
          }
        ],
        email: [
          {
            validator: validatorEmail,
            trigger: "blur",
            message: "邮箱格式不正确"
          }
        ]
      }
    };
  }
};
