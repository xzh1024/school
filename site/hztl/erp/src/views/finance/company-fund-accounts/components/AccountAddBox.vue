<template>
  <ht-dialog v-bind="$attrs" :title="title" width="450px" v-on="$listeners">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      v-switch-focus="focusData"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-position="left"
      label-width="75px"
      class="form-item-small-margin-bottom"
      style="margin: 0 40px;"
    >
      <el-form-item label="账户名称" prop="fundAccountName">
        <ht-input
          v-model="ruleForm.fundAccountName"
          class="switch-focus focus-fundAccountName"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="账户类型" prop="fundAccountType">
        <ht-autoselect
          v-model="ruleForm.fundAccountType"
          :options="fundAccountTypes"
          :trigger-on-focus="false"
          :clearable="false"
          filter-zero
          highlight-first-item
          class="switch-focus focus-fundAccountType"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="开户行" prop="bank">
        <ht-input
          v-model="ruleForm.bank"
          class="switch-focus focus-bank"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="银行账号" prop="bankAccount">
        <ht-input
          v-model="ruleForm.bankAccount"
          class="switch-focus focus-bankAccount"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="开户人" prop="bankedBy">
        <ht-input
          v-model="ruleForm.bankedBy"
          class="switch-focus focus-bankedBy"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px; text-align: center;">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import {
  createCompanyFundAccount,
  updateCompanyFundAccount
} from "@/api/finance/basicSetting";
import { searchMixin } from "@/mixins";

let oldKeyScope;
const defaultRuleForm = {
  fundAccountName: "",
  fundAccountType: "银行",
  bank: "",
  bankAccount: "",
  bankedBy: ""
};

export default {
  name: "AccountAddBox",
  mixins: [searchMixin],
  props: {
    companyData: {
      type: Object,
      required: true
    },
    accountData: {
      type: Object,
      default() {
        return { ...defaultRuleForm };
      }
    },
    isEdit: Boolean
  },
  data() {
    return {
      keyScope: Symbol("AccountAddBox"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      ruleForm: { ...defaultRuleForm },
      fundAccountTypes: [
        { id: "现金", name: "现金" },
        { id: "银行", name: "银行" }
      ],
      rules: {
        companyId: [
          {
            required: true,
            message: "请选择所属公司",
            trigger: "change"
          }
        ],
        fundAccountName: [
          {
            required: true,
            message: "请填写账户名称",
            trigger: "change"
          }
        ],
        fundAccountType: [
          {
            required: true,
            message: "请选择账户类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    title() {
      if (this.isEdit) {
        return `${this.ruleForm.companyName}编辑账户`;
      } else {
        return `${this.ruleForm.companyName}新增账户`;
      }
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          if (this.isEdit) {
            this.ruleForm = {
              ...defaultRuleForm,
              ...this.accountData,
              ...this.companyData
            };
          } else {
            this.ruleForm = {
              ...defaultRuleForm,
              ...this.companyData
            };
          }
          this.$nextTick(() => {
            this.updateFocusData({ initial: "focus-fundAccountName" });
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          });
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          break;
        default:
          break;
      }
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.ruleForm.id) {
            updateCompanyFundAccount(this.ruleForm)
              .then(() => {
                this.$message({
                  message: "更新账户成功!",
                  type: "success",
                  showClose: true
                });
                this.$emit("on-success");
                this.cancelHandle();
              })
              .catch(() => {});
          } else {
            createCompanyFundAccount(this.ruleForm)
              .then(() => {
                this.$message({
                  message: "新增账户成功!",
                  type: "success",
                  showClose: true
                });
                this.$emit("on-success");
                this.cancelHandle();
              })
              .catch(() => {});
          }
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
