<template>
  <ht-setting-table
    :loading="loading"
    :data="tableData"
    :columns="tableColumns"
    :selected-rows.sync="selectedRows"
    :total="totalSize"
    :current-page="currentPage"
    :table-name="tableName"
    :summary-method="getSummaries"
    show-summary
    pagination
    v-bind="$attrs"
    v-on="$listeners"
    @pageChange="handlePaginationChange"
  />
</template>

<script>
import { loadPaymentStatementList } from "@/api/finance/payment";
import { mapState } from "vuex";
import { FINANCE_COLLECTION_STATEMENT_LIST } from "@/constants";

export default {
  name: "StatementList",
  props: {
    isHandleSearch: Boolean,
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      summaryTotals: {
        sumAmount: 0,
        sumSettledAmount: 0,
        sumDiscountAmount: 0,
        sumUnSettledAmount: 0
      },
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: FINANCE_COLLECTION_STATEMENT_LIST.name,
      tableColumns: FINANCE_COLLECTION_STATEMENT_LIST.columns
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    selectedRows(value) {
      this.$emit("rows-change", value);
    },
    queryParams() {
      this.loadData(1);
    }
  },
  methods: {
    handlePaginationChange(page) {
      this.loadData(page);
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
            sums[index] = this.summaryTotals["sumAmount"];
            break;
          case "settledAmount":
            sums[index] = this.summaryTotals["sumSettledAmount"];
            break;
          case "unSettledAmount":
            sums[index] = this.summaryTotals["sumUnSettledAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryTotals["sumDiscountAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    loadData(page = this.currentPage) {
      this.loading = true;
      this.currentPage = page;
      return loadPaymentStatementList(
        {
          ...this.queryParams,
          settlementTypes: [1],
          page: this.currentPage,
          pageSize: this.pageSize
        },
        "lg"
      )
        .then(res => {
          this.summaryTotals = {
            sumAmount: res.sumAmount,
            sumSettledAmount: res.sumSettledAmount,
            sumUnSettledAmount: res.sumUnSettledAmount,
            sumDiscountAmount: res.sumDiscountAmount
          };
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
          if (this.isHandleSearch) {
            this.selectedRows = this.tableData.length
              ? [this.tableData[0]]
              : [];
          } else {
            let selectedRow;
            if (this.selectedRows.length) {
              selectedRow = this.tableData.find(
                item => item.id === this.selectedRows[0].id
              );
            }
            this.selectedRows = selectedRow
              ? [selectedRow]
              : this.tableData.length
              ? [this.tableData[0]]
              : [];
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
