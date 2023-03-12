<template>
  <ht-dialog
    v-bind="$attrs"
    :title="isEdit ? '编辑往来单位' : '新增往来单位'"
    width="1200px"
    top="7vh"
    v-on="$listeners"
  >
    <ht-tabs v-model="activeTab" :tabs="TABS" class="tabs-regular" />
    <div class="container-box" style="height: 540px;">
      <el-row
        v-if="activeTab === TABS[0].id"
        :gutter="5"
        style="margin: 5px; height: 100%;"
      >
        <el-col :span="9" style="height: 100%;">
          <BaseInformation
            ref="refBaseInformation"
            :is-edit="isEdit"
            :form-data.sync="cooperatorData"
            :belongs="cooperatorBelongs"
            :focus-data="focusData"
            :handle-input-enter="handleInputEnter"
            @updateIsCustomer="updateIsCustomer"
            @click.native.stop="setKeyScope(keyScopes.baseInfoForm)"
          />
        </el-col>
        <el-col :span="15" style="height: 100%;">
          <resize-box :default-len="260" direction-contrary is-column>
            <template v-slot:block1>
              <ContactTable
                :is-edit="isEdit"
                :key-scope="keyScopes.contactTable"
                :default-data.sync="contactsData"
                :belongs="contactsBelongs"
                @hotkeysUp="handleTableKeyCode"
                @click.native.stop="setKeyScope(keyScopes.contactTable)"
              />
            </template>
            <template v-slot:block2>
              <BusinessMenTable
                :is-edit="isEdit"
                :key-scope="keyScopes.businessMenTable"
                :default-data.sync="businessMenData"
                :belongs="businessMenBelongs"
                @hotkeysUp="handleTableKeyCode"
                @click.native.stop="setKeyScope(keyScopes.businessMenTable)"
              />
            </template>
          </resize-box>
        </el-col>
      </el-row>
      <UnitAttribute
        v-show="activeTab === TABS[1].id"
        :customer-data.sync="customerData"
        :supplier-data.sync="supplierData"
        :source-platform.sync="sourcePlatform"
        :logistics-data.sync="logisticsData"
        :insurance-data.sync="insuranceData"
        :customer-belongs="customerBelongs"
        :supplier-belongs="supplierBelongs"
        :logistics-belongs="logisticsBelongs"
        :insurance-belongs="insuranceBelongs"
        :focus-data="focusData"
        :is-open-data="isOpenData"
        :handle-input-enter="handleInputEnter"
        :isCustomer="isCustomer"
        :isEdit="isEdit"
        ref="attrForm"
        @click.native.stop="setKeyScope(keyScopes.attributeTab)"
      />
      <MergeLog
        v-if="activeTab === TABS[2].id"
        :id="Number(id)"
        :key-scope="keyScopes.mergeLogTab"
        @click.native.stop="setKeyScope(keyScopes.mergeLogTab)"
      />
    </div>
    <div class="dialog-footer-align" style="margin-top: 10px;">
      <el-button
        v-if="activeTab !== TABS[2].id"
        :loading="isSuccess"
        type="primary"
        size="mini"
        plain
        @click="submitHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :disabled="isSuccess"
        type="primary"
        size="mini"
        plain
        @click="cancelHandle"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import {
  BaseInformation,
  BusinessMenTable,
  ContactTable,
  UnitAttribute,
  MergeLog
} from "./components";
import {
  MIN_ACCOUNT_PERIOD,
  MIN_AGENCY_RECEIPT_RETURN_DAYS
} from "./constants";
import {
  createOrEditCooperators,
  resBasicCooperators,
  resBusinessMen,
  resCooperatorsContacts,
  resUnitCustomers,
  resUnitLogistics,
  resUnitSuppliers,
  resUnitInsurance
} from "@/api/communion/communion";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";
import { userMsg } from "@/utils/store";

