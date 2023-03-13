<template>
  <div class="container-box">
    <div class="header header-between">
      <div>
        <el-button
          :disabled="!canClick || !canCreate"
          type="primary"
          size="mini"
          @click="createHandle"
        >
          开单（F2）
        </el-button>
        <el-button
          :disabled="!canClick"
          type="primary"
          size="mini"
          @click="showSearchBox"
        >
          查询（Ins）
        </el-button>
        <el-button
          :disabled="!canClick || !canShowPartDetailBox"
          type="primary"
          size="mini"
          @click="showPartDetailBox"
        >
          配件详情（F10）
        </el-button>
        <el-button
          :disabled="
            !canClick ||
              (!selectedPartsListRows.length && !selectedDetailsRows.length)
          "
          type="primary"
          size="mini"
          @click="showStocksLockedBox"
        >
          锁定数明细
        </el-button>
        <div class="inline-block m-l-6">
          <div class="inline-block m-l-6">查询模式：</div>
          <div class="inline-block m-l-4">
            <ht-autoselect
              size="mini"
              style="width:260px;"
              v-model="mode"
              @change="handleModeChange"
              :options="modeOptions"
              :trigger-on-focus="false"
              placeholder="请选择"
              highlight-first-item
            />
          </div>
        </div>
      </div>
      <div style="min-width:140px;">
        <el-link :underline="false" @click="backMainList">
          返回列表
          <span class="el-icon-arrow-right" />
        </el-link>
        <span
          class="text-danger"
          style="cursor:pointer;float:right"
          @click="openManualDialog"
          ><i class="el-icon-question"></i>帮助</span
        >
      </div>
    </div>

    <ht-card no-padding class="auto-card">
      <resize-box :default-len="242" is-column>
        <template v-slot:block1>
          <PartsList
            ref="refPartsList"
            :key-scope="keyScope.partsTable"
            :table-data.sync="partsTableData"
            :selected-rows.sync="selectedPartsListRows"
            :canAdd="canEdit"
            :isPlatform="isPlatform"
            :type="TYPE"
            :mode="mode"
            @hotkeysUp="handlePartsTableKeyCode"
            @handle-row="handleRowAdd"
            @on-add-data="addDetailHandle"
            @part-swap="showPartSwapBox"
            @part-detail-change="showPartDetailBox"
            @click.native.stop="setKeyScope(keyScope.partsTable)"
          />
        </template>
        <template v-slot:block2>
          <div class="container-box">
            <div class="header">
              <el-button
                :disabled="!canClick || !canDelete"
                :loading="deleteLoading"
                type="primary"
                size="mini"
                @click="deleteHandle"
              >
                删除（F4）
              </el-button>
              <el-button
                :disabled="!canClick || !canSubmit"
                :loading="submitLoading"
                type="primary"
                size="mini"
                @click="submitHandle"
              >
                提交（F9）
              </el-button>
              <el-button
                :disabled="!canClick || !canRecall"
                :loading="recallLoading"
                type="primary"
                size="mini"
                @click="recallHandle"
              >
                撤回（F9）
              </el-button>
              <el-button
                :disabled="!canClick || !canDepositAudit"
                type="primary"
                size="mini"
                @click="depositAuditHandle"
              >
                定金审核（F7）
              </el-button>
              <el-button
                :disabled="!canClick || !canAudit"
                type="primary"
                size="mini"
                @click="auditHandle"
              >
                审核（F7）
              </el-button>
              <el-button
                :disabled="!canClick || !canCancel"
                type="primary"
                size="mini"
                @click="cancelHandle"
              >
                配件取消
              </el-button>
              <el-button
                :disabled="!canClick || !canTransfer"
                type="primary"
                size="mini"
                @click="transferHandle"
              >
                转采购单（F8）
              </el-button>
              <el-button
                :disabled="!canClick || !canExport"
                type="primary"
                size="mini"
                @click="exportHandle"
              >
                导出（Alt+D）
              </el-button>
              <el-button
                :disabled="!canClick || !canImport"
                type="primary"
                size="mini"
                @click="importHandle"
              >
                导入（Alt+I）
              </el-button>
              <el-button
                :disabled="!canClick || !canPrint"
                type="primary"
                size="mini"
                @click="printHandle"
              >
                打印（F11）
              </el-button>
            </div>
            <ht-card @click.stop="setFormKeyScope" style="margin: 5px 0 0 0;">
              <el-form
                ref="headerForm"
                v-switch-focus="focusData"
                :rules="rules"
                :model="header"
                :disabled="!canEdit"
                :show-message="false"
                class="form-item-small-margin-bottom"
                label-position="left"
                label-width="75px"
                size="mini"
              >
                <Collapse :isCollapse.sync="isCollapse">
                  <el-row :gutter="10">
                    <el-col :span="6">
                      <el-form-item
                        class="contact-info-container"
                        label="供应商"
                        prop="cooperatorId"
                      >
                        <CooperatorsSelect
                          v-model="header.cooperatorId"
                          :clearable="false"
                          :disabled="isPlatform"
                          :default-value.sync="header.cooperatorName"
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
                          @intput-enter="
                            debouncedHandleInputEnter('cooperatorId')
                          "
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label-width="71px"
                        prop="enhancedSettlementType"
                        label="支付方式"
                      >
                        <ht-autoselect
                          v-model="header.enhancedSettlementType"
                          :clearable="false"
                          :disabled="isPlatform"
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
                    </el-col>
                    <el-col :span="4">
                      <el-form-item
                        label-width="71px"
                        prop="invoiceType"
                        label="发票类型"
                      >
                        <ht-autoselect
                          v-model="header.invoiceType"
                          :clearable="false"
                          :disabled="isPlatform"
                          :options="store().formatInvoiceTypeDictionary()"
                          :trigger-on-focus="false"
                          :format-name="
                            value =>
                              getFormatInvoiceType(
                                header.invoiceType,
                                header.taxRate
                              )
                          "
                          class="switch-focus focus-invoiceType"
                          placeholder="请选择"
                          mnemonic
                          filter-zero
                          highlight-first-item
                          @intput-enter="invoiceTypeHandleInputEnter"
                          @change="updateBillHeaderTaxed(header.invoiceType)"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label-width="0">
                        <div style="display: flex;">
                          <bill-status-bar
                            :bill-no="header.billNo"
                            :bill-status="statusTxt"
                          />
                          <small class="text-font-danger remark-container">
                            {{ tips }}
                          </small>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <el-form-item label="业务日期" prop="billDate">
                        <el-date-picker
                          v-model="header.billDate"
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
                      <el-form-item
                        label-width="45px"
                        prop="businessManId"
                        label="业务员"
                      >
                        <ht-autoselect
                          v-model="header.businessManId"
                          :disabled="!businessManChangeable"
                          :default-value.sync="header.businessManName"
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
                    <el-col :span="4">
                      <el-form-item
                        label-width="31px"
                        label="定金"
                        prop="depositAmount"
                      >
                        <ht-format-number
                          v-model="header.depositAmount"
                          :min="0"
                          class="switch-focus focus-depositAmount"
                          precision-type="money"
                          @intput-enter="debouncedHandleInputEnter"
                          @blur="billHeadersUpdate"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item
                        label-width="31px"
                        label="备注"
                        prop="remark"
                      >
                        <ht-input
                          v-model="header.remark"
                          class="switch-focus focus-remark"
                          placeholder="最大支持100个字符"
                          maxlength="100"
                          @intput-enter="debouncedHandleInputEnter"
                          @change="billHeadersUpdate"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <template v-slot:collapse>
                    <el-row :gutter="10">
                      <el-col :span="15">
                        <el-form-item label="收货人信息" prop="receiverInfo">
                          <receiver-info
                            v-model="receiverInfo"
                            :visible.sync="receiverAddressVisible"
                            @change="handleReceiverInfo"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="5">
                        <el-form-item
                          label-width="87px"
                          label="预计到货日期"
                          prop="arrivalDate"
                        >
                          <el-date-picker
                            v-model="header.arrivalDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            @change="billHeadersUpdate"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item
                          prop="pickMethod"
                          label="提货方式"
                          label-width="60px"
                        >
                          <ht-autocomplete
                            v-model="header.pickMethod"
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
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="4">
                        <el-form-item prop="transportMethod" label="运输方式">
                          <ht-autocomplete
                            v-model="header.transportMethod"
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
                      <el-col :span="4">
                        <el-form-item
                          prop="packMethod"
                          label="包装方式"
                          label-width="60px"
                        >
                          <ht-autocomplete
                            v-model="header.packMethod"
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
                      <el-col :span="4">
                        <el-form-item prop="freightPayer" label="运费付款方">
                          <ht-autoselect
                            v-model="header.freightPayer"
                            :options="store().freightPayerDictionary()"
                            :trigger-on-focus="false"
                            class="switch-focus focus-freightPayer"
                            placeholder="请选择"
                            clearable
                            highlight-first-item
                            @intput-enter="debouncedHandleInputEnter"
                            @change="billHeadersUpdate"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          prop="logisticsCompanyId"
                          label="物流公司"
                          label-width="60px"
                        >
                          <CooperatorsSelect
                            v-model="header.logisticsCompanyId"
                            :default-value.sync="header.logisticsCompanyName"
                            :allow-create="
                              hasCompletePerm(
                                'basics.cooperators.createLogistics'
                              )
                            "
                            no-data-tips="没有查询到物流公司,回车新增"
                            type="logistics"
                            class="switch-focus focus-logisticsCompanyId"
                            placeholder="请选择"
                            clearable
                            @change="updateBillHeaderLogistics"
                            @intput-enter="debouncedHandleInputEnter"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item
                          label="对方订单号"
                          prop="peerOrderNo"
                          label-width="75px"
                        >
                          <ht-input
                            v-model="header.peerOrderNo"
                            class="switch-focus focus-peerOrderNo"
                            @intput-enter="
                              debouncedHandleInputEnter('peerOrderNo')
                            "
                            @change="billHeadersUpdate"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </template>
                </Collapse>
              </el-form>
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <ht-setting-table
                :file-name="`订货计划单-${header.billNo}`"
                :table-name="detailsName"
                :export-table-visible.sync="exportTableVisible"
                :loading="detailsLoading"
                :data="details"
                :summary-method="
                  params =>
                    getSummariesByCalculate(
                      params,
                      PURCHASE_ORDER_DETAIL_TOTAL_FILES
                    )
                "
                :columns="detailsFormatColumns"
                :key-scope="keyScope.detailsTable"
                :selected-rows.sync="selectedDetailsRows"
                :scroll-to-end="isScrollToEnd"
                show-summary
                setting-all-column
                show-table-setting
                @hotkeysUp="handleDetailsTableKeyCode"
                @rowOperation="handleRowEdit"
                @rowDelete="handleRowDelete"
                @click.native.stop="setKeyScope(keyScope.detailsTable)"
                @sort-change="handleSortChange"
              />
            </ht-card>
          </div>
        </template>
      </resize-box>
    </ht-card>

    <div class="footer">
      <div class="footer-statistical">
        <div class="footer-statistical">
          <div>
            记录数：
            <div class="amount-font">
              {{ details.length }}
            </div>
          </div>
          <div>
            总数量：
            <div class="amount-font">
              {{ totoalQty }}
            </div>
          </div>
          <div>
            合计应付：
            <div class="amount-font">
              {{ totoalAmount }}
            </div>
          </div>
        </div>
        <div class="footer-statistical">
          <div v-show="header.createdByName">
            制单人：
            <div class="text-font">
              {{ header.createdByName }}（{{ formatter(header.createdAt) }}）
            </div>
          </div>
          <div v-show="header.submitByName">
            提交人：
            <div class="text-font">
              {{ header.submitByName }}（{{ formatter(header.submitAt) }}）
            </div>
          </div>
        </div>
      </div>
    </div>

    <EditDetailBox
      :visible.sync="editDetailBoxVisible"
      :header="header"
      :mode="mode"
      :partData="partData"
      :companyId="companyId"
      :isEdit="isEdit"
      @sure="handleDetails"
    />
    <search-parts-box
      :visible.sync="searchBoxVisible"
      :companyId="companyId"
      :type="TYPE"
      @searchParamsChange="searchParamsChange"
    />
    <audit-box
      :visible.sync="auditVisible"
      :order-id="header.id || 0"
      :type="auditType"
      @on-complete="auditComplete"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canEdit"
      :partData="partSwapData"
      :type="TYPE"
      :mode="mode"
      @add-part="addDetailHandle"
    />
    <import-box
      :visible.sync="importVisible"
      :disabled="!canImport"
      :has-setting="importInfo.hasSetting"
      :options="importInfo.options"
      :req-handler="importPurchasesOrders"
      title="订货计划单明细导入"
    >
      <template>
        <el-form
          ref="importForm"
          :rules="importRules"
          :model="importInfo"
          :show-message="false"
          size="mini"
          label-position="left"
        >
          <el-form-item
            label="指定供应商"
            label-width="85px"
            prop="cooperatorId"
          >
            <CooperatorsSelect
              v-model="importInfo.cooperatorId"
              v-delay-focus="importVisible"
              :allow-create="
                hasCompletePerm('basics.cooperators.createSupplier')
              "
              type="supplier"
              no-data-tips="没有查询到供应商,回车新增"
            />
          </el-form-item>
          <el-form-item label-width="175px" label="自动创建不存在的配件资料">
            <el-switch v-model="importInfo.createPartsIfNotExist" />
          </el-form-item>
        </el-form>
      </template>
    </import-box>

    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      :mode="mode"
      :stock="stock"
      @close="storageStocksLockedVisible = false"
    />
    <CancelBox
      :visible.sync="cancelBoxVisible"
      :headerData="{ ...header, statusTxt: statusTxt, tips: tips }"
      :totalData="details"
      @success="handleCancelSuccess"
    />
    <TransferBox
      :visible.sync="transferBoxVisible"
      :headerData="{ ...header, statusTxt: statusTxt, tips: tips }"
      :totalData="details"
      :mapData="mapData"
      :companyId="companyId"
      @success="handleTransferSuccess"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import {
  deletePurchaseBilling,
  recallPurchaseBilling,
  reqPurchaseBillingDetails,
  reqPurchaseBillingDetailsDelete,
  reqPurchaseBillingDetailsUpdate,
  reqPurchaseBillingHeadersUpdate,
  submitPurchaseBilling
} from "@/api/purchase/purchaseList";
import { addLocalOrder, createLocalOrder } from "@/api/purchase/purchaseBasket";
import { reqPurchaseSupplierDefault } from "@/api/purchase/suppliersDefault";

