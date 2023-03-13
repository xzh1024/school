<template>
  <section class="container-box">
    <div class="header">
      <el-button
        :disabled="!canCreate"
        type="primary"
        size="mini"
        @click="createHandle"
      >
        开单（F2）
      </el-button>
      <el-button
        :disabled="!canRead"
        type="primary"
        size="mini"
        @click="updateHandle"
      >
        查改（F3）
      </el-button>
      <el-button
        :disabled="!canSubmit"
        type="primary"
        size="mini"
        @click="sumbitHandle"
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
        v-loading="getBillDataLoading"
        type="primary"
        size="mini"
        @click="cancelHandle"
      >
        配件取消
      </el-button>
      <el-button
        :disabled="!canTransfer"
        v-loading="getBillDataLoading"
        type="primary"
        size="mini"
        @click="transferHandle"
      >
        转销售出库（F8）
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
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用客户订单</span
      >
    </div>
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item
              label="业务日期"
              prop="createRange"
              label-width="103px"
            >
              <ht-date-range v-model="createRange" />
            </el-form-item>
            <el-form-item prop="otherRange" label-width="103px">
              <ht-select
                slot="label"
                v-model="dateType"
                :options="DATE_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range v-model="otherRange" />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo" label-width="103px">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/来源单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="cooperatorId" label="客户名称">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="searchLoadAllCustromerCooperators"
                :trigger-on-focus="false"
                filterZero
                remote
                clearable
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="配件" prop="partNameOrCode">
              <ht-input
                v-model="searchForm.partNameOrCode"
                placeholder="配件编号/配件名称"
              />
            </el-form-item>
            <el-form-item label="销售类型" prop="sourceTypes">
              <ht-select
                v-model="searchForm.sourceTypes"
                :options="sourceTypes"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="statuses">
              <ht-select
                v-model="searchForm.statuses"
                :options="orderStatuses"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label-width="118px">
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
            <el-form-item label="打印状态" prop="printStatuses">
              <ht-select
                v-model="printStatuses"
                :options="printStatusOptions"
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
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
                :fetch-suggestions="searchLoadAllSalesMen"
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
                  query => searchLoadAllCreatedMen(['XD'], query)
                "
                :trigger-on-focus="false"
                placeholder="请选择"
                remote
                clearable
                highlight-first-item
              />
            </el-form-item>
            <el-form-item prop="plateNumber" label="车牌号" label-width="45px">
              <ht-input
                v-model="searchForm.plateNumber"
                minlength="7"
                maxlength="10"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetForm">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card :no-padding="true" class="auto-card">
      <ht-table
        :columns="tableColumns"
        :loading="tableLoading"
        :data="tableData"
        :summary-method="setTotals"
        :total="totalSize"
        :pagination="isShowPagination"
        :current-page="currentPage"
        :key-scope="keyScope"
        :selected-rows.sync="selectedRows"
        show-summary
        autofocus
        setting-all-column
        show-table-setting
        @pageChange="pageChange"
        @rowOperation="handleRowEdit"
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
      :has-setting="importInfo.hasSetting"
      :options="importInfo.options"
      :req-handler="importSalseOrders"
      title="销售订单明细导入"
      remakTitle="销售订单明细导入说明"
    >
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
            :allow-create="hasCompletePerm('basics.cooperators.createCustomer')"
            no-data-tips="没有查询到客户,回车新增"
            type="customer"
          />
        </el-form-item>
        <el-form-item label-width="175px" label="自动创建不存在的配件资料">
          <el-switch v-model="importInfo.createPartsIfNotExist" />
        </el-form-item>
      </el-form>
      <div slot="remark" class="remark-container">
        数据要求：
        <br />
        1、导入数据必须包含：配件编码、配件名称、销售数量、销售价（含税）。
        <br />
        <br />
        数据说明：
        <br />
        1、每一行数据表示一条单据明细，单头部分每行重复。
        <br />
        2、仅支持导入已完成单据。
        <br />
        3、在导入时每一行数据都将按照配件编码、配件名称、销售数量、销售价（含税）这4个字段与系统所存储的配件数据进行匹配，4个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。
        <br />
        <br />
        导入设置说明：
        <br />
        1、若勾选“指定单据所属公司”则导入数据均为该公司产生单据数据。
        <br />
        2、若开启“自动创建不存在的配件资料”则会根据配件编码，品牌，产地匹配本地配件资料，若无此配件信息则自动新增。
        <br />
        3、若开启“自动创建不存在的配件资料”则会匹配本地配件，若无此配件则自动新增。
        <br />
        <br />
        文件要求：
        <br />
        1、数据文件格式（EXCEL文件）且需选择对应工作表。
        <br />
        2、数据读取完成后，设置数据源，在下拉目标字段中选择对应字段。
        <br />
        要求：必须一一对应且不重复。
        <br />
        3、如果是EXCEL文件，则格式要求如下：
        <br />
        （1）第一行表示列标题，不是正式数据。
        <br />
        （2）不能存在合并单元格。
        <br />
        （3）只能有文本，数字，日期等文字信息，不能含有图形，图像等非文字信息。
      </div>
    </import-box>
    <check-bill
      :visible.sync="checkBillVisible"
      :billId="curSelect.id || 0"
      :type="auditType"
      @on-complete="handleCheckComplete"
    />
    <OrderError :visible.sync="orderErrorVisible" :data="orderErrorData" />
    <CancelBox
      :visible.sync="cancelBoxVisible"
      :headerData="billHeader"
      :totalData="billDetails"
      @success="handleCancelSuccess"
    />
    <AuditBox
      :visible.sync="auditBoxVisible"
      :headerData="billHeader"
      :billId="curSelect.id || 0"
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
  </section>
