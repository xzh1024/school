<template>
  <ht-dialog
    v-bind="$attrs"
    title="密码修改"
    width="350px"
    append-to-body
    v-on="$listeners"
    top="20vh"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="0"
      style="margin: 0 10px;"
    >
      <el-form-item prop="phone">
        <ht-input
          v-model="ruleForm.phone"
          placeholder="请输入手机号码"
          disabled
          maxlength="11"
        >
          <i slot="prefix" class="icon-img-prefix-s icon-img-mobile" />
        </ht-input>
      </el-form-item>
      <el-form-item prop="smsCaptcha">
        <captchas-sms-code
          v-model="ruleForm.smsCaptcha"
          :phone="ruleForm.phone"
          _type="resetPassword"
          class="captchas-sms-code"
          @setMsgId="setMsgId"
          @focus="readonly = false"
        />
      </el-form-item>
      <el-form-item prop="password">
        <pass-words
          v-model="ruleForm.password"
          :readonly="readonly"
          placeholder="请输入新的登录密码"
        />
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button
        v-loading="sureLoading"
        type="primary"
        size="mini"
        plain
        @click="sureHandle"
      >
        确 定
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取 消
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import CaptchasSmsCode from "@/components/CaptchasSmsCode";
import PassWords from "@/components/PassWords";
import { checkPhone, resetPasswords } from "@/api/loginregister";
import { validatePassword, validatePasswordTips } from "@/utils/validate";

const defaultRuleForm = {
  phone: "",
  smsCaptcha: "",
  password: ""
};
const validateNewPassword = (rule, value, callback) => {
  if (value) {
    if (validatePassword(value)) {
      callback();
    } else {
      callback(new Error(rule.message));
    }
  } else {
    callback();
  }
};

export default {
  name: "PasswordEditDialog",
  components: {
    CaptchasSmsCode,
    PassWords
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    const rules = {
      phone: [{ required: true, message: "请输入手机号码！" }],
      smsCaptcha: [{ required: true, message: "请输入验证码！" }],
      password: [
        { required: true, message: "请输入新的登录密码！" },
        { validator: validateNewPassword, message: validatePasswordTips }
      ]
    };

    return {
      sureLoading: false,
      ruleForm: { ...defaultRuleForm },
      readonly: true,
      rules: rules,
      phoneFocus: false,
      msgId: ""
    };
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.initData();
        setTimeout(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        }, 100);
      }
    }
  },
  methods: {
    setMsgId(e) {
      this.msgId = e;
    },
    initData() {
      this.ruleForm = { ...defaultRuleForm, ...this.userInfo };
    },
    sureHandle() {
      if (this.sureLoading) return;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.sureLoading = true;
          checkPhone({ ...this.ruleForm, msgId: this.msgId })
            .then(() => {
              resetPasswords({
                ...this.ruleForm,
                msgId: this.msgId
              })
                .then(() => {
                  this.$message.success({
                    message: "密码重置成功！",
                    showClose: true
                  });
                  this.sureLoading = false;
                })
                .catch(() => {
                  this.sureLoading = false;
                });
            })
            .catch(() => {
              this.sureLoading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss">
.sr-button-big {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
}
</style>
