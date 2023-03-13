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
        <el-button type="primary" size="mini" @click="searchPartsDialog">
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
        <el-checkbox
          v-loading="loading"
          :disabled="loading"
          v-model="filterZero"
          style="margin-left: 10px;"
        >
          过滤零库存（Alt+O）
        </el-checkbox>
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
          <parts-table
            ref="partTable"
            :search-info="searchInfo"
            :key-scope="keyScopes.partTable"
            :canAdd="canEdit"
            :isPlatform="isPlatform"
            :isSalesBilling="true"
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
                :disabled="!canDepositAudit"
                type="primary"
                size="mini"
                @click="depositAuditHandle"
              >
                定金审核（F7）
              </el-button>
              <el-button
                :disabled="!canAudit"
                type="primary"
                size="mini"
                @click="auditHandle"
              >
                审核（F7）
              </el-button>
              <el-button
                :disabled="!canCancel"
                type="primary"
                size="mini"
                @click="cancelHandle"
              >
                配件取消
              </el-button>
              <el-button
                :disabled="!canTransfer"
                type="primary"
                size="mini"
                @click="transferHandle"
              >
                转销售出库（F8）
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
                :disabled="!canImport"
                type="primary"
                size="mini"
                @click="importHandle"
              >
                导入（Alt+I）
              </el-button>
              <el-button
                :disabled="!canPrint"
                type="primary"
                size="mini"
                @click="printHandle"
              >
                打印（F11）
              </el-button>
            </div>
            <ht-card style="margin: 5px 0 0 0;">
              <header-form
                ref="headerFrom"
                :header.sync="header"
                :key-scope="keyScopes.form"
                :disabled="!canEdit"
                :is-auto-focus="canEdit && !header.billNo"
                :can-edit="canEdit && !detailsLoading"
                :isCollapse.sync="isCollapse"
                :statusTxt="statusTxt"
                :detailHasCoop="hasCoop"
                :tips="tips"
                @click.native="handleSetKeyScopeForm"
                @reloadDetailTable="loadBill"
                @handleCreateSaleBill="handleCreateSaleBill"
              />
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <detail-table
                :key-scope="keyScopes.localTable"
                :schedule-data="detailsTableData"
                :selected-rows="selectedRows"
                :scroll-to-end="isScrollToEnd"
                :bill-no="header.billNo"
                :export-table-visible.sync="exportTableVisible"
                :show-handle="canEdit"
                @editHandle="editHandle"
                @deleteHandle="deleteDetailHandle"
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
            <div class="amount-font">{{ detailsTableData.length }}</div>
          </div>
          <div>
            总数量：
            <div class="amount-font">{{ totoalQty }}</div>
          </div>
          <div>
            合计应收：
            <div class="amount-font">{{ totoalAmount }}</div>
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

    <import-box
      :visible.sync="importVisible"
      :has-setting="importInfo.hasSetting"
      :options="importInfo.options"
      :req-handler="importSalseOrders"
      title="客户订单明细导入"
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
          <el-form-item label="指定客户" label-width="71px" prop="cooperatorId">
            <CooperatorsSelect
              v-model="importInfo.cooperatorId"
              v-delay-focus="importVisible"
              :allow-create="
                hasCompletePerm('basics.cooperators.createCustomer')
              "
              no-data-tips="没有查询到客户,回车新增"
              type="customer"
            />
          </el-form-item>
          <el-form-item label-width="175px" label="自动创建不存在的配件资料">
            <el-switch v-model="importInfo.createPartsIfNotExist" />
          </el-form-item>
        </el-form>
      </template>
    </import-box>

    <EditDetailBox
      ref="editDetailBox"
      :visible.sync="editDetailBoxVisible"
      :header="header"
      :partData="detailInfo"
      :companyId="companyId"
      :searchParams="searchParams"
      :isPlatform="isPlatform"
      :isEdit="isEdit"
      @sure="addDetail"
    />
    <check-bill
      :visible.sync="checkBillVisible"
      :billId="header.id || 0"
      :type="auditType"
      @on-complete="handleCheckComplete"
    />
    <search-parts
      :visible.sync="searchPartsVisible"
      :companyId="companyId"
      :type="TYPE"
      @searchParamsChange="searchParamsChange"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canEdit"
      :partData="partSwapData"
      :searchInfo="searchInfo"
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
    <CancelBox
      :visible.sync="cancelBoxVisible"
      :headerData="{ ...header, statusTxt: statusTxt, tips: tips }"
      :totalData="detailsTableData"
      @success="handleCancelSuccess"
    />
    <TransferBox
      :visible.sync="transferBoxVisible"
      :headerData="{ ...header, statusTxt: statusTxt, tips: tips }"
      :totalData="detailsTableData"
      :mapData="mapData"
      :companyId="companyId"
      @success="handleTransferSuccess"
    />
    <AuditBox
      :visible.sync="auditBoxVisible"
      :headerData="billHeader"
      :billId="this.billId || 0"
      :totalData="billDetails"
      @success="handleCancelSuccess"
    />
  </section>
