<template>
  <Fragment>
    <div class="main-contaner" v-switch-focus="focusData">
      <h1 class="h-title-text">欢迎登录</h1>
      <el-form :model="ruleForm" status-icon class="demo-ruleForm">
        <el-form-item>
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
        <el-form-item prop="password">
          <pass-words
            v-model="ruleForm.password"
            class="switch-focus focus-password"
            isLogin
            @keyup.enter.native="debouncedHandleInputEnter(ruleForm.password)"
          />
        </el-form-item>
        <el-button
          :loading="isLoading"
          class="button-block"
          type="primary"
          @click="submitForm"
          >登录
        </el-button>
        <el-row justify="space-between" class="isLogin-bottom">
          <el-col :span="16">
            <span @click="forgetPsd">忘记密码？</span>
            |
            <span @click="changeLogin">还没有账号，去注册</span>
          </el-col>
          <el-col :span="8" class="textRight">
            <app-qr>
              <a class="link" type="primary">{{
                uiConfig ? uiConfig.downloadText : "下载APP"
              }}</a>
            </app-qr>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <DeviceAuthored
      v-if="deviceAuthoredVisible"
      :info="loginInfo"
      :device-key="deviceKey"
      :before-close="beforeClose"
      :visible.sync="deviceAuthoredVisible"
      @loginNextStep="loginLimitValidation"
    />
    <OtherDeviceAuthored
      v-if="otherDeviceAuthoredVisible"
      :info="loginInfo"
      :device-key="deviceKey"
      :before-close="beforeClose"
      :visible.sync="otherDeviceAuthoredVisible"
      @loginNextStep="loginLimitValidation"
    />
    <LimitDeviceAuthored
      v-if="limitDeviceAuthoredVisible"
      :info="loginInfo"
      :before-close="beforeClose"
      :visible.sync="limitDeviceAuthoredVisible"
      @loginNextStep="login"
    />
  </Fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import AppQr from "@/components/app-qr";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";
import {
  checkToken,
  erpAccounts,
  loginByAccount,
  logoutByAccount
} from "@/api/loginregister";
import { getCurLoginLimit } from "@/api/loginLimit";
import { getLimtCurTime } from "@/utils/date";
import debounce from "throttle-debounce/debounce";
import {
  DeviceAuthored,
  LimitDeviceAuthored,
  OtherDeviceAuthored
} from "./dialog";
import PassWords from "@/components/PassWords";
import { uiConfig } from "envConfigPath";

export default {
  name: "Login",
  components: {
    Fragment,
    AppQr,
    PassWords,
    DeviceAuthored,
    OtherDeviceAuthored,
    LimitDeviceAuthored
  },
  data() {
    return {
      uiConfig,
      keyScope: Symbol("Login"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      loginInfo: {},
      deviceAuthoredVisible: false,
      otherDeviceAuthoredVisible: false,
      limitDeviceAuthoredVisible: false,
      isLoading: false,
      ruleForm: {
        from: 4
      },
      hasAccount: false
    };
  },
  computed: {
    ...mapState("admin/user", ["deviceKey"])
  },
  beforeCreate() {
    const token = this.$route.query.token;
    if (token) {
      /* 邦邦自动登录逻辑 */
      checkToken({ token }).then(() => {
        erpAccounts(false).then(() => {
          this.$router.push({
            path: "/"
          });
        });
      });
    } else {
      erpAccounts(true).then(() => {
        this.$router.push({
          path: "/"
        });
      });
    }
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
      const initial = this.ruleForm.phone ? "focus-password" : "focus-phone";
      this.updateFocusData({ initial });
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handleInputEnter(value) {
      if (this.ruleForm.phone && this.ruleForm.password) {
        this.submitForm();
      } else if (value) {
        this.updateFocusData({ type: "down" });
      } else {
        if (!this.ruleForm.phone) {
          this.$message.error({
            message: "请输入账号",
            showClose: true
          });
          return;
        }
        if (!this.ruleForm.password) {
          this.$message.error({
            message: "请输入密码",
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
    // 本地暂存(非永久存储)
    beforeClose() {
      this.deviceAuthoredVisible = false;
      this.otherDeviceAuthoredVisible = false;
      this.limitDeviceAuthoredVisible = false;
      logoutByAccount();
    },
    changeLogin() {
      // 去注册
      this.$router.push({ path: "/Register" });
    },
    forgetPsd() {
      // 忘记密码
      this.$router.push({ path: "/ForgetPsd" });
    },
    submitForm() {
      // 登录提交
      if (!this.ruleForm.phone) {
        this.$message.error({ message: "请输入登录账号", showClose: true });
        return;
      }
      if (!this.ruleForm.password) {
        this.$message.error({ message: "请输入登录密码", showClose: true });
        return;
      }
      this.isLoading = true;
      loginByAccount({
        ...this.ruleForm,
        device: this.deviceKey,
        type: 1,
        os: 2
      })
        .then(data => {
          this.loginInfo = data;
          if (!data.deviceAuthored) {
            // 进行设备认证
            this.isLoading = false;
            this.deviceAuthoredVisible = true;
          } else if (data.otherDeviceOnline) {
            // 多终端同时登录
            this.isLoading = false;
            this.otherDeviceAuthoredVisible = true;
          } else {
            this.loginLimitValidation();
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    loginLimitValidation() {
      this.deviceAuthoredVisible = false;
      this.otherDeviceAuthoredVisible = false;
      getCurLoginLimit()
        .then(res => {
          // 时间段外登录
          this.loginInfo = res;
          let limitDeviceAuthoredVisible = true;

          if (res.isWhitelist) {
            // 白名单
            limitDeviceAuthoredVisible = false;
          } else if (!res.startedAt || !res.finishedAt) {
            // 未设置时间
            limitDeviceAuthoredVisible = false;
          } else if (
            // 没有超出时间范围限制，以及申请延时
            (getLimtCurTime(res.startedAt) < 0 &&
              getLimtCurTime(res.finishedAt) > 0) ||
            getLimtCurTime(res.applyFinishedAt, "date") >= 0
          ) {
            limitDeviceAuthoredVisible = false;
          }

          if (limitDeviceAuthoredVisible) {
            this.limitDeviceAuthoredVisible = limitDeviceAuthoredVisible;
            this.isLoading = false;
          } else {
            this.login();
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    async login() {
      localStorage.removeItem("openedTags");
      this.isLoading = false;
      this.deviceAuthoredVisible = false;
      this.otherDeviceAuthoredVisible = false;
      this.limitDeviceAuthoredVisible = false;
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
