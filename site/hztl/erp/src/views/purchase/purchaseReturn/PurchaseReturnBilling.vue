<template>
  <section class="container-box">
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
          :disabled="!canShowPartDetailBox"
          type="primary"
          size="mini"
          @click="showPartDetailBox"
        >
          配件详情（F10）
        </el-button>
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
        >
          <i class="el-icon-question"></i>帮助
        </span>
      </div>
    </div>

    <ht-card class="auto-card" no-padding>
      <resize-box :default-len="242" is-column>
        <template v-slot:block1>
          <el-row v-if="isHasHistory" style="height: 100%">
            <resize-box :default-len="1000" :min-len="230">
              <template v-slot:block1>
                <has-history-list
                  :loading="hasHistoryLoading"
                  :data="hasHistoryTableData"
                  :can-edit="canEdit"
                  :total="hasHistoryTotalSize"
                  :current-page="currentPage"
                  :key-scope="keyScope.hasHistoryTable"
                  :selected-rows.sync="selectedHasHistoryRows"
                  @pageChange="hasHistoryPageChange"
                  @on-add-all-stock="addAllStock"
                  @on-add-all-bill="addAllBill"
                  @handlePartDetailChange="showPartDetailBox"
                  @rowOperation="handleRowAddByHasHistory"
                  @hotkeysUp="handleHasHistoryTableKeyCode"
                  @click.native.stop="setKeyScope(keyScope.hasHistoryTable)"
                  @sort-change="handleHasHistorySortChange"
                />
              </template>
              <template v-slot:block2>
                <div
                  class="flex-container column-flex"
                  @click.stop="setKeyScope(keyScope.partsInfoTable)"
                >
                  <parts-info-list
                    class="auto-block"
                    :loading="partsInfoLoading"
                    :data="partsInfoTableData"
                    :can-edit="canEdit"
                    :key-scope="keyScope.partsInfoTable"
                    :selected-rows.sync="selectedPartsInfoRows"
                    @on-add-parts="addHandle"
                    @rowOperation="handleRowAdd"
                    @hotkeysUp="handlePartsInfoTableKeyCode"
                    @click.native.stop="setKeyScope(keyScope.partsInfoTable)"
                  />
                  <div v-if="canEdit" class="batch-btn-container">
                    <el-button
                      :disabled="!selectedPartsInfoRows.length"
                      type="primary"
                      size="mini"
                      @click="addBatchDetails"
                    >
                      批量添加
                    </el-button>
                    <el-checkbox
                      v-model="otherBatches"
                      :disabled="!hasHistoryTableData.length"
                      style="margin-left: 15px;"
                      @change="onIsShowOtherBatchsChange"
                    >
                      其他批次
                    </el-checkbox>
                  </div>
                </div>
              </template>
            </resize-box>
          </el-row>
          <el-row v-if="!isHasHistory" style="height: 100%">
            <div
              class="flex-container column-flex"
              style="height: 100%"
              @click.stop="setKeyScope(keyScope.noHistoryTable)"
            >
              <no-history-list
                :loading="noHistoryLoading"
                :data="noHistoryTableData"
                :can-edit="canEdit"
                :total="noHistoryTotalSize"
                :current-page="currentPage"
                :key-scope="keyScope.noHistoryTable"
                :selected-rows.sync="selectedNoHistoryRows"
                :is-show-pagination.sync="isShowedPagination"
                style="height: 100%"
                @pageChange="noHistoryPageChange"
                @on-add-nh-parts="addNHHandle"
                @handlePartDetailChange="showPartDetailBox"
                @rowOperation="handleNHRowAdd"
                @hotkeysUp="handleNoHistoryTableKeyCode"
                @click.native.stop="setKeyScope(keyScope.noHistoryTable)"
                @sort-change="handleNoHistorySortChange"
              />
              <div
                v-if="canEdit"
                class="batch-btn-container"
                :style="isShowedPagination ? 'margin-top: -32px' : ''"
              >
                <el-button
                  :disabled="!selectedNoHistoryRows.length"
                  type="primary"
                  size="mini"
                  @click="addBatchNHDetails"
                >
                  批量添加
                </el-button>
              </div>
            </div>
          </el-row>
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
                :disabled="!canClick || !canSettleStockOut"
                type="primary"
                size="mini"
                @click="settleHandle"
              >
                结算即出库（F7）
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
                :disabled="!canClick || !canPrint"
                type="primary"
                size="mini"
                @click="printHandle"
              >
                打印（F11）
              </el-button>
              <el-button
                :disabled="!canClick || !canPrint"
                type="primary"
                size="mini"
                @click="printLabelHandle"
              >
                打印发货标签
              </el-button>
              <el-button
                :disabled="!canClick || !canRigister"
                type="primary"
                size="mini"
                @click="rigisterBoxHandle"
              >
                发货登记
              </el-button>
            </div>
            <ht-card style="margin: 5px 0 0 0;">
              <header-form
                ref="headerForm"
                :disabled="!canEdit"
                :header.sync="header"
                :is-has-history="isHasHistory"
                :cooperator-id-type-disabled="cooperatorIdTypeDisabled"
                :invoice-type-disabled="invoiceTypeDisabled"
                :business-man-id-disabled="businessManIdDisabled"
                :focus-data="focusData"
                :handle-input-enter="handleInputEnter"
                :isCollapse.sync="isCollapse"
                @click.native.stop="setFormKeyScope"
                @invoice-type-input-enter="invoiceTypeHandleInputEnter"
                @updateBillHeaderLogistics="updateBillHeaderLogistics"
                @on-cooperator-change="
                  updateFocusData({ initial: 'focus-enhancedSettlementType' })
                "
                @taxRateChange="billInfoInit"
              />
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <ht-table
                :loading="detailsLoading"
                :data="detailsTableData"
                :summary-method="setTotals"
                :columns="detailsFormatColumns"
                :key-scope="keyScope.detailsTable"
                :selected-rows.sync="selectedDetailsRows"
                show-summary
                setting-all-column
                show-table-setting
                @hotkeysUp="handleDetailsTableKeyCode"
                @rowOperation="handleRowEdit"
                @rowDelete="handleRowDelete"
                @click.native.stop="setKeyScope(keyScope.detailsTable)"
                @table-setting="handleTableSetting"
                @sort-change="handleDetailsSortChange"
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
              {{ detailsTableData.length }}
            </div>
          </div>
          <div>
            总数量：
            <div class="amount-font">
              {{ totoalQty }}
            </div>
          </div>
          <div>
            合计应收：
            <div class="amount-font">{{ totoalAmount }}&#12288;</div>
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
          <div v-show="header.financialAuditByName">
            财务审核人：
            <div class="text-font">
              {{ header.financialAuditByName }}（{{
                formatter(header.financialAuditAt)
              }}）
            </div>
          </div>
        </div>
      </div>
    </div>
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
    <export-table
      :base-columns="baseDetailsColumns"
      :default-data="detailsTableData"
      :file-name="`采购退货单-${header.billNo}`"
      :table-name="detailsName"
      :visible.sync="exportTableVisible"
    />

    <return-search-box
      :visible.sync="searchBoxVisible"
      :cooperator="{
        cooperatorId: header.cooperatorId,
        cooperatorName: header.cooperatorName
      }"
      :companyId="companyId"
      @on-search="handleSearchBox"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <EditDetailBox
      :visible.sync="detailBoxVisible"
      :partData="billDetailData"
      :header="header"
      :isEdit="isEdit"
      @sure="addDetails"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :isLogistics="isLogistics"
      :companyId="companyId"
      @settleSuccess="settleComplete"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <PrintGoodsLabelBox
      :visible.sync="printGoodsLabelBoxVisible"
      :value="{ billType: TYPE, billId: billId }"
    />
    <HandleRigisterBox
      :visible.sync="showHandleRigisterBox"
      :rule-data="ruleData"
      :billId="billId || 0"
      :canSettle="canSettle"
      :hasBillInfo="hasBillInfo"
      :is-settle-confirm="true"
      :is-receive="false"
      :register-id="registerId"
      :is-confirm="false"
      @on-sure="handleRigisterSure"
    />
  </section>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import { mapState } from "vuex";
