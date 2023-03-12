<template>
  <el-form
    ref="headerForm"
    v-switch-focus="focusData"
    :rules="rules"
    :show-message="false"
    :model="formData"
    :disabled="!canEdit || isPlatform"
    class="form-item-small-margin-bottom"
    label-width="75px"
    label-position="left"
    size="mini"
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
              :disabled="!directCreate"
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
              @change="billHeadersUpdateWithCooperator"
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
              :default-value.sync="formData.businessManName"
              :disabled="!businessManChangeable || !directCreate"
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
          <el-col :span="7"
            ><el-form-item prop="logisticsCompanyId" label="物流公司">
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
                @intput-enter="debouncedHandleInputEnter"
              /> </el-form-item
          ></el-col>
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
          </el-col>
          <el-col :span="5">
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
              /> </el-form-item
          ></el-col>
          <el-col :span="7">
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
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="预计到货日" prop="arrivalDate">
              <el-date-picker
                v-model="formData.arrivalDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                @change="billHeadersUpdate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="对方订单号" prop="peerOrderNo">
              <ht-input
                v-model="formData.peerOrderNo"
                class="switch-focus focus-peerOrderNo"
                @intput-enter="debouncedHandleInputEnter('peerOrderNo')"
                @change="billHeadersUpdate"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人信息" prop="receiverInfo">
              <receiver-info
                v-model="receiverInfo"
                :visible.sync="receiverAddressVisible"
                @change="handleReceiverInfo"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </Collapse>
  </el-form>
</template>
<script>
import { reqPurchaseSupplierDefault } from "@/api/purchase/suppliersDefault";
import { reqReceiveHeaderUpdate } from "@/api/purchase/purchaseReceive";
import { CooperatorsSelect } from "@/components/select";
import ReceiverInfo from "@/components/receiverInfo";
import Collapse from "@/components/collapse";
import BillStatusBar from "@/components/billStatusBar";
import { PURCHASE_RECEIVE_STATUS } from "@/constants/states/purchase";
import { receiveFilters } from "@/utils/tool";
import debounce from "throttle-debounce/debounce";
import { baseDataMixin, searchMixin } from "@/mixins";
import { mapState } from "vuex";
import * as store from "@/utils/store";

export default {
  name: "ReceiveHeader",
  components: {
    Collapse,
    BillStatusBar,
    ReceiverInfo,
    CooperatorsSelect
  },
  mixins: [baseDataMixin, searchMixin],
  props: {
    canEdit: Boolean,
    directCreate: Boolean,
    isPlatform: Boolean,
    orderDetailsVisible: Boolean,
    header: {
      type: Object,
      required: true
    },
    focusData: {
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
      formData: {
        ...this.header
      },
      cacheTaxRate: 0,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      statusTxt: "",
      receiverInfo: {},
      receiverAddressVisible: false,
      cantPickMethod: false,
      rules: {
        billDate: [
          { required: true, message: "请选择日期", trigger: "change" }
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
      }
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
      if (val === "物流代收") {
        this.$set(this.formData, "pickMethod", "发货");
        this.cantPickMethod = true;
      } else {
        this.$set(this.formData, "pickMethod", this.formData.pickMethod);
        this.cantPickMethod = false;
      }
    },
    "formData.billDate"(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.formData.arrivalDate = "";
      }
    }
  },
  mounted() {
    this.$store.dispatch("admin/purchaseMan/loadAll");
    this.$store.dispatch("admin/receiverInfo/loadAll");
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
    invoiceTypeHandleInputEnter() {
      this.$emit("invoice-type-input-enter");
    },
    initHeaderData() {
      this.statusTxt = PURCHASE_RECEIVE_STATUS[this.header.status] || "";
      this.formData = { ...this.header };
      this.setPickMethod();
      this.refreshReceiverInfo();
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
    formatInvoiceTypeName(item) {
      return `${item.name}(${Number(item.specialValue) * 100}%)`;
    },
    billHeadersUpdateWithCooperator(val) {
      if (!val) return;
      reqPurchaseSupplierDefault(val)
        .then(data => {
          const params = receiveFilters(data);
          this.formData = { ...this.formData, ...params };
          this.refreshReceiverInfo();
          this.billHeadersUpdate();
          this.$emit("on-cooperator-change");
        })
        .catch(() => {});
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
    updateBillHeaderLogistics(id) {
      this.$emit("updateBillHeaderLogistics", id);
      this.billHeadersUpdate();
    },
    billHeadersUpdate() {
      if (this.formData.enhancedSettlementType === "物流代收") {
        this.$set(this.formData, "pickMethod", "发货");
      }
      this.$emit("update:header", { ...this.formData });
      if (!this.formData.id) return;
      if (this.getFormValidate()) {
        reqReceiveHeaderUpdate(this.formData)
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
    refreshReceiverInfo() {
      this.receiverInfo = {
        receiverName: this.formData.receiverName,
        receiverPhone: this.formData.receiverPhone,
        receiverAreaNames: this.formData.receiverAreaNames,
        receiverAddress: this.formData.receiverAddress
      };
    },
    handleReceiverInfo(val) {
      this.formData = { ...this.formData, ...val };
      this.billHeadersUpdate();
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
