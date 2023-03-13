<template>
  <section class="container-box">
    <div class="header flex-container">
      <div>
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
          :disabled="!canAuditCost"
          type="primary"
          size="mini"
          @click="auditCostHandle"
        >
          成本价审核（F7）
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
          :disabled="!canPrint"
          type="primary"
          size="mini"
          @click="printHandle"
        >
          打印（F11）
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
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
            <el-form-item label="业务日期" prop="createRange">
              <ht-date-range v-model="createRange" />
            </el-form-item>
            <el-form-item label="单据号" prop="billNo">
              <ht-input
                v-model="searchForm.billNo"
                placeholder="单据号/销售单号"
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="单据状态" prop="statuses">
              <ht-select
                v-model="searchForm.statuses"
                :options="returnStatus"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="打印状态" prop="printStatus">
              <ht-select
                v-model="printStatus"
                :options="printStatusOptions"
                placeholder="打印状态"
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
            <el-form-item prop="warehouseId" label="仓库" label-width="45px">
              <ht-autoselect
                v-model="searchForm.warehouseId"
                :fetch-suggestions="
                  query =>
                    searchLoadAllWarehouses(
                      query,
                      store().userInfoMsg().companyId
                    )
                "
                :trigger-on-focus="false"
                remote
                filter-zero
                highlight-first-item
                clearable
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card :no-padding="true" class="auto-card">
      <ht-setting-table
        :loading="loading"
        :data="tableData"
        :total="totalSize"
        :pagination="isShowPagination"
        :current-page="currentPage"
        :key-scope="keyScope"
        :table-name="tableName"
        :columns="baseTableColumns"
        :selected-rows.sync="selectedRows"
        autofocus
        @pageChange="pageChange"
        @rowOperation="handleRowEdit"
      />
    </ht-card>

    <SettleDialog
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="handleSettleRes"
    />
    <AuditCostBox
      :visible.sync="auditCostBoxVisible"
      :billId="curSelect.id"
      @success="handleAuditCostSuccess"
    />
  </section>
</template>

<script>
import { SettleDialog } from "@/components/business";
import { dateFormat } from "@/utils/date";
import {
  deleteSalesReturnBills,
  salesReturnBillCancel,
  salesReturnBillSubmit,
  salesReturnList
} from "@/api/sales/salesReturn";
import { SALES_RETURN_STATUS } from "@/constants/states/sales";
import { mapState, mapGetters } from "vuex";
import { baseDataMixin, hotkeyMixin, searchMixin } from "@/mixins";
import { TABLE_SALES_RETURN_LIST_TABLE } from "../constants";
import { openNewWindow } from "@/utils/tool";
import AuditCostBox from "./dialog/AuditCostBox";
import * as store from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";

const defaultSearchForm = {
  statuses: Object.keys(SALES_RETURN_STATUS).map(item => Number(item)),
  cooperatorId: null
};

