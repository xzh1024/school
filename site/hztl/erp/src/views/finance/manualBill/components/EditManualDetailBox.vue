<template>
  <ht-dialog :title="title" v-bind="$attrs" width="400px" v-on="$listeners">
    <el-form
      ref="registerFrom"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="85px"
      size="mini"
      label-position="left"
      class="form-item-small-margin-bottom"
    >
      <el-form-item label="账户名称" prop="fundAccountId">
        <ht-autoselect
          v-model="formData.fundAccountId"
          :clearable="false"
          :options="store().accountList()"
          :default-value.sync="formData.fundAccountName"
          :trigger-on-focus="false"
          placeholder="请选择"
          filter-zero
          highlight-first-item
          @change="fundAccountChange"
        />
      </el-form-item>
      <el-form-item label="银行账户" prop="bankAccount">
        <ht-input v-model="formData.bankAccount" disabled />
      </el-form-item>
      <el-form-item label="收付款日期" prop="paymentDate">
        <el-date-picker
          v-model="formData.paymentDate"
          :clearable="false"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="类型" prop="paymentType">
        <ht-autoselect
          v-model="formData.paymentType"
          :options="paymentTypes"
          :trigger-on-focus="false"
          :clearable="false"
          placeholder="请选择"
          filter-zero
          highlight-first-item
          @change="onPaymentTypeChange"
        />
      </el-form-item>
      <el-form-item label="收支类目" prop="fundCategoryId">
        <ht-autoselect
          v-model="formData.fundCategoryId"
          :fetch-suggestions="query => searchLoadFundCategory(query)"
          :trigger-on-focus="false"
          filterZero
          remote
          clearable
          placeholder="请选择"
          filter-zero
          highlight-first-item
          @change="onFundCategoryChange"
        />
      </el-form-item>
      <el-form-item label="摘要" prop="description">
        <ht-input v-model="formData.description" name="description" />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <HtFormatNumber
          v-model="formData.amount"
          :min="0"
          precision-type="money"
        />
      </el-form-item>
      <el-form-item label="发生公司" prop="companyId">
        <ht-autoselect
          v-model="formData.companyId"
          :options="manulsCompanies"
          :default-value.sync="formData.companyName"
          :trigger-on-focus="false"
          :clearable="false"
          placeholder="请选择"
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item prop="cooperatorId" label="往来单位">
        <ht-autoselect
          v-model="formData.cooperatorId"
          :default-value.sync="formData.cooperatorName"
          :fetch-suggestions="query => searchLoadAllTypesCooperators(query)"
          :trigger-on-focus="false"
          placeholder="请选择"
          remote
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handledBy">
        <ht-autoselect
          v-model="formData.handledBy"
          :options="store().allStaffs()"
          :default-value.sync="formData.handledByName"
          :trigger-on-focus="false"
          :clearable="false"
          placeholder="请选择"
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <ht-input v-model="formData.remark" maxlength="200" />
      </el-form-item>
      <el-form-item label="票据号码" prop="checkNumber">
        <ht-input v-model="formData.checkNumber" />
      </el-form-item>
      <el-form-item label="票据日期" prop="checkDate">
        <el-date-picker
          v-model="formData.checkDate"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
    </el-form>

    <div class="dialog-footer-align" style="margin-top: 15px;">
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
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import {
  createManul,
  loadManulsCompanies,
  updateManul,
  searchFundCategories
} from "@/api/finance/manual";
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

const defaultFormData = {
  fundAccountId: "",
  fundAccountName: "",
  bankAccount: "",
  amount: "",
  paymentDate: dateFormat(new Date()),
  paymentType: 0,
  fundCategoryId: null,
  description: "",
  companyId: null,
  companyName: "",
  cooperatorId: null,
  cooperatorName: "",
  handledBy: null,
  handledByName: "",
  remark: "",
  checkNumber: "",
  checkDate: dateFormat(new Date())
};