import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import BillStatusBar from "@/components/billStatusBar";
import ResizeBox from "@/components/resizeBox";
import Collapse from "@/components/collapse";
import ReceiverInfo from "@/components/receiverInfo";
import { CooperatorsSelect } from "@/components/select";
import ImportBox from "@/components/importBox";
import { reqImportPurchasesOrders } from "@/api/importBox";
import { purchaseOrderOptions } from "@/components/importBox/options";
import { dateFormat, dateFormatFull } from "@/utils/date";
import {
  PURCHASE_BILLING_DETAILS,
  PURCHASE_ORDER_DETAIL_TOTAL_FILES
} from "../constants";
import BillMapConfirm from "@/components/bill-map-confirm";
import { reduce } from "lodash";
import debounce from "throttle-debounce/debounce";
import PartsInfoSearch from "@/components/partsInfoSearch";
import { PartSwapBox, PartsList, SearchPartsBox } from "../components";
import EditDetailBox from "./dialog/EditDetailBox";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import { receiveFilters, receiverInfoFilters } from "@/utils/tool";
import AuditBox from "./dialog/AuditBox";
import { PURCHASE_ORDER_STATUS } from "@/constants/states/purchase";
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import eventBus from "@/event";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { add } from "@/utils/numberAPI";
import CancelBox from "../components/CancelBox";
import TransferBox from "../components/TransferBox";
import summaries from "@/mixins/summaries";
import * as store from "@/utils/store";
import { NEW_MODE_OPTIONS } from "@/constants";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsDetail
} from "@/api/base/base";
const defaultHeader = {
  cooperatorId: null,
  cooperatorName: "",
  enhancedSettlementType: "",
  invoiceType: "",
  billDate: dateFormat(new Date(), "YYYY-MM-DD"),
  businessManId: null,
  businessManName: "",
  depositAmount: 0,
  remark: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaNames: [],
  receiverAddress: "",
  arrivalDate: null,
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  peerOrderNo: "",
  taxRate: 0,
  companyId: 0,
  belongs: []
};
const defaultFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};
const defaultImportInfo = {
  options: purchaseOrderOptions,
  hasSetting: true,
  cooperatorId: null,
  createPartsIfNotExist: false
};
const TYPE = "CD";

