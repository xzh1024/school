<template>
  <ht-dialog
    v-bind="$attrs"
    title="添加平台供应商"
    width="400px"
    v-on="$listeners"
    @close="cleanFormData"
  >
    <el-form
      ref="form"
      v-switch-focus="focusData"
      :model="form"
      label-position="left"
      size="mini"
    >
      <el-row :gutter="5">
        <el-col :span="18">
          <el-form-item label="邀请码" prop="code" label-width="45px">
            <ht-input
              v-model="form.code"
              class="switch-focus focus-code"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="handleAnalysisCode">
            解析邀请码
          </el-button>
        </el-col>
      </el-row>
      <el-form-item
        v-if="codeMsg.companyName || codeMsg.allianceName"
        :label="_lable"
      >
        <div class="suppliers-msg-box">
          <el-row>
            <el-col :span="8">
              <span class="titleName">{{
                codeType === "company" ? "公司名称:" : "联盟名称:"
              }}</span>
            </el-col>
            <el-col :span="16">
              <span>{{
                codeType === "company"
                  ? codeMsg.companyName
                  : codeMsg.allianceName
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="titleName">联系人:</span>
            </el-col>
            <el-col :span="16">
              <span>{{
                codeType === "company"
                  ? codeMsg.companyContacts
                  : codeMsg.allianceContacts
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="titleName">联系电话:</span>
            </el-col>
            <el-col :span="16">
              <span>{{
                codeType === "company"
                  ? codeMsg.companyPhone
                  : codeMsg.alliancePhone
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="titleName">所属区域:</span>
            </el-col>
            <el-col :span="16">
              <span>{{
                codeType === "company"
                  ? codeMsg.companyAreaName
                  : codeMsg.allianceAreaName
              }}</span>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align">
      <el-button
        :loading="loading"
        type="primary"
        size="mini"
        plain
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
import {
  addSupplierCode,
  analysisSupplierCode
} from "@/api/communion/communion";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const defaultForm = {
  code: ""
};

export default {
  name: "AddSuppliers",
  data() {
    return {
      keyScope: Symbol("AddSuppliers"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      form: {
        ...defaultForm
      },
      loading: false,
      codeMsg: {},
      codeType: ""
    };
  },
  computed: {
    _lable() {
      if (this.codeType === "company") {
        return "供应商信息";
      } else if (this.codeType === "alliance") {
        return "联盟信息";
      } else {
        return "";
      }
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-code" });
            hotkeys.setScope(this.keyScope);
          });
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.cleanFormData();
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
          return;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handleInputEnter(e) {
      e.preventDefault();
      this.handleAnalysisCode();
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
      if (this.loading) return;
      this.$emit("update:visible", false);
    },
    cleanFormData() {
      this.$refs.form = { ...defaultForm };
      this.codeMsg = {};
    },
    sureHandle() {
      if (this.form.code) {
        if (this.loading) return;
        this.loading = true;
        addSupplierCode({ invitationCode: this.form.code })
          .then(() => {
            this.$message.success({ message: "提交成功！", showClose: true });
            this.cancelHandle();
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        this.$message.warning({ message: "请填写邀请码！", showClose: true });
      }
    },
    handleAnalysisCode() {
      if (this.form.code) {
        analysisSupplierCode({ invitationCode: this.form.code })
          .then(data => {
            this.codeMsg = { ...data };
            if (data.allianceId) {
              this.codeType = "alliance";
            } else {
              this.codeType = "company";
            }
          })
          .catch(() => {});
      } else {
        this.$message.warning({ message: "请填写邀请码！", showClose: true });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.suppliers-msg-box
    padding 10px
    border 1px solid #D9D9D9
    border-radius 6px
    .titleName
        display inline-block
        width 60px
        text-align right
</style>
