<script>
import {
  CREDIT_LINE_CTRL_OPTIONS,
  NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS,
  COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS,
  SETTLE_AUTO_REVIEW_OPTIONS
} from "../constants";

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
            {this.paramsType === "creditBalanceAlarmPercent" ? (
              <div class="slider-container">
                <div style="margin-right: 15px;">0%</div>
                <el-slider
                  v-model={this.ruleForm.creditBalanceAlarmPercent}
                  format-tooltip={this.formatTooltip}
                  max={100}
                  min={0}
                />
                <div style="margin-left: 15px;">100%</div>
              </div>
            ) : this.paramsType === "creditLineCtrl" ? (
              <el-radio-group
                v-show={this.paramsType === "creditLineCtrl"}
                v-model={this.ruleForm.creditLineCtrl}
              >
                {CREDIT_LINE_CTRL_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "newCooperatorAllowOnAccount" ? (
              <el-checkbox-group
                v-show={this.paramsType === "newCooperatorAllowOnAccount"}
                v-model={this.ruleForm.newCooperatorAllowOnAccount}
                style="height: 28px;"
              >
                {NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS.map(item => (
                  <el-checkbox label={item.id}>{item.name}</el-checkbox>
                ))}
              </el-checkbox-group>
            ) : this.paramsType === "cooperatorOnTickByOverAccount" ? (
              <el-radio-group
                v-show={this.paramsType === "cooperatorOnTickByOverAccount"}
                v-model={this.ruleForm.cooperatorOnTickByOverAccount}
              >
                {COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "settleAutoReview" ? (
              <el-radio-group
                v-show={this.paramsType === "settleAutoReview"}
                v-model={this.ruleForm.settleAutoReview}
              >
                {SETTLE_AUTO_REVIEW_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
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
