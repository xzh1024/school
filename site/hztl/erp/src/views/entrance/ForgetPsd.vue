<template>
  <div class="main-contaner">
    <h1 class="h-title-text">
      修改密码
    </h1>
    <el-form
      v-switch-focus="focusData"
      :model="ruleForm"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item prop="phone">
        <ht-input
          v-model="ruleForm.phone"
          class="switch-focus focus-phone"
          placeholder="请输入手机号"
          autofocus
          clearable
          maxlength="11"
          @keyup.enter.native="debouncedHandleInputEnter(ruleForm.phone)"
        >
          <i slot="prefix" class="icon-img-prefix-s icon-img-mobile" />
        </ht-input>
      </el-form-item>
      <el-form-item prop="smsCaptcha">
        <captchas-sms-code
          v-model="ruleForm.smsCaptcha"
          :phone="ruleForm.phone"
          class="switch-focus focus-smsCaptcha"
          _type="resetPassword"
          @setMsgId="setMsgId"
          @focus="readonly = false"
          @keyup.enter.native="debouncedHandleInputEnter(ruleForm.smsCaptcha)"
        />
      </el-form-item>
      <el-form-item prop="password">
        <pass-words
          v-model="ruleForm.password"
          :readonly="readonly"
          class="switch-focus focus-password"
          @keyup.enter.native="debouncedHandleInputEnter(ruleForm.password)"
        />
      </el-form-item>
    </el-form>
    <el-button
      :loading="isSuccess"
      type="primary"
      class="button-block"
      @click="submitForm"
    >
      确认并登录
    </el-button>
    <div class="isLogin-bottom">
      <span @click="goLogin">去登录</span>
    </div>
  </div>
</template>

<script>
import CaptchasSmsCode from "@/components/CaptchasSmsCode";
import PassWords from "@/components/PassWords";
import { checkPhone, resetPasswords } from "@/api/loginregister";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { validatePassword } from "@/utils/validate";

export default {
  name: "ForgetPsd",
  components: {
    CaptchasSmsCode,
    PassWords
  },
  data() {
    return {
      keyScope: Symbol("ForgetPsd"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      readonly: true,
      ruleForm: {},
      isSuccess: false,
      msgId: ""
    };
  },
  mounted() {
    hotkeys("up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          break;
        default:
      }
    });
    this.setKeyScope(this.keyScope);
    this.$nextTick(() => {
      this.updateFocusData({
        initial: "focus-phone"
      });
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    setMsgId(e) {
      this.msgId = e;
    },
    handleInputEnter(value) {
      if (
        this.ruleForm.phone &&
        this.ruleForm.password &&
        this.ruleForm.smsCaptcha
      ) {
        this.submitForm();
      } else if (value) {
        this.updateFocusData({ type: "down" });
      } else {
        if (!this.ruleForm.phone) {
          this.$message.error({ message: "请输入手机号", showClose: true });
          return;
        }
        if (!this.ruleForm.smsCaptcha) {
          this.$message.error({ message: "请输入短信验证码", showClose: true });
          return;
        }
        if (!this.ruleForm.password) {
          this.$message.error({ message: "请输入登录密码", showClose: true });
          return;
        }
        if (!validatePassword(this.ruleForm.password)) {
          this.$message.error({
            message: "登录密码格式不正确",
            showClose: true
          });
          return;
        }
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    submitForm() {
      if (!this.ruleForm.phone) {
        this.$message.error({ message: "请输入手机号", showClose: true });
        return;
      }
      if (!this.ruleForm.smsCaptcha) {
        this.$message.error({ message: "请输入短信验证码", showClose: true });
        return;
      }
      if (!this.ruleForm.password) {
        this.$message.error({ message: "请输入登录密码", showClose: true });
        return;
      }
      if (!validatePassword(this.ruleForm.password)) {
        this.$message.error({ message: "登录密码格式不正确", showClose: true });
        return;
      }
      this.isSuccess = true;
      checkPhone({
        ...this.ruleForm,
        msgId: this.msgId
      })
        .then(() => {
          resetPasswords({
            ...this.ruleForm,
            msgId: this.msgId
          })
            .then(() => {
              this.$confirm("重置密码成功，是否立即去登录?", "提示", {
                type: "info"
              })
                .then(() => {
                  this.$router.push({
                    path: "/Login"
                  });
                })
                .catch(() => {});
              this.isSuccess = false;
            })
            .catch(() => {
              this.isSuccess = false;
            });
        })
        .catch(() => {
          this.isSuccess = false;
        });
    },
    goLogin() {
      this.$router.push({ path: "/Login" });
    }
  }
};
</script>
