<script>
import searchMixin from "@/mixins/searchMixin";
import * as store from "@/utils/store";

export default {
  name: "BatchSetBox",
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    paramsType: {
      type: String,
      required: true
    },
    defaultParams: {
      type: Object,
      required: true
    },
    canSave: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ruleForm: { ...this.defaultParams }
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.ruleForm = { ...this.defaultParams };
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return `${val}%`;
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canSave) {
        return;
      }
      this.$emit("sure", this.ruleForm);
      this.cancelHandle();
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="批量设置参数"
        width="450px"
      >
        <el-form
          attrs={{
            model: this.ruleForm
          }}
          size="mini"
          label-width="60px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="参数值">
            {this.paramsType === "noUpProperties" ? (
              <ht-select
                v-model={this.ruleForm.noUpProperties}
                options={store.propertyDictionary()}
                placeholder="请选择"
                style="width: 250px;"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
              />
            ) : this.paramsType === "noUpWarehouses" ? (
              <ht-select
                v-model={this.ruleForm.noUpWarehouses}
                options={store.administerWareHouse()}
                placeholder="请选择"
                style="width: 250px;"
                filterable
                multiple
                collapse-tags
              />
            ) : this.paramsType === "noUpPriceTypesOfZero" ? (
              <ht-select
                v-model={this.ruleForm.noUpPriceTypesOfZero}
                options={store.priceTypeDictionary()}
                placeholder="请选择"
                style="width: 250px;"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
              />
            ) : this.paramsType === "customerDefaultPriceType" ? (
              <ht-autoselect
                v-model={this.ruleForm.customerDefaultPriceType}
                options={store.priceTypeDictionary()}
                trigger-on-focus={false}
                highlight-first-item
                placeholder="请选择"
                style="width: 250px;"
                clearable
              />
            ) : this.paramsType === "allocatingPriceRaiseRatio" ? (
              <ht-percent-input
                v-model={this.ruleForm.allocatingPriceRaiseRatio}
                style="width: 250px;"
              />
            ) : null}
          </el-form-item>
        </el-form>

        <div style="margin-top: 10px; text-align: center;">
          <el-button
            disabled={!this.canSave}
            plain
            type="primary"
            size="mini"
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            plain
            type="primary"
            size="mini"
            on-click={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 250px;
  }
}
</style>
