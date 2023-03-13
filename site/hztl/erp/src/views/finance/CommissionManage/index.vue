<template>
  <div class="container-box">
    <ht-card>
      <div>
        <el-button
          type="primary"
          size="mini"
          :disabled="!canSettle || this.selectedRows.length !== 1"
          @click="handleSettle"
        >
          佣金结算（F7）
        </el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!canSettle || this.selectedRows.length < 2"
          @click="handleSettleAll"
        >
          批量佣金结算
        </el-button>
      </div>
    </ht-card>
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
        label-position="right"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item prop="dateRange" label-width="105px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="dateTypeArr"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range v-model="searchForm.dateRange" />
            </el-form-item>
            <el-form-item label="单号查询" prop="billNo" label-width="105px">
              <ht-input
                width="200px"
                v-model="searchForm.billNo"
                class="switch-focus focus-bank"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="业务公司" prop="companyId">
              <ht-select
                v-model="searchForm.companyId"
                :options="store().allCompanies()"
                filterable
              />
            </el-form-item>
            <el-form-item label="中间人" prop="cooperatorId">
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                remote
                clearable
                filter-zero
                highlight-first-item
                placeholder="中间人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="佣金结算情况" prop="commissionSettleStatus">
              <ht-select
                v-model="searchForm.commissionSettleStatus"
                :options="commissionSettleStatusArr"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
            <el-form-item label="业务结算情况" prop="businessSettleStatus">
              <ht-select
                v-model="searchForm.businessSettleStatus"
                :options="commissionSettleStatusArr"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户名称" prop="customerId">
              <ht-autoselect
                v-model="searchForm.customerId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                remote
                clearable
                filter-zero
                highlight-first-item
                placeholder="客户名称"
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="resetForm">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <ht-table
        v-loading="loading"
        :columns="tablecolumns"
        :data="tableData"
        :total="totalSize"
        :current-page="currentPage"
        :key-scope="keyScope"
        selection-type="multiple"
        :selected-rows.sync="selectedRows"
        :selectable="selectable"
        :pagination="isShowPagination"
        setting-all-column
        show-table-setting
        @pageChange="_handleSizeChange"
        @rowOperation="handleSettle"
        @hotkeysUp="handleKeyCode"
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
    <settle-dialog
      :visible.sync="singleSettleVisible"
      :informationList="informationList"
      :companyId="detailRow && detailRow.companyId"
      :settlData="settleBillData"
      @settleSuccess="handleSettleRes"
    />
    <batch-settle-dialog
      :visible.sync="batchSettleVisible"
      :informationList="batchinformationList"
      :companyId="detailRow && detailRow.companyId"
      :settlData="batchSettleData"
      :batchData="batchRow"
      @settleSuccess="handleSettleRes"
    />
  </div>
