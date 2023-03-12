<template>
  <div class="container-box">
    <ht-card title="" class="container-space">
      <el-form
        ref="searchForm"
        :model="searchForm"
        size="mini"
        label-width="60px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="选择项目" prop="type">
              <ht-select
                v-model="searchForm.type"
                :options="financeTypeOptions"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分公司" prop="companyIds">
              <ht-select
                class="overflow-select"
                v-model="searchForm.companyIds"
                :options="useableCompanies"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" style="padding-left:20px;">
            <el-form-item label="单据审核状态" label-width="100px">
              <el-checkbox-group
                v-model="searchForm.statuses"
                :min="1"
                :max="3"
              >
                <el-checkbox
                  v-for="statu in statuses"
                  :label="statu.value"
                  :key="statu.value"
                  >{{ statu.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="text-align: right">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click.stop="clearSearchForm"
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="日期" prop="billDate">
              <ht-date-range
                :clearable="false"
                v-model="searchForm.billDate"
                @change="dateChange"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="showDateType2">
            <el-form-item label="收/付款项目日期类型" label-width="150px">
              <el-radio-group v-model="searchForm.dateType2">
                <el-radio :label="'Settle'">结算日期</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            v-if="showDateType1"
            :style="{ paddingLeft: showDateType2 ? '20px' : '5px' }"
          >
            <el-form-item label="业务项目日期类型" label-width="120px">
              <el-radio-group v-model="searchForm.dateType1">
                <el-radio :label="'Create'">开单日期</el-radio>
                <el-radio :label="'Business'">业务日期</el-radio>
                <el-radio :label="'Financial'">财务日期</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <el-row
      v-if="showList.length"
      type="flex"
      justify="space-between"
      align="center"
      class="btn-group"
    >
      <el-col :span="2.5">
        <ht-tabs
          v-model="activeName"
          :tabs="tabs"
          class="tabs-primary"
          style="margin: 0"
        />
      </el-col>
      <el-col :span="2">
        <div class="export-btn">
          <el-button type="primary" size="mini" @click.stop="showOutPut">
            {{ exportLabel }}(Alt+D)
          </el-button>
        </div>
      </el-col>
    </el-row>
    <ht-card v-else class="auto-card">
      <p class="no-data-p">暂无数据</p>
    </ht-card>
    <div class="data-layout">
      <FinancialLogIn
        class="compo-item-wrap"
        v-if="showList.includes('FinancialLogIn')"
        ref="FinancialLogIn"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <FinancialLogOut
        class="compo-item-wrap"
        v-if="showList.includes('FinancialLogOut')"
        ref="FinancialLogOut"
        :currentRow="currentRow"
        @rowChange="rowChange"
        :activetab="activeName"
        :query="searchForm"
      />
      <Purchase
        class="compo-item-wrap"
        v-if="showList.includes('Purchase')"
        ref="Purchase"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <Sale
        class="compo-item-wrap"
        v-if="showList.includes('Sale')"
        ref="Sale"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <AllocIn
        class="compo-item-wrap"
        v-if="showList.includes('AllocIn')"
        ref="AllocIn"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <AllocOut
        class="compo-item-wrap"
        v-if="showList.includes('AllocOut')"
        ref="AllocOut"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <PayIn
        class="compo-item-wrap"
        v-if="showList.includes('ReceivablePayableIn')"
        ref="ReceivablePayableIn"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <PayOut
        class="compo-item-wrap"
        v-if="showList.includes('ReceivablePayableOut')"
        ref="ReceivablePayableOut"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <LogisticReg
        class="compo-item-wrap"
        v-if="showList.includes('LogisticRegistration')"
        ref="LogisticRegistration"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <StockTaking
        class="compo-item-wrap"
        v-if="showList.includes('Stocktaking')"
        ref="Stocktaking"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
      <NetProfit
        class="compo-item-wrap"
        v-if="showList.includes('NetProfit')"
        ref="NetProfit"
        :activetab="activeName"
        :query="searchForm"
        :currentRow="currentRow"
        @rowChange="rowChange"
      />
    </div>
    <export-table
      :auto-download="true"
      :base-columns="[]"
      :default-data="[]"
      :table-name="'日经营报表'"
      v-if="exportVisible"
      fileType="csv"
      :end-export-func="outExoportHandle"
      :file-name="outPutTitle"
      is-end-export
    />
  </div>
</template>

<script>
import {
  FINANCE_TYPE_OPTIONS,
  FINACIAL_TYPE,
  BUSINESS_TYPE,
  FINACIAL_FINACIAL_TYPE,
  STATUS
} from "@/constants/report/dailyManage";
import { exportSummary, exportDetail } from "@/api/dailyManageReport";
import FinancialLogIn from "./financialLogIn/index";
import FinancialLogOut from "./financialLogOut/index";
import Purchase from "./purchase/index";
import Sale from "./sale/index";
import AllocIn from "./allocIn/index";
import AllocOut from "./allocOut/index";
import PayIn from "./payIn/index";
import PayOut from "./payOut/index";
import NetProfit from "./netProfit/index";
import StockTaking from "./stocktaking/index";
import LogisticReg from "./LogisticReg/index";
import { mapState } from "vuex";
import { hotkeyMixin } from "@/mixins";
import { selectCompanys } from "@/api/company/company";
import { ExportTable } from "@/components/table";
// import { TYPE_TO_COLUMN_SUMMARY, TYPE_TO_COLUMN_DETAIL } from "./const";

const defaultSearchForm = {
  billDate: [new Date(), new Date()],
  type: [],
  companyIds: [],
  statuses: ["FinancialOrWarehouse"],
  dateType1: "Create",
  dateType2: "Settle"
};

const fulTab = [
  { id: 1, name: "汇总" },
  { id: 2, name: "明细" }
];
const simpleTab = [{ id: 1, name: "汇总" }];
export default {
  name: "dailyManageReport",
  mixins: [hotkeyMixin],
  components: {
    FinancialLogIn,
    FinancialLogOut,
    Purchase,
    Sale,
    AllocIn,
    AllocOut,
    PayIn,
    PayOut,
    NetProfit,
    StockTaking,
    LogisticReg,
    ExportTable
  },
  data() {
    return {
      exportVisible: false,
      FINANCE_TYPE_OPTIONS,
      useableCompanies: [],
      financeTypeOptions: [],
      activeName: 1,
      currentRow: [],
      columns: [],
      companys: [],
      choiceDate: "",
      outPutTitle: "",
      exportQuery: {},
      timer: null,
      showList: [], //需要显示的项目，在按下查询键时更新
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      tabs: [
        { id: 1, name: "汇总" },
        { id: 2, name: "明细" }
      ],
      lastDate: [],
      statuses: STATUS,
      searchForm: { ...defaultSearchForm }
    };
  },
  watch: {
    showList: {
      handler: function(newVal) {
        if (newVal.length === 1 && newVal[0] === "NetProfit") {
          this.tabs = simpleTab;
        } else {
          this.tabs = fulTab;
        }
      }
    }
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "perm"]),
    exportLabel() {
      return this.activeName === 1 ? "导出汇总" : "导出明细";
    },
    showDateType1() {
      let show = false;
      this.searchForm.type.forEach(item => {
        if (
          BUSINESS_TYPE.includes(item) ||
          FINACIAL_FINACIAL_TYPE.includes(item)
        )
          show = true;
      });
      return show;
    },
    showDateType2() {
      let show = false;
      this.searchForm.type.forEach(item => {
        if (
          FINACIAL_TYPE.includes(item) ||
          FINACIAL_FINACIAL_TYPE.includes(item)
        )
          show = true;
      });
      return show;
    }
  },
  mounted() {
    this.lastDate = [...this.searchForm.billDate];
    this.filterOptions(this.FINANCE_TYPE_OPTIONS);
  },
  methods: {
    async selectAllCompanies() {
      const res = await selectCompanys();
      const hasReportPerm = this.loginHasPerm("reports");
      const hasReportBussinessPerm = this.loginHasPerm("reports.business");
      const hasOurPerm = this.loginContainPerm("reports.business.our");
      const hasRestPerm = this.loginContainPerm("reports.business.rests");
      const hasByOurPerm = this.loginContainPerm("reports.business.byOur");
      let companies = [];
      if (hasReportPerm || hasReportBussinessPerm) {
        companies = [...res];
      } else {
        res.forEach(item => {
          const { belongs } = item;
          if (belongs && belongs.includes("our") && hasOurPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("rests") && hasRestPerm) {
            companies.push(item);
          }
          if (belongs && belongs.includes("byOur") && hasByOurPerm) {
            companies.push(item);
          }
        });
      }
      this.useableCompanies = companies;
      // 默认选中所有公司
      const arr = [];
      this.useableCompanies.forEach(company => {
        arr.push(company.id);
      });
      this.$nextTick(() => {
        this.searchForm = {
          ...this.searchForm,
          companyIds: arr
        };
      });
    },
    filterOptions(options) {
      clearTimeout(this.timer);
      const optionList = [];
      options.forEach(item => {
        let str = "";
        if (item.id.indexOf("In") > -1) {
          str = item.id.substr(0, item.id.length - 2);
        }
        if (item.id.indexOf("Out") > -1) {
          str = item.id.substr(0, item.id.length - 3);
        }
        if (item.id.indexOf("In") == -1 && item.id.indexOf("Out") == -1) {
          str = item.id;
        }
        const permStr = "read" + str;
        const restsPerm = "reports.business.rests." + permStr;
        const ourPerm = "reports.business.our." + permStr;
        const byOurPerm = "reports.business.byOur." + permStr;

        const isPermExist =
          this.loginHasPermTEM(restsPerm) ||
          this.loginHasPermTEM(ourPerm) ||
          this.loginHasPermTEM(byOurPerm);
        if (isPermExist) {
          optionList.push(item);
        }
      });
      this.financeTypeOptions = optionList;
      // 根据拥有的权限生成默认选中的项目
      const defaultTypes = [];
      this.financeTypeOptions.forEach(item => {
        defaultTypes.push(item.id);
      });
      this.searchForm.type = defaultTypes;
      this.selectAllCompanies();
    },
    dateChange(e) {
      const userDeleteDate = e.indexOf(null) > -1; // 检测用户是否删除了时间
      if (userDeleteDate) {
        this.$message.warning({
          message: "请输入查询的起止日期",
          showClose: true
        });
        return;
      }
      const one = 30 * 24 * 3600 * 1000;
      const minDate = e[0];
      const maxDate = e[1];
      const minTime = new Date(minDate).getTime();
      const maxTime = new Date(maxDate).getTime();
      const minDateChange = minDate != this.lastDate[0];
      const maxDateChange = maxDate != this.lastDate[1];
      /**
       * 选min，如果max-min > 一个月，设置max为min后一个月，限制为min后一个月
       * 选max，如果max-min > 一个月，重置min为max-一个月
       */
      if (minDateChange) {
        if (maxTime - minTime > one && minTime != 0) {
          this.searchForm.billDate[1] = new Date(minTime + one);
        }
        if (minTime === 0) {
          this.searchForm.billDate[1] = "";
        }
      }
      if (maxDateChange) {
        if (maxTime - minTime > one) {
          this.searchForm.billDate[0] = new Date(maxTime - one);
        }
      }
      this.lastDate = [...this.searchForm.billDate];
    },
    rowChange(row) {
      this.currentRow = row;
    },
    handleSearch() {
      const { type, companyIds, billDate } = this.searchForm;
      const userDeleteDate = billDate.indexOf(null) > -1; // 检测用户是否删除了时间
      if (userDeleteDate) {
        this.$message.warning({
          message: "请输入查询的起止日期",
          showClose: true
        });
        return;
      }
      // 如果项目/分公司被清空了，就查询所有的
      if (type.length === 0) {
        const arr = [];
        this.financeTypeOptions.forEach(item => {
          arr.push(item.id);
        });
        this.searchForm.type = arr;
      }
      if (companyIds.length === 0) {
        const arr = [];
        this.useableCompanies.forEach(company => {
          arr.push(company.id);
        });
        this.$nextTick(() => {
          this.searchForm = {
            ...this.searchForm,
            companyIds: arr
          };
        });
      }
      // 设置需要显示的
      this.showList = this.searchForm.type;
      let tempActiveName = this.activeName;
      if (type.length === 1 && type[0] === "NetProfit") {
        tempActiveName = 1;
      }
      this.activeName = 1;
      const tem = { ...this.searchForm };
      this.searchForm = null;
      this.searchForm = { ...tem };
      // 为了优化请求数量，项目组件由v-show改至v-if，所以放在nextTick中避免没有找到ref的问题
      this.$nextTick(() => {
        this.searchForm.type.forEach(type => {
          this.$refs[type].getSummary();
          this.activeName = tempActiveName;
        });
      });
    },
    showOutPut() {
      const {
        billDate,
        companyIds,
        dateType1,
        dateType2,
        statuses
      } = this.searchForm;
      const startDate = this.formatTime(billDate[0]);
      const endDate = this.formatTime(billDate[1]);
      const receiptPaymentParam = {
        companyIds,
        startDate,
        endDate,
        dateType: dateType2,
        statuses
      };
      const businessParam = {
        companyIds,
        startDate,
        endDate,
        dateType: dateType1,
        statuses
      };
      if (!this.showList.length) {
        console.log("没有需要导出的内容");
      }
      const exportColumns = [];
      const projects = [];
      this.outPutTitle =
        this.activeName === 1 ? "日经营报表汇总" : "日经营报表明细";
      this.showList.forEach(project => {
        // if (this.activeName === 1) {
        //   exportColumns = exportColumns.concat(TYPE_TO_COLUMN_SUMMARY[project]);
        // } else {
        //   exportColumns = exportColumns.concat(TYPE_TO_COLUMN_DETAIL[project]);
        // }
        const isBelongPay = FINACIAL_TYPE.includes(project); // 是否是收付款类型
        const isBelongNetProfit = FINACIAL_FINACIAL_TYPE.includes(project); // 是否是收付款类型
        if (isBelongNetProfit) {
          projects.push({
            code: project,
            receiptPaymentParam,
            businessParam
          });
        } else {
          if (isBelongPay) {
            projects.push({
              code: project,
              receiptPaymentParam
            });
          } else {
            projects.push({
              code: project,
              businessParam
            });
          }
        }
      });
      this.exportQuery = {
        projects: [...projects]
      };
      this.columns = exportColumns;
      this.exportVisible = true;
    },
    outExoportHandle() {
      this.exportVisible = false;
      if (this.activeName === 1) {
        return exportSummary({
          ...this.exportQuery
        });
      } else {
        return exportDetail({
          ...this.exportQuery
        });
      }
    },
    formatTime(date) {
      let nowYear = new Date(date).getFullYear().toString();
      let nowMonth = (new Date(date).getMonth() + 1).toString();
      let nowDay = new Date(date).getDate().toString();
      function timeAdd0(str) {
        if (str.length <= 1) {
          str = "0" + str;
        }
        return str;
      }
      nowYear = timeAdd0(nowYear);
      nowMonth = timeAdd0(nowMonth);
      nowDay = timeAdd0(nowDay);
      return nowYear + "-" + nowMonth + "-" + nowDay;
    },
    clearSearchForm() {
      this.searchForm = { ...defaultSearchForm };
      const { type, companyIds } = this.searchForm;
      if (type.length === 0) {
        const arr = [];
        this.financeTypeOptions.forEach(item => {
          arr.push(item.id);
        });
        this.searchForm.type = arr;
      }
      if (companyIds.length === 0) {
        const arr = [];
        this.useableCompanies.forEach(company => {
          arr.push(company.id);
        });
        this.$nextTick(() => {
          this.searchForm = {
            ...this.searchForm,
            companyIds: arr
          };
        });
      }
    },
    loginHasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return hasRootPerm || (perms && perms.some(item => permKey === item));
    },
    loginContainPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return (
        hasRootPerm || (perms && perms.some(item => item.includes(permKey)))
      );
    },
    loginHasPermTEM(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      const whiteList = [
        "reports",
        "reports.business",
        "reports.business.rests",
        "reports.business.our",
        "reports.business.byOur"
      ]; // 全部项目权限白名单
      // perms.forEach(item => {
      //   if (whiteList.indexOf(item) > -1) {
      //   }
      // });
      return (
        hasRootPerm ||
        (perms && perms.some(item => permKey === item)) ||
        (perms && perms.some(item => whiteList.indexOf(item) > -1))
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.export-btn {
  height: 28px;
  line-height: 28px;
  text-align: right;
}
.btn-group {
  padding: 0 10px;
}
.data-layout {
  margin: 0 10px 10px 10px;
}
.no-data-p {
  margin-top: 200px;
  text-align: center;
}
.tabs-primary {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
  ::v-deep .tab {
    width: 120px;
  }
}
// .overflow-select {
//   ::v-deep span {
//     word-break: normal;
//     width: auto;
//     height: auto;
//     white-space: pre-wrap;
//     word-wrap: break-word;
//   }
// }
</style>
