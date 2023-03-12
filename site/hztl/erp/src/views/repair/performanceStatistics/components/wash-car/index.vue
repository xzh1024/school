<template>
  <!-- 维修人员绩效统计-洗车人员 -->
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
        <el-button type="primary" size="small" @click="searchSubmit">
          查询（F5）
        </el-button>
        <el-button type="primary" size="small" @click="resetSubmit">
          重置（F6）
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="exportVisible = true"
          style="float:right;"
          v-if="
            hasBelongsPermWithoutRoute(
              'export',
              'repairs.achievementStatistics.washer'
            )
          "
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
            </span>
          </div>
          <ht-setting-table
            v-loading="loading"
            :data="summaryData"
            ref="summaryTable"
            :columns="summaryColumns"
            show-summary
            :selectedRows.sync="selectedRows"
            :summary-method="getWashCarListSummaries"
            @current-change="handleCurrentChange"
            table-name="wash-cars-summary-table"
            height="100%"
          />
        </el-card>
      </template>
      <template v-slot:block2>
        <el-card class="auto-block" style="background:#fff;height: 100%;">
          <div slot="header">
            <span class="header-tit">洗车明细</span>
          </div>
          <ht-setting-table
            class="wei-table"
            :data="washCarData"
            :columns="washCarColumns"
            show-summary
            :summary-method="getWashCarDetailSummaries"
            height="100%"
            table-name="wash-cars-table"
            pagination
            :total="totalSize"
            :current-page.sync="currentPage"
            @pageChange="handlePageChange"
          />
        </el-card>
      </template>
    </resize-box>

    <export-table
      :base-columns="summaryColumns"
      :default-data="summaryData"
      table-name="wash-cars-table-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="洗车绩效汇总"
      is-end-export
    />
    <ht-dialog
      title="洗车人员业绩图表"
      width="80%"
      :visible.sync="echartsVisible"
      custom-class="echarts-dialog"
    >
      <div id="echart-box" style="width: 100%;height:500px;"></div>
    </ht-dialog>
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

import { SUMMARY_COLUMNS, WASH_CARS_COLUMNS } from "../const/columns";
import { dateFormat } from "@/utils/date"; // 时间格式处理
import { userInfoMsg } from "@/utils/store"; // 用户信息
import { mapState } from "vuex";
import { getFinancialsCompanys } from "@/api/finance/basicSetting"; //公司信息
import { getSettings } from "@/api/basis/performance/index"; // 获取设置
import {
  washCarList,
  washCarDetail,
  achievementsExport
} from "@/api/repairs/performance";
import { ExportTable } from "@/components/table";
import resizeBox from "@/components/resizeBox";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "wash-cars",
  components: {
    ExportTable,
    resizeBox
  },
  data() {
    return {
      loading: false,
      loading2: false,
      companyOptions: [],
      searchForm: {},
      otherRange: [],
      summaryTotal: {},
      summaryData: [],
      selectedRows: [],
      summaryColumns: [...SUMMARY_COLUMNS],
      washCarTotal: {},
      washCarData: [],
      washCarColumns: [...WASH_CARS_COLUMNS],
      totalSize: 0,
      currentPage: 1,
      thisRow: {},
      exportVisible: false,
      echartsVisible: false,
      menArr: [],
      amountArr: [],
      amountIndex: 100,
      open: "",
      myChart: ""
    };
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
    this.getSettingDate();
  },
  activated() {
    this.getSetting();
    this.loadDate();
    this.getSettingDate();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    window.onresize = function() {
      _this.reset();
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
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
        this.getReceptionSummaryList();
        const data = { companyIds: [] };
        this.companyOptions.forEach(item => {
          data.companyIds.push(item.id);
        });
        this.getAll(data);
      });
    },
    getAll(data) {
      washCarList(data)
        .then(res => {
          this.menArr = [];
          this.amountArr = [];
          res.Rows.forEach(item => {
            this.menArr.push(item.staffName);
            this.amountArr.push(item.subCommissionAmount);
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
    getSetting() {
      const params1 = {
        module: "repair", // 模块
        type: "washerAchievementEnableType" // 类型-接待顾问绩效启用类型
      };
      getSettings(params1).then(res => {
        this.open = res.value || "none";
      });
    },
    // 获取汇总列表
    getReceptionSummaryList() {
      this.searchForm.companyId = 1798;
      const data = { ...this.searchForm };
      this.resList(data);
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
      washCarList({ ...searchData })
        .then(res => {
          this.summaryTotal = res || {};
          this.summaryData = res.Rows || [];
          this.washCarData = [];
          if (this.summaryData[0]) {
            this.selectedRows = this.summaryData.length
              ? [this.summaryData[0]]
              : [];
            this.handleCurrentChange(this.summaryData[0]);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchSubmit() {
      this.searchForm.companyId = 1798;
      this.resList(this.searchForm);
    },
    resetSubmit() {
      this.searchForm.companyIds = [userInfoMsg().companyId];
      this.otherRange = [];
      this.resList(this.searchForm);
    },
    getWashCarListSummaries(param) {
      const { columns } = param;
      const data = this.summaryTotal;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "subCount":
            sums[index] = data.totalCount;
            break;
          case "subCommissionAmount":
            sums[index] = data.totalCommissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    getWashCarDetailSummaries(param) {
      const { columns } = param;
      const data = this.washCarTotal;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "billCalcAmount":
            sums[index] = data.totalAmount;
            break;
          case "commissionAmount":
            sums[index] = data.TotalCommissionAmount;
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
          staffType: "washer",
          staffId: row.staffId
        };
        this.currentPage = 1;
        this.seachList(params, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    seachList(searchData, pagination) {
      this.loading2 = true;
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
      washCarDetail({ ...searchData, ...pagination })
        .then(res => {
          this.washCarTotal = res.Total || {};
          this.washCarData = res.rows || [];
          this.totalSize = res.totalSize || 0;
          this.loading2 = false;
        })
        .catch(() => {
          this.loading2 = false;
        });
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
        staffId: this.thisRow.staffId
      };
      this.seachList(params, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // tab切换
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tabChange(tab, event) {
      // console.log(tab, event);
      // this.activeName = tab.name;
      this.update();
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
      return achievementsExport({
        ...data,
        columnsSettings: sampleColums
      });
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
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
.title {
  &::before {
    top: 13px;
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
    height: calc(100% - 35px);
  }
  .ht-table .table .el-table__footer-wrapper tbody td {
    color: #606266;
    text-align: left;
    font-weight: 400;
  }
}
</style>
