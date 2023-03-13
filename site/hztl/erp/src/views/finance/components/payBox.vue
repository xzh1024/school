<template>
  <ht-dialog
    :visible.sync="relVisible"
    :title="title"
    class="dialog-body ignore-top-hotkeys"
    width="1050px"
    height="450px"
    append-to-body
  >
    <div v-switch-focus="focusData">
      <el-row :gutter="5">
        <el-col :span="8" style="height: 100%">
          <ht-card title="单据信息" style="padding-bottom: 5px; height: 100%">
            <ht-table
              :data="tableData"
              :columns="tableColumns"
              :show-header="false"
              :index-column="false"
              :selection-type="null"
              :key-scope="keyScope"
              :cell-class-name="cellClassName"
              @hotkeysUp="bindKeyboard"
            />
          </ht-card>
        </el-col>
        <el-col :span="16" style="height: 100%">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            :show-message="false"
            class="form-item-small-margin-bottom"
            label-width="71px"
            size="mini"
            label-position="left"
          >
            <ht-card title="结算信息" style="height: 40%">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="结算日期" prop="settleDate">
                    <el-date-picker
                      v-model="formData.settleDate"
                      :clearable="false"
                      :editable="false"
                      type="date"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="支付方式" prop="enhancedSettlementType">
                    <ht-autoselect
                      v-model="formData.enhancedSettlementType"
                      :clearable="false"
                      :trigger-on-focus="false"
                      :options="paymentList"
                      class="switch-focus focus-enhancedSettlementType"
                      placeholder="请选择"
                      :disabled="!isPay"
                      mnemonic
                      highlight-first-item
                      @intput-enter="debouncedHandleInputEnter"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <table
                cellspacing="0"
                cellpadding="0"
                style="width: 100%;"
                class="settle-fundAccounts-table"
              >
                <tr>
                  <th colspan="3" class="pay">
                    付款公司：{{ formData.payCompany }}
                  </th>
                  <th :colspan="isPay ? '2' : '1'" class="receive">
                    收款公司：{{ formData.receiveCompany }}
                  </th>
                </tr>
                <tr>
                  <th width="40"></th>
                  <th class="pay">付款账户</th>
                  <th class="pay">付款金额</th>
                  <th class="receive">收款账户</th>
                  <th width="64" v-if="isPay"></th>
                </tr>
                <tr v-for="(list, ind) in formData.fundAccounts" :key="ind">
                  <td>{{ ind + 1 }}</td>
                  <td>
                    <el-select
                      v-model="list.payFundAccountId"
                      filterable
                      size="mini"
                      placeholder="请选择账户"
                      :disabled="!isPay"
                      style="width: 180px"
                    >
                      <el-option
                        v-for="(op, i) in accountsOptions"
                        :key="i"
                        :label="op.name"
                        :value="op.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <ht-format-number
                      v-model="list.amount"
                      :disabled="!isPay"
                      :min="0"
                      :max="formData.allAmount"
                      precision-type="money"
                      size="mini"
                      style="width: 120px"
                      @focus="accountAmountFocus"
                      @blur="accountAmountBlur"
                      @change="accountAmountChange"
                    />
                  </td>
                  <td>
                    <el-select
                      v-model="list.receiveFundAccountId"
                      filterable
                      size="mini"
                      placeholder="请选择账户"
                      style="width: 180px"
                    >
                      <el-option
                        v-for="(op, i) in relateAccountsOptions"
                        :key="i"
                        :label="op.name"
                        :value="op.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td v-if="isPay">
                    <el-link
                      :underline="false"
                      v-if="
                        formData.fundAccounts.length < 5 &&
                          ind == formData.fundAccounts.length - 1
                      "
                      type="primary"
                    >
                      <i
                        class="el-icon-circle-plus-outline"
                        @click="addAccount"
                      ></i>
                    </el-link>
                    <el-link
                      :underline="false"
                      v-if="formData.fundAccounts.length > 1"
                      type="danger"
                    >
                      <i class="el-icon-delete" @click="delAccount(ind)"></i>
                    </el-link>
                  </td>
                </tr>
              </table>

              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="合计付款" prop="totalAmount">
                    <ht-format-number
                      v-model="formData.totalAmount"
                      :disabled="true"
                      :min="0"
                      class="switch-focus focus-totalAmount"
                      precision-type="money"
                    />
                  </el-form-item>
                  <el-form-item label="优惠金额" prop="discountAmount">
                    <ht-format-number
                      v-model="formData.discountAmount"
                      :disabled="isFreight || !isPay"
                      :min="0"
                      :max="formData.allAmount"
                      class="switch-focus focus-discountAmount"
                      precision-type="money"
                      @blur="discountChange"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="付款人" prop="payBy">
                    <ht-input
                      :disabled="!isPay"
                      v-model="formData.payBy"
                      class="switch-focus focus-payBy"
                      placeholder="付款人"
                      maxlength="30"
                    />
                  </el-form-item>
                  <el-form-item label="收款人" prop="receiveBy">
                    <ht-input
                      v-model="formData.receiveBy"
                      class="switch-focus focus-receiveBy"
                      placeholder="收款人"
                      maxlength="30"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="付款备注" prop="payRemark">
                    <ht-input
                      :disabled="!isPay"
                      v-model="formData.payRemark"
                      class="switch-focus focus-payRemark"
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                  <el-form-item label="收款备注" prop="receiveRemark">
                    <ht-input
                      v-model="formData.receiveRemark"
                      class="switch-focus focus-receiveRemark"
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </ht-card>
          </el-form>
        </el-col>
      </el-row>
      <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
        <el-button
          v-loading="submitLoading"
          class="switch-focus focus-button"
          type="primary"
          size="mini"
          plain
          @click="submit()"
        >
          确定（F3）
        </el-button>
        <el-button
          type="primary"
          size="mini"
          v-if="isPay"
          plain
          @click="cancel()"
        >
          取消（Esc）
        </el-button>
        <el-button type="primary" size="mini" v-else plain @click="refuse()">
          拒绝
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import debounce from "throttle-debounce/debounce";
import { dateFormat } from "@/utils/date";
import {
  payStatementsDb,
  rePayStatementsDb,
  payStatementsRefuse,
  payStatementsReceive,
  loadPaymentDetail
} from "@/api/finance/payment";
import { loadCompanyFundAccounts } from "@/api/finance/basicSetting";
import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import { subtract, add } from "@/utils/numberAPI";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