export default {
  name: "PurchaseBilling",
  components: {
    ResizeBox,
    Collapse,
    BillStatusBar,
    EditDetailBox,
    PartsList,
    SearchPartsBox,
    AuditBox,
    PartSwapBox,
    ImportBox,
    ReceiverInfo,
    CooperatorsSelect,
    AvaVehModels,
    PartsDetailBox,
    StorageStocksLockedDialog,
    CancelBox,
    TransferBox
  },
  mixins: [baseDataMixin, precisionsFixed, searchMixin, summaries],
  data() {
    return {
      exportTableVisible: false,
      detailsName: PURCHASE_BILLING_DETAILS.name,
      baseDetailsColumns: PURCHASE_BILLING_DETAILS.columns,
      keyScope: {
        detailsTable: Symbol("purchaseDetailsTable"),
        partsTable: Symbol("purchasePartsTable"),
        form: Symbol("purchaseFrom")
      },
      partsTableData: [],
      selectedPartsListRows: [],
      selectedDetailsRows: [],
      canHandleRowAdd: false,
      canHandleRowEdit: false,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        ...defaultFocusData
      },
      dateFormat,
      cantPickMethod: false,
      statusTxt: "",
      orderId: null,
      partId: null,
      receiverInfo: {},
      cacheReceiverInfo: {},
      receiverAddressVisible: false,
      header: {
        ...defaultHeader
      },
      partData: {},
      isEdit: false,
      editDetailBoxVisible: false,
      searchBoxVisible: false,
      partDetailBoxVisible: false,
      deleteLoading: false,
      recallLoading: false,
      submitLoading: false,
      auditVisible: false,
      auditBillId: 0,
      detailsLoading: false,
      isScrollToEnd: false,
      details: [],
      PURCHASE_ORDER_DETAIL_TOTAL_FILES,
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
      },

      importVisible: false,
      importRules: {
        cooperatorId: [
          { required: true, message: "请选择供应商", trigger: "change" }
        ]
      },
      importInfo: { ...defaultImportInfo },
      partSwapData: {},
      partSwapBoxVisible: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      hasAdd: false,
      isCollapse: false,
      storageStocksLockedVisible: false,
      stockFilter: {},
      cancelBoxVisible: false,
      transferBoxVisible: false,
      mapData: {},
      TYPE,
      sort: "",
      lastSearchData: null,
      modeOptions: NEW_MODE_OPTIONS,
      mode: 0,
      stock: {}
    };
  },
  computed: {
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      businessManChangeable: state =>
        state.systemParams.params.businessManChangeable,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    ...mapState("admin/receiverInfo", ["defaultReceiverInfo"]),
    detailsFormatColumns() {
      const editDetailHandle = (row, e) => {
        e.stopPropagation();
        this.setKeyScope(this.keyScope.detailsTable);
        this.editDetailHandle(row);
      };
      const deleteDetailHandle = (row, e) => {
        e.stopPropagation();
        this.setKeyScope(this.keyScope.detailsTable);
        this.deleteDetailHandle(row);
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
        this.avaVehModelsVisible = true;
      };
      return this.baseDetailsColumns
        .filter(item => this.canEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={e => editDetailHandle(row, e)}
                    ></i>
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={e => deleteDetailHandle(row, e)}
                    ></i>
                  </el-tooltip>
                </div>
              )
            };
          } else if (item.type === "avaVehModels") {
            return {
              ...item,
              render: (value, row) => (
                <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
                  查看
                </a>
              )
            };
          }
          return item;
        });
    },
    contactInfo() {
      return {
        contactName: this.header.contactName || "",
        contactPhone: this.header.contactPhone || "",
        groupName: this.header.groupName || ""
      };
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(this.details, (sum, item) => add(sum, Number(item.qty)), 0),
        "qty"
      );
    },
    totoalAmount() {
      return this.precisionFormat(
        reduce(
          this.details,
          (sum, item) => add(sum, Number(item.taxedAmount)),
          0
        ),
        "money"
      );
    },
    canShowPartDetailBox() {
      return (
        this.selectedPartsListRows.length || this.selectedDetailsRows.length
      );
    },
    isPlatform() {
      return !!this.header.platformKey;
    },
    tips() {
      let tips = "";
      if (this.isPlatform) {
        if ([0, 1, 2, 3, 4].includes(this.header.status)) {
          tips = `（${this.header.platformName}平台订单待卖家发货后，可转采购单）`;
        } else if (this.header.status === 12) {
          tips = `（请前往${this.header.platformName}平台完成付款）`;
        }
      }
      if (this.header.status === 5) {
        tips = "（请前往采购开单，完成采购入库单流程）";
      }
      return tips;
    },
    canClick() {
      return !this.submitLoading && !this.recallLoading && !this.deleteLoading;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        [0, 2, 6].includes(this.header.status) &&
        this.hasBelongsPerm("update", this.header.belongs)
      );
    },
    canEdit() {
      return (
        (!this.header.id && this.canCreate) ||
        (this.header.id && !this.isPlatform && this.canUpdate)
      );
    },
    canDelete() {
      return (
        !this.isPlatform &&
        [0, 2].includes(this.header.status) &&
        this.hasBelongsPerm("delete", this.header.belongs)
      );
    },
    canSubmit() {
      return (
        [0, 2, 6].includes(this.header.status) &&
        this.hasBelongsPerm("submit", this.header.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        [1, 13].includes(this.header.status) &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canAudit() {
      return (
        this.header.status === 1 &&
        this.hasBelongsPerm("audit", this.header.belongs)
      );
    },
    canDepositAudit() {
      return (
        this.header.status === 13 &&
        this.hasBelongsPerm("depositAudit", this.header.belongs)
      );
    },
    canCancel() {
      return (
        !this.isPlatform &&
        this.header.status === 5 &&
        Number(this.header.waitPurchaseQty || 0) > 0 &&
        this.hasBelongsPerm("cancel", this.header.belongs)
      );
    },
    canTransfer() {
      return (
        this.header.status === 5 &&
        Number(this.header.waitPurchaseQty || 0) > 0 &&
        this.hasBelongsPerm(
          "transfer",
          // 只操作自己公司的单据，有其他分公司权限不可操作
          this.header.belongs && this.header.belongs.length
            ? this.header.belongs
            : ["null"]
        )
      );
    },
    canExport() {
      return (
        this.details.length &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canImport() {
      return this.hasBelongsPerm("import");
    },
    canPrint() {
      return (
        this.details.length &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    auditType() {
      let type = "";
      if (this.header.status === 13) {
        type = "deposit";
      } else if (this.header.status === 1) {
        type = "order";
      }
      return type;
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    }
  },
  watch: {
    companyId() {
      this.partsTableData = [];
    },
    $route(to) {
      if (to.path === "/PurchaseBilling" && to.query.time) {
        this.orderId = Number(to.query.orderId);
        this.billInfoInit();
      }
    },
    partsTableData(value) {
      if (value.length) {
        this.setKeyScope(this.keyScope.partsTable);
        this.selectedPartsListRows = [value[0]];
      } else if (this.details.length) {
        this.setKeyScope(this.keyScope.detailsTable);
      } else {
        this.setFormKeyScope();
        this.updateFocusData({ initial: "focus-cooperatorId" });
      }
    },
    selectedPartsListRows(value) {
      if (value.length) {
        this.partId = value[0].partId;
        this.stock = value[0];
        this.selectedDetailsRows = [];
        this.canHandleRowAdd = true;
        this.canHandleRowEdit = false;
      }
    },
    selectedDetailsRows(value) {
      if (value.length) {
        this.partId = value[0].partId;
        this.selectedPartsListRows = [];
        this.canHandleRowEdit = true;
        this.canHandleRowAdd = false;
      }
    },

    "header.enhancedSettlementType"(val) {
      if (val === "物流代收") {
        this.$set(this.header, "pickMethod", "发货");
        this.cantPickMethod = true;
      } else {
        this.$set(this.header, "pickMethod", this.header.pickMethod);
        this.cantPickMethod = false;
      }
    },
    defaultReceiverInfo(val) {
      if (val) {
        this.cacheReceiverInfo = { ...val };
        if (!this.header.id) {
          this.setDefaultReceiverInfo();
        }
      }
    },
    orderId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    }
  },
  mounted() {
    hotkeys("*", { scope: this.keyScope.form }, e => {
      this.bindKeyCode(e, this.keyScope.form);
    });
    this.sort = getLocalTableSort(TYPE);
    this.setDefaultData();
    this.$store.dispatch("admin/purchaseMan/loadAll");
    this.$store.dispatch("admin/receiverInfo/loadAll");
    getStaffSystemParamsDetail({
      module: "purchase",
      type: "orderBillingMode"
    }).then(res => {
      this.mode = res.value;
    });
  },
  activated() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Purchase"
          type="purchase"
          header={this.header}
        />
      )
    });
    if (this.$route.query.orderId) {
      this.orderId = Number(this.$route.query.orderId);
      this.billInfoInit();
    } else {
      this.orderId = null;
      if (this.partsTableData.length) {
        this.setKeyScope(this.keyScope.partsTable);
      } else {
        this.setFormKeyScope();
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        });
      }
      this.$nextTick(() => {
        this.getHeaderForm().clearValidate();
      });
    }
  },
  async deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
    if (this.autoSubmitWhenClose) {
      await this.submitHandle();
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope.detailsTable);
    hotkeys.deleteScope(this.keyScope.partsTable);
    hotkeys.deleteScope(this.keyScope.form);
  },
  methods: {
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    store() {
      return store;
    },
    handleModeChange(value) {
      updateStaffSystemParamsDetail({
        module: "purchase",
        type: "orderBillingMode",
        value
      });
      if (!this.lastSearchData) return;
      this.lastSearchData.mode = value;
      this.$nextTick(() => {
        this.$refs.refPartsList.handleLocalSearch(this.lastSearchData);
      });
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 24);
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date());
    },
    bindKeyCode(e, keyScope) {
      switch (e.code) {
        case "F2":
          this.createHandle();
          break;
        case "F4":
          this.deleteHandle();
          break;
        case "F7":
          this.auditHandle();
          this.depositAuditHandle();
          break;
        case "F8":
          this.transferHandle();
          break;
        case "F9":
          this.submitHandle();
          this.recallHandle();
          break;
        case "F10":
          this.showPartDetailBox();
          break;
        case "F11":
          this.printHandle();
          break;
        case "KeyI":
          if (e.altKey) this.importHandle();
          break;
        case "KeyD":
          if (e.altKey) this.exportHandle();
          break;
        case "Insert":
          this.showSearchBox();
          break;
        case "Numpad0":
          if (e.key == "Insert") this.showSearchBox();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey) {
            if (keyScope == this.keyScope.partsTable && this.details.length) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.details[0]];
            } else if (
              keyScope == this.keyScope.form &&
              this.partsTableData.length
            ) {
              this.setKeyScope(this.keyScope.partsTable);
              this.selectedPartsListRows = [this.partsTableData[0]];
            } else if (
              keyScope == this.keyScope.form &&
              !this.partsTableData.length &&
              this.details.length
            ) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.details[0]];
            } else if (
              keyScope == this.keyScope.detailsTable &&
              this.partsTableData.length
            ) {
              this.setKeyScope(this.keyScope.partsTable);
              this.selectedPartsListRows = [this.partsTableData[0]];
            }
          } else {
            if (keyScope == this.keyScope.form) {
              this.updateFocusData({ type: "up" });
            }
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (e.altKey) {
            if (keyScope == this.keyScope.partsTable && this.details.length) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.details[0]];
            } else if (keyScope == this.keyScope.form && this.details.length) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.details[0]];
            } else if (
              keyScope == this.keyScope.form &&
              !this.details.length &&
              this.partsTableData.length
            ) {
              this.setKeyScope(this.keyScope.partsTable);
              this.selectedPartsListRows = [this.partsTableData[0]];
            } else if (
              keyScope == this.keyScope.detailsTable &&
              this.partsTableData.length
            ) {
              this.setKeyScope(this.keyScope.partsTable);
              this.selectedPartsListRows = [this.partsTableData[0]];
            }
          } else {
            if (keyScope == this.keyScope.form) {
              this.updateFocusData({ type: "down" });
            }
          }
          break;
        default:
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
      this.updateFocusData({ initial: null });
    },
    setFormKeyScope() {
      hotkeys.setScope(this.keyScope.form);
      this.canHandleRowAdd = false;
      this.canHandleRowEdit = false;
    },
    handleInputEnter(val) {
      this.getHeaderForm().validate((valid, err) => {
        if (valid) {
          if (val === "cooperatorId") {
            this.updateFocusData({ initial: "focus-enhancedSettlementType" });
          } else if (val === "peerOrderNo") {
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
    setDefaultReceiverInfo() {
      this.header = {
        ...this.header,
        ...receiverInfoFilters(this.cacheReceiverInfo)
      };
      this.refreshReceiverInfo();
    },
    updateBillHeaderLogistics() {
      this.billHeadersUpdate();
      this.updateFocusData({ initial: "focus-peerOrderNo" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handlePartsTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.partsTable);
    },
    handleDetailsTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.detailsTable);
    },
    handleRowAdd(row) {
      if (!this.canHandleRowAdd) return;
      if (!this.canEdit) {
        this.$message({
          type: "warning",
          message: "当前状态不能新增配件",
          showClose: true
        });
        return;
      }
      if (this.isPlatform) {
        this.$message({
          type: "warning",
          message: "平台采购订单不能新增本地配件",
          showClose: true
        });
        return;
      }
      this.addDetailHandle(row);
    },
    handleRowEdit(row) {
      if (!this.canHandleRowEdit) return;
      if (!this.canEdit) {
        this.$message({
          type: "warning",
          message: "当前状态不能编辑明细",
          showClose: true
        });
        return;
      }
      this.editDetailHandle(row);
    },
    handleRowDelete(row) {
      if (!this.canHandleRowEdit) return;
      if (!this.canEdit) {
        this.$message({
          type: "warning",
          message: "当前状态不能编辑明细",
          showClose: true
        });
        return;
      }
      this.deleteDetailHandle(row);
    },
    formatter(val) {
      return dateFormatFull(val);
    },
    searchParamsChange(params) {
      params.mode = this.mode;
      this.lastSearchData = params;
      this.$refs.refPartsList.handleLocalSearch(params);
    },
    invoiceTypeHandleInputEnter() {
      if (this.selectedPartsListRows.length && !this.details.length) {
        this.getHeaderForm().validate((valid, err) => {
          if (valid) {
            hotkeys.setScope(this.keyScope.partsTable);
            this.editDetailBoxVisible = true;
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          }
        });
      } else {
        this.debouncedHandleInputEnter();
      }
    },
    addDetailHandle(row) {
      if (this.details.length) {
        if (this.details.find(item => item.partId == row.partId)) {
          this.$confirm("配件明细重复，是否继续添加？", {
            isFocusCancel: true
          }).then(() => {
            this.afterAddDetailHandle(row);
          });
        } else {
          this.afterAddDetailHandle(row);
        }
      } else {
        this.afterAddDetailHandle(row);
      }
    },
    afterAddDetailHandle(row) {
      this.isEdit = false;
      this.partData = { ...row };
      this.getHeaderForm().validate((valid, err) => {
        if (valid) {
          this.editDetailBoxVisible = true;
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
          hotkeys.setScope(this.keyScope.form);
          this.canHandleRowAdd = false;
          this.canHandleRowEdit = false;
          this.updateFocusData({ initial: "focus-cooperatorId" });
        }
      });
    },
    editDetailHandle(row) {
      this.getHeaderForm().validate((valid, err) => {
        if (valid) {
          this.selectedDetailsRows = [row];
          this.isEdit = true;
          this.partData = { ...row };
          this.editDetailBoxVisible = true;
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    handleDetails(formData) {
      const details = {
        partId: formData.partId,
        property: formData.property,
        qty: formData.qty || 0,
        taxedAmount: formData.taxedAmount || 0,
        untaxedAmount: formData.untaxedAmount || 0,
        taxAmount: formData.taxAmount || 0,
        taxedPrice: formData.taxedPrice || 0,
        untaxedPrice: formData.untaxedPrice || 0,
        arrivalDate: formData.arrivalDate,
        remark: formData.remark,
        salePrices: formData.salePrices
      };
      if (this.isEdit) {
        details.id = this.partData.id;
        this.updateDetails(details);
      } else {
        this.addDetails({
          useDefaultPrices: false,
          details: details
        });
      }
    },
    getHeaderForm() {
      return this.$refs["headerForm"];
    },
    updateDetails(details) {
      reqPurchaseBillingDetailsUpdate(details)
        .then(() => {
          this.$message({
            type: "success",
            message: "配件明细更新成功！",
            showClose: true
          });
          this.billInfoInit();
        })
        .catch(() => {});
    },
    addDetails({ useDefaultPrices, details }) {
      if (this.header.id) {
        this.addOrder({ useDefaultPrices, details });
      } else {
        this.createOrder({ useDefaultPrices, details });
      }
    },
    addOrder({ useDefaultPrices, details }) {
      addLocalOrder({
        orderId: this.header.id,
        useDefaultPrices,
        details: [details]
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加配件成功",
            showClose: true
          });
          this.searchBoxVisible = false;
          this.billInfoInit().then(() => {
            this.selectedDetailsRows = [this.details[this.details.length - 1]];
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
        })
        .catch(() => {});
    },
    createOrder({ useDefaultPrices, details }) {
      createLocalOrder({
        header: this.header,
        useDefaultPrices,
        details: [details]
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "添加配件成功",
            showClose: true
          });
          this.searchBoxVisible = false;
          this.gotoBilling(res.billId);
        })
        .catch(() => {});
    },
    showSearchBox() {
      this.searchBoxVisible = true;
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    setDefaultData() {
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.setDefaultReceiverInfo();
      this.statusTxt = "";
      this.details = [];
    },
    createHandle() {
      if (!this.canClick) return;
      if (!this.canCreate) return;
      if (this.orderId) {
        this.$router.replace("/PurchaseBilling");
      }
      this.orderId = null;
      this.setDefaultData();
      this.setFormKeyScope();
      this.$nextTick(() => {
        this.updateFocusData({ initial: "focus-cooperatorId" });
        this.getHeaderForm().clearValidate();
      });
    },
    gotoBilling(orderId) {
      this.orderId = Number(orderId);
      this.$router.replace({
        path: "/PurchaseBilling",
        query: { orderId: this.orderId }
      });
      return this.billInfoInit();
    },
    gotoReceiveBilling(id) {
      this.$router.push({
        path: "/PurchaseReceiveBilling",
        query: { billId: id }
      });
    },
    setScopeFocus() {
      if (this.partsTableData.length && !this.isEdit) {
        this.setKeyScope(this.keyScope.partsTable);
      } else if (this.details.length) {
        this.setKeyScope(this.keyScope.detailsTable);
        let selectedRow;
        if (this.selectedDetailsRows.length) {
          selectedRow = this.details.find(
            item => item.id === this.selectedDetailsRows[0].id
          );
        }
        this.selectedDetailsRows = selectedRow
          ? [selectedRow]
          : this.details.length
          ? [this.details[this.details.length - 1]]
          : [];
      } else {
        this.setFormKeyScope();
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        });
      }
      this.$nextTick(() => {
        this.getHeaderForm().clearValidate();
      });
    },
    billInfoInit() {
      if (this.detailsLoading) return;
      this.detailsLoading = true;
      return reqPurchaseBillingDetails(this.orderId, this.sort)
        .then(data => {
          this.header = data.header || { ...defaultHeader };
          this.details = data.details || [];
          this.refreshReceiverInfo();
          this.statusTxt = PURCHASE_ORDER_STATUS[data.header.status];
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
          this.setScopeFocus();
          this.detailsLoading = false;
        })
        .catch(() => {
          this.detailsLoading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.details.length) {
        return;
      }
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, TYPE);
      this.billInfoInit();
    },
    billHeadersUpdateWithCooperator(val) {
      if (!val) return;
      reqPurchaseSupplierDefault(val)
        .then(data => {
          const params = receiveFilters(data);
          this.header = { ...this.header, ...params };
          this.refreshReceiverInfo();
          this.billHeadersUpdate();
          this.updateFocusData({ initial: "focus-enhancedSettlementType" });
        })
        .catch(() => {});
    },
    updateBillHeaderTaxed(value) {
      if (!value) return;
      const _item = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === value);
      this.header.taxRate = _item.specialValue;
      this.billHeadersUpdate();
    },
    billHeadersUpdate() {
      if (!this.header.id) {
        return false;
      }
      this.getHeaderForm().validate((valid, err) => {
        if (valid) {
          if (this.header.enhancedSettlementType === "物流代收") {
            this.$set(this.header, "pickMethod", "发货");
          }
          const header = { ...this.header };
          if (header.receiverAreaId instanceof Array) {
            header.receiverAreaId = header.receiverAreaId[2];
          }
          reqPurchaseBillingHeadersUpdate(header).then(() => {
            this.$message.success({
              message: "单头已更新",
              showClose: true
            });
            this.billInfoInit();
          });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    deleteDetailHandle(row) {
      this.selectedDetailsRows = [row];
      if (!this.canEdit) return;
      const tips =
        this.details.length === 1
          ? "该单据只有一条明细，删除后单据也将删除，确定继续删除？"
          : `确定删除配件 ${row.name}（${row.code}）？`;

      this.$confirm(tips, {
        type: "warning"
      })
        .then(() => {
          if (this.details.length === 1 && !this.canDelete) {
            this.$message.error({
              message: "您没有权限删除该单据",
              showClose: true
            });
          } else {
            reqPurchaseBillingDetailsDelete({
              orderId: this.header.id,
              ids: [row.id]
            })
              .then(() => {
                this.details = this.details.filter(item => item.id != row.id);
                this.$message({
                  type: "success",
                  message: `配件 ${row.name}（${row.code}） 删除成功！`,
                  showClose: true
                });
                if (this.details.length === 0) {
                  this.$confirm(
                    `删除单据 ${this.header.billNo} 成功，是否重新开单？`,
                    {
                      type: "warning"
                    }
                  )
                    .then(() => {
                      this.createHandle();
                    })
                    .catch(() => {
                      this.closePage();
                      this.backMainList();
                    });
                } else {
                  this.selectedDetailsRows = [
                    this.details[this.details.length - 1]
                  ];
                  this.$nextTick(() => {
                    this.isScrollToEnd = true;
                  });
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    transferHandle() {
      if (!this.canClick || !this.canTransfer) {
        return;
      }
      this.mapData = {};
      if (this.isPlatform) {
        BillMapConfirm(
          {
            billId: this.header.id,
            platformKey: this.header.platformKey,
            billType: 0
          },
          this.searchLoadAllSupplierCooperators
        )
          .then(res => {
            this.mapData = { ...res };
            this.transferBoxVisible = true;
          })
          .catch(() => {});
      } else {
        this.transferBoxVisible = true;
      }
    },
    handleTransferSuccess() {
      this.billInfoInit();
    },
    cancelHandle() {
      if (!this.canClick) return;
      if (!this.canCancel) return;
      this.cancelBoxVisible = true;
    },
    handleCancelSuccess() {
      this.billInfoInit();
    },
    deleteHandle() {
      if (!this.canClick) return;
      if (!this.canDelete) return;
      const billNo = this.header.billNo;
      this.$confirm("确定要删除单据 " + billNo + " 吗？", {
        type: "warning"
      })
        .then(() => {
          this.deleteLoading = true;
          deletePurchaseBilling([this.header.id])
            .then(() => {
              this.deleteLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 删除成功",
                showClose: true
              });
              this.createHandle();
            })
            .catch(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
    },
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Normal/" + this.header.id
        }).href,
        "print"
      );
    },
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.getHeaderForm().validate((valid, err) => {
        if (valid) {
          if (
            this.header.enhancedSettlementType === "物流代收" &&
            !this.header.logisticsCompanyId
          ) {
            this.$confirm("当前支付方式为物流代收，是否现在登记物流公司？", {
              type: "warning"
            })
              .then(() => {
                this.isCollapse = true;
                setTimeout(() => {
                  this.updateFocusData({
                    initial: "focus-logisticsCompanyId"
                  });
                }, 200);
              })
              .catch(() => {
                return this.submitBill();
              });
          } else {
            return this.submitBill();
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    submitBill() {
      this.submitLoading = true;
      const billNo = this.header.billNo;
      return submitPurchaseBilling(this.header.id)
        .then(() => {
          this.billInfoInit()
            .then(() => {
              this.submitLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 提交成功",
                showClose: true
              });
            })
            .catch(() => {
              this.submitLoading = false;
            });
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    recallHandle() {
      if (!this.canClick) return;
      if (!this.canRecall) return;
      this.recallLoading = true;
      const billNo = this.header.billNo;
      recallPurchaseBilling(this.header.id)
        .then(() => {
          this.billInfoInit()
            .then(() => {
              this.recallLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 撤回成功",
                showClose: true
              });
            })
            .catch(() => {
              this.recallLoading = false;
            });
        })
        .catch(() => {
          this.recallLoading = false;
        });
    },
    exportHandle() {
      if (!this.canClick) return;
      if (!this.canExport) return;
      this.exportTableVisible = true;
    },
    auditHandle() {
      if (!this.canClick) return;
      if (!this.canAudit) return;
      this.auditVisible = true;
    },
    depositAuditHandle() {
      if (!this.canClick) return;
      if (!this.canDepositAudit) return;
      this.auditVisible = true;
    },
    auditComplete(updata) {
      let tips = "";
      if (updata.isApproved) {
        tips = "单据 " + this.header.billNo + " 审核通过成功";
      } else {
        tips = "单据 " + this.header.billNo + " 退回成功";
      }
      this.$message({
        type: "success",
        message: tips,
        showClose: true
      });
      this.billInfoInit();
    },
    backMainList() {
      this.$router.push({ path: "/PurchaseList" });
    },
    refreshReceiverInfo() {
      this.receiverInfo = {
        receiverName: this.header.receiverName,
        receiverPhone: this.header.receiverPhone,
        receiverAreaNames: this.header.receiverAreaNames,
        receiverAddress: this.header.receiverAddress
      };
    },
    handleReceiverInfo(val) {
      this.header = { ...this.header, ...val };
      this.billHeadersUpdate();
    },
    importHandle() {
      if (!this.canClick) return;
      if (!this.canImport) return;
      this.importInfo = { ...defaultImportInfo };
      this.importVisible = true;
      this.$nextTick(() => {
        this.$refs.importForm && this.$refs.importForm.clearValidate();
      });
    },
    importPurchasesOrders(rows) {
      return new Promise((resolve, reject) => {
        this.$refs.importForm.validate((valid, err) => {
          if (valid) {
            reqImportPurchasesOrders({
              cooperatorId: this.importInfo.cooperatorId,
              createPartsIfNotExist: this.importInfo.createPartsIfNotExist,
              rows
            })
              .then(data => {
                if (data.billId) {
                  this.gotoBilling(data.billId).then(() => {
                    this.selectedDetailsRows = [
                      this.details[this.details.length - 1]
                    ];
                    this.$nextTick(() => {
                      this.isScrollToEnd = true;
                    });
                  });
                }
                this.loadDictionary({ type: "property", isReload: true });
                resolve(data);
              })
              .catch(() => {
                reject();
              });
          } else {
            reject();
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          }
        });
      });
    },
    showPartSwapBox(row) {
      this.partSwapData = row;
      this.partSwapBoxVisible = true;
    },
    showStocksLockedBox() {
      if (
        !this.selectedPartsListRows.length &&
        !this.selectedDetailsRows.length
      ) {
        return;
      }
      this.stockFilter = this.getModeData();
      this.storageStocksLockedVisible = true;
    },
    getModeData() {
      const partData =
        this.selectedPartsListRows[0] || this.selectedDetailsRows[0];
      //点击下面，默认不带批次；
      const mode = this.selectedPartsListRows[0] ? this.mode : 1;
      const modeData = {
        partId: partData.partId,
        ownerCompanyId: this.selectedPartsListRows[0]
          ? partData.ownerCompanyId
          : this.header.companyId,
        property: partData.property || undefined
      };
      switch (mode) {
        case 0: {
          modeData.warehouseId = partData.warehouseId || undefined;
          modeData.positionId = partData.positionId || undefined;
          modeData.batchNo = partData.batchNo || undefined;
          break;
        }
        case 1: {
          modeData.warehouseId = partData.warehouseId || undefined;
          modeData.positionId = partData.positionId || undefined;
          break;
        }
        case 2: {
          modeData.warehouseId = partData.warehouseId || undefined;
          break;
        }
        default:
          break;
      }
      return modeData;
    }
  }
};
</script>
