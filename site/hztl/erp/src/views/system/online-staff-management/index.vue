<template>
  <div class="container-box">
    <ht-card title="在线员工管理" class="container-space">
      <el-form
        ref="receiveForm"
        :model="searchForm"
        size="mini"
        label-width="60px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="分公司" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="companys"
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="员工姓名" prop="staffName">
              <ht-input
                v-model="searchForm.staffName"
                class="switch-focus focus-name"
                placeholder="真实姓名/显示名称"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="phone" label="员工电话">
              <ht-input
                v-model.number="searchForm.phone"
                class="switch-focus focus-number"
                placeholder="员工电话"
                @intput-enter="debouncedHandleInputEnter"
              />
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
          <el-col :span="3" :offset="1">
            <div class="online-info">
              <p>
                当前在线人数：<span>{{ onlineQty }}</span>
              </p>
              <p>
                可同时在线人数：
                <span v-if="onlineLimit">{{ onlineLimit }}</span>
                <span v-else style="color:#303133">-</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <ht-table
        autofocus
        :loading="tableLoading"
        :data="tableData"
        :total="totalSize"
        :columns="detailsFormatColumns"
        :current-page="currentPage"
        pagination
        setting-all-column
        show-table-setting
        @table-setting="handleTableSetting"
        @pageChange="_handleSizeChange"
      />
    </ht-card>
    <ht-dialog
      :visible.sync="passvisible"
      :close-on-click-modal="false"
      width="600px"
      append-to-body
      title="提示"
    >
      <div class="info">
        <i class="el-icon-warning warning"></i>
        <span>是否强制下线</span>
      </div>
      <div class="dialog-footer-align mt-1">
        <el-button
          type="primary"
          plain
          class="switch-focus focus-bottun"
          size="mini"
          @click.stop="sureHandle"
        >
          确定(F3)
        </el-button>
        <el-button type="primary" plain size="mini" @click="close">
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
  </div>
</template>

<script>
import { getAllCompanies, searchOnlineStaffs } from "@/api/company/company";
import { forceLogout } from "@/api/loginregister/index";
import { mapState } from "vuex";
import debounce from "throttle-debounce/debounce";
import { EditColumns } from "@/components/table";
import { TABLE_STAFFS_ONLINE_LIST } from "@/constants";
import { hotkeyMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "OnlineStaffManagement",
  mixins: [hotkeyMixin],
  data() {
    return {
      editColumnsVisible: false,
      detailsName: TABLE_STAFFS_ONLINE_LIST.name,
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      searchForm: {
        companyIds: "",
        phone: "",
        staffName: ""
      },
      currentPage: 1,
      totalSize: 0,
      tableLoading: false,
      companys: [],
      detailsColumns: [],
      tableData: [],
      currentStaffId: null,
      passvisible: false,
      onlineLimit: 0,
      onlineQty: 0
    };
  },
  components: {
    EditColumns
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "perm"]),
    ...mapState("admin/table", ["pageSize"]),
    baseDetailsColumns() {
      return TABLE_STAFFS_ONLINE_LIST.columns;
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      return this.detailsColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (_, row) => {
              const { staffId, belongs } = row;
              const isBelongOurs = belongs && belongs.includes("our");
              const isBelongsRests = belongs && belongs.includes("rests");
              let allowOperate = false;
              if (this.perm.hasRootPerm) {
                allowOperate = true;
              }
              //如果有操作所在公司的权限,且用户为所在公司的
              if (this.checkPerm("system.onlineStaff.our") && isBelongOurs) {
                allowOperate = true;
              }
              //如果有操作其他公司的权限，且用户为其他公司的
              if (
                this.checkPerm("system.onlineStaff.rests") &&
                isBelongsRests
              ) {
                allowOperate = true;
              }
              if (this.showForceLogoutBtn(staffId) && allowOperate) {
                console.log("call");
                return (
                  <el-button
                    type="primary"
                    size="mini"
                    onClick={e => this.forceOffLine(staffId, e)}
                  >
                    强制下线
                  </el-button>
                );
              }
            }
          };
        }
        return item;
      });
    }
  },
  mounted() {
    this.loadData(this.currentPage);
    this.searchLoadAllCompanies();
  },
  methods: {
    detailsColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    // 初始化分公司数据
    async searchLoadAllCompanies() {
      const data = await getAllCompanies({
        page: 1,
        pageSize: 999
      });
      let companyList = [];
      const { companyId } = store.userInfoMsg();
      // 根据权限过滤掉一些公司
      /**
       * hasRootPerm 不过滤
       * system.onlineStaff 也不过滤
       * system.onlineStaff.our 保留本公司
       * system.onlineStaff.rests 保留其他公司
       */
      if (this.perm.hasRootPerm || this.hasPerm("system.onlineStaff")) {
        this.companys = data.rows;
        return;
      }
      if (this.hasPerm("system.onlineStaff.our")) {
        companyList = companyList.concat(
          data.rows.filter(item => item.id === companyId)
        );
      }
      if (this.hasPerm("system.onlineStaff.rests")) {
        companyList = companyList.concat(
          data.rows.filter(item => item.id !== companyId)
        );
      }
      this.companys = companyList;
    },
    checkPerm(key) {
      const pathArray = key.split(".");
      let currentPath = "";
      let checkPermStatus = false;
      pathArray.forEach((k, idx) => {
        currentPath += idx > 0 ? "." + k : k;
        if (this.perm.perms.includes(currentPath)) {
          checkPermStatus = true;
        }
      });
      return checkPermStatus;
    },
    loadData(page) {
      this.tableLoading = true;
      searchOnlineStaffs({
        page,
        pageSize: this.pageSize,
        ...this.searchForm,
        phone: this.searchForm.phone.toString()
      })
        .then(data => {
          this.tableLoading = false;
          this.tableData = data.rows || [];
          const { onlineLimit, onlineQty, totalSize } = data;
          this.totalSize = totalSize;
          this.onlineLimit = onlineLimit;
          this.onlineQty = onlineQty;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    forceOffLine(staffId, e) {
      e.stopPropagation();
      this.passvisible = true;
      this.currentStaffId = staffId;
    },
    handleSearch() {
      this.$refs["receiveForm"].validate(valid => {
        if (valid) {
          this.loadData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    clearSearchForm() {
      this.$refs["receiveForm"].resetFields();
    },
    showForceLogoutBtn(staffId) {
      return !(staffId == store.userInfoMsg().staffId);
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadData(page);
    },
    sureHandle() {
      this.passvisible = false;
      forceLogout({
        staffId: this.currentStaffId
      })
        .then(() => {
          this.currentStaffId = null;
          this.loadData();
        })
        .catch(() => {
          this.currentStaffId = null;
        });
    },
    close() {
      this.currentStaffId = null;
      this.passvisible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.info{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px;
}

.warning{
  font-size: 30px;
  color: #E6A23C;
  margin-right: 10px;
}

.online-info p {
  margin: 0;
}

.online-info p span {
  color: red;
}
</style>
