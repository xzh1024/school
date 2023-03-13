<template>
  <el-form
    ref="saleOutForm"
    v-switch-focus="focusData"
    :rules="rules"
    :model="ruleForm"
    :show-message="false"
    v-bind="$attrs"
    class="form-item-small-margin-bottom"
    label-width="71px"
    label-position="left"
    size="mini"
    v-on="$listeners"
  >
    <Collapse :isCollapse.sync="relIsCollapse">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item
            class="contact-info-container"
            prop="cooperatorId"
            label="客户"
          >
            <CooperatorsSelect
              v-model="ruleForm.cooperatorId"
              :clearable="false"
              :disabled="!directCreate"
              :default-value.sync="ruleForm.cooperatorName"
              :allow-create="
                hasCompletePerm('basics.cooperators.createCustomer')
              "
              no-data-tips="没有查询到客户,回车新增"
              type="customer"
              :contactInfo="contactInfo"
              showTips
              class="switch-focus focus-cooperatorId"
              placeholder="请选择"
              @change="handleCooperatorChange"
              @intput-enter="debouncedHandleInputEnter('cooperatorId')"
            />
          </el-form-item>
          <el-form-item prop="billDate" label="业务日期">
            <el-date-picker
              v-model="ruleForm.billDate"
              :clearable="false"
              :editable="false"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="updateBillHeaderSumbit"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label-width="71px"
            label="支付方式"
            prop="enhancedSettlementType"
          >
            <ht-autoselect
              v-model="ruleForm.enhancedSettlementType"
              :clearable="false"
              :trigger-on-focus="false"
              :options="store().enhancedSettlementTypeDictionary()"
              class="switch-focus focus-enhancedSettlementType"
              placeholder="请选择"
              mnemonic
              highlight-first-item
              @change="updateBillHeaderSumbit"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item prop="businessManId" label="业务员">
            <ht-autoselect
              v-model="ruleForm.businessManId"
              :disabled="!businessManChangeable"
              :default-value.sync="ruleForm.businessManName"
              :options="store().salesMen()"
              :trigger-on-focus="false"
              class="switch-focus focus-businessManId"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="updateBillHeaderSumbit"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="71px" label="发票类型" prop="invoiceType">
            <ht-autoselect
              v-model="ruleForm.invoiceType"
              :clearable="false"
              :options="store().formatInvoiceTypeDictionary()"
              :trigger-on-focus="false"
              :format-name="
                value =>
                  getFormatInvoiceType(ruleForm.invoiceType, ruleForm.taxRate)
              "
              class="switch-focus focus-invoiceType"
              placeholder="请选择"
              mnemonic
              highlight-first-item
              @change="updateBillHeaderTaxed(ruleForm.invoiceType)"
              @intput-enter="debouncedHandleInputEnter('invoiceType')"
            />
          </el-form-item>
          <el-form-item label="运费">
            <ht-format-number
              v-model="ruleForm.freight"
              placeholder="运费金额"
              :min="0"
              @change="debouncedUpdate"
              precision-type="price"
            >
              <template slot="append">
                <ht-autoselect
                  v-model="ruleForm.freightPayer"
                  :options="store().freightPayerDictionary()"
                  :trigger-on-focus="false"
                  class="switch-focus focus-freightPayer"
                  placeholder="请选择"
                  clearable
                  :border="false"
                  highlight-first-item
                  @change="updateBillHeaderSumbit"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </template>
            </ht-format-number>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label-width="0">
            <bill-status-bar
              v-if="header.billNo"
              :bill-no="header.billNo"
              :bill-status="billStatus"
            />
            <div v-else style="width:1px;height:30px"></div>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <ht-input
              v-model="ruleForm.remark"
              placeholder="最大支持100个字符"
              class="switch-focus focus-remark"
              maxlength="100"
              @change="updateBillHeaderSumbit"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <template v-slot:collapse>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item prop="logisticsCompanyId" label="物流公司">
              <CooperatorsSelect
                v-model="ruleForm.logisticsCompanyId"
                :default-value.sync="ruleForm.logisticsCompanyName"
                :allow-create="
                  hasCompletePerm('basics.cooperators.createLogistics')
                "
                no-data-tips="没有查询到物流公司,回车新增"
                type="logistics"
                class="switch-focus focus-logisticsCompanyId"
                placeholder="请选择"
                clearable
                @change="updateBillHeaderLogistics"
                @intput-enter="debouncedHandleInputEnter('logisticsCompanyId')"
              />
            </el-form-item>

            <el-form-item label="收货人" prop="receiverName">
              <ht-input
                v-model="ruleForm.receiverName"
                class="switch-focus focus-receiverName"
                type="text"
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="pickMethod" label="提货方式">
              <ht-autocomplete
                v-model="ruleForm.pickMethod"
                :fetch-suggestions="autocompleteSearchDeliveryType"
                :disabled="isCanPickMethod"
                :trigger-on-focus="false"
                class="switch-focus focus-pickMethod"
                placeholder="请选择"
                clearable
                highlight-first-item
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>

            <el-form-item label="收货电话" prop="receiverPhone">
              <ht-input
                v-model="ruleForm.receiverPhone"
                class="switch-focus focus-receiverPhone"
                type="text"
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="transportMethod" label="运输方式">
              <ht-autocomplete
                v-model="ruleForm.transportMethod"
                :fetch-suggestions="autocompleteSearchTransportType"
                :trigger-on-focus="false"
                class="switch-focus focus-transportMethod"
                placeholder="请选择"
                clearable
                highlight-first-item
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item prop="commissionId" label="中间人">
              <ht-autoselect
                v-model="ruleForm.commissionId"
                :defaultValue.sync="ruleForm.commissionName"
                :fetch-suggestions="
                  query => searchLoadOnlyCustomerCooperators(query)
                "
                :trigger-on-focus="false"
                clearable
                remote
                filter-zero
                highlight-first-item
                class="switch-focus focus-commissionId"
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="packMethod" label="包装方式">
                  <ht-autocomplete
                    v-model="ruleForm.packMethod"
                    :fetch-suggestions="autocompleteSearchPackWay"
                    :trigger-on-focus="false"
                    class="switch-focus focus-packMethod"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                    @change="updateBillHeaderSumbit"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="plateNumber" label="车牌号">
                  <ht-input
                    v-model="ruleForm.plateNumber"
                    class="switch-focus focus-plateNumber"
                    minlength="7"
                    maxlength="10"
                    placeholder="请输入"
                    @change="updateBillHeaderSumbit"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="收货地址" prop="receiverAreaIds">
              <area-select
                v-model="ruleForm.receiverAreaIds"
                placeholder="请选择"
                clearable
                @change="updateBillHeaderSumbit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item prop="receiverAddress" label-width="0">
              <ht-input
                v-model="ruleForm.receiverAddress"
                class="switch-focus focus-receiverAddress"
                placeholder="街道、门牌号等"
                @change="updateBillHeaderSumbit"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </Collapse>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
