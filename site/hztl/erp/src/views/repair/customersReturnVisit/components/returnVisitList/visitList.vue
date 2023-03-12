<template>
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
          <el-col :span="7">
            <el-form-item prop="otherRange" label-width="120px">
              <ht-select
                slot="label"
                v-model="dateType"
                :options="DATE_TYPES"
                :clearable="false"
                class="date-label"
              />
              <ht-date-range v-model="otherRange" size="small" />
            </el-form-item>
            <!-- <el-form-item label="分公司" prop="billNo" label-width="120px">
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
            </el-form-item> -->
            <el-form-item label="回访单号" label-width="120px">
              <ht-input
                size="small"
                v-model="searchForm.billNo"
                placeholder="回访单号/源工单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="车牌号">
              <ht-autocomplete
                v-model="plateNumber"
                :fetch-suggestions="listCarFileAsync()"
                placeholder="车牌号"
                :trigger-on-focus="false"
                @select="carFileChange"
                :maxlength="50"
                size="small"
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="回访人" label-width="60px">
              <el-select
                filterable
                clearable
                remote
                reserve-keyword
                v-model="searchForm.reviewManId"
                size="small"
                placeholder="请输入回访人名称"
                :remote-method="remoteMethod"
                :loading="manLoading"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客户" label-width="60px">
              <!-- <cooperatorsSelect
                v-model="searchForm.cooperatorId"
                :clearable="false"
                :default-value.sync="searchForm.customerName"
                :allow-create="
                  hasCompletePerm('basics.cooperators.createCustomer')
                "
                no-data-tips="没有查询到客户,回车新增"
                type="customer"
                class="switch-focus focus-cooperatorId"
                placeholder="请选择"
              /> -->
              <ht-autoselect
                v-model="searchForm.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                filterZero
                remote
                clearable
                size="small"
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
            <div style="text-align: left;">
              <el-button type="primary" size="small" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="small" @click.stop="resetForm">
                重置（F6）
              </el-button>
            </div>
          </el-col>
          <!-- <el-col :span="7">
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: left;">
              <el-button type="primary" size="mini" @click.stop="handleSearch">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetForm">
                重置（F6）
              </el-button>
            </div>
          </el-col> -->
        </el-row>
      </el-form>
    </ht-card>
    <div class="auto-block">
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
        v-if="status != 'completed'"
        :columns="tableColumns"
        pagination
        :total="totalSize"
        @row-dblclick="selectChange"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        @sort-change="handleSortChange"
        :table-name="'visit-lists1-' + status"
      />
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
        v-if="status == 'completed'"
        :columns="tableColumns2"
        pagination
        :total="totalSize"
        @row-dblclick="selectChange"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        @sort-change="handleSortChange"
        :table-name="'visit-lists2-' + status"
      />
    </div>
    <visitDialog
      :visible.sync="showDialog"
      @updateList="updateLists"
      @transferClick="transferHandle"
      :VisitObj="thisRow"
    />
    <ht-dialog
      title="转交回访单"
      :visible.sync="transferDialogVisible"
      custom-class="transfer-dialog"
      width="460px"
    >
      <el-form
        class="transfer-form"
        :model="transferData"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="接手人" style="width:300px" required>
          <el-select
            placeholder="请选择"
            v-model="transferData.userId"
            size="small"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转交备注" style="width:300px">
          <el-input
            :rows="3"
            type="textarea"
            v-model="transferData.remark"
            placeholder="请输入转交备注"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitTransfer"
          >确 定（F3）</el-button
        >
        <el-button size="small" @click="transferDialogVisible = false"
          >取 消（Esc）</el-button
        >
      </span>
    </ht-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { getFinancialsCompanys } from "@/api/finance/basicSetting";
import { baseDictionary } from "@/api/base/base"; // 基础信息
import {
  RETURN_VISIT_COLUMNS,
  RETURN_VISIT_SEE_COLUMNS
} from "../const/columns";
import eventBus from "@/event";
import { dateFormat } from "@/utils/date";
import { visitList, visitTransfer } from "@/api/repairs/visit";
import { listCarFile } from "@/api/repairs"; // 车辆信息
// import { CooperatorsSelect } from "@/components/select"; // 客户信息
import { searchAllCooperators } from "@/api/communion/communion"; // 客户信息
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import visitDialog from "../visitDialog";
import { setTableSort } from "@/utils/tool";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

const DATE_TYPES = [
  { id: "review", name: "回访单生成日期" },
  { id: "order", name: "工单完成时间" }
];

