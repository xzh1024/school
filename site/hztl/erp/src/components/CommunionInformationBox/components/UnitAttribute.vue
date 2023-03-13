<template>
  <el-row
    class="unit-attribute"
    v-switch-focus="focusData"
    :gutter="5"
    style="margin: 5px; height: 100%;"
  >
    <el-col :span="isYunXiu ? 9 : 8" style="height: 100%;">
      <ht-card title="客户属性" class="auto-card">
        <div
          v-show="!isOpenData.isCustomer"
          slot="after-title"
          class="is-unopen text-font"
        >
          未开通
        </div>
        <el-form
          :model="customerForm"
          :show-message="false"
          :disabled="!canEditCustomerForm"
          class="form-item-small-margin-bottom"
          label-position="left"
          label-width="60px"
          size="mini"
          :rules="rule"
          ref="form"
          style="height: 100%;overflow-y: auto;overflow-x: hidden;"
        >
          <el-form-item prop="property" label="客户性质">
            <ht-autoselect
              v-model="customerForm.property"
              :options="store().customerTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-property"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultInvoiceType" label="发票类型">
            <ht-autoselect
              v-model="customerForm.defaultInvoiceType"
              :options="store().invoiceTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-defaultInvoiceType"
              placeholder="请选择"
              mnemonic
              filter-zero
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item prop="repairPartDiscount" label="配件折扣">
                <ht-input
                  v-model.number="customerForm.repairPartDiscount"
                  class="switch-focus focus-customerForm-repairPartDiscount"
                  type="number"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleCustomerFormChange"
                  @input="numberChange"
                >
                  <template slot="append">
                    折
                  </template>
                </ht-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isYunXiu">
              <el-form-item prop="repairManHourDiscount" label="工时折扣">
                <ht-input
                  v-model.number="customerForm.repairManHourDiscount"
                  class="switch-focus focus-customerForm-repairManHourDiscount"
                  type="number"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleCustomerFormChange"
                  @input="numberChange"
                >
                  <template slot="append">
                    折
                  </template>
                </ht-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="结算方式" prop="defaultSettlementType">
            <ht-autoselect
              v-model="customerForm.defaultSettlementType"
              :trigger-on-focus="false"
              :options="store().settlementTypeDictionary()"
              class="switch-focus focus-customerForm-defaultSettlementType"
              placeholder="请选择"
              mnemonic
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleChangeSettlementType"
            />
          </el-form-item>
          <el-form-item label=" " label-width="0">
            <el-checkbox
              size="small"
              v-model="customerForm.flags.allowLastSale"
              @change="handleCustomerFormChange"
              >销售时，优先使用上次销售价格</el-checkbox
            >
          </el-form-item>
          <el-form-item prop="priceType" label="享受价格">
            <ht-autoselect
              v-model="customerForm.priceType"
              :options="priceType"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-priceType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item label=" " label-width="28px">
            <el-row>
              <el-col :span="2">
                <el-tooltip :enterable="false" placement="bottom">
                  <div slot="content">
                    设置享受价格，销售时将会使用客户享受价格
                    <br />
                    上限价格 = 享受价格 * （1+上限系数）
                    <br />
                    下限价格 = 享受价格 * （1+下限系数）
                    <br />
                    注：未设置享受价格类型，不检查。
                    <br />
                    未启用上限，将不检查上限。
                    <br />
                    未启用下限，将使用员工价格权限
                  </div>
                  <i class="el-icon-question text-font-primary font-16"></i>
                </el-tooltip>
              </el-col>
              <el-col :span="11">
                <el-form-item label="" prop="bargainUpperRate">
                  <el-row>
                    <el-col :span="12">
                      <el-checkbox
                        size="small"
                        :disabled="!customerForm.priceType"
                        v-model="customerForm.flags.allowBargainUpper"
                        @change="handleCustomerFormChange"
                        >议价上限</el-checkbox
                      >
                    </el-col>
                    <el-col :span="12">
                      <ht-format-number
                        v-model="customerForm.bargainUpperRate"
                        placeholder="0"
                        precision-type="qty"
                        :max="1000"
                        :min="-100"
                        :disabled="
                          !customerForm.priceType ||
                            !customerForm.flags.allowBargainUpper
                        "
                        @blur="validateForm"
                        @intput-enter="debouncedHandleInputEnter"
                        @change="handleCustomerFormChange"
                      >
                        <template slot="append">%</template>
                      </ht-format-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="" prop="bargainLowerRate">
                  <el-row style="padding-left:4px;">
                    <el-col :span="12">
                      <el-checkbox
                        size="small"
                        @change="handleCustomerFormChange"
                        v-model="customerForm.flags.allowBargainLower"
                        :disabled="!customerForm.priceType"
                        >议价下限</el-checkbox
                      >
                    </el-col>
                    <el-col :span="12">
                      <ht-format-number
                        v-model="customerForm.bargainLowerRate"
                        class="switch-focus focus-customerForm-bargainLowerRate"
                        placeholder="0"
                        :max="1000"
                        :min="-100"
                        @blur="validateForm"
                        precision-type="qty"
                        :disabled="
                          !customerForm.priceType ||
                            !customerForm.flags.allowBargainLower
                        "
                        @intput-enter="debouncedHandleInputEnter"
                        @change="handleCustomerFormChange"
                      >
                        <template slot="append">%</template>
                      </ht-format-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            prop="autoReconciliation"
            label="启用对账日及账期"
            label-width="115px"
          >
            <el-switch
              v-model="customerForm.autoReconciliation"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="对账日" prop="reconciliationDay">
                <ht-autoselect
                  v-model="customerForm.reconciliationDay"
                  :disabled="!customerForm.autoReconciliation"
                  :options="reconciliationDayOptions"
                  :trigger-on-focus="false"
                  class="switch-focus focus-customerForm-reconciliationDay"
                  placeholder="请选择"
                  clearable
                  highlight-first-item
                  filter-zero
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleCustomerFormChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账期" prop="accountPeriod">
                <ht-input
                  v-model.number="customerForm.accountPeriod"
                  :disabled="!customerForm.autoReconciliation"
                  class="switch-focus focus-customerForm-accountPeriod"
                  type="number"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleCustomerFormChange"
                  @input="numberChange"
                >
                  <template slot="append">
                    天
                  </template>
                </ht-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="debtType" label="欠款类型">
            <ht-autoselect
              v-model="customerForm.debtType"
              :options="searchBaseData.debtTypeList"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-debtType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="allowDebt" label="允许挂账">
            <el-switch
              v-model="customerForm.flags.allowDebt"
              @change="handleChangeAllowDebt"
            />
          </el-form-item>
          <el-form-item label="信用额度" prop="creditAmount">
            <ht-input
              v-model.number="customerForm.creditAmount"
              class="switch-focus focus-customerForm-creditAmount"
              type="number"
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultDeliveryType" label="提货方式">
            <ht-autocomplete
              v-model="customerForm.defaultDeliveryType"
              :fetch-suggestions="autocompleteSearchDeliveryType"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-defaultDeliveryType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultTransportType" label="运输方式">
            <ht-autocomplete
              v-model="customerForm.defaultTransportType"
              :fetch-suggestions="autocompleteSearchTransportType"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-defaultTransportType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultPackingWay" label="包装方式">
            <ht-autocomplete
              v-model="customerForm.defaultPackingWay"
              :fetch-suggestions="autocompleteSearchPackWay"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-defaultPackingWay"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultLogisticsCompanyId" label="物流公司">
            <ht-autoselect
              v-model="customerForm.defaultLogisticsCompanyId"
              :default-value.sync="customerForm.defaultLogisticsCompanyName"
              :options="store().logisticsTypes()"
              :trigger-on-focus="false"
              class="switch-focus focus-customerForm-defaultLogisticsCompanyId"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleCustomerFormChange"
            />
          </el-form-item>
          <el-form-item label="来源平台" prop="sourcePlatform">
            <ht-input v-model="sourcePlatform" disabled />
          </el-form-item>
        </el-form>
      </ht-card>
    </el-col>
    <el-col :span="isYunXiu ? 5 : 8" style="height: 100%;">
      <ht-card title="供应商属性" class="auto-card">
        <div
          v-show="!isOpenData.isSupplier"
          slot="after-title"
          class="is-unopen text-font"
        >
          未开通
        </div>
        <el-form
          :model="supplierForm"
          :show-message="false"
          :disabled="!canEditSupplierForm"
          class="form-item-small-margin-bottom"
          label-position="left"
          label-width="60px"
          size="mini"
        >
          <el-form-item prop="defaultInvoiceType" label="发票类型">
            <ht-autoselect
              v-model="supplierForm.defaultInvoiceType"
              :options="store().invoiceTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-supplierForm-defaultInvoiceType"
              placeholder="请选择"
              mnemonic
              filter-zero
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item label="结算方式" prop="defaultSettlementType">
            <ht-autoselect
              v-model="supplierForm.defaultSettlementType"
              :trigger-on-focus="false"
              :options="store().settlementTypeDictionary()"
              class="switch-focus focus-supplierForm-defaultSettlementType"
              placeholder="请选择"
              mnemonic
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item
            prop="autoReconciliation"
            label="启用对账日及账期"
            label-width="115px"
          >
            <el-switch
              v-model="supplierForm.autoReconciliation"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item label="对账日" prop="reconciliationDay">
            <ht-autoselect
              v-model="supplierForm.reconciliationDay"
              :options="reconciliationDayOptions"
              :trigger-on-focus="false"
              :disabled="!supplierForm.autoReconciliation"
              class="switch-focus focus-supplierForm-reconciliationDay"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item label="账期" prop="accountPeriod">
            <ht-input
              v-model.number="supplierForm.accountPeriod"
              :disabled="!supplierForm.autoReconciliation"
              class="switch-focus focus-supplierForm-accountPeriod"
              type="number"
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
              @input="numberChange"
            >
              <template slot="append">
                天
              </template>
            </ht-input>
          </el-form-item>
          <!-- <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="对账日" prop="reconciliationDay">
                <ht-autoselect
                  v-model="supplierForm.reconciliationDay"
                  :options="reconciliationDayOptions"
                  :trigger-on-focus="false"
                  class="switch-focus focus-supplierForm-reconciliationDay"
                  placeholder="请选择"
                  clearable
                  filter-zero
                  highlight-first-item
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleSupplierFormChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账期" prop="accountPeriod">
                <ht-input
                  v-model.number="supplierForm.accountPeriod"
                  class="switch-focus focus-supplierForm-accountPeriod"
                  type="number"
                  @intput-enter="debouncedHandleInputEnter"
                  @change="handleSupplierFormChange"
                >
                  <template slot="append">
                    天
                  </template>
                </ht-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-form-item prop="defaultDeliveryType" label="提货方式">
            <ht-autocomplete
              v-model="supplierForm.defaultDeliveryType"
              :fetch-suggestions="autocompleteSearchDeliveryType"
              :trigger-on-focus="false"
              class="switch-focus focus-supplierForm-defaultDeliveryType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultTransportType" label="运输方式">
            <ht-autocomplete
              v-model="supplierForm.defaultTransportType"
              :fetch-suggestions="autocompleteSearchTransportType"
              :trigger-on-focus="false"
              class="switch-focus focus-supplierForm-defaultTransportType"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultPackingWay" label="包装方式">
            <ht-autocomplete
              v-model="supplierForm.defaultPackingWay"
              :fetch-suggestions="autocompleteSearchPackWay"
              :trigger-on-focus="false"
              class="switch-focus focus-supplierForm-defaultPackingWay"
              placeholder="请选择"
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
          <el-form-item prop="defaultLogisticsCompanyId" label="物流公司">
            <ht-autoselect
              v-model="supplierForm.defaultLogisticsCompanyId"
              :default-value.sync="supplierForm.defaultLogisticsCompanyName"
              :options="store().logisticsTypes()"
              :trigger-on-focus="false"
              class="switch-focus focus-supplierForm-defaultLogisticsCompanyId"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleSupplierFormChange"
            />
          </el-form-item>
        </el-form>
      </ht-card>
    </el-col>
    <el-col :span="isYunXiu ? 5 : 8" style="height: 100%;">
      <ht-card title="物流公司属性" class="auto-card">
        <div
          v-show="!isOpenData.isLogistics"
          slot="after-title"
          class="is-unopen text-font"
        >
          未开通
        </div>
        <el-form
          :model="logisticsForm"
          :show-message="false"
          :disabled="!canEditLogisticsForm"
          class="form-item-small-margin-bottom"
          label-position="left"
          label-width="60px"
          size="mini"
        >
          <el-form-item prop="defaultInvoiceType" label="发票类型">
            <ht-autoselect
              v-model="logisticsForm.defaultInvoiceType"
              :options="store().invoiceTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-logisticsForm-defaultInvoiceType"
              placeholder="请选择"
              mnemonic
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleLogisticsFormChange"
            />
          </el-form-item>
          <el-form-item label="结算方式" prop="defaultSettlementType">
            <ht-autoselect
              v-model="logisticsForm.defaultSettlementType"
              :trigger-on-focus="false"
              :options="store().settlementTypeDictionary()"
              class="switch-focus focus-logisticsForm-defaultSettlementType"
              placeholder="请选择"
              mnemonic
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleLogisticsFormChange"
            />
          </el-form-item>
          <el-form-item
            label="允许代收货款"
            prop="allowAgencyReceipt"
            label-width="90px"
          >
            <el-switch
              v-model="logisticsForm.flags.allowAgencyReceipt"
              @change="handleLogisticsFormChange"
            />
          </el-form-item>
          <el-form-item label="回款天数" prop="agencyReceiptReturnDays">
            <ht-input
              v-model.number="logisticsForm.agencyReceiptReturnDays"
              class="switch-focus focus-logisticsForm-agencyReceiptReturnDays"
              type="number"
              @intput-enter="debouncedHandleInputEnter"
              @change="handleLogisticsFormChange"
              @input="numberChange"
            >
              <template slot="append">
                天
              </template>
            </ht-input>
          </el-form-item>
          <el-form-item
            prop="autoReconciliation"
            label="启用对账日及账期"
            label-width="115px"
          >
            <el-switch
              v-model="logisticsForm.autoReconciliation"
              @change="handleLogisticsFormChange"
            />
          </el-form-item>
          <el-form-item label="对账日" prop="reconciliationDay">
            <ht-autoselect
              v-model="logisticsForm.reconciliationDay"
              :options="reconciliationDayOptions"
              :trigger-on-focus="false"
              :disabled="!logisticsForm.autoReconciliation"
              class="switch-focus focus-logisticsForm-reconciliationDay"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleLogisticsFormChange"
            />
          </el-form-item>
          <el-form-item label="账期" prop="accountPeriod">
            <ht-input
              v-model.number="logisticsForm.accountPeriod"
              :disabled="!logisticsForm.autoReconciliation"
              class="switch-focus focus-logisticsForm-accountPeriod"
              type="number"
              @intput-enter="debouncedHandleInputEnter"
              @change="handleLogisticsFormChange"
              @input="numberChange"
            >
              <template slot="append">
                天
              </template>
            </ht-input>
          </el-form-item>
        </el-form>
      </ht-card>
    </el-col>
    <el-col v-if="isYunXiu" :span="5" style="height: 100%;">
      <ht-card title="保险公司属性" class="auto-card">
        <div
          v-show="!isOpenData.isInsuranceCompany"
          slot="after-title"
          class="is-unopen text-font"
        >
          未开通
        </div>
        <el-form
          :model="insuranceForm"
          :show-message="false"
          :disabled="!canInsuranceEditForm"
          class="form-item-small-margin-bottom"
          label-position="left"
          label-width="60px"
          size="mini"
        >
          <el-form-item prop="defaultInvoiceType" label="发票类型">
            <ht-autoselect
              v-model="insuranceForm.defaultInvoiceType"
              :options="store().invoiceTypeDictionary()"
              :trigger-on-focus="false"
              class="switch-focus focus-insuranceForm-defaultInvoiceType"
              placeholder="请选择"
              mnemonic
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleInsuranceFormChange"
            />
          </el-form-item>
          <el-form-item label="结算方式" prop="defaultSettlementType">
            <ht-autoselect
              v-model="insuranceForm.defaultSettlementType"
              :trigger-on-focus="false"
              :options="store().settlementTypeDictionary()"
              class="switch-focus focus-insuranceForm-defaultSettlementType"
              placeholder="请选择"
              mnemonic
              clearable
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleInsuranceFormChange"
            />
          </el-form-item>
          <el-form-item
            label="启用对账日及账期"
            prop="autoReconciliation"
            label-width="120px"
          >
            <el-switch
              v-model="insuranceForm.autoReconciliation"
              @change="handleInsuranceFormChange"
            />
          </el-form-item>
          <el-form-item label="对账日" prop="reconciliationDay">
            <ht-autoselect
              v-model="insuranceForm.reconciliationDay"
              :options="reconciliationDayOptions"
              :trigger-on-focus="false"
              :disabled="!insuranceForm.autoReconciliation"
              class="switch-focus focus-insuranceForm-reconciliationDay"
              placeholder="请选择"
              clearable
              filter-zero
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
              @change="handleInsuranceFormChange"
            />
          </el-form-item>
          <el-form-item label="账期" prop="accountPeriod">
            <ht-input
              v-model.number="insuranceForm.accountPeriod"
              :disabled="!insuranceForm.autoReconciliation"
              class="switch-focus focus-insuranceForm-accountPeriod"
              type="number"
              @intput-enter="debouncedHandleInputEnter"
              @change="handleInsuranceFormChange"
              @input="numberChange"
            >
              <template slot="append">
                天
              </template>
            </ht-input>
          </el-form-item>
        </el-form>
      </ht-card>
    </el-col>
  </el-row>