</template>
<script>
import { searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";
import { dateFormat } from "@/utils/date";
import { EditColumns } from "@/components/table";
import { TABLE__COMMISSION_LIST_TABLE } from "@/constants";
import { BatchSettleDialog, SettleDialog } from "@/components/business";
import { mapState, mapGetters } from "vuex";
import hotkeys from "hotkeys-js";
import { commissionList } from "@/api/store/commission";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: 0, // 查询日期类型：0-业务日期、1-业务结算日期、2-佣金结算日期
  dateRange: [], // 开始日期
  companyId: null, // 业务公司ID
  billNo: "", // 单号查询：结算单号/业务单号
  cooperatorName: "", // 中间人名称
  customerName: "", // 业务单据客户名称
  businessSettleStatus: [
    // 业务单据结算情况:0-未结清 1-已结清
    0,
    1
  ],
  commissionSettleStatus: [
    // 佣金结算情况：0-未结清 1-已结清
    0,
    1
  ]
};
export default {
  name: "CommissionManage",
  mixins: [searchMixin],
  components: {
    EditColumns,
    SettleDialog,
    BatchSettleDialog
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      searchForm: { ...defaultSearchForm },
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      dateTypeArr: [
        {
          id: 0,
          name: "业务日期"
        },
        {
          id: 1,
          name: "业务结算日期"
        },
        {
          id: 2,
          name: "佣金结算日期"
        }
      ],
      commissionSettleStatusArr: [
        {
          id: 0,
          name: "未结清"
        },
        {
          id: 1,
          name: "已结清"
        }
      ],
      keyScope: "CommissionManageLists",
      tableData: [],
      loading: false,
      totalSize: 0,
      currentPage: 1,
      selectedRows: [],
      tableName: TABLE__COMMISSION_LIST_TABLE.name,
      tablecolumns: [],
      editColumnsVisible: false,
      isShowPagination: false,
      singleSettleVisible: false,
      batchSettleVisible: false,
      detailRow: null,
      batchRow: null,
      batchinformationList: [],
      batchSettleData: {}
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    }),
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    baseTableColumns() {
      return TABLE__COMMISSION_LIST_TABLE.columns;
    },
    informationList() {
      if (!this.detailRow) {
        return [];
      }
      return [
        {
          name: "单号",
          content: this.detailRow.businessSettleBillNo
        },
        {
          type: "billType"
        },
        {
          name: "业务单号",
          content: this.detailRow.businessBillNo
        },
        { name: "中间人", content: this.detailRow.commissionName },
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
    },
    settleBillData() {
      return (
        this.detailRow && {
          ...this.detailRow,
          id: this.detailRow.id,
          billType: "YJ",
          billNo: this.detailRow.businessBillNo,
          amount: this.detailRow.commissionUnSettleAmount
        }
      );
    }
  },
  watch: {
    billQueryDefaultDateRange(val) {
      defaultSearchForm.dateRange = val;
      this.searchForm.dateRange = val;
    }
  },
  mounted() {
    defaultSearchForm.dateRange = this.billQueryDefaultDateRange;
    this.resetForm();
    this.handleSearch();
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
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
    handleKeyCode(e) {
      switch (e.code) {
        case "F5":
          this.handleSearch();
          break;
        case "F6":
          this.resetForm();
          break;
      }
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

    selectable(row) {
      return row.status === 1;
    },
    handleSearch() {
      // 搜索操作
      this.currentPage = 1;
      this.resShiftingList({ page: this.currentPage });
    },
    handleSettleRes(res) {
      if (res) {
        this.handleSearch();
      }
    },
    resetForm() {
      this.searchForm = {
        ...defaultSearchForm
      };
    },
    resShiftingList(page) {
      // 搜索移仓单列表
      this.loading = true;
      const params = {
        ...this.searchForm,
        ...page,
        pageSize: this.pageSizes,
        dateStart: this.searchForm.dateRange
          ? dateFormat(this.searchForm.dateRange[0])
          : undefined,
        dateEnd: this.searchForm.dateRange
          ? dateFormat(this.searchForm.dateRange[1])
          : undefined,
        dateRange: undefined
      };

      commissionList(params)
        .then(data => {
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          let selectedRows;
          if (this.selectedRows.length) {
            selectedRows = this.tableData.find(
              item =>
                item.id === this.selectedRows[0].id && this.selectable(item)
            );
          }
          if (!selectedRows) {
            selectedRows = this.tableData.find(item => this.selectable(item));
          }
          this.selectedRows = selectedRows ? [selectedRows] : [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    _handleSizeChange(page) {
      // 列表分页操作
      this.currentPage = page;
      this.resShiftingList({ page: page });
    },
    canSettle() {
      return this.hasBelongsPermWithoutRoute(
        "settle",
        "financials.settlements"
      );
    },
    handleSettle() {
      this.detailRow = this.selectedRows[0];
      if (this.selectedRows[0].status !== 1) {
        this.$message.error("当前单据的状态不能结算，请重新选择。");
        return;
      }
      this.singleSettleVisible = true;
    },
    handleSettleAll() {
      if (!this.selectedRows.every(item => item.status === 1)) {
        this.$message.error("存在不能结算的单据，无法结算。请重新选择。");
        return;
      }
      const companyId = this.selectedRows[0].companyId;
      const cooperatorId = this.selectedRows[0].cooperatorId;
      const commissionName = this.selectedRows[0].commissionName;
      let allAmount = 0;
      this.detailRow = {
        companyId: companyId
      };
      this.batchRow = [];
      if (this.selectedRows.every(item => item.cooperatorId === cooperatorId)) {
        this.selectedRows.forEach(item => {
          this.batchRow.push({
            billType: "YJ",
            billId: item.id,
            billNo: item.businessBillNo,
            settleAmount: item.commissionUnSettleAmount
          });
          allAmount += Number(item.commissionUnSettleAmount);
        });
        this.batchSettleData = {
          billType: "YJ",
          amount: allAmount
        };
        this.batchinformationList = [
          {
            name: "中间人",
            content: commissionName
          },
          {
            type: "amount"
          },
          {
            type: "settledAmount"
          },
          {
            type: "discountAmount"
          },
          {
            type: "unSettledAmount"
          }
        ];
        this.batchSettleVisible = true;
      } else {
        this.$message.error("选择的中间人不相同，无法结算。请重新选择。");
      }
    }
  }
};
</script>
