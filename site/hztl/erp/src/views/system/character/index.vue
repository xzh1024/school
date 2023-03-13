<template>
  <section class="container-box">
    <div class="header">
      <el-button
        :disabled="!hasAutoPerm('create')"
        type="primary"
        size="mini"
        @click="addNewRoles"
      >
        新增角色（F2）
      </el-button>
      <el-button
        :disabled="copyDisabled || !hasAutoPerm('create')"
        type="primary"
        size="mini"
        @click="copyRoles"
      >
        复制角色
      </el-button>
      <el-button
        :disabled="resetDisabled || !hasAutoPerm('update')"
        type="primary"
        size="mini"
        @click="resetRoles"
      >
        恢复角色权限
      </el-button>
      <el-button
        :disabled="allSuccess || !hasAutoPerm('update')"
        type="primary"
        size="mini"
        @click="saveRolesPermissions"
      >
        保存（F3）
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right;"
        @click="openManualDialog"
        ><i class="el-icon-question"></i>如何使用角色管理</span
      >
    </div>
    <ht-card :no-padding="true" class="auto-card">
      <el-row class="full-container">
        <el-col :span="14" class="full-container">
          <ht-setting-table
            :data="tableData"
            :columns="tableColumns"
            :selectable="checkboxInitDisabled"
            :key-scope="keyScope"
            :loading="loading"
            :table-name="tableName"
            selection-type="single"
            autofocus
            :selected-rows.sync="selectedRows"
            @row-click="handleCurrentChange"
            @selectChange="handleSelectionChange"
            @rowOperation="handleRowEdit"
          />
        </el-col>
        <el-col :span="10" class="full-container halving-left-line">
          <ht-card title="权限设置" class="full-container">
            <template v-slot:after-title>
              <el-checkbox
                v-model="checkAll"
                :disabled="isSystemAdmin"
                class="check-box-tree"
                @change="isChange"
              >
                拥有全部权限
              </el-checkbox>
            </template>
            <div class="full-container-tree">
              <ht-tree
                ref="trees"
                v-loading="treeLoading"
                :data="treeData"
                :props="defaultProps"
                :default-expanded-keys="expandedArr"
                :render-content="treeRenderContent"
                style="background: #FBFBFB;"
                show-checkbox
                node-key="code"
                highlight-current
                @check="handleChange"
              />
            </div>
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
    <ht-dialog :visible.sync="addDialog" title="新增角色" width="400px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="mini"
      >
        <el-form-item label="角色名称" prop="name">
          <ht-input v-model="ruleForm.name" :maxlength="16" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <ht-input v-model="ruleForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="addDialog = false">
          取 消
        </el-button>
        <el-button
          :loading="addSuccess"
          type="primary"
          size="mini"
          @click="confirm"
        >
          确 定
        </el-button>
      </div>
    </ht-dialog>
    <ht-dialog :visible.sync="copyDialog" title="复制角色" width="400px">
      <el-form
        ref="copyRuleForm"
        :model="copyRuleForm"
        :rules="rules"
        label-width="100px"
        size="mini"
      >
        <el-form-item label="角色名称" prop="name">
          <ht-input v-model="copyRuleForm.name" :maxlength="16" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <ht-input v-model="copyRuleForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="copyDialog = false">
          取 消
        </el-button>
        <el-button
          :loading="copySuccess"
          type="primary"
          size="mini"
          @click="confirmCopy('copyRuleForm')"
        >
          确 定
        </el-button>
      </div>
    </ht-dialog>
    <ht-dialog :visible.sync="editDialog" title="编辑角色" width="400px">
      <el-form
        ref="editRuleForm"
        :model="editRuleForm"
        :rules="rules"
        label-width="100px"
        size="mini"
      >
        <el-form-item label="角色名称" prop="name">
          <ht-input v-model="editRuleForm.name" :maxlength="16" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <ht-input v-model="editRuleForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="editDialog = false">
          取 消
        </el-button>
        <el-button
          :loading="editSuccess"
          type="primary"
          size="mini"
          @click="confirmEdit('editRuleForm')"
        >
          确 定
        </el-button>
      </div>
    </ht-dialog>
    <ht-dialog :visible.sync="staffsDialog" title="员工列表" width="36%">
      <el-table :data="staffList" highlight-current-row stripe border>
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="staffName" label="员工姓名" />
      </el-table>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="staffsDialog = false">
          关 闭
        </el-button>
      </div>
    </ht-dialog>
  </section>
