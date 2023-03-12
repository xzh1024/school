<template>
  <div class="container-box">
    <div class="customers-appointment">
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btns">
          <el-button
            type="primary"
            size="small"
            @click="addBookings"
            v-if="hasBelongsPermWithoutRoute('create', 'repairs.booking.bill')"
            >新增（F2）</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="
              !thisRow.id ||
                thisRow.status == '已取消' ||
                thisRow.status == '已转单'
            "
            @click="editBookings"
            v-if="hasBelongsPermWithoutRoute('update', 'repairs.booking.bill')"
            >修改（F3）</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="
              !thisRow.id ||
                thisRow.status == '已取消' ||
                thisRow.status == '已转单'
            "
            @click="cancelBookings"
            v-if="hasBelongsPermWithoutRoute('cancel', 'repairs.booking.bill')"
            >取消（F4）</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="
              !thisRow.id ||
                thisRow.status == '已取消' ||
                thisRow.status == '已转单'
            "
            @click="repairOrder"
            v-if="hasBelongsPermWithoutRoute('trans', 'repairs.booking.bill')"
            >转接待（F7）</el-button
          >
        </div>
        <div
          class="flex-block-bg flex-block-margin flex-block-padding seach-form-box"
        >
          <el-form ref="form" :model="form" inline label-width="70px">
            <el-form-item label="车牌号">
              <el-input
                v-model="form.plateNumber"
                placeholder="车牌号"
                size="small"
              />
            </el-form-item>
            <el-form-item label="客户名称/电话" label-width="100px">
              <!--  :default-value.sync="form.customerName" -->
              <cooperatorsSelect
                v-model="form.cooperatorId"
                :clearable="false"
                :allowCreate="false"
                size="small"
                :allow-create="
                  hasCompletePerm('basics.cooperators.createCustomer')
                "
                no-data-tips="没有查询到客户,回车新增"
                type="customer"
                class="switch-focus focus-cooperatorId"
                placeholder="请选择"
              />
            </el-form-item>
            <el-form-item label="预约人/预约电话" label-width="110px">
              <el-input
                type="text"
                v-model="form.contacts"
                placeholder="预约电话"
                size="small"
                maxlength="11"
              />
            </el-form-item>
            <el-form-item label="预约时间">
              <el-date-picker
                v-model="form.time"
                type="daterange"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预约状态">
              <div
                style="width: 179px;height: 35px;line-height: 32px;padding-top: 3px;"
              >
                <ht-select
                  multiple
                  collapse-tags
                  filterable
                  size="mini"
                  v-model="form.status"
                  :options="statusOptions"
                  :trigger-on-focus="false"
                  class="switch-focus focus-number"
                  placeholder="请选择"
                  highlight-first-item
                  has-selecte-all-val
                />
              </div>
            </el-form-item>
            <el-form-item label="接待员">
              <div
                style="width: 179px;height: 35px;line-height: 32px;padding-top: 3px;"
              >
                <!-- <ht-select
                  multiple
                  collapse-tags
                  filterable
                  size="mini"
                  v-model="form.receptionistIds"
                  :options="statusOptions"
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
                  v-model="form.receptionistIds"
                  size="small"
                  placeholder="请输入接待员名称"
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
              </div>
            </el-form-item>
            <el-button type="primary" size="small" @click="searchList"
              >查询（F5）</el-button
            >
            <el-button type="primary" size="small" @click="resetList"
              >重置（F6）</el-button
            >
          </el-form>
        </div>
        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-setting-table
            v-loading="loading"
            pagination
            :data="tableData"
            :columns="tableColumns"
            :total="totalSize"
            :current-page.sync="currentPage"
            :selected-rows.sync="selectedRows"
            @row-click="selectChange"
            @pageChange="_handleSizeChange"
            table-name="customers-appointment-table"
          />
        </div>
      </div>
      <addEditAppointmentDialog
        :visible.sync="showDialog"
        :EditObj="thisRow"
        @updateList="updateLists"
      />
      <repairOrderDialog
        :visible.sync="showOrderDialog"
        :EditObj="thisRow"
        @updateList="updateLists"
      />
    </div>
  </div>
</template>

