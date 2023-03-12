<template>
  <!-- 销售开单-->
  <section class="container-box salesOutBilling">
    <div class="header header-between">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="createHandle"
        >
          开单（F2）
        </el-button>
        <el-button type="primary" size="mini" @click="showSearchBox">
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
        <el-button
          :disabled="!selectParts.length && !selectedRows.length"
          type="primary"
          size="mini"
          @click="showStocksLockedBox"
        >
          锁定数明细
        </el-button>
        <el-button
          :disabled="!selectParts.length"
          type="primary"
          size="mini"
          @click="editStorePrice"
        >
          修改库存价格
        </el-button>
        <div class="inline-block m-l-6">
          <div class="inline-block m-l-6">查询模式：</div>
          <div class="inline-block m-l-4">
            <ht-autoselect
              size="mini"
              style="width:260px;"
              v-model="mode"
              @change="handleBillingTypeChange"
              :options="modeOptions"
              :trigger-on-focus="false"
              placeholder="请选择"
              highlight-first-item
            />
          </div>
        </div>
        <el-checkbox
          v-loading="loading"
          :disabled="loading"
          v-model="filterZero"
          style="margin-left: 10px;"
        >
          过滤零库存（Alt+O）
        </el-checkbox>
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
          <parts-table
            ref="partTable"
            :search-info="searchInfo"
            :key-scope="keyScopes.partTable"
            :canAdd="canEdit"
            :isPlatform="isPlatform"
            :mode="mode"
            :type="TYPE"
            :companyId="companyId"
            @on-add="addPartDetailHandle"
            @handleKeyCode="handleKeyCode"
            @handleSetKeyScope="handleSetKeyScope"
            @handleSelectRow="handlePartsTableSelectRow"
            @updateFocusIndex="updateFocusIndex"
            @hasLength="partTableLength"
            @handleSetPartScope="handleSetPartScope"
            @part-swap="showPartSwapBox"
            @part-detail-change="showPartDetailBox"
          />
        </template>
        <template v-slot:block2>
          <div class="container-box">
            <div class="header">
              <el-button
                :disabled="!canDelete"
                size="mini"
                type="primary"
                @click="deleteHandle"
              >
                删除（F4）
              </el-button>
              <el-button
                :disabled="!canSubmit"
                type="primary"
                size="mini"
                @click="submitHandle"
              >
                提交（F9）
              </el-button>
              <el-button
                :disabled="!canRecall"
                type="primary"
                size="mini"
                @click="recallHandle"
              >
                撤回（F9）
              </el-button>
              <el-button
                :disabled="!canSettleStockOut"
                type="primary"
                size="mini"
                @click="settleHandle"
              >
                结算即出库（F7）
              </el-button>
              <el-button
                :disabled="!canExport"
                type="primary"
                size="mini"
                @click="exportHandle"
              >
                导出（Alt+D）
              </el-button>
              <el-button
                :disabled="!canPrint"
                type="primary"
                size="mini"
                @click="printHandle"
              >
                打印（F11）
              </el-button>
              <el-button
                :disabled="!canGrossProfitView"
                type="primary"
                size="mini"
                @click="grossProfitViewHandle"
              >
                毛利
              </el-button>
              <el-button
                :disabled="!canPrint"
                type="primary"
                size="mini"
                @click="printLabelHandle"
              >
                打印发货标签
              </el-button>
              <el-button
                :disabled="!canRigister"
                type="primary"
                size="mini"
                @click="rigisterBoxHandle"
              >
                发货登记
              </el-button>
              <div
                class="inline-block text-font-primary m-l-6 m-t-4"
                v-if="scheduleData.length"
              >
                {{ `本单模式： ${modeOptions[header.mode || 0].name}` }}
              </div>
            </div>
            <ht-card style="margin: 5px 0 0 0;">
              <header-form
                ref="headerFrom"
                :header.sync="header"
                :key-scope="keyScopes.form"
                :disabled="!canEdit"
                :isCollapse.sync="isCollapse"
                :detailHasCoop="hasCoop"
                :direct-create="directCreate"
                @click.native="handleSetKeyScopeForm"
                @reloadDetailTable="reloadDetailTable"
                @handleCreateSaleBill="handleCreateSaleBill"
              />
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <detail-table
                :header="header"
                :key-scope="keyScopes.localTable"
                :schedule-data="scheduleData"
                :selected-rows="selectedRows"
                :is-back-status="isBackStatus"
                :scroll-to-end="isScrollToEnd"
                :show-handle="canEdit"
                :export-table-visible.sync="exportTableVisible"
                :mode="mode"
                @handleEditDetail="handleEditDetail"
                @deleteDetail="deleteDetailHandle"
                @handleKeyCode="handleKeyCode"
                @handleSetDetailScope="handleSetDetailScope"
                @handleSelectRow="handleDetailTableSelectRow"
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
              {{ scheduleData.length }}
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
            <div class="amount-font">
              {{ header.settleAmount || 0 }}
            </div>
          </div>
        </div>
        <div class="footer-statistical">
          <div v-show="header.createdName">
            制单人：
            <div class="text-font">
              {{ header.createdName }}（{{ dateFormatFull(header.createdAt) }}）
            </div>
          </div>
          <div v-show="header.submitName">
            提交人：
            <div class="text-font">
              {{ header.submitName }}（{{ dateFormatFull(header.submitAt) }}）
            </div>
          </div>
          <div v-show="header.financialAuditName">
            财务审核人：
            <div class="text-font">
              {{ header.financialAuditName }}（{{
                dateFormatFull(header.financialAuditAt)
              }}）
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增、修改弹框 -->
    <EditDetailBox
      ref="editDetailBox"
      :visible.sync="editDetailBoxVisible"
      :header="header"
      :stockData="currentRow"
      :companyId="companyId"
      :partData="detailInfo"
      :isPlatform="isPlatform"
      :isEdit="isEdit"
      :mode="mode"
      @sure="editDetailHandle"
      :searchParams="searchParams"
    />
    <!-- 毛利 -->
    <gross-profit :visible.sync="grossProfitVisible" :info="grossProfitInfo" />
    <!-- 修改库存价格 -->
    <EditStock
      :visible.sync="showEditStockBox"
      :stock-data="stockData"
      :companyId="companyId"
      :mode="mode"
      :canEditPurchasesPrices="canEditPurchasesPrices"
      :canEditSalePrices="canEditSalePrices"
      @update-success="handleEditStockSuccess"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :isLogistics="isLogistics"
      :companyId="companyId"
      @settleSuccess="handleSettleRes"
    />
    <OrderError :visible.sync="orderErrorVisible" :data="orderErrorData" />
    <search-parts
      :visible.sync="searchPartsVisible"
      :companyId="companyId"
      :type="TYPE"
      @searchParamsChange="searchParamsChange"
    />
    <edit-stock-lack
      ref="editStockLack"
      :visible.sync="stockLackVisible"
      :part-parms="partParms"
      :is-platform="isPlatform"
      :add-res="addRes"
      :mode="mode"
      :canUpdateUrgentPrice="canUpdateUrgentPrice"
      :canUrgentSale="canUrgentSale"
      :showPurchasedPrice="showPurchasedPrice"
      :companyId="companyId"
      :isCrossCompanySale="isCrossCompanySale"
      @otherStockSumbit="handleOtherStockSumbit"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canEdit"
      :partData="partSwapData"
      :searchInfo="searchInfo"
      :mode="mode"
      :type="TYPE"
      @add-part="addPartDetailHandle"
      @updateFocusIndex="updateFocusIndex"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      @close="storageStocksLockedVisible = false"
    />
    <PrintGoodsLabelBox
      :visible.sync="printGoodsLabelBoxVisible"
      :value="{ billType: TYPE, billId: billId }"
      showQrCode
    />
    <!-- 发货登记 -->
    <HandleRigisterBox
      :visible.sync="showHandleRigisterBox"
      :rule-data="ruleData"
      :is-receive="false"
      :canSettle="canSettle"
      :hasBillInfo="hasBillInfo"
      :register-id="registerId"
      :is-confirm="false"
      :billId="billId || 0"
      :is-settle-confirm="true"
      @on-sure="handleRigisterSure"
    />
    <el-dialog
      title="提示"
      width="30%"
      custom-class="dialog-box"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="content-box">
        <i class="el-icon-warning" style="font-size: 18px;color: #E6A23C"></i>
        当前开单金额大于销售金额，是否添加中间人？
      </div>
      <div class="btn-box">
        <el-button size="mini" type="primary" @click="goAdd">
          去添加中间人
        </el-button>
        <el-button size="mini" type="primary" @click="noAdd">
          不添加，直接提交
        </el-button>
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import PartsInfoSearch from "@/components/partsInfoSearch";
import { mapState } from "vuex";
import EditDetailBox from "./dialog/EditDetailBox";
import EditStockLack from "./dialog/EditStockLack";
import { SettleDialog } from "@/components/business";
import detailTable from "./components/detailTable";
import headerForm from "./components/headerForm";
import {
  GrossProfit,
  PartSwapBox,
  PartsTable,
  SearchParts
} from "../components";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import EditStock from "@/components/edit-stock";
import { dateFormat, dateFormatFull } from "@/utils/date";
import {
  addOutBillDetail,
  createSalesOutBill,
  editOutBillDetail,
  salesOutBillCancelSubmit,
  salesOutBillDelete,
  salesOutBillDetailDelete,
  salesOutBillDetails,
  salesOutBillDetailsList,
  salesOutBillGrossProfit,
  salesOutBillSubmit
} from "@/api/sales/salesOut";
import eventBus from "@/event";
import { OrderError } from "@/components/errors";
import resizeBox from "@/components/resizeBox";
import {
  baseDataMixin,
  precisionsFixed,
  validCreditLine,
  freightSettleMixin
} from "@/mixins";
import { reduce } from "lodash";
import hotkeys from "hotkeys-js";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { ERROR_CODES } from "@/utils/request";
import { add } from "@/utils/numberAPI";
import { resetBelongsItem } from "@/mixins/permissionsMixin";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsDetail,
  updateStaffSystemParamsPartDetail
} from "@/api/base/base";
import * as store from "@/utils/store";
import PrintGoodsLabelBox from "@/components/PrintGoodsLabelBox";
import VideoPopover from "@/components/VideoPopover";
import HandleRigisterBox from "@/components/register";

