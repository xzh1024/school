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
import { mapState } from "vuex";
import { LOGISTICS_REGISTER_DETAIL_TABLE } from "@/constants";
import { reqLogisticsRegisterDetailsList } from "@/api/store/logisticsRegister";

export default {
  name: "LogisticsRegisterList",
  props: {
    isReceive: Boolean,
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
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      selectedRows: [],
      tableName: LOGISTICS_REGISTER_DETAIL_TABLE.name,
      tableColumns: LOGISTICS_REGISTER_DETAIL_TABLE.columns,
      summaryTotals: {}
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
        switch (column.property) {
          case "qty":
            sums[index] = this.summaryTotals["totalQty"];
            break;
          case "charges":
            sums[index] = this.summaryTotals["totalCharges"];
            break;
          case "collectingAmount":
            sums[index] = this.summaryTotals["totalCollectingAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    handlePaginationChange(page) {
      this.loadData(page);
    },
    loadData(page = this.currentPage) {
      this.loading = true;
      this.currentPage = page;
      reqLogisticsRegisterDetailsList({
        ...this.queryParams,
        type: this.isReceive ? 0 : 1,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.summaryTotals = {
            totalQty: res.totalInfo.totalQty,
            totalCharges: res.totalInfo.totalCharges,
            totalCollectingAmount: res.totalInfo.totalCollectingAmount
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