</template>
<script>
import {
  reqSalesHomeList,
  resSalesBillDeatils,
  salesBillCancelSubmit,
  salesBillSubmit
} from "@/api/sales/salesHome";
import { CheckBill } from "./dialog";
import {
  SALES_ORDER_STATUS,
  SALES_SOURCE_TYPE_STATUS,
  TRANS_SALES_OUT_STATUS,
  QTY_LIMIT_OPS
} from "@/constants";
import { OrderError } from "@/components/errors";
import { dateFormat } from "@/utils/date";
import { mapState, mapGetters } from "vuex";
import { TABLE_SALES_ORDER_LIST } from "../constants";
import { EditColumns } from "@/components/table";
import { hotkeyMixin, searchMixin, validCreditLine } from "@/mixins";
import BillMapConfirm from "@/components/bill-map-confirm";
import eventBus from "@/event";
import { openNewWindow } from "@/utils/tool";
import ImportBox from "@/components/importBox";
import { CooperatorsSelect } from "@/components/select";
import { reqImportSalseOrders } from "@/api/importBox";
import { salesOrderOptions } from "@/components/importBox/options";
import CancelBox from "../components/CancelBox";
import AuditBox from "../components/AuditBox";
import TransferBox from "../components/TransferBox";
import RequestQQ from "@/api/qq";
const QTY_LIMIT_TYPES = [
  { id: "qty", name: "订货数量" },
  { id: "terminatedQty", name: "取消数量" },
  { id: "outQty", name: "已出库数量" },
  { id: "waitOutQty", name: "待出库数量" },
  { id: "waitDeliverQty", name: "本单待交货数量" },
  { id: "onTransSaleQty", name: "待转销售数量" }
];
const DATE_TYPES = [
  { id: "arrivalDate", name: "预计交货日期" },
  { id: "completedDate", name: "完成时间" }
];
const defaultSearchForm = {
  depositStatus: null,
  cooperatorId: null,
  statuses: Object.keys(SALES_ORDER_STATUS).map(item => Number(item)),
  sourceTypes: [0, 1],
  plateNumber: "",
  qtyLimitType: "onTransSaleQty",
  qtyLimitOp: ">",
  qtyLimit: null
};
const defaultImportInfo = {
  options: salesOrderOptions,
  hasSetting: true,
  cooperatorId: null,
  createPartsIfNotExist: false
};

