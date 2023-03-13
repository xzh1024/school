<template>
  <!-- 待开票业务单 -->
  <div class="container-box" style="height:100%">
    <div class="invoice-waiting">
      <div class="flex-container column-flex">
        <div class="flex-block-bg btns">
          <el-button
            type="primary"
            size="small"
            v-if="hasBelongsPermWithoutRoute('create', 'financials.invoiceOut')"
            :disabled="selectedRows.length == 0"
            @click="openDialog"
          >
            勾选单据开票（F3）
          </el-button>
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
                <el-form-item label="业务日期">
                  <ht-date-range v-model="otherRange" />
                </el-form-item>
                <el-form-item label="分公司">
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
              <el-col :span="5">
                <el-form-item label="往来单位">
                  <!-- :default-value.sync="searchForm.cooperatorName" -->
                  <ht-autoselect
                    v-model="searchForm.cooperatorId"
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
                <el-form-item label="业务单号">
                  <ht-input
                    v-model="searchForm.billNo"
                    placeholder="业务单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
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
                <el-form-item label="开票状态">
                  <ht-select
                    multiple
                    collapse-tags
                    filterable
                    v-model="searchForm.statuses"
                    :options="TICKET_TYPES"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="开票状态"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
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
            selectionType="multiple"
            show-summary
            pagination
            :total="totalSize"
            :selectable="selectable"
            @selectChange="selectChange"
            :summary-method="getSummaries"
            @row-dblclick="selectChange"
            :selected-rows.sync="selectedRows"
            :current-page.sync="currentPage"
            @pageChange="_handleSizeChange"
            @sort-change="handleSortChange"
            :table-name="tableName"
          />
          <div class="footer-left">
            <el-button type="primary" size="mini" @click="selectToggle">
              反选
            </el-button>
            <span style="font-size: 12px;padding-left: 10px;">
              勾选可开票金额：
            </span>
            <span class="main-color">
              {{ amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="invoice-waiting-bill-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="待开票业务单"
      is-end-export
    />
    <ticketBox
      :visible.sync="dialogVisible"
      :type="2"
      :isWaiting="true"
      :list="selectedRows"
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
import { TICKET_WAITING_COLUMNS } from "./columns"; // 表格配置
import { searchAllCooperators } from "@/api/communion/communion"; // 往来单位
import { ExportTable } from "@/components/table";
import { searchMixin } from "@/mixins";
import ticketBox from "../components/ticketBox.vue";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  invoicesOutWaitingList,
  invoicesOutWaitingExport
} from "@/api/finance/invoices";
import Local from "@/utils/localStorage";
const TICKET_TYPES = [
  { id: "no", name: "未开票" },
  { id: "part", name: "部分开票" },
  { id: "ok", name: "已开票" }
];

const STATUS_TYPES = {
  no: "未开票",
  part: "部分开票",
  ok: "已开票"
};

export default {
  name: "invoiceWaitingBill",
  components: { ExportTable, ticketBox },
  mixins: [tabChangeMixin, hotkeyMixin, searchMixin],
  data() {
    const status = {
      prop: "status",
      label: "开票状态",
      width: CELL_WIDTH.code,
      cantExport: true,
      render: (value, row) => (
        <span class="status">
          {this.STATUS_TYPES[value]}
          <span
            class="main-color"
            v-show={value != "no"}
            style="cursor:pointer;"
            on-click={e => this.statusHandle(row, e)}
          >
            {"(查看)"}
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
      tableColumns: [...TICKET_WAITING_COLUMNS],
      tableName: "invoice-waiting-bill",
      selectedRows: [],
      amount: 0,
      totalSize: 0,
      currentPage: 1,
      sort: "",
      TICKET_TYPES,
      STATUS_TYPES,
      statusColumns: status
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.getSettingDate();
    this.setSortData();
  },
  created() {
    this.tableColumns = [...TICKET_WAITING_COLUMNS];
    this.tableColumns.splice(11, 0, this.statusColumns);
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
      // console.log(this.store().allCompanies());
      // 获取公司列表
      // getFinancialsCompanys().then(res => {
      //   this.companyOptions = res;
      //   this.searchForm.companyIds = [userInfoMsg().companyId];
      // });
      this.$set(this.searchForm, "companyIds", [userInfoMsg().companyId]);
      this.$set(this.searchForm, "statuses", ["no", "part"]);
      this.handleSearch();
    },
    async searchAllCooperatorsList(query) {
      const res = await searchAllCooperators({
        type: "customer",
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
      invoicesOutWaitingList({ ...searchData, ...pagination })
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
      if (this.searchForm.cooperatorId) {
        this.$set(this.searchForm, "cooperatorIds", [
          this.searchForm.cooperatorId
        ]);
      } else {
        this.$set(this.searchForm, "cooperatorIds", []);
      }
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 重置
    resetForm() {
      this.getSettingDate();
      this.searchForm = {};
      this.$set(this.searchForm, "companyIds", [userInfoMsg().companyId]);
      this.$set(this.searchForm, "statuses", ["no", "part"]);
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 选中变化
    selectChange() {
      this.amount = 0;
      this.selectedRows.forEach(item => {
        this.amount += Number(item.unInvoiceAmount);
      });
    },
    // 反选
    selectToggle() {
      const selectedRow = [];
      this.selectedRows.forEach(item => {
        selectedRow.push(item.billNo);
      });
      const toggle = [];
      this.tableData.forEach(item => {
        if (item.status != "ok" && !selectedRow.includes(item.billNo)) {
          toggle.push(item);
        }
      });
      this.selectedRows = toggle;
      this.selectChange();
    },
    /// 禁选
    selectable(row) {
      return row.status != "ok" ? true : false;
    },
    openDialog() {
      if (this.selectedRows.length == 0) {
        this.$message.error("请勾选单据！");
        return false;
      }
      const selectIds = [];
      this.selectedRows.forEach(item => {
        if (!selectIds.includes(item.cooperatorId)) {
          selectIds.push(item.cooperatorId);
        }
      });
      if (selectIds.length > 1) {
        this.$message.error("系统不支持多个往来单位同时开票，请重新勾选!");
        return false;
      } else {
        this.dialogVisible = true;
      }
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
          case "businessAmount":
            sums[index] = data.totalBusinessAmount;
            break;
          case "toInvoiceAmount":
            sums[index] = data.totalToInvoiceAmount;
            break;
          case "invoicedAmount":
            sums[index] = data.totalInvoicedAmount;
            break;
          case "unInvoiceAmount":
            sums[index] = data.totalUnInvoiceAmount;
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
    billNoHandle() {},
    // 查看
    statusHandle(row) {
      this.$router.push({
        path: "/invoiceManage",
        query: { id: "invoiceBill", billNo: row.billNo }
      });
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
      return invoicesOutWaitingExport({
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
  .invoice-waiting {
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
    .footer-left {
      position: absolute;
      width: 240px;
      left: 10px;
      bottom: 0;
      height: 35px;
      overflow: hidden;
      .main-color {
        color: $color-primary;
        @include font_color("color-primary");
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
