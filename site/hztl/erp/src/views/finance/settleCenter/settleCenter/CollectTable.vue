<template>
  <div>
    <el-radio-group v-model="activeTab" size="mini" @change="handleTypeChange">
      <el-radio label="0" border>
        配件销售类
        <span class="total-numer">({{ totalNumers.collectionSaleNum }})</span>
      </el-radio>
      <el-radio label="1" border>
        配件采购类
        <span class="total-numer">({{ totalNumers.collectionPurcNum }})</span>
      </el-radio>
    </el-radio-group>
    <ht-table
      :key-scope="keyScope"
      v-bind="$attrs"
      :loading="loading"
      :current-page="currentPage"
      :selected-rows.sync="selectedRows"
      :pagination="isShowPagination"
      :total="total"
      :data="tableData"
      :columns="tableColumns"
      :summary-method="getSummaries"
      setting-all-column
      show-table-setting
      class="settle-table"
      selection-type="multiple"
      show-summary
      v-on="$listeners"
      @pageChange="handlePageChange"
      @table-setting="handleTableSetting"
    />

    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
  </div>
</template>

<script>
import { EditColumns } from "@/components/table";
import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import { mapState } from "vuex";
import { loadBillSettle } from "@/api/finance/billSettle";
import { FINANCE_SETTLE_CENTER_COLLECT } from "@/constants";
import { tabChangeMixin } from "@/mixins";

export default {
  name: "CollectTable",
  components: {
    EditColumns
  },
  mixins: [searchMixin, baseDataMixin, precisionsFixed, tabChangeMixin],
  props: {
    keyScope: {
      type: Symbol,
      default: Symbol("CollectTable")
    },
    totalNumers: {
      type: Object,
      required: true
    },
    queryParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      summaries: {
        amount: 0
      },
      selectedRows: [],
      isShowPagination: true,
      loading: false,
      routeParamsName: "grandChildTabName",
      defaultTab: "0",
      currentPage: 1,
      total: 0,
      tableData: [],
      editColumnsVisible: false,
      tableName: FINANCE_SETTLE_CENTER_COLLECT.name,
      baseTableColumns: FINANCE_SETTLE_CENTER_COLLECT.columns,
      tableColumns: []
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    paymentType() {
      return Number(this.activeTab);
    }
  },
  watch: {
    isShowPagination(value) {
      this.$emit("show-pagination", value);
    },
    // paymentType: {
    //   handler(value) {
    //     this.baseTableColumns = this.baseTableColumns.map(item => {
    //       if (item.prop == "amount") {
    //         return {
    //           ...item,
    //           label: value ? "待付款" : "待收款"
    //         };
    //       } else {
    //         return { ...item };
    //       }
    //     });
    //   },
    //   immediate: true
    // },
    selectedRows(value) {
      this.$emit("rows-change", value);
    },
    activeTab(val) {
      this.$emit("activeTabChange", val);
    }
  },
  methods: {
    loadFirstPage() {
      this.currentPage = 1;
      return this.loadData();
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
    getSummaries(param) {
      const { columns } = param;
      const sums = ["合计"];
      const index = columns.findIndex(item => item.property === "amount");
      sums[index] = this.summaries.amount;
      return sums;
    },
    handleTypeChange() {
      this.changeTab();
      this.currentPage = 1;
      this.loadData();
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      if (this.loading) return;
      this.loading = true;
      return loadBillSettle({
        ...this.queryParams,
        settleType: "物流代收",
        group: Number(this.activeTab),
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.loading = false;
          this.summaries = {
            amount: res.settlementGroups["物流代收"][this.activeTab].amount
          };
          this.tableData = res.rows
            ? res.rows.map(item => ({
                ...item,
                settlementType: res.settleType
              }))
            : [];
          this.total = res.totalSize;
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
          const { settlementGroups } = res;
          this.$emit("totalNumberChange", {
            nowpayInNum: settlementGroups["现付"]["0"].count || 0,
            nowpayOutNum: settlementGroups["现付"]["1"].count || 0,
            ontickPurcNum: settlementGroups["挂账"]["1"].count || 0,
            ontickSaleNum: settlementGroups["挂账"]["0"].count || 0,
            ontickRepaireNum: settlementGroups["挂账"]["2"].count || 0,
            collectionSaleNum: settlementGroups["物流代收"]["0"].count || 0,
            collectionPurcNum: settlementGroups["物流代收"]["1"].count || 0,
            allocInNum: settlementGroups["调拨挂账"]["1"].count || 0,
            allocOutNum: settlementGroups["调拨挂账"]["0"].count || 0
          });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
