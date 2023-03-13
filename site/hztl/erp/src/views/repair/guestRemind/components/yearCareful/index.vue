<template>
  <!-- 客情提醒-年审提醒 -->
  <div class="container-box" style="height:100%">
    <div class="flex-container column-flex" style="padding:5px;height: 100%">
      <ht-card
        no-padding
        class="flex-block-padding"
        style="background:#fff;margin-bottom: 5px"
      >
        <el-form ref="searchForm" :model="searchForm" inline>
          <el-form-item label="年审日期" size="mini" label-width="90px">
            <el-date-picker
              v-model="otherRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="单号" size="mini" label-width="40px">
            <ht-input
              v-model="searchForm.sourceBillNo"
              size="mini"
              placeholder="单号"
            />
          </el-form-item> -->
          <el-form-item label="客户" size="mini" label-width="40px">
            <ht-autoselect
              v-model="searchForm.customer"
              :fetch-suggestions="
                query => searchLoadAllCustromerCooperators(query)
              "
              :trigger-on-focus="false"
              filterZero
              remote
              clearable
              size="mini"
              highlight-first-item
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item label="提醒状态" size="mini" label-width="60px">
            <ht-select
              multiple
              collapse-tags
              filterable
              v-model="searchForm.status"
              :options="statusOptions"
              :trigger-on-focus="false"
              class="switch-focus focus-number"
              placeholder="提醒状态"
              highlight-first-item
              has-selecte-all-val
            />
          </el-form-item>
          <el-button type="primary" size="mini" @click="searchSubmit">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click="resetSubmit">
            重置（F6）
          </el-button>
        </el-form>
      </ht-card>
      <div class="auto-block" v-loading="loading">
        <el-card no-background no-padding style="height: 100%">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="remindUpdata(1)"
              v-if="
                hasBelongsPermWithoutRoute(
                  'update',
                  'repairs.remind.annualReview'
                )
              "
            >
              微信提醒
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="remindUpdata(2)"
              v-if="
                hasBelongsPermWithoutRoute(
                  'update',
                  'repairs.remind.annualReview'
                )
              "
            >
              标记为已提醒
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="exportVisible = true"
              v-if="
                hasBelongsPermWithoutRoute(
                  'export',
                  'repairs.remind.annualReview'
                )
              "
            >
              导出（Alt+D）
            </el-button>
            <span style="font-size: 12px;color: #999;padding-left: 5px;">
              微信提醒说明：若您未开通店铺或店铺未绑定公众号、客户未关注微信公众号以及线上客户未绑定本地客户将会导致提醒失败，提醒状态将不会发生变更。
            </span>
          </div>
          <ht-setting-table
            class="maintenance-list"
            table-name="maintenance-list3"
            :data="tableData"
            selectionType="multiple"
            @selectChange="handleSelectionChange"
            :selected-rows.sync="selectedRows"
            :selectable="selectable"
            :columns="tableColumns"
            pagination
            :total="totalSize"
            :current-page.sync="currentPage"
            @pageChange="handlePageChange"
            style="height: calc(100% - 40px)"
          />
        </el-card>
      </div>
    </div>
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="yearCareful-maintenance-export-year"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="年审提醒"
      is-end-export
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { dateFormat } from "@/utils/date";
import { YEAR_CAREFUL_COLUMNS, STATUS_OPTIONS } from "../const/columns";
import {
  remindsList,
  remindsUpdate,
  exportReminds
} from "@/api/repairs/remind";
// import { CooperatorsSelect } from "@/components/select"; // 客户信息
import { searchAllCooperators } from "@/api/communion/communion";
import { ExportTable } from "@/components/table";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "maintenance",
  components: {
    // CooperatorsSelect,
    ExportTable
  },
  data() {
    return {
      loading: false,
      searchForm: {
        type: "年审提醒"
      },
      otherRange: [],
      statusOptions: STATUS_OPTIONS,
      tableData: [],
      selectedRows: [],
      tableColumns: YEAR_CAREFUL_COLUMNS,
      totalSize: 0,
      currentPage: 1,
      exportVisible: false
    };
  },
  mounted() {
    this.getSettingDate();
  },
  created() {
    this.searchSubmit();
    this.getSettingDate();
  },
  activated() {
    this.otherRange = [];
    this.searchForm = {
      type: "年审提醒"
    };
    this.getSettingDate();
    this.searchSubmit();
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
    // 搜索数据处理
    resList(searchData, pagination) {
      this.loading = true;
      if (this.otherRange) {
        searchData.startDate = this.otherRange[0]
          ? dateFormat(this.otherRange[0])
          : null;
        searchData.endDate = this.otherRange[1]
          ? dateFormat(this.otherRange[1])
          : null;
      } else {
        searchData.startDate = "";
        searchData.endDate = "";
      }
      remindsList({ ...searchData, ...pagination })
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize || 0;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    selectable(row) {
      return row.status == "未提醒" ? true : false;
    },
    searchSubmit() {
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    resetSubmit() {
      this.otherRange = [];
      this.searchForm = {
        type: "年审提醒"
      };
      this.currentPage = 1;
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handlePageChange() {
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handleSelectionChange() {},
    remindUpdata(type) {
      console.log(this.selectedRows);
      if (this.selectedRows.length == 0) {
        this.$message.error("请先选择标记项！");
        return false;
      }
      const ids = [];
      this.selectedRows.forEach(item => {
        ids.push(item.id);
      });
      // 微信提醒
      if (type == 1) {
        const data = {
          ids: ids,
          status: "已微信提醒"
        };
        remindsUpdate(data).then(() => {
          // this.$message.success("提醒成功！");
          this.resList(this.searchForm, {
            page: this.currentPage,
            pageSize: this.pageSize
          });
        });
      }
      // 标记已提醒
      if (type == 2) {
        const data = {
          ids: ids,
          status: "已提醒"
        };
        remindsUpdate(data).then(() => {
          // this.$message.success("提醒成功！");
          this.resList(this.searchForm, {
            page: this.currentPage,
            pageSize: this.pageSize
          });
        });
      }
    },
    outExoportHandle(sampleColums) {
      const data = { ...this.searchForm };
      if (this.otherRange[0]) {
        data.startDate = dateFormat(this.otherRange[0]);
      }
      if (this.otherRange[1]) {
        data.endDate = dateFormat(this.otherRange[1]);
      }
      return exportReminds({
        ...data,
        columnsSettings: sampleColums
      });
    },
    async searchLoadAllCustromerCooperators(query) {
      return (
        (await searchAllCooperators({
          type: "customer",
          keyword: query
        })) || []
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 2px;
  }
  .el-card__body {
    height: 100%;
    padding: 5px;
  }
  .maintenance-list {
    margin-top: 5px;
  }
}
</style>
