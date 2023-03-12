// import { Message } from "hztl-ui";

// 公共字段验证-
import {
  validateBusinessLicense,
  validateBusinessLicenseTips,
  validateCompanyName,
  validateCompanyNameTips,
  validateLetter,
  validateParseInt,
  validateParseIntTips,
  validatePhone,
  validatePhoneTips,
  validateURL,
  validateURLTips
} from "@/utils/validate";

// function tips(value) {
//     Message({
//         message: value,
//         type: "warning"
//     });
// }

export const commonValidator = {
  data() {
    // 只是提示操作-没有自定义校验
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
    // 自定义 - 校验公司名字
    // eslint-disable-next-line @typescript-eslint/camelcase
    const validator_CompanyName = (rule, value, callback) => {
      if (validateCompanyName(value)) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
        // 弹框显示错误信息
        // tips(rule.message);
      }
    };
    // 自定义 - 校验类型字母
    // eslint-disable-next-line @typescript-eslint/camelcase
    const validator_Letters = (rule, value, callback) => {
      if (validateLetter(value)) {
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
    // 自定义- 校验telphone(检验有值时)
    const validatorPhone = (rule, value, callback) => {
      if (value) {
        if (validatePhone(value)) {
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
    // 自定义- 校验telphone(必须)
    const validatorNeedPhone = (rule, value, callback) => {
      if (validatePhone(value)) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
        // 弹框显示错误信息
        // tips(rule.message);
      }
    };
    // 自定义- 校验社会统一信用代码
    const validatorBizLicenceCode = (rule, value, callback) => {
      if (validateBusinessLicense(value)) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
        // 弹框显示错误信息
        // tips(rule.message);
      }
    };
    // 自定义 - 校验正整数
    const validatorNumberParseInt = (rule, value, callback) => {
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
    const validateIdentTips = "公司标识只能是字母";
    return {
      rules: {
        name: [
          {
            required: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            validator: validator_CompanyName,
            trigger: "blur",
            message: validateCompanyNameTips
          }
        ],
        shortName: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入公司简称"
          }
        ],
        type: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请选择公司类型"
          }
        ],
        ident: [
          {
            required: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            validator: validator_Letters,
            trigger: "blur",
            message: validateIdentTips
          }
        ],
        "erp.ident": [
          {
            required: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            validator: validator_Letters,
            trigger: "blur",
            message: validateIdentTips
          }
        ],
        areaIds: [
          { required: true, trigger: "change", message: "请选择公司地址" }
        ],
        areaIdArr: [
          { required: true, trigger: "change", message: "请选择所属区域" }
        ],
        webside: [
          {
            validator: validatorWebsite,
            trigger: "blur",
            message: validateURLTips
          }
        ],
        contacts: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入联系人姓名"
          }
        ],
        phone: [
          {
            required: true,
            validator: validatorNeedPhone,
            trigger: "blur",
            message: validatePhoneTips
          }
        ],
        contacts1: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入联系人姓名"
          }
        ],
        phone1: [
          {
            required: true,
            validator: validatorNeedPhone,
            trigger: "blur",
            message: validatePhoneTips
          }
        ],
        phone2: [
          {
            validator: validatorPhone,
            trigger: "blur",
            message: validatePhoneTips
          }
        ],
        phone3: [
          {
            validator: validatorPhone,
            trigger: "blur",
            message: validatePhoneTips
          }
        ],
        invoiceTitle: [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入发票抬头"
          }
        ],
        bizLicenceCode: [
          {
            required: true,
            validator: validatorBizLicenceCode,
            trigger: "blur",
            message: validateBusinessLicenseTips
          }
        ],
        invoicePhone: [
          {
            validator: validatorPhone,
            trigger: "blur",
            message: validatePhoneTips
          }
        ],
        address: [
          { required: true, trigger: "blur", message: "请输入公司地址" }
        ]
      },
      // rules2: {
      //     phone: [
      //         { validator: validatorPhone, trigger: "blur", message: validatePhoneTips }
      //     ],
      //     invoicePhone: [
      //         { validator: validatorPhone, trigger: "blur", message: validatePhoneTips }
      //     ],
      //     invoiceTitle: [
      //         { required: true, validator: onlyTips, trigger: "blur", message: '请输入发票抬头' }
      //     ],
      //     bizLicenceCode: [
      //         { required: true, validator: validatorBizLicenceCode, trigger: "blur", message: validateBusinessLicenseTips }
      //     ]
      // },
      staffRules: {
        "staff.staffNumber": [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入员工编号"
          }
        ],
        "staff.staffName": [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入姓名"
          }
        ],
        "staff.realName": [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请输入真实姓名"
          }
        ],
        "accountSet.roles": [
          {
            required: true,
            validator: onlyTips,
            trigger: "blur",
            message: "请选择角色"
          }
        ],
        "staff.certNumber": [
          {
            validator: validatorNumberParseInt,
            trigger: "blur",
            message: validateParseIntTips
          }
        ]
      }
    };
  }
};