<script>
import { APPOINTMENT_COLUMNS } from "../../const/columns";
import { mapState } from "vuex";
import { baseDictionary } from "@/api/base/base"; // 基础信息
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { bookingsList, bookingsCancel } from "@/api/repairs/bookings";
import addEditAppointmentDialog from "../../addEditAppointmentDialog";
import repairOrderDialog from "../../repairOrderDialog";
import { CooperatorsSelect } from "@/components/select";
import { getSystemParamsDetail } from "@/api/base/base"; // 获取设置详情
import defaultDateRange from "@/utils/defaultDateRange"; // 日期
import { userMsg } from "@/utils/store";

export default {
  name: "customers-appointment",
  components: {
    addEditAppointmentDialog,
    repairOrderDialog,
    CooperatorsSelect
  },
  data() {
    return {
      loading: false,
      manLoading: false,
      form: {},
      tableData: [],
      selectedRows: [],
      tableColumns: [...APPOINTMENT_COLUMNS],
      statusOptions: [
        { id: "超时未到", name: "超时未到" },
        { id: "未到店", name: "未到店" },
        { id: "已转单", name: "已转单" },
        { id: "已取消", name: "已取消" }
      ],
      totalSize: 0,
      currentPage: 1,
      showDialog: false,
      showOrderDialog: false,
      thisRow: {},
      businessTypes: {},
      userLists: {},
      userOptions: []
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.getSettingDate();
  },
  activated() {
    this.getBaseDictionarys();
    this.getUsers();
    this.getBookingsList();
    this.getSettingDate();
  },
  methods: {
    getSettingDate() {
      const params = {
        module: "common",
        type: "queryDefaultMonths"
      };
      getSystemParamsDetail(params).then(res => {
        let date = [];
        res.companyParams.forEach(item => {
          if (item.id == userMsg().userInfoMsg.companyId) {
            date = defaultDateRange.getSumDefaultDateRange(item.value);
          }
        });
        this.$set(this.form, "time", date);
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
            roles: ["receptionConsultant", "systemAdmin", "companyAdmin"],
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
    // 获取基础字典信息
    getBaseDictionarys() {
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        res.options.forEach(item => {
          this.businessTypes[item.id] = item.name;
        });
      });
    },
    // 获取用户信息
    getUsers() {
      const params = {
        company: "self",
        roles: ["receptionConsultant", "systemAdmin", "companyAdmin"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
      });
    },
    getBookingsList(page) {
      this.loading = true;
      if (this.form.time) {
        this.form.startDate = this.form.time[0] ? this.form.time[0] : "";
        this.form.endDate = this.form.time[1] ? this.form.time[1] : "";
      } else {
        this.form.startDate = "";
        this.form.endDate = "";
      }
      bookingsList({
        ...this.form,
        page,
        pageSize: this.pageSize
      })
        .then(res => {
          const { rows, totalSize } = res;
          this.totalSize = totalSize;
          this.tableData = rows || [];
          this.selectedRows = [];
          this.thisRow = {};
          if (rows.length > 0) {
            this.selectedRows.push(rows[0]);
            this.thisRow = rows[0];
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchList() {
      this.getBookingsList(this.currentPage);
    },
    updateLists(val) {
      if (val == 1) {
        // 新增 清除查询条件
        this.resetList();
      }
      if (val == 2) {
        this.getBookingsList(this.currentPage);
      }
    },
    // 清除搜索条件
    resetList() {
      this.thisRow = {};
      this.form = {};
      this.getSettingDate();
      this.getBookingsList(this.currentPage);
    },
    // 当前选中行
    selectChange(e) {
      this.selectedRows = [];
      this.thisRow = e;
      this.selectedRows.push(e);
    },
    // 新增预约
    addBookings() {
      this.thisRow = {};
      this.showDialog = true;
    },
    // 编辑预约
    editBookings() {
      if (this.thisRow.id) {
        this.showDialog = true;
      }
    },
    // 取消预约
    cancelBookings() {
      if (this.thisRow.id) {
        this.$confirm("确认取消此预约?", "取消预约", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            bookingsCancel({ id: parseInt(this.thisRow.id) }).then(() => {
              this.$message({
                type: "success",
                message: "已取消预约!"
              });
              this.getBookingsList(this.page);
            });
          })
          .catch(() => {
            // 取消
          });
      }
    },
    // 转接待
    repairOrder() {
      this.showOrderDialog = true;
    },
    // 切换页码
    _handleSizeChange(page) {
      this.currentPage = page;
      this.getBookingsList(this.currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.customers-appointment {
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
}
</style>
