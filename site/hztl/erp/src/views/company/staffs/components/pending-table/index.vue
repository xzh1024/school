<template>
  <div class="container-box">
    <ht-card title="待审核员工列表" no-padding class="auto-card">
      <ht-table
        :columns="detailsFormatColumns"
        :data="tableData"
        :loading="loading"
        :selected-rows.sync="selectedRows"
        :key-scope="keyScope"
        setting-all-column
        show-table-setting
        @rowOperation="auditHandle"
        @table-setting="handleTableSetting"
      />
    </ht-card>
    <employee-information
      :visible.sync="employeeInformationDialog"
      :staff-id="staffId"
      type="pendingTable"
      @handleUpdateStaffInfo="handleUpdateStaffInfo"
      @handleUpdateTable="handleUpdateTable"
    />
    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
    <ht-dialog
      v-switch-focus="focusData"
      :visible.sync="passCheckDialog"
      title="是否审核通过"
      width="300px"
    >
      <el-form
        ref="ruleForm"
        :model="staffCheckForm"
        :rules="staffCheckRules"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="是否通过">
          <el-radio-group v-model="staffCheckForm.radio">
            <el-radio :label="1">
              通过
            </el-radio>
            <el-radio :label="2">
              拒绝
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="staffCheckForm.radio === 2"
          label="拒绝原因"
          prop="reason"
        >
          <ht-input
            v-model="staffCheckForm.reason"
            :rows="2"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-align">
        <el-button
          class="switch-focus focus-sure"
          type="primary"
          size="mini"
          plain
          @click="handlePassCheckStaff(staffCheckForm.radio)"
        >
          确定（F3）
        </el-button>
        <el-button
          class="switch-focus focus-cancel"
          type="primary"
          size="mini"
          plain
          @click="passCheckDialog = false"
        >
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>
<script>
import { EditColumns } from "@/components/table";
import EmployeeInformation from "../EmployeeInformation";
import hotkeys from "hotkeys-js";
import { TABLE_STAFFS_PENDING_LIST_TABLE } from "@/constants";
import {
  agreeStaffs,
  loadPendingStaffs,
  refuseStaffs
} from "@/api/company/company";
import baseIndexJump from "@/utils/baseIndexJump";

let lastKeyScope;
const defualtFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};
const defaultStaffCheckForm = {
  radio: 1,
  reason: ""
};

export default {
  name: "PendingTable",
  components: { EditColumns, EmployeeInformation },
  data() {
    return {
      tableData: [],
      selectedRows: [],
      keyScope: Symbol("staffPendingTable"),
      keyScope2: Symbol("staffCheckPassDialog"),
      loading: false,
      employeeInformationDialog: false,
      editColumnsVisible: false,
      passCheckDialog: false,
      detailsName: TABLE_STAFFS_PENDING_LIST_TABLE.name,
      detailsColumns: [],
      staffId: null,
      focusData: {
        ...defualtFocusData
      },
      staffCheckForm: {
        ...defaultStaffCheckForm
      },
      staffCheckRules: {
        reason: [{ required: true, message: "请输入原因", trigger: "blur" }]
      }
    };
  },
  computed: {
    baseDetailsColumns() {
      return TABLE_STAFFS_PENDING_LIST_TABLE.columns;
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function auditHandle(row, e) {
        e.stopPropagation();
        self.auditHandle(row);
      }
      function hasAuditPerm(row) {
        return self.hasAuditPerm(row);
      }
      return this.detailsColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {hasAuditPerm(row) ? (
                  <el-tooltip placement="top" content="审核" enterable={false}>
                    <i
                      class="icon operation-icon pass-check-icon"
                      on-click={e => auditHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "Staffs" &&
        to.query.tabName === "Pending" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.loadData();
      }
    },
    passCheckDialog: {
      handler(val, oldVal) {
        if (val) {
          lastKeyScope = hotkeys.getScope();
          this.staffCheckForm = { ...defaultStaffCheckForm };
          setTimeout(() => {
            this.updateFocusData({
              initial: "focus-sure"
            });
            hotkeys.setScope(this.keyScope2);
          }, 200);
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("left,right,f3", { scope: this.keyScope2 }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.handlePassCheckStaff(this.staffCheckForm.radio);
          break;
        case "left":
          e.preventDefault();
          this.updateFocusData({ type: "up" });
          break;
        case "right":
          e.preventDefault();
          this.updateFocusData({ type: "down" });
          break;
        default:
          return;
      }
    });
  },
  activated() {
    hotkeys.setScope(this.keyScope);
    this.loadData();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    loadData() {
      this.loading = true;
      return loadPendingStaffs()
        .then(res => {
          this.tableData = res
            ? res.map(item => {
                return { ...item, status: "待审核" };
              })
            : [];
          if (this.tableData.length) {
            this.selectedRows = [this.tableData[0]];
          }
          this.loading = false;
          this.$emit("update:isRefresh", false);
          const { jumpId, jumpData } = baseIndexJump.getInfo();
          if (jumpId === "auditStaff" && jumpData) {
            let selectedRow = null;
            selectedRow = this.tableData.find(item => item.id === jumpData);
            if (selectedRow) {
              this.selectedRows = [selectedRow];
              if (this.hasAuditPerm(selectedRow)) {
                this.auditHandle(selectedRow);
              }
            }
            baseIndexJump.clearInfo();
          }
        })
        .catch(() => {
          this.loading = false;
        });
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
    auditHandle(row) {
      this.selectedRows = [row];
      this.staffId = row.id;
      this.passCheckDialog = true;
    },
    hasAuditPerm(row) {
      return this.hasBelongsPerm("audit", row.belongs);
    },
    handleUpdateStaffInfo(val) {
      if (val) return;
      this.employeeInformationDialog = false;
      this.loadData();
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handlePassCheckStaff(val) {
      switch (val) {
        case 1:
          this.handleAgreeStaffs();
          break;
        case 2:
          this.handleRefuseStaff();
          break;
        default:
          break;
      }
    },
    handleAgreeStaffs() {
      agreeStaffs(this.staffId).then(() => {
        this.$message.success({ message: "已通过员工申请", showClose: true });
        this.passCheckDialog = false;
        this.loadData();
        this.employeeInformationDialog = true;
      });
    },
    handleRefuseStaff() {
      refuseStaffs({
        id: this.staffId,
        reason: this.staffCheckForm.reason
      }).then(() => {
        this.$message.success({ message: "已拒绝员工加入", showClose: true });
        this.passCheckDialog = false;
        this.loadData();
      });
    },
    handleUpdateTable() {
      this.loadData();
    }
  }
};
</script>
