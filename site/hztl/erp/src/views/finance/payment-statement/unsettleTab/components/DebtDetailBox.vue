<template>
  <ht-dialog
    v-bind="$attrs"
    title="欠款明细"
    width="1300px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
  >
    <div class="container-box">
      <ht-card>
        <el-form
          :model="searchForm"
          label-width="60px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="往来单位：" label-width="73px">
                <span class="text-font-primary">
                  {{ searchForm.cooperatorName }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收付类型">
                <ht-select
                  v-model="searchForm.paymentTypes"
                  :options="PAYMENT_TYPES"
                  placeholder="收付类型"
                  filterable
                  multiple
                  has-selecte-all-val
                  collapse-tags
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务日期">
                <ht-date-range v-model="timeRange" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="searchHandle"
                >
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
      <ht-card no-background no-padding>
        <ht-setting-table
          :loading="loading"
          :data="tableData"
          :columns="tableColumns"
          :current-page="page"
          :total="totalSize"
          :selected-rows.sync="selectedRows"
          :table-name="tableName"
          :pager-count="5"
          @sort-change="handleSortChange"
          :summary-method="getSummaries"
          show-summary
          selection-type="multiple"
          pagination
          height="470px"
          @pageChange="handlePageChange"
        />
        <div style="display: flex; margin: -25px 0 5px 5px;">
          已选择
          <div style="margin-left: 20px;">
            单据数：<span class="text-font-primary">{{ curBillCount }}</span>
          </div>
          <div style="margin-left: 20px;">
            应收总额：<span class="text-font-primary">{{ curAmountIn }}</span>
          </div>
          <div style="margin-left: 20px;">
            应付总额：<span class="text-font-primary">{{ curAmountOut }}</span>
          </div>
          <div style="margin-left: 20px;">
            合计总额：<span class="text-font-primary">{{ curTotalAmout }}</span>
          </div>
        </div>
      </ht-card>
      <div class="dialog-footer-align" style="margin: 5px 0 10px 0;">
        <el-button
          :disabled="!selectedRows.length"
          type="primary"
          size="mini"
          plain
          @click="createHandle"
        >
          {{ sureBtnText }}（F3）
        </el-button>
        <el-button
          :disabled="!selectedRows.length"
          type="primary"
          size="mini"
          plain
          @click="deleteHandle"
        >
          删除（F4）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { reduce } from "lodash";
import { add, subtract } from "@/utils/numberAPI";
import { precisionsFixed } from "@/mixins";
import { dateFormat } from "@/utils/date";
import {
  deleteSupplement,
  loadReceivablePayablesDetail
} from "@/api/finance/payment";
import { mapState } from "vuex";
import { PAYMENT_TYPES } from "@/views/finance/constans";
import { FINANCE_PAYMENT_DEBT_DETAIL } from "@/constants";
import Local from "@/utils/localStorage";
import { setTableSort } from "@/utils/tool";
export default {
  name: "DebtDetailBox",
  mixins: [precisionsFixed],
  props: {
    searchForm: {
      type: Object,
      default() {
        return {};
      }
    },
    isSettle: Boolean
  },
  data() {
    return {
      timeRange: [],
      summaryTotals: {
        sumAmountIn: 0,
        sumAmountOut: 0,
        sumSettledAmount: 0,
        sumDiscountAmount: 0,
        sumUnCheckedAmount: 0,
        sumUnSettledAmount: 0
      },
      PAYMENT_TYPES,
      loading: false,
      page: 1,
      totalSize: 0,
      selectedRows: [],
      tableData: [],
      tableName: FINANCE_PAYMENT_DEBT_DETAIL.name,
      tableColumns: FINANCE_PAYMENT_DEBT_DETAIL.columns,
      sureBtnText: "生成对账单",
      sort: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    curBillCount() {
      return this.selectedRows.length;
    },
    curAmountIn() {
      let total = 0;
      if (this.selectedRows.length) {
        total = this.precisionFormat(
          reduce(
            this.selectedRows,
            (sum, item) => add(sum, Number(item.amountIn || 0)),
            0
          ),
          "money"
        );
      }
      return total;
    },
    curAmountOut() {
      let total = 0;
      if (this.selectedRows.length) {
        total = this.precisionFormat(
          reduce(
            this.selectedRows,
            (sum, item) => add(sum, Number(item.amountOut || 0)),
            0
          ),
          "money"
        );
      }
      return total;
    },
    curTotalAmout() {
      return this.precisionFormat(
        subtract(this.curAmountIn, this.curAmountOut),
        "money"
      );
    }
  },
  watch: {
    "$attrs.visible": {
      handler(val) {
        if (val) {
          if (this.isSettle) {
            this.sureBtnText = "对账并结算";
          } else {
            this.sureBtnText = "生成对账单";
          }
          this.resetHandle();
          this.page = 1;
          this.setSortData();
          this.loadData();
          this.$forceUpdate();
        }
      },
      immediate: true
    }
  },
  methods: {
    setSortData() {
      const storage = Local.get(this.$route.path);
      if (storage.defaultSort && storage.defaultSort[this.tableName]) {
        this.sort = setTableSort(storage.defaultSort[this.tableName]);
      }
    },
    handleSortChange(column) {
      this.page = 1;
      this.sort = setTableSort(column);
      this.loadData();
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "amountIn":
            sums[index] = this.summaryTotals["sumAmountIn"];
            break;
          case "amountOut":
            sums[index] = this.summaryTotals["sumAmountOut"];
            break;
          case "settledAmount":
            sums[index] = this.summaryTotals["sumSettledAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryTotals["sumDiscountAmount"];
            break;
          case "unCheckedAmount":
            sums[index] = this.summaryTotals["sumUnCheckedAmount"];
            break;
          case "unSettledAmount":
            sums[index] = this.summaryTotals["sumUnSettledAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    searchHandle() {
      this.page = 1;
      this.loadData();
    },
    resetHandle() {
      this.timeRange = [];
    },
    getSearchParams() {
      return {
        ...this.searchForm,
        page: this.page,
        sort: this.sort,
        pageSize: this.pageSize,
        fromDate: this.timeRange.length ? dateFormat(this.timeRange[0]) : "",
        toDate:
          this.timeRange.length === 2 ? dateFormat(this.timeRange[1]) : "",
        cooperatorName: undefined
      };
    },
    handlePageChange(page) {
      this.page = page;
      return this.loadData();
    },
    loadData() {
      this.loading = true;
      return loadReceivablePayablesDetail({ ...this.getSearchParams() })
        .then(res => {
          this.summaryTotals = {
            sumAmountIn: res.sumAmountIn,
            sumAmountOut: res.sumAmountOut,
            sumSettledAmount: res.sumSettledAmount,
            sumDiscountAmount: res.sumDiscountAmount,
            sumUnCheckedAmount: res.sumUnCheckedAmount,
            sumUnSettledAmount: res.sumUnSettledAmount
          };
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    createHandle() {
      if (!this.selectedRows.length) return;
      this.$emit("on-create", this.selectedRows, this.isSettle);
      this.cancelHandle();
    },
    deleteHandle() {
      if (!this.selectedRows.length) return;
      const errRows = this.selectedRows.filter(
        item => !["AF", "AS"].includes(item.billType)
      );
      if (errRows.length) {
        const billNos = errRows.map(item => item.billNo).slice(0, 10);
        const msg = `单据（${billNos.join("，")}${
          billNos.length > 10 ? "等" : ""
        }）为非补充登记单，请重新选择！`;
        this.$message.error({
          message: msg,
          showClose: true
        });
      } else {
        this.loading = true;
        const ids = this.selectedRows.map(item => item.id);
        deleteSupplement({ ids, type: 0 })
          .then(() => {
            this.$message.success({
              message: "删除补充登记单成功！",
              showClose: true
            });
            this.loading = false;
            this.loadData();
            this.$emit("on-change");
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 0;
  }
}
</style>
