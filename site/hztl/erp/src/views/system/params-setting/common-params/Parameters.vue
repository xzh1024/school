<script>
import {
  AUTO_SUBMIT_WHEN_CLOSE_OPTIONS,
  BILL_NO_RULE_OPTIONS,
  BILL_PRINT_FLOW_OPTIONS,
  BUSIBESS_MAN_CHANGEABLE_OPTIONS,
  DEFAULT_BUSINESS_MAN_OPTIONS,
  QUERY_DEFAULT_MONTHS,
  QUERY_DEFAULT_DAYS_FOR_BILL,
  MODIFIABLE_AFTER_PRINT_OPTIONS,
  SYSTEM_PARAMS_SETTING_PARAMETERS_LIST
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
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Common`
    };
  },
  computed: {
    tableColumns() {
      return SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.columns.map(item => {
        if (item.label === "参数值") {
          return {
            ...item,
            label:
              this.paramsType === "queryDefaultDaysForBill"
                ? "参数值（最多不超过365天）"
                : item.label,
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
                    <el-radio-group
                      v-show={this.paramsType === "businessManChangeable"}
                      v-model={row.businessManChangeable}
                    >
                      {BUSIBESS_MAN_CHANGEABLE_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <el-radio-group
                      v-show={this.paramsType === "defaultBusinessMan"}
                      v-model={row.defaultBusinessMan}
                    >
                      {DEFAULT_BUSINESS_MAN_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <div
                      v-show={this.paramsType === "queryDefaultMonths"}
                      class="slider-container"
                    >
                      <el-slider
                        v-model={row.queryDefaultMonths}
                        step={QUERY_DEFAULT_MONTHS.step}
                        max={QUERY_DEFAULT_MONTHS.max}
                        min={QUERY_DEFAULT_MONTHS.min}
                      />
                      <div style="margin-left: 15px;">
                        {row.queryDefaultMonths}月
                      </div>
                    </div>
                    <div v-show={this.paramsType === "queryDefaultDaysForBill"}>
                      <el-input-number
                        v-model={row.queryDefaultDaysForBill}
                        min={QUERY_DEFAULT_DAYS_FOR_BILL.min}
                        max={QUERY_DEFAULT_DAYS_FOR_BILL.max}
                        step={QUERY_DEFAULT_DAYS_FOR_BILL.step}
                        step-strictly
                        controls-position="right"
                        placeholder="请输入"
                        style="width: 200px;"
                        on-blur={() =>
                          this.onQueryDefaultDaysForBillChange(row)
                        }
                      />
                    </div>
                    <el-radio-group
                      v-show={this.paramsType === "modifiableAfterPrint"}
                      v-model={row.modifiableAfterPrint}
                    >
                      {MODIFIABLE_AFTER_PRINT_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <el-radio-group
                      v-show={this.paramsType === "autoSubmitWhenClose"}
                      v-model={row.autoSubmitWhenClose}
                    >
                      {AUTO_SUBMIT_WHEN_CLOSE_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                    <ht-autoselect
                      v-show={this.paramsType === "billPrintFlow"}
                      v-model={row.billPrintFlow}
                      options={BILL_PRINT_FLOW_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
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
    handleSelectChange(val) {
      this.$emit("rows-change", val);
    },
    onQueryDefaultDaysForBillChange(obj) {
      if (!obj.queryDefaultDaysForBill) {
        obj.queryDefaultDaysForBill = QUERY_DEFAULT_DAYS_FOR_BILL.min;
      }
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
            v-show={this.paramsType === "billNoRule"}
            label=""
            label-width="0"
          >
            <el-radio-group v-model={this.ruleForm.billNoRule}>
              {BILL_NO_RULE_OPTIONS.map(item => (
                <div class="radio-container">
                  <el-radio label={item.id}>{item.name}</el-radio>
                </div>
              ))}
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show={[
              "businessManChangeable",
              "defaultBusinessMan",
              "queryDefaultMonths",
              "queryDefaultDaysForBill",
              "modifiableAfterPrint",
              "autoSubmitWhenClose",
              "billPrintFlow"
            ].includes(this.paramsType)}
            label="新增公司默认值"
          >
            <el-radio-group
              v-show={this.paramsType === "businessManChangeable"}
              v-model={this.ruleForm.businessManChangeable}
            >
              {BUSIBESS_MAN_CHANGEABLE_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "defaultBusinessMan"}
              v-model={this.ruleForm.defaultBusinessMan}
            >
              {DEFAULT_BUSINESS_MAN_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <div
              v-show={this.paramsType === "queryDefaultMonths"}
              class="slider-container"
            >
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
            <div v-show={this.paramsType === "queryDefaultDaysForBill"}>
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
            </div>
            <el-radio-group
              v-show={this.paramsType === "modifiableAfterPrint"}
              v-model={this.ruleForm.modifiableAfterPrint}
            >
              {MODIFIABLE_AFTER_PRINT_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "autoSubmitWhenClose"}
              v-model={this.ruleForm.autoSubmitWhenClose}
            >
              {AUTO_SUBMIT_WHEN_CLOSE_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <ht-autoselect
              v-show={this.paramsType === "billPrintFlow"}
              v-model={this.ruleForm.billPrintFlow}
              options={BILL_PRINT_FLOW_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
          </el-form-item>
        </el-form>

        <ht-setting-table
          v-show={[
            "businessManChangeable",
            "defaultBusinessMan",
            "queryDefaultMonths",
            "queryDefaultDaysForBill",
            "modifiableAfterPrint",
            "autoSubmitWhenClose",
            "billPrintFlow"
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
    width: 300px;
  }
}
</style>
