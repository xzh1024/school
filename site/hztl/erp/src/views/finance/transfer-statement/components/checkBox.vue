<template>
  <ht-dialog
    class="ignore-top-hotkeys"
    v-bind="$attrs"
    title="对账单审核"
    width="320px"
    append-to-body
    v-on="$listeners"
    @closed="closeHandle"
  >
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" size="mini">
      <el-form-item label="审核结果">
        <el-radio-group v-model="ruleForm.isRefuse">
          <el-radio :label="false">
            通过
          </el-radio>
          <el-radio :label="true">
            不通过
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="ruleForm.isRefuse" label="拒绝原因">
        <ht-input
          v-model="ruleForm.refuseReason"
          :rows="2"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleHide">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
let lastKeyScope;
import hotkeys from "hotkeys-js";

export default {
  name: "CheckBill",
  props: {
    tableData: {
      type: Array
    }
  },
  data() {
    return {
      ruleForm: {
        isRefuse: false,
        refuseReason: ""
      },
      keyScope: Symbol("checkBillDialog")
    };
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldVal) {
        if (val) {
          lastKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3", { scope: this.keyScope }, (e, handler) => {
      if (!e.ctrlKey) {
        switch (handler.key) {
          case "f3":
            this.sureHandle();
            break;
          default:
            return;
        }
      }
    });
  },

  methods: {
    sureHandle() {
      this.$emit("on-search", this.ruleForm);
      this.handleHide();
    },
    closeHandle() {
      this.ruleForm.isRefuse = false;
      this.ruleForm.refuseReason = "";
    },
    handleHide() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
