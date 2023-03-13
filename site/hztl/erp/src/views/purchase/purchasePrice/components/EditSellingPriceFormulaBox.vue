<template>
  <ht-dialog
    v-bind="$attrs"
    :title="title"
    width="1140px"
    append-to-body
    top="7vh"
    v-on="$listeners"
  >
    <el-row :gutter="5" style="margin-bottom: 10px; height: 530px;">
      <el-col :span="9" style="height: 100%">
        <FormulaParams
          ref="refFormulaParams"
          :formulaData="formulaData"
          :isEdit="!isAdd"
          :isBatch="isBatch"
          style="height: 100%"
          @can-create="handleCanCreate"
          @formula-data-change="handleFormulaDataChange"
        />
      </el-col>
      <el-col :span="15" style="height: 100%">
        <ScopeParts
          ref="refScopeParts"
          :formulaData="formulaData"
          :isBatch="isBatch"
          style="height: 100%"
          @formula-data-change="handleFormulaDataChange"
        />
      </el-col>
    </el-row>
    <div class="text-content text-font-primary" v-show="!isBatch">
      售价 = 进价 *（1 + 加价比例）
    </div>
    <el-form>
      <div style="text-align: center;">
        <el-button
          :loading="sureLoading"
          :disabled="!canCreate"
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
    </el-form>
  </ht-dialog>
</template>

<script>
import { FormulaParams, ScopeParts } from "./index";
import {
  reqPurchasePriceDefineCreate,
  reqPurchasePriceDefineDetails,
  reqPurchasePriceDefineUpdate,
  reqPurchasePriceFixedCreate
} from "@/api/purchase/purchasePrice";
import { divide, multiply } from "@/utils/numberAPI";
import { cloneDeep } from "lodash";

const defaultFormulaData = {
  name: "",
  scopeType: null,
  companyId: null,
  formulas: {
    retailPrice: {
      base: 1,
      raiseRate: ""
    },
    transferPrice: {
      base: 1,
      raiseRate: ""
    },
    platformPrice: {
      base: 1,
      raiseRate: ""
    },
    wholeSalePrice: {
      base: 1,
      raiseRate: ""
    },
    wholeSalePrice1: {
      base: 1,
      raiseRate: ""
    },
    wholeSalePrice2: {
      base: 1,
      raiseRate: ""
    },
    wholeSalePrice3: {
      base: 1,
      raiseRate: ""
    },
    wholeSalePrice4: {
      base: 1,
      raiseRate: ""
    }
  },
  isRound: true,
  isSync: false,
  partIds: [],
  brands: [],
  categoryIds: [],
  partSet: [],
  categorySet: [],
  brandSet: []
};

export default {
  name: "EditSellingPriceFormulaBox",
  components: {
    FormulaParams,
    ScopeParts
  },
  props: {
    isBatch: Boolean,
    isAdd: Boolean,
    formulaId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sureLoading: false,
      formulaData: cloneDeep(defaultFormulaData),
      canCreate: true
    };
  },
  computed: {
    title() {
      return this.isBatch
        ? "批量设置固定价格"
        : this.isAdd
        ? "新增公式"
        : "编辑公式";
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.initData();
        }
      },
      immediate: true
    }
  },
  methods: {
    handleCanCreate(val) {
      this.canCreate = val;
    },
    initData() {
      if (this.formulaId) {
        reqPurchasePriceDefineDetails(this.formulaId).then(data => {
          const oldFormulas = this.formulaData.formulas;
          const newFormula = data.formulas || {};
          const formulas = {};
          const keys = Object.keys(oldFormulas);
          keys.forEach(item => {
            if (newFormula[item]) {
              formulas[item] = {
                ...oldFormulas[item],
                raiseRate: newFormula[item].raiseRate
                  ? multiply(Number(newFormula[item].raiseRate), 100, 4)
                  : 0
              };
            } else {
              formulas[item] = {
                ...oldFormulas[item]
              };
            }
          });
          data.formulas = formulas;
          this.formulaData = {
            ...cloneDeep(defaultFormulaData),
            ...data
          };
          if (this.formulaData.categorySet?.length) {
            this.formulaData.categorySet = this.formulaData.categorySet.map(
              item => ({
                ...item,
                name: item.name || item.id
              })
            );
          }
        });
      } else {
        this.formulaData = cloneDeep(defaultFormulaData);
        if (this.isBatch) {
          const formulas = {};
          const keys = Object.keys(this.formulaData.formulas);
          keys.forEach(item => {
            formulas[item] = "";
          });
          this.formulaData.formulas = formulas;
        }
      }
    },
    handleFormulaDataChange(val) {
      this.formulaData = val;
    },
    sureHandle() {
      if (!this.isAdd && !this.canCreate) {
        const msg = this.isBatch ? "设置固定价格" : "新增公式";
        this.$message.error({ message: `您没有权限${msg}` });
        return;
      }
      if (
        !this.$refs.refFormulaParams.getValidate() ||
        !this.$refs.refScopeParts.getValidate()
      ) {
        return;
      }
      this.sureLoading = true;
      if (this.isBatch) {
        reqPurchasePriceFixedCreate(this.formulaData)
          .then(data => {
            this.sureLoading = false;
            this.$emit("on-success", data);
            this.cancelHandle();
            this.$message({
              type: "success",
              message: "批量设置成功",
              showClose: true
            });
          })
          .catch(() => {
            this.sureLoading = false;
          });
      } else {
        const formulas = {};
        const keys = Object.keys(this.formulaData.formulas);
        keys.forEach(item => {
          if (
            !["", null, undefined].includes(
              this.formulaData.formulas[item].raiseRate
            )
          ) {
            formulas[item] = {
              ...this.formulaData.formulas[item],
              raiseRate: this.formulaData.formulas[item].raiseRate
                ? divide(Number(this.formulaData.formulas[item].raiseRate), 100)
                : 0
            };
          }
        });
        if (this.isAdd) {
          reqPurchasePriceDefineCreate({
            ...this.formulaData,
            formulas
          })
            .then(() => {
              this.sureLoading = false;
              this.$emit("on-success");
              this.cancelHandle();
              this.$message({
                type: "success",
                message: `创建公式 ${this.formulaData.name} 成功！`,
                showClose: true
              });
            })
            .catch(() => {
              this.sureLoading = false;
            });
        } else {
          reqPurchasePriceDefineUpdate({
            ...this.formulaData,
            formulas,
            id: this.formulaId
          })
            .then(() => {
              this.sureLoading = false;
              this.$emit("on-success");
              this.cancelHandle();
              this.$message({
                type: "success",
                message: "更新公式成功！",
                showClose: true
              });
            })
            .catch(() => {
              this.sureLoading = false;
            });
        }
      }
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.text-content
    margin-bottom: -24px
    width: 200px
</style>
