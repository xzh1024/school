<template>
  <!-- 维修人员绩效统计-接待顾问 -->
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
          style="float:right;"
          v-if="
            hasBelongsPermWithoutRoute(
              'export',
              'repairs.achievementStatistics.reception'
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
          v-loading="loading"
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
            table-name="reception-summary-statistics"
            height="100%"
            @current-change="handleCurrentChange"
          >
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="分公司名称"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="staffName"
              label="接待顾问"
              width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="settleAmount"
              label="合计结算金额"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="taxedGrossProfit"
              label="合计毛利"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="taxedGrossProfitRate"
              label="合计毛利率"
              width="100"
            >
              <template slot-scope="scope">
                {{
                  Number(scope.row.taxedGrossProfitRate * 100).toFixed(2) + "%"
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="commissionAmount"
              label="合计提成金额"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="receptionTimes"
              label="合计接待台次"
              width="100"
            >
            </el-table-column>
            <el-table-column label="维修业务" align="center">
              <el-table-column
                prop="repairBill.receptionTimes"
                label="台次"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairBill.settleAmount"
                label="结算金额"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairBill.partTaxedCostAmount"
                label="材料成本"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairBill.itemTaxedCostAmount"
                label="项目成本"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairBill.taxedGrossProfit"
                label="毛利"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="taxedGrossProfitRate"
                label="毛利率"
                width="80"
              >
                <template slot-scope="scope">
                  {{
                    Number(scope.row.taxedGrossProfitRate * 100).toFixed(2) +
                      "%"
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="repairBill.commissionAmount"
                label="提成金额"
                width="80"
              >
              </el-table-column>
            </el-table-column>
            <el-table-column label="保险业务" align="center">
              <el-table-column
                prop="repairInsurance.receptionTimes"
                label="台次"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairInsurance.settleAmount"
                label="结算金额"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairInsurance.partTaxedCostAmount"
                label="材料成本"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairInsurance.itemTaxedCostAmount"
                label="项目成本"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairInsurance.taxedGrossProfit"
                label="毛利"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairInsurance.taxedGrossProfitRate"
                label="毛利率"
                width="80"
              >
                <template slot-scope="scope">
                  {{
                    Number(
                      scope.row.repairInsurance.taxedGrossProfitRate * 100
                    ).toFixed(2) + "%"
                  }}
                </template>
              </el-table-column>
              <el-table-column
                prop="repairInsurance.commissionAmount"
                label="提成金额"
                width="80"
              >
              </el-table-column>
            </el-table-column>
            <el-table-column label="洗车业务" align="center">
              <el-table-column
                prop="repairWashing.receptionTimes"
                label="台次"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairWashing.settleAmount"
                label="结算金额"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="repairWashing.commissionAmount"
                label="提成金额"
                width="80"
              >
              </el-table-column>
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
        >
          <el-tabs
            v-model="activeName"
            @tab-click="tabChange"
            v-loading="loading2"
          >
            <el-tab-pane name="maintenance" label="维修工单">
              <ht-setting-table
                class="wei-table"
                :data="maintenanceData"
                :columns="maintenanceColumns"
                show-summary
                :summary-method="getMaintenanceSummaries"
                height="100%"
                pagination
                :total="totalSize1"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
                table-name="maintenance-business"
              />
            </el-tab-pane>
            <el-tab-pane name="insurance" label="保险申请单">
              <ht-setting-table
                class="wei-table"
                :data="insuranceData"
                :columns="insuranceColumns"
                show-summary
                :summary-method="getInsuranceSummaries"
                height="100%"
                pagination
                :total="totalSize2"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
                table-name="insurance-apply"
              />
            </el-tab-pane>
            <el-tab-pane name="washcar" label="洗车单">
              <ht-setting-table
                class="wei-table"
                :data="washCarData"
                :columns="washCarColumns"
                show-summary
                :summary-method="getWashCarSummaries"
                height="100%"
                pagination
                :total="totalSize3"
                :current-page.sync="currentPage"
                @pageChange="handlePageChange"
                table-name="wash-car"
              />
            </el-tab-pane>
          </el-tabs>
        </ht-card>
      </template>
    </resize-box>
    <!-- 工单详情 -->
    <BillInfo
      :visible="showBillInfo"
      :billId="billId"
      @close="showBillInfo = false"
    />
    <!-- 保险单详情 -->
    <ht-dialog
      title="申请单详情"
      :visible.sync="insurancesDetailVisible"
      custom-class="insurances-dialog"
      width="1100px"
      top="5%"
      @close="insurancesDetailVisible = false"
    >
      <div class="insurances-detail">
        <div class="header" style="text-align:center;">
          <p>
            <span
              v-if="
                insurancesMsg.insuranceInfo &&
                  insurancesMsg.insuranceInfo.companyName
              "
            >
              「{{ insurancesMsg.insuranceInfo.companyName }}」
            </span>
            保险理赔申请单
          </p>
          <p style="text-align:right">
            <span
              class="no"
              v-if="
                insurancesMsg.insuranceInfo &&
                  insurancesMsg.insuranceInfo.billNo
              "
              >No. {{ insurancesMsg.insuranceInfo.billNo }}</span
            >
          </p>
        </div>
        <!-- 保单信息 -->
        <div>
          <div class="title">保单信息</div>
          <div class="content">
            <span class="msg-box">
              保险公司：
              <span
                class="clo9"
                v-if="
                  insurancesMsg.vehicleInfo &&
                    insurancesMsg.vehicleInfo.insuranceCompanyName
                "
              >
                {{ insurancesMsg.vehicleInfo.insuranceCompanyName }}
              </span>
            </span>
            <span class="msg-box">
              保单号：
              <span
                class="clo9"
                v-if="
                  insurancesMsg.insuranceInfo &&
                    insurancesMsg.insuranceInfo.insuranceNo
                "
              >
                {{ insurancesMsg.insuranceInfo.insuranceNo }}
              </span>
            </span>
            <span class="msg-box">
              绝对免赔率：
              <span
                class="clo9"
                v-if="
                  insurancesMsg.insuranceInfo &&
                    insurancesMsg.insuranceInfo.deductionRate
                "
              >
                {{
                  (
                    Number(insurancesMsg.insuranceInfo.deductionRate) * 100
                  ).toFixed(2) + "%"
                }}
              </span>
            </span>
          </div>
        </div>
        <!-- 车辆信息 -->
        <div>
          <div class="title">车辆信息</div>
          <div class="content" v-if="insurancesMsg.vehicleInfo">
            <span class="msg-box">
              车牌号：
              <span class="clo9">
                {{ insurancesMsg.vehicleInfo.plateNumber || "-" }}
              </span>
            </span>
            <span class="msg-box">
              车型：
              <span class="clo9">
                {{ insurancesMsg.vehicleInfo.vehicleGroup || "-" }}
              </span>
            </span>
            <span class="msg-box">
              车架号：
              <span class="clo9">
                {{ insurancesMsg.vehicleInfo.vin || "-" }}
              </span>
            </span>
            <span class="msg-box">
              发动机号：
              <span class="clo9">
                {{ insurancesMsg.vehicleInfo.engine || "-" }}
              </span>
            </span>
          </div>
        </div>
        <!-- 报案信息 -->
        <div>
          <div class="title">报案信息</div>
          <div class="content" v-if="insurancesMsg.insuranceInfo">
            <span class="msg-box">
              报案人：
              <span class="clo9">
                {{ insurancesMsg.insuranceInfo.reporter || "-" }}
              </span>
            </span>
            <span class="msg-box">
              报案号：
              <span class="clo9">
                {{ insurancesMsg.insuranceInfo.reportNo || "-" }}
              </span>
            </span>
            <span class="msg-box">
              出险时间：
              <span class="clo9">
                {{ insurancesMsg.insuranceInfo.accidentTime || "-" }}
              </span>
            </span>
            <span class="msg-box">
              出险地点：
              <span class="clo9">
                {{ insurancesMsg.insuranceInfo.accidentAddress || "-" }}
              </span>
            </span>
            <span class="msg-box">
              理赔人：
              <span class="clo9">
                {{ insurancesMsg.insuranceInfo.receptionManName || "-" }}
              </span>
            </span>
          </div>
        </div>
        <!-- 维修项目 -->
        <div>
          <div class="title">维修项目信息</div>
          <div class="content">
            <table cellspacing="0">
              <tr>
                <th align="left" width="150">项目编码</th>
                <th align="left" width="250">项目名称</th>
                <th align="right" width="120">索赔工时</th>
                <th align="right" width="120">工时单价</th>
                <th align="right" width="120">索赔金额</th>
                <th align="left" style="padding-left: 40px">备注</th>
              </tr>
              <tr v-for="(item, ind) in insurancesMsg.item" :key="ind">
                <td align="left">
                  {{ item.itemCode || "-" }}
                </td>
                <td align="left">
                  {{ item.itemName || "-" }}
                </td>
                <td align="right">
                  {{ item.chargeManHour || "-" }}
                </td>
                <td align="right">
                  {{ item.manHourPrice || "-" }}
                </td>
                <td align="right">
                  {{ item.amount || "-" }}
                </td>
                <td align="left" style="padding-left: 40px">
                  {{ item.remark || "-" }}
                </td>
              </tr>
            </table>

            <div class="total" v-if="insurancesMsg.insuranceInfo">
              <span>小计</span>
              <span>
                {{ insurancesMsg.insuranceInfo.totalChargeManHour || "-" }}
              </span>
            </div>
          </div>
        </div>
        <!-- 维修配件信息 -->
        <div>
          <div class="title">维修配件信息</div>
          <div class="content">
            <table cellspacing="0">
              <tr>
                <th align="left" width="150">配件编码</th>
                <th align="left" width="250">配件名称</th>
                <th align="right" width="120">数量</th>
                <th align="right" width="120">单价</th>
                <th align="right" width="120">索赔金额</th>
                <th align="left" style="padding-left: 40px">备注</th>
              </tr>
              <tr v-for="(item, ind) in insurancesMsg.parts" :key="ind">
                <td align="left">
                  {{ item.code || "-" }}
                </td>
                <td align="left">
                  {{ item.name || "-" }}
                </td>
                <td align="right">
                  {{ item.qty || "-" }}
                </td>
                <td align="right">
                  {{ item.price || "-" }}
                </td>
                <td align="right">
                  {{ item.amount || "-" }}
                </td>
                <td align="left" style="padding-left: 40px">
                  {{ item.remark || "-" }}
                </td>
              </tr>
            </table>

            <div class="total" v-if="insurancesMsg.insuranceInfo">
              <span>小计</span>
              <span>
                {{ insurancesMsg.insuranceInfo.totalChargeParts || "-" }}
              </span>
            </div>
          </div>
        </div>
        <!-- 合计费用 -->
        <div>
          <div class="title">合计费用</div>
          <div class="content">
            <table cellspacing="0">
              <tr>
                <th align="left" width="645">费用类型</th>
                <th align="right" width="120">费用金额</th>
                <th></th>
              </tr>
              <tr v-if="insurancesMsg.insuranceInfo">
                <td align="left">
                  工费金额
                </td>
                <td align="right">
                  {{ insurancesMsg.insuranceInfo.totalChargeManHour || "-" }}
                </td>
                <td></td>
              </tr>
              <tr v-if="insurancesMsg.insuranceInfo">
                <td align="left">
                  料费金额
                </td>
                <td align="right">
                  {{ insurancesMsg.insuranceInfo.totalChargeParts || "-" }}
                </td>
                <td></td>
              </tr>
              <tr v-if="insurancesMsg.insuranceInfo">
                <td align="left">
                  其他费用
                </td>
                <td align="right">
                  {{ insurancesMsg.insuranceInfo.otherCharge || "-" }}
                </td>
                <td></td>
              </tr>
            </table>

            <div class="total total2" v-if="insurancesMsg.insuranceInfo">
              <span>合计</span>
              <span>
                {{ insurancesMsg.insuranceInfo.amount || "-" }}
              </span>
            </div>
          </div>
        </div>
        <div style="text-align:right;color: #909399;padding: 30px 0 0">
          思锐软件 （010）60219478/60219479
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button size="small" @click="insurancesDetailVisible = false">
          关 闭（Esc）
        </el-button>
      </div>
    </ht-dialog>
    <!-- 图表 -->
    <ht-dialog
      title="接待顾问业绩图表"
      width="80%"
      :visible.sync="echartsVisible"
      custom-class="echarts-dialog"
    >
      <div id="echart-box" style="width: 100%;height:500px;"></div>
    </ht-dialog>
    <export-table
      :base-columns="summaryColumns"
      :default-data="summaryData"
      table-name="reception-consultant-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="接待顾问"
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
  MAINTENANCE_SUMMARY_COLUMNS,
  MAINTENANCE_COLUMNS,
  INSURANCE_COLUMNS,
  WASH_CAR_COLUMNS
} from "../const/columns";
import { dateFormat } from "@/utils/date"; // 时间格式处理
import { userInfoMsg } from "@/utils/store"; // 用户信息
import { mapState } from "vuex";
import { getFinancialsCompanys } from "@/api/finance/basicSetting"; //公司信息
import {
  receptionSummaryList,
  receptionSummaryExport,
  receptionBillList,
  insurancesList,
  insurancesDetail,
  washCarDetail
} from "@/api/repairs/performance";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import BillInfo from "@/components/repair/BillInfo/BillInfo"; // 工单详情
import { getSettings } from "@/api/basis/performance/index"; // 获取设置
import resizeBox from "@/components/resizeBox";
import { ExportTable } from "@/components/table";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "reception-consultant",
  components: { BillInfo, resizeBox, ExportTable },
  data() {
    return {
      loading: false,
      loading2: false,
      activeName: "maintenance",
      companyOptions: [],
      searchForm: {},
      otherRange: [],
      summaryTotal: {},
      summaryData: [], // 汇总统计表格
      summaryColumns: [...MAINTENANCE_SUMMARY_COLUMNS],
      selectedRows: [],
      exportVisible: false,
      maintenanceTotal: {},
      maintenanceData: [],
      maintenanceColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
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
        ...MAINTENANCE_COLUMNS
      ],
      insuranceTotal: {},
      insuranceData: [],
      insuranceColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "sourceBillNo",
          label: "理赔申请单号",
          width: CELL_WIDTH.no,
          render: (value, row) => (
            <div>
              <span
                class="main-color pointer"
                on-click={e => this.openDialog2(row, e)}
              >
                {value}
              </span>
            </div>
          )
        },
        ...INSURANCE_COLUMNS
      ],
      washCarTotal: {},
      washCarData: [],
      washCarColumns: [...WASH_CAR_COLUMNS],
      totalSize1: 0,
      totalSize2: 0,
      totalSize3: 0,
      currentPage: 1,
      thisRow: {},
      billId: 0,
      showBillInfo: false,
      insurancesDetailVisible: false, // 保险理赔申请单详情
      insurancesMsg: {},
      echartsVisible: false,
      menArr: [],
      amountArr: [],
      amountIndex: 100,
      profitArr: [],
      profitRateArr: [],
      open: "",
      settingDetail: "",
      setting: {},
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
      });
    },
    getSetting() {
      const params1 = {
        module: "repair", // 模块
        type: "receptionAchievementEnableType" // 类型-接待顾问绩效启用类型
      };
      getSettings(params1).then(res => {
        this.settingDetail = "";
        this.open = res.value || "";
        if (res.value == "unified") {
          const params2 = {
            module: "repair", // 模块
            type: "receptionUnifiedAchievement" // 类型-接待顾问绩效启用类型-统一
          };
          getSettings(params2).then(res2 => {
            this.setting = res2.value || {};
            this.settingCheck();
          });
        }
        if (res.value == "ladder") {
          const params3 = {
            module: "repair", // 模块
            type: "receptionLadderAchievement" // 类型-接待顾问绩效启用类型-阶梯
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
        if (this.activeName == "maintenance") {
          this.settingDetail =
            this.setting.repair.base == "settleAmount"
              ? "（按结算金额）"
              : this.setting.repair.base == "grossProfit"
              ? "（按毛利）"
              : "";
        }
        if (this.activeName == "insurance") {
          this.settingDetail =
            this.setting.insurance.base == "settleAmount"
              ? "（按结算金额）"
              : this.setting.insurance.base == "grossProfit"
              ? "（按毛利）"
              : "";
        }
        if (this.activeName == "washcar") {
          this.settingDetail =
            this.setting.washing.base == "settleAmount" ? "（按结算金额）" : "";
        }
      }
    },
    // 获取汇总列表
    getReceptionSummaryList() {
      const data = { ...this.searchForm };
      this.resList(data);
    },
    getAll() {
      receptionSummaryList()
        .then(res => {
          this.menArr = [];
          this.amountArr = [];
          this.profitArr = [];
          this.profitRateArr = [];
          res.rows.forEach(item => {
            this.menArr.push(item.staffName);
            this.amountArr.push(item.taxedAmount);
            this.profitArr.push(item.taxedGrossProfit);
            this.profitRateArr.push(
              Number(item.taxedGrossProfitRate * 100).toFixed(2)
            );
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
      this.thisRow = {};
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
      receptionSummaryList({ ...searchData })
        .then(res => {
          this.summaryTotal = res || {};
          this.summaryData = res.rows || [];
          this.maintenanceData = [];
          this.insuranceData = [];
          this.washCarData = [];
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
    // 汇总统计-合计处理
    getSummaryPartSummaries(param) {
      const { columns } = param;
      const data = this.summaryTotal || {};
      if (data == {}) {
        return [];
      }
      const totalRepairBill = data.totalRepairBill || {};
      const totalRepairInsurance = data.totalRepairInsurance || {};
      const totalRepairWashing = data.totalRepairWashing || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "settleAmount":
            sums[index] = data.settleAmount;
            break;
          case "taxedGrossProfit":
            sums[index] = data.taxedGrossProfit;
            break;
          case "receptionTimes":
            sums[index] = data.receptionTimes;
            break;
          case "commissionAmount":
            sums[index] = data.commissionAmount;
            break;
          case "repairBill.receptionTimes":
            sums[index] = totalRepairBill.receptionTimes;
            break;
          case "repairBill.settleAmount":
            sums[index] = totalRepairBill.settleAmount;
            break;
          case "repairBill.partTaxedCostAmount":
            sums[index] = totalRepairBill.partTaxedCostAmount;
            break;
          case "repairBill.itemTaxedCostAmount":
            sums[index] = totalRepairBill.itemTaxedCostAmount;
            break;
          case "repairBill.taxedGrossProfit":
            sums[index] = totalRepairBill.taxedGrossProfit;
            break;
          case "repairBill.commissionAmount":
            sums[index] = totalRepairBill.commissionAmount;
            break;
          case "repairInsurance.receptionTimes":
            sums[index] = totalRepairInsurance.receptionTimes;
            break;
          case "repairInsurance.settleAmount":
            sums[index] = totalRepairInsurance.settleAmount;
            break;
          case "repairInsurance.partTaxedCostAmount":
            sums[index] = totalRepairInsurance.partTaxedCostAmount;
            break;
          case "repairInsurance.itemTaxedCostAmount":
            sums[index] = totalRepairInsurance.itemTaxedCostAmount;
            break;
          case "repairInsurance.taxedGrossProfit":
            sums[index] = totalRepairInsurance.taxedGrossProfit;
            break;
          case "repairInsurance.commissionAmount":
            sums[index] = totalRepairInsurance.commissionAmount;
            break;
          case "repairWashing.receptionTimes":
            sums[index] = totalRepairWashing.receptionTimes;
            break;
          case "repairWashing.settleAmount":
            sums[index] = totalRepairWashing.settleAmount;
            break;
          case "repairWashing.commissionAmount":
            sums[index] = totalRepairWashing.commissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 维修工单-合计处理
    getMaintenanceSummaries(param) {
      const { columns } = param;
      const data = this.maintenanceTotal || {};
      if (data == {}) {
        return [];
      }
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "itemTaxedAmount": // 结算工费
            sums[index] = data.totalItemTaxedAmount;
            break;
          case "partTaxedAmount": // 结算料费
            sums[index] = data.totalPartTaxedAmount;
            break;
          case "extraFeeTaxedAmount": // 其他费用
            sums[index] = data.totalExtraFeeTaxedCostAmount;
            break;
          case "taxAmount": // 税金
            sums[index] = data.totalTaxAmount;
            break;
          case "discountAmount": // 优惠金额
            sums[index] = data.totalDiscountAmount;
            break;
          case "eraseAmount": // 抹零金额
            sums[index] = data.totalEraseAmount;
            break;
          case "dueAmount": // 结算金额
            sums[index] = data.totalDueAmount;
            break;
          case "partTaxedCostAmount": // 材料成本
            sums[index] = data.totalPartTaxedCostAmount;
            break;
          case "itemTaxedCostAmount": // 项目成本
            sums[index] = data.totalItemTaxedCostAmount;
            break;
          case "taxedGrossProfit": // 毛利
            sums[index] = data.totalTaxedGrossProfit;
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
    // 保险申请单-合计处理
    getInsuranceSummaries(param) {
      const { columns } = param;
      const data = this.insuranceTotal || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "totalChargeManHour":
            sums[index] = data.sumTotalChargeManHour;
            break;
          case "totalChargeParts":
            sums[index] = data.sumTotalChargeParts;
            break;
          case "otherCharge":
            sums[index] = data.sumOtherCharge;
            break;
          case "billCalcAmount":
            sums[index] = data.sumBillCalcAmount;
            break;
          case "totalCostChargeParts":
            sums[index] = data.sumTotalCostChargeParts;
            break;
          case "totalCostChargeManHour":
            sums[index] = data.sumTotalCostChargeManHour;
            break;
          case "taxedGrossProfit":
            sums[index] = data.sumTaxedGrossProfit;
            break;
          case "commissionAmount":
            sums[index] = data.sumCommissionAmount;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 洗车单-合计处理
    getWashCarSummaries(param) {
      const { columns } = param;
      const data = this.washCarTotal || {};
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
          staffType: row.staffType,
          staffId: row.staffId
        };
        params.startDate = "";
        params.endDate = "";
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
      if (this.activeName == "maintenance") {
        receptionBillList({ ...searchData, ...pagination })
          .then(res => {
            this.maintenanceTotal = res || {};
            this.maintenanceData = res.rows || [];
            this.totalSize1 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
      if (this.activeName == "insurance") {
        insurancesList({ ...searchData, ...pagination })
          .then(res => {
            this.insuranceTotal = res.total || {};
            this.insuranceData = res.rows || [];
            this.totalSize2 = res.totalSize;
            this.loading2 = false;
          })
          .catch(() => {
            this.loading2 = false;
          });
      }
      if (this.activeName == "washcar") {
        washCarDetail({ ...searchData, ...pagination })
          .then(res => {
            this.washCarTotal = res.Total || {};
            this.washCarData = res.rows || [];
            this.totalSize3 = res.totalSize;
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
      if (this.thisRow && this.thisRow.companyId) {
        const params = {
          companyIds: this.searchForm.companyIds,
          companyId: this.thisRow.companyId,
          staffType: this.thisRow.staffType,
          staffId: this.thisRow.staffId
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
      this.settingCheck();
    },
    openDialog(row) {
      // console.log(row);
      // console.log(e);
      this.billId = row.billId;
      this.showBillInfo = true;
    },
    openDialog2(row) {
      insurancesDetail({ id: row.sourceBillId, type: "detail" }).then(res => {
        this.insurancesMsg = res;
        this.insurancesDetailVisible = true;
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
            data: ["结算金额", "毛利", "毛利率"]
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
              name: "结算金额",
              interval: this.amountIndex,
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: {
                show: true
              }
            },
            {
              type: "value",
              name: "毛利率",
              interval: 10,
              axisLabel: {
                formatter: "{value} %"
              },
              axisLine: {
                show: true
              }
            }
          ],
          series: [
            {
              name: "结算金额",
              type: "bar",
              barWidth: 30,
              data: this.amountArr
            },
            {
              name: "毛利",
              type: "bar",
              barWidth: 30,
              data: this.profitArr
            },
            {
              name: "毛利率",
              type: "line",
              yAxisIndex: 1,
              data: this.profitRateArr
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
      return receptionSummaryExport({
        ...data,
        columnsSettings: sampleColums
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
  .main-color {
    color: $color-primary;
    @include font_color("color-primary");
  }
  .pointer {
    cursor: pointer;
  }
  .insurances-dialog {
    background: #f5f5f5;
    .el-dialog__body {
      padding: 20px 30px;
    }
  }
  // 保险理赔申请单详情
  .insurances-detail {
    background: #fff;
    padding: 10px 20px;
    box-shadow: 5px 5px 5px #eee;
    border-radius: 4px;
    .header {
      font-size: 20px;
      padding: 20px 0 10px;
      p {
        margin: 10px 0;
      }
      .no {
        font-size: 14px;
        color: #909399;
      }
    }
    .title {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      font-size: 14px;
      font-weight: bold;
      background: rgba(232, 235, 238, 1);
    }
    .content {
      overflow: hidden;
      padding: 10px;
      .msg-box {
        float: left;
        margin: 5px 30px 5px 0;
        .clo9 {
          color: #909399;
        }
      }
      table {
        width: 100%;
        tr {
          th {
            height: 30px;
            line-height: 30px;
            padding: 0 20px 0 0;
            border-bottom: 2px solid #606266;
          }
          td {
            line-height: 20px;
            padding: 6px 20px 6px 0;
            color: #909399;
          }
        }
      }
      .total {
        margin-top: 10px;
        border-top: 1px dashed #909399;
        span {
          line-height: 40px;
          &:first-child {
            padding-left: 550px;
          }
          &:last-child {
            display: inline-block;
            width: 165px;
            text-align: right;
          }
        }
      }
      .total2 {
        border-top: 1px solid #909399;
        font-weight: bold;
      }
    }
  }
}
</style>