let oldKeyScope;
const TABS = [
  { name: "单位信息", id: "unitInfo" },
  { name: "单位属性", id: "unitAttribute" },
  { name: "合并日志", id: "mergeLog" }
];
const defaultIsOpenData = {
  isCustomer: false,
  isSupplier: false,
  isLogistics: false,
  isInsuranceCompany: false
};
const defaultCustomerData = {
  property: null,
  defaultInvoiceType: null,
  priceType: null,
  defaultSettlementType: null,
  bargainUpperRate: 0,
  bargainLowerRate: 0,
  autoReconciliation: false,
  repairPartDiscount: 10, // 维修配件折扣
  repairManHourDiscount: 10, // 维修工时折扣
  reconciliationDay: null,
  accountPeriod: MIN_ACCOUNT_PERIOD,
  flags: {
    allowDebt: true,
    allowLastSale: false,
    allowBargainUpper: false,
    allowBargainLower: true
  },
  creditAmount: 0,
  defaultDeliveryType: null,
  defaultTransportType: null,
  defaultPackingWay: null,
  defaultLogisticsCompanyId: null,
  belongs: null
};
const defaultSupplierData = {
  defaultInvoiceType: null,
  defaultSettlementType: null,
  autoReconciliation: false,
  reconciliationDay: null,
  accountPeriod: MIN_ACCOUNT_PERIOD,
  defaultDeliveryType: null,
  defaultTransportType: null,
  defaultPackingWay: null,
  defaultLogisticsCompanyId: null,
  belongs: null
};
const defaultLogisticsData = {
  defaultInvoiceType: null,
  defaultSettlementType: null,
  flags: { allowAgencyReceipt: true },
  agencyReceiptReturnDays: MIN_AGENCY_RECEIPT_RETURN_DAYS,
  autoReconciliation: false,
  reconciliationDay: null,
  accountPeriod: MIN_ACCOUNT_PERIOD,
  belongs: null
};

const defaultInsuranceData = {
  accountPeriod: 0,
  defaultInvoiceType: null,
  defaultSettlementType: null,
  reconciliationDay: null,
  autoReconciliation: false,
  belongs: null
};

