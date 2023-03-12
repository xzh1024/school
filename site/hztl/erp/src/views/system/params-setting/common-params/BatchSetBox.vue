<script>
import {
  AUTO_SUBMIT_WHEN_CLOSE_OPTIONS,
  BILL_PRINT_FLOW_OPTIONS,
  BUSIBESS_MAN_CHANGEABLE_OPTIONS,
  DEFAULT_BUSINESS_MAN_OPTIONS,
  QUERY_DEFAULT_MONTHS,
  QUERY_DEFAULT_DAYS_FOR_BILL,
  MODIFIABLE_AFTER_PRINT_OPTIONS
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
    onQueryDefaultDaysForBillChange(obj) {
      if (!obj.queryDefaultDaysForBill) {
        obj.queryDefaultDaysForBill = QUERY_DEFAULT_DAYS_FOR_BILL.min;
      }
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
            {this.paramsType === "businessManChangeable" ? (
              <el-radio-group v-model={this.ruleForm.businessManChangeable}>
                {BUSIBESS_MAN_CHANGEABLE_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "defaultBusinessMan" ? (
              <el-radio-group v-model={this.ruleForm.defaultBusinessMan}>
                {DEFAULT_BUSINESS_MAN_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "queryDefaultMonths" ? (
              <div class="slider-container">
                <el-slider
                  v-model={this.ruleForm.queryDefaultMonths}
                  step={QUERY_DEFAULT_MONTHS.step}
                  max={QUERY_DEFAULT_MONTHS.max}
                  min={QUERY_DEFAULT_MONTHS.min}
                />
                <div style="margin-left: 15px;">
                  {this.ruleForm.queryDefaultMonths}月
                </div>
              </div>
            ) : this.paramsType === "queryDefaultDaysForBill" ? (
              <el-input-number
                v-model={this.ruleForm.queryDefaultDaysForBill}
                min={QUERY_DEFAULT_DAYS_FOR_BILL.min}
                max={QUERY_DEFAULT_DAYS_FOR_BILL.max}
                step={QUERY_DEFAULT_DAYS_FOR_BILL.step}
                step-strictly
                controls-position="right"
                placeholder="请输入"
                style="width: 200px;"
                on-blur={() =>
                  this.onQueryDefaultDaysForBillChange(this.ruleForm)
                }
              />
            ) : this.paramsType === "modifiableAfterPrint" ? (
              <el-radio-group v-model={this.ruleForm.modifiableAfterPrint}>
                {MODIFIABLE_AFTER_PRINT_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "autoSubmitWhenClose" ? (
              <el-radio-group v-model={this.ruleForm.autoSubmitWhenClose}>
                {AUTO_SUBMIT_WHEN_CLOSE_OPTIONS.map(item => (
                  <el-radio label={item.id}>{item.name}</el-radio>
                ))}
              </el-radio-group>
            ) : this.paramsType === "billPrintFlow" ? (
              <ht-autoselect
                v-model={this.ruleForm.billPrintFlow}
                options={BILL_PRINT_FLOW_OPTIONS}
                trigger-on-focus={false}
                placeholder="请选择"
                highlight-first-item
                style="width: 200px;"
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
    width: 300px;
  }
}
</style>
