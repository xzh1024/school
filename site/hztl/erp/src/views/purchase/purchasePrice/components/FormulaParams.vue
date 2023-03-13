<template>
  <div class="border-container">
    <div class="border-title">
      <span class="border-title-text">
        公式参数
      </span>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-width="71px"
      label-position="left"
      class="form-item-small-margin-bottom"
    >
      <el-form-item v-if="!isBatch" prop="name" label="公式名称">
        <ht-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item v-if="!isBatch" prop="scopeType" label="公式类型">
        <ht-autoselect
          v-model="ruleForm.scopeType"
          :options="scopeTypes"
          :trigger-on-focus="false"
          placeholder="请选择"
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="作用公司" prop="companyId">
        <ht-autoselect
          v-model="ruleForm.companyId"
          :disabled="isEdit"
          :options="store().allCompanies()"
          :trigger-on-focus="false"
          placeholder="作用公司"
          highlight-first-item
          filter-zero
        />
      </el-form-item>
      <el-form-item label="公式设置" required>
        <ht-table
          :index-column="false"
          :data="priceTypesTable"
          :columns="priceTypesColumns"
          v-bind="$attrs"
          v-on="$listeners"
        />
        <div>
          <el-checkbox
            v-model="ruleForm.isRound"
            label="售价取整（四舍五入）"
            prop="isRound"
          />
        </div>
        <div>
          <el-checkbox
            :disabled="!canSync"
            v-model="ruleForm.isSync"
            label="同步更新当前库存中的商品价格"
            prop="isSync"
          />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SCOPETYPES } from "@/constants";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "FormulaParams",
  mixins: [searchMixin],
  props: {
    formulaData: {
      type: Object,
      required: true
    },
    isBatch: Boolean,
    isEdit: Boolean
  },
  data() {
    return {
      scopeTypes: SCOPETYPES,
      priceTypes: [
        { name: "进货单价", id: 1 },
        { name: "正厂价", id: 2 }
      ],
      priceTypesTable: [
        { prop: "retailPrice", name: "零售价", base: "", raiseRate: "" },
        { prop: "transferPrice", name: "调拨价", base: "", raiseRate: "" },
        { prop: "platformPrice", name: "平台价", base: "", raiseRate: "" },
        { prop: "wholeSalePrice", name: "批发价", base: "", raiseRate: "" },
        { prop: "wholeSalePrice1", name: "批发价一", base: "", raiseRate: "" },
        { prop: "wholeSalePrice2", name: "批发价二", base: "", raiseRate: "" },
        { prop: "wholeSalePrice3", name: "批发价三", base: "", raiseRate: "" },
        { prop: "wholeSalePrice4", name: "批发价四", base: "", raiseRate: "" }
      ]
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"]),
    ...mapState("admin/baseData", ["companies"]),
    ruleForm: {
      get() {
        return this.formulaData;
      },
      set() {}
    },
    canCreate() {
      return true;
    },
    canSync() {
      return true;
    },
    rules() {
      if (this.isBatch) {
        return {
          companyId: [
            { required: true, message: "请选择作用公司！", trigger: "change" }
          ]
        };
      } else {
        return {
          name: [
            { required: true, message: "请输入公式名称！", trigger: "change" }
          ],
          scopeType: [
            { required: true, message: "请选择公式类型！", trigger: "change" }
          ],
          companyId: [
            { required: true, message: "请选择作用公司！", trigger: "change" }
          ]
        };
      }
    },
    priceTypesColumns() {
      const baseColumn = {
        prop: "base",
        label: "进价类型",
        width: 120,
        render: (value, row) => {
          return (
            <ht-autoselect
              v-model={this.ruleForm.formulas[row.prop].base}
              options={this.priceTypes}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              filter-zero
            />
          );
        }
      };
      const raiseRateColumn = {
        prop: "raiseRate",
        label: "加价比例(%)",
        width: 90,
        render: (value, row) => {
          return (
            <HtFormatNumber
              v-model={this.ruleForm.formulas[row.prop].raiseRate}
              precision-type="percentage"
              placeholder="如：25"
              min={-100}
            />
          );
        }
      };
      const prcieColumn = {
        prop: "price",
        label: "价格",
        width: 210,
        render: (value, row) => {
          return (
            <HtFormatNumber
              v-model={this.ruleForm.formulas[row.prop]}
              precision-type="price"
            />
          );
        }
      };
      if (this.isBatch) {
        return [{ prop: "name", label: "售价类型", width: 70 }, prcieColumn];
      } else {
        return [
          { prop: "name", label: "售价类型", width: 70 },
          baseColumn,
          raiseRateColumn
        ];
      }
    }
  },
  watch: {
    formulaData: {
      handler(value) {
        if (!value) return;
        this.ruleForm = { ...value };
        if (!this.ruleForm.companyId) {
          this.setDefaultCompanyIds();
        }
        setTimeout(() => {
          this.$refs.ruleForm.clearValidate();
        }, 100);
      },
      immediate: true
    },
    canCreate(val) {
      this.$emit("can-create", val);
    }
  },
  methods: {
    store() {
      return store;
    },
    setDefaultCompanyIds() {
      this.ruleForm.companyId = store.userInfoMsg().companyId;
    },
    getValidate() {
      let validate = true;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          const keys = Object.keys(this.ruleForm.formulas);
          if (this.isBatch) {
            keys.some(item => {
              const isEmpty = ["", null, undefined].includes(
                this.ruleForm.formulas[item]
              );
              if (isEmpty) {
                this.priceTypesTable.some(priceItem => {
                  const result = priceItem.prop === item;
                  if (result) {
                    this.$message.warning({
                      message: `请输入${priceItem.name}！`,
                      showClose: true
                    });
                    validate = false;
                  }
                  return result;
                });
              }
              return isEmpty;
            });
          } else {
            if (
              !keys.some(
                item =>
                  this.ruleForm.formulas[item].raiseRate ||
                  this.ruleForm.formulas[item].raiseRate === 0
              )
            ) {
              this.$message.warning({
                message: "请设置至少一条售价类型！",
                showClose: true
              });
              validate = false;
            }
          }
        } else {
          validate = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return validate;
    }
  }
};
</script>
