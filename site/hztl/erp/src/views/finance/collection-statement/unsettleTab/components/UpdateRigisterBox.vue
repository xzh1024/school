<template>
  <ht-dialog
    v-bind="$attrs"
    append-to-body
    title="登记单变更"
    width="350px"
    class="dialog-body"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="71px"
      :show-message="false"
      class="form-item-small-margin-bottom"
      size="mini"
      label-position="left"
    >
      <el-form-item label="运单号">
        <span class="text-font-primary text-container"
          >{{ ruleForm.freightNo }}
        </span>
      </el-form-item>
      <el-form-item prop="logisticId" label="物流公司">
        <CooperatorsSelect
          v-model="ruleForm.logisticId"
          v-delay-focus="autoFocus"
          :default-value.sync="ruleForm.logisticsName"
          :clearable="false"
          :allow-create="hasCompletePerm('basics.cooperators.createLogistics')"
          no-data-tips="没有查询到物流公司,回车新增"
          type="logistics"
          placeholder="选择物流公司"
        />
      </el-form-item>
      <el-form-item label="运费" prop="money">
        <HtFormatNumber
          v-model="ruleForm.money"
          :min="0"
          precision-type="money"
          placeholder="运费"
        />
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
import { CooperatorsSelect } from "@/components/select";

const defaultRuleForm = {
  freightNo: "",
  logisticId: null,
  logisticsName: "",
  money: 0
};

export default {
  name: "UpdateRigisterBox",
  components: {
    CooperatorsSelect
  },
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
      ruleForm: { ...defaultRuleForm },
      autoFocus: true,
      rules: {
        logisticId: [
          {
            required: true,
            message: "请选择物流公司！",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "请填写运费！",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldValue) {
        if (val) {
          this.initData();
          this.autoFocus = true;
          setTimeout(() => {
            this.$refs.ruleForm.clearValidate();
          }, 100);
        } else if (oldValue) {
          this.autoFocus = false;
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
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.$emit("on-sure", { ...this.ruleForm });
          this.cancelHandle();
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
.dialog-body
    /deep/ .el-dialog__body
        padding: 10px 10px 5px 10px !important
.text-container
    padding-left: 5px
</style>