</template>

<script>
import { searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";
import { DAYOPTIONS } from "@/constants";
import * as store from "@/utils/store";
import { userMsg } from "@/utils/store";

export default {
  name: "UnitAttribute",
  mixins: [searchMixin],
  props: {
    isEdit: Boolean,
    sourcePlatform: {
      type: String,
      default: ""
    },
    handleInputEnter: {
      type: Function,
      required: true
    },
    focusData: {
      type: Object,
      default() {
        return {};
      }
    },
    customerData: {
      type: Object,
      default() {
        return {};
      }
    },
    supplierData: {
      type: Object,
      default() {
        return {};
      }
    },
    logisticsData: {
      type: Object,
      default() {
        return {};
      }
    },
    insuranceData: {
      type: Object,
      default() {
        return {};
      }
    },
    customerBelongs: {
      type: Array,
      default() {
        return [];
      }
    },
    supplierBelongs: {
      type: Array,
      default() {
        return [];
      }
    },
    logisticsBelongs: {
      type: Array,
      default() {
        return [];
      }
    },
    insuranceBelongs: {
      type: Array,
      default() {
        return [];
      }
    },
    isOpenData: {
      type: Object,
      default() {
        return {
          isCustomer: false,
          isSupplier: false,
          isLogistics: false,
          isInsuranceCompany: false
        };
      }
    },
    isCustomer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const lowerRateValidater = (rule, value, callback) => {
      if (!this.customerForm?.flags?.allowBargainLower || Number(value) === 0) {
        return callback();
      }
      //上限必须大于下限
      if (
        Number(this.customerForm.bargainUpperRate || 0) < Number(value || 0)
      ) {
        return callback(new Error("议价下限必须小于等于议价上限"));
      }
      return callback();
    };
    const upperRateValidater = (rule, value, callback) => {
      if (!this.customerForm?.flags?.allowBargainUpper || Number(value) === 0) {
        return callback();
      }
      //上限必须大于下限
      if (
        Number(value || 0) < Number(this.customerForm.bargainLowerRate || 0)
      ) {
        return callback(new Error("议价上限必须大于等于议价下限"));
      }
      return callback();
    };
    return {
      isYunXiu: userMsg().hasYx,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      reconciliationDayOptions: DAYOPTIONS,
      customerForm: {},
      supplierForm: {},
      logisticsForm: {},
      insuranceForm: {},
      bargainUpperRate: false,
      bargainLowerRate: true,
      rule: {
        bargainLowerRate: [
          {
            validator: lowerRateValidater,
            trigger: ["blur", "change"]
          }
        ],
        bargainUpperRate: [
          {
            validator: upperRateValidater,
            trigger: ["blur", "change"]
          }
        ]
      },
      priceType: [
        { id: "调拨价", name: "调拨价" },
        { id: "平台价", name: "平台价" },
        { id: "零售价", name: "零售价" },
        { id: "批发价", name: "批发价" },
        { id: "批发价一", name: "批发价一" },
        { id: "批发价二", name: "批发价二" },
        { id: "批发价三", name: "批发价三" },
        { id: "批发价四", name: "批发价四" }
      ]
    };
  },
  computed: {
    canEditCustomerForm() {
      if (this.isEdit) {
        return (
          this.hasBelongsPerm("updateCustomer", this.customerBelongs) &&
          this.hasBelongsPerm("readCustomer", this.customerBelongs) &&
          this.isOpenData.isCustomer
        );
      } else {
        return this.isOpenData.isCustomer;
      }
    },
    canEditSupplierForm() {
      if (this.isEdit) {
        return (
          this.hasBelongsPerm("updateSupplier", this.supplierBelongs) &&
          this.hasBelongsPerm("readSupplier", this.customerBelongs) &&
          this.isOpenData.isSupplier
        );
      } else {
        return this.isOpenData.isSupplier;
      }
    },
    canEditLogisticsForm() {
      if (this.isEdit) {
        return (
          this.hasBelongsPerm("updateLogistics", this.logisticsBelongs) &&
          this.hasBelongsPerm("readLogistics", this.customerBelongs) &&
          this.isOpenData.isLogistics
        );
      } else {
        return this.isOpenData.isLogistics;
      }
    },
    canInsuranceEditForm() {
      if (this.isEdit) {
        return (
          this.hasBelongsPerm("updateInsurance", this.insuranceBelongs) &&
          this.hasBelongsPerm("readInsurance", this.customerBelongs) &&
          this.isOpenData.isInsuranceCompany
        );
      } else {
        return this.isOpenData.isInsuranceCompany;
      }
    }
  },
  watch: {
    customerData: {
      handler(value) {
        this.customerForm = { ...value };
      },
      deep: true,
      immediate: true
    },
    supplierData: {
      handler(value) {
        this.supplierForm = { ...value };
      },
      deep: true,
      immediate: true
    },
    logisticsData: {
      handler(value) {
        this.logisticsForm = { ...value };
      },
      deep: true,
      immediate: true
    },
    insuranceData: {
      handler(value) {
        this.insuranceForm = { ...value };
      },
      deep: true,
      immediate: true
    },
    isCustomer: {
      handler(value) {
        if (value) {
          this.customerForm.flags.allowLastSale = true;
        }
      }
    }
  },
  methods: {
    triggerRefreshData() {
      this.handleCustomerFormChange();
    },
    validateForm() {
      this.$refs.form.validate();
    },
    store() {
      return store;
    },
    numberChange() {
      if (
        parseFloat(this.customerForm.repairPartDiscount).toFixed(3) == "NaN"
      ) {
        this.customerForm.repairPartDiscount = 0;
      }
      if (
        parseFloat(this.customerForm.repairManHourDiscount).toFixed(3) == "NaN"
      ) {
        this.customerForm.repairManHourDiscount = 0;
      }
      // 客户属性-账期
      if (this.customerForm.accountPeriod == "") {
        this.customerForm.accountPeriod = 0;
      } else {
        this.customerForm.accountPeriod = parseInt(
          this.customerForm.accountPeriod
        );
      }
      // 供应商属性-账期
      if (this.supplierForm.accountPeriod == "") {
        this.supplierForm.accountPeriod = 0;
      } else {
        this.supplierForm.accountPeriod = parseInt(
          this.supplierForm.accountPeriod
        );
      }
      // 物流公司属性-回款天数
      if (this.logisticsForm.agencyReceiptReturnDays == "") {
        this.logisticsForm.agencyReceiptReturnDays = 0;
      } else {
        this.logisticsForm.agencyReceiptReturnDays = parseInt(
          this.logisticsForm.agencyReceiptReturnDays
        );
      }
      // 物流公司属性-账期
      if (this.logisticsForm.accountPeriod == "") {
        this.logisticsForm.accountPeriod = 0;
      } else {
        this.logisticsForm.accountPeriod = parseInt(
          this.logisticsForm.accountPeriod
        );
      }
      // 保险公司属性-账期
      if (this.insuranceForm.accountPeriod == "") {
        this.insuranceForm.accountPeriod = 0;
      } else {
        this.insuranceForm.accountPeriod = parseInt(
          this.insuranceForm.accountPeriod
        );
      }
    },
    handleCustomerFormChange() {
      // console.log(this.customerForm.repairPartDiscount);
      // this.customerForm.repairPartDiscount = String(
      //   this.customerForm.repairPartDiscount
      // ).replace(/[^\d]/g, "");
      this.$emit("update:customerData", { ...this.customerForm });
    },
    handleSupplierFormChange() {
      this.$emit("update:supplierData", { ...this.supplierForm });
    },
    handleLogisticsFormChange() {
      this.$emit("update:logisticsData", { ...this.logisticsForm });
    },
    handleInsuranceFormChange() {
      this.$emit("update:insuranceData", { ...this.insuranceForm });
    },
    handleChangeSettlementType(value) {
      if (value === "现付") {
        this.customerForm.flags.allowDebt = false;
      } else if (value === "挂账") {
        this.customerForm.flags.allowDebt = true;
      }
      this.handleCustomerFormChange();
    },
    handleChangeAllowDebt(val) {
      if (!val) {
        this.customerForm.defaultSettlementType = "现付";
      }
      this.handleCustomerFormChange();
    },
    vaildatorForm() {
      let valiDate = true;
      this.$refs.form.validate((vali, err) => {
        if (!vali && err) {
          for (const i in err) {
            this.$message({
              message: err[i][0]?.message,
              type: "warning"
            });
            valiDate = false;
            return;
          }
        }
      });
      return valiDate;
    }
  }
};
</script>

<style lang="scss" scoped>
.is-unopen {
  text-align: right;
  margin-right: 10px;
}
.unit-attribute {
  ::v-deep .el-checkbox__label {
    padding-left: 3px;
    font-size: 13px;
  }
  ::v-deep .el-input-group__append,
  ::v-deep .el-input-group__prepend {
    padding: 0 8px;
  }
  ::v-deep .el-checkbox__inner {
    margin-top: -1px;
  }
  ::v-deep .el-input__inner {
    padding: 0 10px;
    font-size: 12px;
  }
}
</style>
