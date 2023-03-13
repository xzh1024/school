<template>
  <!-- 维修综合查询-车辆检测报告 -->
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
            <el-form-item label="分公司" prop="billNo" label-width="80px">
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
            <el-form-item label="检测日期" label-width="80px">
              <ht-date-range v-model="otherRange" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="billNo" label-width="80px">
              <ht-input
                v-model="searchForm.plateNumber"
                size="mini"
                placeholder="请输入车牌号"
              />
            </el-form-item>
            <el-form-item label="诊断类型" label-width="80px">
              <el-select
                filterable
                v-model="searchForm.type"
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号" label-width="110px">
              <ht-input
                v-model="searchForm.vinCode"
                size="mini"
                placeholder="请输入车架号"
              />
            </el-form-item>
            <el-form-item label="诊断设备编码" label-width="110px">
              <ht-input
                v-model="searchForm.snNumber"
                size="mini"
                placeholder="请输入诊断设备编码/SN"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div style="text-align: left;">
              <div>
                <el-button type="primary" size="mini" @click.stop="resetForm">
                  重置（F6）
                </el-button>
              </div>
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="handleSearch"
                  style="margin-top:5px"
                >
                  查询（F5）
                </el-button>
              </div>
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
        @click="vehiclePreview"
      >
        预览
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="selectedRows.length == 0"
        v-if="hasBelongsPerm('repairs.comprehensive.checkReport.print')"
        @click="vehiclePrint"
      >
        打印（F10）
      </el-button>
    </ht-card>
    <div class="auto-block">
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
        :columns="tableColumns"
        pagination
        :total="totalSize"
        :selected-rows.sync="selectedRows"
        @row-dblclick="selectChange"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        table-name="repair-business-vehicle"
      />
    </div>
    <!-- 预览弹窗 -->
    <ht-dialog
      v-bind="$attrs"
      title="检测报告预览"
      width="1200px"
      :visible.sync="vehicledialogVisible"
      v-on="$listeners"
    >
      <vehicleDetectionRreview
        v-if="vehicledialogVisible"
        :reportInfo="reportInfo"
        :type="selectedRows[0].type"
        @close="vehicledialogVisible = false"
      />
    </ht-dialog>
  </div>
</template>
<script>
import eventBus from "@/event";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
import { mapState } from "vuex";
import { VEHICLE_REPORT_COLUMNS } from "../const/columns";
import { dateFormat } from "@/utils/date";
import { reportsList } from "@/api/repairs/maintenance";
// import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { getFinancialsCompanys } from "@/api/finance/basicSetting";
import vehicleDetectionRreview from "@/components/repair/BillInfo/vehicleDetection/vehicleDetectionPreview";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "vehicle-report",
  props: ["status"],
  components: {
    vehicleDetectionRreview
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      vehicledialogVisible: false,
      transferDialogVisible: false,
      transferData: {},
      searchForm: {
        type: "checkReport"
      },
      otherRange: [], // 时间数组
      companyOptions: [], // 公司列表
      // userOptions: [], // 回访人列表
      repairBusinessCategoryList: [], // 业务类型
      tableColumns: [...VEHICLE_REPORT_COLUMNS],
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      thisRow: {},
      selectedRows: [],
      reportInfo: {},
      typeOptions: [
        {
          id: "checkReport",
          name: "电子点检"
        },
        {
          id: "checkHealth",
          name: "健康诊断"
        },
        {
          id: "all",
          name: "电子点检+健康诊断"
        }
      ],
      printWindow: ""
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
        this.companyOptions = res;
      });
      // this.getUsers();
      this.gethealthsList();
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
    // 获取列表
    gethealthsList() {
      const data = { ...this.searchForm };
      data.page = this.currentPage;
      data.pageSize = this.pageSize;
      reportsList(data).then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
        this.$emit("totalSizes", res.totalSize);
      });
    },
    vehiclePreview() {
      this.reportInfo = this.selectedRows[0];
      this.vehicledialogVisible = true;
    },
    vehiclePrint() {
      if (!this.selectedRows[0]) return;
      this.printWindow = window.open(
        `/detectionShare/index?id=${this.selectedRows[0].id}&type=${this.selectedRows[0].type}&print=1`
      );
    },
    // 搜索数据处理
    resList(searchData, pagination) {
      this.loading = true;
      searchData.start = "";
      searchData.end = "";
      if (this.otherRange[0]) {
        searchData.start = this.otherRange
          ? dateFormat(this.otherRange[0])
          : null;
      }
      if (this.otherRange[1]) {
        searchData.end = this.otherRange
          ? dateFormat(this.otherRange[1])
          : null;
      }
      // if (this.otherRange.length > 0) {
      //   searchData.searchType = this.dateType;
      // }
      searchData.status = this.status;
      reportsList({ ...searchData, ...pagination })
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize;
          this.$emit("totalSizes", res.totalSize);
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
        pageSize: this.pageSize
      });
    },
    // 重置
    resetForm() {
      this.searchForm = { type: "checkReport" };
      this.otherRange = [];
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    updateLists() {
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
      this.$emit("reloadSize");
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
    CategoryName(id) {
      let categoryName = "-";
      this.repairBusinessCategoryList.forEach(item => {
        if (item.id == id) {
          categoryName = item.name;
        }
      });
      return categoryName;
    },
    scoreSum(details) {
      let sum = 0;
      details.forEach(item => {
        sum += item.score * 2;
      });
      return parseFloat(sum / details.length).toFixed(1) + "分";
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
}
</style>