import debounce from "throttle-debounce/debounce";
import BillStatusBar from "@/components/billStatusBar";
import Collapse from "@/components/collapse";
import { commonValidator } from "@/views/sales/mixin";
import { reqSalesCustomerDefault } from "@/api/sales/salesHome";
import { updateSalesOutBillDetailHeaders } from "@/api/sales/salesOut";
import { SALES_OUT_STATUS } from "@/constants/states/sales";
import { AreaSelect, CooperatorsSelect } from "@/components/select";
import { sendFilters } from "@/utils/tool";
import { baseDataMixin, searchMixin, validCreditLine } from "@/mixins";
import eventBus from "@/event";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

const salesOutFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};

export default {
  name: "HeaderForm",
  components: {
    Collapse,
    BillStatusBar,
    CooperatorsSelect,
    AreaSelect
  },
  mixins: [commonValidator, searchMixin, baseDataMixin, validCreditLine],
  props: {
    directCreate: Boolean,
    keyScope: {
      type: [String, Symbol],
      default: null
    },
    header: {
      type: Object,
      default: null
    },
    isUpdateFocusIndex: Boolean,
    isCollapse: Boolean,
    detailHasCoop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      ruleForm: { receiverAreaIds: [] },
      moreParams: false,
      focusData: { ...salesOutFocusData },
      isCanPickMethod: false,
      isFlag: false,
      partParmas: null,
      lastCooperatorId: null
    };
  },
  computed: {
    billStatus() {
      return SALES_OUT_STATUS[this.header.status] || "";
    },
    ...mapState("admin", {
      businessManChangeable: state =>
        state.systemParams.params.businessManChangeable
    }),
    contactInfo() {
      return {
        contactName: this.header.contactName || "",
        contactPhone: this.header.contactPhone || "",
        groupName: this.header.groupName || ""
      };
    },
    relIsCollapse: {
      get() {
        return this.isCollapse;
      },
      set(val) {
        this.$emit("update:isCollapse", val);
      }
    }
  },
  watch: {
    header() {
      this.initForm();
    },
    "ruleForm.enhancedSettlementType"(value) {
      if (value === "物流代收") {
        this.$set(this.ruleForm, "pickMethod", "发货");
        this.isCanPickMethod = true;
      } else {
        this.$set(this.ruleForm, "pickMethod", this.ruleForm.pickMethod);
        this.isCanPickMethod = false;
      }
    },
    "ruleForm.freight"(val) {
      this.$set(this.ruleForm, "freight", val);
      this.$emit("update:header", this.ruleForm);
    },
    isUpdateFocusIndex(bl) {
      if (bl) {
        this.updateFocusData({ initial: "focus-cooperatorId" });
      } else {
        this.focusData = {};
        this.$refs.saleOutForm.resetFields();
      }
    },
    "ruleForm.cooperatorId"(val) {
      this.lastCooperatorId = val;
    }
  },
  created() {
    eventBus.$on("showCreateBill", this.showCreateBill);
  },
  mounted() {
    hotkeys("up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "up":
          e.preventDefault();
          this.updateFocusData({ type: "up" });
          break;
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: "down" });
          break;
        default:
          return;
      }
    });
    this.$store.dispatch("admin/salesMan/loadAll");
  },
  beforeDestroy() {
    eventBus.$off("showCreateBill", this.showCreateBill);
  },
  methods: {
    store() {
      return store;
    },
    debouncedUpdate(e) {
      if (e) {
        this.$set(this.ruleForm, "pickMethod", "发货");
        this.isCanPickMethod = true;
      } else {
        this.isCanPickMethod = false;
      }
      debounce(500, this.updateBillHeaderSumbit());
    },
    initForm() {
      this.ruleForm = { ...this.header };
      this.lastCooperatorId = this.ruleForm.cooperatorId;
      this.setPickMethod();
    },
    setPickMethod() {
      if (
        this.ruleForm.freight > 0 ||
        this.ruleForm.enhancedSettlementType == "物流代收"
      ) {
        this.$set(this.ruleForm, "pickMethod", "发货");
        setTimeout(() => {
          this.isCanPickMethod = true;
        }, 1000);
      }
    },
    handleInputEnter(value) {
      this.$refs.saleOutForm.validate((valid, err) => {
        if (valid) {
          if (value === "invoiceType") {
            if (this.isFlag) {
              this.$emit("handleCreateSaleBill", { ...this.partParmas });
              this.isFlag = false;
              this.partParmas = null;
            } else {
              this.updateFocusData({ type: "down" });
            }
          } else if (value === "cooperatorId") {
            this.updateFocusData({ initial: "focus-enhancedSettlementType" });
          } else if (value === "logisticsCompanyId") {
            this.updateFocusData({ initial: "focus-cooperatorId" });
          } else {
            this.updateFocusData({ type: "down" });
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
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
    showCreateBill(params, bl) {
      this.isFlag = bl;
      this.partParmas = params;
    },
    handleSyncUpdateHeader(params) {
      if (params.enhancedSettlementType === "物流代收") {
        this.$set(params, "pickMethod", "发货");
      }
      this.$emit("update:header", params);
    },
    _message() {
      this.$message.success({ message: "单头更新成功", showClose: true });
    },
    handleCooperatorChange(id) {
      if (id) {
        reqSalesCustomerDefault(id)
          .then(data => {
            const parmas = sendFilters(data);
            this.ruleForm = { ...this.ruleForm, ...parmas };
            this.updateBillHeaderSumbit();
            this.updateFocusData({ initial: "focus-enhancedSettlementType" });
          })
          .catch(() => {
            //有客户享受价格，不允许修改明细
            this.ruleForm.cooperatorId = this.lastCooperatorId;
          });
      } else {
        this.updateFocusData({ initial: "focus-cooperatorId" });
        this.handleSyncUpdateHeader(this.ruleForm);
      }
    },
    updateBillHeaderLogistics() {
      this.updateBillHeaderSumbit();
      this.updateFocusData({ initial: "focus-logisticsCompanyId" });
    },
    updateBillHeaderTaxed(value) {
      if (!value) return;
      const _item = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === value);
      this.ruleForm.taxRate = _item.specialValue;
      this.updateBillHeaderSumbit();
    },
    updateBillHeaderSumbit() {
      this.handleSyncUpdateHeader(this.ruleForm);
      if (!this.ruleForm.billNo) return;
      this.$refs["saleOutForm"].validate(valid => {
        if (valid) {
          const localParams = { ...this.ruleForm };
          delete localParams.receiverAreaNames;
          if (
            localParams.receiverAreaIds &&
            localParams.receiverAreaIds.length === 3
          ) {
            localParams.receiverAreaId = localParams.receiverAreaIds[2];
          } else {
            localParams.receiverAreaId = 0;
          }
          updateSalesOutBillDetailHeaders({
            ...localParams,
            id: this.ruleForm.id
          })
            .then(data => {
              if (
                this.ruleForm.enhancedSettlementType === "挂账" &&
                data &&
                data.overCreditAlarm
              ) {
                this.validCreditLine(data).then(() => {
                  if (data.creditCanContinue) {
                    this.$emit("reloadDetailTable", true);
                    this._message();
                  } else {
                    this.ruleForm.enhancedSettlementType = "";
                    this.handleSyncUpdateHeader(this.ruleForm);
                  }
                });
              } else {
                this.$emit("reloadDetailTable", true);
                this._message();
              }
            })
            .catch(err => {
              if (err && err.code == "credit-err") {
                this.ruleForm.enhancedSettlementType = "";
                this.handleSyncUpdateHeader(this.ruleForm);
                this.validCreditLine(err.data).then(skipCreditLine => {
                  if (skipCreditLine) {
                    updateSalesOutBillDetailHeaders({
                      ...localParams,
                      id: this.ruleForm.id,
                      skipCreditLine
                    })
                      .then(() => {
                        this.$emit("reloadDetailTable", true);
                        this._message();
                      })
                      .catch(() => {});
                  }
                });
              } else if (err.code === "debt-error") {
                this.ruleForm.enhancedSettlementType = "";
                this.handleSyncUpdateHeader(this.ruleForm);
              }
            });
        }
      });
    },
    resetForm() {
      this.$refs.saleOutForm.resetFields();
    },
    clearValidate() {
      this.$refs.saleOutForm.clearValidate();
    }
  }
};
</script>
<style lang="scss" scoped>
.form-item-small-margin-bottom {
  ::v-deep {
    .el-input-group__append {
      width: 100px;
      border: none !important;
      padding: 0 !important;
    }
    .el-input--prefix .el-input__inner {
      padding-right: 0 !important;
    }
  }
}
</style>
