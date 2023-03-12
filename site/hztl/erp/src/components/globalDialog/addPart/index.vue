<template>
  <ht-dialog
    :visible.sync="visible"
    title="新增配件资料"
    width="400px"
    top="7vh"
  >
    <div v-switch-focus="focusData">
      <el-form
        ref="partForm"
        :model="formData"
        :rules="rules"
        :show-message="false"
        size="mini"
        label-width="85px"
        label-position="left"
        class="search-box compact-form"
      >
        <Collapse :is-collapse.sync="isCollapse">
          <el-form-item label="配件编码" prop="code">
            <ht-input
              v-model="formData.code"
              class="switch-focus focus-code"
              maxlength="20"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="配件名称" prop="name">
            <ht-autocomplete
              v-model="formData.name"
              :fetch-suggestions="autocompleteSearchPartName"
              :trigger-on-focus="false"
              :maxlength="50"
              class="switch-focus"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="车型" prop="vehModel">
            <ht-autocomplete
              v-model="formData.vehModel"
              :fetch-suggestions="autocompleteSearchVehModel"
              :trigger-on-focus="false"
              :maxlength="50"
              class="switch-focus"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="适用车型" prop="avaVehModel">
            <ht-input
              v-model="formData.avaVehModel"
              class="switch-focus"
              maxlength="1000"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="产地" prop="productionPlace">
            <ht-autocomplete
              v-model="formData.productionPlace"
              :fetch-suggestions="autocompleteSearchProductionPlace"
              :trigger-on-focus="false"
              :maxlength="50"
              class="switch-focus"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="配件品牌" prop="brand">
            <ht-autoselect
              v-model="formData.brand"
              :options="store().partBrandDictionary()"
              :trigger-on-focus="false"
              class="switch-focus"
              clearable
              mnemonic
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <template v-slot:collapse>
            <el-form-item label="英文名称">
              <ht-input
                v-model="formData.enName"
                class="switch-focus"
                maxlength="50"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="部位码" prop="posCode">
              <ht-input
                v-model="formData.posCode"
                class="switch-focus"
                maxlength="20"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="规格">
              <ht-input
                v-model="formData.model"
                class="switch-focus"
                maxlength="20"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="发动机型号" prop="engineNo">
              <ht-input
                v-model="formData.engineNo"
                class="switch-focus"
                maxlength="20"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="配件分类" prop="categoryName">
              <ht-autoselect
                v-model="formData.categoryName"
                :fetch-suggestions="searchLoadCategory"
                remote
                filter-zero
                clearable
                :trigger-on-focus="false"
                highlight-first-item
                class="switch-focus"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="计量单位" prop="unit">
              <ht-autocomplete
                v-model="formData.unit"
                :fetch-suggestions="autocompletePartUnit"
                :trigger-on-focus="false"
                class="switch-focus"
                clearable
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="正厂价">
              <htFormatNumber
                v-model="formData.priceFactory"
                :min="0"
                class="switch-focus"
                precision-type="price"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="库存上限">
              <htFormatNumber
                v-model="formData.stockTopLimit"
                type="number"
                class="switch-focus"
                maxlength="5"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="库存下限" prop="stockLowerLimit">
              <htFormatNumber
                v-model="formData.stockLowerLimit"
                type="number"
                class="switch-focus"
                maxlength="5"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="备注">
              <ht-input
                v-model="formData.remark"
                class="switch-focus"
                maxlength="200"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </template>
        </Collapse>
      </el-form>
      <div class="dialog-footer-align" style="margin-top: 10px;">
        <el-button
          :loading="submitLoading"
          class="switch-focus focus-button"
          type="primary"
          plain
          size="mini"
          @click="submitForm()"
        >
          确定（F3）
        </el-button>
        <el-button size="mini" type="primary" plain @click="closeDialog()">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import hotkeys from "hotkeys-js";
import debounce from "throttle-debounce/debounce";
import { reqPartsUpdate } from "@/api/parts";
import { precisionsFixed, searchMixin } from "@/mixins";
import { codeValidator } from "@/utils/partBasic";
import { validateParseInt } from "@/utils/validate";
import { mnemonicSearch } from "@/utils/filterData";
import eventBus from "@/event";
// import { formateRules } from "@/utils/validate";
import Collapse from "../../collapse";
import { cacheIsCollapse, loadIsCollapse } from "@/utils/isCollapse";
import * as store from "@/utils/store";

let lastKeyScope;

const defaultFormData = {
  isPurchase: true,
  isSale: true
};

