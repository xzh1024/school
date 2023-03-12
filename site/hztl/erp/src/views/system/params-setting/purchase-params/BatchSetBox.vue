<script>
import { LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS } from "../constants";

export default {
  name: "BatchSetBox",
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
            <el-radio-group v-model={this.ruleForm.lastPriceFromAllCompanies}>
              {LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
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
    width: 300px;
  }
}
</style>
