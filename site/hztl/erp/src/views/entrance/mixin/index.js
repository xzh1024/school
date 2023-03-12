import { Message } from "hztl-ui";

// 公共字段验证-
import {
  validatePassword,
  validatePasswordTips,
  validateCellPhone,
  validateCellPhoneTips
} from "@/utils/validate";

// function tips(value) {
//     Message({
//         message: value,
//         type: "warning"
//     });
// }

export const commonValidator = {
  data() {
    // 自定义 - telphone验证
    const validatorTelPhone = (rule, value, calllback) => {
      if (validateCellPhone(value)) {
        calllback();
      } else {
        // 返回错误
        calllback(new Error(rule.message));
        // 弹框显示错误信息
        Message({
          message: rule.message,
          type: "warning"
        });
      }
    };
    // 自定义 - 密码验证
    const validatorPassWord = (rule, value, calllback) => {
      if (validatePassword(value)) {
        calllback();
      } else {
        // 返回错误
        calllback(new Error(rule.message));
        // 弹框显示错误信息
        Message({
          message: rule.message,
          type: "warning"
        });
      }
    };
    // 自定义提示
    const onlyTips = (rule, value, calllback) => {
      if (value) {
        calllback();
      } else {
        // 返回错误
        calllback(new Error(rule.message));
        // 弹框显示错误信息
        Message({
          message: rule.message,
          type: "warning"
        });
      }
    };
    return {
      rules: {
        name: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "真实姓名不能为空"
          }
        ],
        phone: [
          {
            required: true,
            validator: validatorTelPhone,
            trigger: "blur",
            message: validateCellPhoneTips
          }
        ],
        password: [
          {
            required: true,
            validator: validatorPassWord,
            trigger: "blur",
            message: validatePasswordTips
          }
        ],
        areaIds: [
          { required: true, trigger: "blur", message: "所在地区不能为空" }
        ]
      }
    };
  }
};
