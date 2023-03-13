<template>
  <div class="container-box">
    <ht-card>
      <el-form
        ref="staffSearhForm"
        v-switch-focus="focusData"
        :model="formsQuery"
        label-width="60px"
        size="mini"
        class="form-item-no-margin-bottom"
        @click.native.stop="setFormKeyScope"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="员工姓名" prop="name">
              <ht-input
                v-model="formsQuery.name"
                class="switch-focus focus-name"
                placeholder="真实姓名/显示名称"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="number" label="员工编号">
              <ht-input
                v-model.number="formsQuery.number"
                class="switch-focus focus-number"
                placeholder="员工编号"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="status" label="员工状态">
              <ht-autoselect
                v-model="formsQuery.status"
                :options="staffStatus"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="员工状态"
                highlight-first-item
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px">
              <el-button
                type="primary"
                plain
                class="ml-1"
                @click="handleSearchStaffs"
              >
                查询(F5)
              </el-button>
              <el-button type="primary" plain @click="resetForm">
                重置(F6)
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card v-if="hasBelongsPerm('create')">
      <el-button
        type="primary"
        size="mini"
        @click="addEmployeeFlowDialog = true"
        >新增员工</el-button
      >
    </ht-card>
    <ht-card class="auto-card" no-background no-padding>
      <el-row :gutter="5" class="employee-box">
        <el-col :span="4" style="height: 100%;">
          <ht-card title="分公司及部门">
            <div class="employee-container-tree">
              <departments-tree
                ref="departmentTree"
                @handleCurrentChange="handleCurrentChange"
              />
            </div>
          </ht-card>
        </el-col>
        <el-col :span="20" style="height: 100%;">
          <ht-card title="员工" no-padding>
            <template v-slot:after-title>
              <div
                v-if="staffInviteCode"
                style="text-align: right; font-size: 14px;"
              >
                <span>员工邀请码:</span>
                <clipboard-code
                  :staff-invite-code="staffInviteCode"
                  code-dom-name="list-dom-code"
                />
                <i class="el-icon-info ml-1" style="color: #F56C6C;" />
                <span
                  style="color: #F56C6C; cursor: pointer;"
                  @click="staffInviteCodeTipsVisible = true"
                  >如何新增员工 ?</span
                >
              </div>
            </template>
            <ht-table
              :columns="detailsFormatColumns"
              :data="tableData"
              :loading="loading"
              :key-scope="keyTableScope"
              :selected-rows.sync="selection"
              style="overflow: auto;"
              setting-all-column
              show-table-setting
              @hotkeysUp="handleKeyCode"
              @table-setting="handleTableSetting"
              @rowOperation="handleRowEdit"
              @click.native.stop="setTableKeyScope"
            />
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
    <employee-information
      :visible.sync="employeeInformationDialog"
      :staff-id="staffId"
      type="staffsTable"
      @handleUpdateStaffInfo="handleUpdateStaffInfo"
    />
    <add-employee-flow
      :visible.sync="addEmployeeFlowDialog"
      @handleUpdateStaffInfo="handleUpdateStaffInfo"
    />
    <unfinished-bills-box
      :visible.sync="showUnfinishedBillsBox"
      :unfinished-bills-rows="unfinishedBillsRows"
      @on-sure="showChangeCooperatorManagerBoxByLeave"
    />
    <change-cooperator-manager
      :visible.sync="showChangeCooperatorManagerBox"
      :is-purchase-man="isPurchaseMan"
      :is-sales-man="isSalesMan"
      :staff-id="staffId"
      @on-change="handleRoleChange"
    />
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
    <staff-invite-code-tips
      :visible.sync="staffInviteCodeTipsVisible"
      :staff-invite-code="staffInviteCode"
      :company-name="companyName"
    />
  </div>
</template>
<script>
import { EditColumns } from "@/components/table";
import EmployeeInformation from "../EmployeeInformation";
import AddEmployeeFlow from "../AddEmployeeFlow";
import ChangeCooperatorManager from "../ChangeCooperatorManager";
import DepartmentsTree from "./components/DepartmentsTree";
import StaffInviteCodeTips from "./components/StaffInviteCodeTips";
import ClipboardCode from "./components/ClipboardCode";
import UnfinishedBillsBox from "./components/UnfinishedBillsBox";
import { checkStaffs, leaveStaffs, searchStaffs } from "@/api/company/company";
import { mapActions, mapState } from "vuex";
import { TABLE_STAFFS_LIST_TABLE } from "@/constants";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

