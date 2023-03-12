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
              :options="modeOptions"
              @change="handleModeChange"
              :trigger-on-focus="false"
              placeholder="请选择"
              highlight-first-item
            />
          </div>
        </div>
      </div>
      <div>
        <el-link
          :underline="false"
          style="margin-right: 10px"
          @click="backMainList"
        >
          返回列表
          <span class="el-icon-arrow-right" />
        </el-link>
        <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
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
                :disabled="!canClick || !canSettleStockIn"
                type="primary"
                size="mini"
                @click="settleHandle"
              >
                结算即入库（F7）
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
              <el-button
                :disabled="!canClick || !canSubmit"
                type="primary"
                size="mini"
                @click="setWarehouseHandle"
              >
                设置到货仓库
              </el-button>
              <el-button
                :disabled="!canClick || !canPrint"
                type="primary"
                size="mini"
                @click="printPartLabelHandle"
              >
                打印配件标签
              </el-button>
              <el-button
                :disabled="!canClick || !canRigister"
                type="primary"
                size="mini"
                @click="rigisterBoxHandle"
              >
                收货登记
              </el-button>
              <el-button
                type="primary"
                size="mini"
                :disabled="!canShare"
                @click="shareFreight"
                >运费分摊</el-button
              >
            </div>
            <ht-card style="margin: 5px 0 0 0;">
              <ReceiveHeader
                ref="headerDom"
                :header.sync="header"
                :can-edit="canEdit"
                :focus-data="focusData"
                :handle-input-enter="handleInputEnter"
                :direct-create="directCreate"
                :is-platform="isPlatform"
                :order-details-visible.sync="editDetailBoxVisible"
                :isCollapse.sync="isCollapse"
                @on-closed="handleReceiverAddressVisible"
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
                :data="details"
                :summary-method="setTotals"
                :columns="tableFormatColumns"
                :key-scope="keyScope.detailsTable"
                :scroll-to-end="isScrollToEnd"
                :selected-rows.sync="selectedDetailsRows"
                show-summary
                setting-all-column
                show-table-setting
                @hotkeysUp="handleDetailsTableKeyCode"
                @rowOperation="handleRowEdit"
                @rowDelete="handleRowDelete"
                @click.native.stop="setKeyScope(keyScope.detailsTable)"
                @table-setting="handleTableSetting"
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
      @show-pagination-change="value => (showPagination = value)"
    />
    <export-table
      :base-columns="baseDetailsColumns"
      :default-data="details"
      :file-name="`采购到货单-${header.billNo}`"
      :table-name="detailsName"
      :visible.sync="exportTableVisible"
    />

    <EditDetailBox
      :visible.sync="editDetailBoxVisible"
      :header="header"
      :mode="mode"
      :partData="partsData"
      :details="details"
      :isEdit="isEdit"
      :companyId="companyId"
      @sure="handleDetails"
    />
    <search-parts-box
      :visible.sync="searchBoxVisible"
      :companyId="companyId"
      :type="TYPE"
      @searchParamsChange="searchParamsChange"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :isLogistics="isLogistics"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="settleComplete"
    />
    <EditWarehouseBox
      :visible.sync="editWarehouseBoxVisible"
      :details="details"
      :header="{ billId, billNo: header.billNo }"
      :hasSubmit="hasSubmit"
      :companyId="companyId"
      @on-eidt="billInfoInit"
    />
    <EditPrintPartLabelBox
      :visible.sync="editPrintPartLabelBoxVisible"
      :billId="billId || 0"
    />
    <BillingImportBox
      ref="refBillingImportBox"
      v-model="importInfo"
      :visible.sync="importVisible"
      :disabled="!canImport"
      :req-handler="importPurchasesOrders"
      :billData="billData"
      :companyId="companyId"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canEdit"
      :mode="mode"
      :partData="partSwapData"
      :type="TYPE"
      @add-part="addDetailHandle"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <HandleRigisterBox
      :visible.sync="showHandleRigisterBox"
      :rule-data="ruleData"
      :billId="billId || 0"
      :canSettle="canSettle"
      :hasBillInfo="hasBillInfo"
      :is-settle-confirm="true"
      :is-receive="true"
      :register-id="registerId"
      :is-confirm="false"
      @on-sure="handleRigisterSure"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stock="stock"
      :stockFilter="stockFilter"
      :mode="mode"
      @close="storageStocksLockedVisible = false"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import HandleRigisterBox from "@/components/register";
