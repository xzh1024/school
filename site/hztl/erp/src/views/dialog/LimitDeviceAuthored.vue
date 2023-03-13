<template>
  <ht-dialog
    :before-close="handleClose"
    :close-on-click-modal="false"
    :title="title"
    v-bind="$attrs"
    destroy-on-close
    width="600px"
    v-on="$listeners"
  >
    <p>
      当前时间不在管理员设置的登录时间范围内（{{ startedAt }} 至
      {{ displayFinishedAt }}）{{
        isTimeOut
          ? "时间已到，将强制退出登录。"
          : "还有不到30分钟，请及时妥善处理未完成业务单据，届时将强制退出登录。"
      }}
      <br />如要继续使用，请向管理员发送验证码并索取后填写继续使用。
    </p>
    <el-row>
      <el-form
        ref="form"
        :rules="rules"
        :model="formData"
        size="mini"
        label-position="left"
        label-width="120px"
      >
        <el-col :span="24">
          <el-form-item label="申请时长：" prop="overtime">
            <div class="number-append">
              <el-input-number
                v-model="formData.overtime"
                :min="1"
                :disabled="hasSendCode"
                :controls="false"
                class="input"
                type="number"
                step-strictly
              />
              <span class="append">小时</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="短信验证码：" prop="captcha">
            <AuthCode
              ref="authCode"
              v-model="formData.captcha"
              style="width: 220px"
              @sendCode="sendCode"
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
        >
          提交
        </el-button>
      </el-col>
      <el-col>管理员电话：{{ detailInfo.phone }}</el-col>
    </el-row>
  </ht-dialog>
</template>

<script>
import { mapState } from "vuex";
import { applyDelayTime, getLoginLimitMsg, sendCode } from "@/api/loginLimit";
import AuthCode from "@/components/AuthCode";
import { dateFormat } from "@/utils/date";
// import { validateCode } from "@/utils/validate";

export default {
  name: "LimitDeviceAuthored",
  components: {
    AuthCode
  },
  props: {
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
      }
    };
  },
  computed: {
    ...mapState("admin/limitTime", [
      "startedAt",
      "applyFinishedAt",
      "isTimeOut"
    ]),
    title() {
      return this.isTimeOut
        ? "在线时间已超出设置时间范围"
        : "在线时间即将超出设置时间范围提醒";
    },
    displayFinishedAt() {
      let formatRule = "MM-DD HH:mm:ss";
      if (
        new Date().toDateString() ===
        new Date(this.applyFinishedAt).toDateString()
      ) {
        formatRule = " HH:mm:ss";
      }
      return dateFormat(this.applyFinishedAt, formatRule);
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      getLoginLimitMsg()
        .then(res => {
          this.detailInfo = res;
        })
        .catch(() => {});
    },
    sendCode() {
      sendCode({
        overtime: this.formData.overtime
      })
        .then(() => {
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
            overtime: this.formData.overtime
          }).then(() => {
            this.$emit("refreshLimiteData");
          });
        }
      });
    },
    handleClose() {
      this.$emit("refreshLimiteData", true);
    }
  }
};
</script>
<style lang="stylus" scoped>
.number-append {
    width: 220px;

    .input {
        width: 120px;
        border-radius: 4px 0 0 4px;
        border-right: 0;
    }

    .append {
        display: inline-block;
        width: 100px;
        text-align: center;
        border: 1px solid #DCDFE6;
        line-height: 30px;
        vertical-align: bottom;
    }
}
</style>
