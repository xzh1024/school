<script>
import {
  SYSTEM_PARAMS_SETTING_PARAMETERS_LIST,
  CREDIT_LINE_CTRL_OPTIONS,
  NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS,
  COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS,
  ALLOC_SUPPLEMENT_MUST_AUDIT_OPTIONS,
  ALLOC_OUT_SETTLE_BEFORE_ALLOC_IN_OPTIONS,
  SETTLE_AUTO_REVIEW_OPTIONS
} from "../constants";

export default {
  name: "Parameters",
  props: {
    paramsType: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    paramsTableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Financial`
    };
  },
  computed: {
    tableColumns() {
      return SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.columns.map(item => {
        if (item.label === "参数值") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <el-form
                  attrs={{
                    model: row
                  }}
                  size="mini"
                  label-width="0"
                  size="mini"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item>
                    <div
                      v-show={this.paramsType === "creditBalanceAlarmPercent"}
                      class="slider-container"
                    >
                      <div style="margin-right: 15px;">0%</div>
                      <el-slider
                        v-model={row.creditBalanceAlarmPercent}
                        format-tooltip={this.formatTooltip}
                        max={100}
                        min={0}
                      />
                      <div style="margin-left: 15px;">100%</div>
                    </div>
                    <el-radio-group
                      v-show={this.paramsType === "creditLineCtrl"}
                      v-model={row.creditLineCtrl}
                    >
                      {CREDIT_LINE_CTRL_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <el-checkbox-group
                      v-show={this.paramsType === "newCooperatorAllowOnAccount"}
                      v-model={row.newCooperatorAllowOnAccount}
                      style="height: 28px;"
                    >
                      {NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS.map(item => (
                        <el-checkbox label={item.id}>{item.name}</el-checkbox>
                      ))}
                    </el-checkbox-group>
                    <el-radio-group
                      v-show={
                        this.paramsType === "cooperatorOnTickByOverAccount"
                      }
                      v-model={row.cooperatorOnTickByOverAccount}
                    >
                      {COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <el-radio-group
                      v-show={this.paramsType === "settleAutoReview"}
                      v-model={row.settleAutoReview}
                    >
                      {SETTLE_AUTO_REVIEW_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            )
          };
        }
        return item;
      });
    },
    ruleForm: {
      get() {
        return this.params;
      },
      set() {}
    },
    tableData: {
      get() {
        return this.paramsTableData;
      },
      set() {}
    }
  },
  methods: {
    formatTooltip(val) {
      return `${val}%`;
    },
    handleSelectChange(val) {
      this.$emit("rows-change", val);
    }
  },
  render() {
    return (
      <div style="height: 100%;">
        <el-form
          attrs={{
            model: this.ruleForm
          }}
          size="mini"
          label-width="110px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item
            v-show={this.paramsType === "allocSupplementMustAudit"}
            label=""
            label-width="0"
          >
            <el-radio-group v-model={this.ruleForm.allocSupplementMustAudit}>
              {ALLOC_SUPPLEMENT_MUST_AUDIT_OPTIONS.map(item => (
                <div class="radio-container">
                  <el-radio label={item.id}>{item.name}</el-radio>
                </div>
              ))}
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show={this.paramsType === "allocOutSettleBeforeAllocIn"}
            label=""
            label-width="0"
          >
            <el-radio-group v-model={this.ruleForm.allocOutSettleBeforeAllocIn}>
              {ALLOC_OUT_SETTLE_BEFORE_ALLOC_IN_OPTIONS.map(item => (
                <div class="radio-container">
                  <el-radio label={item.id}>{item.name}</el-radio>
                </div>
              ))}
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show={[
              "creditBalanceAlarmPercent",
              "creditLineCtrl",
              "newCooperatorAllowOnAccount",
              "cooperatorOnTickByOverAccount",
              "settleAutoReview"
            ].includes(this.paramsType)}
            label="新增公司默认值"
          >
            <div
              v-show={this.paramsType === "creditBalanceAlarmPercent"}
              class="slider-container"
            >
              <div style="margin-right: 15px;">0%</div>
              <el-slider
                v-model={this.ruleForm.creditBalanceAlarmPercent}
                format-tooltip={this.formatTooltip}
                max={100}
                min={0}
              />
              <div style="margin-left: 15px;">100%</div>
            </div>
            <el-radio-group
              v-show={this.paramsType === "creditLineCtrl"}
              v-model={this.ruleForm.creditLineCtrl}
            >
              {CREDIT_LINE_CTRL_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-checkbox-group
              v-show={this.paramsType === "newCooperatorAllowOnAccount"}
              v-model={this.ruleForm.newCooperatorAllowOnAccount}
              style="height: 28px;"
            >
              {NEW_COOPERATOR_ALLOW_ON_ACCOUNT_OPTIONS.map(item => (
                <el-checkbox label={item.id}>{item.name}</el-checkbox>
              ))}
            </el-checkbox-group>
            <el-radio-group
              v-show={this.paramsType === "cooperatorOnTickByOverAccount"}
              v-model={this.ruleForm.cooperatorOnTickByOverAccount}
            >
              {COOPERATOR_ON_TICK_BY_OVER_ACCOUNT_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "settleAutoReview"}
              v-model={this.ruleForm.settleAutoReview}
            >
              {SETTLE_AUTO_REVIEW_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
          </el-form-item>
        </el-form>

        <ht-setting-table
          v-show={[
            "creditBalanceAlarmPercent",
            "creditLineCtrl",
            "newCooperatorAllowOnAccount",
            "cooperatorOnTickByOverAccount",
            "settleAutoReview"
          ].includes(this.paramsType)}
          tableName={this.tableName}
          columns={this.tableColumns}
          data={this.tableData}
          on-selectChange={this.handleSelectChange}
          selectionType="multiple"
          style="height: calc(100% - 30px);"
        />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.radio-container {
  & + .radio-container {
    margin-top: 10px;
  }
}
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 250px;
  }
}
</style>