export default Vue.extend({
  name: "QuickAddPart",
  components: {
    Collapse
  },
  mixins: [searchMixin, precisionsFixed],
  data() {
    const validatorStockTopLimit = (rule, value, callback) => {
      if (value) {
        if (validateParseInt(value) && Number(value) > 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          this.$message.warning({ message: rule.message, showClose: true });
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };
    const validatorStockLowerLimit = (rule, value, callback) => {
      if (value) {
        if (this.formData.stockTopLimit) {
          if (
            validateParseInt(value) &&
            Number(value) <= Number(this.formData.stockTopLimit)
          ) {
            callback();
          } else {
            // 需要返回错误信息
            callback(new Error(rule.message));
            this.$message.warning({ message: rule.message, showClose: true });
          }
        } else {
          callback();
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };

    return {
      keyScope: Symbol("quickAddPart"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      isCollapse: false,
      submitLoading: false,
      visible: false,
      specialValue: null,
      formData: {
        ...defaultFormData
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入配件编码",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入配件名称",
            trigger: "change"
          }
        ],
        stockLowerLimit: [
          {
            validator: validatorStockLowerLimit,
            message: "库存下限需为整数且不能超过库存上限",
            trigger: "change"
          }
        ],
        stockTopLimit: [
          {
            validator: validatorStockTopLimit,
            message: "库存上限需为整数且不能为0",
            trigger: "change"
          }
        ],
        posCode: [{ validator: codeValidator, trigger: "change" }],
        engineNo: [{ validator: codeValidator, trigger: "change" }]
      },
      hasShowDilog: false
    };
  },
  computed: {
    priceRmb() {
      if (this.formData.currency && this.formData.priceFactory) {
        const curCurrency = store
          .currencyDictionary()
          .find(item => item.name === this.formData.currency);
        return this.precisionFormat(
          this.formData.priceFactory * curCurrency.specialValue,
          "money"
        );
      } else {
        return 0;
      }
    }
  },
  watch: {
    visible: {
      handler(value, oldValue) {
        if (value) {
          lastKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          setTimeout(() => {
            this.updateFocusData({
              initial: "focus-code"
            });
          }, 200);
        } else if (oldValue) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    },
    isCollapse() {
      cacheIsCollapse(this.isCollapse, "QuickAddPart");
    },
    "formData.brand"(val) {
      if (
        !store
          .partBrandDictionary()
          .map(item => item.id)
          .includes(val)
      ) {
        store.partBrandDictionary().unshift({
          id: val,
          name: val
        });
      }
    }
  },
  mounted() {
    this.isCollapse = loadIsCollapse(this.isCollapse, "QuickAddPart");
    this.bindKeyboard();
    eventBus.$on("no-match-part", this.showDilog);
    eventBus.$on("direct-add-part", this.directShowDilog);
  },
  destroyed() {
    eventBus.$off("no-match-part", this.showDilog);
    eventBus.$on("direct-add-part", this.directShowDilog);
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    store() {
      return store;
    },
    autocompletePartUnit(query, cb) {
      cb(
        mnemonicSearch(store.unitDictionary(), query).map(item => ({
          value: item.name
        }))
      );
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    bindKeyboard() {
      hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.submitForm();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          default:
            return;
        }
      });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    showDilog(params) {
      if (this.hasShowDilog) return;
      this.hasShowDilog = true;

      this.$confirm("没查询到相关配件，是否新增？", "无查询结果提示", {
        type: "warning"
      })
        .then(() => {
          this.formData = {
            ...params.condsBeforeAgg.parts,
            ...defaultFormData,
            categoryName:
              params.condsBeforeAgg.parts.categoryName ||
              defaultFormData.categoryName
          };
          this.visible = true;
          this.hasShowDilog = false;
        })
        .catch(() => {
          this.hasShowDilog = false;
        });
    },
    directShowDilog(formData) {
      this.formData = {
        ...formData,
        ...defaultFormData
      };
      this.visible = true;
    },
    handleRate(value) {
      this.specialValue = value;
    },
    closeDialog() {
      this.visible = false;
    },
    submitForm() {
      this.$refs.partForm.validate((valid, err) => {
        if (valid) {
          this.submitHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    submitHandle() {
      if (this.submitLoading) {
        return;
      }
      this.submitLoading = true;
      const needToStringkeys = [
        "weight",
        "volume",
        "height",
        "width",
        "length"
      ];
      const params = {
        ...this.formData,
        vehModels: this.formData.vehModel ? [this.formData.vehModel] : undefined
      };
      needToStringkeys.forEach(key => {
        if (params[key]) {
          params[key] = params[key].toString();
        }
      });
      reqPartsUpdate(params)
        .then(() => {
          this.submitLoading = false;
          this.$message.success({ message: "新增配件成功" });
          // 新增成功后更新字典
          this.loadDictionary({ type: "partBrand", isReload: true });
          this.loadDictionary({ type: "productionPlace", isReload: true });
          eventBus.$emit(
            "quickAddPartRes",
            {
              name: params.name,
              code: params.code,
              vehModel: params.vehModel || params.avaVehModel
            },
            this.$route.path
          );
          this.closeDialog();
        })
        .catch(() => {
          this.submitLoading = false;
        });
    }
  }
});
</script>
<style lang="stylus" scoped>
.bottom-button-operating {
    text-align: right;
}
</style>
