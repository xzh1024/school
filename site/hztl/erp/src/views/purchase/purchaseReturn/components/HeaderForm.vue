<template>
  <el-form
    ref="headerForm"
    v-switch-focus="focusData"
    :rules="rules"
    :show-message="false"
    :model="formData"
    v-bind="$attrs"
    class="form-item-small-margin-bottom"
    label-width="71px"
    label-position="left"
    size="mini"
    v-on="$listeners"
    v-loading="loading"
  >
    <Collapse :isCollapse.sync="relIsCollapse">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item
            class="contact-info-container"
            label="供应商"
            prop="cooperatorId"
          >
            <CooperatorsSelect
              v-model="formData.cooperatorId"
              :clearable="false"
              :disabled="cooperatorIdTypeDisabled"
              :default-value.sync="formData.cooperatorName"
              :allow-create="
                hasCompletePerm('basics.cooperators.createSupplier')
              "
              no-data-tips="没有查询到供应商,回车新增"
              type="supplier"
              :contactInfo="contactInfo"
              showTips
              class="switch-focus focus-cooperatorId"
              placeholder="请选择"
              @change="billHeadersUpdateWithCcooperator"
              @intput-enter="debouncedHandleInputEnter('cooperatorId')"
            />
          </el-form-item>
          <el-form-item label="业务日期" prop="billDate">
            <el-date-picker
              v-model="formData.billDate"
              :clearable="false"
              :editable="false"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="billHeadersUpdate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="enhancedSettlementType" label="支付方式">
            <ht-autoselect
              v-model="formData.enhancedSettlementType"
              :clearable="false"
              :options="store().enhancedSettlementTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-enhancedSettlementType"
              placeholder="请选择"
              mnemonic
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="billHeadersUpdate"
            />
          </el-form-item>
          <el-form-item prop="businessManId" label="业务员">
            <ht-autoselect
              v-model="formData.businessManId"
              :disabled="!businessManChangeable || businessManIdDisabled"
              :default-value.sync="formData.businessManName"
              :options="store().purchaseMen()"
              :trigger-on-focus="false"
              class="switch-focus focus-businessManId"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="billHeadersUpdate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="invoiceType" label="发票类型">
            <ht-autoselect
              v-model="formData.invoiceType"
              :clearable="false"
              :disabled="invoiceTypeDisabled"
              :options="store().formatInvoiceTypeDictionary()"
              :trigger-on-focus="false"
              :format-name="
                value =>
                  getFormatInvoiceType(formData.invoiceType, formData.taxRate)
              "
              class="switch-focus focus-invoiceType"
              placeholder="请选择"
              mnemonic
              filter-zero
              highlight-first-item
              @intput-enter="invoiceTypeHandleInputEnter"
              @change="updateBillHeaderTaxed(formData.invoiceType)"
            />
          </el-form-item>
          <el-form-item label="运费">
            <ht-format-number
              v-model="formData.freight"
              placeholder="运费金额"
              :min="0"
              @change="debouncedUpdate"
              precision-type="price"
            >
              <template slot="append">
                <ht-autoselect
                  v-model="formData.freightPayer"
                  :options="store().freightPayerDictionary()"
                  :trigger-on-focus="false"
                  class="switch-focus focus-freightPayer"
                  placeholder="请选择"
                  clearable
                  :border="false"
                  highlight-first-item
                  @change="billHeadersUpdate"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </template>
            </ht-format-number>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-row :gutter="10">
            <el-form-item label-width="0">
              <bill-status-bar
                v-if="header.billNo"
                :bill-no="header.billNo"
                :bill-status="statusTxt"
              />
              <div v-else style="width:1px;height:30px"></div>
            </el-form-item>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <ht-input
              v-model="formData.remark"
              class="switch-focus focus-remark"
              placeholder="最大支持100个字符"
              maxlength="100"
              @change="billHeadersUpdate"
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
                v-model="formData.logisticsCompanyId"
                :default-value.sync="formData.logisticsCompanyName"
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
                v-model="formData.receiverName"
                class="switch-focus focus-receiverName"
                type="text"
                @change="billHeadersUpdate"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="pickMethod" label="提货方式">
              <ht-autocomplete
                v-model="formData.pickMethod"
                :disabled="cantPickMethod"
                :fetch-suggestions="autocompleteSearchDeliveryType"
                :trigger-on-focus="false"
                class="switch-focus focus-pickMethod"
                placeholder="请选择"
                clearable
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
                @change="billHeadersUpdate"
              />
            </el-form-item>

            <el-form-item label="收货电话" prop="receiverPhone">
              <ht-input
                v-model="formData.receiverPhone"
                class="switch-focus focus-receiverPhone"
                type="text"
                @change="billHeadersUpdate"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item prop="transportMethod" label="运输方式">
                  <ht-autocomplete
                    v-model="formData.transportMethod"
                    :fetch-suggestions="autocompleteSearchTransportType"
                    :trigger-on-focus="false"
                    class="switch-focus focus-transportMethod"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                    @intput-enter="debouncedHandleInputEnter"
                    @change="billHeadersUpdate"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item prop="packMethod" label="包装方式">
                  <ht-autocomplete
                    v-model="formData.packMethod"
                    :fetch-suggestions="autocompleteSearchPackWay"
                    :trigger-on-focus="false"
                    class="switch-focus focus-packMethod"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                    @intput-enter="debouncedHandleInputEnter"
                    @change="billHeadersUpdate"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="收货地址" prop="receiverAreaIds">
                  <area-select
                    v-model="formData.receiverAreaIds"
                    placeholder="请选择"
                    clearable
                    @change="billHeadersUpdate"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="receiverAddress" label-width="0">
                  <ht-input
                    v-model="formData.receiverAddress"
                    class="switch-focus focus-receiverAddress"
                    placeholder="街道、门牌号等"
                    @change="billHeadersUpdate"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </Collapse>
  </el-form>
