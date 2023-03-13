<template>
  <ht-dialog
    :visible.sync="relVisible"
    :title="`${ruleForm.status ? '退盟申请审核' : '加盟申请审核'}`"
    width="500px"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-position="left"
      label-width="90px"
      class="form-item-small-margin-bottom"
    >
      <el-form-item label="加盟店名称">
        <div class="text-font-primary">{{ ruleForm.name }}</div>
      </el-form-item>
      <el-form-item
        :label="`${ruleForm.status ? '是否同意退盟' : '是否同意加盟'}`"
      >
        <el-radio-group v-model="ruleForm.isApproved">
          <el-radio :label="true">
            同意
          </el-radio>
          <el-radio :label="false">
            不同意
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="!ruleForm.isApproved"
        label="审核意见"
        prop="auditComment"
      >
        <ht-input
          v-model="ruleForm.auditComment"
          :rows="3"
          type="textarea"
          placeholder="请输入审核意见"
        />
      </el-form-item>
    </el-form>
    <div style="text-align: center; margin-top: 10px;">
      <el-button
        v-loading="loading"
        type="primary"
        size="mini"
        plain
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>

    <AuthorizePartsBox
      :visible.sync="authorizePartsBoxVisible"
      :subCompanyId="subCompanyId"
    />
  </ht-dialog>
</template>

<script>
import { auditFranchiserApply } from "@/api/franchiser";
import AuthorizePartsBox from "@/views/company/franchiser/mainStore/components/AuthorizePartsBox";

const defaultRuleForm = {
  id: 0,
  name: "",
  isApproved: true,
  auditComment: ""
};

export default {
  name: "AuditBox",
  components: {
    AuthorizePartsBox
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    infoData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      ruleForm: { ...defaultRuleForm },
      authorizePartsBoxVisible: false,
      subCompanyId: 0,
      rules: {
        auditComment: [
          {
            required: true,
            message: "请输入审核意见！",
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
        this.initData();
      }
    }
  },
  methods: {
    initData() {
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.infoData
      };
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.loading) return;
          this.loading = true;
          auditFranchiserApply(this.ruleForm)
            .then(() => {
              this.loading = false;
              this.cancelHandle();
              this.$emit("audit");
              if (this.ruleForm.status === 0 && this.ruleForm.isApproved) {
                this.$message.success({
                  message: "审核成功！",
                  showClose: true
                });
                this.$msgbox({
                  title: "提示",
                  type: "warning",
                  customClass: "authorize-parts-tips",
                  message: this.authorizePartsTips(),
                  showCancelButton: true,
                  closeOnClickModal: false,
                  closeOnPressEscape: true,
                  confirmButtonText: "去授权",
                  cancelButtonText: "取消"
                }).then(() => {
                  this.subCompanyId = this.infoData.subCompanyId;
                  this.authorizePartsBoxVisible = true;
                });
              }
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
    authorizePartsTips() {
      return (
        <div style="text-align: left;">
          <div>是否现在给该加盟店授权配件？</div>
          <div>如选择取消，后续可在加盟店管理界面对该加盟店进行配件授权。</div>
        </div>
      );
    },
    cancelHandle() {
      this.relVisible = false;
    }
  }
};
</script>
