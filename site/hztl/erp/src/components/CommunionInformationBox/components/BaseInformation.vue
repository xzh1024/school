<template>
  <div class="baselnformation-box">
    <ht-card title="基本信息" class="auto-card">
      <el-form
        ref="ruleForm"
        v-switch-focus="focusData"
        :disabled="!canEdit"
        :model="ruleForm"
        :rules="rules"
        :show-message="false"
        class="form-item-small-margin-bottom"
        label-position="left"
        label-width="72px"
        size="mini"
      >
        <el-form-item prop="number" label="单位编码">
          <ht-input
            v-model="ruleForm.number"
            disabled
            class="switch-focus focus-number"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="单位名称" prop="name">
          <ht-input
            v-if="isEdit"
            v-model="ruleForm.name"
            class="switch-focus focus-name"
            @change="handleSetShortName"
            @intput-enter="debouncedHandleInputEnter"
          />
          <ht-autocomplete
            v-else
            v-model="ruleForm.name"
            :fetch-suggestions="autocompleteSearchAllCooperators"
            :trigger-on-focus="false"
            class="switch-focus focus-name"
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
            @change="handleChangeName"
          />
        </el-form-item>
        <el-form-item label="单位类型" required>
          <el-checkbox
            v-model="ruleForm.flags.isCustomer"
            :disabled="!canEditCustomer"
            label="客户"
            @change="handleCustomerFormChange"
          />
          <el-checkbox
            v-model="ruleForm.flags.isSupplier"
            :disabled="!canEditSupplier"
            label="供应商"
            @change="handleFormChange"
          />
          <el-checkbox
            v-model="ruleForm.flags.isLogistics"
            :disabled="!canEditLogistics"
            label="物流公司"
            @change="handleFormChange"
          />
          <el-checkbox
            v-if="isYunXiu"
            v-model="ruleForm.flags.isInsuranceCompany"
            :disabled="!canEditInsurance"
            label="保险公司"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="单位简称" prop="shortName">
          <ht-input
            v-model="ruleForm.shortName"
            class="switch-focus focus-shortName"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="所属区域" prop="area.ids">
          <area-select v-model="ruleForm.area.ids" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否集团" prop="isGroup">
              <el-switch
                v-model="ruleForm.flags.isGroup"
                @change="handleChangeIsGroup"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="集团结算" prop="isGroupSettlement">
              <el-switch
                v-model="ruleForm.flags.isGroupSettlement"
                :disabled="ruleForm.flags.isGroup"
                @change="handleFormChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="归属集团" prop="groupId">
          <ht-autoselect
            v-model="ruleForm.groupId"
            :disabled="ruleForm.flags.isGroup"
            :default-value.sync="ruleForm.groupName"
            :fetch-suggestions="query => searchGroupCooperators(query)"
            :trigger-on-focus="false"
            class="switch-focus focus-groupId"
            placeholder="请选择归属集团"
            remote
            clearable
            highlight-first-item
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <ht-input
            v-model="ruleForm.invoiceTitle"
            class="switch-focus focus-invoiceTitle"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="税号" prop="creditCode">
          <ht-input
            v-model="changGroupSocialCode"
            class="switch-focus focus-creditCode"
            placeholder="统一社会信用代码"
            maxlength="18"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="公司电话" prop="phone">
          <ht-input
            v-model="ruleForm.phone"
            class="switch-focus focus-phone"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="开户银行" prop="bank">
          <ht-input
            v-model="ruleForm.bank"
            class="switch-focus focus-bank"
            maxlength="50"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="银行账户" prop="bankAccount">
          <ht-input
            v-model="ruleForm.bankAccount"
            class="switch-focus focus-bankAccount"
            maxlength="50"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <ht-input
            v-model="ruleForm.address"
            class="switch-focus focus-address"
            maxlength="50"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <ht-input
            v-model="ruleForm.remark"
            class="switch-focus focus-remark"
            maxlength="200"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
        <el-form-item label="停用原因" prop="stopReason">
          <ht-input
            v-model="ruleForm.stopReason"
            :disabled="!ruleForm.flags.isDisabled"
            class="switch-focus focus-stopReason"
            @intput-enter="debouncedHandleInputEnter"
            @change="handleFormChange"
          />
        </el-form-item>
      </el-form>
    </ht-card>
  </div>
