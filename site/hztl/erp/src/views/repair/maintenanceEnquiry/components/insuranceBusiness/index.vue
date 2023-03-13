<template>
  <!-- 维修综合查询-保险业务 -->
  <div class="wrap flex-container column-flex" v-loading="loading">
    <ht-card style="background: #fff">
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="60px"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="分公司" label-width="100px">
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
            <el-form-item label="客户名称" label-width="100px">
              <cooperatorsSelect
                v-model="searchForm.cooperatorId"
                :clearable="false"
                :default-value.sync="searchForm.customerName"
                size="mini"
                :allow-create="
                  hasCompletePerm('basics.cooperators.createCustomer')
                "
                no-data-tips="没有查询到客户,回车新增"
                type="customer"
                class="switch-focus focus-cooperatorId"
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label-width="100px">
              <ht-select
                slot="label"
                v-model="searchForm.dateType"
                :options="DATE_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range v-model="otherRange" />
            </el-form-item>
            <el-form-item label="申请单号" label-width="100px">
              <ht-input
                v-model="searchForm.BillNo"
                size="mini"
                placeholder="申请单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="单据状态" label-width="70px">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="searchForm.status"
                :options="statusOptions"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="结算人" label-width="70px">
              <ht-input
                v-model="searchForm.settlementKey"
                size="mini"
                placeholder="结算人"
              />
            </el-form-item>
            <el-form-item label="报案人" label-width="70px">
              <ht-input
                v-model="searchForm.reporter"
                size="mini"
                placeholder="报案人"
              />
            </el-form-item>
            <el-form-item label="报案号" label-width="70px">
              <ht-input
                v-model="searchForm.reportNo"
                size="mini"
                placeholder="报案号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户联系人" label-width="80px">
              <ht-input
                v-model="searchForm.contactName"
                size="mini"
                placeholder="客户联系人"
              />
            </el-form-item>
            <el-form-item label="出险地点" label-width="80px">
              <ht-input
                v-model="searchForm.accidentAddress"
                size="mini"
                placeholder="出险地点"
              />
            </el-form-item>
            <el-form-item label="保险公司" label-width="80px">
              <!-- <ht-select
                filterable
                v-model="searchForm.insuranceCompanyId"
                :options="insuranceCompany"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="保险公司"
                highlight-first-item
                has-selecte-all-val
              /> -->
              <el-select
                filterable
                clearable
                remote
                reserve-keyword
                v-model="searchForm.insuranceCompanyId"
                size="small"
                placeholder="请选择"
                :remote-method="remoteMethod"
                :loading="manLoading"
              >
                <el-option
                  v-for="item in insuranceCompany"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保单号" label-width="80px">
              <ht-input
                v-model="searchForm.insuranceNo"
                size="mini"
                placeholder="保单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="工单号" label-width="70px">
              <ht-input
                v-model="searchForm.orderBillNo"
                size="mini"
                placeholder="工单号"
              />
            </el-form-item>
            <el-form-item label="车牌号" label-width="70px">
              <ht-input
                v-model="searchForm.plateNumber"
                size="mini"
                placeholder="车牌号"
              />
            </el-form-item>
            <el-form-item label="车架号" label-width="70px">
              <ht-input
                v-model="searchForm.vin"
                size="mini"
                placeholder="车架号"
              />
            </el-form-item>
            <el-form-item label="发动机号" label-width="70px">
              <ht-input
                v-model="searchForm.engineNo"
                size="mini"
                placeholder="发动机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: left;margin-top: 28px;width: 150px">
              <el-button
                type="primary"
                size="small"
                @click.stop="resetForm"
                style="margin-left:10px"
              >
                重置（F6）
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click.stop="handleSearch"
                style="margin-top:5px"
              >
                查询（F5）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card style="margin: 5px 0;background: #fff">
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length == 0"
        @click="openDialog"
      >
        申请单详情（F3）
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length == 0"
        v-if="hasBelongsPerm('repairs.comprehensive.insurance.print')"
        @click="print"
      >
        打印（F10）
      </el-button>
      <el-button type="primary" size="small" @click="exportVisible = true">
        导出（Alt+D）
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length == 0"
        @click="clickHistory"
      >
        维修履历
      </el-button>
    </ht-card>
    <div class="auto-block">
      <ht-setting-table
        v-loading="loading"
        :data="tableData"
        setting-all-column
        show-table-setting
        :columns="tableColumns"
        show-summary
        :summary-method="getSummaries"
        pagination
        :total="totalSize"
        :selected-rows.sync="selectedRows"
        @row-dblclick="selectChange"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        @sort-change="handleSortChange"
        table-name="insurance-business-table"
      />
    </div>
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
            <span>
              {{
                insurancesMsg.insuranceInfo
                  ? insurancesMsg.insuranceInfo.companyName
                    ? `「${insurancesMsg.insuranceInfo.companyName}」`
                    : ""
                  : ""
              }}
            </span>
            保险理赔申请单
          </p>
          <p style="text-align:right">
            <span class="no">
              No.
              {{
                insurancesMsg.insuranceInfo
                  ? insurancesMsg.insuranceInfo.billNo
                    ? insurancesMsg.insuranceInfo.billNo
                    : ""
                  : ""
              }}
            </span>
          </p>
        </div>
        <!-- 保单信息 -->
        <div>
          <div class="title">保单信息</div>
          <div class="content">
            <span class="msg-box">
              保险公司：
              <span class="clo9">
                {{
                  insurancesMsg.vehicleInfo
                    ? insurancesMsg.vehicleInfo.insuranceCompanyName
                      ? insurancesMsg.vehicleInfo.insuranceCompanyName
                      : ""
                    : ""
                }}
              </span>
            </span>
            <span class="msg-box">
              保单号：
              <span class="clo9">
                {{
                  insurancesMsg.insuranceInfo
                    ? insurancesMsg.insuranceInfo.insuranceNo
                      ? insurancesMsg.insuranceInfo.insuranceNo
                      : ""
                    : ""
                }}
              </span>
            </span>
            <span class="msg-box">
              绝对免赔率：
              <span class="clo9">
                {{
                  insurancesMsg.insuranceInfo
                    ? insurancesMsg.insuranceInfo.deductionRate
                      ? Number(
                          insurancesMsg.insuranceInfo.deductionRate * 100
                        ).toFixed(2) + "%"
                      : ""
                    : ""
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
                {{ insurancesMsg.vehicleInfo.engineNo || "-" }}
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
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :orderInfo="orderInfo"
      @close="showHistory = false"
    />
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="insurance-business-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="保险业务"
      is-end-export
    />
  </div>
</template>
<script>
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
import { mapState } from "vuex";
import { getFinancialsCompanys } from "@/api/finance/basicSetting";
// import { baseDictionary } from "@/api/base/base"; // 基础信息
import { INSURANCE_BUSINESS_COLUMNS } from "../const/columns";
import eventBus from "@/event";
import { dateFormat } from "@/utils/date";
import { CooperatorsSelect } from "@/components/select"; // 客户信息
// import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { ORDER_STATUS } from "../../../workOrder/const/columns"; // 工单状态
import { searchAllCooperators } from "@/api/communion/communion"; // 保险公司
import {
  getInsurancesList,
  getInsurancesListExport
} from "@/api/repairs/bills";

import { insurancesDetail } from "@/api/repairs/performance";
import RepaireHistory from "@/components/repair/repairHistory/repairHistory"; // 维修履历
import { ExportTable } from "@/components/table";
import { setTableSort, openNewWindow } from "@/utils/tool";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

const DATE_TYPES = [
  { id: "ApplicationDate", name: "申请日期" },
  { id: "SettledDate", name: "结算日期" },
  { id: "RepairReceptionDate", name: "维修接待日期" },
  { id: "inspect", name: "维修完检日期" },
  { id: "settleConfirm", name: "维修结算确认日期" },
  { id: "settle", name: "维修收款交车日期" }
];

export default {
  name: "insurance-business",
  props: ["status"],
  components: {
    CooperatorsSelect,
    RepaireHistory,
    ExportTable
  },
  data() {
    return {
      loading: false,
      manLoading: true,
      plateNumber: "", // 车牌号
      searchForm: {
        dateType: "ApplicationDate"
      },
      orderStatus: ORDER_STATUS,
      statusOptions: [
        {
          id: "待结算",
          name: "待结算"
        },
        {
          id: "已完成",
          name: "已完成"
        }
      ],
      DATE_TYPES, // 时间类型
      otherRange: [], // 时间数组
      companyOptions: [], // 公司列表
      // userOptions: [], // 回访人列表
      // repairBusinessCategoryList: [], // 业务类型
      insuranceCompany: [], // 保险公司
      tableColumns: [...INSURANCE_BUSINESS_COLUMNS],
      tableData: [],
      totalData: {},
      totalSize: 0,
      currentPage: 1,
      selectedRows: [],
      showHistory: false, // 维修履历
      orderInfo: {},
      exportVisible: false,
      insurancesDetailVisible: false, // 保险申请单
      insurancesMsg: {},
      sort: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.getSettingDate();
  },
  created() {
    this.loadData();
    this.getSettingDate();
  },
  activated() {
    this.loadData();
    this.getSettingDate();
  },
  methods: {
    getSettingDate() {
      const params = {
        module: "common",
        type: "queryDefaultMonths"
      };
      getSystemParamsDetail(params).then(res => {
        console.log(res);
        let date = [];
        res.companyParams.forEach(item => {
          if (item.id == userMsg().userInfoMsg.companyId) {
            date = defaultDateRange.getSumDefaultDateRange(item.value);
          }
        });
        this.otherRange = date;
      });
    },
    loadData() {
      // 获取公司列表
      getFinancialsCompanys().then(res => {
        this.companyOptions = res || [];
      });
      // 业务类型
      // baseDictionary({ type: "repairBusinessCategory" }).then(res => {
      //   this.repairBusinessCategoryList = res.options;
      // });
      // 获取保险公司
      searchAllCooperators({
        type: "insuranceCompany",
        allcoop: false
      }).then(res => {
        this.insuranceCompany = res || [];
      });
      // this.getUsers();
      this.handleSearch();
    },
    // 动态获取用户
    remoteMethod(query) {
      if (query !== "") {
        this.manLoading = true;
        setTimeout(() => {
          this.manLoading = false;
          searchAllCooperators({
            keyword: query,
            type: "insuranceCompany",
            allcoop: false
          }).then(res => {
            this.insuranceCompany = res || [];
          });
        }, 200);
      } else {
        searchAllCooperators({
          type: "insuranceCompany",
          allcoop: false
        }).then(res => {
          this.insuranceCompany = res || [];
        });
      }
    },
    // 获取用户信息
    // getUsers() {
    //   const params = {
    //     roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
    //   };
    //   searchTypeStaffs(params).then(res => {
    //     this.userOptions = res;
    //   });
    // },
    // 搜索数据处理
    resList(searchData, pagination) {
      this.loading = true;
      searchData.startDate = "";
      searchData.endDate = "";
      searchData.sort = this.sort;
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
      getInsurancesList({ ...searchData, ...pagination })
        .then(res => {
          this.totalData = res || {};
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize || 0;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
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
          case "totalManHour":
            sums[index] = data.totalManHour;
            break;
          case "totalChargeManHour":
            sums[index] = data.totalChargeManHour;
            break;
          case "partsCount":
            sums[index] = data.partsCount;
            break;
          case "totalChargeParts":
            sums[index] = data.totalChargeParts;
            break;
          case "otherCharge":
            sums[index] = data.otherCharge;
            break;
          case "amount":
            sums[index] = data.amount;
            break;
          case "totalCostChargeManHour":
            sums[index] = data.totalCostChargeManHour;
            break;
          case "totalCostChargeParts":
            sums[index] = data.totalCostChargeParts;
            break;
          case "untaxedTotalCostChargeParts":
            sums[index] = data.untaxedTotalCostChargeParts;
            break;
          case "taxedGrossProfit":
            sums[index] = data.taxedGrossProfit;
            break;
          case "untaxedGrossProfit":
            sums[index] = data.untaxedGrossProfit;
            break;
          default:
            break;
        }
      });
      return sums;
    },
    // 搜索
    handleSearch() {
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 重置
    resetForm() {
      this.searchForm = {
        dateType: "ApplicationDate"
      };
      this.otherRange = [];
      this.plateNumber = "";
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    openDialog() {
      insurancesDetail({ id: this.selectedRows[0].id, type: "detail" }).then(
        res => {
          this.insurancesMsg = res || {};
          this.insurancesDetailVisible = true;
        }
      );
    },
    companyName(id) {
      let companyName = "-";
      this.companyOptions.forEach(item => {
        if (item.id == id) {
          companyName = item.name;
        }
      });
      return companyName;
    },
    clickHistory() {
      this.orderInfo = this.selectedRows[0];
      this.orderInfo.vehicle = {};
      this.orderInfo.vehicle.vehicleId = this.selectedRows[0].vehicleId;
      this.orderInfo.vehicle.plateNumber = this.selectedRows[0].plateNumber;
      this.showHistory = true;
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
      return getInsurancesListExport({
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
    },
    selectChange(e) {
      this.$emit("selectChange", e);
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    print() {
      console.log(this.selectedRows);
      const id = this.selectedRows[0].id;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/repair/insurance/" + id
        }).href,
        "print"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .ht-table .table .el-table__footer-wrapper tbody td {
    text-align: left;
  }
  .operation {
    .back {
      margin-right: 5px;
      color: $color-primary;
      @include font_color("color-primary");
      cursor: pointer;
    }
    .transfer {
      color: #f7742d;
      cursor: pointer;
    }
    .see {
      color: $color-primary;
      @include font_color("color-primary");
      cursor: pointer;
    }
  }
  .txt-color {
    color: $color-primary;
    @include font_color("color-primary");
  }
  .transfer-dialog .el-dialog__footer {
    text-align: center;
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