import { dateFormat, dateFormatFull } from "@/utils/date";

import {
  reqCreateReceive,
  reqReceiveAddPart,
  reqReceiveDetailsUpdate,
  reqReceiveDetailsDelete,
  reqReceiveDetails,
  reqReceiveSubmit,
  reqReceiveDelete,
  reqReceiveRecall,
  shareFreight
} from "@/api/purchase/purchaseReceive";
import {
  precisionsFixed,
  setTotals,
  baseDataMixin,
  freightSettleMixin
} from "@/mixins";
import { SettleDialog } from "@/components/business";
import { reduce } from "lodash";
import { TABLE_PURCHASE_RECEIVE_DETAILS } from "@/views/purchase/constants";
import ResizeBox from "@/components/resizeBox";
import { EditColumns, ExportTable } from "@/components/table";
import PartsInfoSearch from "@/components/partsInfoSearch";

import ReceiveHeader from "./ReceiveHeader";
import { receiverInfoFilters } from "@/utils/tool";
import { PartSwapBox, PartsList, SearchPartsBox } from "../../components";
import EditDetailBox from "../dialog/EditDetailBox";
import EditWarehouseBox from "../dialog/EditWarehouseBox";
import EditPrintPartLabelBox from "../dialog/EditPrintPartLabelBox";
import hotkeys from "hotkeys-js";
import { BillingImportBox } from "../../components";
import { reqImportPurchasesBills } from "@/api/importBox";
import { purchaseBillOptions } from "@/components/importBox/options";
import { PURCHASE_BILL_COUNT } from "@/constants";
import eventBus from "@/event";
import { mapState } from "vuex";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { add } from "@/utils/numberAPI";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";
import { NEW_MODE_OPTIONS } from "@/constants";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsDetail
} from "@/api/base/base";
let loading = false;

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
  receiverAreaNames: [],
  receiverAddress: "",
  arrivalDate: null,
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "自付",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  peerOrderNo: "",
  taxRate: 0,
  companyId: 0,
  belongs: [],
  mode: 0
};
const defaultFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};
const TYPE = "CG";

