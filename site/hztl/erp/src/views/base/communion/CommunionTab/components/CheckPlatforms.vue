<template>
  <ht-dialog
    v-bind="$attrs"
    title="审核平台客户"
    width="400px"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      v-switch-focus="focusData"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      class="form-item-small-margin-bottom"
      label-position="left"
      label-width="71px"
      size="mini"
    >
      <el-form-item label="审核结果" prop="isCheck">
        <el-radio-group v-model="ruleForm.isCheck">
          <el-radio :label="true">
            通过
          </el-radio>
          <el-radio :label="false">
            拒绝
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="ruleForm.isCheck">
        <el-form-item prop="defaultInvoiceType" label="发票类型">
          <ht-autoselect
            v-model="ruleForm.invoiceType"
            :options="store().invoiceTypeDictionary()"
            :trigger-on-focus="false"
            class="switch-focus focus-invoiceType"
            placeholder="请选择"
            mnemonic
            filter-zero
            clearable
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item prop="priceType" label="享受价格">
          <ht-autoselect
            v-model="ruleForm.priceType"
            :options="store().priceTypeDictionary()"
            :trigger-on-focus="false"
            class="switch-focus focus-priceType"
            placeholder="请选择"
            clearable
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="结算方式" prop="settlementType">
          <ht-autoselect
            v-model="ruleForm.settlementType"
            :trigger-on-focus="false"
            :options="store().settlementTypeDictionary()"
            class="switch-focus focus-settlementType"
            placeholder="请选择"
            mnemonic
            clearable
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="对账日" prop="reconciliationDay">
          <ht-autoselect
            v-model="ruleForm.reconciliationDay"
            :options="reconciliationDayOptions"
            :trigger-on-focus="false"
            class="switch-focus focus-reconciliationDay"
            placeholder="请选择"
            clearable
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="账期" prop="accountPeriod">
          <ht-input
            v-model.number="ruleForm.accountPeriod"
            class="switch-focus focus-accountPeriod"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        本地相似往来单位 (勾选合并)
        <el-form-item
          v-if="similarsCustrom.id"
          prop="targetId"
          label=""
          label-width="0"
        >
          <el-radio
            v-model="targetId"
            :label="similarsCustrom.id"
            :disabled="similarsCustrom.must"
            style="width: 100%;"
            border
          >
            {{ similarsCustrom.name }}
          </el-radio>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="拒绝原因" prop="reason">
          <ht-input
            v-model="ruleForm.reason"
            :rows="2"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px;">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确定（F3）
      </el-button>
      <el-button type="primary" plain size="mini" @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { commonValidator } from "../../mixin";
import { DAYOPTIONS } from "@/constants";
import { searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

let oldKeyScope;
const defaultRuleForm = {
  isCheck: true,
  invoiceType: null,
  priceType: null,
  settlementType: null,
  reconciliationDay: null,
  accountPeriod: ""
};
export default {
  name: "CheckPlatforms",
  mixins: [searchMixin, commonValidator],
  props: {
    similarsCustrom: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("CheckPlatforms"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      ruleForm: {
        ...defaultRuleForm
      },
      reconciliationDayOptions: DAYOPTIONS,
      rules: {
        isCheck: [
          { required: true, message: "请选择审核结果", trigger: "change" }
        ],
        invoiceType: [
          { required: true, message: "请选择发票类型", trigger: "change" }
        ],
        settlementType: [
          { required: true, message: "请选择结算方式", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    targetId() {
      return this.similarsCustrom.id || null;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-invoiceType" });
            hotkeys.setScope(this.keyScope);
            this.$refs.ruleForm.clearValidate();
          }, 100);
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.ruleForm = { ...defaultRuleForm };
        }
      },
      immediate: true
    },
    "ruleForm.isCheck"(value) {
      if (!value) return;
      setTimeout(() => {
        this.updateFocusData({ initial: "focus-invoiceType" });
      }, 100);
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
          return;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
    },
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
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    sureHandle() {
      this.$refs["ruleForm"].validate((valid, err) => {
        if (valid) {
          const platforms = { ...this.ruleForm, targetId: this.targetId };
          this.$emit("handleSureSubmit", platforms);
          this.cancelHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    }
  }
};
</script>
