<template>
  <ht-dialog
    v-bind="$attrs"
    title="开单方式设置"
    width="390px"
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
        :loading="sureloading"
        type="primary"
        plain
        size="mini"
        @click="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :disabled="sureloading"
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
import hotkeys from "hotkeys-js";
import { MODE_OPTIONS } from "@/constants";

let oldKeyScope;
const defaultRuleForm = {
  mode: 0
};

export default {
  name: "BillingSetBox",
  props: {
    mode: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      keyScope: Symbol("BillingSetBox"),
      ruleForm: { ...defaultRuleForm },
      MODE_OPTIONS,
      autoFocus: true,
      sureloading: false,
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
      handler(value, oldVal) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.autoFocus = true;
          this.initData();
          setTimeout(() => {
            hotkeys.setScope(this.keyScope);
            this.$refs.ruleForm.clearValidate();
          }, 100);
        } else if (oldVal) {
          this.autoFocus = false;
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        default:
          break;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    initData() {
      this.ruleForm.mode = this.mode ? Number(this.mode || 0) : 0;
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.sureloading) return;
          this.sureloading = true;
          updateStaffSystemParamsDetail({
            module: "sale",
            type: "billingMode",
            value: this.ruleForm.mode
          })
            .then(() => {
              this.sureloading = false;
              this.$message.success({
                message: "开单方式设置成功！",
                showClose: true
              });
              this.$emit("on-sure", this.ruleForm.mode);
              this.cancelHandle();
            })
            .catch(() => {
              this.sureloading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    cancelHandle() {
      if (this.sureloading) return;
      this.$emit("update:visible", false);
    }
  }
};
</script>
