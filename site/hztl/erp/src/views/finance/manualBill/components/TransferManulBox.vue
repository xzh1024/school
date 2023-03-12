<template>
  <ht-dialog title="新增" v-bind="$attrs" width="400px" v-on="$listeners">
    <el-form
      ref="registerFrom"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="75px"
      size="mini"
      label-position="left"
      class="form-item-small-margin-bottom"
    >
      <el-form-item label="转入账户" prop="dstFundAccountId">
        <ht-autoselect
          v-model="formData.dstFundAccountId"
          :options="store().accountList()"
          :trigger-on-focus="false"
          placeholder="请选择"
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="转出账户" prop="srcFundAccountId">
        <ht-autoselect
          v-model="formData.srcFundAccountId"
          :options="store().accountList()"
          :trigger-on-focus="false"
          placeholder="请选择"
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <HtFormatNumber
          v-model="formData.amount"
          :min="0"
          precision-type="money"
        />
      </el-form-item>
      <el-form-item label="经办人" prop="handledBy">
        <ht-autoselect
          v-model="formData.handledBy"
          :options="store().allStaffs()"
          :default-value.sync="formData.handledByName"
          :trigger-on-focus="false"
          placeholder="请选择"
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <ht-input v-model="formData.remark" maxlength="200" />
      </el-form-item>
      <el-form-item label="日期" prop="paymentDate">
        <el-date-picker
          v-model="formData.paymentDate"
          :clearable="false"
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
import { transferManul } from "@/api/finance/manual";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";
import * as store from "@/utils/store";

const defaultFormData = {
  dstFundAccountId: null,
  srcFundAccountId: null,
  amount: "",
  handledBy: null,
  handledByName: "",
  remark: "",
  paymentDate: dateFormat(new Date())
};

export default {
  name: "TransferManul",
  mixins: [searchMixin],
  data() {
    const validateFundAccountId = (rule, value, callback) => {
      if (this.formData.srcFundAccountId === this.formData.dstFundAccountId) {
        callback(new Error("转入转出账户不能相同！"));
      } else {
        callback();
      }
    };
    return {
      keyScope: Symbol("EditManualDetailBox"),
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      cancelFocus: false,
      formData: {
        ...defaultFormData
      },
      rules: {
        srcFundAccountId: [
          {
            required: true,
            message: "请选择转入账户",
            trigger: "change"
          },
          { validator: validateFundAccountId, trigger: "change" }
        ],
        dstFundAccountId: [
          {
            required: true,
            message: "请选择转出账户",
            trigger: "change"
          },
          { validator: validateFundAccountId, trigger: "change" }
        ],
        amount: [{ required: true, message: "请输入金额", trigger: "change" }],
        paymentDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        handledBy: [
          {
            required: true,
            message: "请选择经办人",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.formData = { ...defaultFormData };
          this.setDefaultDate();
          setTimeout(() => {
            this.$refs.registerFrom.clearValidate();
          }, 100);
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    setDefaultDate() {
      this.formData.paymentDate = dateFormat(new Date());
    },
    sureHandle() {
      this.$refs.registerFrom.validate((valid, err) => {
        if (valid) {
          transferManul(this.formData)
            .then(() => {
              this.$message.success({
                message: "转账成功!",
                showClose: true
              });
              this.$emit("success");
              this.cancelHandle();
            })
            .catch(() => {});
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