</template>

<script>
import {
  addRoles,
  batchSetPermissions,
  deleteRoles,
  getRolesPermissions,
  resRoles,
  restoreRolesPermissions,
  updateNoInfoRoles
} from "@/api/base/base";
import { CELL_WIDTH } from "@/constants";
import { hotkeyMixin } from "@/mixins";
import eventBus from "@/event";

export default {
  name: "Character",
  mixins: [hotkeyMixin],
  data() {
    return {
      keyScope: Symbol("systemCharacter"),
      addSuccess: false,
      addDialog: false,
      copyDialog: false,
      copySuccess: false,
      editDialog: false,
      editSuccess: false,
      checkAll: false,
      tableData: [],
      tableName: "systemCharacterRolesTable",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      ruleForm: {
        name: "",
        remark: "",
        permissions: []
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ]
      },
      copyRuleForm: {
        name: "",
        remark: ""
      },
      selectedRows: [],
      selectedId: [],
      editRuleForm: {},
      multipleSelection: [],
      loading: true,
      treeLoading: true,
      expandedArr: [],
      staffsDialog: false,
      staffList: []
      // manualVisible: false,
      // showId: 1
      // editRow: {}
    };
  },
  computed: {
    treeRef() {
      return this.$refs.trees.treeRef;
    },
    copyDisabled() {
      if (this.multipleSelection.length === 1) {
        return false;
      } else {
        return true;
      }
    },
    resetDisabled() {
      if (this.multipleSelection.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    allSuccess() {
      if (this.multipleSelection.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    isSystemAdmin() {
      return !!(
        this.multipleSelection &&
        this.multipleSelection.length &&
        this.multipleSelection[0].id === "systemAdmin"
      );
    },
    tableColumns() {
      const controlsColumn = {
        label: "操作",
        prop: "controls",
        width: 70,
        cantExport: true,
        render: (value, row, index) => (
          <div>
            {this.hasAutoPerm("update") && typeof row.id == "number" ? (
              <el-tooltip placement="top" content="编辑" enterable={false}>
                <span
                  class="icon operation-icon icon-edit-info"
                  on-click={e => this.handleEdit(row, e)}
                ></span>
              </el-tooltip>
            ) : null}
            {this.hasAutoPerm("delete") && typeof row.id == "number" ? (
              <el-tooltip placement="top" content="删除" enterable={false}>
                <span
                  class="icon operation-icon icon-delete-info"
                  on-click={e => this.handleDelete(index, row, e)}
                ></span>
              </el-tooltip>
            ) : null}
          </div>
        )
      };

      return [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "multiple",
          label: "选择",
          type: "multiple",
          width: CELL_WIDTH.multiple,
          cantExport: true
        },
        controlsColumn,
        {
          prop: "name",
          label: "角色",
          width: CELL_WIDTH.personName
        },
        {
          prop: "id",
          label: "是否内置",
          width: 70,
          formatter: val => (typeof val === "string" ? "是" : "否")
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.remark
        }
      ];
    }
  },
  mounted() {
    this.resUpdateRoles();
    getRolesPermissions()
      .then(data => {
        // 获取权限树
        this.treeData = this.recurFormateData(data);
        this.treeLoading = false;
      })
      .catch(() => {
        this.treeLoading = false;
      });
  },
  watch: {
    isSystemAdmin(val) {
      this.treeData = this.formatTreeData(this.treeData, val);
    }
  },
  methods: {
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      // this.manualVisible = true;
      eventBus.$emit("open-manual-dialog", 7);
    },
    recurFormateData(data) {
      return data.map(item => {
        const newItem = {
          ...item,
          name: item.tags.name,
          c: item.tags.c,
          code: item.path,
          children: item.children
            ? this.recurFormateData(item.children)
            : undefined
        };
        return newItem;
      });
    },
    formatTreeData(data, disabled) {
      return data.map(item => {
        const newItem = {
          ...item,
          disabled,
          children: item.children
            ? this.formatTreeData(item.children, disabled)
            : undefined
        };
        return newItem;
      });
    },
    mapTree() {
      // 构建权限树一级code
      const checkedList = [];
      this.treeData.forEach(item => {
        checkedList.push(item.code);
      });
      return checkedList;
    },
    resUpdateRoles() {
      // 获取角色列表
      resRoles()
        .then(data => {
          this.tableData = data || [];
          this.loading = false;
          if (this.selectedId.length > 0) {
            this.selectedId.forEach(Id => {
              const selectRow = this.tableData.find(item => item.id == Id);
              this.selectedRows.push(selectRow);
            });
            this.handleSelectionChange(this.selectedRows);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    checkboxInitDisabled(row) {
      // 超级用户不能设置权限
      if (row.id === "systemAdmin") {
        return false;
      } else {
        return true;
      }
    },
    resetRoles() {
      // 重置内置角色
      // eslint-disable-next-line prefer-const
      let codes = [],
        flag;
      this.multipleSelection.forEach(item => {
        if (typeof item.id !== "string") {
          this.$message.warning({
            message: "只能够重置平台内置角色权限"
          });
          flag = false;
        } else {
          codes.push(item.id);
          flag = true;
        }
      });
      if (!flag) return;
      const params = {
        codes: codes
      };
      restoreRolesPermissions(params)
        .then(() => {
          this.$message.success({ message: "重置成功" });
          this.resUpdateRoles();
        })
        .catch(() => {});
    },
    isChange(value) {
      // 权限全选与不全选
      if (value) {
        this.treeRef.setCheckedKeys(this.mapTree());
      } else {
        this.treeRef.setCheckedKeys([]);
      }
    },
    commonSetTree() {
      // 重构选择权限树的code
      const newcheckedArr = this.treeRef.getCheckedKeys();
      if (!newcheckedArr.length) return;
      // eslint-disable-next-line prefer-const
      let resetArr = [],
        flag = false,
        strs = null;
      newcheckedArr.forEach(item => {
        if (flag) {
          // let regex = new RegExp("^" + strs);
          // if (regex.test(`${item}.`)) {
          if (new RegExp(`^${strs}.`.replace(/\./g, "\\.")).test(`${item}.`)) {
            //
            // flag = true;
          } else {
            resetArr.push(item);
            strs = item;
          }
        } else {
          resetArr.push(item);
          strs = item;
          flag = true;
        }
      });
      return resetArr;
    },
    saveRolesPermissions() {
      // 保存角色权限分配
      if (this.allSuccess || !this.hasAutoPerm("update")) return;
      const params = {
        permissions: [],
        ids: []
      };
      if (this.checkAll) {
        params.permissions = ["root"];
      } else {
        if (this.commonSetTree()) {
          params.permissions = this.commonSetTree();
        } else {
          params.permissions = [];
        }
      }
      this.selectedId = [];
      this.multipleSelection.forEach(item => {
        params.ids.push(item.id);
        this.selectedId.push(item.id);
      });
      batchSetPermissions(params)
        .then(() => {
          this.$message.success({ message: "设置成功" });
          // this.checkAll = false;
          this.resUpdateRoles();
          this.$store.dispatch("admin/user/loadUserMsg");
        })
        .catch(() => {
          // this.checkAll = false;
        });
    },
    addNewRoles() {
      // 新增角色按钮
      if (!this.hasAutoPerm("create")) return;
      this.addDialog = true;
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    handleRowEdit(row) {
      if (row && row.id && typeof row.id !== "string") {
        this.handleEdit(row);
      }
    },
    confirm() {
      // 确认新增角色
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.addSuccess = true;
          addRoles(this.ruleForm)
            .then(() => {
              this.addSuccess = false;
              this.resUpdateRoles();
              this.addDialog = false;
              this.$message.success({ message: "新增成功" });
            })
            .catch(() => {
              this.addSuccess = false;
            });
        }
      });
    },
    copyRoles() {
      // 复制角色
      if (this.multipleSelection.length === 1) {
        this.copyDialog = true;
        // let characterNum = Math.floor(Math.random() * 10 + 1);
        this.copyRuleForm = JSON.parse(
          JSON.stringify(this.multipleSelection[0])
        );
        this.copyRuleForm.name = this.copyRuleForm.name + 1;
      } else {
        this.$message.warning({ message: "勾选一个角色进行复制" });
      }
    },
    confirmCopy(formName) {
      // 复制确认
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.copySuccess = true;
          delete this.copyRuleForm.id;
          addRoles(this.copyRuleForm)
            .then(() => {
              this.copySuccess = false;
              this.resUpdateRoles();
              this.copyDialog = false;
            })
            .catch(() => {
              this.copySuccess = false;
            });
        }
      });
    },
    handleDelete(index, val, e) {
      if (e) {
        e.stopPropagation();
      }
      // 删除
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteRoles(val.id)
            .then(() => {
              this.tableData.splice(index, 1);
            })
            .catch(err => {
              if (err.data.length) {
                this.staffList = err.data;
                this.staffsDialog = true;
              }
            });
        })
        .catch(() => {});
    },
    handleEdit(val, e) {
      if (e) {
        e.stopPropagation();
      }
      // 编辑角色
      if (!this.hasAutoPerm("update")) return;
      this.editDialog = true;
      this.editRuleForm = Object.assign({}, this.editRuleForm, val);
    },
    confirmEdit(formName) {
      // 更新角色
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editSuccess = true;
          // 更新非内置角色
          updateNoInfoRoles(this.editRuleForm)
            .then(() => {
              this.editDialog = false;
              this.editSuccess = false;
              this.resUpdateRoles();
              this.$message.success({ message: "更新成功" });
            })
            .catch(() => {
              this.editSuccess = false;
            });
        }
      });
    },
    handleCurrentChange() {
      // click角色查看权限
      // return;
      // if (!val) return;
      // if (val.permissions === undefined) {
      //     this.checkAll = false;
      //     this.treeRef.setCheckedKeys([]);
      // } else {
      //     if (val.permissions[0] === "root") {
      //         this.checkAll = true;
      //         this.treeRef.setCheckedKeys(this.mapTree());
      //     } else {
      //         this.checkAll = false;
      //         this.treeRef.setCheckedKeys(val.permissions);
      //         // this.expandedArr = val.permissions;
      //     }
      // }
    },
    // handleSelectionChange(rows) {
    handleSelectionChange(newVal) {
      // 勾选角色
      // this.editRow = curRow
      this.multipleSelection = newVal;
      if (this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].permissions === undefined) {
          this.checkAll = false;
          this.treeRef.setCheckedKeys([]);
        } else {
          if (this.multipleSelection[0].permissions[0] === "root") {
            this.checkAll = true;
            this.treeRef.setCheckedKeys(this.mapTree());
          } else {
            this.checkAll = false;
            this.treeRef.setCheckedKeys(this.multipleSelection[0].permissions);
          }
        }
      } else {
        this.checkAll = false;
        this.treeRef.setCheckedKeys([]);
      }
    },
    handleChange() {
      // 权限树单个勾选
      if (
        JSON.stringify(this.commonSetTree()) === JSON.stringify(this.mapTree())
      ) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    treeRenderContent(h, { data }) {
      return data.c ? (
        <el-tooltip placement="top" content={data.c} enterable={false}>
          <span>{data.name}</span>
        </el-tooltip>
      ) : (
        <span>{data.name}</span>
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.halving-left-line {
    border-left: 1px solid #D9D9D9;
}

/deep/ .full-container {
    height: 100%;

    .el-card__body {
        height: calc(100% - 40px);
        overflow: auto;
    }
}
</style>
