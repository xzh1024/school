<template>
  <el-row :gutter="showIcon ? 10 : 0">
    <el-col :span="16">
      <ht-input
        :value="value"
        v-bind="$attrs"
        placeholder="请输入短信验证码"
        clearable
        maxlength="6"
        v-on="$listeners"
      >
        <i
          v-if="showIcon"
          slot="prefix"
          class="icon-img-prefix-s icon-img-codes"
        />
      </ht-input>
    </el-col>
    <el-col :span="8" class="text-right">
      <el-button
        :class="_flag ? 'sr-button-big' : ''"
        :loading="disabled"
        type="primary"
        size="mini"
        @click="getCode"
      >
        {{ disabled ? "倒计时" + nums + "s" : "获取验证码" }}
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
/* eslint-disable vue/prop-name-casing */
import { validatePhone } from "@/utils/validate";
import { checkIsExist, captchasSmes } from "@/api/loginregister";
export default {
  name: "CaptchasSmsCode",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    // eslint-disable-next-line vue/require-prop-types
    phone: {
      required: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    needCheck: {
      type: Boolean,
      default: false
    },
    _flag: {
      type: Boolean,
      default: true
    },
    _type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      disabled: false,
      nums: 120
    };
  },
  destroyed() {
    this.cluamNum(0);
    this.disabled = false;
  },
  methods: {
    getCode() {
      // 获取短信验证码
      if (validatePhone(this.phone)) {
        const params = {
          phone: this.phone,
          status: this._type
        };
        if (this.needCheck) {
          checkIsExist({ phone: this.phone }).then(() => {
            this.disabled = true;
            captchasSmes({ ...params, erpType: 1 })
              .then(res => {
                this.$emit("setMsgId", res);
                this.cluamNum(120);
              })
              .catch(() => {
                this.cluamNum(0);
                this.disabled = false;
              });
          });
        } else {
          this.disabled = true;
          captchasSmes({ ...params, erpType: 1 })
            .then(res => {
              this.$emit("setMsgId", res);
              this.cluamNum(120);
            })
            .catch(() => {
              this.cluamNum(0);
              this.disabled = false;
            });
        }
      } else {
        this.$message({
          message: "请输入手机号码",
          type: "warning"
        });
      }
    },
    // 重新获取验证码倒计时
    cluamNum(num) {
      let times = num;
      // eslint-disable-next-line prefer-const
      let timer;
      if (timer) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        if (times > 0) {
          times--;
          this.nums = times;
        } else {
          this.disabled = false;
          this.nums = "";
          clearInterval(timer);
        }
      }, 1000);
    }
  }
};
</script>
