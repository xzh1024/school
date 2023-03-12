<template>
  <ht-dialog v-on="$listeners" v-bind="$attrs" title="拒绝" width="400px">
    <el-form
      ref="rejectForm"
      :model="rejectForm"
      :rules="rejectRules"
      :show-message="false"
      class="form-item-no-margin-bottom"
    >
      <el-form-item prop="rejectedComment">
        <ht-input
          v-model="rejectForm.rejectedComment"
          :rows="3"
          type="textarea"
          placeholder="请填写拒绝原因"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :loading="loading"
        type="primary"
        size="mini"
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { reqConfirmBatchReject } from "@/api/purchase/purchaseDispatch/confirm";

export default {
  name: "RejectBox",
  props: {
    ids: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      rejectVisible: false,
      rejectForm: {
        rejectedComment: ""
      },
      rejectRules: {
        rejectedComment: [
          {
            required: true,
            trigger: "blur",
            message: "请填写拒绝原因！"
          }
        ]
      }
    };
  },
  methods: {
    sureHandle() {
      if (this.loading) return;
      const form = this.getRejectForm();
      form.validate((valid, err) => {
        if (valid) {
          this.loading = true;
          const req = {};
          req.rejectedComment = this.rejectForm.rejectedComment;
          req.ids = this.ids;
          reqConfirmBatchReject(req)
            .then(() => {
              this.$message({
                type: "success",
                message: "急件已拒绝"
              });
              this.loading = false;
              this.rejectVisible = false;
              this.$emit("sure");
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    clearRejectFrom() {
      this.getRejectForm().resetFields();
    },
    getRejectForm() {
      return this.$refs.rejectForm;
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
