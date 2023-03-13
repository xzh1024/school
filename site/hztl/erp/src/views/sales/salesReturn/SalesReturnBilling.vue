<template>
  <section class="container-box">
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
        <el-button type="primary" size="mini" @click="searchVisible = true">
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
    <ht-card class="auto-card" no-padding>
      <resize-box :default-len="242" is-column>
        <template v-slot:block1>
          <has-history-table
            v-if="hasHistory"
            :table-data="hasHistoryTableData"
            :total-size="hasHistoryTotalSize"
            :key-scope="keyScopes.partTable"
            :main-selected-row.sync="selectedHasHistoryRows"
            :current-page="currentPage"
            :show-handle="canEdit"
            @hasHistoryPageChange="hasHistoryPageChange"
            @addSalesOutOrder="addSalesOutOrder"
            @handleKeyCode="handleKeyCode"
            @handleReturnBill="handleReturnBill"
            @handlePartDetailChange="showPartDetailBox"
            @click.native.stop="setKeyScope(keyScopes.partTable)"
            @sort-change="handleHasHistorySortChange"
          />
          <no-history-table
            v-else
            :table-data="noHistoryTableData"
            :total-size="noHistoryTotalSize"
            :current-page="currentPage"
            :key-scope="keyScopes.partTable"
            :selected-row2.sync="selectedNoHistoryRows"
            :show-handle="canEdit"
            @addSalesOutOrder="addSalesOutOrder"
            @noHistoryPageChange="noHistoryPageChange"
            @handleKeyCode="handleKeyCode"
            @handlePartDetailChange="showPartDetailBox"
            @click.native.stop="setKeyScope(keyScopes.partTable)"
            @sort-change="handleNoHistorySortChange"
          />
        </template>
        <template v-slot:block2>
          <div class="container-box">
            <div class="header">
              <el-button
                :disabled="!canDelete"
                type="primary"
                size="mini"
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
                :disabled="!canSettleStockIn"
                type="primary"
                size="mini"
                @click="settleHandle"
              >
                结算即入库（F7）
              </el-button>
              <el-button
                :disabled="!canAuditCost"
                type="primary"
                size="mini"
                @click="auditCostHandle"
              >
                成本价审核（F7）
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
                :disabled="!canRigister"
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
              <header-form
                v-loading="loading"
                ref="salesReturnForm"
                :header.sync="header"
                :key-scope="keyScopes.form"
                :is-easy-create.sync="isEasyCreate"
                :canEdit="canEdit"
                :has-bussiness-man-per="hasBussinessManPer"
                :is-sales-history="isSalesHistory"
                :bill-id="billId"
                :isCollapse.sync="isCollapse"
                @form-change="handerHeaderChange"
                @click.native.stop="setKeyScope(keyScopes.form)"
                @handleCreateSaleBill="handleCreateSaleBill"
              />
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <ht-setting-table
                :loading="loading"
                :data="detailTableData"
                :columns="detailsFormatColumns"
                :table-name="detailsName"
                :selected-rows.sync="selectedDetailRows"
                :key-scope="keyScopes.localTable"
                :summary-method="setTotals"
                show-summary
                :scroll-to-end="isScrollToEnd"
                @click.native.stop="setKeyScope(keyScopes.localTable)"
                @hotkeysUp="handleKeyCode"
                @rowOperation="handleEditSalesOutOrder"
                @sort-change="handleDetailSortChange"
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
              {{ detailTableData.length }}
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
              {{ header.settleAmount || 0 }}
            </div>
          </div>
        </div>
        <div class="footer-statistical">
          <div v-show="header.createdName">
            制单人：
            <div class="text-font">
              {{ header.createdName }}（{{ formatter(header.createdAt) }}）
            </div>
          </div>
          <div v-show="header.submitName">
            提交人：
            <div class="text-font">
              {{ header.submitName }}（{{ formatter(header.submitAt) }}）
            </div>
          </div>
          <div v-show="!hasHistory && header.costPriceAuditByName">
            成本价审核人：
            <div class="text-font">
              {{ header.costPriceAuditByName }}（{{
                formatter(header.costPriceAuditAt)
              }}）
            </div>
          </div>
          <div v-show="header.financialAuditName">
            财务审核人：
            <div class="text-font">
              {{ header.financialAuditName }}（{{
                formatter(header.financialAuditAt)
              }}）
            </div>
          </div>
        </div>
      </div>
    </div>
    <search-box
      :visible.sync="searchVisible"
      :cooperator="{
        cooperatorId: header.cooperatorId,
        cooperatorName: header.cooperatorName
      }"
      :companyId="companyId"
      @on-search="handleSearchParts"
    />
    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :isLogistics="isLogistics"
      :companyId="companyId"
      @settleSuccess="handleSettleRes"
    />
    <EditDetailBox
      :visible.sync="editDetailBoxVisible"
      :partData="infoForm"
      :header="header"
      :isEdit="isEdit"
      :companyId="companyId"
      @sure="searchAddSalesReturnHandle"
    />
    <export-table
      :base-columns="baseDetailsColumns"
      :default-data="detailTableData"
      :file-name="`销售退货订单-${header.billNo}`"
      :table-name="detailsName"
      :visible.sync="exportTableVisible"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <AuditCostBox
      :visible.sync="auditCostBoxVisible"
      :details="detailTableData"
      :billId="billId"
      @success="handleAuditCostSuccess"
    />
    <HandleRigisterBox
      :visible.sync="showHandleRigisterBox"
      :rule-data="ruleData"
      :is-receive="true"
      :canSettle="canSettle"
      :hasBillInfo="hasBillInfo"
      :register-id="registerId"
      :is-confirm="false"
      :billId="billId || 0"
      :is-settle-confirm="true"
      @on-sure="handleRigisterSure"
    />
  </section>
