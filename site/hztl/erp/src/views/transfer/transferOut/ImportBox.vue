<template>
  <import-box
    title="调拨出库导入开单"
    remakTitle="调拨出库数据导入说明"
    :has-setting="ruleForm.hasSetting"
    :options="options"
    :is-can-click-import="isCanClickImport"
    :replaceData="replaceData"
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
        <el-form-item label="开单方式" prop="mode">
          <ht-autoselect
            v-delay-focus="autoFocus"
            v-model="ruleForm.mode"
            :options="MODE_OPTIONS"
            :clearable="false"
            :trigger-on-focus="false"
            placeholder="请选择"
            highlight-first-item
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item label="调入分公司" prop="relatedCompanyId">
          <ht-autoselect
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
        <el-form-item label="业务日期" prop="billDate">
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
      1、导入数据必须需包含：配件编码、配件名称、调出数量。<br /><br />
      数据说明：<br />
      1、性质为空时，会默认“完好”。<br />
      2、单价为空时，会按 调拨价 > 零售价 的顺序自动取值。<br />
      3、开单模式不同，必填的字段不同。<br />
      4、在导入时每一行数据都将按照配件编码、品牌和产地这3个字段与系统所存储的配件数据进行匹配，3个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。<br /><br />
      文件要求：<br />
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
import { MODE_OPTIONS } from "@/constants";

export default {
  name: "TransferOutImportBox",
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
      options: [],
      rules: {
        mode: [{ required: true, message: "请选择开单方式", trigger: "blur" }],
        relatedCompanyId: [
          { required: true, message: "请选择调入分公司", trigger: "blur" }
        ],
        billDate: [
          { required: true, message: "请选择业务日期", trigger: "blur" }
        ]
      },
      autoFocus: false,
      replaceData: {},
      MODE_OPTIONS,
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
    visible: {
      handler(value) {
        if (value) {
          if (!this.toValidIncludeOptions) {
            this.toValidIncludeOptions = {
              relatedCompanyId: this.relatedCompanies
            };
          }
          this.ruleForm = { ...this.value };
          this.options = this.value.options || [];
          this.autoFocus = true;
          this.setRelatedCompany();
          this.$nextTick(() => {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          });
        } else {
          this.autoFocus = false;
        }
      },
      deep: true
    },
    value: {
      handler(value) {
        this.options = value.options || [];
        this.$forceUpdate();
      },
      deep: true
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
      this.replaceData = { mode: this.ruleForm.mode };
    }
  }
};
</script>