</template>

<script>
import PartsInfoSearch from "@/components/partsInfoSearch";
import { CooperatorsSelect } from "@/components/select";
import detailTable from "./components/detailTable";
import headerForm from "./components/headerForm";
import { PartSwapBox, PartsTable, SearchParts } from "../components";
import { CheckBill, EditDetailBox } from "./dialog";
import {
  addNewSalesBill,
  createNewSalesBill,
  deleteSalesBill,
  deleteSalesBillDeatil,
  editSalesBillDeatil,
  resSalesBillDeatils,
  salesBillCancelSubmit,
  salesBillSubmit
} from "@/api/sales/salesHome";
import { dateFormat, dateFormatFull } from "@/utils/date";
import eventBus from "@/event";
import ImportBox from "@/components/importBox";
import { reqImportSalseOrders } from "@/api/importBox";
import { salesOrderOptions } from "@/components/importBox/options";
import resizeBox from "@/components/resizeBox";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import { precisionsFixed, searchMixin, validCreditLine } from "@/mixins";
import { reduce } from "lodash";
import hotkeys from "hotkeys-js";
import BillMapConfirm from "@/components/bill-map-confirm";
import { mapState } from "vuex";
import {
  openNewWindow,
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import { add } from "@/utils/numberAPI";
import { SALES_ORDER_STATUS } from "@/constants/states/sales";
import CancelBox from "../components/CancelBox";
import TransferBox from "../components/TransferBox";
import AuditBox from "../components/AuditBox";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsPartDetail
} from "@/api/base/base";
import * as store from "@/utils/store";
import RequestQQ from "@/api/qq";
const TYPE = "XD";
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
  receiverAreaIds: [],
  receiverAddress: "",
  arrivalDate: null,
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "",
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  plateNumber: "",
  belongs: [],
  createPartsIfNotExist: false,
  companyId: 0
};
const defaultImportInfo = {
  options: salesOrderOptions,
  hasSetting: true,
  cooperatorId: null,
  createPartsIfNotExist: false
};