</template>
<script>
import PartsInfoSearch from "@/components/partsInfoSearch";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import HasHistoryTable from "./components/hasHistoryTable";
import NoHistoryTable from "./components/noHistoryTable";
import HeaderForm from "./components/headerForm";
import EditDetailBox from "./dialog/EditDetailBox";
import AuditCostBox from "./dialog/AuditCostBox";
import ResizeBox from "@/components/resizeBox";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import { SettleDialog } from "@/components/business";
import {
  addSalesReturnDetails,
  createSalesReturnDetails,
  deleteSalesReturnBills,
  deleteSalesReturnDetails,
  returnSalesReturnBills,
  returnSalesReturnHeadersBills,
  salesReturnBillCancel,
  salesReturnBillSubmit,
  salesReturnDetails,
  salesReturnSearchHasHistoryParts,
  salesReturnSearchNoHistoryParts,
  updateSalesReturnDetailsRow,
  shareFreight
} from "@/api/sales/salesReturn";
import { SALES_RETURN_STATUS } from "@/constants/states/sales";
import { dateFormat, dateFormatFull } from "@/utils/date";
import { mapState } from "vuex";
import {
  baseDataMixin,
  precisionsFixed,
  setTotals,
  freightSettleMixin
} from "@/mixins";
import { reduce } from "lodash";
import { ExportTable } from "@/components/table";
import hotkeys from "hotkeys-js";
import SearchBox from "./dialog/SearchBox";
import { commonValidator } from "../mixin";
import { TABLE_SALES_RETURN_DETAIL } from "../constants";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { add } from "@/utils/numberAPI";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";
import HandleRigisterBox from "@/components/register";

const TYPE = "XT";
const DETAIL = "detail";
const HAS_HIST = "hasHist";
const NO_HIST = "noHist";
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
  freightPayer: "自付",
  transportMethod: "",
  packMethod: "",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  belongs: [],
  companyId: 0
};

