<script>
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";
import * as store from "@/utils/store";

const defaultRuleForm = {
  companyId: null,
  companyName: "",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  cooperatorId: null,
  cooperatorName: "",
  cooperators: [],
  paymentType: 0,
  businessDate: dateFormat(new Date()),
  amount: "",
  businessManId: 0,
  remark: ""
};

export default {
  name: "SupplementBox",
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    supplement: {
      type: Object,
      default() {
        return {};
      }
    },
    settlementType: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validAmount = (rule, value, callback) => {
      const msg = "金额不能为0";
      if (value) {
        if (value === "0") {
          callback(new Error(msg));
        } else {
          callback();
        }
      } else if (value === 0) {
        callback(new Error(msg));
      } else {
        callback(new Error(rule.message));
      }
    };

    return {
      ruleForm: { ...defaultRuleForm },
      rules: {
        companyId: [{ required: true, message: "请选择业务公司" }],
        settleCooperatorId: [{ required: true, message: "请选择往来分公司" }],
        logisticsCompanyId: [{ required: true, message: "请选择物流公司" }],
        cooperatorId: [{ required: true, message: "请选择往来单位" }],
        paymentType: [{ required: true, message: "请选择收付标识" }],
        businessDate: [{ required: true, message: "请选择业务日期" }],
        amount: [
          { required: true, validator: validAmount, message: "请输入金额" }
        ]
      },
      companyFocus: true,
      cooperatorFocus: false,
      amountFocus: false
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
        this.initData();
      } else {
        this.cooperatorFocus = false;
        this.companyFocus = false;
        this.amountFocus = false;
      }
    }
  },
  methods: {
    initData() {
      if (this.supplement.companyId || this.supplement.settleCooperatorId) {
        this.ruleForm = { ...defaultRuleForm, ...this.supplement };
      } else {
        this.ruleForm = { ...defaultRuleForm };
      }
      if (this.ruleForm.cooperators.length === 1) {
        this.ruleForm.cooperatorId = this.ruleForm.cooperators[0].id;
        this.ruleForm.cooperatorName = this.ruleForm.cooperators[0].name;
      }
      this.setDefaultDate();
      this.$nextTick(() => {
        this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        if (this.ruleForm.cooperatorId) {
          this.amountFocus = true;
          this.companyFocus = false;
          this.cooperatorFocus = false;
        } else if (!this.supplement.companyId) {
          this.companyFocus = true;
          this.amountFocus = false;
          this.cooperatorFocus = false;
        } else {
          this.cooperatorFocus = true;
          this.companyFocus = false;
          this.amountFocus = false;
        }
      });
    },
    setDefaultDate() {
      this.ruleForm.businessDate = dateFormat(new Date());
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.$emit("sure", this.ruleForm);
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
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
        title="补充登记"
        width="400px"
        append-to-body
      >
        <el-form
          ref="ruleForm"
          attrs={{
            model: this.ruleForm,
            rules: this.rules
          }}
          size="mini"
          show-message={false}
          label-position="left"
          label-width="85px"
          class="form-item-small-margin-bottom"
        >
          {this.settlementType === 2 ? (
            <el-form-item prop="settleCooperatorId" label="往来分公司">
              <ht-autoselect
                v-model={this.ruleForm.settleCooperatorId}
                disabled={!!this.supplement.settleCooperatorId}
                defaultValue={this.ruleForm.settleCooperatorName}
                on={{
                  "update:defaultValue": val =>
                    (this.ruleForm.settleCooperatorName = val)
                }}
                options={store.otherBranchCompanies()}
                v-delay-focus={this.companyFocus}
                trigger-on-focus={false}
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          ) : (
            <el-form-item
              prop="companyId"
              label={this.supplement.companyId ? "对账公司" : "业务公司"}
            >
              <ht-autoselect
                v-model={this.ruleForm.companyId}
                disabled={!!this.supplement.companyId}
                defaultValue={this.ruleForm.companyName}
                on={{
                  "update:defaultValue": val =>
                    (this.ruleForm.companyName = val)
                }}
                options={store.allCompanies()}
                v-delay-focus={this.companyFocus}
                trigger-on-focus={false}
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          )}
          {this.settlementType === 1 ? (
            <el-form-item prop="logisticsCompanyId" label="物流公司">
              <ht-autoselect
                v-model={this.ruleForm.logisticsCompanyId}
                disabled={!!this.supplement.logisticsCompanyId}
                defaultValue={this.ruleForm.logisticsCompanyName}
                on={{
                  "update:defaultValue": val =>
                    (this.ruleForm.logisticsCompanyName = val)
                }}
                fetch-suggestions={query =>
                  this.searchLoadOnlyLogisticsCooperators(query)
                }
                trigger-on-focus={false}
                remote
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          ) : null}
          {this.settlementType === 2 ? null : (
            <el-form-item prop="cooperatorId" label="往来单位">
              {this.supplement.companyId ? (
                <ht-autoselect
                  v-model={this.ruleForm.cooperatorId}
                  disabled={!!this.supplement.cooperatorId}
                  defaultValue={this.ruleForm.cooperatorName}
                  on={{
                    "update:defaultValue": val =>
                      (this.ruleForm.cooperatorName = val)
                  }}
                  options={this.ruleForm.cooperators}
                  v-delay-focus={this.cooperatorFocus}
                  trigger-on-focus={false}
                  filter-zero
                  highlight-first-item
                />
              ) : (
                <ht-autoselect
                  v-model={this.ruleForm.cooperatorId}
                  defaultValue={this.ruleForm.cooperatorName}
                  on={{
                    "update:defaultValue": val =>
                      (this.ruleForm.cooperatorName = val)
                  }}
                  fetch-suggestions={query =>
                    this.searchLoadAllTypesCooperators(query)
                  }
                  v-delay-focus={this.cooperatorFocus}
                  trigger-on-focus={false}
                  remote
                  filter-zero
                  highlight-first-item
                />
              )}
            </el-form-item>
          )}
          <el-form-item prop="paymentType" label="收付标识">
            <el-radio-group v-model={this.ruleForm.paymentType}>
              <el-radio label={0}>应收</el-radio>
              <el-radio label={1}>应付</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="businessDate" label="业务日期">
            <el-date-picker
              v-model={this.ruleForm.businessDate}
              clearable={false}
              editable={false}
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item prop="amount" label="金额">
            <HtFormatNumber
              v-model={this.ruleForm.amount}
              v-delay-focus={this.amountFocus}
              precision-type="money"
            />
          </el-form-item>
          <el-form-item prop="businessManId" label="业务员">
            <ht-autoselect
              v-model={this.ruleForm.businessManId}
              options={store.allStaffs()}
              trigger-on-focus={false}
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
            />
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <ht-input
              v-model={this.ruleForm.remark}
              placeholder="最大支持100个字符"
              maxlength="100"
            />
          </el-form-item>
        </el-form>

        <div style="margin-top: 10px; text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
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