let lastKeyScope;
const defaultFocusData = {
  updateIndex: 0,
  initial: "focus-button",
  type: null
};

export default {
  name: "payBox",
  mixins: [baseDataMixin, precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isLogistics: Boolean,
    isFreight: Boolean,
    payData: {
      type: Object,
      default() {
        return {
          statementId: 0,
          rpType: 0
        };
      }
    },
    keyScope: {
      type: Symbol,
      default() {
        return Symbol("payBox");
      }
    }
  },
  data() {
    const validateDisAmount = (rule, value, callback) => {
      if (["", undefined, null].includes(this.formData.discountAmount)) {
        callback(new Error("请输入优惠金额！"));
      } else if (
        add(this.formData.discountAmount || 0, this.formData.totalAmount || 0) >
        this.formData.allAmount
      ) {
        callback(new Error("优惠金额+结算金额不能超出应结金额！"));
      } else if (Number(this.formData.discountAmount || 0) < 0) {
        callback("优惠金额不能小于0！");
      } else {
        callback();
      }
    };
    const validateAmount = (rule, value, callback) => {
      if (["", undefined, null].includes(this.formData.totalAmount)) {
        callback(new Error("请输入结算金额！"));
      } else if (
        add(this.formData.totalAmount || 0, this.formData.discountAmount || 0) >
        this.formData.allAmount
      ) {
        callback(new Error("优惠金额+结算金额不能超出应结金额！"));
      } else if (Number(this.formData.totalAmount || 0) < 0) {
        callback("结算金额不能小于0！");
      } else {
        if (this.$refs.form && this.formData.discountAmount !== "") {
          this.$refs.form.validateField("discountAmount");
        }
        callback();
      }
    };
    const rules = {
      settleDate: [
        {
          required: true,
          message: "请选择结算日期!",
          trigger: "change"
        }
      ],
      enhancedSettlementType: [
        {
          required: true,
          message: "请选择支付方式!",
          trigger: "change"
        }
      ],
      totalAmount: [
        {
          required: true,
          message: "",
          trigger: "change"
        }
      ],
      settledAmount: [
        {
          required: true,
          message: "请输入结算金额！",
          trigger: "change"
        },
        {
          validator: validateAmount,
          trigger: "change"
        }
      ],
      payFundAccountId: [
        {
          required: true,
          message: "请选择付款账户！",
          trigger: "change"
        }
      ],
      receiveFundAccountId: [
        {
          required: true,
          message: "请选择收款账户！",
          trigger: "change"
        }
      ],
      discountAmount: [
        {
          required: true,
          message: "请输入优惠金额！",
          trigger: "change"
        },
        {
          validator: validateDisAmount,
          trigger: "change"
        }
      ]
    };
    return {
      submitLoading: false,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      isDisabled: false,
      focusData: {
        ...defaultFocusData
      },
      formData: {},
      rules: rules,
      tableColumns: [
        { prop: "name", label: "", width: "80" },
        { prop: "content", label: "", width: "230" }
      ],
      unSettledAmount: 0,
      accountsOptions: [],
      relateAccountsOptions: [],
      oldAmount: 0,
      editStatus: false // 用户是否手动更改价格
    };
  },
  computed: {
    tableData: {
      get() {
        let columns = [
          { name: "单号", content: this.formData.statementNo },
          {
            name: "业务类型",
            content: this.payData?.rpType === 0 ? "调拨入库单" : "调拨出库单"
          },
          {
            name: "制单公司",
            content: this.formData.createCompany
          },
          {
            name: "调出公司",
            content: this.formData.receiveCompany
          },
          {
            name: "调入公司",
            content: this.formData.payCompany
          },
          {
            name: "应结金额",
            content: this.formData.allAmount
          },
          {
            name: "结算金额",
            content: this.formData.settledAmount
          },
          // {
          //   name: "优惠金额",
          //   content: this.formData.discountAmount
          // },
          {
            name: "未结金额",
            content: this.unSettledAmount
          }
        ];
        const reasonColumn = {
          name: "收款驳回原因",
          content: this.formData.refuseReason
        };
        if (this.formData.status === 1) {
          columns = [...columns, reasonColumn];
        }
        return columns;
      },
      set() {}
    },
    title() {
      return this.payData?.rpType === 0 ? "付款" : "收款确认";
    },
    isPay() {
      return this.payData?.rpType === 0;
    },
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    paymentList() {
      return store
        .enhancedSettlementTypeDictionary()
        .filter(item => item.name.indexOf("现付") > -1);
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value) {
          this.initData();
          lastKeyScope = hotkeys.getScope();
          this.updateFocusData({
            initial: "focus-button"
          });
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.clearValidate();
          });
          hotkeys.setScope(this.keyScope);
        } else if (lastKeyScope) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    this.$store.dispatch("admin/baseData/loadAll");
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    bindKeyboard(e) {
      switch (e.code) {
        case "F3":
          this.submit();
          break;
        case "ArrowUp":
          this.updateFocusData({ type: "up" });
          break;
        case "ArrowDown":
          e.preventDefault();
          this.updateFocusData({ type: "down" });
          break;
        default:
          return;
      }
    },
    cellClassName({ row, columnIndex }) {
      if (columnIndex !== 1) return;
      switch (row.name) {
        case "应结金额":
          return "text-font-primary";
        case "结算金额":
          return "text-font-warning";
        case "优惠金额":
          return "text-font-success";
        case "未结金额":
          return "text-font-danger";
        default:
          return;
      }
    },
    async loadAccounts() {
      this.accountsOptions =
        (
          await loadCompanyFundAccounts({
            companyId: this.formData ? this.formData.payCompanyId : null
          })
        ).accounts.map(item => ({
          id: item.id,
          name: item.fundAccountName,
          isDefault: item.isDefault
        })) || [];
      this.relateAccountsOptions =
        (
          await loadCompanyFundAccounts({
            companyId: this.formData ? this.formData.receiveCompanyId : null
          })
        ).accounts.map(item => ({
          id: item.id,
          name: item.fundAccountName,
          isDefault: item.isDefault
        })) || [];
      this.setDefultAccount();
    },
    // 默认账户
    setDefultAccount() {
      let fundAccount =
        this.accountsOptions &&
        this.accountsOptions.length &&
        this.accountsOptions.find(item => item.isDefault);
      if (!fundAccount) {
        fundAccount = this.accountsOptions[0];
      }
      let relateAccount =
        this.relateAccountsOptions &&
        this.relateAccountsOptions.length &&
        this.relateAccountsOptions.find(item => item.isDefault);
      if (!relateAccount) {
        relateAccount = this.relateAccountsOptions[0];
      }
      if (!this.formData.fundAccounts) {
        this.formData.fundAccounts = [];
        this.formData.fundAccounts.push({
          payFundAccountId: fundAccount?.id || null,
          receiveFundAccountId: relateAccount?.id || null,
          amount: this.formData.allAmount || 0
        });
      }
    },
    initData() {
      loadPaymentDetail(this.payData).then(res => {
        this.formData = {
          ...res
        };
        if (!this.formData.enhancedSettlementType) {
          this.formData.enhancedSettlementType = this.paymentList[0].id;
        }
        this.formData.allAmount = this.precisionFormat(
          Number(this.formData.allAmount) > 0
            ? Number(this.formData.allAmount)
            : -Number(this.formData.allAmount),
          "money"
        );
        this.formData.settleDate = dateFormat(new Date());
        this.loadAccounts();
        if (this.payData.rpType === 0) {
          //支付
          this.formData.totalAmount = this.formData.allAmount;
          this.formData.discountAmount = 0;
        } else {
          //收款
          this.formData.totalAmount = Number(res.amount);
          this.formData.discountAmount = Number(res.discount);
        }
        this.editStatus = false;
        // console.log(this.formData);
        this.setUnSettledAmount();
      });
    },
    setUnSettledAmount() {
      this.formData.settledAmount = this.precisionFormat(
        add(this.formData.totalAmount || 0, this.formData.discountAmount || 0),
        "money"
      );
      this.unSettledAmount = this.precisionFormat(
        subtract(
          this.formData.allAmount || 0,
          add(this.formData.totalAmount || 0, this.formData.discountAmount || 0)
        ),
        "money"
      );
    },
    addAccount() {
      this.formData.fundAccounts.push({
        payFundAccountId: null,
        amount: this.unSettledAmount > 0 ? this.unSettledAmount : 0,
        receiveFundAccountId: null
      });
      this.accountAmountChange();
    },
    delAccount(i) {
      this.formData.fundAccounts.splice(i, 1);
      this.accountAmountChange();
    },
    getSum(total, num) {
      return num >= 0
        ? this.precisionFormat(add(total, num), "money")
        : this.precisionFormat(add(total, 0), "money");
    },
    accountAmountFocus() {
      if (
        this.formData.fundAccounts &&
        this.formData.fundAccounts.length == 1
      ) {
        this.oldAmount = this.formData.fundAccounts[0].amount;
      }
      console.log(this.oldAmount);
    },
    accountAmountBlur() {
      if (
        this.formData.fundAccounts &&
        this.formData.fundAccounts.length == 1
      ) {
        console.log(this.formData.fundAccounts[0].amount);
        if (this.oldAmount != this.formData.fundAccounts[0].amount) {
          this.editStatus = true;
        }
      }
    },
    accountAmountChange() {
      const nums = this.formData.fundAccounts.map(item => item.amount);
      this.formData.totalAmount = nums.reduce(this.getSum, 0);
      this.setUnSettledAmount();
    },
    discountChange() {
      if (
        !this.editStatus &&
        this.formData.fundAccounts &&
        this.formData.fundAccounts.length == 1
      ) {
        this.formData.discountAmount = this.formData.discountAmount || 0;
        if (this.formData.discountAmount >= this.formData.allAmount) {
          this.formData.totalAmount = 0;
          this.formData.fundAccounts.filter(item => (item.amount = 0));
        } else {
          this.formData.totalAmount = subtract(
            this.formData.allAmount,
            this.formData.discountAmount
          );
          const nums = this.formData.fundAccounts.map(item => item.amount);
          const sum = nums.reduce(this.getSum, 0);
          if (subtract(this.formData.totalAmount, sum) < 0) {
            // 减
            for (let i = this.formData.fundAccounts.length - 1; i >= 0; i--) {
              const nums = this.formData.fundAccounts.map(item => item.amount);
              const sum = nums.reduce(this.getSum, 0);
              let money = subtract(sum, this.formData.totalAmount);
              if (money > 0) {
                if (this.formData.fundAccounts[i].amount >= money) {
                  this.formData.fundAccounts[i].amount -= this.precisionFormat(
                    money,
                    "money"
                  );
                  money = 0;
                } else {
                  this.formData.fundAccounts[i].amount = 0;
                  money -= this.formData.fundAccounts[i].amount;
                }
              }
            }
          }
          if (subtract(this.formData.totalAmount, sum) > 0) {
            // 加
            this.formData.fundAccounts[
              this.formData.fundAccounts.length - 1
            ].amount += subtract(this.formData.totalAmount, sum);
          }
        }
      }
      this.handleAmountChange();
    },
    handleAmountChange() {
      this.setUnSettledAmount();
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    cancel() {
      this.close(false);
    },
    refuse() {
      this.$prompt("请输入收款拒绝原因", "提示", {
        inputType: "textarea",
        inputValidator: val => {
          if (!val) {
            return "请输入收款拒绝原因！";
          } else {
            return true;
          }
        }
      })
        .then(({ value }) => {
          payStatementsRefuse({
            statementId: this.payData.statementId,
            reason: value
          })
            .then(() => {
              this.$message.success({ message: "拒绝成功！", showClose: true });
              this.close(false);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    close(res) {
      this.relVisible = false;
      this.$emit("settle-res", res);
      this.submitLoading = false;
    },
    submit() {
      if (this.formData.fundAccounts.length > 0) {
        let count = 0;
        if (Number(this.formData.totalAmount) > 0) {
          // 有收款金额
          for (let i = 0; i < this.formData.fundAccounts.length; i++) {
            const item = this.formData.fundAccounts[i];
            if (item.amount == 0 || item.amount == undefined) {
              this.formData.fundAccounts.splice(i--, 1);
              count++;
            }
          }
        } else {
          for (let i = 0; i < this.formData.fundAccounts.length; i++) {
            const item = this.formData.fundAccounts[i];
            item.amount = 0;
            if (i > 0) {
              this.formData.fundAccounts.splice(i--, 1);
              count++;
            }
          }
        }
        if (count > 0) {
          this.$message.warning({
            message: "已自动去除无效账户，请确认！",
            showClose: true
          });
          return;
        }
      }
      if (!this.isDataValidate()) {
        return;
      }
      // if (this.isPay && !this.formData.payFundAccountId) {
      //   this.$message.warning({ message: "请选择付款账户", showClose: true });
      //   return;
      // } else if (!this.isPay && !this.formData.receiveFundAccountId) {
      //   this.$message.warning({ message: "请选择收款账户", showClose: true });
      //   return;
      // }
      if (this.formData.fundAccounts?.length > 0) {
        let isNull = false;
        this.formData.fundAccounts.forEach(item => {
          if (
            item.payFundAccountId == 0 ||
            item.payFundAccountId == null ||
            item.receiveFundAccountId == 0 ||
            item.receiveFundAccountId == null
          ) {
            isNull = true;
          }
        });
        if (isNull) {
          this.$message.warning({
            message: "有账户未选择，请检查！",
            showClose: true
          });
          return;
        }
      }
      if (this.isPay) {
        if (Number(this.unSettledAmount) >= 0) {
          this.submitLoading = true;
          const params = {
            settleDate: this.formData.settleDate,
            enhancedSettlementType: this.formData.enhancedSettlementType,
            // settleAmount: this.formData.settledAmount,
            discountAmount: this.formData.discountAmount,
            payStatementId: this.payData.statementId,
            // payFundAccountId: this.formData.payFundAccountId,
            payName: this.formData.payBy,
            payRemark: this.formData.payRemark,
            // receiveFundAccountId: this.formData.receiveFundAccountId,
            receiveName: this.formData.receiveBy,
            receiveRemark: this.formData.receiveRemark,
            fundAccounts: this.formData.fundAccounts
          };
          if (this.formData.status === 0) {
            //代付款
            payStatementsDb(params)
              .then(() => {
                this.submitLoading = false;
                this.$message.success(" 支付成功！");
                this.close(true);
              })
              .catch(() => {
                this.submitLoading = false;
              });
          } else if (this.formData.status === 1) {
            //收款驳回
            rePayStatementsDb(params)
              .then(() => {
                this.submitLoading = false;
                this.$message.success("重新支付成功！");
                this.close(true);
              })
              .catch(() => {
                this.submitLoading = false;
              });
          }
        } else {
          this.$message.warning({
            message: "应结余额不能小于0，请重输入结算金额或优惠金额！",
            showClose: true
          });
        }
      } else {
        const params = {
          statementId: this.payData.statementId,
          // receiveFundAccountId: this.formData.receiveFundAccountId,
          receiveName: this.formData.receiveBy,
          receiveRemark: this.formData.receiveRemark,
          fundAccounts: this.formData.fundAccounts
        };
        payStatementsReceive(params)
          .then(() => {
            this.submitLoading = false;
            this.$message.success("确认成功！");
            this.close(true);
          })
          .catch(() => {
            this.submitLoading = false;
          });
      }
    },
    isDataValidate() {
      if (!this.$refs.form) return;
      let flag = true;
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
          setTimeout(() => {
            const input = this.$refs.form.$el.querySelector(".is-error input");
            input?.focus();
          });
        }
      });
      return flag;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 5px !important;
    background-color: #e7ebed !important;
  }
}
::v-deep {
  .settle-fundAccounts-table {
    border: 1px solid #ebeef5;
    border-width: 1px 0 0 1px;
    margin: 2px 0 5px;
    padding: 0;
    tr {
      th {
        border: 1px solid #ebeef5;
        border-width: 0 1px 1px 0;
        font-size: 12px;
        height: 30px;
        background: rgb(245, 247, 250);
        font-weight: 400;
        text-align: left;
        padding: 0 8px;
      }
      th.pay {
        color: #02a7f0;
      }
      th.receive {
        color: #f59a23;
      }
      td {
        border: 1px solid #ebeef5;
        border-width: 0 1px 1px 0;
        height: 30px;
        padding: 5px 10px;
        text-align: center;
        .el-link {
          float: left;
          &:first-child {
            margin-right: 5px;
          }
        }
        i {
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
