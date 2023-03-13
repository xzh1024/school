<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    :title="isEditBox ? '编辑联系人' : '编辑联系人'"
    width="350px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules2"
      :show-message="false"
      class="form-item-small-margin-bottom"
      label-width="85px"
      label-position="left"
      size="mini"
    >
      <el-form-item label="联系人姓名" prop="name">
        <ht-input
          v-model="ruleForm.name"
          class="switch-focus focus-name"
          maxlength="10"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="联系人电话" prop="phone">
        <ht-input
          v-model="ruleForm.phone"
          class="switch-focus focus-phone"
          maxlength="15"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="1">
            男
          </el-radio>
          <el-radio :label="2">
            女
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件类型" prop="certType">
        <ht-autoselect
          v-model="ruleForm.certType"
          :options="store().credentialsDictionary()"
          :trigger-on-focus="false"
          class="switch-focus focus-certType"
          placeholder="请选择"
          clearable
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="证件号码" prop="certNumber">
        <ht-input
          v-model="ruleForm.certNumber"
          class="switch-focus focus-certNumber"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="职务" prop="position">
        <ht-input
          v-model="ruleForm.position"
          class="switch-focus focus-position"
          maxlength="10"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="ruleForm.birthday"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <ht-input
          v-model="ruleForm.qq"
          class="switch-focus focus-qq"
          maxlength="20"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <ht-input
          v-model="ruleForm.wechat"
          class="switch-focus focus-wechat"
          maxlength="20"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <ht-input
          v-model="ruleForm.email"
          class="switch-focus focus-email"
          maxlength="50"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <ht-input
          v-model="ruleForm.remark"
          class="switch-focus focus-remark"
          maxlength="200"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px;">
      <el-button
        class="switch-focus focus-button"
        type="primary"
        size="mini"
        plain
        @click="sureHandle"
        @keyup.right.native="cancelFocus = true"
        @keyup.left.native="cancelFocus = true"
      >
        确定（F3）
      </el-button>
      <el-button
        v-delay-focus="cancelFocus"
        type="primary"
        size="mini"
        plain
        @click="cancelHandle"
        @keyup.right.native="getSureFocus"
        @keyup.left.native="getSureFocus"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import { commonValidator } from "../mixin";
import { searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

let oldKeyScope;
const defaultRuleForm = {
  name: "",
  sex: 0,
  phone: "",
  certType: "",
  certNumber: "",
  position: "",
  birthday: null,
  qq: "",
  wechat: "",
  email: "",
  remark: ""
};
export default {
  name: "AddContact",
  mixins: [commonValidator, searchMixin],
  props: {
    isEditBox: Boolean,
    information: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("AddContact"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      cancelFocus: false,
      ruleForm: {
        ...defaultRuleForm
      }
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-name" });
            this.$refs.ruleForm.clearValidate();
          }, 100);
          oldKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          if (this.isEditBox) {
            this.ruleForm = {
              ...defaultRuleForm,
              ...this.information,
              sex: this.information.flags.sex
            };
          }
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.ruleForm = { ...defaultRuleForm };
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
          this.cancelFocus = false;
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
    getSureFocus() {
      this.cancelFocus = false;
      this.updateFocusData({ initial: "focus-button" });
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.$emit("handleConfirm", {
            ...this.ruleForm,
            flags: {
              sex: this.ruleForm.sex,
              main: this.isEditBox ? this.information.flags.main : false
            }
          });
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