import { reduce } from "lodash";
import hotkeys from "hotkeys-js";
import ResizeBox from "@/components/resizeBox";
import { SettleDialog } from "@/components/business";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import { EditColumns, ExportTable } from "@/components/table";
import PrintGoodsLabelBox from "@/components/PrintGoodsLabelBox";

import {
  precisionsFixed,
  setTotals,
  baseDataMixin,
  freightSettleMixin
} from "@/mixins";
import { TABLE_PURCHASE_RETURN_DETAILS } from "../constants";
import {
  reqReturnAddAllBillDetails,
  reqReturnAddAllNHPartsDetails,
  reqReturnAddAllPartsDetails,
  reqReturnAddAllStoreDetails,
  reqReturnAddPartsDetails,
  reqReturnBillingCreate,
  reqReturnBillingDelete,
  reqReturnBillingInit,
  reqReturnBillingRecall,
  reqReturnBillingSubmit,
  reqReturnCreateAllBillDetails,
  reqReturnCreateAllNHPartsDetails,
  reqReturnCreateAllPartsDetails,
  reqReturnCreateAllStoreDetails,
  reqReturnDeletePartsDetails,
  reqReturnHasHistoryInit,
  reqReturnNoHistoryInit,
  reqReturnUpdatePartsDetails,
  reqReturnpartsInfoInit
} from "@/api/purchase/purchaseReturn";
import { dateFormat, dateFormatFull } from "@/utils/date";
import HandleRigisterBox from "@/components/register";
import eventBus from "@/event";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import {
  HasHistoryList,
  HeaderForm,
  NoHistoryList,
  PartsInfoList
} from "./components";
import EditDetailBox from "./dialog/EditDetailBox";
import ReturnSearchBox from "./dialog/ReturnSearchBox";
import PartsInfoSearch from "@/components/partsInfoSearch";
import { add } from "@/utils/numberAPI";
import * as store from "@/utils/store";

const TYPE = "CT";
const DETAIL = "detail";
const HAS_HIST = "hasHist";
const NO_HIST = "noHist";
const defaultFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};
const defaultHeader = {
  cooperatorId: null,
  cooperatorName: "",
  enhancedSettlementType: "",
  invoiceType: "",
  billDate: dateFormat(new Date(), "YYYY-MM-DD"),
  businessManId: null,
  businessManName: "",
  remark: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaIds: [],
  receiverAddress: "",
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "自付",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  taxRate: 0,
  companyId: 0,
  belongs: []
};

