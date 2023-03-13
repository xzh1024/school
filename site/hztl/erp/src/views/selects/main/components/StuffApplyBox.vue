<template>
  <ht-dialog
    v-bind="$attrs"
    title="加入公司申请"
    width="350px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="85px"
      label-position="left"
      size="mini"
    >
      <el-form-item prop="inviteCode" label="员工邀请码">
        <ht-input v-model="ruleForm.inviteCode" v-delay-focus="inviteFocus" />
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button
        v-loading="sureLoading"
        type="primary"
        size="mini"
        plain
        @click.stop="sureHandle"
      >
        提交（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { invitedJoinCompany } from "@/api/company/company";

export default {
  name: "StuffApplyBox",
  data() {
    const rules = {
      inviteCode: [
        {
          required: true,
          message: "请输入员工邀请码！",
          trigger: "change"
        }
      ]
    };

    return {
      ruleForm: {
        inviteCode: ""
      },
      sureLoading: false,
      rules: rules,
      inviteFocus: false
    };
  },
  watch: {
    "$attrs.visible"(value) {
      if (value) {
        this.inviteFocus = true;
        setTimeout(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          this.nameFocus = true;
        }, 100);
      } else {
        this.inviteFocus = false;
      }
    }
  },
  methods: {
    sureHandle() {
      if (this.sureLoading) return;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.sureLoading = true;
          invitedJoinCompany(this.ruleForm)
            .then(() => {
              this.sureLoading = false;
              this.$message.success({
                message: "提交申请成功！",
                showClose: true
              });
              this.$emit("on-sure");
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
