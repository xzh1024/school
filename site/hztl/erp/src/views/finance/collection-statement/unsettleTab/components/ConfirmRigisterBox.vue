<template>
  <ht-dialog
    v-bind="$attrs"
    append-to-body
    title="财务确认变更"
    width="350px"
    class="dialog-body"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="60px"
      class="form-item-small-margin-bottom"
      size="mini"
      label-position="left"
    >
      <el-form-item label="业务单号">
        <span class="text-font-primary text-container"
          >{{ ruleForm.billNo }}
        </span>
      </el-form-item>
      <el-form-item label="往来单位">
        <span class="text-font-primary text-container"
          >{{ ruleForm.cooperatorName }}
        </span>
      </el-form-item>
      <el-form-item label="结算方式" prop="settlementType">
        <el-radio-group v-model="ruleForm.settlementType" class="radio-group">
          <el-radio :label="0" border>
            挂账
          </el-radio>
          <el-radio :label="1" border>
            物流代收
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确认（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
const defaultRuleForm = {
  billNo: "",
  cooperatorName: null,
  settlementType: 1
};

export default {
  name: "ConfirmRigisterBox",
  props: {
    ruleData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      ruleForm: { ...defaultRuleForm }
    };
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldValue) {
        if (val) {
          this.initData();
        } else if (oldValue) {
          this.ruleForm = { ...defaultRuleForm };
        }
      },
      immediate: true
    }
  },
  methods: {
    initData() {
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.ruleData
      };
    },
    sureHandle() {
      this.$emit("on-sure", { ...this.ruleForm });
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-body
    /deep/ .el-dialog__body
        padding: 10px 10px 5px 10px !important
.text-container
    padding-left: 5px
.radio-group
    margin-left: 5px
    /deep/ .el-radio
        margin: 0
</style>