export default {
  name: "PurchaseReturnBilling",
  components: {
    NoHistoryList,
    HasHistoryList,
    PartsInfoList,
    HeaderForm,
    SettleDialog,
    ReturnSearchBox,
    EditDetailBox,
    PartsDetailBox,
    ResizeBox,
    EditColumns,
    ExportTable,
    AvaVehModels,
    PrintGoodsLabelBox,
    HandleRigisterBox
  },
  mixins: [precisionsFixed, setTotals, baseDataMixin, freightSettleMixin],
  data() {
    return {
      showHandleRigisterBox: false,
      ruleData: {},
      registerId: "",
      exportTableVisible: false,
      editColumnsVisible: false,
      detailsName: TABLE_PURCHASE_RETURN_DETAILS.name,
      baseDetailsColumns: TABLE_PURCHASE_RETURN_DETAILS.columns,
      detailsColumns: [],
      keyScope: {
        form: Symbol("purchaseReturnFrom"),
        hasHistoryTable: Symbol("purchaseReturnHasHistory"),
        partsInfoTable: Symbol("purchaseReturnPartsInfo"),
        noHistoryTable: Symbol("purchaseReturnNoHistory"),
        detailsTable: Symbol("purchaseReturnDetails")
      },
      focusData: { ...defaultFocusData },
      selectedNoHistoryRows: [],
      selectedHasHistoryRows: [],
      selectedPartsInfoRows: [],
      selectedDetailsRows: [],
      cacheSelectedHasHistoryRows: [],
      canHandleRowAdd: false,
      canHandleRowEdit: false,

      billId: null,
      deleteLoading: false,
      submitLoading: false,
      recallLoading: false,
      searchBoxVisible: false,
      detailBoxVisible: false,
      settleDialogVisible: false,
      settleData: {},
      settleList: [],

      property: null,
      warehouseId: null,
      searchParams: {},
      billDetailData: {},
      isBatchNHDetails: false,

      isHasHistory: true,
      noHistoryLoading: false,
      hasHistoryLoading: false,
      partsInfoLoading: false,
      detailsLoading: false,
      isScrollToEnd: false,
      noHistoryTotalSize: 0,
      hasHistoryTotalSize: 0,
      currentPage: 1,
      isShowedPagination: true,

      noHistoryTableData: [],
      hasHistoryTableData: [],
      partsInfoTableData: [],
      detailsTableData: [],
      noHistoryRow: {},
      hasHistoryRow: {},
      partsInfoRow: {},
      isEdit: false,

      cooperatorIdTypeDisabled: false,
      invoiceTypeDisabled: false,
      businessManIdDisabled: false,
      header: { ...defaultHeader },
      detailId: null,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      partDetailBoxVisible: false,
      partId: null,
      hasAdd: false,
      isCollapse: false,
      otherBatches: false,

      detailSort: "",
      hasHistorySort: "",
      noHistorySort: "",
      printGoodsLabelBoxVisible: false,
      TYPE
    };
  },
  computed: {
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    ...mapState("admin/table", ["pageSize"]),
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function editDetailHandle(row, e) {
        e.stopPropagation();
        self.editDetailHandle(row);
      }
      function deleteDetailHandle(row, e) {
        e.stopPropagation();
        self.deleteDetailHandle(row);
      }
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.detailsColumns
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
          }

          if (item.type === "avaVehModels") {
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
    canShowPartDetailBox() {
      return (
        (this.isHasHistory
          ? this.selectedHasHistoryRows.length
          : this.selectedNoHistoryRows.length) ||
        this.selectedDetailsRows.length
      );
    },
    canClick() {
      return !this.submitLoading && !this.recallLoading && !this.deleteLoading;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        this.header.status === 0 &&
        this.hasBelongsPerm("update", this.header.belongs)
      );
    },
    canEdit() {
      return (
        (!this.header.id && this.canCreate) ||
        (this.header.id && this.canUpdate)
      );
    },
    canDelete() {
      return (
        this.header.status === 0 &&
        this.hasBelongsPerm("delete", this.header.belongs)
      );
    },
    canSubmit() {
      return (
        this.header.status === 0 &&
        this.hasBelongsPerm("submit", this.header.belongs)
      );
    },
    canRecall() {
      return (
        [1, 2, 3].includes(this.header.status) &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canSettleStockOut() {
      return (
        [2, 3].includes(this.header.status) &&
        this.hasBelongsPerm("settleStockOut", this.header.belongs)
      );
    },
    canRigister() {
      return (
        [4].includes(this.header.status) &&
        this.hasPerm("storage.logisticsRegistration.send.read") &&
        (this.header.enhancedSettlementType === "物流代收" ||
          this.header.pickMethod === "发货")
      );
    },
    canExport() {
      return (
        this.detailsTableData.length !== 0 &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canPrint() {
      return (
        this.detailsTableData.length !== 0 &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(
          this.detailsTableData,
          (sum, item) => add(sum, Number(item.qty)),
          0
        ),
        "qty"
      );
    },
    totoalAmount() {
      return this.precisionFormat(
        reduce(
          this.detailsTableData,
          (sum, item) => add(sum, Number(item.taxedAmount)),
          0
        ),
        "money"
      );
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    }
  },
  watch: {
    companyId() {
      this.hasHistoryTableData = [];
      this.noHistoryTableData = [];
      this.partsInfoTableData = [];
    },
    settleDialogVisible(e) {
      if (!e) {
        this.billInfoInit();
      }
    },
    selectedHasHistoryRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
        this.otherBatches = false;
        this.handleHasHistoryRow(rows[0]);
        this.selectedDetailsRows = [];
        this.selectedNoHistoryRows = [];
        this.selectedPartsInfoRows = [];
        this.canHandleRowAdd = false;
        this.canHandleRowEdit = false;
      }
    },
    selectedPartsInfoRows(rows) {
      if (rows && rows.length) {
        this.cacheSelectedHasHistoryRows = this.selectedHasHistoryRows.length
          ? [...this.selectedHasHistoryRows]
          : [this.hasHistoryTableData[0]];
        this.selectedDetailsRows = [];
        this.selectedHasHistoryRows = [];
        this.selectedNoHistoryRows = [];
        this.canHandleRowAdd = true;
        this.canHandleRowEdit = false;
      }
    },
    selectedNoHistoryRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
        this.selectedDetailsRows = [];
        this.selectedHasHistoryRows = [];
        this.selectedPartsInfoRows = [];
        this.canHandleRowAdd = true;
        this.canHandleRowEdit = false;
      }
    },
    selectedDetailsRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
        this.selectedHasHistoryRows = [];
        this.selectedNoHistoryRows = [];
        this.selectedPartsInfoRows = [];
        this.canHandleRowEdit = true;
        this.canHandleRowAdd = false;
      }
    },
    billId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    }
  },
  mounted() {
    hotkeys("*", { scope: this.keyScope.form }, e => {
      this.bindKeyCode(e, this.keyScope.form);
    });
    this.detailSort = getLocalTableSort(`${TYPE}${DETAIL}`);
    this.hasHistorySort = getLocalTableSort(`${TYPE}${HAS_HIST}`);
    this.noHistorySort = getLocalTableSort(`${TYPE}${NO_HIST}`);
    this.setDefaultData();
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
    if (this.$route.query.billId) {
      this.billId = Number(this.$route.query.billId);
      this.billInfoInit();
    } else {
      this.billId = null;
      if (this.hasHistoryTableData.length) {
        this.setKeyScope(this.keyScope.hasHistoryTable);
      } else if (this.noHistoryTableData.length) {
        this.setKeyScope(this.keyScope.noHistoryTable);
      } else {
        this.setFormKeyScope();
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        });
      }
      this.$nextTick(() => {
        this.$refs.headerForm.clearValidate();
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
    hotkeys.deleteScope(this.keyScope.form);
    hotkeys.deleteScope(this.keyScope.hasHistoryTable);
    hotkeys.deleteScope(this.keyScope.partsInfoTable);
    hotkeys.deleteScope(this.keyScope.noHistoryTable);
    hotkeys.deleteScope(this.keyScope.detailsTable);
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 26);
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date());
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    rigisterBoxHandle() {
      this.getRegisterDetail({
        billId: this.billId,
        billType: "CT",
        billNo: this.header.billNo
      });
    },
    handleRigisterSure(billInfo) {
      // 创建或者更新登记单后
      // 判断是否以前分摊过运费，如果运费发生了变化，且用户已经分摊了运费，触发一次重新分摊
      this.header = {
        ...this.header,
        ...billInfo
      };
      const hasSettlePerm =
        this.hasPerm("storage.logisticsRegistration.send.settle") &&
        this.hasPerm("financials.settlements");
      if (billInfo.payer > 0 && hasSettlePerm) {
        this.settle({
          billId: this.billId,
          billType: "CT",
          billNo: this.header.billNo
        });
      }
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
          this.settleHandle();
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
          if (e.altKey) {
            e.preventDefault();
            const partsTable = this.isHasHistory
              ? this.keyScope.hasHistoryTable
              : this.keyScope.noHistoryTable;
            const partsTableDataLength = this.isHasHistory
              ? this.hasHistoryTableData.length
              : this.noHistoryTableData.length;
            if (keyScope == partsTable && this.detailsTableData.length) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.detailsTableData[0]];
            } else if (keyScope == this.keyScope.form && partsTableDataLength) {
              if (this.isHasHistory) {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedHasHistoryRows = [this.hasHistoryTableData[0]];
              } else {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedNoHistoryRows = [this.noHistoryTableData[0]];
              }
            } else if (
              keyScope == this.keyScope.form &&
              !partsTableDataLength &&
              this.detailsTableData.length
            ) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.detailsTableData[0]];
            } else if (
              keyScope == this.keyScope.detailsTable &&
              partsTableDataLength
            ) {
              if (this.isHasHistory) {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedHasHistoryRows = [this.hasHistoryTableData[0]];
              } else {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedNoHistoryRows = [this.noHistoryTableData[0]];
              }
            }
          } else {
            if (keyScope == this.keyScope.form) {
              this.updateFocusData({ type: "up" });
            }
          }
          break;
        case "ArrowDown":
          if (e.altKey) {
            e.preventDefault();
            const partsTable = this.isHasHistory
              ? this.keyScope.hasHistoryTable
              : this.keyScope.noHistoryTable;
            const partsTableDataLength = this.isHasHistory
              ? this.hasHistoryTableData.length
              : this.noHistoryTableData.length;
            if (keyScope == partsTable && this.detailsTableData.length) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.detailsTableData[0]];
            } else if (
              keyScope == this.keyScope.form &&
              this.detailsTableData.length
            ) {
              this.setKeyScope(this.keyScope.detailsTable);
              this.selectedDetailsRows = [this.detailsTableData[0]];
            } else if (
              keyScope == this.keyScope.form &&
              !this.detailsTableData.length &&
              partsTableDataLength
            ) {
              if (this.isHasHistory) {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedHasHistoryRows = [this.hasHistoryTableData[0]];
              } else {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedNoHistoryRows = [this.noHistoryTableData[0]];
              }
            } else if (
              keyScope == this.keyScope.detailsTable &&
              partsTableDataLength
            ) {
              if (this.isHasHistory) {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedHasHistoryRows = [this.hasHistoryTableData[0]];
              } else {
                this.setKeyScope(this.keyScope.hasHistoryTable);
                this.selectedNoHistoryRows = [this.noHistoryTableData[0]];
              }
            }
          } else {
            if (keyScope == this.keyScope.form) {
              this.updateFocusData({ type: "down" });
            }
          }
          break;
        case "ArrowRight":
        case "ArrowLeft":
          e.preventDefault();
          if (
            keyScope == this.keyScope.partsInfoTable &&
            this.hasHistoryTableData.length
          ) {
            this.setKeyScope(this.keyScope.hasHistoryTable);
            this.selectedHasHistoryRows = this.cacheSelectedHasHistoryRows
              .length
              ? [...this.cacheSelectedHasHistoryRows]
              : [this.hasHistoryTableData[0]];
          } else if (
            keyScope == this.keyScope.hasHistoryTable &&
            this.partsInfoTableData.length
          ) {
            this.setKeyScope(this.keyScope.partsInfoTable);
            this.selectedPartsInfoRows = [this.partsInfoTableData[0]];
          }
          break;
        default:
          return;
      }
    },
    setKeyScope(keyScope) {
      this.updateFocusData({ initial: null });
      hotkeys.setScope(keyScope);
    },
    setFormKeyScope() {
      hotkeys.setScope(this.keyScope.form);
      this.canHandleRowAdd = false;
      this.canHandleRowEdit = false;
    },
    updateBillHeaderLogistics() {
      this.updateFocusData({ initial: "focus-cooperatorId" });
    },
    handleInputEnter(val) {
      if (this.$refs.headerForm.getFormValidate()) {
        if (val === "cooperatorId") {
          this.updateFocusData({ initial: "focus-enhancedSettlementType" });
        } else if (val === "logisticsCompanyId") {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        } else {
          this.updateFocusData({ type: "down" });
        }
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleNoHistoryTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.noHistoryTable);
    },
    handleHasHistoryTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.hasHistoryTable);
    },
    handlePartsInfoTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.partsInfoTable);
    },
    handleDetailsTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScope.detailsTable);
    },
    handleRowAddByHasHistory() {
      if (this.partsInfoTableData.length) {
        this.setKeyScope(this.keyScope.partsInfoTable);
        this.selectedPartsInfoRows = [this.partsInfoTableData[0]];
        this.handleRowAdd(this.selectedPartsInfoRows[0]);
      }
    },
    handleNHRowAdd(row) {
      if (!this.canHandleRowAdd) return;
      if (!this.canEdit) {
        this.$message({
          type: "warning",
          message: "当前状态不能新增配件",
          showClose: true
        });
        return;
      }
      this.addNHHandle(row);
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
      this.addHandle(row);
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

    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    formatter(val) {
      return dateFormatFull(val);
    },
    showSearchBox() {
      this.searchBoxVisible = true;
    },
    backMainList() {
      this.$router.push({ path: "/PurchaseReturnList" });
    },
    setDefaultData() {
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.detailsTableData = [];
      this.isHasHistory = true;
      this.cooperatorIdTypeDisabled = false;
      this.invoiceTypeDisabled = false;
      this.businessManIdDisabled = false;
    },
    createHandle() {
      if (!this.canClick) return;
      if (!this.canCreate) return;
      this.hasAdd = true;
      if (this.billId) {
        this.$router.replace("/PurchaseReturnBilling");
      }
      this.billId = null;
      this.header = { ...defaultHeader };
      this.registerId = "";
      this.setDefaultData();
      this.setFormKeyScope();
      this.$nextTick(() => {
        this.updateFocusData({ initial: "focus-cooperatorId" });
        this.$refs.headerForm.clearValidate();
      });
    },
    deleteHandle() {
      if (!this.canClick) return;
      if (!this.canDelete) return;
      const billNo = this.header.billNo;
      this.$confirm("确定要删除单据 " + billNo + " 吗？", {
        type: "warning"
      })
        .then(() => {
          const ids = [this.billId];
          this.deleteLoading = true;
          reqReturnBillingDelete({ ids })
            .then(() => {
              this.deleteLoading = false;
              this.$confirm(`单据 ${billNo} 已删除，是否重新开单？`, {
                type: "warning"
              })
                .then(() => {
                  this.createHandle();
                })
                .catch(() => {
                  this.closePage();
                  this.backMainList();
                });
            })
            .catch(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
    },
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      if (this.$refs.headerForm.getFormValidate()) {
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
      }
    },
    submitBill() {
      const billNo = this.header.billNo;
      this.submitLoading = true;
      return reqReturnBillingSubmit(this.billId)
        .then(() => {
          this.billInfoInit()
            .then(() => {
              this.submitLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 提交成功！",
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
      const billNo = this.header.billNo;
      this.recallLoading = true;
      reqReturnBillingRecall(this.billId)
        .then(() => {
          this.billInfoInit()
            .then(() => {
              this.recallLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + billNo + " 撤回成功！",
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
    settleHandle() {
      if (!this.canClick) return;
      if (!this.canSettleStockOut) return;
      this.settleData = {
        id: this.header.id,
        billType: this.header.billType,
        billNo: this.header.billNo,
        cooperatorId: this.header.cooperatorId,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType,
        amount: this.precisionFormat(
          this.detailsTableData.reduce((sum, item) => {
            return add(
              sum,
              Number(
                this.header.invoiceType === "收据"
                  ? item.untaxedAmount
                  : item.taxedAmount
              )
            );
          }, 0),
          "money"
        )
      };
      this.settleList = [
        {
          name: "单号",
          content: this.header.billNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.header.cooperatorName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.header.invoiceType,
              this.header.taxRate
            ) || "--"
        },
        {
          type: "amount"
        },
        {
          type: "settledAmount"
        },
        // {
        //   type: "discountAmount"
        // },
        {
          type: "unSettledAmount"
        }
      ];
      this.settleDialogVisible = true;
    },
    settleComplete(isSuccess) {
      this.settleDialogVisible = false;
      if (isSuccess) {
        this.billInfoInit();
      }
    },
    exportHandle() {
      if (!this.canClick) return;
      if (!this.canExport) return;
      this.exportTableVisible = true;
    },
    printHandle() {
      if (!this.canClick) return;
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Return/" + this.header.id
        }).href,
        "print"
      );
    },
    setScopeFocus() {
      const partsTableDataLength = this.isHasHistory
        ? this.hasHistoryTableData.length
        : this.noHistoryTableData.length;
      if (partsTableDataLength && !this.isEdit) {
        if (this.isHasHistory) {
          this.hasHistoryLoading = true;
          reqReturnHasHistoryInit({
            ...this.searchParams,
            page: this.currentPage,
            pageSize: this.pageSize,
            sort: this.hasHistorySort
          })
            .then(data => {
              this.setKeyScope(this.keyScope.hasHistoryTable);
              this.hasHistoryTableData = data.rows || [];
              this.hasHistoryTotalSize = data.totalSize;
              let selectedRow;
              if (this.selectedHasHistoryRows.length) {
                selectedRow = this.hasHistoryTableData.find(
                  item => item.id === this.selectedHasHistoryRows[0].id
                );
              }
              this.selectedHasHistoryRows = selectedRow
                ? [selectedRow]
                : this.hasHistoryTableData.length
                ? [this.hasHistoryTableData[0]]
                : [];
              this.hasHistoryLoading = false;
            })
            .catch(() => {
              this.hasHistoryLoading = false;
            });
        } else {
          this.noHistoryLoading = true;
          reqReturnNoHistoryInit({
            ...this.searchParams,
            page: this.currentPage,
            pageSize: this.pageSize,
            sort: this.noHistorySort
          })
            .then(data => {
              this.setKeyScope(this.keyScope.noHistoryTable);
              this.noHistoryTableData = data.rows || [];
              this.noHistoryTotalSize = data.totalSize;
              let selectedRow;
              if (this.selectedNoHistoryRows.length) {
                selectedRow = this.noHistoryTableData.find(
                  item => item.id === this.selectedNoHistoryRows[0].id
                );
              }
              this.selectedNoHistoryRows = selectedRow
                ? [selectedRow]
                : this.noHistoryTableData.length
                ? [this.noHistoryTableData[0]]
                : [];
              this.noHistoryLoading = false;
            })
            .catch(() => {
              this.noHistoryLoading = false;
            });
        }
      } else if (this.detailsTableData.length) {
        this.setKeyScope(this.keyScope.detailsTable);
        let selectedRow;
        if (this.selectedDetailsRows.length) {
          selectedRow = this.detailsTableData.find(
            item => item.id === this.selectedDetailsRows[0].id
          );
        }
        this.selectedDetailsRows = selectedRow
          ? [selectedRow]
          : this.detailsTableData.length
          ? [this.detailsTableData[this.detailsTableData.length - 1]]
          : [];
      } else {
        this.setFormKeyScope();
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        });
      }
      this.$nextTick(() => {
        this.$refs.headerForm.clearValidate();
      });
    },
    billInfoInit() {
      this.detailsLoading = true;
      return reqReturnBillingInit(this.billId, this.detailSort)
        .then(data => {
          this.header = data.header || { ...defaultHeader };
          this.detailsTableData = data.details || [];
          if (
            this.detailsTableData.some(item => {
              return item.arrivalDetailId;
            })
          ) {
            this.cooperatorIdTypeDisabled = true;
            this.invoiceTypeDisabled = true;
            if (this.header.businessManId) this.businessManIdDisabled = true;
          } else {
            this.cooperatorIdTypeDisabled = false;
            this.invoiceTypeDisabled = false;
            this.businessManIdDisabled = false;
          }
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
          // this.setScopeFocus();
          this.detailsLoading = false;
        })
        .catch(() => {
          this.detailsLoading = false;
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
        });
    },
    handleDetailsSortChange(sort) {
      if (!this.detailsTableData.length) {
        return;
      }
      this.detailSort = setTableSort(sort);
      setLocalTableSort(this.detailSort, `${TYPE}${DETAIL}`);
      this.billInfoInit();
    },
    gotoBill(billId) {
      this.billId = Number(billId);
      this.$router.replace({
        path: "/PurchaseReturnBilling",
        query: { billId: billId }
      });
      this.billInfoInit().then(() => {
        this.$message({
          type: "success",
          message: "添加退货单明细成功！",
          showClose: true
        });
        if (this.isHasHistory) {
          this.hasHistoryPageChange(this.currentPage);
        } else {
          this.noHistoryPageChange(this.currentPage);
        }
      });
    },
    updateBillDetails() {
      this.billInfoInit().then(() => {
        if (!this.isEdit) {
          this.selectedDetailsRows = [
            this.detailsTableData[this.detailsTableData.length - 1]
          ];
          this.$nextTick(() => {
            this.isScrollToEnd = true;
          });
        }
        const tips = this.isEdit
          ? "更新退货单明细成功！"
          : "添加退货单明细成功！";
        this.$message({
          type: "success",
          message: tips,
          showClose: true
        });
        if (this.isHasHistory) {
          this.hasHistoryPageChange(this.currentPage);
        } else {
          this.noHistoryPageChange(this.currentPage);
        }
      });
    },
    handleSearchBox(searchForm) {
      if (!this.header.id) {
        this.header = {
          ...this.header,
          cooperatorId: searchForm.cooperatorId,
          cooperatorName: searchForm.cooperatorName
        };
      }
      this.partsInfoTableData = [];
      this.searchParams = searchForm || { hasHistory: true };
      if (searchForm) {
        this.property = searchForm.property ? searchForm.property : null;
        this.warehouseId = searchForm.warehouseId
          ? searchForm.warehouseId
          : null;
      }
      if (this.searchParams.hasHistory) {
        this.isHasHistory = true;
        this.noHistoryTableData = [];
        this.searchHasHistory();
      } else {
        this.isHasHistory = false;
        this.hasHistoryTableData = [];
        this.searchNoHistory();
      }
    },
    noHistoryPageChange(page) {
      this.currentPage = page;
      this.noHistoryLoading = true;
      return reqReturnNoHistoryInit({
        ...this.searchParams,
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.noHistorySort
      })
        .then(data => {
          this.noHistoryTableData = data.rows || [];
          this.noHistoryTotalSize = data.totalSize;
          this.setKeyScope(this.keyScope.noHistoryTable);
          this.selectedNoHistoryRows = this.noHistoryTableData.length
            ? [this.noHistoryTableData[0]]
            : [];
          this.noHistoryLoading = false;
        })
        .catch(() => {
          this.noHistoryLoading = false;
        });
    },
    searchNoHistory() {
      this.currentPage = 1;
      return this.noHistoryPageChange(this.currentPage);
    },
    handleNoHistorySortChange(sort) {
      if (!this.noHistoryTableData.length) {
        return;
      }
      this.noHistorySort = setTableSort(sort);
      setLocalTableSort(this.noHistorySort, `${TYPE}${NO_HIST}`);
      this.searchNoHistory();
    },
    hasHistoryPageChange(page) {
      this.currentPage = page;
      this.hasHistoryLoading = true;
      return reqReturnHasHistoryInit({
        ...this.searchParams,
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.hasHistorySort
      })
        .then(data => {
          this.hasHistoryTableData = data.rows || [];
          this.hasHistoryTotalSize = data.totalSize;
          this.setKeyScope(this.keyScope.hasHistoryTable);
          this.selectedHasHistoryRows = this.hasHistoryTableData.length
            ? [this.hasHistoryTableData[0]]
            : [];
          if (!this.hasHistoryTableData.length) {
            this.partsInfoTableData = [];
          }
          this.hasHistoryLoading = false;
        })
        .catch(() => {
          this.hasHistoryLoading = false;
        });
    },
    searchHasHistory() {
      this.currentPage = 1;
      return this.hasHistoryPageChange(this.currentPage);
    },
    handleHasHistorySortChange(sort) {
      if (!this.hasHistoryTableData.length) {
        return;
      }
      this.hasHistorySort = setTableSort(sort);
      setLocalTableSort(this.hasHistorySort, `${TYPE}${HAS_HIST}`);
      this.searchHasHistory();
    },
    handleHasHistoryRow(row) {
      if (row) {
        this.partsDetailPartId = row.partId;
        this.hasHistoryRow = { ...row };
        const params = {
          arlDtlId: row.id,
          property: this.property,
          warehouseId: this.warehouseId,
          sourceType: row.sourceType,
          otherBatches: this.otherBatches
        };
        this.partsInfoLoading = true;
        return reqReturnpartsInfoInit(params)
          .then(data => {
            this.partsInfoTableData = data.rows || [];
            this.partsInfoLoading = false;
          })
          .catch(() => {
            this.partsInfoLoading = false;
          });
      }
    },
    invoiceTypeHandleInputEnter() {
      if (this.isHasHistory) {
        this.$refs.headerForm.debouncedHandleInputEnter();
        return;
      }
      if (this.selectedNoHistoryRows.length && !this.detailsTableData.length) {
        if (this.$refs.headerForm.getFormValidate()) {
          this.setKeyScope(this.keyScope.noHistoryTable);
          if (this.isBatchNHDetails) {
            this.afterAddBatchNHDetails();
          } else {
            this.showDetailBox();
          }
        }
      } else {
        this.$refs.headerForm.debouncedHandleInputEnter();
      }
    },
    showDetailBox() {
      this.detailBoxVisible = true;
    },
    addNHHandle(row) {
      this.isBatchNHDetails = false;
      this.noHistoryRow = { ...row };
      this.isEdit = false;
      this.billDetailData = {
        ...row,
        stockId: row.id,
        taxRate: this.header.taxRate,
        invoiceType: this.header.invoiceType,
        isHasHistory: this.isHasHistory
      };
      if (this.$refs.headerForm.getFormValidate()) {
        this.showDetailBox();
      } else {
        hotkeys.setScope(this.keyScope.form);
        this.canHandleRowAdd = false;
        this.canHandleRowEdit = false;
        this.updateFocusData({ initial: "focus-cooperatorId" });
      }
    },
    addBatchNHDetails() {
      this.isBatchNHDetails = true;
      if (this.$refs.headerForm.getFormValidate()) {
        this.afterAddBatchNHDetails();
      } else {
        hotkeys.setScope(this.keyScope.form);
        this.canHandleRowAdd = false;
        this.canHandleRowEdit = false;
        this.updateFocusData({ initial: "focus-cooperatorId" });
      }
    },
    afterAddBatchNHDetails() {
      this.detailsLoading = true;
      const allPartsInfo = {
        stockIds: this.selectedNoHistoryRows.map(item => {
          return item.id;
        })
      };
      if (!this.billId) {
        allPartsInfo.header = {
          ...this.header,
          receiverAreaId:
            this.header.receiverAreaIds && this.header.receiverAreaIds.length
              ? this.header.receiverAreaIds[2]
              : null
        };
        reqReturnCreateAllNHPartsDetails(allPartsInfo)
          .then(data => {
            this.detailsLoading = false;
            if (data) {
              this.gotoBill(data.header.id);
            }
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      } else {
        allPartsInfo.billId = this.billId;
        reqReturnAddAllNHPartsDetails(allPartsInfo)
          .then(() => {
            this.detailsLoading = false;
            this.updateBillDetails();
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      }
    },
    isRowMatchHeaderInfo(row) {
      if (this.isHasHistory && !this.billId) {
        return true;
      }
      if (
        this.header.cooperatorId &&
        this.header.cooperatorId != row.cooperatorId
      ) {
        this.$message({
          type: "warning",
          message: "该配件所属供应商与单头不一致！",
          showClose: true
        });
        return false;
      }
      if (
        this.header.taxRate &&
        Number(this.header.taxRate) !== Number(row.taxRate)
      ) {
        this.$message({
          type: "warning",
          message: "该配件所属税率与单头不一致！",
          showClose: true
        });
        return false;
      }
      return true;
    },
    addHandle(row) {
      if (!this.isRowMatchHeaderInfo(this.hasHistoryRow)) return;
      if (this.billId) {
        if (this.$refs.headerForm.getFormValidate()) {
          this.isEdit = false;
          this.partsInfoRow = { ...row };
          this.billDetailData = {
            ...this.hasHistoryRow,
            ...row,
            stockId: row.id,
            arrivalDetailId: this.hasHistoryRow.id,
            isHasHistory: this.isHasHistory
          };
          this.showDetailBox();
        }
      } else {
        this.isEdit = false;
        this.partsInfoRow = { ...row };
        this.billDetailData = {
          ...this.hasHistoryRow,
          ...row,
          stockId: row.id,
          arrivalDetailId: this.hasHistoryRow.id,
          isHasHistory: this.isHasHistory
        };
        this.showDetailBox();
      }
    },
    editDetailHandle(row) {
      this.selectedDetailsRows = [row];
      if (this.$refs.headerForm.getFormValidate()) {
        this.isEdit = true;
        this.detailId = row.id;
        this.billDetailData = {
          ...this.header,
          ...row,
          returnDetailId: row.id,
          isHasHistory: !!row.sourceBillId
        };
        this.showDetailBox();
      }
    },
    addDetails(val) {
      const params = {
        qty: val.qty || 0,
        taxedPrice: val.taxedPrice || 0,
        taxedAmount: val.taxedAmount || 0,
        untaxedPrice: val.untaxedPrice || 0,
        untaxedAmount: val.untaxedAmount || 0,
        taxAmount: val.taxAmount || 0,
        reason: val.reason,
        remark: val.remark
      };
      if (this.isEdit) {
        this.detailsLoading = true;
        params.billId = this.billId;
        params.id = this.detailId;
        reqReturnUpdatePartsDetails(params)
          .then(() => {
            this.detailsLoading = false;
            this.detailId = null;
            this.updateBillDetails();
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      } else {
        if (this.isHasHistory) {
          params.arrivalDetailId = this.hasHistoryRow.id;
          params.stockId = this.partsInfoRow.id;
          params.sourceType = this.hasHistoryRow.sourceType;
        } else {
          params.stockId = this.noHistoryRow.id;
        }
        if (this.billId) {
          this.detailsLoading = true;
          params.billId = this.billId;
          reqReturnAddPartsDetails(params)
            .then(() => {
              this.detailsLoading = false;
              this.updateBillDetails();
            })
            .catch(() => {
              this.detailsLoading = false;
            });
        } else {
          this.createBillDetails(params);
        }
      }
    },
    createBillDetails(val) {
      this.detailsLoading = true;
      let addParams = {};
      if (!this.isHasHistory) {
        addParams = {
          header: {
            ...this.header,
            receiverAreaId:
              this.header.receiverAreaIds && this.header.receiverAreaIds.length
                ? this.header.receiverAreaIds[2]
                : null
          }
        };
      } else {
        addParams = {
          header: {
            ...this.hasHistoryRow,
            billDate: this.header.billDate,
            receiverAreaId:
              this.header.receiverAreaIds && this.header.receiverAreaIds.length
                ? this.header.receiverAreaIds[2]
                : null
          }
        };
      }
      addParams.details = [val];
      reqReturnBillingCreate(addParams)
        .then(data => {
          this.detailsLoading = false;
          if (data) {
            this.gotoBill(data.header.id);
          }
        })
        .catch(() => {
          this.detailsLoading = false;
        });
    },
    addBatchDetails() {
      if (!this.isRowMatchHeaderInfo(this.hasHistoryRow)) return;
      if (this.billId) {
        if (this.$refs.headerForm.getFormValidate()) {
          this.detailsLoading = true;
          const allPartsInfo = {
            arrivalDetailId: this.hasHistoryRow.id,
            stockIds: this.selectedPartsInfoRows.map(item => {
              return item.id;
            }),
            sourceType: this.hasHistoryRow.sourceType
          };
          allPartsInfo.billId = this.billId;
          reqReturnAddAllPartsDetails(allPartsInfo)
            .then(() => {
              this.detailsLoading = false;
              this.updateBillDetails();
            })
            .catch(() => {
              this.detailsLoading = false;
            });
        }
      } else {
        this.detailsLoading = true;
        const allPartsInfo = {
          arrivalDetailId: this.hasHistoryRow.id,
          stockIds: this.selectedPartsInfoRows.map(item => {
            return item.id;
          }),
          sourceType: this.hasHistoryRow.sourceType
        };
        allPartsInfo.header = {
          ...this.header,
          ...this.hasHistoryRow,
          receiverAreaId:
            this.header.receiverAreaIds && this.header.receiverAreaIds.length
              ? this.header.receiverAreaIds[2]
              : null
        };
        reqReturnCreateAllPartsDetails(allPartsInfo)
          .then(data => {
            this.detailsLoading = false;
            if (data) {
              this.gotoBill(data.header.id);
            }
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      }
    },
    onIsShowOtherBatchsChange() {
      this.handleHasHistoryRow(
        this.selectedHasHistoryRows.length
          ? this.selectedHasHistoryRows[0]
          : this.cacheSelectedHasHistoryRows[0]
      );
    },
    addAllStock(row) {
      if (!this.isRowMatchHeaderInfo(row)) return;
      if (this.billId) {
        if (this.$refs.headerForm.getFormValidate()) {
          this.detailsLoading = true;
          reqReturnAddAllStoreDetails({
            billId: this.billId,
            arlDtlId: row.id,
            sourceType: row.sourceType
          })
            .then(() => {
              this.detailsLoading = false;
              this.updateBillDetails();
            })
            .catch(() => {
              this.detailsLoading = false;
            });
        }
      } else {
        this.detailsLoading = true;
        const header = {
          ...this.header,
          ...row,
          receiverAreaId:
            this.header.receiverAreaIds && this.header.receiverAreaIds.length
              ? this.header.receiverAreaIds[2]
              : null
        };
        reqReturnCreateAllStoreDetails({
          header,
          arrivalDetailId: row.id,
          sourceType: row.sourceType
        })
          .then(data => {
            this.detailsLoading = false;
            if (data) {
              this.gotoBill(data.header.id);
            }
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      }
    },
    addAllBill(row) {
      if (!this.isRowMatchHeaderInfo(row)) return;
      if (this.billId) {
        if (this.$refs.headerForm.getFormValidate()) {
          this.detailsLoading = true;
          reqReturnAddAllBillDetails({
            billId: this.billId,
            arrivalId: row.arrivalId,
            sourceType: row.sourceType
          })
            .then(() => {
              this.detailsLoading = false;
              this.updateBillDetails();
            })
            .catch(() => {
              this.detailsLoading = false;
            });
        }
      } else {
        this.detailsLoading = true;
        const header = {
          ...this.header,
          ...row,
          receiverAreaId:
            this.header.receiverAreaIds && this.header.receiverAreaIds.length
              ? this.header.receiverAreaIds[2]
              : null
        };
        reqReturnCreateAllBillDetails({
          header,
          arrivalId: row.arrivalId,
          sourceType: row.sourceType
        })
          .then(data => {
            this.detailsLoading = false;
            if (data) {
              this.gotoBill(data.header.id);
            }
          })
          .catch(() => {
            this.detailsLoading = false;
          });
      }
    },
    deleteDetailHandle(row) {
      this.selectedDetailsRows = [row];
      if (!this.canEdit) return;
      const tips =
        this.detailsTableData.length === 1
          ? "该单据只有一条明细，删除后单据也将删除，确定继续删除？"
          : `确定删除配件 ${row.name}（${row.code}）？`;
      this.$confirm(tips, {
        type: "warning"
      })
        .then(() => {
          if (this.detailsTableData.length === 1 && !this.canDelete) {
            this.$message.error({
              message: "您没有权限删除该单据",
              showClose: true
            });
          } else {
            const deleteParams = {
              billId: this.billId,
              ids: [row.id]
            };
            this.deleteLoading = true;
            reqReturnDeletePartsDetails(deleteParams)
              .then(() => {
                this.detailsTableData = this.detailsTableData.filter(
                  item => item.id != row.id
                );
                this.deleteLoading = false;
                this.$message({
                  type: "success",
                  message: `配件 ${row.name}（${row.code}） 删除成功！`,
                  showClose: true
                });
                if (this.detailsTableData.length === 0) {
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
                    this.detailsTableData[this.detailsTableData.length - 1]
                  ];
                  this.$nextTick(() => {
                    this.isScrollToEnd = true;
                  });
                  if (this.isHasHistory && this.hasHistoryTableData.length) {
                    this.hasHistoryLoading = true;
                    reqReturnHasHistoryInit({
                      ...this.searchParams,
                      page: this.currentPage,
                      pageSize: this.pageSize,
                      sort: this.hasHistorySort
                    })
                      .then(data => {
                        this.hasHistoryTableData = data.rows || [];
                        this.hasHistoryTotalSize = data.totalSize;
                        this.hasHistoryLoading = false;
                        this.partsInfoTableData = [];
                      })
                      .catch(() => {
                        this.hasHistoryLoading = false;
                      });
                  } else if (this.noHistoryTableData.length) {
                    this.noHistoryLoading = true;
                    reqReturnNoHistoryInit({
                      ...this.searchParams,
                      page: this.currentPage,
                      pageSize: this.pageSize,
                      sort: this.noHistorySort
                    })
                      .then(data => {
                        this.noHistoryTableData = data.rows || [];
                        this.noHistoryTotalSize = data.totalSize;
                        this.noHistoryLoading = false;
                      })
                      .catch(() => {
                        this.noHistoryLoading = false;
                      });
                  }
                }
              })
              .catch(() => {
                this.deleteLoading = false;
              });
          }
        })
        .catch(() => {});
    },
    printGoodsLabelHandle() {
      if (!this.canClick || !this.canPrint) {
        return;
      }
      this.printGoodsLabelBoxVisible = true;
    },
    // 采购退货
    printLabelHandle() {
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Label/ShippingLabel/CT/" + this.billId
        }).href,
        "print"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.batch-btn-container {
  display: flex;
  align-items: center;
  margin: 2px 0 4px 4px;
  width: 80px;
}
</style>