export default {
  name: "SalesList",
  components: {
    CheckBill,
    OrderError,
    EditColumns,
    ImportBox,
    CooperatorsSelect,
    CancelBox,
    TransferBox,
    AuditBox
  },
  mixins: [validCreditLine, searchMixin, hotkeyMixin],
  data() {
    return {
      keyScope: Symbol("salesList"),
      orderErrorData: {},
      orderErrorVisible: false,

      orderStatuses: SALES_ORDER_STATUS,
      transSaleStoreOutStatuses: TRANS_SALES_OUT_STATUS,
      sourceTypes: SALES_SOURCE_TYPE_STATUS,
      DATE_TYPES,
      QTY_LIMIT_TYPES,
      QTY_LIMIT_OPS,
      printStatusOptions: [
        { id: 1, name: "未打印" },
        { id: 2, name: "已打印" }
      ],
      createRange: [],
      dateType: "arrivalDate",
      otherRange: [],
      printStatuses: [],
      searchForm: {
        ...defaultSearchForm
      },

      isShowPagination: true,
      editColumnsVisible: false,
      tableName: TABLE_SALES_ORDER_LIST.name,
      baseTableColumns: TABLE_SALES_ORDER_LIST.columns,
      tableColumns: [],
      currentPage: 1,
      totalSize: 0,
      checkBillVisible: false,
      importExcelVisible: false,
      showPagination: true,
      tableLoading: false,
      tableData: [],
      summaryTotals: {},
      ruleForm: {},
      selectedRows: [],
      importVisible: false,
      importRules: {
        cooperatorId: [
          { required: true, message: "请选择客户", trigger: "change" }
        ]
      },
      importInfo: { ...defaultImportInfo },

      cancelBoxVisible: false,
      transferBoxVisible: false,
      getBillDataLoading: false,
      billHeader: {},
      billDetails: [],
      billMapData: {},
      auditBoxVisible: false
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
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canRead() {
      return (
        this.selectedRows.length === 1 &&
        this.hasBelongsPerm("read", this.curSelect.belongs)
      );
    },
    canSubmit() {
      return (
        [1, 90].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submit", this.curSelect.belongs)
      );
    },
    canRecall() {
      return (
        !this.isPlatform &&
        [2, 3, 94].includes(this.curSelect.status) &&
        this.hasBelongsPerm("submitRecall", this.curSelect.belongs)
      );
    },
    canAudit() {
      return (
        this.curSelect.status === 2 &&
        this.hasBelongsPerm("audit", this.curSelect.belongs)
      );
    },
    canDepositAudit() {
      return (
        this.curSelect.status === 94 &&
        this.hasBelongsPerm("depositAudit", this.curSelect.belongs)
      );
    },
    canCancel() {
      return (
        [2, 4].includes(this.curSelect.status) &&
        Number(this.curSelect.onTransSaleQty || 0) > 0 &&
        this.hasBelongsPerm("cancel", this.curSelect.belongs)
      );
    },
    canTransfer() {
      return (
        this.curSelect.status === 4 &&
        Number(this.curSelect.onTransSaleQty || 0) > 0 &&
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
      if (this.curSelect.status === 94) {
        type = "deposit";
      } else if (this.curSelect.status === 2) {
        type = "order";
      }
      return type;
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      this.createRange = val;
    }
  },
  mounted() {
    this.resetForm();
    const query = this.$route.query;
    if (!query || !query.statuses || !query.statuses.length) {
      this.handleSearch();
    }
  },
  activated() {
    const query = this.$route.query;
    if (query && query.status && query.status.length) {
      const status = query.status.map(item => Number(item));
      //拼接初始化查询条件
      this.searchForm.statuses = Object.keys(SALES_ORDER_STATUS)
        .map(item => Number(item))
        .filter(item => status.includes(item));
      setTimeout(() => {
        this.handleSearch();
      }, 100);
    }
  },
  methods: {
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      // this.manualVisible = true;
      eventBus.$emit("open-manual-dialog", 32);
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
          case "onTransSaleQty":
            sums[index] = this.summaryTotals["totalOnTransSaleQty"];
            break;
          case "terminatedQty":
            sums[index] = this.summaryTotals["totalTerminatedQty"];
            break;
          case "outQty":
            sums[index] = this.summaryTotals["totalOutQty"];
            break;
          case "waitOutQty":
            sums[index] = this.summaryTotals["totalWaitOutQty"];
            break;
          case "waitDeliverQty":
            sums[index] = this.summaryTotals["totalOnTransSaleQty"];
            break;
          case "onTransSaleAmount":
            sums[index] = this.summaryTotals["totalOnTransSaleAmount"];
            break;
          case "terminatedAmount":
            sums[index] = this.summaryTotals["totalTerminatedAmount"];
            break;
          case "outAmount":
            sums[index] = this.summaryTotals["totalOutAmount"];
            break;
          case "waitOutAmount":
            sums[index] = this.summaryTotals["totalWaitOutAmount"];
            break;
          case "waitDeliverAmount":
            sums[index] = this.summaryTotals["totalWaitDeliverAmount"];
            break;
          case "untaxedAmount":
            sums[index] = this.summaryTotals["totalUntaxedAmount"];
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
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    changeSuccessHandle(mes, type) {
      this.$message({ message: mes, type: type });
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    resList(searchData, pagination) {
      this.tableLoading = true;
      searchData.dateStart = this.createRange
        ? dateFormat(this.createRange[0])
        : null;
      searchData.dateEnd = this.createRange
        ? dateFormat(this.createRange[1])
        : null;
      searchData.arrivalDateStart =
        this.dateType === "arrivalDate"
          ? this.otherRange
            ? dateFormat(this.otherRange[0])
            : undefined
          : undefined;
      searchData.arrivalDateEnd =
        this.dateType === "arrivalDate"
          ? this.otherRange
            ? dateFormat(this.otherRange[1])
            : undefined
          : undefined;
      searchData.completedDateStart =
        this.dateType === "completedDate"
          ? this.otherRange
            ? dateFormat(this.otherRange[0])
            : undefined
          : undefined;
      searchData.completedDateEnd =
        this.dateType === "completedDate"
          ? this.otherRange
            ? dateFormat(this.otherRange[1])
            : undefined
          : undefined;
      searchData.printStatuses =
        this.printStatuses.length == (0 || this.printStatusOptions.length)
          ? undefined
          : this.printStatuses[0];
      searchData.qtyLimit =
        ![0, "0"].includes(searchData.qtyLimit) && !searchData.qtyLimit
          ? undefined
          : Number(searchData.qtyLimit);
      reqSalesHomeList({ ...searchData, ...pagination })
        .then(data => {
          this.summaryTotals.totalBookQty = data.totalBookQty;
          this.summaryTotals.totalTaxedAmount = data.totalTaxedAmount;
          this.summaryTotals.totalOnTransSaleQty = data.totalOnTransSaleQty;
          this.summaryTotals.totalTerminatedQty = data.totalTerminatedQty;
          this.summaryTotals.totalOutQty = data.totalOutQty;
          this.summaryTotals.totalWaitOutQty = data.totalWaitOutQty;
          this.summaryTotals.totalWaitDeliverQty = data.totalWaitDeliverQty;
          this.summaryTotals.totalOnTransSaleAmount =
            data.totalOnTransSaleAmount;
          this.summaryTotals.totalTerminatedAmount = data.totalTerminatedAmount;
          this.summaryTotals.totalOutAmount = data.totalOutAmount;
          this.summaryTotals.totalWaitOutAmount = data.totalWaitOutAmount;
          this.summaryTotals.totalWaitDeliverAmount =
            data.totalWaitDeliverAmount;
          this.summaryTotals.totalUntaxedAmount = data.totalUntaxedAmount;

          this.totalSize = data.totalSize;
          this.tableData = data.rows || [];
          let selectedRow;
          if (
            this.tableData.length &&
            this.selectedRows &&
            this.selectedRows.length
          ) {
            selectedRow = this.tableData.find(
              item => item.id === this.curSelect.id
            );
          }
          if (!selectedRow) {
            selectedRow = data.rows && data.rows[0];
          }
          this.selectedRows = selectedRow ? [selectedRow] : [];
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleSearch() {
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    createHandle() {
      // 开单操作
      if (!this.canCreate) return;
      this.$router.push("/SalesBilling");
    },
    updateHandle() {
      // 查改操作
      if (!this.canRead) return;
      this.toBill(this.curSelect);
    },
    toBill(row) {
      this.$router.push({
        path: "/SalesBilling",
        query: { billId: row.id }
      });
    },
    pageChange(page) {
      // 分页操作
      this.currentPage = page;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    resetForm() {
      this.createRange = this.billQueryDefaultDateRange;
      this.searchForm = { ...defaultSearchForm };
    },
    salesChange() {
      // 调整销售单据变更组件
      this.$router.push("/SalesChangeBilling");
    },
    auditHandle() {
      if (!this.canAudit) return;
      if (this.curSelect.sourceType == 1) {
        // 平台审核
        this.getBillData(this.curSelect.id).then(() => {
          this.auditBoxVisible = true;
        });
      } else {
        this.checkBillVisible = true;
      }
    },
    depositAuditHandle() {
      if (!this.canDepositAudit) return;
      this.checkBillVisible = true;
    },
    handleCheckComplete(billNo) {
      if (billNo) {
        this.changeSuccessHandle(`单据 ${billNo} 转销售单成功`, "success");
      } else {
        this.changeSuccessHandle(
          `单据 ${this.curSelect.billNo} 审核成功`,
          "success"
        );
      }
    },
    cancelHandle() {
      if (!this.canCancel) return;
      this.getBillData(this.curSelect.id).then(() => {
        this.cancelBoxVisible = true;
      });
    },
    handleCancelSuccess() {
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    transferHandle() {
      if (!this.canTransfer) {
        return;
      }
      if (
        this.curSelect?.cooperatorId <= 0 ||
        this.curSelect?.needMappingCooperator ||
        this.curSelect?.needMappingParts
      ) {
        BillMapConfirm(
          {
            billId: this.curSelect.id,
            platformKey: this.curSelect.platformKey,
            billType: 1
          },
          this.searchLoadAllCustromerCooperators
        )
          .then(async res => {
            this.billMapData = { ...res };
            console.log(this.billMapData);
            let rows = null;
            if (this.billMapData?.detailId2PartId) {
              rows = {};
              for (const k in this.billMapData?.detailId2PartId) {
                rows[k] = {
                  partId: this.billMapData?.detailId2PartId[k]
                };
              }
            }
            await RequestQQ.partMapping({
              billId: this.curSelect.id,
              cooperatorId: this.billMapData?.cooperatorId,
              billType: 1,
              rows
            });
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
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
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
    sumbitHandle() {
      // 提交
      if (!this.canSubmit) return;
      salesBillSubmit({ billId: this.curSelect.id })
        .then(data => {
          if (
            this.curSelect.enhancedSettlementType == "挂账" &&
            data.overCreditAlarm
          ) {
            this.validCreditLine(data).then(() => {
              this.changeSuccessHandle("提交成功", "success");
            });
          } else {
            this.changeSuccessHandle("提交成功", "success");
          }
        })
        .catch(err => {
          if (err.code == "credit-err") {
            this.validCreditLine(err.data).then(skipCreditLine => {
              if (skipCreditLine) {
                salesBillSubmit({
                  billId: this.curSelect.id,
                  skipCreditLine
                }).then(() => {
                  this.changeSuccessHandle("提交成功!", "success");
                });
              }
            });
          }
        });
    },
    recallHandle() {
      // 撤回提交
      if (!this.canRecall) return;
      salesBillCancelSubmit(this.curSelect.id).then(() => {
        this.changeSuccessHandle("撤回成功", "success");
      });
    },
    printHandle() {
      // 打印
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Normal/" + this.curSelect.id
        }).href,
        "print"
      );
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
                  this.handleSearch();
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
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    }
  }
};
</script>