export default {
  name: "SalesReturnBilling",
  components: {
    HasHistoryTable,
    NoHistoryTable,
    HeaderForm,
    ResizeBox,
    SearchBox,
    SettleDialog,
    EditDetailBox,
    ExportTable,
    AvaVehModels,
    PartsDetailBox,
    AuditCostBox,
    VideoPopover,
    HandleRigisterBox
  },
  mixins: [
    commonValidator,
    precisionsFixed,
    setTotals,
    baseDataMixin,
    freightSettleMixin
  ],
  inject: ["reload"],
  data() {
    return {
      keyScopes: {
        search: Symbol("salesReturnSearch"),
        localTable: Symbol("salesReturnLocalTable"),
        partTable: Symbol("salesReturnTable"),
        form: Symbol("salesReturnFrom"),
        noPartTable: Symbol("salesReturnNoHistroy")
      },
      showHandleRigisterBox: false,
      ruleData: {},
      registerId: "",
      searchVisible: false,
      settleDialogVisible: false,
      editDetailBoxVisible: false,
      auditCostBoxVisible: false,
      header: {
        ...defaultHeader
      },
      isScrollToEnd: false,
      currentPage: 1,
      receiverAreaIds: [],
      importExcelVisible: false,
      hasHistoryTableData: [],
      hasHistoryTotalSize: 0,
      selectedHasHistoryRows: [],
      selectedNoHistoryRows: [],
      noHistoryTableData: [],
      noHistoryTotalSize: 0,
      detailTableData: [],
      selectedDetailRows: [],
      searchPartsParams: {},
      infoForm: {},
      isEdit: false,
      settleData: {},
      settleList: [],
      headerInfo: undefined,
      hasHistory: true,
      partsInfo: {},
      isEasyCreate: false,
      isCanEditFlag: true,
      exportTableVisible: false,
      detailsName: TABLE_SALES_RETURN_DETAIL.name,
      baseDetailsColumns: TABLE_SALES_RETURN_DETAIL.columns,
      billId: null,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      partDetailBoxVisible: false,
      partId: null,
      isCollapse: false,
      loading: false,
      detailSort: "",
      hasHistorySort: "",
      noHistorySort: "",
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_sale_return.mp4",
      videoPopoverRemark:
        "销售退货页面，用于记录销售退货开单、结算入库，支持有销售历史退货和无销售历史退货。"
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    canRigister() {
      return (
        [99].includes(this.header.status) &&
        this.hasPerm("storage.logisticsRegistration.receive.read") &&
        this.detailTableData.length > 0 &&
        (this.header.enhancedSettlementType === "物流代收" ||
          this.header.pickMethod === "发货")
      );
    },
    isShareFreight() {
      return (
        this.detailTableData &&
        this.detailTableData.length &&
        this.detailTableData[0].freight > 0
      );
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function editDetailHandle(row, e) {
        e.stopPropagation();
        self.addSalesOutOrder(row, "edit");
      }
      function deleteDetailHandle(row, index, e) {
        e.stopPropagation();
        self.deleteDetailHandle(row, index);
      }

      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.baseDetailsColumns
        .filter(item => this.canEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row, index) => (
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
                      on-click={e => deleteDetailHandle(row, index, e)}
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
    billStatus() {
      return SALES_RETURN_STATUS[this.header.status] || "";
    },
    canShowPartDetailBox() {
      return (
        (this.hasHistory
          ? this.selectedHasHistoryRows.length
          : this.selectedNoHistoryRows.length) || this.selectedDetailRows.length
      );
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        this.header.status === 1 &&
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
        this.header.status === 1 &&
        this.hasBelongsPerm("delete", this.header.belongs)
      );
    },
    canSubmit() {
      return (
        this.header.status === 1 &&
        this.hasBelongsPerm("submit", this.header.belongs)
      );
    },
    canRecall() {
      return (
        [2, 4, 5, 6, 7].includes(this.header.status) &&
        !this.header.costPriceAuditAt &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canSettleStockIn() {
      return (
        !this.header.financialAuditAt &&
        [5, 6].includes(this.header.status) &&
        this.hasBelongsPerm("settleStockIn", this.header.belongs)
      );
    },
    canAuditCost() {
      return (
        this.header.status === 7 &&
        this.hasBelongsPerm("costPriceAudit", this.header.belongs)
      );
    },
    canExport() {
      return (
        this.detailTableData.length &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canPrint() {
      return (
        this.detailTableData.length &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    canShare() {
      return (
        this.hasBelongsPermWithoutRoute(
          "update",
          "sales.returns",
          this.header.belongs
        ) &&
        this.header.freightPayer == "自付" &&
        this.header.canShareFreight
      );
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(
          this.detailTableData,
          (sum, item) => add(sum, Number(item.bookQty)),
          0
        ),
        "qty"
      );
    },
    hasBussinessManPer() {
      if (
        this.header.businessManId &&
        this.hasBelongsPerm("update", this.header.belongs)
      ) {
        return true;
      } else {
        return false;
      }
    },
    isSalesHistory: {
      get: function() {
        const _item = this.detailTableData.find(
          item => item.saleDetailId !== 0
        );
        return _item ? true : false;
      },
      set: function(value) {
        return value;
      }
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    }
  },
  watch: {
    companyId() {
      this.hasHistoryTableData = [];
      this.noHistoryTableData = [];
    },
    billId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    },
    settleDialogVisible(e) {
      if (!e) {
        this.resSalesReturnDetails();
      }
    },
    selectedHasHistoryRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
      }
    },
    selectedNoHistoryRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
      }
    },
    selectedDetailRows(rows) {
      if (rows && rows.length) {
        this.partId = rows[0].partId;
      }
    }
  },
  mounted() {
    this.bindSwitchScope();
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
          resetedActiveTab="Sales"
          type="sale"
          header={this.header}
        />
      )
    });
    if (this.$route.query.billId) {
      this.billId = Number(this.$route.query.billId);
      this.resSalesReturnDetails();
    } else {
      this.billId = null;
      if (this.hasHistoryTableData.length || this.noHistoryTableData.length) {
        this.selectedHasHistoryRows = this.hasHistory
          ? this.hasHistoryTableData.length
            ? [this.hasHistoryTableData[0]]
            : []
          : [];
        this.selectedNoHistoryRows = this.hasHistory
          ? []
          : this.noHistoryTableData.length
          ? [this.noHistoryTableData[0]]
          : [];
        this.setKeyScope(this.keyScopes.partTable);
      } else {
        hotkeys.setScope(this.keyScopes.form);
        this.$nextTick(() => {
          this.$refs.salesReturnForm.updateFocusData({
            initial: "focus-cooperatorId"
          });
        });
      }
      this.$nextTick(() => {
        this.$refs.salesReturnForm.clearValidate();
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
    hotkeys.deleteScope(this.keyScopes.search);
    hotkeys.deleteScope(this.keyScopes.localTable);
    hotkeys.deleteScope(this.keyScopes.partTable);
    hotkeys.deleteScope(this.keyScopes.form);
    hotkeys.deleteScope(this.keyScopes.noPartTable);
  },
  methods: {
    rigisterBoxHandle() {
      console.log(this.detailTableData);
      let qty = 0;
      this.detailTableData.forEach(item => {
        qty += parseInt(item.bookQty);
      });
      this.header = {
        ...this.header,
        qty
      };
      this.getRegisterDetail({
        billId: this.billId,
        billType: "XT",
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
      //     id: this.header.id,
      //     freight: billInfo.freight
      //   });
      // } else {
      //   this.resSalesReturnDetails();
      // }
      this.resSalesReturnDetails();
      const hasSettlePerm =
        this.hasPerm("storage.logisticsRegistration.send.settle") &&
        this.hasPerm("financials.settlements");
      if (billInfo.payer > 0 && hasSettlePerm) {
        this.settle({
          billId: this.billId,
          billType: "XT",
          billNo: this.header.billNo
        });
      }
    },
    shareFreight() {
      shareFreight({
        id: this.header.id,
        freight: this.header.freight
      }).then(() => {
        this.resSalesReturnDetails();
      });
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date(), "YYYY-MM-DD");
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
        case "Insert":
        case "Digit0":
        case "Numpad0":
          this.searchVisible = true;
          break;
        case "F7":
          this.settleHandle();
          this.auditCostHandle();
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
          if (e.altKey) {
            this.exportHandle();
          }
      }
    },
    bindSwitchScope() {
      hotkeys("alt+down", { scope: this.keyScopes.partTable }, e => {
        switch (e.code) {
          case "ArrowDown":
            if (e.altKey) {
              e.preventDefault();
              if (this.detailTableData.length) {
                this.setKeyScope(this.keyScopes.localTable);
                this.selectedDetailRows = this.detailTableData.length
                  ? [this.detailTableData[0]]
                  : [];
                this.selectedNoHistoryRows = [];
                this.selectedHasHistoryRows = [];
              }
            }
            break;
        }
      });
      hotkeys("f2, insert, 0, f5, alt+i", { scope: this.keyScopes.form }, e => {
        switch (e.code) {
          case "F2":
            this.createHandle();
            break;
          case "Insert":
          case "Digit0":
          case "Numpad0":
            this.searchVisible = true;
            break;
          case "KeyI":
            if (this.showImport) {
              if (e.altKey) this.importVisible = true;
            }
            break;
        }
      });
      hotkeys("alt+up", { scope: this.keyScopes.localTable }, e => {
        switch (e.code) {
          case "ArrowUp":
            if (e.altKey) {
              e.preventDefault();
              if (
                this.hasHistoryTableData.length ||
                this.noHistoryTableData.length
              ) {
                this.setKeyScope(this.keyScopes.partTable);
                this.selectedHasHistoryRows = this.hasHistory
                  ? this.hasHistoryTableData.length
                    ? [this.hasHistoryTableData[0]]
                    : []
                  : [];
                this.selectedNoHistoryRows = this.hasHistory
                  ? []
                  : this.noHistoryTableData.length
                  ? [this.noHistoryTableData[0]]
                  : [];
                this.selectedDetailRows = [];
              }
            }
            break;
        }
      });
    },
    formatter(val) {
      return dateFormatFull(val);
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    backMainList() {
      this.$router.push({ path: "/SalesReturnList" });
    },
    loadPartsList(params) {
      if (this.hasHistory) {
        return salesReturnSearchHasHistoryParts({
          ...params,
          page: this.currentPage,
          pageSize: this.pageSize,
          sort: this.hasHistorySort
        }).then(data => {
          this.hasHistoryTableData = data.rows || [];
          this.hasHistoryTotalSize = data.totalSize;
          this.selectedHasHistoryRows = data.totalSize ? [data.rows[0]] : [];
          this.setKeyScope(this.keyScopes.partTable);
          this.selectedDetailRows = [];
          this.selectedNoHistoryRows = [];
        });
      } else {
        return salesReturnSearchNoHistoryParts({
          ...params,
          page: this.currentPage,
          pageSize: this.pageSize,
          sort: this.noHistorySort
        }).then(data => {
          this.noHistoryTableData = data.rows || [];
          this.noHistoryTotalSize = data.totalSize;
          this.selectedNoHistoryRows = data.totalSize ? [data.rows[0]] : [];
          this.setKeyScope(this.keyScopes.partTable);
          this.selectedDetailRows = [];
          this.selectedHasHistoryRows = [];
        });
      }
    },
    handleSearchParts(params) {
      if (!this.header.id) {
        this.header = {
          ...this.header,
          cooperatorId: params.cooperatorId,
          cooperatorName: params.cooperatorName
        };
      }
      this.hasHistory = params.hasHistory;
      this.searchPartsParams = { ...params };
      this.currentPage = 1;
      this.loadPartsList(params);
    },
    initReloadPartsList() {
      this.loadPartsList(this.searchPartsParams);
    },
    handleHasHistorySortChange(sort) {
      if (!this.hasHistoryTableData.length) {
        return;
      }
      this.hasHistorySort = setTableSort(sort);
      setLocalTableSort(this.hasHistorySort, `${TYPE}${HAS_HIST}`);
      this.hasHistoryPageChange(1);
    },
    hasHistoryPageChange(page) {
      this.currentPage = page;
      return this.loadPartsList(this.searchPartsParams);
    },
    handleNoHistorySortChange(sort) {
      if (!this.noHistoryTableData.length) {
        return;
      }
      this.noHistorySort = setTableSort(sort);
      setLocalTableSort(this.noHistorySort, `${TYPE}${NO_HIST}`);
      this.noHistoryPageChange(1);
    },
    noHistoryPageChange(page) {
      this.currentPage = page;
      return this.loadPartsList(this.searchPartsParams);
    },
    handerHeaderChange() {
      this.resSalesReturnDetails();
    },
    resSalesReturnDetails() {
      this.loading = true;
      return salesReturnDetails(this.billId, this.detailSort)
        .then(data => {
          this.header = data.header;
          this.detailTableData = data.rows || [];
          if (
            (this.hasHistoryTableData.length && !this.isEdit) ||
            (this.noHistoryTableData.length && !this.isEdit)
          ) {
            this.setKeyScope(this.keyScopes.partTable);
          } else {
            this.setKeyScope(this.keyScopes.localTable);
            this.selectedDetailRows =
              data.rows && data.rows.length ? [data.rows[0]] : [];
          }
          this.$nextTick(() => {
            this.isScrollToEnd = false;
            this.$refs.salesReturnForm.clearValidate();
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDetailSortChange(sort) {
      if (!this.detailTableData.length) {
        return;
      }
      this.detailSort = setTableSort(sort);
      setLocalTableSort(this.detailSort, `${TYPE}${DETAIL}`);
      this.resSalesReturnDetails();
    },
    handleEditSalesOutOrder(row) {
      this.addSalesOutOrder(row, "edit");
    },
    addSalesOutOrder(row, type) {
      if (!this.canEdit) return;
      if (type === "edit") {
        if (!this.isCanEditFlag) return;
      }
      if (!this.hasHistory && !this.$refs.salesReturnForm.getFormValidate()) {
        this.partsInfo = { ...row };
        this.isEasyCreate = false;
        this.$nextTick(() => {
          this.isEasyCreate = true;
          this.$refs.salesReturnForm.updateFocusData({
            initial: "focus-cooperatorId"
          });
        });
        return;
      }
      let flag = true,
        defaultParams,
        rowData;
      this.headerInfo = this.hasHistory
        ? {
            cooperatorId: row.cooperatorId,
            cooperatorName: row.cooperatorName,
            contactName: row.contactName,
            businessManId: row.businessManId,
            businessManName: row.businessManName,
            groupName: row.groupName,
            contactPhone: row.contactPhone,
            settlementType: row.settlementType,
            enhancedSettlementType: row.enhancedSettlementType,
            invoiceType: row.invoiceType,
            taxRate: row.taxRate,
            pickMethod: row.pickMethod,
            packMethod: row.packMethod,
            transportMethod: row.transportMethod,
            logisticsCompanyId: row.logisticsCompanyId,
            receiverAddress: row.receiverAddress,
            receiverName: row.receiverName,
            receiverPhone: row.receiverPhone
          }
        : undefined;
      if (
        this.billId &&
        this.header.taxRate &&
        Number(this.header.taxRate) !== Number(row.taxRate) &&
        this.hasHistory &&
        type !== "edit"
      ) {
        this.$message.warning({
          message: "请选择和单头税率一致的单据",
          showClose: true
        });
        return;
      }
      if (!this.hasHistory) {
        flag = this.$refs.salesReturnForm.getFormValidate();
        if (flag) {
          if (this.isSalesHistory) {
            defaultParams = {
              ...row,
              taxRate: this.header.taxRate,
              invoiceType: this.header.invoiceType,
              cooperatorName: this.header.cooperatorName
            };
          } else {
            defaultParams = {
              ...this.header,
              ...row,
              taxRate: this.header.taxRate,
              invoiceType: this.header.invoiceType,
              cooperatorName: this.header.cooperatorName
            };
          }
        }
        rowData = defaultParams;
      } else {
        rowData = { ...row };
      }
      if (!flag) return;
      if (type === "add") {
        delete rowData.bookQty;
      }
      if (
        this.billId &&
        rowData.cooperatorId != this.header.cooperatorId &&
        this.header.cooperatorId &&
        this.hasHistory &&
        type !== "edit"
      ) {
        this.$message.warning({
          message: "退单单据客户与选择客户名名称不一致"
        });
        return;
      }
      this.isEdit = type === "edit";
      if (type === "add") {
        this.infoForm = {
          ...rowData,
          saleDetailId: rowData.detailId,
          isHasHistory: this.hasHistory
        };
        this.editDetailBoxVisible = true;
      }
      if (type === "edit") {
        this.infoForm = {
          ...this.header,
          ...rowData,
          isHasHistory: !!rowData.saleBillId,
          returnDetailId: rowData.id
        };
        this.editDetailBoxVisible = true;
      }
    },
    handleCreateSaleBill(flag) {
      if (flag) this.addSalesOutOrder(this.partsInfo, "add");
    },
    deleteDetailHandle(row) {
      if (!this.canEdit) return;
      let tips = "";
      this.isCanEditFlag = false;
      if (this.detailTableData.length < 2) {
        tips = "该单据只有一条明细，删除后单据也将删除，确定继续删除？";
      } else {
        tips = "确定要删除该条单据明细？";
      }
      this.$confirm(tips, {
        type: "warning"
      })
        .then(() => {
          if (this.detailTableData.length === 1 && !this.canDelete) {
            this.$message.error({
              message: "您没有权限删除该单据",
              showClose: true
            });
          } else {
            const ids = [];
            ids.push(row.id);
            deleteSalesReturnDetails({ ids: ids }, row.billId)
              .then(() => {
                this.detailTableData = this.detailTableData.filter(
                  item => item.id != row.id
                );
                this.$message({
                  type: "success",
                  message: `配件 ${row.name}（${row.code}） 删除成功！`,
                  showClose: true
                });
                if (this.detailTableData.length === 0) {
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
                    this.detailTableData[this.detailTableData.length - 1]
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
    searchAddSalesReturnHandle(value) {
      const params = {
        billId: value.billId,
        saleDetailId: value.saleDetailId,
        returnDetailId: value.returnDetailId,
        partId: value.partId,
        ownerCompanyId: value.ownerCompanyId,
        warehouseId: value.warehouseId,
        positionId: value.positionId,
        property: value.property,
        bookQty: value.bookQty || 0,
        taxedPrice: value.taxedPrice || 0,
        billPrice: value.billPrice || 0,
        taxedAmount: value.taxedAmount || 0,
        billAmount: value.billAmount || 0,
        untaxedPrice: value.untaxedPrice || 0,
        untaxedAmount: value.untaxedAmount || 0,
        taxAmount: value.taxAmount || 0,
        commissionId: value.commissionId,
        reason: value.reason,
        remark: value.remark
      };
      if (this.isEdit) {
        this.updateSalesReturnBill(params);
      } else {
        if (this.header.billNo) {
          this.addSalesReturnBill(params);
        } else {
          this.createSalesReturnBill(params);
        }
      }
    },
    addSalesReturnBill(row) {
      addSalesReturnDetails({ ...row, billId: this.billId })
        .then(() => {
          this.$message.success({ message: "新增明细成功" });
          this.resSalesReturnDetails().then(() => {
            this.selectedRows = [
              this.detailTableData[this.detailTableData.length - 1]
            ];
            this.$nextTick(() => {
              this.isScrollToEnd = true;
            });
          });
          this.initReloadPartsList();
        })
        .catch(() => {});
    },
    createSalesReturnBill(row) {
      const params = {
        bill: {
          ...this.header,
          ...this.headerInfo
        },
        detail: row
      };
      createSalesReturnDetails(params)
        .then(data => {
          this.$message.success({ message: "开单成功" });
          this.$router.replace({
            path: "/SalesReturnBilling",
            query: { billId: data.detail.billId }
          });
          this.billId = data.detail.billId;
          this.resSalesReturnDetails();
          this.initReloadPartsList();
        })
        .catch(() => {});
    },
    updateSalesReturnBill(row) {
      updateSalesReturnDetailsRow(row, row.returnDetailId)
        .then(() => {
          this.$message.success({ message: "更新成功" });
          this.resSalesReturnDetails();
        })
        .catch(() => {});
    },
    setDefaultData() {
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.detailTableData = [];
    },
    createHandle() {
      if (!this.canCreate) {
        return;
      }
      if (this.billId) {
        this.$router.replace("/SalesReturnBilling");
      }
      this.billId = null;
      this.header = { ...defaultHeader };
      this.registerId = "";
      this.setDefaultData();
      hotkeys.setScope(this.keyScopes.form);
      this.$nextTick(() => {
        this.$refs.salesReturnForm.updateFocusData({
          initial: "focus-cooperatorId"
        });
        this.$refs.salesReturnForm.clearValidate();
      });
    },
    deleteHandle() {
      if (!this.canDelete) {
        return;
      }
      this.setKeyScope(this.keyScopes.form);
      this.$confirm("确认删除此单据吗？", {
        type: "warning"
      }).then(() => {
        deleteSalesReturnBills(this.billId).then(() => {
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
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Return/" + this.billId
        }).href,
        "print"
      );
    },
    exportHandle() {
      if (!this.canExport) {
        return;
      }
      this.exportTableVisible = true;
    },
    settleHandle() {
      if (!this.canSettleStockIn) {
        return;
      }
      this.settleData = {
        id: this.header.id,
        billType: this.header.billType,
        billNo: this.header.billNo,
        cooperatorId: this.header.cooperatorId,
        enhancedSettlementType: this.header.enhancedSettlementType,
        invoiceType: this.header.invoiceType,
        amount: this.header.settleAmount
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
          content: this.header.billAmount
        },
        {
          name: "实际金额",
          content: this.header.taxedAmount
        },
        {
          name: "佣金",
          content: this.header.brokerageAmount
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
    handleSettleRes(value) {
      this.settleDialogVisible = false;
      if (value) {
        this.resSalesReturnDetails();
      }
    },
    handleReturnBill(row) {
      if (this.billId) {
        if (
          this.header.cooperatorId != row.cooperatorId &&
          this.header.cooperatorId
        ) {
          this.$message.warning({
            message: "退单单据客户与选择客户名名称不一致"
          });
          return;
        }
        if (
          this.header.taxRate &&
          Number(this.header.taxRate) !== Number(row.taxRate)
        ) {
          this.$message.warning({
            message: "请选择和单头税率一致的单据",
            showClose: true
          });
          return;
        }
      }
      this.$confirm("确认整单退吗？", {
        type: "warning"
      }).then(() => {
        if (this.billId) {
          returnSalesReturnHeadersBills(
            { saleId: row.billId },
            this.billId
          ).then(() => {
            this.$message.success({
              message: "整单退单成功"
            });
            this.resSalesReturnDetails();
            this.initReloadPartsList();
          });
        } else {
          this.header = {
            ...this.header,
            cooperatorId: row.cooperatorId,
            cooperatorName: row.cooperatorName,
            contactName: row.contactName,
            businessManId: row.businessManId,
            businessManName: row.businessManName,
            groupName: row.groupName,
            contactPhone: row.contactPhone,
            settlementType: row.settlementType,
            enhancedSettlementType: row.enhancedSettlementType,
            invoiceType: row.invoiceType,
            taxRate: row.taxRate,
            pickMethod: row.pickMethod,
            packMethod: row.packMethod,
            transportMethod: row.transportMethod,
            logisticsCompanyId: row.logisticsCompanyId,
            receiverAddress: row.receiverAddress,
            receiverName: row.receiverName,
            receiverPhone: row.receiverPhone
          };
          this.receiverAreaIds = row.receiverAreaIds;
          this.$nextTick(() => {
            if (this.$refs.salesReturnForm.getFormValidate()) {
              returnSalesReturnBills({
                bill: { ...this.header },
                saleId: row.billId
              }).then(data => {
                this.$message.success({
                  message: "整单退单成功"
                });
                this.$router.replace({
                  path: "/SalesReturnBilling",
                  query: { billId: data.bill.id }
                });
                this.billId = data.bill.id;
                this.resSalesReturnDetails();
                this.initReloadPartsList();
              });
            }
          });
        }
      });
    },
    submitHandle() {
      if (!this.canSubmit) {
        return;
      }
      if (this.$refs.salesReturnForm.getFormValidate()) {
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
                this.$refs.salesReturnForm &&
                  this.$refs.salesReturnForm.updateFocusData({
                    initial: "focus-logisticsCompanyId"
                  });
              }, 200);
            })
            .catch(() => {
              return salesReturnBillSubmit(this.billId).then(() => {
                this.$message.success({ message: "提交成功" });
                this.resSalesReturnDetails();
              });
            });
        } else {
          return salesReturnBillSubmit(this.billId).then(() => {
            this.$message.success({ message: "提交成功" });
            this.resSalesReturnDetails();
          });
        }
      }
    },
    recallHandle() {
      if (!this.canRecall) {
        return;
      }
      salesReturnBillCancel(this.billId).then(() => {
        this.$message.success({ message: "撤回成功" });
        this.resSalesReturnDetails();
      });
    },
    auditCostHandle() {
      if (!this.canAuditCost) {
        return;
      }
      this.auditCostBoxVisible = true;
    },
    handleAuditCostSuccess() {
      this.resSalesReturnDetails();
    },
    handlePartEdit(row) {
      this.addSalesOutOrder(row, "add");
    },
    handlePartNoHistoryEdit(row) {
      this.addSalesOutOrder(row, "add");
    },
    handleDetailsEdit(row) {
      this.addSalesOutOrder(row, "edit");
    }
  }
};
</script>
