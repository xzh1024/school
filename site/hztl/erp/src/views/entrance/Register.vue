<template>
  <div class="main-contaner">
    <h1 class="h-title-text">
      账号注册
    </h1>
    <el-form
      v-switch-focus="focusData"
      :model="ruleForm"
      :show-message="false"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item prop="name">
        <ht-input
          v-model="ruleForm.name"
          class="switch-focus focus-name"
          placeholder="请填写真实姓名"
          clearable
          maxlength="10"
          @keyup.enter.native="debouncedHandleInputEnter(ruleForm.name)"
        >
          <i slot="prefix" class="icon-img-prefix-s icon-img-name" />
        </ht-input>
      </el-form-item>
      <div class="single-area-box">
        <el-form-item label-width="0" label="" prop="areaIds">
          <span class="area-icon">
            <i class="icon-img-prefix-s icon-img-address" />
          </span>
          <area-select
            v-model="ruleForm.areaIds"
            placeholder="请选择所在地区"
          />
        </el-form-item>
      </div>
      <el-form-item prop="phone">
        <ht-input
          v-model="ruleForm.phone"
          class="switch-focus focus-phone"
          placeholder="请输入手机号"
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
          :readonly="readonly"
          class="switch-focus focus-smsCaptcha"
          _type="register"
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
          @focus="readonly = false"
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
      注册并登录
    </el-button>
    <div class="isLogin-bottom">
      <span @click="goLogin">已有账号，去登录</span>
    </div>
  </div>
</template>

<script>
import CaptchasSmsCode from "@/components/CaptchasSmsCode";
import PassWords from "@/components/PassWords";
import { registerAccount } from "@/api/loginregister";
import AreaSelect from "@/components/select/AreaSelect";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { validatePassword } from "@/utils/validate";
import { mapState } from "vuex";

export default {
  name: "Register",
  components: {
    CaptchasSmsCode,
    PassWords,
    AreaSelect
  },
  data() {
    return {
      keyScope: Symbol("Register"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      readonly: true,
      isSuccess: false,
      ruleForm: {
        from: 4,
        areaIds: []
      },
      msgId: ""
    };
  },
  computed: {
    ...mapState("admin/user", ["deviceKey"])
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
        initial: "focus-name"
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
        this.ruleForm.name &&
        this.ruleForm.phone &&
        this.ruleForm.password &&
        this.ruleForm.smsCaptcha &&
        this.ruleForm.areaIds.length == 3
      ) {
        this.submitForm();
      } else if (value) {
        this.updateFocusData({ type: "down" });
      } else {
        if (!this.ruleForm.name) {
          this.$message.error({ message: "请填写真实姓名", showClose: true });
          return;
        }
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
      if (!this.ruleForm.name) {
        this.$message.error({ message: "请填写真实姓名", showClose: true });
        return;
      }
      if (!this.ruleForm.phone) {
        this.$message.error({ message: "请输入手机号", showClose: true });
        return;
      }
      if (!this.ruleForm.areaIds.length === 3) {
        this.$message.error({ message: "请选择所在区域", showClose: true });
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
      this.ruleForm.areaId = this.ruleForm.areaIds[2];
      registerAccount({
        ...this.ruleForm,
        device: this.deviceKey,
        type: 1,
        utmSource: this.$route.query.utmSource,
        msgId: this.msgId
      })
        .then(() => {
          this.isSuccess = false;
          localStorage.removeItem("openedTags");
          this.$router.push({ path: "/Selects" });
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
<style lang="scss" scoped>
.single-area-box {
  ::v-deep .el-cascader__label {
    line-height: 56px;
    padding: 0 25px 0 30px;
  }

  .area-icon {
    display: inline-block;
    position: absolute;
    z-index: 9;
    padding-left: 4px;
  }
}
</style>
