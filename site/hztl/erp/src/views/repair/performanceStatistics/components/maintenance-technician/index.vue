<template>
  <!-- 维修人员绩效统计-维修技师 -->
  <div class="flex-container column-flex" style="padding:5px;height: 100%">
    <ht-card
      no-padding
      class="flex-block-padding"
      style="background:#fff;margin-bottom: 5px"
    >
      <el-form ref="searchForm" :model="searchForm" inline>
        <el-form-item label="分公司" size="small" label-width="50px">
          <ht-select
            multiple
            collapse-tags
            filterable
            v-model="searchForm.companyIds"
            :options="companyOptions"
            :trigger-on-focus="false"
            class="switch-focus focus-number"
            placeholder="分公司"
            highlight-first-item
            has-selecte-all-val
          />
        </el-form-item>
        <el-form-item label="绩效生成时间" size="small" label-width="90px">
          <ht-date-range v-model="otherRange" />
        </el-form-item>
        <el-form-item label="业务类型" size="small" label-width="60px">
          <ht-select
            multiple
            collapse-tags
            filterable
            v-model="searchForm.billBusinessCategoryIds"
            :options="repairBusinessCategoryList"
            :trigger-on-focus="false"
            class="switch-focus focus-number"
            placeholder="业务类型"
            highlight-first-item
            has-selecte-all-val
            style="width: 150px"
          />
        </el-form-item>
        <el-button type="primary" size="small" @click="searchSubmit">
          查询（F5）
        </el-button>
        <el-button type="primary" size="small" @click="resetSubmit">
          重置（F6）
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="float:right;"
          v-if="
            hasBelongsPermWithoutRoute(
              'export',
              'repairs.achievementStatistics.technician'
            )
          "
          @click="exportVisible = true"
        >
          导出汇总（Alt+D）
        </el-button>
      </el-form>
    </ht-card>
    <resize-box :default-len="240" is-column>
      <template v-slot:block1>
        <el-card
          no-background
          no-padding
          class="flex-block"
          style="height: 100%;"
        >
          <div slot="header">
            <span class="header-tit">汇总统计</span>
            <span class="header-icon" @click="openEcharts">
              <i class="el-icon-s-marketing"></i>
              <span>查看图表</span>
            </span>
            <span class="header-txt">
              统计方式：
              {{ open == "unified" ? "统一提成比例" : "" }}
              {{ open == "ladder" ? "阶梯提成比例" : "" }}
              {{ open == "none" ? "无" : "" }}
              {{ settingDetail }}
            </span>
          </div>
          <!-- <el-table
            v-loading="loading"
            ref="summaryTable"
            :data="summaryData"
            show-summary
            border
            highlight-current-row
            :summary-method="getSummaryPartSummaries"
            table-name="maintenance-summary-statistics"
            height="100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="分公司名称"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="staffName" label="维修技师" width="120">
            </el-table-column>
            <el-table-column
              prop="commissionAmount"
              label="合计提成金额"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="reworkCommissionAmount"
              label="合计返工责任费用"
              width="150"
            >
            </el-table-column>
            <el-table-column label="项目业绩" align="center">
              <el-table-column prop="item.itemQty" label="项目数" width="70">
              </el-table-column>
              <el-table-column
                prop="item.itemChargeManHour"
                label="收费工时"
              ></el-table-column>
              <el-table-column
                prop="item.itemCheckManHour"
                label="考核工时"
              ></el-table-column>
              <el-table-column
                prop="item.itemChargeAmount"
                label="收费工时费用"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="item.itemCheckAmount"
                label="考核工时费用"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="item.reworkCommissionAmount"
                label="返工责任费用"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="item.commissionAmount"
                label="提成金额"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="配件业绩" align="center">
              <el-table-column
                prop="part.partQty"
                label="配件数量"
              ></el-table-column>
              <el-table-column
                prop="part.partAmount"
                label="配件费用"
              ></el-table-column>
              <el-table-column
                prop="part.reworkCommissionAmount"
                label="返工责任费用"
                width="100"
              >
              </el-table-column>
              <el-table-column
                prop="part.commissionAmount"
                label="提成金额"
              ></el-table-column>
            </el-table-column>
          </el-table> -->
          <ht-setting-table
            ref="summaryTable"
            :data="summaryData"
            :columns="summaryColumns"
            show-summary
            border
            highlight-current-row
            :summary-method="getSummaryPartSummaries"
            height="100%"
            @current-change="handleCurrentChange"
            :selected-rows.sync="selectedRows"
            table-name="reception-summary-statistics"
          />
        </el-card>
      </template>
      <template v-slot:block2>
        <ht-card
          no-padding
          class="auto-block"
          style="background:#fff;height: 100%;"
          v-loading="loading2"
        >
          <el-tabs v-model="activeName" @tab-click="tabChange">
            <el-tab-pane name="workingHours" label="工费提成明细">
              <ht-setting-table
                class="wei-table"
                :data="workingHoursData"
                :enable-table-setting="false"
                :columns="workingHoursColumns"
                show-summary
                :summary-method="getworkingHoursSummaries"
                height="100%"
                table-name="working-hours"
                pagination
                :total="totalSize1"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
              />
            </el-tab-pane>
            <el-tab-pane name="material" label="料费提成明细">
              <ht-setting-table
                class="wei-table"
                :data="materialData"
                :enable-table-setting="false"
                :columns="materialColumns"
                show-summary
                :summary-method="getMaterialSummaries"
                height="100%"
                table-name="material-table"
                pagination
                :total="totalSize2"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
              />
            </el-tab-pane>
            <el-tab-pane name="workingHours-two" label="工费扣减明细">
              <ht-setting-table
                class="wei-table"
                :data="workingHoursData"
                :enable-table-setting="false"
                :columns="workingHoursColumns2"
                show-summary
                :summary-method="getworkingHoursSummaries"
                height="100%"
                table-name="working-hours-two"
                pagination
                :total="totalSize3"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
              />
            </el-tab-pane>
            <el-tab-pane name="material-two" label="料费扣减明细">
              <ht-setting-table
                class="wei-table"
                :data="materialData"
                :enable-table-setting="false"
                :columns="materialColumns2"
                show-summary
                :summary-method="getMaterialSummaries"
                height="100%"
                table-name="material-table-two"
                pagination
                :total="totalSize4"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
              />
            </el-tab-pane>
          </el-tabs>
        </ht-card>
      </template>
    </resize-box>

    <ht-dialog
      title="维修技师业绩图表"
      width="80%"
      :visible.sync="echartsVisible"
      custom-class="echarts-dialog"
    >
      <div id="echart-box" style="width: 100%;height:500px;"></div>
    </ht-dialog>
    <!-- 工单详情 -->
    <BillInfo
      :visible="showBillInfo"
      :billId="billId"
      @close="showBillInfo = false"
    />
    <export-table
      :base-columns="summaryColumns"
      :default-data="summaryData"
      table-name="maintenance-technician-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="维修技师"
      is-end-export
    />
  </div>