</template>

<script>
import { AreaSelect, CooperatorsSelect } from "@/components/select";
import Collapse from "@/components/collapse";
import { reqReturnHeadersUpdate } from "@/api/purchase/purchaseReturn";
import { reqPurchaseSupplierDefault } from "@/api/purchase/suppliersDefault";
import BillStatusBar from "@/components/billStatusBar";
import debounce from "throttle-debounce/debounce";
import { baseDataMixin, searchMixin } from "@/mixins";
import { PURCHASE_RETURN_STATUS } from "@/constants/states/purchase";
import { sendFilters } from "@/utils/tool";
import { mapState } from "vuex";
import * as store from "@/utils/store";

export default {
  name: "HeaderForm",
  components: {
    Collapse,
    CooperatorsSelect,
    AreaSelect,
    BillStatusBar
  },
  mixins: [baseDataMixin, searchMixin],
  props: {
    cooperatorIdTypeDisabled: Boolean,
    invoiceTypeDisabled: Boolean,
    businessManIdDisabled: Boolean,
    isHasHistory: Boolean,
    focusData: {
      type: Object,
      required: true
    },
    header: {
      type: Object,
      required: true
    },
    handleInputEnter: {
      type: Function,
      required: true
    },
    isCollapse: Boolean
  },
  data() {
    return {
      loading: false,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      formData: { receiverAreaIds: [] },
      cantPickMethod: false,
      rules: {
        billDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        cooperatorId: [
          {
            required: true,
            message: "请选择供应商",
            trigger: "change"
          }
        ],
        enhancedSettlementType: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change"
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "请选择发票类型",
            trigger: "change"
          }
        ]
      },
      cacheTaxRate: 0
    };
  },
  computed: {
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
    header: {
      handler() {
        this.initHeaderData();
      },
      immediate: true
    },
    "formData.freight"(val) {
      this.$set(this.formData, "freight", val);
      this.$emit("update:header", { ...this.formData });
    },
    "formData.enhancedSettlementType"(val) {
      console.log("sajadj");
      if (val === "物流代收") {
        this.$set(this.formData, "pickMethod", "发货");
        this.cantPickMethod = true;
      } else {
        this.$set(this.formData, "pickMethod", this.formData.pickMethod);
        this.cantPickMethod = false;
      }
    }
  },
  mounted() {
    this.$store.dispatch("admin/purchaseMan/loadAll");
  },
  methods: {
    store() {
      return store;
    },
    debouncedUpdate(e) {
      if (e) {
        this.$set(this.formData, "pickMethod", "发货");
        this.cantPickMethod = true;
      } else {
        this.cantPickMethod = false;
      }
      debounce(500, this.billHeadersUpdate());
    },
    initHeaderData() {
      this.statusTxt = PURCHASE_RETURN_STATUS[this.header.status] || "";
      if (
        !this.header.id &&
        this.header.cooperatorId &&
        this.header.cooperatorId !== this.formData.cooperatorId
      ) {
        this.loading = true;
        this.formData = { ...this.header };
        reqPurchaseSupplierDefault(this.header.cooperatorId)
          .then(data => {
            const params = sendFilters(data);
            this.formData = { ...this.header, ...params };
            this.setPickMethod();
            this.$emit("on-cooperator-change");
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.formData = { ...this.header };
        this.setPickMethod();
      }
    },
    setPickMethod() {
      if (
        this.formData.freight > 0 ||
        this.formData.enhancedSettlementType == "物流代收"
      ) {
        this.$set(this.formData, "pickMethod", "发货");

        setTimeout(() => {
          this.cantPickMethod = true;
        }, 1000);
      }
    },
    billHeadersUpdate() {
      if (this.formData.enhancedSettlementType === "物流代收") {
        this.$set(this.formData, "pickMethod", "发货");
      }
      this.$emit("update:header", { ...this.formData });
      if (!this.formData.id) return;
      if (this.getFormValidate()) {
        const formData = { ...this.formData };
        if (formData.receiverAreaIds && formData.receiverAreaIds.length === 3) {
          formData.receiverAreaId = formData.receiverAreaIds[2];
        } else {
          formData.receiverAreaId = 0;
        }
        formData.id = Number(formData.id);
        reqReturnHeadersUpdate({ ...formData })
          .then(() => {
            this.$message({
              type: "success",
              message: "单头已更新",
              showClose: true
            });
            if (this.cacheTaxRate !== this.formData.taxRate) {
              this.$emit("taxRateChange");
            }
          })
          .catch(() => {});
      }
    },
    invoiceTypeHandleInputEnter() {
      this.$emit("invoice-type-input-enter");
    },
    updateBillHeaderLogistics() {
      this.$emit("updateBillHeaderLogistics");
      this.billHeadersUpdate();
    },
    updateBillHeaderTaxed(value) {
      if (!value) return;
      const _item = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === value);
      this.cacheTaxRate = this.formData.taxRate;
      this.formData.taxRate = _item.specialValue;
      this.billHeadersUpdate();
    },
    billHeadersUpdateWithCcooperator(val) {
      if (!val) return;
      reqPurchaseSupplierDefault(val)
        .then(data => {
          const params = sendFilters(data);
          this.formData = { ...this.formData, ...params };
          this.billHeadersUpdate();
          this.$emit("on-cooperator-change");
        })
        .catch(() => {});
    },
    getFormValidate() {
      let flag;
      this.$refs.headerForm.validate((valid, err) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return flag;
    },
    clearValidate() {
      this.$refs.headerForm.clearValidate();
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
