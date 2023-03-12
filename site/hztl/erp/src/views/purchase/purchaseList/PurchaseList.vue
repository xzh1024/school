<template>
  <div class="container-box">
    <div class="header">
      <el-button
        :disabled="!canClick || !canCreate"
        type="primary"
        size="mini"
        @click="createHandle"
      >
        开单（F2）
      </el-button>
      <el-button
        :disabled="!canClick || !canRead"
        type="primary"
        size="mini"
        @click="updateHandle"
      >
        查改（F3）
      </el-button>
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
        v-loading="getBillDataLoading"
        type="primary"
        size="mini"
        @click="cancelHandle"
      >
        配件取消
      </el-button>
      <el-button
        :disabled="!canClick || !canTransfer"
        v-loading="getBillDataLoading"
        type="primary"
        size="mini"
        @click="transferHandle"
      >
        转采购单（F8）
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
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用订货计划</span
      >
    </div>
    <ht-card>
      <el-form
        ref="purchaseListSearch"
        :model="searchForm"
        class="form-item-small-margin-bottom"
        label-width="60px"
        label-position="left"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="业务日期" prop="billDate" label-width="103px">
              <ht-date-range
                v-model="searchForm.billDate"
                shortcuts-type="all"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item prop="otherDate" label-width="103px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="DATE_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range
                v-model="searchForm.otherDate"
                shortcuts-type="all"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="供应商" prop="cooperatorId" label-width="45px">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="searchLoadAllSupplierCooperators"
                :trigger-on-focus="false"
                filterZero
                remote
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo" label-width="45px">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/对方单号/来源单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="status">
              <ht-select
                v-model="searchForm.status"
                :options="orderStatuses"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="配件" prop="partNameOrCode">
              <ht-input
                v-model="searchForm.partNameOrCode"
                placeholder="配件编码/配件名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              prop="businessManId"
              label="业务员"
              label-width="45px"
            >
              <ht-autoselect
                v-model="searchForm.businessManId"
                :fetch-suggestions="searchLoadAllPurchaseMen"
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
            <el-form-item prop="createdBy" label="制单人" label-width="45px">
              <ht-autoselect
                v-model="searchForm.createdBy"
                :fetch-suggestions="
                  query => searchLoadAllCreatedMen(['CD'], query)
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="103px">
              <ht-select
                slot="label"
                v-model="searchForm.qtyLimitType"
                :options="QTY_LIMIT_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-input
                v-model.number="searchForm.qtyLimit"
                placeholder="数量"
                type="number"
              >
                <ht-select
                  slot="prepend"
                  v-model="searchForm.qtyLimitOp"
                  :clearable="false"
                  :options="QTY_LIMIT_OPS"
                  style="width: 75px;"
                />
              </ht-input>
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click.stop="clearSearchForm"
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-table
        autofocus
        :loading="tableLoading"
        :data="tableData"
        :pagination="isShowPagination"
        :current-page="currentPage"
        :total="total"
        :summary-method="setTotals"
        :columns="tablecolumns"
        :selected-rows.sync="selectedRows"
        show-summary
        setting-all-column
        show-table-setting
        @rowOperation="handleRowEdit"
        @pageChange="pageChangeHandle"
        @table-setting="handleTableSetting"
      />
    </ht-card>
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
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
    <audit-box
      :visible.sync="auditVisible"
      :order-id="curSelect.id || 0"
      :type="auditType"
      @on-complete="auditComplete"
    />
    <CancelBox
      :visible.sync="cancelBoxVisible"
      :headerData="billHeader"
      :totalData="billDetails"
      @success="handleCancelSuccess"
    />
    <TransferBox
      :visible.sync="transferBoxVisible"
      :headerData="billHeader"
      :totalData="billDetails"
      :mapData="billMapData"
      :companyId="companyId"
      @success="handleTransferSuccess"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {
  deletePurchaseBilling,
  recallPurchaseBilling,
  reqPurchaseList,
  submitPurchaseBilling,
  reqPurchaseBillingDetails
} from "@/api/purchase/purchaseList";
import AuditBox from "./dialog/AuditBox";
import { PURCHASE_ORDER_STATUS, QTY_LIMIT_OPS } from "@/constants";
import { TABLE_PURCHASE_BILLING_LIST } from "../constants";
import { EditColumns } from "@/components/table";
import { hotkeyMixin, searchMixin } from "@/mixins";
import BillMapConfirm from "@/components/bill-map-confirm";
import eventBus from "@/event";
import { openNewWindow } from "@/utils/tool";
import ImportBox from "@/components/importBox";
import { CooperatorsSelect } from "@/components/select";
import { purchaseOrderOptions } from "@/components/importBox/options";
import { reqImportPurchasesOrders } from "@/api/importBox";
import CancelBox from "../components/CancelBox";
import TransferBox from "../components/TransferBox";