export default {
  name: "CommunionInformationBox",
  components: {
    ResizeBox,
    BaseInformation,
    ContactTable,
    BusinessMenTable,
    UnitAttribute,
    MergeLog
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      isYunXiu: userMsg().hasYx,
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      TABS,
      activeTab: TABS[0].id,
      keyScopes: {
        baseInfoForm: Symbol("communionInformationBoxBaseInfoForm"),
        contactTable: Symbol("communionInformationBoxnContactTable"),
        businessMenTable: Symbol("communionInformationBoxBusinessMenTable"),
        attributeTab: Symbol("communionInformationBoxAttributeTab"),
        mergeLogTab: Symbol("communionInformationBoxMergeLogTab")
      },
      sourcePlatform: "",
      isSuccess: false,
      isOpenData: {
        ...defaultIsOpenData
      },
      cooperatorData: {
        flags: {
          isCustomer: false,
          isSupplier: false,
          isLogistics: false,
          isInsuranceCompany: false,
          isCompany: true,
          isGroup: false,
          isGroupSettlement: false
        },
        area: {
          ids: []
        }
      },
      contactsData: [],
      businessMenData: {},
      customerData: { ...defaultCustomerData },
      supplierData: { ...defaultSupplierData },
      logisticsData: { ...defaultLogisticsData },
      insuranceData: { ...defaultInsuranceData },
      cooperatorBelongs: [],
      contactsBelongs: [],
      businessMenBelongs: [],
      customerBelongs: [],
      supplierBelongs: [],
      logisticsBelongs: [],
      insuranceBelongs: [],
      isCustomer: false
    };
  },
  computed: {
    ...mapState("admin/units", {
      types: state => {
        return state.type;
      }
    }),
    ...mapState("admin/user", {
      userInfoMsg: state => state.userInfoMsg
    }),
    ...mapState("admin/systemParams", {
      newCooperatorAllowOnAccount: state =>
        state.params.newCooperatorAllowOnAccount
    }),
    isEdit() {
      return !!this.id;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.resetHandle();
          this.initData(this.id);
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-name" });
            this.setKeyScope(this.keyScopes.baseInfoForm);
            this.$refs.refBaseInformation?.getForm().clearValidate();
          });
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    },
    activeTab(value) {
      if (value === TABS[0].id) {
        setTimeout(() => {
          this.updateFocusData({ initial: "focus-name" });
          this.setKeyScope(this.keyScopes.baseInfoForm);
          this.$refs.refBaseInformation?.getForm().clearValidate();
        });
      } else if (value === TABS[1].id) {
        this.isOpenData = { ...this.cooperatorData.flags };
        setTimeout(() => {
          this.updateFocusData({ initial: "focus-customerForm-property" });
          this.setKeyScope(this.keyScopes.attributeTab);
        });
      } else if (value === TABS[2].id) {
        setTimeout(() => {
          this.setKeyScope(this.keyScopes.mergeLogTab);
        });
      }
    },
    newCooperatorAllowOnAccount(val) {
      if (!this.isEdit) {
        defaultCustomerData.flags.allowDebt =
          val && val.length && val.includes(0);
      }
    }
  },
  mounted() {
    this.handleFormKeyCode(this.keyScopes.baseInfoForm);
    this.handleFormKeyCode(this.keyScopes.attributeTab);
    this.handleTableKeyCode(this.keyScopes.contactTable);
    this.handleTableKeyCode(this.keyScopes.businessMenTable);
    this.handleTableKeyCode(this.keyScopes.mergeLogTab);
  },
  activated() {
    if (!this.isEdit) {
      defaultCustomerData.flags.allowDebt =
        this.newCooperatorAllowOnAccount &&
        this.newCooperatorAllowOnAccount.length &&
        this.newCooperatorAllowOnAccount.includes(0);
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.baseInfoForm);
    hotkeys.deleteScope(this.keyScopes.contactTable);
    hotkeys.deleteScope(this.keyScopes.businessMenTable);
    hotkeys.deleteScope(this.keyScopes.attributeTab);
    hotkeys.deleteScope(this.keyScopes.mergeLogTab);
  },
  methods: {
    updateIsCustomer(value) {
      this.isCustomer = value;
    },
    handleFormKeyCode(keyScope) {
      hotkeys("f3,up,down", { scope: keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.submitHandle();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          default:
            return;
        }
      });
    },
    handleTableKeyCode(e) {
      switch (e.code) {
        case "F3":
          this.submitHandle();
          break;
        default:
          break;
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
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
    initData(id) {
      resBusinessMen(id || 0)
        .then(data => {
          if (data) {
            this.businessMenData = {
              availableToAll: data.availableToAll,
              belongs: data.belongs,
              rows: data.rows.map(item => {
                return {
                  ...item,
                  companyName:
                    item.company && item.company.name ? item.company.name : ""
                };
              })
            };
            if (this.isEdit) {
              this.businessMenBelongs = data.belongs;
            }
          }
        })
        .catch(() => {});
      if (id) {
        resBasicCooperators(id)
          .then(data => {
            if (data) {
              this.cooperatorData = {
                ...this.cooperatorData,
                ...data
              };
              this.cooperatorData.name = data.name;
              this.cooperatorData.shortName = data.shortName || data.name;
              if (this.isEdit) {
                this.cooperatorBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
        resCooperatorsContacts(id)
          .then(data => {
            if (data) {
              this.contactsData = data.rows || [];
              if (this.isEdit) {
                this.contactsBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
        resUnitCustomers(id)
          .then(data => {
            if (data) {
              data.bargainLowerRate =
                parseFloat(data.bargainLowerRate || 0) * 100;
              data.bargainUpperRate =
                parseFloat(data.bargainUpperRate || 0) * 100;
              this.customerData = { ...defaultCustomerData, ...data };
              if (data.sourcePlatform && data.sourcePlatform.length) {
                this.sourcePlatform = data.sourcePlatform;
              }
              if (this.isEdit) {
                this.customerBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
        resUnitSuppliers(id)
          .then(data => {
            if (data) {
              this.supplierData = { defaultSupplierData, ...data };
              if (this.isEdit) {
                this.supplierBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
        resUnitLogistics(id)
          .then(data => {
            if (data) {
              this.logisticsData = { defaultLogisticsData, ...data };
              if (this.isEdit) {
                this.logisticsBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
        resUnitInsurance(id)
          .then(data => {
            if (data) {
              this.insuranceData = { defaultInsuranceData, ...data };
              if (this.isEdit) {
                this.insuranceBelongs = data.belongs;
              }
            }
          })
          .catch(() => {});
      }
    },
    submitHandle() {
      //基础表触发一下数据刷新；
      this.$refs.refBaseInformation?.triggerRefreshData();
      this.$refs.attrForm?.triggerRefreshData();

      //单位属性表单验证
      if (!this.$refs.attrForm.vaildatorForm()) return;
      if (!this.cooperatorData.name) {
        this.$message.warning({
          message: "请选输入单位名称！",
          showClose: true
        });
        return;
      }
      if (
        !this.cooperatorData.flags.isCustomer &&
        !this.cooperatorData.flags.isSupplier &&
        !this.cooperatorData.flags.isLogistics &&
        !this.cooperatorData.flags.isInsuranceCompany
      ) {
        this.$message.warning({ message: "请选择单位类型！", showClose: true });
        return;
      }
      if (
        parseFloat(this.customerData.repairPartDiscount).toFixed(3) < 0 ||
        parseFloat(this.customerData.repairPartDiscount).toFixed(3) > 10
      ) {
        this.$message.warning({
          message: "配件折扣为0-10的数字，保留2位小数！",
          showClose: true
        });
        return;
      } else {
        this.customerData.repairPartDiscount = parseFloat(
          this.customerData.repairPartDiscount
        )
          .toFixed(3)
          .slice(0, -1);
      }
      if (
        parseFloat(this.customerData.repairManHourDiscount).toFixed(3) < 0 ||
        parseFloat(this.customerData.repairManHourDiscount).toFixed(3) > 10
      ) {
        this.$message.warning({
          message: "工时折扣为0-10的数字，保留2位小数！",
          showClose: true
        });
        return;
      } else {
        this.customerData.repairManHourDiscount = parseFloat(
          this.customerData.repairManHourDiscount
        )
          .toFixed(3)
          .slice(0, -1);
      }
      if (!this.customerData.creditAmount) {
        this.customerData.creditAmount = 0;
      } else if (
        this.customerData.creditAmount < 0 ||
        this.customerData.creditAmount !=
          Math.round(this.customerData.creditAmount)
      ) {
        this.$message.warning({
          message: "信用额度请填写正整数！",
          showClose: true
        });
        return;
      }
      this.isSuccess = true;
      let businessMenData = JSON.parse(JSON.stringify(this.businessMenData));
      const updateBusinessMen = this.hasBelongsPerm(
        "updateBusinessMen",
        this.supplierBelongs
      );
      const updateCompany = this.hasBelongsPerm(
        "updateCompany",
        this.supplierBelongs
      );
      if (!updateBusinessMen && !updateCompany) {
        businessMenData = undefined;
      } else if (!updateBusinessMen || !updateCompany) {
        if (businessMenData.rows && businessMenData.rows.length > 0) {
          businessMenData.rows.forEach(item => {
            if (!updateBusinessMen && updateCompany) {
              delete item.purchaseMan;
              delete item.salesMan;
            } else if (updateBusinessMen && !updateCompany) {
              delete item.enabled;
            }
          });
        }
      }
      createOrEditCooperators({
        cooperatorId: this.id,
        cooperator:
          this.hasBelongsPerm("updateBasicAndContacts", this.supplierBelongs) ||
          !this.isEdit
            ? {
                ...this.cooperatorData
              }
            : undefined,
        contacts:
          this.hasBelongsPerm("updateBasicAndContacts", this.supplierBelongs) ||
          !this.isEdit
            ? this.contactsData
            : undefined,
        businessMen: businessMenData,
        customer:
          this.hasBelongsPerm("updateCustomer", this.supplierBelongs) ||
          !this.isEdit
            ? {
                ...this.customerData,
                bargainUpperRate:
                  parseFloat(this.customerData.bargainUpperRate || 0) / 100,
                bargainLowerRate:
                  parseFloat(this.customerData.bargainLowerRate || 0) / 100,
                accountPeriod: this.customerData.autoReconciliation
                  ? this.customerData.accountPeriod
                  : undefined,
                reconciliationDay: this.customerData.autoReconciliation
                  ? this.customerData.reconciliationDay
                  : undefined
              }
            : undefined,
        supplier:
          this.hasBelongsPerm("updateSupplier", this.supplierBelongs) ||
          !this.isEdit
            ? {
                ...this.supplierData,
                accountPeriod: this.supplierData.autoReconciliation
                  ? this.supplierData.accountPeriod
                  : undefined,
                reconciliationDay: this.supplierData.autoReconciliation
                  ? this.supplierData.reconciliationDay
                  : undefined
              }
            : undefined,
        logistics:
          this.hasBelongsPerm("updateLogistics", this.supplierBelongs) ||
          !this.isEdit
            ? {
                ...this.logisticsData,
                agencyReceiptReturnDays:
                  this.logisticsData.agencyReceiptReturnDays ||
                  MIN_AGENCY_RECEIPT_RETURN_DAYS,
                accountPeriod: this.logisticsData.autoReconciliation
                  ? this.logisticsData.accountPeriod
                  : undefined,
                reconciliationDay: this.logisticsData.autoReconciliation
                  ? this.logisticsData.reconciliationDay
                  : undefined
              }
            : undefined,
        insuranceCompany:
          this.hasBelongsPerm("updateInsurance", this.supplierBelongs) ||
          !this.isEdit
            ? {
                ...this.insuranceData,
                agencyReceiptReturnDays: this.insuranceData
                  .agencyReceiptReturnDays
                  ? this.insuranceData.agencyReceiptReturnDays
                  : 0
              }
            : undefined
      })
        .then(() => {
          this.isSuccess = false;
          this.$emit("on-save", false);
          this.$emit("infoChange", {
            ...this.cooperatorData
          });
          this.cancelHandle();
        })
        .catch(() => {
          this.isSuccess = false;
        });
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    resetHandle() {
      this.cooperatorData = {
        flags: {
          isCustomer: false,
          isSupplier: false,
          isLogistics: false,
          isCompany: true,
          isGroup: false,
          isGroupSettlement: false
        },
        area: {
          ids: []
        }
      };
      this.contactsData = [];
      this.businessMenData = {};
      this.customerData = { ...defaultCustomerData };
      this.supplierData = { ...defaultSupplierData };
      this.logisticsData = { ...defaultLogisticsData };
      this.insuranceData = { ...defaultInsuranceData };
      this.isOpenData = { ...defaultIsOpenData };
      this.activeTab = TABS[0].id;
    }
  }
};
</script>