</template>
<script>
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer
]);

import {
  WORKING_HOURS_SUMMARY_COLUMNS,
  WORKING_HOURS_COLUMNS,
  WORKING_HOURS_TWO_COLUMNS,
  MATERIAL_COLUMNS,
  MATERIAL_TWO_COLUMNS
} from "../const/columns";
import { dateFormat } from "@/utils/date"; // 时间格式处理
import { userInfoMsg } from "@/utils/store"; // 用户信息
import { baseDictionary } from "@/api/base/base"; // 基础信息
import { mapState } from "vuex";
import { getFinancialsCompanys } from "@/api/finance/basicSetting"; //公司信息
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import BillInfo from "@/components/repair/BillInfo/BillInfo"; // 工单详情
import { getSettings } from "@/api/basis/performance/index"; // 获取设置
import resizeBox from "@/components/resizeBox";
import { ExportTable } from "@/components/table";
import {
  techniciansSummaryList,
  techniciansSummaryExport,
  techniciansItemList,
  techniciansReworkItemList,
  techniciansPartList,
  techniciansReworkPartList
} from "@/api/repairs/performance";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "maintenance-technician",
  components: { BillInfo, resizeBox, ExportTable },
  data() {
    return {
      loading: false,
      loading2: false,
      activeName: "workingHours",
      companyOptions: [],
      searchForm: {},
      otherRange: [],
      summaryTotal: {},
      summaryData: [], // 汇总统计表格
      summaryColumns: [...WORKING_HOURS_SUMMARY_COLUMNS],
      exportVisible: false,
      workingHoursTotal: {},
      workingHoursData: [],
      workingHoursColumns: [
        {
          prop: "billNo",
          label: "工单号",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row) => (
            <div>
              <span
                class="main-color pointer"
                on-click={e => this.openDialog(row, e)}
              >
                {value}
              </span>
            </div>
          )
        },
        ...WORKING_HOURS_COLUMNS
      ],
      workingHoursColumns2: [
        {
          prop: "billNo",
          label: "工单号",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row) => (
            <div>
              <span
                class="main-color pointer"
                on-click={e => this.openDialog(row, e)}
              >
                {value}
              </span>
            </div>
          )
        },
        ...WORKING_HOURS_TWO_COLUMNS
      ],
      materialTotal: {},
      materialData: [],
      materialColumns: [
        {
          prop: "billNo",
          label: "工单号",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row) => (
            <div>
              <span
                class="main-color pointer"
                on-click={e => this.openDialog(row, e)}
              >
                {value}
              </span>
            </div>
          )
        },
        ...MATERIAL_COLUMNS
      ],
      materialColumns2: [
        {
          prop: "billNo",
          label: "工单号",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row) => (
            <div>
              <span
                class="main-color pointer"
                on-click={e => this.openDialog(row, e)}
              >
                {value}
              </span>
            </div>
          )
        },
        ...MATERIAL_TWO_COLUMNS
      ],
      totalSize1: 0,
      totalSize2: 0,
      totalSize3: 0,
      totalSize4: 0,
      currentPage: 1,
      thisRow: {},
      echartsVisible: false,
      billId: 0,
      showBillInfo: false,
      menArr: [],
      amountArr: [],
      amountIndex: 100,
      repairBusinessCategoryList: [],
      open: "",
      settingDetail: "",
      setting: {},
      selectedRows: [],
      myChart: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.getSettingDate();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    window.onresize = function() {
      _this.reset();
    };
  },
  created() {
    this.getSetting();
    this.loadDate();
    this.getAll();
    this.getSettingDate();
  },
  activated() {
    this.getSetting();
    this.loadDate();
    this.getAll();
    this.getSettingDate();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    window.onresize = function() {
      _this.reset();
    };
  },
  methods: {
    getSettingDate() {
      const params = {
        module: "common",
        type: "queryDefaultMonths"
      };
      getSystemParamsDetail(params).then(res => {
        // console.log(res);
        let date = [];
        res.companyParams.forEach(item => {
          if (item.id == userMsg().userInfoMsg.companyId) {
            date = defaultDateRange.getSumDefaultDateRange(item.value);
          }
        });
        this.otherRange = date;
      });
    },
    loadDate() {
      // 获取公司列表
      getFinancialsCompanys().then(res => {
        this.companyOptions = res;
        this.searchForm.companyIds = [userInfoMsg().companyId];
        this.getTechniciansSummaryList();
      });
      // 获取业务类型字典信息
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
      });
    },
    getSetting() {
      const params1 = {
        module: "repair", // 模块
        type: "technicianAchievementEnableType" // 类型-接待顾问绩效启用类型
      };
      getSettings(params1).then(res => {
        this.settingDetail = "";
        this.open = res.value || "";
        if (res.value == "unified") {
          const params2 = {
            module: "repair", // 模块
            type: "technicianUnifiedAchievement" // 类型-接待顾问绩效启用类型-统一
          };
          getSettings(params2).then(res2 => {
            this.setting = res2.value || {};
            this.settingCheck();
          });
        }
        if (res.value == "ladder") {
          const params3 = {
            module: "repair", // 模块
            type: "technicianLadderAchievement" // 类型-接待顾问绩效启用类型-阶梯
          };
          getSettings(params3).then(res2 => {
            this.setting = res2.value || {};
            this.settingCheck();
          });
        }
      });
    },
    settingCheck() {
      this.settingDetail = "";
      if (this.open == "unified" || this.open == "ladder") {
        this.settingDetail =
          this.setting.manHourEnableType == "settle"
            ? "（按结算工时）"
            : this.setting.manHourEnableType == "check"
            ? "（按考核工时）"
            : "";
      }
    },
    // 获取汇总列表
    getTechniciansSummaryList() {
      const data = { ...this.searchForm };
      this.resList(data);
    },
    getAll() {
      techniciansSummaryList()
        .then(res => {
          this.menArr = [];
          this.amountArr = [];
          res.rows.forEach(item => {
            this.menArr.push(item.staffName);
            this.amountArr.push(item.commissionAmount);
          });
          const max = Math.max(...this.amountArr);
          this.amountIndex =
            Math.round(Number(max / 1000)) < 1
              ? 100
              : Math.round(Number(max / 1000)) * 100;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 搜索数据处理
    resList(searchData) {
      this.loading = true;
      searchData.startDate = "";
      searchData.endDate = "";
      if (this.otherRange[0]) {
        searchData.startDate = this.otherRange
          ? dateFormat(this.otherRange[0])
          : null;
      }
      if (this.otherRange[1]) {
        searchData.endDate = this.otherRange
          ? dateFormat(this.otherRange[1])
          : null;
      }
      techniciansSummaryList({ ...searchData })
        .then(res => {
          this.summaryTotal = res || {};
          this.summaryData = res.rows || [];
          this.workingHoursData = [];
          this.materialData = [];
          if (this.summaryData[0]) {
            // this.$refs.summaryTable.setCurrentRow(this.summaryData[0]);
            if (this.summaryData.length > 0) {
              this.selectedRows = [this.summaryData[0]];
              this.thisRow = this.summaryData[0];
              this.handleCurrentChange(this.summaryData[0]);
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchSubmit() {
      this.resList(this.searchForm);
    },
    resetSubmit() {
      this.searchForm.companyIds = [userInfoMsg().companyId];
      this.otherRange = [];
      this.resList(this.searchForm);
    },
    // 汇总合计
    getSummaryPartSummaries(param) {
      const { columns } = param;
      const data = this.summaryTotal || {};
      const totalItem = data.totalItem || {};
      const totalPart = data.totalPart || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "commissionAmount": // 提成金额
            sums[index] = data.commissionAmount;
            break;
          case "reworkCommissionAmount": // 返工责任费
            sums[index] = data.reworkCommissionAmount;
            break;
          case "item.itemQty":
            sums[index] = totalItem.itemQty;
            break;
          case "item.itemChargeManHour":
            sums[index] = totalItem.itemChargeManHour;
            break;
          case "item.itemCheckManHour":
            sums[index] = totalItem.itemCheckManHour;
            break;
          case "item.itemChargeAmount":
            sums[index] = totalItem.itemChargeAmount;
            break;
          case "item.itemCheckAmount":
            sums[index] = totalItem.itemCheckAmount;
            break;
          case "item.reworkCommissionAmount":
            sums[index] = totalItem.reworkCommissionAmount;
            break;
          case "item.commissionAmount":
            sums[index] = totalItem.commissionAmount;
            break;
          case "part.partQty":
            sums[index] = totalPart.partQty;
            break;
          case "part.partAmount":
            sums[index] = totalPart.partAmount;
            break;
          case "part.reworkCommissionAmount":
            sums[index] = totalPart.reworkCommissionAmount;
            break;
          case "part.commissionAmount":
            sums[index] = totalPart.commissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 工费合计
    getworkingHoursSummaries(param) {
      const { columns } = param;
      const data = this.workingHoursTotal || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "chargeManHour":
            sums[index] = data.totalChargeManHour;
            break;
          case "checkManHour":
            sums[index] = data.totalCheckManHour;
            break;
          case "chargeAmount":
            sums[index] = data.totalChargeAmount;
            break;
          case "checkAmount":
            sums[index] = data.totalCheckAmount;
            break;
          case "commissionAmount":
            sums[index] = data.totalCommissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 材料合计
    getMaterialSummaries(param) {
      const { columns } = param;
      const data = this.materialTotal || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = data.totalQty;
            break;
          case "partAmount":
            sums[index] = data.totalAmount;
            break;
          case "commissionAmount":
            sums[index] = data.totalCommissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 选中行
    handleCurrentChange(row) {
      this.thisRow = row;
      if (row) {
        const params = {
          companyIds: this.searchForm.companyIds,
          companyId: row.companyId,
          staffType: row.staffType,
          staffId: row.staffId,
          billBusinessCategoryIds: this.searchForm.billBusinessCategoryIds
        };
        if (this.otherRange[0]) {
          params.startDate = this.otherRange
            ? dateFormat(this.otherRange[0])
            : null;
        }
        if (this.otherRange[1]) {
          params.endDate = this.otherRange
            ? dateFormat(this.otherRange[1])
            : null;
        }
        this.currentPage = 1;
        this.seachList(params, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    seachList(searchData, pagination) {
      this.loading2 = true;
      if (this.otherRange[0]) {
        searchData.startDate = this.otherRange
          ? dateFormat(this.otherRange[0])
          : null;
      }
      if (this.otherRange[1]) {
        searchData.endDate = this.otherRange
          ? dateFormat(this.otherRange[1])
          : null;
      }
      if (this.activeName == "workingHours") {
        techniciansItemList({ ...searchData, ...pagination })
          .then(res => {
            this.workingHoursTotal = res || {};
            this.workingHoursData = res.rows || [];
            this.totalSize1 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
      if (this.activeName == "workingHours-two") {
        this.workingHoursTotal = {};
        this.workingHoursData = [];
        techniciansReworkItemList({ ...searchData, ...pagination })
          .then(res => {
            this.workingHoursTotal = res || {};
            this.workingHoursData = res.rows || [];
            this.totalSize3 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
      if (this.activeName == "material") {
        techniciansPartList({ ...searchData, ...pagination })
          .then(res => {
            this.materialTotal = res || {};
            this.materialData = res.rows || [];
            this.totalSize2 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
      if (this.activeName == "material-two") {
        this.materialTotal = {};
        this.materialData = [];
        techniciansReworkPartList({ ...searchData, ...pagination })
          .then(res => {
            this.materialTotal = res || {};
            this.materialData = res.rows || [];
            this.totalSize4 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
    },
    handlePageChange(page) {
      if (!this.thisRow) {
        return false;
      }
      this.currentPage = page;
      const params = {
        companyIds: this.searchForm.companyIds,
        companyId: this.thisRow.companyId,
        staffType: this.thisRow.staffType,
        staffId: this.thisRow.staffId,
        billBusinessCategoryIds: this.searchForm.billBusinessCategoryIds
      };
      if (this.otherRange[0]) {
        params.startDate = this.otherRange
          ? dateFormat(this.otherRange[0])
          : null;
      }
      if (this.otherRange[1]) {
        params.endDate = this.otherRange
          ? dateFormat(this.otherRange[1])
          : null;
      }
      this.seachList(params, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // tab切换
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tabChange(tab, event) {
      // console.log(tab, event);
      if (this.thisRow && this.thisRow.companyId) {
        const params = {
          companyIds: this.searchForm.companyIds,
          companyId: this.thisRow.companyId,
          staffType: this.thisRow.staffType,
          staffId: this.thisRow.staffId,
          billBusinessCategoryIds: this.searchForm.billBusinessCategoryIds
        };
        if (this.otherRange[0]) {
          params.startDate = this.otherRange
            ? dateFormat(this.otherRange[0])
            : null;
        }
        if (this.otherRange[1]) {
          params.endDate = this.otherRange
            ? dateFormat(this.otherRange[1])
            : null;
        }
        this.currentPage = 1;
        this.seachList(params, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    openDialog(row) {
      // console.log(row);
      // console.log(e);
      this.billId = row.billId;
      this.showBillInfo = true;
    },
    reset() {
      if (this.echartsVisible) {
        this.myChart.resize();
      }
    },
    openEcharts() {
      this.echartsVisible = true;
      this.$nextTick(() => {
        //1.初始化
        const chartDom = document.getElementById("echart-box");
        this.myChart = echarts.init(chartDom);
        //2.配置数据
        const option = {
          color: ["#216699", "#f7742d", "#f7387d"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          legend: {
            data: ["提成金额"]
          },
          xAxis: [
            {
              type: "category",
              data: this.menArr,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "提成金额",
              interval: this.amountIndex,
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: {
                show: true
              }
            }
          ],
          series: [
            {
              name: "提成金额",
              type: "bar",
              barWidth: 30,
              data: this.amountArr
            }
          ]
        };
        // 3.传入数据
        this.myChart.setOption(option);
      });
    },
    outExoportHandle(sampleColums) {
      const data = { ...this.searchForm };
      data.startDate = "";
      data.endDate = "";
      if (this.otherRange[0]) {
        data.startDate = dateFormat(this.otherRange[0]);
      }
      if (this.otherRange[1]) {
        data.endDate = dateFormat(this.otherRange[1]);
      }
      return techniciansSummaryExport({
        ...data,
        columnsSettings: sampleColums
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.main-color {
  color: $color-primary;
  @include font_color("color-primary");
}
.el-card__header {
  padding: 8px;
  background: #fff;
  .header-tit {
    position: relative;
    padding-left: 10px;
    &::before {
      position: absolute;
      left: 0;
      top: 3px;
      display: inline-block;
      content: "";
      width: 4px;
      background: $color-primary;
      @include background_color("color-primary");
      height: 14px;
      margin-right: 5px;
      border-radius: 100px;
    }
  }
  .header-txt {
    float: right;
    color: $color-primary;
    @include font_color("color-primary");
  }
  .header-icon {
    float: right;
    cursor: pointer;
    margin-left: 10px;
    i {
      font-size: 20px;
      color: $color-primary;
      @include font_color("color-primary");
    }
    span {
      position: relative;
      top: -3px;
      padding: 0 10px 0 5px;
    }
  }
}
::v-deep {
  .el-card__header {
    padding: 8px;
  }
  .el-tabs {
    height: 100%;
    .el-tabs__nav {
      margin-left: 10px;
    }
    .el-tabs__content {
      height: 100%;
      padding: 5px;
      overflow: auto;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .el-card__body {
    height: calc(100% - 39px);
    padding: 5px;
  }
  .box-card .title {
    &::before {
      top: 3px;
    }
  }
  .el-tabs__header {
    margin-bottom: 5px !important;
  }
  .el-form-item,
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-table--border {
    border-right: 1px solid #e8eaef;
    border-bottom: 1px solid #e8eaef;
  }
  .wei-table {
    height: calc(100% - 45px);
  }
  .ht-table .table .el-table__footer-wrapper tbody td {
    color: #606266;
    text-align: left;
    font-weight: 400;
  }
  .pointer {
    cursor: pointer;
  }
}
</style>
