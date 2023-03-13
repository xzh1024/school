<template>
  <div class="container-box">
    <ht-tabs
      v-model="topActiveName"
      :tabs="topTabs"
      class="tabs-primary tabs-large"
      style="margin: 0"
    />
    <el-row class="btns-group">
      <el-button type="primary" size="mini" @click.stop="showDialog(1)">
        补充登记（F2）
      </el-button>
      <el-button type="primary" size="mini" @click.stop="showDialog(2)">
        冲销补登（F3）
      </el-button>
    </el-row>
    <ht-card>
      <el-form
        :model="searchData"
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="分公司" prop="companyIds">
              <ht-select
                v-model="searchData.companyIds"
                :options="companys"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="往来单位">
              <ht-autoselect
                v-model="cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllTypesCooperators(query)
                "
                :trigger-on-focus="false"
                placeholder="往来单位"
                remote
                clearable
                filter-zero
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="冲销情况">
              <ht-select
                v-model="searchData.status"
                :options="CHARGE_OPTIONS"
                placeholder="冲销情况"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
    <ht-card no-padding class="auto-card">
      <resize-box :default-len="182" is-column>
        <template v-slot:block1>
          <ht-setting-table
            :key="topActiveName"
            ref="datatable"
            class="edit-swap-group-parts"
            :selected-rows.sync="multipleSelections"
            v-loading="loading"
            :total="totalSize"
            :current-page="currentPage"
            :data="tableData"
            :columns="logColumns"
            @row-click="rowSelected"
            @selectChange="selectChange"
            setting-all-column
            pagination
            show-table-setting
            :enableTableSetting="true"
            show-summary
            :summary-method="getSummaries"
            @pageChange="_handleSizeChange"
            :table-name="`pre-collect-log-${topActiveName}`"
          />
        </template>
        <template v-slot:block2>
          <ht-card>
            <ht-tabs
              v-model="activeName"
              :tabs="tabs"
              @change="resetTab"
              class=""
              style="margin: 0"
            />
          </ht-card>
          <PreDetail
            v-show="activeName == 'preDetail'"
            ref="preDetail"
            :type="topActiveName"
            :subStatus="subStatus"
            :summaryData="currentRow"
            @showDetail="showDetail"
          />
          <ChargeDetail
            v-show="activeName == 'chargeDetail'"
            ref="chargeDetail"
            :type="topActiveName"
            :summaryData="currentRow"
            :billNo="billNo"
          />
        </template>
      </resize-box>
    </ht-card>
    <!-- 补充登记弹窗 -->
    <ht-dialog
      :visible.sync="preDialogVisible"
      v-if="preDialogVisible"
      title="补充登记"
      class="dialog-body"
      width="350px"
      append-to-body
    >
      <PreDialog
        :defaultForm="preFormDisplay"
        :type="topActiveName"
        @submitForm="submitForm"
        @hide="preDialogVisible = false"
      />
    </ht-dialog>
    <!-- 冲销登记弹窗 -->
    <ht-dialog
      :visible.sync="chargeDialogVisible"
      v-if="chargeDialogVisible"
      title="冲销补登"
      class="dialog-body"
      width="350px"
      append-to-body
    >
      <CharDialog
        :defaultForm="charFormDisplay"
        :type="topActiveName"
        @submitForm="submitForm"
        @hide="chargeDialogVisible = false"
      />
    </ht-dialog>
  </div>
</template>

<script>
import { TABLE_COLUMN_PRECOLLECT_LOG } from "./const/preCollectColumns";
import PreDialog from "./components/preDialog";
import CharDialog from "./components/charDialog";
import PreDetail from "./components/preDetail";
import ChargeDetail from "./components/chargeDetail";
import { summary } from "@/api/finance/prevFunds";
import ResizeBox from "@/components/resizeBox";
import { searchAllCooperators } from "@/api/communion/communion";
import { CHARGE_OPTIONS } from "@/views/finance/constans";
import { selectCompanys } from "@/api/company/company";
import { mapState } from "vuex";
import { hotkeyMixin } from "@/mixins";
import { cloneDeep } from "lodash";
import * as store from "@/utils/store";

const currentDate = () => {
  const now = new Date();
  const currentMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  const currentDay = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  return now.getFullYear() + "-" + currentMonth + "-" + currentDay;
};
// 补充登记弹窗的默认填充内容
const defaultSupplementForm = {
  billType: "YS",
  companyId: "",
  cooperatorId: "",
  amount: null,
  settleDate: currentDate(),
  voucherCode: "",
  paymentBy: "",
  remark: ""
};

// 冲销登记弹窗的默认填充内容
const defaultChargeForm = {
  billType: "YF",
  deductType: "relationship",
  prevFundId: null,
  companyId: "",
  cooperatorId: "",
  cooperatorName: "",
  commonBalance: null,
  amount: null,
  settleDate: currentDate(),
  voucherCode: "",
  paymentBy: "",
  remark: ""
};

const defaultQuery = {
  companyIds: [],
  cooperatorIds: [],
  status: "notDeducted"
};

