<template>
  <!-- 收票单 -->
  <div class="container-box" style="height:100%">
    <div class="ticket-waiting">
      <div class="flex-container column-flex">
        <div class="flex-block-bg btns">
          <el-button type="primary" size="small" @click="exportVisible = true">
            导出（Alt+D）
          </el-button>
        </div>
        <ht-card style="margin: 5px 5px 0; background: #fff">
          <el-form
            ref="searchForm"
            :model="searchForm"
            size="mini"
            label-width="70px"
            label-position="left"
            class="form-item-small-margin-bottom"
          >
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="收票日期" label-width="80px">
                  <ht-date-range v-model="otherRange" />
                </el-form-item>
                <el-form-item label="收票分公司" label-width="80px">
                  <ht-select
                    multiple
                    collapse-tags
                    filterable
                    v-model="searchForm.companyIds"
                    :options="store().allCompanies()"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="分公司"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="往来单位">
                  <ht-autoselect
                    v-model="searchForm.cooperatorIds"
                    :default-value.sync="searchForm.cooperatorName"
                    :fetch-suggestions="
                      query => searchAllCooperatorsList(query)
                    "
                    :trigger-on-focus="false"
                    placeholder="请选择"
                    remote
                    clearable
                    filter-zero
                    highlight-first-item
                  />
                </el-form-item>
                <el-form-item label="发票类型">
                  <ht-select
                    multiple
                    collapse-tags
                    filterable
                    v-model="searchForm.invoiceTypes"
                    :options="store().formatInvoiceTypeDictionary()"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="发票类型"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="业务单号">
                  <ht-input
                    v-model="searchForm.sourceBillNo"
                    placeholder="业务单号"
                  />
                </el-form-item>
                <el-form-item label="收票单号">
                  <ht-input
                    v-model="searchForm.billNo"
                    placeholder="收票单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="状态">
                  <ht-select
                    multiple
                    collapse-tags
                    filterable
                    v-model="searchForm.statuses"
                    :options="TICKET_TYPES"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="状态"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
                <el-form-item label="收票备注">
                  <ht-input
                    v-model="searchForm.remark"
                    placeholder="收票备注"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="placeholder-form-item">
                  <br class="placeholder-form-item" />
                </el-form-item>
                <div style="text-align: left;">
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
        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-setting-table
            v-loading="loading"
            setting-all-column
            show-table-setting
            :data="tableData"
            :columns="tableColumns"
            pagination
            :total="totalSize"
            show-summary
            :selected-rows.sync="selectedRows"
            @selectChange="selectChange"
            :summary-method="getSummaries"
            @row-dblclick="selectChange"
            :current-page.sync="currentPage"
            @pageChange="_handleSizeChange"
            @sort-change="handleSortChange"
            :table-name="tableName"
          />
        </div>
      </div>
    </div>
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="ticket-bill-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="收票单"
      is-end-export
    />
    <ticketBox
      :visible.sync="dialogVisible"
      :type="1"
      :isWaiting="false"
      :detail="details"
      @update="handleSearch"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as store from "@/utils/store";
import { dateFormat } from "@/utils/date"; // 时间处理
import { tabChangeMixin, hotkeyMixin } from "@/mixins";
import { setTableSort } from "@/utils/tool"; // 表格排序
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userInfoMsg } from "@/utils/store"; // 用户信息
// import { getFinancialsCompanys } from "@/api/finance/basicSetting"; // 公司列表
import { TICKET_COLUMNS } from "./columns"; // 表格配置
import { searchAllCooperators } from "@/api/communion/communion"; // 往来单位
import { ExportTable } from "@/components/table";
import { searchMixin } from "@/mixins";
import ticketBox from "../components/ticketBox.vue";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  invoicesInList,
  invoicesInvalid,
  invoicesInDetail,
  invoicesInExport
} from "@/api/finance/invoices";
import Local from "@/utils/localStorage";
const TICKET_TYPES = [
  { id: "valid", name: "有效" },
  { id: "invalid", name: "作废" }
];

