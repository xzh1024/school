<template>
  <ht-dialog
    v-bind="$attrs"
    title="账号设置"
    width="350px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="71px"
      label-position="right"
      size="mini"
      style="margin: 0 10px;"
    >
      <el-form-item prop="name" label="真实姓名">
        <ht-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item prop="phone" label="电话号码">
        <div class="phone-container text-container text-font-primary">
          <span>{{ ruleForm.phone }}</span>
          <span style="cursor: pointer" @click.stop="changeHandle">[变更]</span>
        </div>
      </el-form-item>
      <el-form-item prop="areas" label="所属区域">
        <span class="text-font-primary text-container">{{
          ruleForm.areas
        }}</span>
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

    <UpdatePhoneDialog
      :visible.sync="updatePhoneDialogVisible"
      :tel-phone="{ phone: ruleForm.phone }"
      @phone-change="handlePhoneChange"
    />
  </ht-dialog>
</template>
<script>
import UpdatePhoneDialog from "./UpdatePhoneDialog";
import { getUserInfoMsg, setUserInfoMsg } from "@/api/userinfo/userinfo";
import eventBus from "@/event";

const defaultRuleForm = {
  name: "",
  phone: "",
  areas: []
};

export default {
  name: "AccountSetDialog",
  components: {
    UpdatePhoneDialog
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    const rules = {
      name: [
        {
          required: true,
          message: "请输入真实姓名！"
        }
      ]
    };

    return {
      sureLoading: false,
      ruleForm: { ...defaultRuleForm },
      updatePhoneDialogVisible: false,
      rules: rules
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
    initData() {
      this.ruleForm = { ...defaultRuleForm, ...this.userInfo };
    },
    changeHandle() {
      this.updatePhoneDialogVisible = true;
    },
    handlePhoneChange() {
      getUserInfoMsg()
        .then(res => {
          this.ruleForm = { ...res };
          this.cancelHandle();
        })
        .catch(() => {});
    },
    sureHandle() {
      if (this.sureLoading) return;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.sureLoading = true;
          setUserInfoMsg({ name: this.ruleForm.name })
            .then(() => {
              this.sureLoading = false;
              this.$message.success({
                message: "账号设置成功！",
                showClose: true
              });
              eventBus.$emit("updateUserName", true);
              this.cancelHandle();
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

<style lang="stylus" scoped>
.phone-container
    display: flex
    align-items: center
    justify-content: space-between
.text-container
    padding-left: 5px
</style>
