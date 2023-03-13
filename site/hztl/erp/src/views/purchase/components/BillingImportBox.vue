<template>
  <import-box
    title="采购单明细导入"
    remakTitle="采购进货数据导入说明"
    :has-setting="ruleForm.hasSetting"
    :options="ruleForm.options"
    :is-can-click-import="isCanClickImport"
    :replaceData="replaceData"
    isBill
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
        label-width="71px"
        class="form-item-small-margin-bottom"
      >
        <el-form-item label="供应商" prop="cooperatorId">
          <CooperatorsSelect
            v-model="ruleForm.cooperatorId"
            v-delay-focus="autoFocus"
            :default-value.sync="ruleForm.cooperatorName"
            :allow-create="hasCompletePerm('basics.cooperators.createSupplier')"
            no-data-tips="没有查询到供应商,回车新增"
            type="supplier"
            placeholder="请选择"
            @change="billHeadersUpdateWithCooperator"
          />
        </el-form-item>
        <el-form-item prop="enhancedSettlementType" label="支付方式">
          <ht-autoselect
            v-model="ruleForm.enhancedSettlementType"
            :clearable="false"
            :options="store().enhancedSettlementTypeDictionary()"
            :trigger-on-focus="false"
            placeholder="请选择"
            mnemonic
            filter-zero
            highlight-first-item
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item prop="invoiceType" label="发票类型">
          <ht-autoselect
            v-model="ruleForm.invoiceType"
            :clearable="false"
            :options="store().formatInvoiceTypeDictionary()"
            :trigger-on-focus="false"
            placeholder="请选择"
            mnemonic
            filter-zero
            highlight-first-item
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item label-width="180px" label="自动创建不存在的配件资料">
          <el-switch
            v-model="ruleForm.createPartsIfNotExist"
            @change="handleRuleFormChange"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <div class="item-container">
            <el-checkbox
              v-model="ruleForm.isAssignBrand"
              @change="handleRuleFormChange"
            />
            <el-form-item
              label="指定品牌"
              label-width="60px"
              class="item-content"
            >
              <ht-autocomplete
                v-model="ruleForm.assignBrand"
                :disabled="!ruleForm.isAssignBrand"
                :fetch-suggestions="autocompleteSearchPartBrand"
                :trigger-on-focus="false"
                placeholder="请选择"
                highlight-first-item
                clearable
                @change="handleRuleFormChange"
              />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="item-container">
            <el-checkbox
              v-model="ruleForm.isAssignProductionPlace"
              @change="handleRuleFormChange"
            />
            <el-form-item
              label="指定产地"
              label-width="60px"
              class="item-content"
            >
              <ht-autocomplete
                v-model="ruleForm.assignProductionPlace"
                :fetch-suggestions="autocompleteSearchProductionPlace"
                :disabled="!ruleForm.isAssignProductionPlace"
                :trigger-on-focus="false"
                placeholder="请选择"
                highlight-first-item
                clearable
                @change="handleRuleFormChange"
              />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label-width="0">
          <div class="item-container">
            <el-checkbox
              v-model="ruleForm.isAssignWarehouse"
              @change="handleRuleFormChange"
            />
            <el-form-item
              label="指定仓库"
              label-width="60px"
              class="item-content"
            >
              <ht-autoselect
                v-model="ruleForm.assignWarehouseId"
                :disabled="!ruleForm.isAssignWarehouse"
                :fetch-suggestions="
                  query =>
                    searchLoadAllWarehouses(query, Number(this.companyId || 0))
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                filter-zero
                highlight-first-item
                @change="handleRuleFormChange"
              />
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <div slot="remark" style="font-size: 13px">
      数据要求：<br />
      1、导入数据必须需包含：供应商、配件编码、配件名称、数量、进价、仓库。<br /><br />
      数据说明：<br />
      1、在导入时每一行数据都将按照配件编码、品牌和产地这3个字段与系统所存储的配件数据进行匹配，3个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。<br />
      2、若有任意配件采购信息导入成功，导入成功的配件将生成采购单。<br /><br />
      导入设置说明：<br />
      1、供应商，支付方式，发票信息是采购单表头信息。<br />
      2、若开启“自动创建不存在的配件资料”则系统将自动与本地配件资料进行对比，若不存在该配件则新增配件资料。<br />
      3、若勾选指定产地\品牌\仓库，则导入资料品牌将设置为该指定产地\品牌\仓库信息。若仅仅勾选未指定数据，则信息将以右侧导入对应字段数据为准。<br /><br />
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
import { CooperatorsSelect } from "@/components/select";
import { reqPurchaseSupplierDefault } from "@/api/purchase/suppliersDefault";
import { receiveFilters } from "@/utils/tool";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "BillingImportBox",
  components: {
    ImportBox,
    CooperatorsSelect
  },
  mixins: [searchMixin],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    companyId: [String, Number]
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        cooperatorId: [
          { required: true, message: "请选择供应商", trigger: "blur" }
        ],
        enhancedSettlementType: [
          { required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        invoiceType: [
          { required: true, message: "请选择发票类型", trigger: "blur" }
        ]
      },
      autoFocus: false,
      replaceData: {}
    };
  },
  computed: {
    isCanClickImport() {
      return this.$refs.ruleForm && this.isValidate();
    }
  },
  watch: {
    "$attrs.visible"(value) {
      if (value) {
        this.ruleForm = { ...this.value };
        this.autoFocus = true;
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
    billHeadersUpdateWithCooperator(val) {
      if (!val) return;
      reqPurchaseSupplierDefault(val).then(res => {
        const params = receiveFilters(res);
        this.ruleForm = {
          ...this.ruleForm,
          enhancedSettlementType: params.enhancedSettlementType,
          invoiceType: params.invoiceType
        };
        this.handleRuleFormChange();
      });
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
      this.replaceData = {
        isAssignBrand: this.ruleForm.isAssignBrand,
        assignBrand: this.ruleForm.assignBrand,
        isAssignProductionPlace: this.ruleForm.isAssignProductionPlace,
        assignProductionPlace: this.ruleForm.assignProductionPlace,
        isAssignWarehouse: this.ruleForm.isAssignWarehouse,
        assignWarehouseId: this.ruleForm.assignWarehouseId
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  &::v-deep .el-checkbox {
    margin-right: 10px;
  }
}
.item-content {
  flex: 1;
}
</style>