const QTY_LIMIT_TYPES = [
  { id: "qty", name: "订货数量" },
  { id: "terminatedQty", name: "取消数量" },
  { id: "arrivaledQty", name: "已入库数量" },
  { id: "waitArrivalQty", name: "待入库数量" },
  { id: "transitQty", name: "本单在途数量" },
  { id: "waitPurchaseQty", name: "待转采购数量" }
];
const DATE_TYPES = [
  { id: "arrivalDate", name: "预计到货日期" },
  { id: "completedDate", name: "完成时间" }
];
const defaultSearchForm = {
  billDate: [],
  dateType: "arrivalDate",
  otherDate: [],
  cooperatorId: null,
  billNo: "",
  status: Object.keys(PURCHASE_ORDER_STATUS).map(item => Number(item)),
  partNameOrCode: "",
  businessManId: null,
  createdBy: null,
  qtyLimitType: "waitPurchaseQty",
  qtyLimitOp: ">",
  qtyLimit: null
};
const defaultImportInfo = {
  options: purchaseOrderOptions,
  hasSetting: true,
  cooperatorId: null,
  createPartsIfNotExist: false
};

export default {
  name: "PurchaseList",
  components: {
    AuditBox,
    EditColumns,
    ImportBox,
    CooperatorsSelect,
    CancelBox,
    TransferBox
  },
  mixins: [searchMixin, hotkeyMixin],
  data() {
    return {
      searchForm: {
        ...defaultSearchForm
      },
      DATE_TYPES,
      QTY_LIMIT_TYPES,
      QTY_LIMIT_OPS,
      orderStatuses: PURCHASE_ORDER_STATUS,
      isShowPagination: true,
      tableLoading: false,
      editColumnsVisible: false,
      tableName: TABLE_PURCHASE_BILLING_LIST.name,
      baseTableColumns: TABLE_PURCHASE_BILLING_LIST.columns,
      tablecolumns: [],
      tableData: [],
      summaryTotals: {},
      total: 0,
      currentPage: 1,
      selectedRows: [],
      auditVisible: false,

      deleteLoading: false,
      recallLoading: false,
      submitLoading: false,
      auditLoading: false,

      importVisible: false,
      importRules: {
        cooperatorId: [
          { required: true, message: "请选择供应商", trigger: "change" }
        ]
      },
      importInfo: { ...defaultImportInfo },

      cancelBoxVisible: false,
      transferBoxVisible: false,
      getBillDataLoading: false,
      billHeader: {},
      billDetails: [],
      billMapData: {}
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    curSelect() {
      return this.selectedRows.length === 1
        ? this.selectedRows[0]
        : {
            belongs: []
          };
    },
    companyId() {
      return this.curSelect.companyId || 0;
    },
    isPlatform() {
      return !!this.curSelect.platformKey;
    },
    canHandleRowEdit() {
      return this.selectedRows.length && !this.auditVisible;
    },
    canClick() {
      return !this.submitLoading && !this.recallLoading && !this.deleteLoading;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.curSelect.belongs)
      );
    },
    canDelete() {
      return (
        !this.isPlatform &&
        [0, 2].includes(this.curSelect.status) &&
        this.hasBelongsPerm("delete", this.curSelect.belongs)
      );
    },
    canSubmit() {
      return (
        [0, 2, 6].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submit", this.curSelect.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        [1, 13].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submitRecall", this.curSelect.belongs)
      );
    },
    canAudit() {
      return (
        this.curSelect.status === 1 &&
        this.hasBelongsPerm("audit", this.curSelect.belongs)
      );
    },
    canDepositAudit() {
      return (
        this.curSelect.status === 13 &&
        this.hasBelongsPerm("depositAudit", this.curSelect.belongs)
      );
    },
    canCancel() {
      return (
        !this.isPlatform &&
        this.curSelect.status === 5 &&
        Number(this.curSelect.waitPurchaseQty || 0) > 0 &&
        this.hasBelongsPerm("cancel", this.curSelect.belongs)
      );
    },
    canTransfer() {
      return (
        this.curSelect.status === 5 &&
        Number(this.curSelect.waitPurchaseQty || 0) > 0 &&
        this.hasBelongsPerm(
          "transfer",
          // 只操作自己公司的单据，有其他分公司权限不可操作
          this.curSelect.belongs && this.curSelect.belongs.length
            ? this.curSelect.belongs
            : ["null"]
        )
      );
    },
    canImport() {
      return this.hasBelongsPerm("import");
    },
    canPrint() {
      return (
        this.curSelect.canPrint &&
        this.hasBelongsPerm("print", this.curSelect.belongs)
      );
    },
    auditType() {
      let type = "";
      if (this.curSelect.status === 13) {
        type = "deposit";
      } else if (this.curSelect.status === 1) {
        type = "order";
      }
      return type;
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    this.clearSearchForm();
    this.handleSearch();
  },
  methods: {
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      // this.manualVisible = true;
      eventBus.$emit("open-manual-dialog", 24);
    },
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "bookQty":
            sums[index] = this.summaryTotals["totalBookQty"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryTotals["totalTaxedAmount"];
            break;
          case "waitPurchaseQty":
            sums[index] = this.summaryTotals["totalWaitPurchaseQty"];
            break;
          case "terminatedQty":
            sums[index] = this.summaryTotals["totalTerminatedQty"];
            break;
          case "arrivaledQty":
            sums[index] = this.summaryTotals["totalArrivaledQty"];
            break;
          case "waitArrivalQty":
            sums[index] = this.summaryTotals["totalWaitArrivalQty"];
            break;
          case "transitQty":
            sums[index] = this.summaryTotals["totalTransitQty"];
            break;
          case "waitPurchaseAmount":
            sums[index] = this.summaryTotals["totalWaitPurchaseAmount"];
            break;
          case "terminatedAmount":
            sums[index] = this.summaryTotals["totalTerminatedAmount"];
            break;
          case "arrivaledAmount":
            sums[index] = this.summaryTotals["totalArrivaledAmount"];
            break;
          case "waitArrivalAmount":
            sums[index] = this.summaryTotals["totalWaitArrivalAmount"];
            break;
          case "transitAmount":
            sums[index] = this.summaryTotals["totalTransitAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tablecolumns = [];
      this.$nextTick(() => {
        this.tablecolumns = columns;
      });
    },
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    },
    handleSearch() {
      this.currentPage = 1;
      this.loadOrderList();
    },
    pageChangeHandle(page = 1) {
      this.currentPage = page;
      return this.loadOrderList();
    },
    loadOrderList() {
      this.tableLoading = true;
      const params = {
        ...this.searchForm,
        billDateStart:
          this.searchForm.billDate && this.searchForm.billDate.length
            ? this.searchForm.billDate[0]
            : undefined,
        billDateEnd:
          this.searchForm.billDate && this.searchForm.billDate.length
            ? this.searchForm.billDate[1]
            : undefined,
        arrivalDateStart:
          this.searchForm.dateType === "arrivalDate"
            ? this.searchForm.otherDate && this.searchForm.otherDate.length
              ? this.searchForm.otherDate[0]
              : undefined
            : undefined,
        arrivalDateEnd:
          this.searchForm.dateType === "arrivalDate"
            ? this.searchForm.otherDate && this.searchForm.otherDate.length
              ? this.searchForm.otherDate[1]
              : undefined
            : undefined,
        completedDateStart:
          this.searchForm.dateType === "completedDate"
            ? this.searchForm.otherDate && this.searchForm.otherDate.length
              ? this.searchForm.otherDate[0]
              : undefined
            : undefined,
        completedDateEnd:
          this.searchForm.dateType === "completedDate"
            ? this.searchForm.otherDate && this.searchForm.otherDate.length
              ? this.searchForm.otherDate[1]
              : undefined
            : undefined,
        qtyLimit:
          ![0, "0"].includes(this.searchForm.qtyLimit) &&
          !this.searchForm.qtyLimit
            ? undefined
            : Number(this.searchForm.qtyLimit)
      };
      return reqPurchaseList({
        ...params,
        page: this.currentPage,
        pageSize: this.pageSize,
        billDate: undefined,
        otherDate: undefined
      })
        .then(data => {
          this.tableData = data.rows || [];
          this.summaryTotals = data.totalInfo;
          this.total = data.totalSize;
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.curSelect.id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.tableLoading = false;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    getPurchaseTypes(options) {
      this.purchaseTypes = options;
    },
    createHandle() {
      if (!this.canClick) return;
      if (!this.canCreate) return;
      this.$router.push("/PurchaseBilling");
    },
    updateHandle() {
      if (!this.canClick) return;
      if (!this.canRead) return;
      this.$router.push({
        path: "/PurchaseBilling",
        query: { orderId: Number(this.selectedRows[0].id) }
      });
    },
    gotoReceiveBilling(billId) {
      this.$router.push({
        path: "/PurchaseReceiveBilling",
        query: { billId: Number(billId) }
      });
    },
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Purchase/Normal/" + this.curSelect.id
        }).href,
        "print"
      );
    },
    submitHandle() {
      if (!this.canClick) return;
      if (!this.canSubmit) return;
      this.submitLoading = true;
      const billNo = this.curSelect.billNo;
      submitPurchaseBilling(this.curSelect.id)
        .then(() => {
          this.pageChangeHandle(this.currentPage)
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
    cancelHandle() {
      if (!this.canClick) return;
      if (!this.canCancel) return;
      this.getBillData(this.curSelect.id).then(() => {
        this.cancelBoxVisible = true;
      });
    },
    handleCancelSuccess() {
      this.loadOrderList();
    },
    transferHandle() {
      if (!this.canClick) return;
      if (!this.canTransfer) return;
      if (this.curSelect.platformKey) {
        BillMapConfirm(
          {
            billId: this.curSelect.id,
            platformKey: this.curSelect.platformKey,
            billType: 0
          },
          this.searchLoadAllSupplierCooperators
        )
          .then(res => {
            this.billMapData = { ...res };
            this.getBillData(this.curSelect.id).then(() => {
              this.transferBoxVisible = true;
            });
          })
          .catch(() => {});
      } else {
        this.getBillData(this.curSelect.id).then(() => {
          this.transferBoxVisible = true;
        });
      }
    },
    handleTransferSuccess() {
      this.loadOrderList();
    },
    getBillData(billId) {
      if (this.getBillDataLoading) {
        return;
      }
      this.getBillDataLoading = true;
      return reqPurchaseBillingDetails(billId)
        .then(res => {
          let tips = "";
          if (res.header.platformKey) {
            if ([0, 1, 2, 3, 4].includes(res.header.status)) {
              tips = `（${res.header.platformName}平台订单待卖家发货后，可转采购单）`;
            } else if (res.header.status === 12) {
              tips = `（请前往${res.header.platformName}平台完成付款）`;
            }
          }
          if (res.header.status === 5) {
            tips = "（请前往采购开单，完成采购入库单流程）";
          }

          this.billHeader = {
            ...res.header,
            statusTxt: PURCHASE_ORDER_STATUS[res.header.status],
            tips
          };
          this.billDetails = res.details || [];
        })
        .finally(() => {
          this.getBillDataLoading = false;
        });
    },
    auditComplete(updata) {
      const billNo = this.curSelect.billNo;
      let tips = "";
      if (updata.isApproved) {
        tips = "单据 " + billNo + " 审核通过成功";
      } else {
        tips = "单据 " + billNo + " 退回成功";
      }
      this.$message({
        type: "success",
        message: tips,
        showClose: true
      });
      this.pageChangeHandle(this.currentPage);
    },
    recallHandle() {
      if (!this.canClick) return;
      if (!this.canRecall) return;
      const billNo = this.curSelect.billNo;
      this.recallLoading = true;
      recallPurchaseBilling(this.curSelect.id)
        .then(() => {
          this.pageChangeHandle(this.currentPage)
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
    deleteHandle() {
      if (!this.canClick) return;
      if (!this.canDelete) return;
      const billNos = [];
      this.selectedRows.forEach(item => {
        billNos.push(item.billNo);
      });
      this.$confirm(
        `确定要删除选中的 ${this.selectedRows.length} 条（${billNos.join(
          "、"
        )}）订单吗？`,
        "删除订单",
        { type: "warning" }
      )
        .then(() => {
          this.deleteLoading = true;
          deletePurchaseBilling(
            this.selectedRows.map(item => {
              return item.id;
            })
          )
            .then(() => {
              this.pageChangeHandle(this.currentPage)
                .then(() => {
                  this.deleteLoading = false;
                  this.$message({
                    type: "success",
                    message: "订单删除成功",
                    showClose: true
                  });
                })
                .catch(() => {
                  this.deleteLoading = false;
                });
            })
            .catch(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
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
                  this.handleSearch();
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
    clearSearchForm() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
