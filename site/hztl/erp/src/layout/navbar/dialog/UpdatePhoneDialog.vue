<template>
  <ht-dialog
    v-bind="$attrs"
    title="更换手机号"
    width="450px"
    append-to-body
    v-on="$listeners"
    @close="handleClose"
  >
    <el-steps :active="step_active" align-center finish-status="success">
      <el-step title="账号验证" />
      <el-step title="新手机号验证" />
      <el-step title="变更成功" />
    </el-steps>
    <el-form
      v-if="step_active === 0"
      ref="oldRuleForm"
      :model="oldRuleForm"
      size="mini"
      label-width="80px"
      class="margin-middle captchas-sms"
      style="width: 86%;"
    >
      <el-form-item prop="phone">
        <ht-input v-model="oldRuleForm.phone" :maxlength="11" disabled>
          <i slot="prefix" class="icon-img-prefix-mini icon-img-mobile" />
        </ht-input>
      </el-form-item>
      <el-form-item prop="smsCaptcha">
        <msg-code
          ref="msgCode"
          v-model="oldRuleForm.smsCaptcha"
          @sendCode="sendCode"
        />
      </el-form-item>
      <el-form-item class="text-center">
        <el-button
          :disabled="isNext"
          type="primary"
          size="mini"
          @click="handleNext"
          >下 一 步
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      v-else-if="step_active === 1"
      ref="newRuleForm"
      :model="newRuleForm"
      size="mini"
      label-width="80px"
      class="margin-middle captchas-sms"
      style="width: 86%;"
    >
      <el-form-item prop="phone">
        <ht-input
          v-model="newRuleForm.phone"
          :maxlength="11"
          placeholder="请输入手机号"
        >
          <i slot="prefix" class="icon-img-prefix-mini icon-img-mobile" />
        </ht-input>
      </el-form-item>
      <el-form-item prop="smsCaptcha">
        <msg-code
          ref="msgCode"
          v-model="newRuleForm.smsCaptcha"
          @sendCode="sendCode"
        />
      </el-form-item>
      <el-form-item class="text-center">
        <el-button
          :disabled="isNext2"
          type="primary"
          size="mini"
          @click="handleNext2"
          >下 一 步
        </el-button>
      </el-form-item>
    </el-form>
    <div v-else-if="step_active === 2" class="register-success">
      <div class="register-status">
        <div class="img-container success-status-iocn" />
        <h3 class="h-title-text">手机号码变更成功</h3>
        <p class="register-tips">
          您的手机号码已经变更成功, 下次请用新手机号登陆。
        </p>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import { captchasSmes, changePhone, checkAccounts } from "@/api/loginregister";
import MsgCode from "../components/MsgCode";
import { validatePhone } from "@/utils/validate";

export default {
  name: "UpdatePhoneDialog",
  components: { MsgCode },
  props: {
    telPhone: {
      type: Object
    }
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      step_active: 0,
      oldRuleForm: {
        phone: ""
      },
      newRuleForm: {
        phone: "",
        smsCaptcha: ""
      },
      msgId: ""
    };
  },
  computed: {
    isNext() {
      return this.oldRuleForm.phone && this.oldRuleForm.smsCaptcha
        ? false
        : true;
    },
    isNext2() {
      return this.newRuleForm.phone && this.newRuleForm.smsCaptcha
        ? false
        : true;
    }
  },
  watch: {
    telPhone(val) {
      this.oldRuleForm = { ...val };
    }
  },
  methods: {
    handleNext() {
      checkAccounts({
        phone: this.oldRuleForm.phone,
        smsCaptcha: this.oldRuleForm.smsCaptcha,
        msgId: this.msgId
      }).then(() => {
        this.step_active++;
        this.newRuleForm.phone = "";
        this.newRuleForm.smsCaptcha = "";
        this.$refs.msgCode.clearCountdown();
      });
      // switch(this.step_active) {
      //     case 0:
      //         this.step_active++
      //         this.$refs.msgCode.clearCountdown()
      //         break;
      //     case 1:
      //         this.step_active++
      //         this.$refs.msgCode.clearCountdown()
      //         break;
      // }
    },
    handleNext2() {
      changePhone({
        phone: this.newRuleForm.phone,
        smsCaptcha: this.newRuleForm.smsCaptcha,
        msgId: this.msgId
      }).then(() => {
        this.step_active++;
        this.$emit("phone-change");
      });
      this.$refs.msgCode.clearCountdown();
    },
    handleClose() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.step_active = 0;
      // this.$refs.msgCode.clearCountdown()
    },
    sendCode() {
      if (!validatePhone(this.oldRuleForm.phone)) {
        this.$refs.msgCode.clearCountdown();
        this.$message.warning({ message: "请输入正确手机号码" });
        return;
      }
      let msgCodeStatus, phone;
      switch (this.step_active) {
        case 0:
          msgCodeStatus = "checkPhone";
          phone = this.oldRuleForm.phone;
          break;
        case 1:
          msgCodeStatus = "changePhone";
          phone = this.newRuleForm.phone;
          break;
      }
      if (this.step_active === 1 && !validatePhone(this.newRuleForm.phone)) {
        this.$message.warning({ message: "请输入正确手机号码" });
        this.$refs.msgCode.clearCountdown();
        return;
      }
      captchasSmes({ phone: phone, status: msgCodeStatus, erpType: 1 })
        .then(res => {
          this.msgId = res;
        })
        .catch(() => {
          this.$refs.msgCode.clearCountdown();
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.captchas-sms {
  /deep/ .icon-img-prefix {
    margin-top: 7px;
  }
}

.register-success {
  height: 100%;
  width: 100%;
  display: table;

  .register-status {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    .img-container {
      margin: 20px auto;
      width: 130px;
      height: 130px;
    }
  }

  .register-tips {
    font-size: 14px;
    color: #778087;
    margin-top: 10px;
  }
}

.icon-img-prefix-mini {
  display: inline-block;
  width: 12px;
  height: 14px;
  margin-top: 7px;
  margin-left: 5px;
  background-repeat: no-repeat;
}
</style>