export default {
  name: "EditManualDetailBox",
  mixins: [searchMixin],
  props: {
    editData: {
      type: Object,
      default() {
        return {};
      }
    },
    isUpdate: Boolean
  },
  data() {
    return {
      keyScope: Symbol("EditManualDetailBox"),
      cancelFocus: false,
      paymentTypes: [
        { id: 0, name: "收入" },
        { id: 1, name: "支出" }
      ],
      rules: {
        fundAccountId: [
          { required: true, message: "请选择账户", trigger: "change" }
        ],
        paymentType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        fundCategoryId: [
          { required: true, message: "请选择收支类目", trigger: "change" }
        ],
        paymentDate: [
          { required: true, message: "请选择收付款日期", trigger: "change" }
        ],
        amount: [{ required: true, message: "请输入金额", trigger: "change" }],
        companyId: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        handledBy: [
          { required: true, message: "请选择经办人", trigger: "change" }
        ]
      },
      formData: {
        ...defaultFormData
      },
      manulsCompanies: [],
      fundCategories: []
    };
  },
  computed: {
    title() {
      return this.isUpdate ? "修改" : "新增";
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          if (this.isUpdate) {
            this.formData = {
              ...defaultFormData,
              ...this.editData,
              id: this.editData.subId,
              amount:
                Number(this.editData.amountIn) ||
                Number(this.editData.amountOut)
            };
          } else {
            this.formData = { ...defaultFormData };
            this.setDefaultDate();
          }
          this.loadManulsCompanies();
          this.$nextTick(() => {
            this.$refs?.registerFrom.clearValidate();
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    async searchLoadFundCategory(query) {
      this.fundCategories =
        (await searchFundCategories({
          keyword: query,
          status: "enable",
          type: this.formData.paymentType === 0 ? "in" : "out",
          queryBillType: "common"
        })) || [];
      return this.fundCategories.map(item => ({
        ...item,
        name: item.fullName
      }));
    },
    setDefaultDate() {
      this.formData.paymentDate = dateFormat(new Date());
      this.formData.checkDate = dateFormat(new Date());
    },

    loadManulsCompanies() {
      loadManulsCompanies({ operatorType: this.isUpdate ? 1 : 0 })
        .then(res => {
          this.manulsCompanies = res.companies;
          if (!this.formData.companyId && this.manulsCompanies.length === 1) {
            this.formData.companyId = this.manulsCompanies[0].id;
          }
          this.$nextTick(() => {
            this.$refs.registerFrom.clearValidate();
          });
        })
        .catch(() => {});
    },

    fundAccountChange(id) {
      const account = store.accountList().find(item => item.id === id);
      this.formData.bankAccount = account ? account.bankAccount : "";
    },
    onPaymentTypeChange() {
      // 类型变化，收支类目下拉列表必定发生改变，所以清空收支类目值
      this.formData.fundCategoryId = null;
    },
    onFundCategoryChange(fundCategoryId) {
      const fundCategory = this.fundCategories.find(
        item => item.id === fundCategoryId
      );
      if (fundCategory) {
        this.formData.paymentType = fundCategory.type === "in" ? 0 : 1;
      }
    },

    sureHandle() {
      this.$refs.registerFrom.validate((valid, err) => {
        if (valid) {
          const params = {
            companyId: this.formData.companyId,
            cooperatorId: this.formData.cooperatorId,
            fundAccountId: this.formData.fundAccountId,
            paymentDate: this.formData.paymentDate,
            paymentType: this.formData.paymentType,
            fundCategoryId: this.formData.fundCategoryId,
            description: this.formData.description,
            amount: this.formData.amount,
            checkDate: this.formData.checkDate,
            checkNumber: this.formData.checkNumber,
            handledBy: this.formData.handledBy,
            remark: this.formData.remark
          };
          if (this.isUpdate) {
            updateManul({ ...params, id: this.formData.id })
              .then(() => {
                this.$message.success({
                  message: "修改成功!",
                  showClose: true
                });
                this.$emit("success", this.formData.fundAccountId);
                this.cancelHandle();
              })
              .catch(() => {});
          } else {
            createManul(params)
              .then(() => {
                this.$message.success({
                  message: "新增成功!",
                  showClose: true
                });
                this.$emit("success", this.formData.fundAccountId);
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