export default {
  name: "PurchaseReceiveBilling",
  components: {
    ResizeBox,
    EditDetailBox,
    ReceiveHeader,
    SettleDialog,
    SearchPartsBox,
    PartsList,
    EditColumns,
    ExportTable,
    EditWarehouseBox,
    EditPrintPartLabelBox,
    BillingImportBox,
    PartSwapBox,
    AvaVehModels,
    PartsDetailBox,
    StorageStocksLockedDialog,
    VideoPopover,
    HandleRigisterBox
  },
  mixins: [precisionsFixed, setTotals, baseDataMixin, freightSettleMixin],
  data() {
    return {
      keyScope: {
        detailsTable: Symbol("purchaseReceiveDetailsTable"),
        partsTable: Symbol("purchaseReceivePartsTable"),
        form: Symbol("purchaseReceiveFrom")
      },
      focusData: {
        ...defaultFocusData
      },
      showHandleRigisterBox: false,
      ruleData: {},
      registerId: "",
      deleteLoading: false,
      recallLoading: false,
      submitLoading: false,
      partsTableData: [],
      selectedPartsListRows: [],
      selectedDetailsRows: [],
      canHandleRowAdd: false,
      canHandleRowEdit: false,
      isEdit: false,
      partsData: {},
      dateFormat,
      directCreate: true,
      editDetailBoxVisible: false,
      billId: null,
      partId: null,
      detailsLoading: false,
      header: { ...defaultHeader },
      isScrollToEnd: false,
      exportTableVisible: false,
      editColumnsVisible: false,
      showPagination: false,
      baseDetailsColumns: TABLE_PURCHASE_RECEIVE_DETAILS.columns,
      detailsName: TABLE_PURCHASE_RECEIVE_DETAILS.name,
      details: [],
      tableColumns: [],
      settleDialogVisible: false,
      settleData: {},
      settleList: [],
      searchBoxVisible: false,
      partDetailBoxVisible: false,
      receiverAddressVisible: false,
      editWarehouseBoxVisible: false,
      editPrintPartLabelBoxVisible: false,
      hasSubmit: false,
      importVisible: false,
      importInfo: {
        options: purchaseBillOptions,
        hasSetting: true,
        offset: PURCHASE_BILL_COUNT,
        cooperatorId: null,
        cooperatorName: "",
        enhancedSettlementType: "",
        invoiceType: "",
        createPartsIfNotExist: false,
        isAssignBrand: false,
        assignBrand: "",
        isAssignProductionPlace: false,
        assignProductionPlace: "",
        isAssignWarehouse: false,
        assignWarehouseId: 0
      },
      cacheReceiverInfo: {},
      billData: {},
      partSwapData: {},
      partSwapBoxVisible: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      isCollapse: false,
      storageStocksLockedVisible: false,
      stockFilter: {},
      TYPE,
      sort: "",
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_purchases.mp4",
      videoPopoverRemark: "采购开单页面，用于几率进货开单、结算入库。",
      mode: 0,
      modeOptions: NEW_MODE_OPTIONS,
      stock: {}
    };
  },
  computed: {
    ...mapState("admin/receiverInfo", ["defaultReceiverInfo"]),
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    tableFormatColumns() {
      const editDetailHandle = (row, e) => {
        e.stopPropagation();
        this.setKeyScope(this.keyScope.detailsTable);
        this.selectedDetailsRows = [row];
        this.editDetailHandle(row);
      };
      const deleteDetailHandle = (row, e) => {
        e.stopPropagation();
        this.setKeyScope(this.keyScope.detailsTable);
        this.selectedDetailsRows = [row];
        this.deleteDetailHandle(row);
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.setKeyScope(this.keyScope.detailsTable);
        this.selectedDetailsRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.tableColumns
        .filter(item => {
          return this.canEdit || item.type !== "controls";
        })
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
        (this.header.id && !this.isPlatform && this.canUpdate)
      );
    },
    canShare() {
      return (
        this.hasBelongsPermWithoutRoute(
          "update",
          "purchases.arrivals",
          this.header.belongs
        ) &&
        this.header.freightPayer == "自付" &&
        this.header.canShareFreight
      );
    },
    canDelete() {
      return (
        !this.isPlatform &&
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
        !this.isPlatform &&
        [1, 2, 3].includes(this.header.status) &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canSettleStockIn() {
      return (
        [2, 3].includes(this.header.status) &&
        this.hasBelongsPerm("settleStockIn", this.header.belongs)
      );
    },
    canExport() {
      return (
        this.details.length &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canImport() {
      return this.hasBelongsPerm("import", this.header.belongs);
    },
    canPrint() {
      return (
        this.details.length &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    canRigister() {
      return (
        [4].includes(this.header.status) &&
        this.hasPerm("storage.logisticsRegistration.receive.read") &&
        (this.header.enhancedSettlementType === "物流代收" ||
          this.header.pickMethod === "发货")
      );
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    },
    isShareFreight() {
      return this.details && this.details.length && this.details[0].freight > 0;
    }
  },
  watch: {
    companyId() {
      this.partsTableData = [];
    },
    $route(to) {
      if (to.path === "/PurchaseReceiveBilling" && to.query.time) {
        this.billId = Number(to.query.billId);
        this.billInfoInit();
      }
    },
    settleDialogVisible(e) {
      if (!e) {
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
    defaultReceiverInfo(val) {
      if (val) {
        this.cacheReceiverInfo = { ...val };
        if (!this.header.id) {
          this.setDefaultReceiverInfo();
        }
      }
    },
    billId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    },
    mode() {
      if (!this.$refs.refPartsList.relTableData?.length) return;
      this.$refs.refPartsList.loadData(this.mode);
    }
  },
  mounted() {
    eventBus.$on("on-goto-bill", this.gotoBilling);
    hotkeys("*", { scope: this.keyScope.form }, e => {
      this.bindKeyCode(e, this.keyScope.form);
    });
    this.sort = getLocalTableSort(TYPE);
    this.setDefaultData();
    this.loadMode();
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
      if (this.partsTableData.length) {
        this.setKeyScope(this.keyScope.partsTable);
      } else {
        this.setFormKeyScope();
        this.$nextTick(() => {
          this.updateFocusData({ initial: "focus-cooperatorId" });
        });
      }
      this.$nextTick(() => {
        this.$refs.headerDom && this.$refs.headerDom.clearValidate();
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
    eventBus.$off("on-goto-bill", this.gotoBilling);
    hotkeys.deleteScope(this.keyScope.detailsTable);
    hotkeys.deleteScope(this.keyScope.partsTable);
    hotkeys.deleteScope(this.keyScope.form);
  },
  methods: {
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    handleModeChange(value) {
      updateStaffSystemParamsDetail({
        module: "purchase",
        type: "billingMode",
        value
      });
    },
    loadMode() {
      getStaffSystemParamsDetail({
        module: "purchase",
        type: "billingMode"
      }).then(res => {
        this.mode = res.value;
      });
    },
    shareFreight() {
      shareFreight({
        arrivalId: this.header.id,
        freight: this.header.freight
      }).then(() => {
        this.billInfoInit();
      });
    },
    rigisterBoxHandle() {
      console.log(this.headers);
      this.getRegisterDetail({
        billId: this.billId,
        billType: "CG",
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
      // if (this.isShareFreight) {
      //   this.shareFreight({
      //     arrivalId: this.header.id,
      //     freight: billInfo.freight
      //   });
      // } else {
      //   this.billInfoInit();
      // }
      this.billInfoInit();
      const hasSettlePerm =
        this.hasPerm("storage.logisticsRegistration.receive.settle") &&
        this.hasPerm("financials.settlements");
      if (billInfo.payer > 0 && hasSettlePerm) {
        // 调用结算
        this.settle({
          billId: this.billId,
          billType: "CG",
          billNo: this.header.billNo
        });
      }
    },

    setDefaultDate() {
      this.header.billDate = dateFormat(new Date());
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
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
      this.updateFocusData({ initial: null });
      hotkeys.setScope(keyScope);
    },
    setFormKeyScope() {
      hotkeys.setScope(this.keyScope.form);
      this.canHandleRowAdd = false;
      this.canHandleRowEdit = false;
    },
    setDefaultReceiverInfo() {
      this.header = {
        ...receiverInfoFilters(this.cacheReceiverInfo),
        ...this.header
      };
    },
    updateBillHeaderLogistics() {
      this.updateFocusData({ initial: "focus-peerOrderNo" });
    },
    handleInputEnter(val) {
      if (this.$refs.headerDom.getFormValidate()) {
        if (val === "cooperatorId") {
          this.updateFocusData({ initial: "focus-enhancedSettlementType" });
        } else if (val === "peerOrderNo") {
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
          message: "平台订单不能新增本地配件",
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
    handleReceiverAddressVisible(receiverAddressVisible) {
      this.receiverAddressVisible = receiverAddressVisible;
    },
    formatter(val) {
      return dateFormatFull(val);
    },
    searchParamsChange(params) {
      this.$refs.refPartsList.handleLocalSearch({ ...params, mode: this.mode });
    },
    setDefaultData() {
      this.directCreate = true;
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.setDefaultReceiverInfo();
      this.details = [];
    },
    createHandle() {
      if (!this.canClick) return;
      if (!this.canCreate) return;
      if (this.billId) {
        this.$router.replace("/PurchaseReceiveBilling");
      }
      this.billId = null;
      this.header = { ...defaultHeader };
      this.registerId = "";
      console.log(this.registerId);
      this.setDefaultData();
      this.setFormKeyScope();
      this.$nextTick(() => {
        this.updateFocusData({ initial: "focus-cooperatorId" });
        this.$refs.headerDom && this.$refs.headerDom.clearValidate();
      });
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
        this.$refs.headerDom && this.$refs.headerDom.clearValidate();
      });
    },
    billInfoInit() {
      this.detailsLoading = true;
      return reqReceiveDetails(this.billId, this.sort)
        .then(data => {
          this.header = data.header || { ...defaultHeader };
          this.directCreate = this.header.directCreate;
          this.details = data.details || [];
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
          this.setScopeFocus();
          this.detailsLoading = false;
        })
        .catch(() => {
          this.detailsLoading = false;
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
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
    gotoBilling(billId) {
      this.billId = Number(billId);
      this.$router.replace({
        path: "/PurchaseReceiveBilling",
        query: { billId: billId }
      });
      return this.billInfoInit();
    },
    backMainList() {
      this.$router.push({ path: "/PurchaseReceiveList" });
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
          reqReceiveDelete({ ids: [this.header.id] })
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
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      if (this.$refs.headerDom.getFormValidate()) {
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
      if (
        this.details.some(item => {
          return !Number(item.warehouseId);
        })
      ) {
        this.hasSubmit = true;
        this.editWarehouseBoxVisible = true;
      } else {
        this.submitLoading = true;
        const warehouseInfos = this.details.map(item => {
          return {
            detailId: item.id,
            warehouseId: item.warehouseId,
            positionId: item.positionId || null
          };
        });
        return reqReceiveSubmit({ id: this.billId, warehouseInfos })
          .then(() => {
            this.billInfoInit()
              .then(() => {
                this.submitLoading = false;
                this.$message({
                  type: "success",
                  message: "单据 " + this.header.billNo + " 提交成功",
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
      }
    },
    recallHandle() {
      if (!this.canClick) return;
      if (!this.canRecall) return;
      this.recallLoading = true;
      reqReceiveRecall(this.billId)
        .then(() => {
          this.billInfoInit()
            .then(() => {
              this.recallLoading = false;
              this.$message({
                type: "success",
                message: "单据 " + this.header.billNo + " 撤回成功",
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
    settleHandle() {
      if (!this.canClick) return;
      if (!this.canSettleStockIn) return;
      this.settleData = {
        id: this.header.id,
        billType: this.header.billType,
        billNo: this.header.billNo,
        cooperatorId: this.header.cooperatorId,
        sourceBillType: "CG",
        sourceBillId: this.header.id,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType,
        amount: this.precisionFormat(
          this.details.reduce((amt, curr) => {
            return add(
              amt,
              Number(
                this.header.invoiceType === "收据"
                  ? curr.untaxedAmount
                  : curr.taxedAmount
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
    printHandle() {
      if (!this.canClick) return;
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Receive/" + this.header.id
        }).href,
        "print"
      );
    },
    invoiceTypeHandleInputEnter() {
      if (this.selectedPartsListRows.length && !this.details.length) {
        if (this.$refs.headerDom.getFormValidate()) {
          this.setKeyScope(this.keyScope.partsTable);
          this.editDetailBoxVisible = true;
        }
      } else {
        this.$refs.headerDom.debouncedHandleInputEnter();
      }
    },
    addDetailHandle(row) {
      this.isEdit = false;
      this.partsData = { ...row };
      if (this.$refs.headerDom.getFormValidate()) {
        this.editDetailBoxVisible = true;
      } else {
        hotkeys.setScope(this.keyScope.form);
        this.canHandleRowAdd = false;
        this.canHandleRowEdit = false;
        this.updateFocusData({ initial: "focus-cooperatorId" });
      }
    },
    editDetailHandle(row) {
      if (this.$refs.headerDom.getFormValidate()) {
        this.selectedDetailsRows = [row];
        this.isEdit = true;
        this.partsData = { ...row };
        this.editDetailBoxVisible = true;
      }
    },
    handleDetails(formData) {
      if (loading) return;
      loading = true;
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
        warehouseId: formData.warehouseId,
        positionId: formData.positionId,
        salePrices: formData.salePrices
      };
      if (this.isEdit) {
        details.id = this.partsData.id;
        this.updateDetails({ ...details });
      } else {
        this.addDetails([{ ...details }]);
      }
    },
    addDetails(details) {
      if (this.billId) {
        reqReceiveAddPart({ billId: this.billId, details })
          .then(() => {
            this.$message({
              type: "success",
              message: "添加配件成功",
              showClose: true
            });
            this.billInfoInit().then(() => {
              this.selectedDetailsRows = [
                this.details[this.details.length - 1]
              ];
              this.$nextTick(() => {
                this.isScrollToEnd = true;
              });
            });
            loading = false;
          })
          .catch(() => {
            loading = false;
          });
      } else {
        this.header.mode = this.mode;
        reqCreateReceive({ header: this.header, details })
          .then(data => {
            this.$message({
              type: "success",
              message: "添加配件成功",
              showClose: true
            });
            this.gotoBilling(data.header.id);
            loading = false;
          })
          .catch(() => {
            loading = false;
          });
      }
    },
    updateDetails(details) {
      reqReceiveDetailsUpdate(details)
        .then(() => {
          this.$message({
            type: "success",
            message: "配件明细更新成功！",
            showClose: true
          });
          this.billInfoInit();
          loading = false;
        })
        .catch(() => {
          loading = false;
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
            reqReceiveDetailsDelete({
              billId: this.billId,
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
    importHandle() {
      if (!this.canClick) return;
      if (!this.canImport) return;
      this.importInfo = {
        ...this.importInfo,
        cooperatorId: this.header.cooperatorId,
        cooperatorName: this.header.cooperatorName,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType
      };
      this.importVisible = true;
    },
    importPurchasesOrders(rows) {
      if (!this.$refs.refBillingImportBox) return;
      return new Promise((resolve, reject) => {
        if (this.$refs.refBillingImportBox.isValidate()) {
          reqImportPurchasesBills({
            cooperatorId: this.importInfo.cooperatorId,
            enhancedSettlementType: this.importInfo.enhancedSettlementType,
            invoiceType: this.importInfo.invoiceType,
            createPartsIfNotExist: this.importInfo.createPartsIfNotExist,
            isAssignBrand: this.importInfo.isAssignBrand,
            assignBrand: this.importInfo.assignBrand,
            isAssignProductionPlace: this.importInfo.isAssignProductionPlace,
            assignProductionPlace: this.importInfo.assignProductionPlace,
            isAssignWarehouse: this.importInfo.isAssignWarehouse,
            assignWarehouseId: this.importInfo.assignWarehouseId,
            rows
          })
            .then(res => {
              this.loadDictionary({ type: "property", isReload: true });
              resolve(res);
              if (res.billNo && res.billId) {
                this.billData = {
                  billNo: res.billNo,
                  billId: res.billId,
                  path: "/PurchaseReceiveBilling"
                };
              }
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
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
    },
    setWarehouseHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.hasSubmit = false;
      this.editWarehouseBoxVisible = true;
    },
    printPartLabelHandle() {
      if (!this.canClick || !this.canPrint) return;
      this.editPrintPartLabelBoxVisible = true;
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
  }
}
</style>