export default {
  name: "PrepaymentPage",
  data() {
    return {
      cooperatorId: "",
      topTabs: [
        { id: "YS", name: "预收款" },
        { id: "YF", name: "预付款" }
      ],
      multipleSelections: [],
      topActiveName: "YS",
      companys: [],
      subStatus: [],
      cooperators: [],
      CHARGE_OPTIONS,
      summaryData: {},
      searchData: {
        ...defaultQuery
      },
      loading: false,
      totalSize: 0,
      tableData: [],
      currentPage: 1,
      preDialogVisible: false,
      chargeDialogVisible: false,
      preFormDisplay: {},
      charFormDisplay: {},
      currentRow: {},
      billNo: "",
      activeName: "preDetail"
    };
  },
  components: {
    ResizeBox,
    PreDialog,
    CharDialog,
    PreDetail,
    ChargeDetail
  },
  mixins: [hotkeyMixin],
  watch: {
    topActiveName() {
      this.tableData = [];
      this.searchHandle();
    }
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "perm"]),
    ...mapState("admin/table", ["pageSize"]),
    logColumns() {
      return TABLE_COLUMN_PRECOLLECT_LOG(this.topActiveName);
    },
    tabs() {
      return [
        {
          id: "preDetail",
          name: this.topActiveName == "YS" ? "预收明细" : "预付明细"
        },
        { id: "chargeDetail", name: "冲销明细" }
      ];
    }
  },
  mounted() {
    this.resetHandle();
    this.searchLoadAllCompanies();
    const { companyId } = store.userInfoMsg();
    // 设置默认当前分公司选中
    this.searchData.companyIds = [companyId];
    this.searchHandle();
  },
  methods: {
    async searchLoadAllCompanies() {
      const res = await selectCompanys();
      const hasFinancialPerm = this.loginHasPerm("financials");
      const hasFinancialPrevFundPerm = this.loginHasPerm("financials.prevFund");
      const hasOurPerm = this.loginContainPerm("financials.prevFund.our");
      const hasRestPerm = this.loginContainPerm("financials.prevFund.rests");
      const hasByOurPerm = this.loginContainPerm("financials.prevFund.byOur");
      // 根据权限去过滤
      let companies = [];
      if (hasFinancialPerm || hasFinancialPrevFundPerm) {
        companies = res;
      } else {
        res.forEach(item => {
          const { belongs } = item;
          if (belongs && belongs.includes("our") && hasOurPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("rests") && hasRestPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("byOur") && hasByOurPerm) {
            companies.push(item);
          }
        });
      }
      this.companys = companies;
    },
    loginHasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return hasRootPerm || (perms && perms.some(item => permKey === item));
    },
    loginContainPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return (
        hasRootPerm || (perms && perms.some(item => item.includes(permKey)))
      );
    },
    async searchLoadAllTypesCooperators(query) {
      return (await searchAllCooperators({ keyword: query })) || [];
    },
    resetHandle() {
      this.searchData = { ...defaultQuery };
    },
    searchHandle() {
      this.currentPage = 1;
      this.activeName = "preDetail";
      this.$refs.preDetail.resetHandle();
      return this.loadData();
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadData(page);
    },
    showDialog(type) {
      switch (type) {
        case 1:
          this.preFormDisplay = {
            ...defaultSupplementForm,
            billType: this.topActiveName
          };
          this.preDialogVisible = true;
          break;
        case 2:
          this.charFormDisplay = {
            ...defaultChargeForm,
            billType: this.topActiveName
          };
          this.chargeDialogVisible = true;
          break;
        default:
          break;
      }
    },
    selectChange(data) {
      if (!data) {
        this.$refs.preDetail.reset();
        this.$refs.chargeDetail.reset();
        return;
      }
      this.rowSelected(data[0]);
    },
    rowSelected(row) {
      const statusObj = {
        all: ["notDeducted", "partialDeducted", "deducted"],
        notDeducted: ["notDeducted", "partialDeducted"],
        deducted: ["deducted"]
      };
      this.subStatus = statusObj[this.searchData.status];
      if (!row) {
        this.$refs.preDetail.reset();
        this.$refs.chargeDetail.reset();
        return;
      }
      this.currentRow = {
        ...row,
        billType: this.topActiveName,
        deductStatuses: statusObj[this.searchData.status]
      };
      this.currentRow = cloneDeep(this.currentRow);
      this.activeName = "preDetail";
      this.billNo = "";
    },
    submitForm() {
      this.preDialogVisible = false;
      this.chargeDialogVisible = false;
      this.loadData();
    },
    loadData() {
      this.loading = false;
      let cooperatorIds = [];
      if (this.cooperatorId) {
        cooperatorIds = [this.cooperatorId];
      }

      summary({
        ...this.searchData,
        cooperatorIds,
        status: this.searchData.status == "all" ? "" : this.searchData.status,
        billType: this.topActiveName,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (!res) return;
        const {
          rows,
          totalAmount,
          totalDeductedAmount,
          totalBalanceAmount,
          totalToSettleAmount,
          totalSize
        } = res;
        this.tableData = rows || [];
        // 默认选中第一行
        if (rows && rows.length > 0) {
          this.multipleSelections = [this.tableData[0]];
          this.rowSelected(this.tableData[0]);
        } else {
          this.currentRow = {};
        }
        this.totalSize = totalSize || 0;
        this.summaryData = {
          totalAmount,
          totalDeductedAmount,
          totalBalanceAmount,
          totalToSettleAmount
        };
      });
      return [];
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "amount":
            sums[index] = this.summaryData["totalAmount"];
            break;
          case "deductedAmount":
            sums[index] = this.summaryData["totalDeductedAmount"];
            break;
          case "balanceAmount":
            sums[index] = this.summaryData["totalBalanceAmount"];
            break;
          case "toSettleAmount":
            sums[index] = this.summaryData["totalToSettleAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    resetTab() {
      this.billNo = "";
    },
    showDetail(billNo) {
      this.activeName = "chargeDetail";
      this.billNo = billNo || "";
    }
  }
};
</script>

<style lang="scss" scoped>
.btns-group {
  padding: 5px 10px;
}
.edit-swap-group-parts {
  ::v-deep .el-table__footer-wrapper {
    .cell {
      text-align: left;
    }
  }
}
</style>
