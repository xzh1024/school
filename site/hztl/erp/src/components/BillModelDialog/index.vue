<template>
  <ht-dialog
    v-bind="$attrs"
    title="开单方式设置"
    width="350px"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="71px"
      label-position="left"
      size="mini"
    >
      <el-form-item label="开单方式" prop="mode">
        <ht-autoselect
          v-model="ruleForm.mode"
          v-delay-focus="autoFocus"
          :options="MODE_OPTIONS"
          :trigger-on-focus="false"
          placeholder="请选择"
          highlight-first-item
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin: 5px 0;">
      <el-button
        :loading="loading"
        type="primary"
        plain
        size="mini"
        @click="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :disabled="loading"
        type="primary"
        plain
        size="mini"
        @click="cancelHandle"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { updateStaffSystemParamsDetail } from "@/api/base/base";
import { MODE_OPTIONS } from "@/constants";

const defaultRuleForm = {
  mode: 0
};

export default {
  name: "BillModelDialog",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      ruleForm: { ...defaultRuleForm },
      MODE_OPTIONS,
      autoFocus: true,
      loading: false,
      rules: {
        mode: [
          {
            required: true,
            message: "请选择开单方式！",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.initData();
          setTimeout(() => {
            this.$refs.ruleForm.clearValidate();
          }, 100);
        }
      },
      immediate: true
    }
  },
  methods: {
    initData() {
      this.ruleForm.mode = this.value ? Number(this.value || 0) : 0;
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.loading) return;
          this.loading = true;
          updateStaffSystemParamsDetail({
            module: this.type,
            type: "billingMode",
            value: this.ruleForm.mode
          })
            .then(() => {
              this.loading = false;
              this.$message.success({
                message: "开单方式设置成功！",
                showClose: true
              });
              this.$emit("change", this.ruleForm.mode);
              this.cancelHandle();
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
    cancelHandle() {
      if (this.loading) return;
      this.$emit("close");
    }
  }
};
</script>
