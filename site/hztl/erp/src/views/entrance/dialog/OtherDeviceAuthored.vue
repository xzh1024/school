<template>
  <ht-dialog
    :close-on-click-modal="false"
    v-bind="$attrs"
    width="600px"
    title="其他设备登录验证"
    v-on="$listeners"
  >
    <p>
      您的账号已经登录了一个设备
      <br />可输入验证码进行强制登录
      <br />强制登录后，之前登录的设备将被取消登录
    </p>
    <el-row v-switch-focus="focusData">
      <el-col :span="16">
        <el-form
          ref="form"
          :rules="rules"
          :model="formData"
          size="mini"
          label-position="left"
        >
          <el-form-item label="短信验证码：" prop="authCode">
            <AuthCode
              ref="authCode"
              v-model="formData.authCode"
              class="switch-focus focus-authCode"
              style="width: 220px"
              @sendCode="sendCode"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-button
          type="primary"
          size="mini"
          style="width:100px"
          @click="deviceAuth"
        >
          登录
        </el-button>
      </el-col>
    </el-row>
  </ht-dialog>
</template>

<script>
import { deviceAuth, deviceAuthSms } from "@/api/loginregister";
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
  name: "OtherDeviceAuthored",
  components: {
    AuthCode
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    deviceKey: {
      type: String,
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
      keyScope: Symbol("OtherDeviceAuthored"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        ...defaultFocusData
      },
      rules: {
        authCode: [{ required: true, validator: checkCode, trigger: "change" }]
      },
      formData: {
        authCode: ""
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
              initial: "focus-authCode"
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
    hotkeys("", { scope: this.keyScope }, () => {});
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
    },
    sendCode() {
      deviceAuthSms({
        phone: this.info.phone,
        type: 1,
        device: this.deviceKey,
        otherDeviceOnline: this.info.otherDeviceOnline,
        erpType: "1"
      })
        .then(res => {
          this.msgId = res;
        })
        .catch(() => {
          this.$refs.authCode.clearCountdown();
        });
    },
    deviceAuth() {
      this.$refs.form.validate(valid => {
        if (valid) {
          deviceAuth({
            phone: this.info.phone,
            type: 1,
            device: this.deviceKey,
            authCode: this.formData.authCode,
            otherDeviceOnline: this.info.otherDeviceOnline,
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