export default {
  name: "SelesBilling",
  components: {
    resizeBox,
    PartsTable,
    headerForm,
    EditDetailBox,
    CheckBill,
    ImportBox,
    SearchParts,
    PartSwapBox,
    detailTable,
    CooperatorsSelect,
    PartsDetailBox,
    StorageStocksLockedDialog,
    CancelBox,
    TransferBox,
    AuditBox
  },
  mixins: [precisionsFixed, validCreditLine, searchMixin],
  data() {
    return {
      keyScopes: {
        localTable: Symbol("salesLocalTable"),
        partTable: Symbol("salesPartTable"),
        form: Symbol("salesFrom"),
        confirmDelete: Symbol("confirmDelete")
      },
      billId: null,
      detailsLoading: false,
      header: {
        ...defaultHeader
      },
      receiverForm: null,
      isScrollToEnd: false,
      detailsTableData: [],
      searchInfo: {
        cooperatorId: null
      },
      detailInfo: {},
      selectRow: {},
      editDetailBoxVisible: false,
      checkBillVisible: false,
      importVisible: false,
      importRules: {
        cooperatorId: [
          { required: true, message: "请选择客户", trigger: "change" }
        ]
      },
      importInfo: { ...defaultImportInfo },
      searchPartsVisible: false,
      partDetailBoxVisible: false,
      partId: null,
      partTableFocusFlag: false,
      selectedRows: [],
      selectParts: [],
      isCanEditFlag: true,
      isEdit: false,
      exportTableVisible: false,
      partSwapData: {},
      partSwapBoxVisible: false,
      isCollapse: false,
      storageStocksLockedVisible: false,
      stockFilter: {},
      searchParams: null,
      filterZero: true,
      cancelBoxVisible: false,
      transferBoxVisible: false,
      mapData: {},
      TYPE,
      loading: false,
      sort: "",
      auditBoxVisible: false,
      getBillDataLoading: false,
      billHeader: {},
      billDetails: []
    };
  },
  computed: {
    ...mapState("admin", {
      userInfoMsg: state => state.user.userInfoMsg,
      autoSubmitWhenClose: state =>
        state.systemParams.params.autoSubmitWhenClose
    }),
    statusTxt() {
      return SALES_ORDER_STATUS[this.header.status] || "";
    },
    tips() {
      let tips = "";
      if (this.header.platformKey === "007") {
        if ([2, 11].includes(this.header.status)) {
          tips = `（${this.header.platformName}平台订单转销售出库单后才可编辑）`;
        }
      } else if (this.header.platformKey) {
        if (this.header.status === 3) {
          tips = `（${this.header.platformName}平台订单，待买家付款后，前往平台进行订单审核）`;
        }
      }
      if (this.header.status === 4) {
        tips = "（请前往销售开单，完成销售出库单流程）";
      }
      return tips;
    },
    isPlatform() {
      return !!this.header.platformKey;
    },
    canShowPartDetailBox() {
      return this.selectParts.length || this.selectedRows.length;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        [1, 90].includes(this.header.status) &&
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
        [1, 90].includes(this.header.status) &&
        this.hasBelongsPerm("delete", this.header.belongs)
      );
    },
    canSubmit() {
      return (
        [1, 90].includes(this.header.status) &&
        this.hasBelongsPerm("submit", this.header.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        [2, 3, 94].includes(this.header.status) &&
        this.hasBelongsPerm("submitRecall", this.header.belongs)
      );
    },
    canAudit() {
      return (
        this.header.status === 2 &&
        this.hasBelongsPerm("audit", this.header.belongs)
      );
    },
    canDepositAudit() {
      return (
        this.header.status === 94 &&
        this.hasBelongsPerm("depositAudit", this.header.belongs)
      );
    },
    canCancel() {
      return (
        [2, 4].includes(this.header.status) &&
        Number(this.header.onTransSaleQty || 0) > 0 &&
        this.hasBelongsPerm("cancel", this.header.belongs)
      );
    },
    canTransfer() {
      return (
        this.header.status === 4 &&
        Number(this.header.onTransSaleQty || 0) > 0 &&
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
        this.detailsTableData.length &&
        this.hasBelongsPerm("export", this.header.belongs)
      );
    },
    canImport() {
      return this.hasBelongsPerm("import");
    },
    canPrint() {
      return (
        this.detailsTableData.length &&
        this.header.canPrint &&
        this.hasBelongsPerm("print", this.header.belongs)
      );
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(
          this.detailsTableData,
          (sum, item) => add(sum, Number(item.realQty)),
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
    auditType() {
      let type = "";
      if (this.header.status === 94) {
        type = "deposit";
      } else if (this.header.status === 2) {
        type = "order";
      }
      return type;
    },
    companyId() {
      return this.header.companyId || store.userInfoMsg().companyId;
    },
    hasCoop() {
      return this.detailsTableData.some(item => item.priorityCode == 6);
    }
  },
  watch: {
    companyId() {
      this.$refs.partTable && this.$refs.partTable.clear();
    },
    $route(to) {
      if (to.path === "/SalesBilling" && to.query.time) {
        this.billId = Number(to.query.billId);
        this.loadBill();
      }
    },
    header() {
      this.searchInfo = {
        taxRate: this.header.taxRate,
        invoiceType: this.header.invoiceType,
        cooperatorId: this.header.cooperatorId
      };
    },
    editDetailBoxVisible(bl) {
      if (!bl) {
        this.setKeyScope(this.keyScopes.localTable);
      }
    },
    partTableFocusFlag(bl) {
      if (bl) this.selectedRows = [];
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
    }
  },
  mounted() {
    this.bindSwitchScope();
    this.sort = getLocalTableSort(TYPE);
    this.getFilterZero();
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
      this.loadBill();
    } else {
      this.billId = null;
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
        this.$refs.headerFrom.clearValidate();
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
    hotkeys.deleteScope(this.keyScopes.partTable);
    hotkeys.deleteScope(this.keyScopes.localTable);
    hotkeys.deleteScope(this.keyScopes.form);
    hotkeys.deleteScope(this.keyScopes.confirmDelete);
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 32);
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date(), "YYYY-MM-DD");
    },
    searchPartsDialog() {
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
    handleKeyCode(e) {
      switch (e.code) {
        case "F2":
          this.createHandle();
          break;
        case "F4":
          this.deleteHandle();
          break;
        case "F11":
          this.printHandle();
          break;
        case "F9":
          this.submitHandle();
          this.recallHandle();
          break;
        case "F7":
          this.auditHandle();
          this.depositAuditHandle();
          break;
        case "F8":
          this.transferHandle();
          break;
        case "F10":
          this.showPartDetailBox();
          break;
        case "KeyD":
          if (e.altKey) this.exportHandle();
          break;
        case "KeyI":
          if (e.altKey) this.importHandle();
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
          this.searchPartsDialog();
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
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleSetKeyScope() {
      hotkeys.setScope(this.keyScopes.partTable);
    },
    handleSetPartScope() {
      this.setKeyScope(this.keyScopes.partTable);
      this.selectedRows = [];
    },
    handleSetDetailScope() {
      this.setKeyScope(this.keyScopes.localTable);
      this.$refs.partTable.cleanSelectedRows();
    },
    handleSetKeyScopeForm() {
      hotkeys.setScope(this.keyScopes.form);
    },
    updateFocusIndex() {
      hotkeys.setScope(this.keyScopes.form);
      this.$refs.headerFrom.updateFocusData({ initial: "focus-cooperatorId" });
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
          filterZero: this.filterZero
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
              e.preventDefault();
              if (this.detailsTableData.length) {
                this.setKeyScope(this.keyScopes.localTable);
                this.selectedRows = this.detailsTableData.length
                  ? [this.detailsTableData[0]]
                  : [];
                if (this.selectedRows.length === 1) {
                  this.partId = this.selectedRows[0].partId;
                }
                this.$refs.partTable.cleanSelectedRows();
              }
            }
            break;
        }
      });
      hotkeys(
        "f2,f4,f7,f8,f9,f10,f11,insert,0,alt+d,alt+i,alt+o",
        { scope: this.keyScopes.form },
        e => {
          this.handleKeyCode(e);
        }
      );
      hotkeys("alt+up", { scope: this.keyScopes.localTable }, e => {
        switch (e.code) {
          case "ArrowUp":
            if (e.altKey) {
              e.preventDefault();
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
    changeSuccessHandle(mes) {
      // 弹框确认提示
      this.$message({ type: "success", message: mes, showClose: true });
      return this.loadBill();
    },
    formatter(val) {
      return dateFormatFull(val);
    },
    backMainList() {
      this.$router.push("/SalesList");
    },
    setDefaultData() {
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.detailsTableData = [];
    },
    createHandle() {
      if (!this.canCreate) return;
      if (this.billId) {
        this.$router.replace("/SalesBilling");
      }
      this.billId = null;
      this.setDefaultData();
      hotkeys.setScope(this.keyScopes.form);
      this.$nextTick(() => {
        this.$refs.headerFrom.updateFocusData({
          initial: "focus-cooperatorId"
        });
        this.$refs.headerFrom.clearValidate();
      });
    },
    printHandle() {
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Normal/" + this.billId
        }).href,
        "print"
      );
    },
    deleteHandle() {
      // 删除此条单据
      if (!this.canDelete) return;
      this.setKeyScope(this.keyScopes.form);
      this.$confirm(`此操作将删除 ${this.header.billNo} 单据明细, 是否继续？`, {
        type: "warning"
      }).then(() => {
        deleteSalesBill(Number(this.billId)).then(() => {
          this.detailsTableData = [];
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
      if (!this.canSubmit) return;
      this.$refs.headerFrom.$refs.saleForm.validate((valid, err) => {
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
                  this.$refs.headerFrom &&
                    this.$refs.headerFrom.updateFocusData({
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
      return salesBillSubmit({ billId: Number(this.billId) })
        .then(data => {
          if (
            this.header.enhancedSettlementType == "挂账" &&
            data &&
            data.overCreditAlarm
          ) {
            this.validCreditLine(data).then(() => {
              this.changeSuccessHandle("提交成功!");
            });
          } else {
            this.changeSuccessHandle("提交成功!");
          }
        })
        .catch(data => {
          if (data && data.code == "credit-err") {
            this.validCreditLine(data.data).then(skipCreditLine => {
              if (skipCreditLine) {
                salesBillSubmit({
                  billId: Number(this.billId),
                  skipCreditLine
                }).then(() => {
                  this.changeSuccessHandle("提交成功!");
                });
              }
            });
          }
        });
    },
    recallHandle() {
      if (!this.canRecall) return;
      salesBillCancelSubmit(Number(this.billId)).then(() => {
        this.changeSuccessHandle("撤回成功!");
      });
    },
    auditHandle() {
      if (!this.canAudit) return;
      if (this.header.sourceType == 1) {
        // 平台审核
        this.getBillData(this.header.id).then(() => {
          this.auditBoxVisible = true;
        });
      } else {
        this.checkBillVisible = true;
      }
    },
    getBillData(billId) {
      if (this.getBillDataLoading) {
        return;
      }
      this.getBillDataLoading = true;
      return resSalesBillDeatils(billId)
        .then(res => {
          let tips = "";
          if (res.header.platformKey === "007") {
            if ([2, 11].includes(res.header.status)) {
              tips = `（${res.header.platformName}平台订单转销售出库单后才可编辑）`;
            }
          } else if (res.header.platformKey) {
            if (res.header.status === 3) {
              tips = `（${res.header.platformName}平台订单，待买家付款后，前往平台进行订单审核）`;
            }
          }
          if (res.header.status === 4) {
            tips = "（请前往销售开单，完成销售出库单流程）";
          }

          this.billHeader = {
            ...res.header,
            statusTxt: SALES_ORDER_STATUS[res.header.status],
            tips
          };
          this.billDetails = res.rows || [];
        })
        .finally(() => {
          this.getBillDataLoading = false;
        });
    },
    depositAuditHandle() {
      if (!this.canDepositAudit) return;
      this.checkBillVisible = true;
    },
    handleCheckComplete(billNo) {
      if (billNo) {
        this.changeSuccessHandle(`单据 ${billNo} 转销售单成功!`);
      } else {
        this.changeSuccessHandle(`单据 ${this.header.billNo} 审核成功!`);
      }
    },
    cancelHandle() {
      if (!this.canCancel) return;
      this.cancelBoxVisible = true;
    },
    handleCancelSuccess() {
      this.loadBill();
    },
    transferHandle() {
      if (!this.canTransfer) {
        return;
      }
      this.mapData = {};
      if (
        this.header?.cooperatorId <= 0 ||
        this.header?.needMappingCooperator ||
        this.header?.needMappingParts
      ) {
        BillMapConfirm(
          {
            billId: this.header.id,
            platformKey: this.header.platformKey,
            billType: 1
          },
          this.searchLoadAllCustromerCooperators
        )
          .then(async res => {
            this.mapData = { ...res };
            let rows = null;
            if (this.mapData?.detailId2PartId) {
              rows = {};
              for (const k in this.mapData?.detailId2PartId) {
                rows[k] = {
                  partId: this.mapData?.detailId2PartId[k]
                };
              }
            }
            await RequestQQ.partMapping({
              billId: this.header.id,
              cooperatorId: this.mapData?.cooperatorId,
              billType: 1,
              rows
            });
            this.transferBoxVisible = true;
          })
          .catch(() => {});
      } else {
        this.transferBoxVisible = true;
      }
    },
    handleTransferSuccess() {
      this.loadBill();
    },
    importHandle() {
      if (!this.canImport) return;
      this.importInfo = { ...defaultImportInfo };
      this.importVisible = true;
      this.$nextTick(() => {
        this.$refs.importForm && this.$refs.importForm.clearValidate();
      });
    },
    importSalseOrders(rows) {
      return new Promise((resolve, reject) => {
        this.$refs.importForm.validate((valid, err) => {
          if (valid) {
            reqImportSalseOrders({
              cooperatorId: this.importInfo.cooperatorId,
              createPartsIfNotExist: this.importInfo.createPartsIfNotExist,
              rows
            })
              .then(data => {
                if (data.billId) {
                  this.importBill(data.billId);
                }
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
    importBill(billId) {
      this.$router.replace({ path: "/SalesBilling", query: { billId } });
      this.billId = billId;
      this.loadBill().then(() => {
        this.selectedRows = [
          this.detailsTableData[this.detailsTableData.length - 1]
        ];
        this.$nextTick(() => {
          this.isScrollToEnd = true;
        });
      });
    },
    loadBill() {
      this.detailsLoading = true;
      return resSalesBillDeatils(Number(this.billId), this.sort)
        .then(data => {
          this.detailsLoading = false;
          this.header = data.header;
          this.detailsTableData = data.rows || [];
          if (this.partTableFocusFlag && this.isCanEditFlag) {
            this.setKeyScope(this.keyScopes.partTable);
          } else {
            this.setKeyScope(this.keyScopes.localTable);
            this.selectedRows = [this.detailsTableData[0]];
            if (this.selectedRows.length === 1) {
              this.partId = this.selectedRows[0].partId;
            }
          }
          this.$nextTick(() => {
            this.$refs.headerFrom.clearValidate();
            this.isScrollToEnd = false;
          });
          let tips = "";
          const res = data;
          if (res.header.platformKey === "007") {
            if ([2, 11].includes(res.header.status)) {
              tips = `（${res.header.platformName}平台订单转销售出库单后才可编辑）`;
            }
          } else if (res.header.platformKey) {
            if (res.header.status === 3) {
              tips = `（${res.header.platformName}平台订单，待买家付款后，前往平台进行订单审核）`;
            }
          }
          if (res.header.status === 4) {
            tips = "（请前往销售开单，完成销售出库单流程）";
          }

          this.billHeader = {
            ...res.header,
            statusTxt: SALES_ORDER_STATUS[res.header.status],
            tips
          };
          this.billDetails = res.rows || [];
        })
        .catch(() => {
          this.detailsLoading = false;
          this.$nextTick(() => {
            this.isScrollToEnd = false;
          });
        });
    },
    handleSortChange(sort) {
      if (!this.detailsTableData.length) {
        return;
      }
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, TYPE);
      this.loadBill();
    },
    handleSalesParams(row) {
      this.detailInfo = { ...row };
      this.editDetailBoxVisible = true;
    },
    handleCreateSaleBill(row) {
      this.handleSalesParams(row);
    },
    addPartDetailHandle(data, type) {
      if (this.detailsTableData.length) {
        if (
          this.detailsTableData.find(
            item =>
              item.partId === data.partId &&
              item.ownerCompanyId == data.ownerCompanyId
          )
        ) {
          this.$confirm("[货主+配件]明细重复，是否继续添加？", {
            isFocusCancel: true
          }).then(() => {
            this.afterAddPartDetailHandle(data, type);
          });
        } else {
          this.afterAddPartDetailHandle(data, type);
        }
      } else {
        this.afterAddPartDetailHandle(data, type);
      }
    },
    afterAddPartDetailHandle(data, type) {
      this.isEdit = type === "edit";
      this.$refs.headerFrom.$refs.saleForm.validate((valid, err) => {
        if (valid) {
          this.handleSalesParams(data);
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    editHandle(row) {
      this.$refs.headerFrom.$refs.saleForm.validate((valid, err) => {
        if (valid) {
          this.isEdit = true;
          this.selectRow = row;
          this.detailInfo = { ...row };
          this.editDetailBoxVisible = true;
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    addDetail(val) {
      this.$refs.headerFrom.$refs.saleForm.validate((valid, err) => {
        if (valid) {
          // 销售订单新增/修改确认操作
          let params = {};
          if (this.isEdit) {
            params = {
              billId: Number(this.billId) || null,
              detailId: this.selectRow.id,
              partId: this.selectRow.partId,
              ownerCompanyId: this.selectRow.ownerCompanyId,
              property: this.selectRow.property,
              bookQty: val.bookQty || 0,
              preDiscountTaxedPrice: val.preDiscountTaxedPrice || 0,
              preDiscountUntaxedPrice: val.preDiscountUntaxedPrice || 0,
              preDiscountTaxedAmount: val.preDiscountTaxedAmount || 0,
              preDiscountUntaxedAmount: val.preDiscountUntaxedAmount || 0,
              taxAmount: val.taxAmount || 0,
              saleVehModel: val.saleVehModel,
              arrivalDate: val.arrivalDate,
              warehouseId: val.warehouseId || null,
              remark: val.remark
            };
            // 修改销售单据明细
            editSalesBillDeatil(params)
              .then(data => {
                this.editDetailBoxVisible = false;
                if (
                  this.header.enhancedSettlementType == "挂账" &&
                  data.overCreditAlarm
                ) {
                  this.validCreditLine(data)
                    .then(() => {
                      this.changeSuccessHandle("明细更新成功!");
                    })
                    .catch(() => {});
                } else {
                  this.changeSuccessHandle("明细更新成功!");
                }
              })
              .catch(data => {
                if (data.code == "credit-err") {
                  this.validCreditLine(data.data).then(skipCreditLine => {
                    if (skipCreditLine) {
                      editSalesBillDeatil({ ...params, skipCreditLine })
                        .then(() => {
                          this.changeSuccessHandle("明细更新成功!");
                        })
                        .catch(() => {});
                    }
                  });
                } else {
                  //重新拉取数据
                  this.$refs.editDetailBox.refreshData();
                }
              });
          } else {
            params = {
              billId: Number(this.billId) || null,
              skuId: val.skuId,
              sellerId: val.sellerId || val.ownerCompanyId,
              sellerName: val.sellerName || val.ownerCompanyName,
              partId: val.partId,
              property: val.property,
              code: val.code,
              name: val.name,
              brand: val.brand,
              productionPlace: val.productionPlace,
              bookQty: val.bookQty || 0,
              terminatedQty: val.terminatedQty || 0,
              preDiscountTaxedPrice: val.preDiscountTaxedPrice || 0,
              platformPurchasePrice: val.platformPurchasePrice || null,
              warehouseId: val.warehouseId || null,
              taxAmount: val.taxAmount || 0,
              saleVehModel: val.saleVehModel,
              arrivalDate: val.arrivalDate,
              remark: val.remark,
              sourceType: val.sourceType
            };
            if (this.billId) {
              // 有billId添加销售订单明细
              addNewSalesBill(params)
                .then(data => {
                  this.editDetailBoxVisible = false;
                  if (
                    this.header.enhancedSettlementType == "挂账" &&
                    data.overCreditAlarm
                  ) {
                    this.validCreditLine(data)
                      .then(() => {
                        this.changeSuccessHandle("明细添加成功!").then(() => {
                          this.selectedRows = [
                            this.detailsTableData[
                              this.detailsTableData.length - 1
                            ]
                          ];
                          this.$nextTick(() => {
                            this.isScrollToEnd = true;
                          });
                        });
                      })
                      .catch(() => {});
                  } else {
                    this.changeSuccessHandle("明细添加成功!").then(() => {
                      this.selectedRows = [
                        this.detailsTableData[this.detailsTableData.length - 1]
                      ];
                      this.$nextTick(() => {
                        this.isScrollToEnd = true;
                      });
                    });
                  }
                })
                .catch(data => {
                  if (data.code == "credit-err") {
                    this.validCreditLine(data.data).then(skipCreditLine => {
                      if (skipCreditLine) {
                        addNewSalesBill({ ...params, skipCreditLine })
                          .then(() => {
                            this.changeSuccessHandle("明细添加成功!").then(
                              () => {
                                this.selectedRows = [
                                  this.detailsTableData[
                                    this.detailsTableData.length - 1
                                  ]
                                ];
                                this.$nextTick(() => {
                                  this.isScrollToEnd = true;
                                });
                              }
                            );
                          })
                          .catch(() => {});
                      }
                    });
                  } else {
                    //重新拉取数据
                    this.$refs.editDetailBox.refreshData();
                  }
                });
            } else {
              // 无billId添加销售订单明细
              params = {
                header: {
                  ...this.header,
                  receiverAreaId:
                    this.header.receiverAreaIds &&
                    this.header.receiverAreaIds.length === 3
                      ? this.header.receiverAreaIds[2]
                      : undefined
                },
                detail: params,
                sourceType: val.sourceType
              };
              createNewSalesBill(params)
                .then(data => {
                  this.editDetailBoxVisible = false;
                  if (
                    this.header.enhancedSettlementType == "挂账" &&
                    data.overCreditAlarm
                  ) {
                    this.validCreditLine(data)
                      .then(() => {
                        this.$router.replace({
                          path: "/SalesBilling",
                          query: { billId: data.billId }
                        });
                        this.billId = data.billId;
                        this.changeSuccessHandle("明细添加成功!");
                      })
                      .catch(() => {});
                  } else {
                    this.$router.replace({
                      path: "/SalesBilling",
                      query: { billId: data.billId }
                    });
                    this.billId = data.billId;
                    this.changeSuccessHandle("明细添加成功!");
                  }
                })
                .catch(data => {
                  if (data.code == "credit-err") {
                    this.validCreditLine(data.data).then(skipCreditLine => {
                      if (skipCreditLine) {
                        createNewSalesBill({ ...params, skipCreditLine })
                          .then(reData => {
                            this.$router.replace({
                              path: "/SalesBilling",
                              query: { billId: reData.billId }
                            });
                            this.billId = reData.billId;
                            this.changeSuccessHandle("明细添加成功!");
                          })
                          .catch(() => {});
                      }
                    });
                  } else {
                    //重新拉取数据
                    this.$refs.editDetailBox.refreshData();
                  }
                });
            }
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    deleteDetailHandle(row) {
      if (!this.canEdit) return;
      this.isCanEditFlag = false;
      // 删除此单据下面的明细
      this.setKeyScope(this.keyScopes.confirmDelete);
      let tips = "";
      if (this.detailsTableData.length < 2) {
        tips = "该单据只有一条明细，删除后单据也将删除，确定继续删除？";
      } else {
        tips = "确定要删除该条单据明细？";
      }
      const detailIds = [row.id];
      const params = { billId: row.billId, detailIds: detailIds };
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
            deleteSalesBillDeatil(params)
              .then(() => {
                this.detailsTableData = this.detailsTableData.filter(
                  item => item.id != row.id
                );
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
                  this.selectedRows = [
                    this.detailsTableData[this.detailsTableData.length - 1]
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
    handlePartsTableSelectRow(data) {
      this.selectParts = [...data];
      if (data && data.length === 1) {
        this.partId = data[0].partId;
      }
    },
    handleDetailTableSelectRow(data) {
      this.selectedRows = [...data];
      if (data && data.length === 1) {
        this.partId = data[0].partId;
      }
    },
    exportHandle() {
      if (this.canExport) {
        this.exportTableVisible = true;
      }
    },
    showPartSwapBox(row) {
      this.partSwapData = row;
      this.partSwapBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.selectedRows.length && !this.selectParts.length) {
        return;
      }
      this.stockFilter = {
        partId: this.partId,
        ownerCompanyId: store.userInfoMsg().companyId
      };
      this.storageStocksLockedVisible = true;
    }
  }
};
</script>
