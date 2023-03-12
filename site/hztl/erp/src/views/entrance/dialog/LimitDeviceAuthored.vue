<template>
  <ht-dialog
    :close-on-click-modal="false"
    v-bind="$attrs"
    title="限制时间范围外登录验证"
    width="550px"
    v-on="$listeners"
    class="dialog-container"
  >
    <div>
      当前时间不在管理员设置的登录时间范围内（{{ info.startedAt }} 至
      {{ info.finishedAt }}）。
    </div>
    <div style="margin: 10px 0 20px 0;">
      如要继续，请向管理员发送验证码并索取后填写登录。
    </div>
    <el-row v-switch-focus="focusData">
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        size="mini"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="申请时长：" prop="overtime">
          <div class="switch-focus focus-overtime number-append">
            <el-input-number
              v-model="formData.overtime"
              :min="1"
              :disabled="hasSendCode"
              :controls="false"
              class="input"
              type="number"
              step-strictly
              @intput-enter="debouncedHandleInputEnter"
            />
            <span class="append">小时</span>
          </div>
        </el-form-item>
        <el-col :span="16">
          <el-form-item label="短信验证码：" prop="captcha">
            <AuthCode
              ref="authCode"
              v-model="formData.captcha"
              class="switch-focus focus-captcha"
              style="width: 220px"
              @sendCode="sendCode"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="8">
        <el-button
          type="primary"
          size="mini"
          style="width:100px"
          @click="deviceAuth"
          >登录
        </el-button>
      </el-col>
      <el-col>管理员电话：{{ detailInfo.phone }}</el-col>
    </el-row>
  </ht-dialog>
</template>

<script>
import { applyDelayTime, getLoginLimitMsg, sendCode } from "@/api/loginLimit";
import AuthCode from "@/components/AuthCode";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
// import { validateCode } from "@/utils/validate";

let oldKeyScope;
const defaultFocusData = {
  updateIndex: null,
  initial: null,
  type: null
};
export default {
  name: "LimitDeviceAuthored",
  components: {
    AuthCode
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    dialogVisible: Boolean
  },
  data() {
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码！"));
      }
      return callback();
    };
    return {
      keyScope: Symbol("LimitDeviceAuthored"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        ...defaultFocusData
      },
      hasSendCode: false,
      detailInfo: {},
      rules: {
        captcha: [{ required: true, validator: checkCode, trigger: "change" }],
        overtime: [
          {
            required: true,
            message: "申请时长不能为空",
            trigger: "change"
          }
        ]
      },
      formData: {
        captcha: null,
        overtime: null
      },
      msgId: ""
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          this.$nextTick(() => {
            this.updateFocusData({
              initial: "focus-overtime"
            });
          });
        } else if (oldVale) {
          if (oldKeyScope) {
            hotkeys.setScope(oldKeyScope);
          }
        }
      },
      immediate: true
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
          return;
      }
    });
    this.loadData();
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleInputEnter() {
      this.deviceAuth();
      if (this.formData.overtime && this.formData.captcha) {
        return;
      } else if (this.formData.overtime) {
        this.updateFocusData({ initial: "focus-captcha" });
      } else if (this.formData.captcha) {
        this.updateFocusData({ initial: "focus-overtime" });
      } else {
        this.updateFocusData({ type: "down" });
      }
    },
    loadData() {
      getLoginLimitMsg().then(res => {
        this.detailInfo = res;
      });
    },
    sendCode() {
      sendCode({
        overtime: this.formData.overtime
      })
        .then(res => {
          this.msgId = res;
          this.hasSendCode = true;
        })
        .catch(() => {
          this.$refs.authCode.clearCountdown();
        });
    },
    deviceAuth() {
      this.$refs.form.validate(valid => {
        if (valid) {
          applyDelayTime({
            captcha: this.formData.captcha,
            overtime: this.formData.overtime,
            msgId: this.msgId
          }).then(() => {
            this.$emit("loginNextStep");
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.dialog-container {
  /deep/ .el-dialog__body {
    padding: 20px;
  }
}

.number-append {
  width: 220px;

  .input {
    width: 120px;
    border-radius: 4px 0 0 4px;
    border-right: 0;
  }

  .append {
    margin-left: 10px;
    display: inline-block;
    height: 28px;
    text-align: center;
    vertical-align: bottom;
  }
}
</style>
