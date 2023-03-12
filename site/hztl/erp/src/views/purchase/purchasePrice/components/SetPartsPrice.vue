<template>
  <ht-dialog
    v-bind="$attrs"
    title="设置固定售价"
    class="dialog-body"
    append-to-body
    width="650px"
    v-on="$listeners"
  >
    <div class="container-box">
      <el-row :gutter="5" style="height: 404px;">
        <el-col :span="12" style="height: 100%">
          <ht-card title="配件信息" style="height: 100%;overflow-y:auto">
            <div
              style="margin-bottom:10px;"
              v-for="(table, idx) in tableData"
              :key="idx"
            >
              <ht-table
                :data="table"
                :columns="tableColumns"
                :show-header="false"
                :index-column="false"
                :selection-type="null"
              />
            </div>
          </ht-card>
        </el-col>
        <el-col :span="12" style="height: 100%;">
          <ht-card title="固定售价" style="height: 100%;">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              :show-message="false"
              class="form-item-small-margin-bottom"
              size="mini"
              label-width="80px"
              label-position="left"
            >
              <el-form-item label="作用分公司" prop="companyId">
                <ht-autoselect
                  :disabled="isEdit"
                  v-model="ruleForm.companyId"
                  :options="store().allCompanies()"
                  :trigger-on-focus="false"
                  placeholder="默认当前分公司"
                  highlight-first-item
                  filter-zero
                />
              </el-form-item>
              <el-form-item label="零售价" prop="retail">
                <HtFormatNumber
                  v-model="ruleForm.retail"
                  precision-type="price"
                  :disabled="allPriceFlag"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="平台价" prop="platform">
                <HtFormatNumber
                  v-model="ruleForm.platform"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="调拨价" prop="allot">
                <HtFormatNumber
                  v-model="ruleForm.allot"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="批发价" prop="wholesale">
                <HtFormatNumber
                  v-model="ruleForm.wholesale"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="批发价一" prop="wholesale1">
                <HtFormatNumber
                  v-model="ruleForm.wholesale1"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="批发价二" prop="wholesale2">
                <HtFormatNumber
                  v-model="ruleForm.wholesale2"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="批发价三" prop="wholesale3">
                <HtFormatNumber
                  v-model="ruleForm.wholesale3"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-form-item label="批发价四" prop="wholesale4">
                <HtFormatNumber
                  v-model="ruleForm.wholesale4"
                  precision-type="price"
                  :min="0"
                  :disabled="allPriceFlag"
                />
              </el-form-item>
              <el-row align="middle" type="flex" class="m-t-6">
                <el-col :span="12">
                  <el-checkbox v-model="allPriceFlag" label="统一设置价格" />
                </el-col>
                <el-col :span="12">
                  <HtFormatNumber
                    v-model="allPrice"
                    size="mini"
                    precision-type="price"
                    :min="0"
                    :disabled="!allPriceFlag"
                  />
                </el-col>
              </el-row>
              <el-row align="middle" type="flex" class="m-t-6">
                <el-col :span="10">
                  <el-checkbox
                    v-model="ruleForm.isCover"
                    label="相同配件进行覆盖"
                  />
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-checkbox
                    v-model="ruleForm.isSync"
                    label="同步更新库存价格"
                  />
                </el-col>
              </el-row>
            </el-form>
          </ht-card>
        </el-col>
      </el-row>
      <div class="dialog-footer-align" style="margin: 5px 0">
        <el-button type="primary" size="mini" plain @click.stop="sureHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
const defaultRuleForm = {
  retail: "",
  allot: "",
  platform: "",
  wholesale: "",
  wholesale1: "",
  wholesale2: "",
  wholesale3: "",
  wholesale4: "",
  isSync: false,
  isCover: true
};
import * as store from "@/utils/store";
export default {
  name: "EditFixedPriceBox",
  props: {
    editData: {
      type: Array,
      default() {
        return [];
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      tableColumns: [
        { prop: "name", label: "", width: 70 },
        {
          prop: "content",
          label: "",
          width: 140,
          classNames: "text-font-primary"
        }
      ],
      allPrice: null,
      allPriceFlag: false,
      ruleForm: { ...defaultRuleForm },
      rules: {
        retail: [
          { required: true, message: "请输入零售价！", trigger: "change" }
        ],
        allot: [
          { required: true, message: "请输入调拨价！", trigger: "change" }
        ],
        platform: [
          { required: true, message: "请输入平台价！", trigger: "change" }
        ],
        wholesale: [
          { required: true, message: "请输入批发价！", trigger: "change" }
        ],
        wholesale1: [
          { required: true, message: "请输入批发价一！", trigger: "change" }
        ],
        wholesale2: [
          { required: true, message: "请输入批发价二！", trigger: "change" }
        ],
        wholesale3: [
          { required: true, message: "请输入批发价三！", trigger: "change" }
        ],
        wholesale4: [
          { required: true, message: "请输入批发价四！", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    tableData() {
      return this.editData.map(data => {
        return [
          { name: "配件编码", content: data.code },
          { name: "配件名称", content: data.name },
          { name: "配件品牌", content: data.brand },
          { name: "产地", content: data.productionPlace }
        ];
      });
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.allPrice = 0;
          this.allPriceFlag = false;
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
            this.ruleForm = {
              ...defaultRuleForm,
              ...this.editData[0]?.salePrices,
              companyId: this.editData[0]?.companyId
            };
          });
        }
      },
      immediate: true
    },
    allPrice(value) {
      if (value === null) return;
      this.ruleForm.retail = value;
      this.ruleForm.allot = value;
      this.ruleForm.platform = value;
      this.ruleForm.wholesale = value;
      this.ruleForm.wholesale1 = value;
      this.ruleForm.wholesale2 = value;
      this.ruleForm.wholesale3 = value;
      this.ruleForm.wholesale4 = value;
    }
  },
  methods: {
    store() {
      return store;
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          const salePrices = { ...this.ruleForm };
          this.$emit(
            "on-change",
            {
              retailPrice: salePrices.retail,
              transferPrice: salePrices.allot,
              platformPrice: salePrices.platform,
              wholeSalePrice: salePrices.wholesale,
              wholeSalePrice1: salePrices.wholesale1,
              wholeSalePrice2: salePrices.wholesale2,
              wholeSalePrice3: salePrices.wholesale3,
              wholeSalePrice4: salePrices.wholesale4
            },
            this.editData,
            {
              isCover: salePrices.isCover,
              isSync: salePrices.isSync,
              companyId: salePrices.companyId
            }
          );
          this.cancelHandle();
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

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
