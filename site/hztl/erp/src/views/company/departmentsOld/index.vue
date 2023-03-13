<template>
  <div class="container-box">
    <ht-card v-loading="loading" title="组织架构">
      <div v-for="(item, index) in setTree" :key="index">
        <team-tree
          :item="item"
          @newAddDps="newAdds"
          @editDps="editDepartMent"
          @deleteDps="deleteDeparts"
        />
      </div>
      <template v-slot:after-title>
        <el-popover
          placement="top"
          width="500"
          style="float:right;color:#FF5454"
          trigger="click"
        >
          <p>
            可管理账套下各公司组织架构，对公司内部部门进行增加、删除、修改等操作。设置完成后，可将员工分配至已设置部门。
          </p>
          <span
            slot="reference"
            class="text-danger"
            style="cursor:pointer;float:right"
            ><i class="el-icon-question"></i>什么是组织架构</span
          >
        </el-popover>
      </template>
    </ht-card>
    <edit-department
      :visible.sync="deleteDepartsVisible"
      :list="staffList"
      :company-id="companyId"
      :departments-info="departmentsInfo"
      @handleDeleteDepartments="handleDeleteDepartments"
    />
  </div>
</template>
<script>
import TeamTree from "./components/TeamTree";
import EditDepartment from "./components/EditDepartment";
import {
  createDepartments,
  deleteDepartments,
  getAllDepartments,
  loadDepartmentStaffs,
  updateDepartments
} from "@/api/company/company";

export default {
  name: "Teamer",
  components: { "team-tree": TeamTree, EditDepartment },
  data() {
    return {
      setTree: [],
      loading: false,
      deleteDepartsVisible: false,
      staffList: [],
      companyId: null,
      departmentsInfo: {}
    };
  },
  mounted() {
    this.getcompanyDepartments();
  },
  methods: {
    getcompanyDepartments() {
      // 获取账套下所有公司及部门
      getAllDepartments()
        .then(data => {
          this.setTree = data;
        })
        .catch(() => {});
    },
    newAdds(val) {
      // 新增部门
      createDepartments(val)
        .then(() => {
          this.getcompanyDepartments();
          this.$message.success({ message: "添加成功" });
        })
        .catch(() => {});
    },
    editDepartMent(val) {
      // 编辑部门
      updateDepartments(val)
        .then(() => {
          this.getcompanyDepartments();
          this.$message.success({ message: "修改成功" });
        })
        .catch(() => {});
    },
    deleteDeparts(val, partentId) {
      this.loadStaffsList(val, partentId);
    },
    handleDeleteDepartment(val, params) {
      this.$confirm(`是否删除 ${val.name} 部门？`, "提示", {
        type: "warning"
      }).then(() => {
        deleteDepartments(val.id, params || {}).then(() => {
          this.$message.success("删除成功！");
          this.getcompanyDepartments();
        });
      });
    },
    async loadStaffsList(val, partentId) {
      const res = await loadDepartmentStaffs(val.id);
      if (res && res.length) {
        this.deleteDepartsVisible = true;
        this.staffList = res.map(item => {
          return { ...item, oldDepartmentName: val.name };
        });
        this.companyId = partentId;
        this.departmentsInfo = { ...val };
      } else {
        this.handleDeleteDepartment(val);
      }
    },
    handleDeleteDepartments(val) {
      this.deleteDepartsVisible = false;
      this.handleDeleteDepartment(this.departmentsInfo, val);
    }
  }
};
</script>
