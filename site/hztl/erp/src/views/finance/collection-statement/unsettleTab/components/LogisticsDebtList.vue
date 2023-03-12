<template>
  <ht-setting-table
    :loading="loading"
    :data="tableData"
    :columns="tableColumns"
    :selected-rows.sync="selectedRows"
    :total="totalSize"
    :current-page="currentPage"
    :table-name="tableName"
    :enable-table-setting="false"
    :summary-method="getSummaries"
    show-summary
    pagination
    v-bind="$attrs"
    v-on="$listeners"
    @pageChange="handlePaginationChange"
  />
</template>

<script>
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants";
import { loadCollectionStatementList } from "@/api/finance/payment";

export default {
  name: "LogisticsDebtList",
  props: {
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
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: "financeCollectionStatementUnsettleTabLogisticsDebtTable",
      totalInfo: {},
      tableColumns: [
        {
          prop: "cooperatorName",
          label: "物流公司",
          width: CELL_WIDTH.companyName,
          formatter: value => value || "<无物流公司>"
        },
        {
          prop: "companyName",
          label: "业务公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "amountIn",
          label: "应收",
          width: CELL_WIDTH.money,
          type: "number",
          formatter: value => Number(value) || "--"
        },
        {
          prop: "amountOut",
          label: "应付",
          width: CELL_WIDTH.money,
          type: "number",
          formatter: value => Number(value) || "--"
        },
        {
          prop: "paymentMethods",
          label: "欠款",
          align: "center",
          children: [
            {
              prop: "debtAmount",
              label: "合计",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            },
            {
              prop: "debtUncheckedAmount",
              label: "未对",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            },
            {
              prop: "debtUnsettleAmount",
              label: "已对未结",
              width: CELL_WIDTH.money,
              classNames: "number-font",
              formatter: value => Number(value) || "--"
            }
          ]
        },
        {
          prop: "settledAmount",
          label: "已结",
          width: CELL_WIDTH.money,
          classNames: "number-font",
          formatter: value => Number(value) || "--"
        }
      ]
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
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        sums[index] = this.totalInfo[column.property];
      });
      return sums;
    },
    handlePaginationChange(page) {
      this.loadData(page);
    },
    loadData(page = this.currentPage) {
      this.loading = true;
      this.currentPage = page;
      return loadCollectionStatementList({
        ...this.queryParams,
        page: this.currentPage,
        pageSize: this.pageSize,
        isSub: false
      })
        .then(res => {
          this.totalInfo = res.totalInfo;
          this.totalSize = res.totalSize;
          this.tableData = res.rows || [];
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
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
