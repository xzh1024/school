<template>
  <!-- 维修综合查询-维修业务 -->
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
          <el-col :span="4">
            <el-form-item label="分公司" prop="billNo" label-width="110px">
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
            <el-form-item label="车牌号" label-width="110px">
              <ht-input v-model="searchForm.plateNumber" placeholder="车牌号" />
            </el-form-item>
            <el-form-item label="客户名称/电话" label-width="110px">
              <ht-input
                v-model="searchForm.cooperator"
                placeholder="客户名称/电话"
              />
            </el-form-item>
            <el-form-item label="送修人/电话" label-width="110px">
              <ht-input
                v-model="searchForm.contacts"
                size="mini"
                placeholder="送修人/电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="工单号" label-width="90px">
              <ht-input v-model="searchForm.billNo" placeholder="工单号" />
            </el-form-item>
            <el-form-item label="业务类型" label-width="90px">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="searchForm.businessCategoryIds"
                :options="repairBusinessCategoryList"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="工单状态" label-width="90px">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="searchForm.statuses"
                :options="orderStatus"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label-width="90px">
              <ht-select
                slot="label"
                v-model="searchForm.manType"
                :options="USER_TYPES"
                :clearable="false"
                class="date-label"
              />
              <!-- <ht-select
                filterable
                multiple
                collapse-tags
                v-model="searchForm.men"
                :options="userOptions2"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
                highlight-first-item
                has-selecte-all-val
              /> -->
              <el-select
                filterable
                clearable
                remote
                reserve-keyword
                v-model="searchForm.men"
                size="small"
                placeholder="请选择"
                :remote-method="remoteMethod"
                :loading="manLoading"
              >
                <el-option
                  v-for="item in userOptions2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
            <el-form-item label-width="100px">
              <ht-select
                slot="label"
                v-model="searchForm.remarkType"
                :options="REMARK_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-input v-model="searchForm.remark" placeholder="备注" />
            </el-form-item>
            <el-form-item label="车架号" label-width="100px">
              <ht-input v-model="searchForm.vin" placeholder="车架号" />
            </el-form-item>
            <el-form-item label="发动机号" label-width="100px">
              <ht-input v-model="searchForm.engineNo" placeholder="发动机号" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="工单类型" label-width="120px">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="searchForm.billTypes"
                :options="WORK_ORDER_TYPES"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="项目名称" label-width="120px">
              <ht-input
                v-model="searchForm.item"
                size="mini"
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="配件名称" label-width="120px">
              <ht-input
                v-model="searchForm.part"
                size="mini"
                placeholder="配件名称"
              />
            </el-form-item>
            <el-form-item label="健康档案上传状态" label-width="120px">
              <ht-select
                filterable
                v-model="searchForm.uploadedHealth"
                :options="UPLOAD_TYPES"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="结账状态" label-width="70px">
              <!-- <el-select
                filterable
                clearable
                v-model="searchForm.settleStatus"
                size="mini"
                placeholder="请选择"
              >
                <el-option label="已结清" value="settled"></el-option>
                <el-option label="未结清" value="unsettle"></el-option>
              </el-select> -->
              <ht-select
                filterable
                v-model="searchForm.settleStatus"
                :options="SETTLE_TYPES"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="结账状态"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="支付方式" label-width="70px">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="searchForm.enhancedSettlementTypes"
                :options="enhancedSettlementOptions"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="支付方式"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
            <el-form-item label="发票类型" label-width="70px">
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
            <el-form-item label="发票号" label-width="70px">
              <ht-input
                v-model="searchForm.invoiceNumber"
                size="mini"
                placeholder="发票号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: left;width: 150px">
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
        :disabled="selectedRows.length == 0"
        size="small"
        @click="billDetail"
      >
        工单详情（F3）
      </el-button>
      <el-button
        type="primary"
        :disabled="
          selectedRows.length == 0 || selectedRows[0].status != 'completed'
        "
        size="small"
        @click="reworkVisible = true"
        v-if="hasBelongsPerm('repairs.comprehensive.bill.rework')"
      >
        返修（F7）
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="exportVisible = true"
        v-if="hasBelongsPerm('repairs.comprehensive.bill.export')"
      >
        导出（Alt+D）
      </el-button>
      <el-button
        type="primary"
        :disabled="selectedRows.length == 0"
        size="small"
        @click="clickHistory"
      >
        维修履历
      </el-button>
      <el-button
        type="primary"
        :disabled="
          selectedRows.length == 0 ||
            selectedRows[0].status != 'completed' ||
            selectedRows[0].flags.uploadedHealth
        "
        size="small"
        @click="uploadVisible = true"
        v-if="hasBelongsPerm('repairs.comprehensive.bill.uploadHealth')"
      >
        上传健康档案
      </el-button>
      <el-dropdown
        split-button
        @command="handleCommand"
        v-if="
          selectedRows.length &&
            hasBelongsPerm('repairs.comprehensive.bill.print')
        "
        type="primary"
        size="small"
        style="margin-left:5px;margin-right:5px;"
        @click="print"
      >
        {{ currentBtnType }}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in commandList"
            :command="item"
            :key="index"
            >{{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </ht-card>
    <div class="auto-block">
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
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
        table-name="repair-business"
      />
    </div>
    <!-- 工单详情 -->
    <BillInfo
      :visible="showBillInfo"
      :billId="billId"
      @close="showBillInfo = false"
    />
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :hisType="'order'"
      :orderInfo="orderInfo"
      @close="showHistory = false"
    />
    <!-- 返修 -->
    <ht-dialog
      :visible="reworkVisible"
      title="返修确认"
      width="550px"
      v-on="$listeners"
      @close="reworkCancelHandle"
    >
      <div style="padding: 10px 20px">
        工单号：
        <span class="main-color" style="margin-right: 20px">
          {{ selectedRows[0] ? selectedRows[0].billNo : "" }}
        </span>
        车牌号：
        <span class="main-color">
          {{ selectedRows[0] ? selectedRows[0].plateNumber : "" }}
        </span>
      </div>
      <p style="padding-left:20px">
        确定要基于本工单新建一条返修工单吗？
      </p>
      <div class="dialog-footer-align" style="margin-top: 20px; ">
        <el-button
          :loading="loading"
          type="primary"
          size="mini"
          plain
          @click="submitRework"
        >
          确定 (F3）
        </el-button>
        <el-button
          :disabled="loading"
          type="primary"
          size="mini"
          plain
          @click="reworkCancelHandle"
        >
          取消 (Esc)
        </el-button>
      </div>
    </ht-dialog>
    <!-- 健康档案 -->
    <ht-dialog
      :visible="uploadVisible"
      title="上传确认"
      width="550px"
      v-on="$listeners"
      @close="uploadCancelHandle"
    >
      <div style="padding: 10px 20px">
        工单号：
        <span class="main-color" style="margin-right: 20px">
          {{ selectedRows[0] ? selectedRows[0].billNo : "" }}
        </span>
        车牌号：
        <span class="main-color">
          {{ selectedRows[0] ? selectedRows[0].plateNumber : "" }}
        </span>
      </div>
      <p style="padding-left:20px">
        确定将本单上传吗？
      </p>
      <div class="dialog-footer-align" style="margin-top: 20px; ">
        <el-button
          :loading="loading"
          type="primary"
          size="mini"
          plain
          @click="submitUpload"
        >
          确定 (F3）
        </el-button>
        <el-button
          :disabled="loading"
          type="primary"
          size="mini"
          plain
          @click="uploadCancelHandle"
        >
          取消 (Esc)
        </el-button>
      </div>
    </ht-dialog>
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="repair-business-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="维修业务"
      is-end-export
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as store from "@/utils/store";
import { dateFormat } from "@/utils/date"; // 时间处理
import { baseDictionary } from "@/api/base/base"; // 基础信息-业务类型
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { getFinancialsCompanys } from "@/api/finance/basicSetting"; // 公司列表
import { REPAIR_BUSINESS_COLUMNS } from "../const/columns"; // 表格配置
import { ORDER_STATUS } from "../../../workOrder/const/columns"; // 工单状态
import { openNewWindow } from "@/utils/tool";
import BillInfo from "@/components/repair/BillInfo/BillInfo"; // 工单详情
import RepaireHistory from "@/components/repair/repairHistory/repairHistory"; // 维修履历
import { ExportTable } from "@/components/table";
import { setTableSort } from "@/utils/tool";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

import {
  billsList,
  rework,
  uploadHealth,
  billsExport
} from "@/api/repairs/bills";

const USER_TYPES = [
  { id: "reception", name: "接待顾问" },
  // { id: "dispatch", name: "派工人" },
  { id: "inspect", name: "完检人" },
  { id: "settleConfirm", name: "结算确认人" },
  { id: "settle", name: "收款交车人" }
];

const DATE_TYPES = [
  { id: "reception", name: "接待日期" },
  { id: "inspect", name: "完工日期" },
  { id: "settleConfirm", name: "结算确认日期" },
  { id: "settle", name: "收款交车日期" }
];

const REMARK_TYPES = [
  { id: "reception", name: "接待备注" },
  // { id: "dispatch", name: "派工备注" },
  { id: "inspect", name: "完检备注" },
  { id: "settleConfirm", name: "结算备注" },
  { id: "settle", name: "收款备注" }
];

const WORK_ORDER_TYPES = [
  { id: "WX", name: "维修单" },
  { id: "FX", name: "返修单" }
];

const UPLOAD_TYPES = [
  { id: true, name: "已上传" },
  { id: false, name: "未上传" }
];

const SETTLE_TYPES = [
  { id: "settled", name: "已结清" },
  { id: "unsettle", name: "未结清" }
];

export default {
  name: "repair-business",
  components: { BillInfo, RepaireHistory, ExportTable },
  data() {
    return {
      loading: false,
      showDialog: false,
      manLoading: false,
      transferDialogVisible: false,
      showBillInfo: false, // 工单详情
      billId: 0,
      showHistory: false, // 维修履历
      orderInfo: {},
      reworkVisible: false, // 返修
      uploadVisible: false, // 健康档案
      transferData: {},
      plateNumber: "", // 车牌号
      searchForm: {
        manType: "reception",
        dateType: "reception",
        remarkType: "reception"
      },
      currentBtnType: "打印报价单（F10）",
      selectedRows: [],
      USER_TYPES, // 人员类型
      DATE_TYPES, // 时间类型
      REMARK_TYPES, // 备注类型
      WORK_ORDER_TYPES, // 工单类型 维修单(WX)，返修单(FX)】
      UPLOAD_TYPES, // 上传状态
      SETTLE_TYPES, // 结账状态
      otherRange: [], // 时间数组
      companyOptions: [], // 公司列表
      userOptions: [],
      userOptions2: [],
      repairBusinessCategoryList: [], // 业务类型
      tableColumns: [...REPAIR_BUSINESS_COLUMNS],
      totalData: {},
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      thisRow: {},
      orderStatus: ORDER_STATUS,
      exportVisible: false,
      enhancedSettlementOptions: [],
      sort: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    commandList() {
      let list = [];
      if (!this.selectedRows.length) return list;
      // console.log(this.selectedRows[0].status);
      switch (this.selectedRows[0].status) {
        case "recepting":
          list = ["打印报价单（F10）"];
          break;
        case "repairing":
          list = ["打印报价单（F10）"];
          break;
        default:
          list = ["打印报价单（F10）", "打印结算单（F10）"];
          break;
      }
      return list;
    }
  },
  mounted() {
    this.getSettingDate();
  },
  created() {
    this.loadData();
  },
  activated() {
    this.getSettingDate();
    this.loadData();
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
    store() {
      return store;
    },
    handleCommand(command) {
      this.currentBtnType = command;
    },
    // 打印
    print() {
      const { id } = this.selectedRows[0];
      let path = "";
      switch (this.currentBtnType) {
        case "打印报价单（F10）":
          path = "repair/billConfirm";
          break;
        case "打印结算单（F10）":
          path = "repair/billSettle";
          break;
        default:
          path = "repair/billConfirm";
          break;
      }
      openNewWindow(
        this.$router.resolve({
          path: `/Print/${path}/${id}`
        }).href,
        "print"
      );
    },
    loadData() {
      // 获取公司列表
      getFinancialsCompanys().then(res => {
        this.companyOptions = res;
      });
      // 获取业务类型
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
      });
      this.enhancedSettlementOptions = this.store().enhancedSettlementTypeDictionary();
      this.enhancedSettlementOptions.forEach((item, ind) => {
        if (item.id == "物流代收" || item.id == "送货收款") {
          this.enhancedSettlementOptions.splice(ind, 1);
        }
      });
      this.getUsers();
      this.handleSearch();
    },
    // 获取用户信息
    getUsers() {
      const params = {
        roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
      });
      const params2 = {
        roles: []
      };
      searchTypeStaffs(params2).then(res => {
        this.userOptions2 = res;
      });
    },
    // 动态获取用户
    remoteMethod(query) {
      if (query !== "") {
        this.manLoading = true;
        setTimeout(() => {
          this.manLoading = false;
          const params = {
            company: "self",
            roles: [], // "receptionConsultant", "systemAdmin", "companyAdmin"
            name: query
          };
          searchTypeStaffs(params).then(res => {
            this.userOptions2 = res;
          });
        }, 200);
      } else {
        this.getUsers();
      }
    },
    // 获取列表
    // getbillsList() {
    //   const data = { ...this.searchForm };
    //   data.page = this.currentPage;
    //   data.pageSize = this.pageSize;
    //   billsList(data).then(res => {
    //     this.totalData = res || {};
    //     this.tableData = res.rows || [];
    //     this.totalSize = res.totalSize;
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
      billsList({ ...searchData, ...pagination })
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
          case "taxAmount":
            sums[index] = data.totalTaxAmount;
            break;
          case "totalAmount":
            sums[index] = data.totalTotalAmount;
            break;
          case "discountAmount":
            sums[index] = data.totalDiscountAmount;
            break;
          case "eraseAmount":
            sums[index] = data.totalEraseAmount;
            break;
          case "dueAmount":
            sums[index] = data.totalDueAmount;
            break;
          case "feePropertyGuaranteeAmount":
            sums[index] = data.totalFeePropertyGuaranteeAmount;
            break;
          case "feePropertyInsuranceAmount":
            sums[index] = data.totalFeePropertyInsuranceAmount;
            break;
          case "feePropertyReworkAmount":
            sums[index] = data.totalFeePropertyReworkAmount;
            break;
          case "feePropertyFreeAmount":
            sums[index] = data.totalFeePropertyFreeAmount;
            break;
          case "itemTaxedCostAmount":
            sums[index] = data.totalItemTaxedCostAmount;
            break;
          case "partTaxedCostAmount":
            sums[index] = data.totalPartTaxedCostAmount;
            break;
          case "taxedGrossProfit":
            sums[index] = data.totalTaxedGrossProfit;
            break;
          case "untaxedGrossProfit":
            sums[index] = data.totalUntaxedGrossProfit;
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
        manType: "reception",
        dateType: "reception",
        remarkType: "reception"
      };
      this.otherRange = [];
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    selectChange() {
      this.currentBtnType = "打印报价单（F10）";
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 工单详情
    billDetail() {
      this.billId = this.selectedRows[0].id;
      this.showBillInfo = true;
    },
    // 返修 ---------------------------
    submitRework() {
      rework({ id: this.selectedRows[0].id })
        .then(() => {
          this.$message.success("返修成功！");
          this.reworkVisible = false;
          this.resList(this.searchForm, {
            page: this.currentPage,
            pageSize: this.pageSize
          });
        })
        .catch(() => {
          this.reworkVisible = false;
        });
    },
    reworkCancelHandle() {
      this.reworkVisible = false;
    },
    // 返修 ---------------------------
    // 维修履历
    clickHistory() {
      this.orderInfo = this.selectedRows[0];
      this.orderInfo.vehicle = {};
      this.orderInfo.vehicle.vehicleId = this.selectedRows[0].vehicleId;
      this.orderInfo.vehicle.plateNumber = this.selectedRows[0].plateNumber;
      this.showHistory = true;
    },
    // 健康档案 ---------------------------
    submitUpload() {
      uploadHealth({ id: this.selectedRows[0].id })
        .then(() => {
          this.$message.success("上传成功！");
          this.uploadVisible = false;
          this.resList(this.searchForm, {
            page: this.currentPage,
            pageSize: this.pageSize
          });
        })
        .catch(() => {
          this.uploadVisible = false;
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
      return billsExport({
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
    uploadCancelHandle() {
      this.uploadVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
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
  .transfer-form {
    text-align: center;
    .el-form-item {
      display: inline-block;
    }
  }
  .ht-table .table .el-table__footer-wrapper tbody td {
    text-align: left;
  }
  .main-color {
    color: $color-primary;
    @include font_color("color-primary");
  }
}
</style>
