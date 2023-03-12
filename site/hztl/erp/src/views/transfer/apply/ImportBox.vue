<template>
  <import-box
    title="调拨申请导入开单"
    remakTitle="调拨申请数据导入说明"
    :has-setting="ruleForm.hasSetting"
    :options="ruleForm.options || []"
    :is-can-click-import="isCanClickImport"
    :toValidIncludeOptions="toValidIncludeOptions"
    isBill
    :visible.sync="relVisible"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template>
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        :show-message="false"
        size="mini"
        label-position="left"
        label-width="85px"
        class="form-item-small-margin-bottom"
        :disabled="!canEidtForm"
      >
        <el-form-item label="调出分公司" prop="relatedCompanyId">
          <ht-autoselect
            v-delay-focus="autoFocus"
            v-model="ruleForm.relatedCompanyId"
            :default-value.sync="ruleForm.relatedCompanyName"
            :options="relatedCompanies"
            :clearable="false"
            :trigger-on-focus="false"
            placeholder="请选择"
            filter-zero
            highlight-first-item
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item label="请调人" prop="businessManId">
          <ht-autoselect
            v-model="ruleForm.businessManId"
            :default-value.sync="ruleForm.businessManName"
            :options="store().myStaffs()"
            :clearable="false"
            :trigger-on-focus="false"
            placeholder="请选择"
            filter-zero
            highlight-first-item
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item label="申请日期" prop="billDate">
          <el-date-picker
            v-model="ruleForm.billDate"
            :clearable="false"
            :editable="false"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="handleRuleFormChange"
          />
        </el-form-item>
      </el-form>
    </template>
    <div slot="remark" style="font-size: 13px">
      数据要求：<br />
      1、导入数据必须需包含：配件编码、配件名称、申请数量、到货仓库。<br />
      <br />数据说明：<br />
      1、在导入时每一行数据都将按照配件编码、品牌和产地这3个字段与系统所存储的配件数据进行匹配，3个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。<br />
      <br />文件要求：<br />
      1、数据文件格式（EXCEL文件）且需选择对应工作表。<br />
      2、数据读取完成后，设置数据源，在下拉目标字段中选择对应字段。<br />
      要求：必须一一对应且不重复。<br />
      3、如果是EXCEL文件，则格式要求如下：<br />
      （1）第一行表示列标题，不是正式数据。<br />（2）不能存在合并单元格。<br />
      （3）只能有文本，数字，日期等文字信息，不能含有图形，图像等非文字信息。
    </div>
  </import-box>
</template>

<script>
import ImportBox from "@/components/importBox";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "TransferApplyImportBox",
  components: {
    ImportBox
  },
  mixins: [searchMixin],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    visible: Boolean,
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    header: {
      type: Object
    },
    relatedCompanies: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        relatedCompanyId: [
          { required: true, message: "请选择调出分公司", trigger: "blur" }
        ],
        businessManId: [
          { required: true, message: "请选择请调人", trigger: "blur" }
        ],
        billDate: [
          { required: true, message: "请选择申请日期", trigger: "blur" }
        ]
      },
      autoFocus: false,
      toValidIncludeOptions: null
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
        this.$emit("close", val);
      }
    },
    isCanClickImport() {
      return this.$refs.ruleForm && this.isValidate();
    },
    canEidtForm() {
      return !this.header || !this.header.actions || this.header.actions.edit;
    }
  },
  watch: {
    visible(value) {
      if (value) {
        if (!this.toValidIncludeOptions) {
          this.toValidIncludeOptions = {
            relatedCompanyId: this.relatedCompanies,
            businessManId: this.store().myStaffs()
          };
        }
        this.ruleForm = { ...this.value };
        this.autoFocus = true;
        this.setRelatedCompany();
        this.$nextTick(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        });
      } else {
        this.autoFocus = false;
      }
    }
  },
  methods: {
    store() {
      return store;
    },
    setRelatedCompany() {
      if (
        this.relatedCompanies?.length === 1 &&
        (!this.header || !this.header?.id)
      ) {
        this.ruleForm.relatedCompanyId = this.relatedCompanies[0].id;
        this.ruleForm.relatedCompanyName = this.relatedCompanies[0].name;
        this.handleRuleFormChange();
      }
    },
    isValidate() {
      let flag = true;
      this.$refs.ruleForm.validate((valid, err) => {
        if (!valid) {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return flag;
    },
    handleRuleFormChange() {
      this.$emit("change", this.ruleForm);
    }
  }
};
</script>