const TYPE = "XS";
let cancelBeforeEach;
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
  plateNumber: "",
  belongs: [],
  companyId: 0,
  commissionId: null,
  commissionName: ""
};
import { NEW_MODE_OPTIONS } from "@/constants";
export default {
  name: "SalesOutBilling",
  components: {
    EditDetailBox,
    EditStock,
    GrossProfit,
    SettleDialog,
    OrderError,
    SearchParts,
    resizeBox,
    PartsTable,
    headerForm,
    detailTable,
    EditStockLack,
    PartSwapBox,
    PartsDetailBox,
    StorageStocksLockedDialog,
    PrintGoodsLabelBox,
    VideoPopover,
    HandleRigisterBox
  },
  mixins: [precisionsFixed, validCreditLine, baseDataMixin, freightSettleMixin],
  inject: ["reload"],
  data() {
    return {
      dateFormatFull,
      keyScopes: {
        localTable: Symbol("salesOutLocalTable"),
        partTable: Symbol("salesOutPartTable"),
        form: Symbol("salesOutFrom")
      },
      showHandleRigisterBox: false,
      ruleData: {},
      registerId: "",
      orderErrorData: {},
      orderErrorVisible: false,
      billId: null,
      editDetailBoxVisible: false,
      scanPriceVisible: false,
      grossProfitVisible: false,
      showEditStockBox: false,
      stockData: {},
      settleDialogVisible: false,
      searchPartsVisible: false,
      partDetailBoxVisible: false,
      addRes: null,
      partParms: null,
      stockLackVisible: false,
      header: {
        ...defaultHeader
      },
      directCreate: true,
      isScrollToEnd: false,
      scheduleData: [],
      detailInfo: {},
      searchInfo: {
        cooperatorId: null
      },
      grossProfitInfo: {},
      settleData: {},
      settleList: [],
      isEdit: false,
      selectedRows: [],
      selectParts: [],
      currentRow: {},
      partId: null,
      partTableFocusFlag: false,
      isCanEditFlag: true,
      exportTableVisible: false,
      showBillingSetBox: false,
      mode: null,
      cacheMode: null,
      partSwapData: {},
      partSwapBoxVisible: false,
      isCollapse: false,
      taxedPurchasePrice: null,
      storageStocksLockedVisible: false,
      stockFilter: {},
      searchParams: null,
      filterZero: true,
      TYPE,
      loading: false,
      sort: "",
      printGoodsLabelBoxVisible: false,
      printGoodsLabelBill: {},
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_sale.mp4",
      videoPopoverRemark: "销售开单页面，用于记录销售出库开单、结算出库。",
      //是否跨公司销售
      isCrossCompanySale: false,
      lastSubmitParams: null,
      modeOptions: NEW_MODE_OPTIONS,
      dialogVisible: false,
      dialogType: 1,
      firstLoad: true
    };
  },
  computed: {
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    canShowPartDetailBox() {
      return this.selectParts.length || this.selectedRows.length;
    },
    isPlatform() {
      return !!this.header.platformKey;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        [1, 91, 94].includes(this.header.status) &&
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
        [1, 91, 94].includes(this.header.status) &&
        this.hasBelongsPerm("delete", this.header.belongs)
      );
    },
    canSubmit() {
      return (
        [1, 91, 94].includes(this.header.status) &&
        this.hasBelongsPerm("submit", this.header.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        !this.header.financialAuditAt &&
        [2, 3, 4, 5, 6, 93].includes(this.header.status) &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canSettleStockOut() {
      return (
        !this.header.financialAuditAt &&
        [5, 6].includes(this.header.status) &&
        this.hasBelongsPerm("settleStockOut", this.header.belongs)
      );
    },
    canExport() {
      return (
        this.scheduleData.length &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canPrint() {
      return (
        this.scheduleData.length &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    canGrossProfitView() {
      return (
        this.scheduleData.length &&
        this.hasBelongsPerm("grossProfitView", this.header.belongs)
      );
    },
    canUrgentSale() {
      return this.hasBelongsPerm("urgentSale", this.header.belongs);
    },
    canUpdateUrgentPrice() {
      return this.hasBelongsPerm("updateUrgentPrice", this.header.belongs);
    },
    showPurchasedPrice() {
      if (this.isEdit) {
        return this.hasBelongsPermWithoutRoute(
          "purchasedPrice",
          "specials.pricesRead",
          resetBelongsItem(this.header.belongs, ["self", "others"], "our")
        );
      } else {
        return (
          this.selectParts.length === 1 &&
          this.hasBelongsPermWithoutRoute(
            "purchasedPrice",
            "specials.pricesRead",
            resetBelongsItem(
              this.selectParts[0].belongs,
              ["self", "others"],
              "our"
            )
          )
        );
      }
    },
    canEditPurchasesPrices() {
      return (
        this.selectParts.length === 1 &&
        this.hasBelongsPermWithoutRoute(
          "purchasesPrices",
          "sales.stocksPrices",
          this.selectParts[0].belongs
        )
      );
    },
    canEditSalePrices() {
      return (
        this.selectParts.length === 1 &&
        this.hasBelongsPermWithoutRoute(
          "salePrices",
          "sales.stocksPrices",
          this.selectParts[0].belongs
        )
      );
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(
          this.scheduleData,
          (sum, item) => add(sum, Number(item.bookQty)),
          0
        ),
        "qty"
      );
    },
    totoalAmount() {
      return this.precisionFormat(
        reduce(
          this.scheduleData,
          (sum, item) => add(sum, Number(item.taxedAmount)),
          0
        ),
        "money"
      );
    },
    totoalBillAmount() {
      return this.precisionFormat(
        reduce(
          this.scheduleData,
          (sum, item) => add(sum, Number(item.billAmount)),
          0
        ),
        "money"
      );
    },
    isBackStatus: {
      get: function() {
        let flag = false;
        if (this.scheduleData && this.scheduleData.length) {
          const item = this.scheduleData.find(item => item.status === 2);
          if (item) {
            flag = true;
          }
        }
        return flag;
      },
      set: function(value) {
        return value;
      }
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    },
    canRigister() {
      return (
        [99].includes(this.header.status) &&
        this.hasPerm("storage.logisticsRegistration.send.read") &&
        (this.header.enhancedSettlementType === "物流代收" ||
          this.header.pickMethod === "发货")
      );
    },
    hasCoop() {
      return this.scheduleData.some(item => item.priorityCode == 6);
    }
  },
  watch: {
    companyId() {
      this.$refs.partTable && this.$refs.partTable.clear();
    },
    $route(to) {
      if (to.path === "/SalesOutBilling" && to.query.time) {
        this.billId = Number(to.query.billId);
        this.loadBill();
      }
    },
    settleDialogVisible(e) {
      if (!e) {
        this.loadBill();
      }
    },
    partTableFocusFlag(bl) {
      if (bl) this.selectedRows = [];
    },
    header() {
      this.searchInfo = {
        taxRate: this.header.taxRate,
        invoiceType: this.header.invoiceType,
        cooperatorId: this.header.cooperatorId
      };
    },
    billId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    },
    filterZero() {
      this.searchParamsChange(this.searchParams);
      updateStaffSystemParamsPartDetail({
        module: "common",
        type: "filterZeroQty",
        value: {
          [TYPE]: this.filterZero
        }
      });
    },
    selectedRows(val) {
      if (val && val.length != 0) {
        this.currentRow = val[0];
      }
    },
    selectParts(val) {
      if (val && val.length != 0) {
        this.currentRow = val[0];
      }
    }
  },
  mounted() {
    this.bindSwitchScope();
    this.sort = getLocalTableSort(TYPE);
    this.getFilterZero();
    this.setDefaultData();
  },
  activated() {
    //从list来的，删除上网格查询；
    if (this.$route.query.list) {
      this.searchParams = null;
      this.$refs.partTable && this.$refs.partTable.clear();
    }
    this.setCancelBeforeEach();
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch
          partId={this.partId}
          resetedActiveTab="Sales"
          type="sale"
          header={this.header}
        />
      )
    });
    if (this.$route.query.billId) {
      this.billId = Number(this.$route.query.billId);
      this.loadBill();
    } else {
      this.loadMode();
      this.billId = null;
      this.setDefaultDate();
      if (this.partTableFocusFlag) {
        this.setKeyScope(this.keyScopes.partTable);
      } else {
        hotkeys.setScope(this.keyScopes.form);
        this.$nextTick(() => {
          this.$refs.headerFrom.updateFocusData({
            initial: "focus-cooperatorId"
          });
        });
      }
      this.$nextTick(() => {
        this.$refs.headerFrom && this.$refs.headerFrom.clearValidate();
      });
    }
  },
  deactivated() {
    cancelBeforeEach && cancelBeforeEach();
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.localTable);
    hotkeys.deleteScope(this.keyScopes.partTable);
    hotkeys.deleteScope(this.keyScopes.form);
  },
  methods: {
    setCancelBeforeEach() {
      cancelBeforeEach = this.$router.beforeEach((to, from, next) => {
        if (to.path !== "/SalesOutBilling" && this.autoSubmitWhenClose) {
          if (this.canSubmit) {
            this.$refs.headerFrom.$refs.saleOutForm.validate(valid => {
              if (valid) {
                if (
                  this.header.enhancedSettlementType === "物流代收" &&
                  !this.header.logisticsCompanyId
                ) {
                  this.$confirm(
                    "当前支付方式为物流代收，是否现在登记物流公司？",
                    "提示",
                    {
                      type: "warning",
                      distinguishCancelAndClose: true,
                      confirmButtonText: "去登记",
                      cancelButtonText: "不登记，直接提交"
                    }
                  )
                    .then(() => {
                      this.isCollapse = true;
                      setTimeout(() => {
                        this.$refs.headerFrom &&
                          this.$refs.headerFrom.updateFocusData({
                            initial: "focus-logisticsCompanyId"
                          });
                      }, 200);
                    })
                    .catch(action => {
                      if (action === "cancel") {
                        this.submitBill();
                      }
                    });
                } else if (
                  this.totoalBillAmount > this.totoalAmount &&
                  !this.header.commissionId
                ) {
                  // this.dialogVisible = true;
                  // this.dialogType = 1;
                  this.$confirm(
                    "当前开单金额大于销售金额，是否添加中间人？",
                    "提示",
                    {
                      type: "warning",
                      distinguishCancelAndClose: true,
                      confirmButtonText: "去添加中间人",
                      cancelButtonText: "不添加，直接提交"
                    }
                  )
                    .then(() => {
                      this.isCollapse = true;
                      setTimeout(() => {
                        this.$refs.headerFrom &&
                          this.$refs.headerFrom.updateFocusData({
                            initial: "focus-commissionId"
                          });
                      }, 200);
                      next(from);
                    })
                    .catch(action => {
                      if (action === "cancel") {
                        this.submitBill();
                        this.$sidebarBox.removeSidebar("Alt+P");
                        next();
                      }
                    });
                } else {
                  this.submitBill();
                  this.$sidebarBox.removeSidebar("Alt+P");
                  next();
                }
              } else {
                this.$sidebarBox.removeSidebar("Alt+P");
                next();
              }
            });
          } else {
            this.$sidebarBox.removeSidebar("Alt+P");
            next();
          }
        } else if (to.path !== "/SalesOutBilling") {
          this.$sidebarBox.removeSidebar("Alt+P");
          next();
        } else {
          next();
        }
      });
    },
    goAdd() {
      this.isCollapse = true;
      setTimeout(() => {
        this.$refs.headerFrom &&
          this.$refs.headerFrom.updateFocusData({
            initial: "focus-commissionId"
          });
      }, 200);
      this.dialogVisible = false;
    },
    noAdd() {
      this.submitBill();
      if (this.dialogType == 1) {
        this.$sidebarBox.removeSidebar("Alt+P");
      }
      this.dialogVisible = false;
    },
    rigisterBoxHandle() {
      let qty = 0;
      this.scheduleData.forEach(item => {
        qty += parseInt(item.bookQty);
      });
      this.header = {
        ...this.header,
        qty
      };
      this.getRegisterDetail({
        billId: this.billId,
        billType: "XS",
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
        this.hasPerm("storage.logisticsRegistration.receive.settle") &&
        this.hasPerm("financials.settlements");
      if (billInfo.payer > 0 && hasSettlePerm) {
        this.settle({
          billId: this.billId,
          billType: "XS",
          billNo: this.header.billNo
        });
      }
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date(), "YYYY-MM-DD");
    },
    handleCreateSaleBill(row) {
      this.handleSalesOutParams(row);
    },
    reloadDetailTable(bl) {
      if (bl) {
        this.loadTableData();
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleKeyCode(e) {
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
        case "F11":
          this.printHandle();
          break;
        case "F9":
          this.submitHandle();
          this.recallHandle();
          break;
        case "F10":
          this.showPartDetailBox();
          break;
        case "KeyD":
          if (e.altKey) this.exportHandle();
          break;
        case "KeyO":
          if (e.altKey) {
            if (!this.loading) {
              this.filterZero = !this.filterZero;
            }
          }
          break;
        case "Insert":
        case "Digit0":
        case "Numpad0":
          this.showSearchBox();
          break;
        case "Space":
          e.preventDefault();
          if (this.selectParts.length) {
            eventBus.$emit("global-part-price", {
              salePrices: this.selectParts[0].salePrices,
              costPrices: this.selectParts[0].costPrices
            });
          }
          break;
        default:
      }
    },
    handleSetKeyScopeForm() {
      this.setKeyScope(this.keyScopes.form);
    },
    updateFocusIndex() {
      hotkeys.setScope(this.keyScopes.form);
      this.$refs.headerFrom.updateFocusData({
        initial: "focus-cooperatorId"
      });
    },
    getFilterZero() {
      this.loading = true;
      getStaffSystemParamsDetail({
        module: "common",
        type: "filterZeroQty"
      })
        .then(res => {
          if (res.value) {
            this.filterZero = res.value[TYPE] || false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchParamsChange(params) {
      if (!params) {
        return;
      }
      this.searchParams = {
        ...params,
        condsAfterAgg: {
          ...params.condsAfterAgg,
          filterZero: this.filterZero,
          ownerCompanyId: this.billId ? this.header.companyId : this.companyId
        }
      };
      this.$refs.partTable.handleLocalSearch(this.searchParams);
    },
    partTableLength(bl) {
      this.partTableFocusFlag = bl;
    },
    bindSwitchScope() {
      hotkeys("alt+down", { scope: this.keyScopes.partTable }, e => {
        switch (e.code) {
          case "ArrowDown":
            if (e.altKey) {
              if (this.scheduleData.length) {
                this.setKeyScope(this.keyScopes.localTable);
                this.selectedRows = this.scheduleData.length
                  ? [this.scheduleData[0]]
                  : [];
                if (this.selectedRows.length === 1) {
                  this.partId = this.selectedRows[0].partId;
                  this.setStockFilter(this.selectedRows[0]);
                }
                this.$refs.partTable.cleanSelectedRows();
              }
            }
            break;
        }
      });
      hotkeys(
        "f2,f4,f7,f9,f10,f11,insert,0,alt+d,alt+o",
        { scope: this.keyScopes.form },
        e => {
          this.handleKeyCode(e);
        }
      );
      hotkeys("alt+up", { scope: this.keyScopes.localTable }, e => {
        switch (e.code) {
          case "ArrowUp":
            if (e.altKey) {
              if (this.partTableFocusFlag) {
                this.setKeyScope(this.keyScopes.partTable);
                this.selectedRows = [];
                this.$refs.partTable.handleSetSelectRow();
              }
            }
            break;
        }
      });
    },
    handleSetKeyScope() {
      this.setKeyScope(this.keyScopes.partTable);
    },
    handleSetPartScope() {
      this.setKeyScope(this.keyScopes.partTable);
      this.selectedRows = [];
    },
    handleSetDetailScope() {
      this.setKeyScope(this.keyScopes.localTable);
      this.$refs.partTable.cleanSelectedRows();
    },
    _message(mes, type) {
      this.$message({ message: mes, type: type });
      this.loadBill();
    },
    // 加载明细表
    loadTableData() {
      return salesOutBillDetailsList({
        billId: Number(this.billId),
        sort: this.sort
      })
        .then(data => {
          this.scheduleData = data || [];
          if (this.partTableFocusFlag && !this.isEdit) {
            this.setKeyScope(this.keyScopes.partTable);
          } else {
            this.setKeyScope(this.keyScopes.localTable);
            this.activeRow(this.scheduleData);
          }
          if (data.length == 0) {
            this.backMainList();
          }
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
        })
        .catch(() => {
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
        });
    },
    handleSortChange(sort) {
      if (!this.scheduleData.length) {
        return;
      }
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, TYPE);
      this.loadTableData();
    },
    loadBill() {
      return salesOutBillDetails(this.billId)
        .then(data => {
          this.header = data.header;
          //从其他地方来的，或第一次加载的时候（用于适配页面刷新的情况），
          //标签打开的情况下，如果从其它地方跳转过来，第一次加载判断不到，得根据第二标识判断
          //查询模式使用单据的模式
          if (this.$route.query.list || this.firstLoad) {
            this.firstLoad = false;
            this.mode = this.header.mode;
            this.$router.replace({
              path: "/SalesOutBilling",
              query: { billId: this.$route.query.billId }
            });
          }
          this.directCreate = !this.header.orderId;
          this.scheduleData = data.rows || [];
          if (this.partTableFocusFlag) {
            this.setKeyScope(this.keyScopes.partTable);
          } else {
            this.setKeyScope(this.keyScopes.localTable);
            this.activeRow(this.scheduleData);
          }
          this.$nextTick(() => {
            this.isScrollToEnd = false;
            this.$refs.headerFrom && this.$refs.headerFrom.clearValidate();
          });
          // 列表排序
          this.loadTableData();
        })
        .catch(() => {});
    },
    // 有急件、调货配件未确认通过 - 选中
    activeRow(rows) {
      const actives = [];
      if (rows.length) {
        rows.forEach(item => {
          if (item.status === 2) {
            actives.push(item);
          }
        });
      }
      this.selectedRows = actives.length ? actives : [rows[0]];
      if (this.selectedRows.length === 1) {
        this.partId = this.selectedRows[0].partId;
        this.setStockFilter(this.selectedRows[0]);
      }
    },
    backMainList() {
      this.$router.push({ path: "/SalesOutList" });
    },
    setDefaultData() {
      this.directCreate = true;
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.scheduleData = [];
    },
    createHandle() {
      if (!this.canCreate) {
        return;
      }
      if (this.billId) {
        this.$router.replace({ path: "/SalesOutBilling" });
      }
      this.billId = null;
      this.header = { ...defaultHeader };
      this.registerId = "";
      this.setDefaultData();
      hotkeys.setScope(this.keyScopes.form);
      this.$nextTick(() => {
        this.$refs.headerFrom.updateFocusData({
          initial: "focus-cooperatorId"
        });
        this.$refs.headerFrom && this.$refs.headerFrom.clearValidate();
      });
      this.loadMode(true);
    },
    deleteHandle() {
      if (!this.canDelete) {
        return;
      }
      this.setKeyScope(this.keyScopes.form);
      this.$confirm(`您确定要删除 ${this.header.billNo} 单据么?`, {
        type: "warning"
      }).then(() => {
        salesOutBillDelete(Number(this.billId)).then(() => {
          this.scheduleData = [];
          this.$confirm(`删除单据 ${this.header.billNo} 成功, 是否重新开单?`, {
            type: "warning"
          })
            .then(() => {
              this.createHandle();
            })
            .catch(() => {
              this.closePage();
              this.backMainList();
            });
        });
      });
    },
    submitHandle() {
      if (!this.canSubmit) {
        return;
      }
      this.$refs.headerFrom.$refs.saleOutForm.validate((valid, err) => {
        if (valid) {
          if (
            this.header.enhancedSettlementType === "物流代收" &&
            !this.header.logisticsCompanyId
          ) {
            this.$confirm(
              "当前支付方式为物流代收，是否现在登记物流公司？",
              "提示",
              {
                type: "warning",
                distinguishCancelAndClose: true,
                confirmButtonText: "去登记",
                cancelButtonText: "不登记，直接提交"
              }
            )
              .then(() => {
                this.isCollapse = true;
                setTimeout(() => {
                  this.$refs.headerFrom &&
                    this.$refs.headerFrom.updateFocusData({
                      initial: "focus-logisticsCompanyId"
                    });
                }, 200);
              })
              .catch(action => {
                if (action === "cancel") {
                  this.submitBill();
                }
              });
          } else if (
            this.totoalBillAmount > this.totoalAmount &&
            !this.header.commissionId
          ) {
            // this.dialogVisible = true;
            // this.dialogType = 2;
            this.$confirm(
              "当前开单金额大于销售金额，是否添加中间人？",
              "提示",
              {
                type: "warning",
                distinguishCancelAndClose: true,
                confirmButtonText: "去添加中间人",
                cancelButtonText: "不添加，直接提交"
              }
            )
              .then(() => {
                this.isCollapse = true;
                setTimeout(() => {
                  this.$refs.headerFrom &&
                    this.$refs.headerFrom.updateFocusData({
                      initial: "focus-commissionId"
                    });
                }, 200);
              })
              .catch(action => {
                if (action === "cancel") {
                  this.submitBill();
                }
              });
          } else {
            this.submitBill();
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    submitBill() {
      salesOutBillSubmit({
        billId: Number(this.billId)
      })
        .then(data => {
          if (data && ERROR_CODES.includes(data.code)) {
            this.orderErrorData = data;
            this.orderErrorVisible = true;
            return;
          }
          if (
            this.header.enhancedSettlementType === "挂账" &&
            data &&
            data.overCreditAlarm
          ) {
            this.validCreditLine(data).then(() => {
              this._message("提交成功", "success");
            });
          } else {
            this._message("提交成功", "success");
          }
        })
        .catch(err => {
          if (err && err.code === "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                salesOutBillSubmit({
                  billId: Number(this.billId),
                  skipCreditLine
                })
                  .then(() => {
                    this._message("提交成功", "success");
                  })
                  .catch(() => {});
              }
            });
          }
        });
    },
    recallHandle() {
      if (!this.canRecall) {
        return;
      }
      salesOutBillCancelSubmit(Number(this.billId))
        .then(() => {
          this._message("撤回成功", "success");
        })
        .catch(() => {});
    },
    settleHandle() {
      if (!this.canSettleStockOut) {
        return;
      }
      this.settleData = {
        id: this.header.id,
        billType: this.header.billType,
        billNo: this.header.billNo,
        cooperatorId: this.header.cooperatorId,
        sourceBillType: "XS",
        sourceBillId: this.header.id,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType,
        amount: this.header.settleAmount
      };
      console.log("header", this.header);
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
          name: "业务公司",
          content: this.header.companyName
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
          name: "开单金额",
          content: this.header.billAmount // 开单金额（含佣金、含税）
        },
        {
          name: "实际金额",
          content: this.header.taxedAmount // 含税金额
        },
        {
          name: "佣金",
          content: this.header.brokerageAmount // 佣金
        },
        {
          type: "amount"
        },
        {
          type: "settledAmount"
        },
        // {
        //   type: "discountAmount" // 优惠金额
        // },
        {
          type: "unSettledAmount" // 未结金额
        }
      ];
      this.settleDialogVisible = true;
    },
    handleSettleRes() {
      this.settleDialogVisible = false;
    },
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Out/" + this.billId
        }).href,
        "print"
      );
    },
    showSearchBox() {
      // 打开弹框前设置为查询结果表格，查询后快捷键恢复为查询结果表格
      hotkeys.setScope(this.keyScopes.partTable);
      this.isEdit = false;
      this.searchInfo = {
        taxRate: this.header.taxRate,
        invoiceType: this.header.invoiceType,
        cooperatorId: this.header.cooperatorId
      };
      this.searchPartsVisible = true;
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    /**
     * @description: 打开弹窗，并保存行数据
     * @param {*} row 表单行数据
     * @return {*} void
     */
    handleSalesOutParams(row) {
      this.detailInfo = { ...row };
      this.taxedPurchasePrice = row.costPrices?.taxed || 0;
      this.editDetailBoxVisible = true;
    },
    handleEditDetail(row) {
      this.setKeyScope(this.keyScopes.localTable);
      if (!this.isCanEditFlag) return;
      this.isEdit = true;
      this.detailInfo = { ...row };
      this.taxedPurchasePrice = row.costPrices?.taxed || 0;
      this.editDetailBoxVisible = true;
    },
    checkModeType() {
      if (!this.scheduleData.length) return true;
      if (this.header.mode != this.mode) {
        this.$message.warning(
          "当前查询模式无法添加，请切换和本单模式一致后添加。"
        );
        return false;
      }
      return true;
    },
    async addPartDetailHandle(data, type) {
      if (!this.checkModeType()) return;
      if (this.scheduleData.length) {
        let confirmText = "";
        let valiRepeatFn;
        switch (this.mode) {
          case 0:
            confirmText = "性质+仓库+货位+批次";
            valiRepeatFn = item =>
              //性质
              item.property == data.property &&
              //零件编号
              item.partId === data.partId &&
              //货主公司
              item.ownerCompanyId == data.ownerCompanyId &&
              //仓库
              item.warehouseId == data.warehouseId &&
              //货位
              item.positionId == data.positionId &&
              //批次
              item.stockId == data.stockId;
            break;
          case 1:
            confirmText = "性质+仓库+货位";
            valiRepeatFn = item =>
              //性质
              item.property == data.property &&
              //零件编号
              item.partId === data.partId &&
              //货主公司
              item.ownerCompanyId == data.ownerCompanyId &&
              //仓库
              item.warehouseId == data.warehouseId &&
              //货位
              item.positionId == data.positionId;
            break;
          case 2:
            confirmText = "性质+仓库";
            valiRepeatFn = item =>
              //性质
              item.property == data.property &&
              //零件编号
              item.partId === data.partId &&
              //货主公司
              item.ownerCompanyId == data.ownerCompanyId &&
              //仓库
              item.warehouseId == data.warehouseId;
            break;
          case 3:
            confirmText = "配件性质";
            valiRepeatFn = item =>
              //性质
              item.property == data.property &&
              //零件编号
              item.partId === data.partId &&
              //货主公司
              item.ownerCompanyId == data.ownerCompanyId;
            break;
        }
        const showConfirm = this.scheduleData.find(valiRepeatFn);
        if (showConfirm) {
          const confirm = await this.$confirm(
            `[${confirmText}]明细重复，是否继续添加？`,
            {
              type: "warning",
              isFocusCancel: true
            }
          ).catch(() => {});
          if (!confirm) return;
        }
      }
      this.afterAddPartDetailHandle(data, type);
    },
    /**
     * @description: 表格行添加/编辑事件回调，先检查下方的业务表单必填项是否填写，后打开编辑/创建弹窗。
     * @param {*} data 表单数据
     * @param {*} type 'edit'｜'add' 弹窗类型
     * @return void
     */
    afterAddPartDetailHandle(data, type) {
      this.isEdit = type === "edit";
      this.$refs.headerFrom.$refs.saleOutForm.validate(async (valid, err) => {
        //验证通过
        if (valid) {
          //跨店销售并且含税价等于0，禁止操作
          if (data.noCCS) {
            this.$alert(
              `【${data.ownerCompanyName}】未对该配件设置跨公司销售价格，请联系对方设置后，刷新本页面再进行销售。`,
              { type: "error" }
            );
            return;
          }
          this.handleSalesOutParams(data);
        } else {
          //验证失败
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    /**
     * @description: 编辑弹窗确认键的回调，保存是否是跨公司销售
     * @param {*} val 表单数据
     * @return {*} void
     */
    editDetailHandle(val) {
      this.isCrossCompanySale = val.isCrossCompanySale;
      this.addDetailHandle(val);
    },
    /**
     * @description: 添加/编辑弹窗确认键的回调
     * @param {*} val
     * @return {*} void
     */
    addDetailHandle(val) {
      const warehouseIds =
        this.searchParams?.condsBeforeAgg?.stocks?.warehouseIds || [];
      const details = {
        warehouseIds,
        detailId: val.detailId,
        partId: val.partId,
        property: val.property,
        warehouseId: val.warehouseId || 0,
        positionId: val.positionId,
        ownerCompanyId: val.ownerCompanyId,
        stockId: val.stockId,
        bookQty: val.bookQty || 0,
        preDiscountTaxedPrice: val.preDiscountTaxedPrice || 0,
        preDiscountUntaxedPrice: val.preDiscountUntaxedPrice || 0,
        preDiscountTaxedAmount: val.preDiscountTaxedAmount || 0,
        preDiscountUntaxedAmount: val.preDiscountUntaxedAmount || 0,
        taxAmount: val.taxAmount || 0,
        arrivalDate: val.arrivalDate,
        saleVehModel: val.saleVehModel,
        billPrice: val.billPrice || 0,
        billAmount: val.billAmount || 0,
        remark: val.remark,
        negative: val.negative,
        urgent: val.urgent,
        others: val.others
          ? val.others.map(item => ({
              bookQty: item.bookQty,
              stockId: item.stockId,
              preDiscountTaxedPrice: item.preDiscountTaxedPrice,
              billPrice: item.billPrice,
              warehouseId: item.warehouseId,
              positionId: item.positionId
            }))
          : undefined
      };
      let params = {};
      //添加
      if (!this.isEdit) {
        if (Number(this.billId)) {
          params = {
            details,
            demand: val.demand,
            header: {
              billId: Number(this.billId),
              mode: this.mode
            }
          };
          this.addDetailBill(params);
        } else {
          params = {
            details,
            header: {
              ...this.header,
              mode: this.mode,
              receiverAreaId:
                this.header.receiverAreaIds &&
                this.header.receiverAreaIds.length === 3
                  ? this.header.receiverAreaIds[2]
                  : undefined
            },
            demand: val.demand
          };
          this.createBill(params);
        }
      } else {
        //编辑
        params = {
          details,
          billId: Number(this.billId),
          detailId: val.detailId,
          demand: val.demand
        };
        this.editDetailBill(params);
      }
    },
    // 开单
    createBill(params) {
      createSalesOutBill(params)
        .then(res => {
          if (Number(res.lackingQty) === 0) {
            if (
              this.header.enhancedSettlementType === "挂账" &&
              res.overCreditAlarm
            ) {
              this.validCreditLine(res).then(() => {
                this.handleAddBillPart(res, params);
              });
            } else {
              this.handleAddBillPart(res, params);
            }
          } else {
            this.handleAddBillPart(res, params);
          }
        })
        .catch(err => {
          if (err.code == "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                createSalesOutBill({
                  ...params,
                  skipCreditLine
                })
                  .then(res => {
                    this.handleAddBillPart(res, params);
                  })
                  .catch(() => {});
              }
            });
          } else if (err.code == "negative-has-stock-err") {
            //后台数据有修改，重新请求接口；
            this.createBill(this.lastSubmitParams);
          }
        });
    },
    // 新增单据
    addDetailBill(params) {
      addOutBillDetail(params)
        .then(res => {
          if (Number(res.lackingQty) === 0) {
            if (
              this.header.enhancedSettlementType === "挂账" &&
              res.overCreditAlarm
            ) {
              this.validCreditLine(res).then(() => {
                this.handleAddBillPart(res, params);
              });
            } else {
              this.handleAddBillPart(res, params);
            }
          } else {
            this.handleAddBillPart(res, params);
          }
        })
        .catch(err => {
          if (err.code == "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                addOutBillDetail({
                  ...params,
                  skipCreditLine
                })
                  .then(res => {
                    this.handleAddBillPart(res, params);
                  })
                  .catch(() => {});
              }
            });
          } else if (err.code == "negative-has-stock-err") {
            //后台数据有修改，重新请求接口；
            this.addDetailBill(this.lastSubmitParams);
          }
        });
    },
    // 编辑明细单
    editDetailBill(params) {
      editOutBillDetail(params)
        .then(res => {
          if (Number(res.lackingQty) === 0) {
            if (
              this.header.enhancedSettlementType === "挂账" &&
              res.overCreditAlarm
            ) {
              this.validCreditLine(res).then(() => {
                this.handleAddBillPart(res, params);
              });
            } else {
              this.handleAddBillPart(res, params);
            }
          } else {
            this.handleAddBillPart(res, params);
          }
        })
        .catch(err => {
          if (err.code == "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                editOutBillDetail({
                  ...params,
                  skipCreditLine
                })
                  .then(res => {
                    this.handleAddBillPart(res, params);
                  })
                  .catch(() => {});
              }
            });
          } else if (err.code == "negative-has-stock-err") {
            //后台数据有修改，重新请求接口；
            this.editDetailBill(this.lastSubmitParams);
          }
        });
    },
    handleAddBillPart(addRes, parms) {
      if (Number(addRes.lackingQty)) {
        this.lastSubmitParams = parms;
        //缺货
        this.crossSaleLacking(addRes, parms);
      } else {
        //创建成功
        this.handleAddBillPartSuccess(addRes);
      }
    },
    /**
     * @description: 销售开单缺货
     * @param {addRes,parms} 创建订单的返回参数：addRes，订单参数：parms
     */
    crossSaleLacking(addRes, parms) {
      //跨公司的缺货，仅弹窗提示，不做缺货处理
      // if (this.isCrossCompanySale) {
      //   this.$message.warning({
      //     message: "跨公司销售开单货品数量超过库存数量",
      //     showClose: true
      //   });
      //   return;
      // }
      //非跨公司的缺货，缺货处理
      this.addRes = addRes;
      this.partParms = {
        ...parms.details,
        taxedPurchasePrice: this.taxedPurchasePrice
      };
      this.setKeyScope(this.keyScopes.partTable);
      this.stockLackVisible = true;
    },
    handleAddBillPartSuccess(data) {
      this.editDetailBoxVisible = false;
      this.stockLackVisible = false;
      if (this.billId) {
        if (data.billId === 0) {
          this.$message.success({ message: "转需求成功" });
          this.setKeyScope(this.keyScopes.partTable);
        } else {
          this.loadTableData().then(() => {
            if (this.isEdit) {
              this.$message.success({ message: "更新明细成功" });
            } else {
              this.selectedRows = [
                this.scheduleData[this.scheduleData.length - 1]
              ];
              this.$nextTick(() => {
                this.isScrollToEnd = true;
              });
              this.$message.success({ message: "新增明细成功" });
            }
          });
        }
      } else if (data.billId) {
        this.$message.success({ message: "开单成功" });
        this.$router.replace({
          path: "/SalesOutBilling",
          query: { billId: data.billId }
        });
        this.billId = data.billId;
        this.loadBill();
      } else if (data.billId === 0) {
        this.$message.success({ message: "转需求成功" });
        this.setKeyScope(this.keyScopes.partTable);
      }
    },
    deleteDetailHandle(row) {
      this.isCanEditFlag = false;
      let tips = "";
      if (this.scheduleData.length < 2) {
        tips = "该单据只有一条明细，删除后单据也将删除，确定继续删除？";
      } else {
        tips = "确定要删除该条单据明细？";
      }
      this.$confirm(tips, { type: "warning" })
        .then(() => {
          if (this.scheduleData.length === 1 && !this.canDelete) {
            this.$message.error({
              message: "您没有权限删除该单据",
              showClose: true
            });
          } else {
            const detailIds = [];
            detailIds.push(row.detailId);
            salesOutBillDetailDelete({
              billId: row.billId,
              detailIds: detailIds
            })
              .then(() => {
                this.scheduleData = this.scheduleData.filter(
                  item => item.id != row.id
                );
                this.$message({
                  type: "success",
                  message: `配件 ${row.name}（${row.code}） 删除成功！`,
                  showClose: true
                });
                if (this.scheduleData.length === 0) {
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
                  this.selectedRows = [
                    this.scheduleData[this.scheduleData.length - 1]
                  ];
                  this.$nextTick(() => {
                    this.isScrollToEnd = true;
                  });
                  this.isCanEditFlag = true;
                }
              })
              .catch(() => {
                this.isCanEditFlag = true;
              });
          }
        })
        .catch(() => {
          this.isCanEditFlag = true;
        });
    },
    grossProfitViewHandle() {
      if (!this.canGrossProfitView) {
        return;
      }
      salesOutBillGrossProfit(Number(this.billId)).then(data => {
        this.grossProfitInfo = data;
        this.grossProfitVisible = true;
      });
    },
    editStorePrice() {
      if (
        !this.selectParts.length ||
        !this.selectParts[0].stockIds ||
        this.selectParts[0].stockIds.length !== 1
      ) {
        let msg = "";
        if (this.mode === 0) {
          msg = "有入库记录时才允许修改库存价格。";
        } else {
          msg = "该明细汇总了多条库存纪录，请切换开单设置为按批次后再修改。";
        }
        this.$message({
          type: "warning",
          message: msg,
          showClose: true
        });
        return;
      }
      this.stockData = {
        ...this.selectParts[0],
        id: this.selectParts[0].stockIds[0]
      };
      this.showEditStockBox = true;
    },
    handleEditStockSuccess(value) {
      if (!value) return;
      this.$refs.partTable.handleLocalSearch(this.searchParams);
    },
    //行数据点击返回当前行
    handlePartsTableSelectRow(data) {
      this.selectParts = [...data];
      if (data && data.length === 1) {
        this.partId = data[0].partId;
        this.setStockFilter(data[0]);
      }
    },
    handleDetailTableSelectRow(data) {
      this.selectedRows = [...data];
      if (data && data.length === 1) {
        this.partId = data[0].partId;
        this.setStockFilter(data[0], true);
      }
    },
    goBillDetail(val) {
      if (val) {
        this.$router.replace({
          path: "/SalesOutBilling",
          query: { billId: val }
        });
        this.loadBill();
      }
    },
    // 信用额度-开单业务提示
    editCreditCreateBill() {
      this.$message.success({ message: "修改成功" });
      this.loadTableData();
    },
    handleOtherStockSumbit(data) {
      this.addDetailHandle(data);
    },
    exportHandle() {
      if (!this.canExport) {
        return;
      }
      this.exportTableVisible = true;
    },
    loadMode(isKD) {
      getStaffSystemParamsDetail({ module: "sale", type: "billingMode" })
        .then(res => {
          this.cacheMode = res.value;
          if (isKD || this.mode === null) {
            this.mode = this.cacheMode;
          }
          if (isKD && this.searchParams) {
            this.searchParams.mode = res.value;
            this.searchParams = {
              ...this.searchParams,
              mode: res.value,
              condsBeforeAgg: {
                ...this.searchParams.condsBeforeAgg,
                stocks: {
                  ...this.searchParams.condsBeforeAgg.stocks,
                  ownerCompanyId: store.userInfoMsg().companyId
                }
              }
            };
            this.$refs.partTable.handleLocalSearch(this.searchParams);
          }
        })
        .catch(() => {});
    },
    handleBillingTypeChange(value) {
      this.mode = value;
      this.cacheMode = value;
      updateStaffSystemParamsDetail({
        module: "sale",
        type: "billingMode",
        value
      });
      this.$nextTick(() => {
        if (this.partTableFocusFlag && this.searchParams) {
          this.searchParams.mode = this.mode;
          this.$refs.partTable.handleLocalSearch(this.searchParams);
        }
      });
    },
    showPartSwapBox(row) {
      this.partSwapData = row;
      this.partSwapBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.selectedRows.length && !this.selectParts.length) {
        return;
      }
      this.storageStocksLockedVisible = true;
    },
    setStockFilter(row, isDetail) {
      const mode = isDetail ? 1 : this.mode;
      this.stockFilter = {
        partId: this.partId,
        ownerCompanyId: isDetail ? this.header.companyId : row.ownerCompanyId,
        property: row.property,
        batchNo: mode === 0 ? row.batchNo : undefined,
        warehouseId: mode <= 1 ? row.warehouseId : undefined,
        positionId: mode <= 2 ? row.positionId : undefined
      };
    },
    printGoodsLabelHandle() {
      if (!this.canPrint) {
        return;
      }
      this.printGoodsLabelBoxVisible = true;
    },
    // 销售单
    printLabelHandle() {
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Label/ShippingLabel/XS/" + this.billId
        }).href,
        "print"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.salesOutBilling {
  &::v-deep .el-form--label-left .el-form-item__label {
    text-align: right;
  }
}
::v-deep {
  .dialog-box {
    left: 35%;
    top: 20%;
    .content-box {
      width: 100%;
      text-align: center;
      padding: 20px 0 30px;
    }
    .btn-box {
      text-align: right;
    }
  }
}
</style>
