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
    selection-type="multiple"
    pagination
    v-bind="$attrs"
    v-on="$listeners"
    @pageChange="handlePaginationChange"
  />
</template>

<script>
import { mapState } from "vuex";
import { LOGISTICS_REGISTER_TO_BE_HANDLE_TABLE } from "@/constants";
import {
  reqLogisticsRegisterToBeDeliverList,
  reqLogisticsRegisterToBeReceiveList
} from "@/api/store/logisticsRegister";

export default {
  name: "ToBeHandledList",
  props: {
    isReceive: Boolean,
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
      tableName: LOGISTICS_REGISTER_TO_BE_HANDLE_TABLE.name,
      tableData: [],
      selectedRows: [],
      tableColumns: LOGISTICS_REGISTER_TO_BE_HANDLE_TABLE.columns,
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
          case "taxedAmount":
            sums[index] = this.summaryTotals["totalAmount"];
            break;
          case "freight":
            sums[index] = this.summaryTotals["totalCharges"];
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
      if (this.isReceive) {
        reqLogisticsRegisterToBeReceiveList({
          ...this.queryParams,
          page: this.currentPage,
          pageSize: this.pageSize
        })
          .then(res => {
            this.summaryTotals = {
              totalQty: res.totalInfo.totalQty,
              totalAmount: res.totalInfo.totalAmount,
              totalCharges: res.totalInfo.totalCharges
            };
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
      } else {
        reqLogisticsRegisterToBeDeliverList({
          ...this.queryParams,
          page: this.currentPage,
          pageSize: this.pageSize
        })
          .then(res => {
            this.summaryTotals = {
              totalQty: res.totalInfo.totalQty,
              totalAmount: res.totalInfo.totalAmount,
              totalCharges: res.totalInfo.totalCharges
            };
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
  }
};
</script>
