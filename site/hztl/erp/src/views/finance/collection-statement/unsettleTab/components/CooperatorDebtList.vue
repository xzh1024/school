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
import { loadCollectionStatementList } from "@/api/finance/payment";
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants";

export default {
  name: "CooperatorDebtList",
  props: {
    logisticId: {
      type: [Number, String],
      required: true
    },
    companyId: {
      type: [Number, String],
      required: true
    },
    queryParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isQueryParamsChange: true,
      loading: false,
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: "financeCollectionStatementUnsettleTabCooperatorDebtTable",
      totalInfo: {},
      tableColumns: [
        {
          prop: "cooperatorName",
          label: "往来单位",
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
        logisticId: this.logisticId,
        companyIds: [this.companyId],
        page: this.currentPage,
        pageSize: this.pageSize,
        isSub: true
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
        })
        .catch(() => {
          this.totalInfo = {};
          this.totalSize = 0;
          this.tableData = [];
          this.selectedRows = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clearData() {
      this.totalInfo = {};
      this.totalSize = 0;
      this.tableData = [];
      this.selectedRows = [];
    }
  }
};
</script>