export default {
  name: "ticketWaitingBill",
  components: { ExportTable, ticketBox },
  mixins: [tabChangeMixin, hotkeyMixin, searchMixin],
  data() {
    const operation = {
      prop: "operation",
      label: "操作",
      width: CELL_WIDTH.multiple,
      cantExport: true,
      align: "center",
      render: (value, row) => (
        <span class="operation">
          <span
            class="main-color"
            v-show={
              this.hasBelongsPermWithoutRoute(
                "invalid",
                "financials.invoiceIn",
                row.belongs
              ) && row.status == "valid"
            }
            style="cursor:pointer;"
            on-click={e => this.invalidHandle(row, e)}
          >
            作废
          </span>
          <span v-show={row.status != "valid"}>-</span>
        </span>
      )
    };
    const bill = {
      prop: "billNo",
      label: "收票单号",
      width: CELL_WIDTH.creditCode,
      cantExport: true,
      attrs: {
        sortable: "custom"
      },
      render: (value, row) => (
        <span class="operation">
          <span
            class="main-color"
            style="cursor: pointer"
            on-click={e => this.billNoHandle(row, e)}
          >
            {value}
          </span>
        </span>
      )
    };
    return {
      loading: false,
      exportVisible: false,
      dialogVisible: false,
      otherRange: [],
      searchForm: {},
      companyOptions: [],
      totalData: {},
      tableData: [],
      tableName: "ticket-bill-list",
      tableColumns: [...TICKET_COLUMNS],
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      sort: "",
      TICKET_TYPES,
      operationColumns: operation,
      billNoColumns: bill,
      details: {}
    };
  },
  watch: {
    $route(to) {
      if (to.query.id && to.query.id == "ticketBill") {
        this.searchForm.sourceBillNo = to.query.billNo;
        this.handleSearch();
      }
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.getSettingDate();
    this.setSortData();
  },
  created() {
    this.tableColumns.splice(1, 0, this.operationColumns);
    this.tableColumns.splice(3, 0, this.billNoColumns);
    this.loadData();
  },
  activated() {
    this.getSettingDate();
    this.loadData();
  },
  methods: {
    store() {
      return store;
    },
    setSortData() {
      const storage = Local.get(this.$route.path);
      if (storage.defaultSort && storage.defaultSort[this.tableName]) {
        this.sort = setTableSort(storage.defaultSort[this.tableName]);
      }
    },
    getSettingDate() {
      const params = {
        module: "common",
        type: "queryDefaultMonths"
      };
      getSystemParamsDetail(params).then(res => {
        let date = [];
        res.companyParams.forEach(item => {
          if (item.id == userInfoMsg().companyId) {
            date = defaultDateRange.getSumDefaultDateRange(item.value);
          }
        });
        this.otherRange = date;
      });
    },
    loadData() {
      // 获取公司列表
      // getFinancialsCompanys().then(res => {
      //   this.companyOptions = res;
      //   this.searchForm.companyIds = [userInfoMsg().companyId];
      // });
      this.$set(this.searchForm, "companyIds", [userInfoMsg().companyId]);
      this.$set(this.searchForm, "statuses", ["valid", "invalid"]);
      this.handleSearch();
    },
    async searchAllCooperatorsList(query) {
      const res = await searchAllCooperators({
        type: "supplier",
        allcoop: false,
        keyword: query
      });
      return res || [];
    },
    resList(searchData, pagination) {
      this.loading = true;
      searchData.sort = this.sort;
      searchData.startDate = this.otherRange
        ? this.otherRange[0]
          ? dateFormat(this.otherRange[0])
          : null
        : null;
      searchData.endDate = this.otherRange
        ? this.otherRange[1]
          ? dateFormat(this.otherRange[1])
          : null
        : null;
      invoicesInList({ ...searchData, ...pagination })
        .then(res => {
          this.totalData = res || {};
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 搜索
    handleSearch() {
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize,
        sort: this.sort
      });
    },
    // 重置
    resetForm() {
      this.getSettingDate();
      this.searchForm = {};
      this.$set(this.searchForm, "companyIds", [userInfoMsg().companyId]);
      this.$set(this.searchForm, "statuses", ["valid", "invalid"]);
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    selectChange() {},
    // 作废
    invalidHandle(row) {
      console.log(row);
      this.$confirm(`确定要作废收票单[${row.billNo}]吗？`, "作废", {
        type: "warning"
      })
        .then(() => {
          // 作废操作
          invoicesInvalid({ id: row.id }).then(() => {
            this.resList(this.searchForm, {
              page: this.currentPage,
              pageSize: this.pageSize
            });
          });
        })
        .catch(() => {});
    },
    // 点击单号
    billNoHandle(row) {
      invoicesInDetail({ billId: row.id }).then(res => {
        this.details = res || {};
        this.details.header = row;
        this.dialogVisible = true;
      });
    },
    // 合计
    getSummaries(param) {
      const { columns } = param;
      const data = this.totalData || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "amount":
            sums[index] = data.totalAmount;
            break;
          case "taxAmount":
            sums[index] = data.totalTaxAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    outExoportHandle(sampleColums) {
      const data = { ...this.searchForm };
      data.startDate = this.otherRange
        ? this.otherRange[0]
          ? dateFormat(this.otherRange[0])
          : null
        : null;
      data.endDate = this.otherRange
        ? this.otherRange[1]
          ? dateFormat(this.otherRange[1])
          : null
        : null;
      return invoicesInExport({
        ...data,
        columnsSettings: sampleColums
      });
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      this.handleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .ticket-waiting {
    height: 100%;
    .btns {
      display: flex;
      justify-content: flex-start;
      background: #fff;
      margin: 5px 0 0;
      padding: 5px;
      border-radius: 4px;
    }
    .seach-form-box {
      padding-bottom: 0;
      .el-form {
        box-sizing: border-box;
        border-radius: 4px;
        .el-form-item {
          margin-bottom: 5px;
        }
        .el-button {
          margin: 5px 5px 10px;
        }
      }
    }
    .main-color {
      color: $color-primary;
      @include font_color("color-primary");
    }
    .error-color {
      color: #d9001b;
    }
  }
}
</style>
