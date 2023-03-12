<template>
  <ht-dialog
    :visible.sync="visible"
    title="审批 - 拒绝"
    width="400px"
    append-to-body
    v-on="$listeners"
    @closed="closed"
  >
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="71px"
      label-position="right"
      size="mini"
      class="form-item-small-margin-bottom"
    >
      <el-form-item prop="reason" label="拒绝原因">
        <ht-input v-model="formData.reason" clearable />
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button type="primary" size="mini" @click="handleSure">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCancel">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { Form } from "element-ui";
import { ApprovalParams } from "../constant/interfaces";
import { OfficeAutomationService } from "../constant/services";
const officeAutomationService = new OfficeAutomationService();

const defaultBillData: ApprovalParams = {
  id: 0,
  billType: "",
  reason: ""
};

@Component({ name: "AuditRejectDialog" })
export default class AuditRejectDialog extends Vue {
  @Emit() protected update() {
    return;
  }

  public visible = false;

  get ruleForm(): Form {
    return this.$refs.ruleForm as Form;
  }

  protected formData: ApprovalParams = { ...defaultBillData };

  protected rules = {
    reason: [
      {
        required: true,
        message: "请填写拒绝原因",
        trigger: "change"
      }
    ]
  };

  protected handleSure() {
    this.ruleForm.validate((valid, err) => {
      if (valid) {
        officeAutomationService
          .refuseFeeApplications(this.formData)
          .then(() => {
            this.$message.success("审批拒绝成功");
            this.update();
            this.handleCancel();
          });
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }

  public show(data: ApprovalParams) {
    Object.assign(this.formData, data);
    this.visible = true;
  }

  protected handleCancel() {
    this.visible = false;
  }

  protected closed() {
    this.formData = { ...defaultBillData };
    this.$nextTick(() => {
      this.ruleForm.clearValidate();
    });
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  background-color: #e0e0e0;
}
</style>
