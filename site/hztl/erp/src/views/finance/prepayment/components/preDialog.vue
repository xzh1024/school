<template>
  <ht-card :title="dialogTitle" class="container-space">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-position="right"
      label-width="80px"
      size="mini"
      class="form-item-small-margin-bottom warehouse-edit form"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.billType">
          <el-radio :label="type">{{
            type == "YS" ? "预收款" : "预付款"
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分公司" prop="companyId">
        <ht-select
          v-model="formData.companyId"
          :options="companys"
          clearable
          collapse-tags
          filterable
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="往来单位" prop="cooperatorId">
        <ht-autoselect
          v-model="formData.cooperatorId"
          :fetch-suggestions="query => searchLoadAllTypesCooperators(query)"
          :trigger-on-focus="false"
          placeholder="往来单位"
          remote
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <ht-input v-model="formData.amount" class="switch-focus focus-phone" />
      </el-form-item>
      <el-form-item label="发生日期" prop="settleDate">
        <el-date-picker
          v-model="formData.settleDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="票据号码">
        <ht-input
          v-model="formData.voucherCode"
          class="switch-focus focus-phone"
        />
      </el-form-item>
      <el-form-item label="收付款人">
        <ht-input
          v-model="formData.paymentBy"
          class="switch-focus focus-phone"
        />
      </el-form-item>
      <el-form-item label="备注">
        <ht-input
          v-model="formData.remark"
          class="switch-focus focus-remark"
          type="textarea"
          maxlength="200"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px">
      <el-button type="primary" size="mini" plain @click="submit">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="close">
        取消（Esc）
      </el-button>
    </div>
  </ht-card>
</template>

<script>
import { selectCompanys } from "@/api/company/company";
import { searchAllCooperators } from "@/api/communion/communion";
import { supplement } from "@/api/finance/prevFunds";
import { mapState } from "vuex";
import * as store from "@/utils/store";

export default {
  name: "payment-dailog",
  watch: {
    defaultForm: {
      handler(val) {
        this.formData = { ...val };
      },
      deep: true
    }
  },
  props: {
    defaultForm: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "YS"
    }
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "perm"]),
    dialogTitle() {
      let title = "";
      switch (this.type) {
        case 1:
          title = "预收登记";
          break;
        case 2:
          title = "预收冲销登记";
          break;
        default:
          break;
      }
      return title;
    },
    typeLabel() {
      let label = "";
      switch (this.type) {
        case 1:
          label = "预收款";
          break;
        case 2:
          label = "预收款";
          break;
        default:
          break;
      }
      return label;
    }
  },
  data() {
    return {
      companys: [],
      formData: {},
      rules: {
        billType: [
          { required: true, message: "请选择分公司", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "请选择分公司", trigger: "blur" }
        ],
        cooperatorId: [
          { required: true, message: "请选择往来单位", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }],
        settleDate: [
          { required: true, message: "请选择发生日期", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.searchLoadAllCompanies();
    this.formData = { ...this.defaultForm };
    // 设置默认当前分公司选中
  },
  methods: {
    async searchLoadAllCompanies() {
      const res = await selectCompanys();
      const hasFinancialPerm = this.loginHasPerm("financials");
      const hasFinancialPrevFundPerm = this.loginHasPerm("financials.prevFund");
      const hasOurPerm = this.loginContainPerm("financials.prevFund.our");
      const hasRestPerm = this.loginContainPerm("financials.prevFund.rests");
      const hasByOurPerm = this.loginContainPerm("financials.prevFund.byOur");
      const { companyId } = store.userInfoMsg();
      this.formData.companyId = companyId;
      // 根据权限去过滤
      let companies = [];
      if (hasFinancialPerm || hasFinancialPrevFundPerm) {
        companies = res;
      } else {
        res.forEach(item => {
          const { belongs } = item;
          if (belongs && belongs.includes("our") && hasOurPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("rests") && hasRestPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("byOur") && hasByOurPerm) {
            companies.push(item);
          }
        });
      }
      this.companys = companies;
    },
    async searchLoadAllTypesCooperators(query) {
      return (await searchAllCooperators({ keyword: query })) || [];
    },
    loginHasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return hasRootPerm || (perms && perms.some(item => permKey === item));
    },
    loginContainPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return (
        hasRootPerm || (perms && perms.some(item => item.includes(permKey)))
      );
    },
    // 提交表单
    submit() {
      this.$refs["formRef"].validate((valid, err) => {
        if (valid) {
          this.supplement();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({
            message: errTips,
            showClose: true
          });
        }
      });
    },
    supplement() {
      supplement({
        ...this.formData
      })
        .then(() => {
          this.$message.success({
            message: "登记成功",
            showClose: true
          });
          this.$emit("submitForm");
        })
        .catch(() => {
          this.preDialogVisible = false;
        });
    },
    close() {
      this.$emit("hide");
    }
  }
};
</script>

<style></style>