export default {
  name: "StaffsTable",
  components: {
    DepartmentsTree,
    EmployeeInformation,
    UnfinishedBillsBox,
    ChangeCooperatorManager,
    EditColumns,
    AddEmployeeFlow,
    StaffInviteCodeTips,
    ClipboardCode
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      formsQuery: {},
      tableData: [],
      keyTableScope: Symbol("staffsTable"),
      keyFormScope: Symbol("staffsForm"),
      staffStatus: [
        { id: 1, name: "在职" },
        { id: 2, name: "已离职" }
      ],
      employeeInformationDialog: false,
      staffId: null,
      showUnfinishedBillsBox: false,
      unfinishedBillsRows: [],
      isPurchaseMan: false,
      isSalesMan: false,
      showChangeCooperatorManagerBox: false,

      detailsName: TABLE_STAFFS_LIST_TABLE.name,
      detailsColumns: [],
      editColumnsVisible: false,
      addEmployeeFlowDialog: false,
      loading: false,
      selection: [],
      staffInviteCode: null,
      companyName: null,
      staffInviteCodeTipsVisible: false,
      focusData: {
        updateIndex: 0,
        initial: "focus-name",
        type: null
      }
    };
  },
  computed: {
    baseDetailsColumns() {
      return TABLE_STAFFS_LIST_TABLE.columns;
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function handleEdit(row, e) {
        e.stopPropagation();
        self.handleEdit(row);
      }
      function handleDelete(row, e) {
        e.stopPropagation();
        self.handleDelete(row);
      }
      function hasLeavePerm(row) {
        return self.hasLeavePerm(row);
      }
      return this.detailsColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {this.hasBelongsPerm("update", row.belongs) ? (
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={e => handleEdit(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {hasLeavePerm(row) ? (
                  <el-tooltip placement="top" content="离职" enterable={false}>
                    <i
                      class="icon operation-icon leave-icon"
                      on-click={e => handleDelete(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            )
          };
        }
        return item;
      });
    },
    ...mapState("admin/user", {
      userInfoMsg: state => state.userInfoMsg
    })
  },
  mounted() {
    this.loadStaffs();
    hotkeys("f5, f6", { scope: this.keyFormScope }, e => {
      switch (e.code) {
        case "F5":
          this.handleSearchStaffs();
          break;
        case "F6":
          this.resetForm();
          break;
        default:
          break;
      }
    });
  },
  activated() {
    this.setKeyScope();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyFormScope);
    hotkeys.deleteScope(this.keyTableScope);
  },
  methods: {
    setKeyScope() {
      if (this.tableData && this.tableData.length) {
        hotkeys.setScope(this.keyTableScope);
        this.updateFocusData({ initial: null });
      } else {
        this.updateFocusData({ initial: "focus-name" });
        hotkeys.setScope(this.keyFormScope);
        this.selection = [];
      }
    },
    setFormKeyScope() {
      hotkeys.setScope(this.keyFormScope);
      this.selection = [];
    },
    setTableKeyScope() {
      hotkeys.setScope(this.keyTableScope);
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    ...mapActions("admin/staffs", ["loadAll"]),

    async loadStaffs() {
      this.loading = true;
      this.formsQuery.number = this.formsQuery.number || undefined;
      searchStaffs(this.formsQuery)
        .then(res => {
          this.tableData = res.map(item => {
            return { ...item };
          });
          let selectedRow;
          if (this.selection && this.selection.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selection[0].id
            );
          }
          if (!selectedRow) {
            selectedRow = res.length && res[0];
          }
          this.selection = selectedRow ? [selectedRow] : [];
          this.setKeyScope();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleEdit(row) {
      this.staffId = row.id;
      this.employeeInformationDialog = true;
    },
    handleRowEdit(row) {
      this.handleEdit(row);
    },
    handleDelete(row) {
      this.staffId = row.id;
      this.$confirm(`确定要给员工 ${row.staffName} 离职吗?`, {
        type: "info"
      }).then(() => {
        checkStaffs({
          staffId: row.id,
          businessMan: true,
          unfinishedBills: true
        }).then(data => {
          if (data.unfinishedBillsRows && data.unfinishedBillsRows.length) {
            this.unfinishedBillsRows = [...data.unfinishedBillsRows];
            this.isPurchaseMan = data.isPurchaseMan
              ? data.isPurchaseMan
              : false;
            this.isSalesMan = data.isSalesMan ? data.isSalesMan : false;
            this.showUnfinishedBillsBox = true;
          } else if (!data.isPurchaseMan && !data.isSalesMan) {
            this.handleDimission({});
          } else {
            this.isPurchaseMan = data.isPurchaseMan;
            this.isSalesMan = data.isSalesMan;
            this.showChangeCooperatorManagerBox = true;
          }
        });
      });
    },
    hasLeavePerm(row) {
      return (
        this.hasBelongsPerm("leave", row.belongs) &&
        row.status === 1 &&
        store.userInfoMsg().staffId !== row.id
      );
    },
    showChangeCooperatorManagerBoxByLeave() {
      if (this.isPurchaseMan || this.isSalesMan) {
        this.showChangeCooperatorManagerBox = true;
      } else {
        this.handleDimission({});
      }
    },
    handleDimission(businessManTransfer) {
      const params = {
        staffId: this.staffId,
        businessManTransfer
      };
      leaveStaffs(params)
        .then(() => {
          this.$message.success({ message: "离职办理成功", showClose: true });
          this.loadStaffs();
          // 需要更新本地员工列表
          this.loadAll(true);
        })
        .catch(() => {});
    },
    handleRoleChange(businessManTransfer) {
      this.handleDimission(businessManTransfer);
    },
    handleSearchStaffs() {
      this.loadStaffs();
    },
    handleCurrentChange(val) {
      // if (val.staffInviteCode) {
      this.staffInviteCode = val.staffInviteCode;
      this.companyName = val.companyName;
      // }
      this.formsQuery.companyId = val.companyId;
      this.formsQuery.departmentId = val.departmentId;
      this.loadStaffs();
    },
    handleKeyCode(e) {
      switch (e.code) {
        case "F5":
          this.handleSearchStaffs();
          break;
        case "F6":
          this.resetForm();
          break;
        default:
          break;
      }
    },
    resetForm() {
      this.formsQuery.companyId = null;
      this.formsQuery.departmentId = null;
      this.$refs.departmentTree.loadCompanyDepartments();
      this.$refs.staffSearhForm.resetFields();
    },
    handleUpdateStaffInfo(val) {
      if (val) {
        this.employeeInformationDialog = false;
        this.addEmployeeFlowDialog = false;
        this.loadStaffs();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.employee-box
	height 100%
	/deep/.box-card
			height 100%
			.el-card__body
				height calc(100% - 40px)
				.employee-container-tree
					height 100%
					overflow auto
</style>