export default {
  name: "SalesReturnList",
  components: {
    SettleDialog,
    AuditCostBox,
    VideoPopover
  },
  mixins: [searchMixin, hotkeyMixin, baseDataMixin],
  data() {
    return {
      keyScope: "salesReturnList",
      createRange: [],
      searchForm: { ...defaultSearchForm },
      checkDetails: false,
      returnStatus: SALES_RETURN_STATUS,
      isShowPagination: true,
      tableName: TABLE_SALES_RETURN_LIST_TABLE.name,
      baseTableColumns: TABLE_SALES_RETURN_LIST_TABLE.columns,
      importExcelVisible: false,
      settleDialogVisible: false,
      loading: false,
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      printStatus: [1, 2],
      settleData: {},
      settleList: [],
      companyId: 0,
      selectedRows: [],
      printStatusOptions: [
        { id: 1, name: "未打印" },
        { id: 2, name: "已打印" }
      ],
      auditCostBoxVisible: false,
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_sale_return.mp4",
      videoPopoverRemark:
        "销售退货页面，用于记录销售退货开单、结算入库，支持有销售历史退货和无销售历史退货。"
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
        this.curSelect.status === 1 &&
        this.hasBelongsPerm("delete", this.curSelect.belongs)
      );
    },
    canSubmit() {
      return (
        this.curSelect.status === 1 &&
        this.hasBelongsPerm("submit", this.curSelect.belongs)
      );
    },
    canRecall() {
      return (
        [2, 4, 5, 6, 7].includes(this.curSelect.status) &&
        !this.curSelect.costPriceAuditAt &&
        this.hasBelongsPerm("submitRecall", this.curSelect.belongs)
      );
    },
    canSettleStockIn() {
      return (
        !this.curSelect.financialAuditAt &&
        [5, 6].includes(this.curSelect.status) &&
        this.hasBelongsPerm("settleStockIn", this.curSelect.belongs)
      );
    },
    canAuditCost() {
      return (
        this.curSelect.status === 7 &&
        this.hasBelongsPerm("costPriceAudit", this.curSelect.belongs)
      );
    },
    canPrint() {
      return (
        this.curSelect.canPrint &&
        this.hasBelongsPerm("print", this.curSelect.belongs)
      );
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      this.createRange = val;
    }
  },
  mounted() {
    this.resetHandle();
    const query = this.$route.query;
    if (!query || !query.statuses || !query.statuses.length) {
      this.searchHandle();
    }
  },
  activated() {
    const query = this.$route.query;
    if (query && query.statuses && query.statuses.length) {
      const statuses = query.statuses.map(item => Number(item));
      //拼接初始化查询条件
      this.searchForm.statuses = Object.keys(SALES_RETURN_STATUS)
        .map(item => Number(item))
        .filter(item => statuses.includes(item));
      this.searchHandle();
    }
  },
  methods: {
    store() {
      return store;
    },
    deleteHandle() {
      if (!this.canDelete) {
        return;
      }
      this.$confirm("确认删除此单据吗？", "提示", {
        type: "warning"
      }).then(() => {
        deleteSalesReturnBills(this.curSelect.id).then(() => {
          this.pageChange(this.currentPage);
        });
      });
    },
    submitHandle() {
      if (!this.canSubmit) {
        return;
      }
      salesReturnBillSubmit(this.curSelect.id).then(() => {
        this.$message.success({ message: "提交成功" });
        this.pageChange(this.currentPage);
      });
    },
    recallHandle() {
      if (!this.canRecall) {
        return;
      }
      salesReturnBillCancel(this.curSelect.id).then(() => {
        this.$message.success({ message: "撤回成功" });
        this.pageChange(this.currentPage);
      });
    },
    printHandle() {
      if (!this.canPrint) {
        return;
      }
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Sales/Return/" + this.curSelect.id
        }).href,
        "print"
      );
    },
    createHandle() {
      if (!this.canCreate) {
        return;
      }
      this.$router.push({ path: "/SalesReturnBilling" });
    },
    resSalesReturnList(pagination) {
      this.loading = true;
      this.searchForm.fromDate =
        this.createRange && this.createRange.length
          ? dateFormat(this.createRange[0])
          : null;
      this.searchForm.toDate =
        this.createRange && this.createRange.length
          ? dateFormat(this.createRange[1])
          : null;
      this.searchForm.printStatus =
        this.printStatus.length === 0 ||
        this.printStatus.length === this.printStatusOptions.length
          ? undefined
          : this.printStatus[0];
      salesReturnList({ ...this.searchForm, ...pagination })
        .then(data => {
          this.tableData = data.rows;
          this.totalSize = data.totalSize;
          this.loading = false;
          let selectedRow;
          if (this.selectedRows && this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          if (!selectedRow) {
            selectedRow = data.rows && data.rows[0];
          }
          this.selectedRows = selectedRow ? [selectedRow] : [];
        })
        .catch(() => {
          this.selectedRows = [];
          this.loading = false;
        });
    },
    pageChange(page) {
      this.currentPage = page;
      this.resSalesReturnList({
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    settleHandle() {
      if (!this.canSettleStockIn) {
        return;
      }
      this.companyId = this.selectedRows[0].companyId;
      this.settleData = {
        id: this.selectedRows[0].id,
        billType: this.selectedRows[0].billType,
        billNo: this.selectedRows[0].billNo,
        cooperatorId: this.selectedRows[0].cooperatorId,
        enhancedSettlementType: this.selectedRows[0].enhancedSettlementType,
        invoiceType: this.selectedRows[0].invoiceType,
        amount: this.selectedRows[0].settleAmount
      };
      this.settleList = [
        {
          name: "单号",
          content: this.selectedRows[0].billNo
        },
        {
          type: "billType"
        },
        {
          name: "往来单位",
          content: this.selectedRows[0].cooperatorName
        },
        {
          name: "业务公司",
          content: this.selectedRows[0].companyName
        },
        {
          name: "发票类型",
          content:
            this.getFormatInvoiceType(
              this.selectedRows[0].invoiceType,
              this.selectedRows[0].taxRate
            ) || "--"
        },
        {
          name: "开单金额",
          content: this.selectedRows[0].billAmount
        },
        {
          name: "实际金额",
          content: this.selectedRows[0].taxedAmount
        },
        {
          name: "佣金",
          content: this.selectedRows[0].brokerageAmount
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
    searchHandle() {
      this.currentPage = 1;
      this.resSalesReturnList({
        page: this.currentPage,
        pageSize: this.pageSize
      });
      this.selectedRows = [];
    },
    resetHandle() {
      this.createRange = this.billQueryDefaultDateRange;
      this.searchForm = { ...defaultSearchForm };
    },
    handleSettleRes(value) {
      this.settleDialogVisible = false;
      if (value) {
        this.searchHandle();
      }
    },
    updateHandle() {
      if (!this.canRead) {
        return;
      }
      this.$router.push({
        path: "/SalesReturnBilling",
        query: { billId: this.selectedRows[0].id }
      });
    },
    handleRowEdit(row) {
      this.selectedRows = [row];
      this.updateHandle();
    },
    auditCostHandle() {
      if (!this.canAuditCost) {
        return;
      }
      this.auditCostBoxVisible = true;
    },
    handleAuditCostSuccess() {
      this.pageChange(this.currentPage);
    }
  }
};
</script>