</template>

<script>
import { AreaSelect } from "@/components/select";
import { searchMixin } from "@/mixins";
import { commonValidator } from "../mixin";
import debounce from "throttle-debounce/debounce";
import { userMsg } from "@/utils/store";

const defaultRuleForm = {
  number: "",
  name: "",
  shortName: "",
  flags: {
    isDisabled: false,
    isCustomer: false,
    isSupplier: false,
    isLogistics: false,
    isInsuranceCompany: false,
    isCompany: true,
    isGroup: false,
    isGroupSettlement: false
  },
  area: {
    ids: []
  },
  groupId: null,
  invoiceTitle: "",
  creditCode: "",
  phone: "",
  bank: "",
  bankAccount: "",
  address: "",
  remark: "",
  stopReason: "",
  belongs: null
};

export default {
  name: "Baseinformation",
  components: {
    AreaSelect
  },
  mixins: [commonValidator, searchMixin],
  props: {
    isEdit: Boolean,
    handleInputEnter: {
      type: Function,
      required: true
    },
    focusData: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    belongs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      isCanAdd: false,
      isYunXiu: userMsg().hasYx,
      selectUnits: "",
      ruleForm: {
        ...defaultRuleForm
      }
    };
  },
  computed: {
    changGroupSocialCode: {
      get() {
        return this.ruleForm.creditCode;
      },
      set(value) {
        this.ruleForm.creditCode = value.toUpperCase();
      }
    },
    canEditCustomer() {
      if (this.isEdit) {
        return this.hasBelongsPerm("readCustomer", this.belongs);
      } else {
        return this.hasAutoPerm("createCustomer");
      }
    },
    canEditSupplier() {
      if (this.isEdit) {
        return this.hasBelongsPerm("readSupplier", this.belongs);
      } else {
        return this.hasAutoPerm("createSupplier");
      }
    },
    canEditLogistics() {
      if (this.isEdit) {
        return this.hasBelongsPerm("readLogistics", this.belongs);
      } else {
        return this.hasAutoPerm("createLogistics");
      }
    },
    canEditInsurance() {
      if (this.isEdit) {
        return this.hasBelongsPerm("readInsuranceCompany", this.belongs);
      } else {
        return this.hasAutoPerm("createInsuranceCompany");
      }
    },
    canEdit() {
      if (this.isEdit) {
        return this.hasBelongsPerm("updateBasicAndContacts", this.belongs);
      } else {
        return (
          this.hasAutoPerm("createCustomer") ||
          this.hasAutoPerm("createSupplier") ||
          this.hasAutoPerm("createLogistics") ||
          this.hasAutoPerm("createInsuranceCompany")
        );
      }
    }
  },
  watch: {
    formData() {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    handleCustomerFormChange(val) {
      this.$emit("updateIsCustomer", val);
      this.handleFormChange();
    },
    triggerRefreshData() {
      this.handleFormChange();
    },
    initData() {
      this.ruleForm = { ...defaultRuleForm, ...this.formData };
    },
    handleFormChange() {
      this.$emit("update:formData", { ...this.ruleForm });
    },
    handleChangeName(value) {
      this.handleSetShortName(value);
    },
    handleSetShortName(value) {
      this.ruleForm.shortName = value;
      this.handleFormChange();
    },
    handleChangeIsGroup(value) {
      this.ruleForm.flags.isGroupSettlement = value;
      this.handleFormChange();
    },
    getForm() {
      return this.$refs.ruleForm;
    }
  }
};
</script>

<style lang="scss" scoped>
.baselnformation-box {
  ::v-deep {
    height: 100%;
    .el-checkbox {
      margin-right: 10px;
    }
  }
}
</style>