export default {
  name: "return-visit-list",
  props: ["status"],
  components: {
    // CooperatorsSelect,
    visitDialog
  },
  data() {
    const indexColumns = {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    };
    // this.hasBelongsPerm("review", row.belongs)
    const operationColumns = {
      label: "操作",
      width: CELL_WIDTH.companyNo,
      cantExport: true,
      render: (value, row) => (
        <span class="operation">
          <span
            v-show={
              this.status != "completed" &&
              this.hasBelongsPermWithoutRoute(
                "review",
                "repairs.review.bill",
                row.belongs
              )
            }
            class="back"
            on-click={e => this.returnVisitHandle(row, e)}
          >
            回访
          </span>
          <span
            v-show={
              this.status != "completed" &&
              this.hasBelongsPermWithoutRoute(
                "trans",
                "repairs.review.bill",
                row.belongs
              )
            }
            class="transfer"
            on-click={e => this.transferHandle(row, e)}
          >
            转交
          </span>
          <span
            v-show={this.status == "completed"}
            class="see"
            on-click={e => this.seeHandle(row, e)}
          >
            查看
          </span>
        </span>
      )
    };
    const companyColumns = {
      prop: "companyId",
      label: "源工单所属分公司",
      width: CELL_WIDTH.name,
      render: value => {
        return this.companyName(value);
      }
    };
    const categoryNameCloumns = {
      prop: "type",
      label: "业务类型",
      width: CELL_WIDTH.date,
      render: value => {
        return this.CategoryName(value);
      }
    };
    const rate = {
      prop: "details",
      label: "客户评分",
      width: CELL_WIDTH.date,
      render: value => {
        return this.scoreSum(value);
      }
    };
    return {
      loading: false,
      manLoading: false,
      showDialog: false,
      transferDialogVisible: false,
      transferData: {},
      transferRecord: [], // 转交记录
      plateNumber: "", // 车牌号
      searchForm: {},
      DATE_TYPES,
      dateType: "review", // 时间类型
      otherRange: [], // 时间数组
      companyOptions: [], // 公司列表
      userOptions: [], // 回访人列表
      repairBusinessCategoryList: [], // 业务类型
      categoryCloumns: categoryNameCloumns,
      rateCloumns: rate,
      tableColumns: [
        indexColumns,
        operationColumns,
        companyColumns,
        ...RETURN_VISIT_COLUMNS
      ],
      tableColumns2: [
        indexColumns,
        operationColumns,
        companyColumns,
        ...RETURN_VISIT_SEE_COLUMNS
      ],
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      thisRow: {},
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
      this.tableColumns.splice(6, 0, this.categoryCloumns);
      this.tableColumns2.splice(6, 0, this.categoryCloumns);
      this.tableColumns2.splice(9, 0, this.rateCloumns);
      // 获取公司列表
      getFinancialsCompanys().then(res => {
        this.companyOptions = res;
      });
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
      });
      this.getUsers();
      this.getvisitList();
    },
    // 获取用户信息
    getUsers() {
      const params = {
        company: "self",
        roles: [
          "customerService",
          "receptionConsultant",
          "systemAdmin",
          "companyAdmin"
        ]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
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
            roles: [
              "customerService",
              "receptionConsultant",
              "systemAdmin",
              "companyAdmin"
            ],
            name: query
          };
          searchTypeStaffs(params).then(res => {
            this.userOptions = res;
          });
        }, 200);
      } else {
        this.getUsers();
      }
    },
    // 获取车辆信息
    listCarFileAsync() {
      return (query, callback) => {
        listCarFile({
          plateNumber: this.plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          callback(data.map(item => ({ ...item, value: item.plateNumber })));
        });
      };
    },
    // 选择车辆信息
    carFileChange(e) {
      if (!e) return;
      this.$set(this.searchForm, "vehicleId", e.id); // 车辆档案Id
    },
    // 获取回访列表
    getvisitList() {
      const data = { ...this.searchForm };
      data.status = this.status;
      data.page = this.currentPage;
      data.pageSize = this.pageSize;
      data.sort = this.sort;
      visitList(data).then(res => {
        this.tableData = res.rows || [];
        this.totalSize = res.totalSize;
        this.$emit("totalSizes", res.totalSize);
      });
    },
    // 搜索数据处理
    resList(searchData, pagination) {
      this.loading = true;
      searchData.startDate = null;
      searchData.endDate = null;
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
      if (this.otherRange.length > 0) {
        searchData.searchType = this.dateType;
      }
      searchData.status = this.status;
      if (this.plateNumber == "") {
        searchData.vehicleId = "";
      }
      searchData.sort = this.sort;
      visitList({ ...searchData, ...pagination })
        .then(res => {
          this.tableData = res.rows || [];
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
      this.searchForm = {};
      this.otherRange = [];
      this.plateNumber = "";
      this.currentPage = 1;
      // this.sort = "";
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 回访
    returnVisitHandle(row) {
      this.thisRow = row;
      // console.log(this.thisRow);
      this.showDialog = true;
    },
    // 转交
    transferHandle(row) {
      this.thisRow = row;
      this.transferDialogVisible = true;
      this.transferData = {};
    },
    submitTransfer() {
      const data = {};
      data.id = this.thisRow.id;
      console.log(this.transferData);
      if (!this.transferData.userId) {
        this.$message({
          message: "请选择接手人！",
          type: "error"
        });
        return false;
      } else {
        this.userOptions.forEach(item => {
          if (item.id == this.transferData.userId) {
            data.staffId = item.id;
            data.staffName = item.name;
          }
        });
      }
      data.remark = this.transferData.remark;
      console.log(data);
      // console.log(data);
      visitTransfer(data).then(() => {
        this.$message({
          message: "转交成功！",
          type: "success"
        });
        this.transferDialogVisible = false;
        this.resList(this.searchForm, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
      });
    },
    updateLists() {
      this.resList(this.searchForm, {
        page: this.currentPage,
        pageSize: this.pageSize
      });
      this.$emit("reloadSize");
    },
    // 查看
    seeHandle(row) {
      this.thisRow = row;
      // console.log(this.thisRow);
      this.showDialog = true;
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
    // reviewManName(id) {
    //   let reviewManName = "-";
    //   this.userOptions.forEach(item => {
    //     if (item.id == id) {
    //       reviewManName = item.name;
    //     }
    //   });
    //   return reviewManName;
    // },
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
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      this.handleSearch();
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
::v-deep {
  // .txt-color {
  //   color: $color-primary;
  //   @include font_color("color-primary");
  // }
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
