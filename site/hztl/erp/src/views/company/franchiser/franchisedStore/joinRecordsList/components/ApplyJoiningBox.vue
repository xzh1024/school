<template>
  <ht-dialog
    :visible.sync="relVisible"
    title="申请加盟（申请后等待总店审核）"
    width="410px"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-position="left"
      label-width="87px"
      class="form-item-small-margin-bottom"
    >
      <el-form-item label="加盟授权码" prop="authCode">
        <ht-input
          v-model="ruleForm.authCode"
          v-delay-focus="autoFocus"
          :disabled="!canHandle"
          placeholder="请输入总店提供的授权码"
        >
          <el-button
            v-loading="loading"
            :disabled="!canHandle"
            slot="append"
            type="primary"
            size="mini"
            @click.stop="sureHandle"
          >
            确定
          </el-button>
        </ht-input>
      </el-form-item>
      <div v-show="authsInfo.authCode" class="perms-container">
        <el-form-item label="总店名称：" label-width="74px">
          <div class="text-font-primary">
            {{ authsInfo.headCompanyName }}
          </div>
        </el-form-item>
        <el-form-item label="已加盟配件库存数量查看：" label-width="172px">
          <div class="text-font-primary">
            {{ authsInfo.canViewStorage ? "允许" : "不允许" }}
          </div>
        </el-form-item>
        <el-form-item label="已加盟配件销售数量查看：" label-width="172px">
          <div class="text-font-primary">
            {{ authsInfo.canViewSale ? "允许" : "不允许" }}
          </div>
        </el-form-item>
        <div style="text-align: center; margin-top: 10px;">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            plain
            @click.stop="agreeHandle"
          >
            同意以上授权并申请（F3）
          </el-button>
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            plain
            @click.stop="resetHandle"
          >
            重置（F6）
          </el-button>
        </div>
      </div>
    </el-form>
  </ht-dialog>
</template>

<script>
import { getMainStoreAuths, joinMainStore } from "@/api/franchiser";

const defaultRuleForm = {
  authCode: ""
};
const defaultAuthsInfo = {
  headCompanyName: "",
  canViewStorage: true,
  canViewSale: true,
  authCode: ""
};

export default {
  name: "ApplyJoiningBox",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    authCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ruleForm: { ...defaultRuleForm },
      canHandle: true,
      autoFocus: true,
      loading: false,
      authsInfo: { ...defaultAuthsInfo },
      rules: {
        authCode: [
          {
            required: true,
            message: "请输入加盟授权码！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.autoFocus = true;
      } else {
        this.autoFocus = false;
        this.resetHandle();
      }
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
    },
    authCode(val) {
      if (val) {
        this.ruleForm = { authCode: this.authCode };
        this.loading = true;
        getMainStoreAuths(this.ruleForm)
          .then(res => {
            this.authsInfo = res || { ...defaultAuthsInfo };
            this.loading = false;
            this.canHandle = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  },
  methods: {
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.loading) return;
          this.loading = true;
          getMainStoreAuths(this.ruleForm)
            .then(res => {
              this.authsInfo = res || { ...defaultAuthsInfo };
              this.loading = false;
              this.canHandle = false;
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
    agreeHandle() {
      if (this.loading || !this.authsInfo.authCode) return;
      this.loading = true;
      joinMainStore({ authCode: this.authsInfo.authCode })
        .then(() => {
          this.$message.success({ message: "申请加盟成功！", showClose: true });
          this.loading = false;
          this.$emit("join");
          this.relVisible = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetHandle() {
      if (!this.authsInfo.authCode) return;
      this.ruleForm = { ...defaultRuleForm };
      this.authsInfo = { ...defaultAuthsInfo };
      this.canHandle = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.perms-container {
  padding: 10px;
  border: solid 1px rgba(222, 225, 231, 1);
  border-radius: 4px;
}
</style>
