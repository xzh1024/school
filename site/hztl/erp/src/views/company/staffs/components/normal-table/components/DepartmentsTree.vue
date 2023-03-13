<template>
  <div class="staff-departments-tree">
    <el-tree
      :data="departmentsList"
      :props="defaultProps"
      :expand-on-click-node="false"
      node-key="id"
      default-expand-all
      check-on-click-node
      highlight-current
      class="staff-tree"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
import { getCompanyDepartments } from "@/api/company/company";
export default {
  name: "DepartmentsTree",
  props: {},
  data() {
    return {
      departmentsList: [],
      defaultProps: {
        children: "departments",
        label: "name"
      },
      staffInviteCode: null
    };
  },
  mounted() {
    /* 加载公司>部门 */

    this.loadCompanyDepartments();
  },
  methods: {
    async loadCompanyDepartments() {
      const res = await getCompanyDepartments();
      /* */
      this.departmentsList = res.map(item => {
        return { name: item.companyName, ...item };
      });
    },
    handleNodeClick(row, _node) {
      // 点击公司传公司id，点击部门传公司和部门id
      const isCompany = _node.level == 1;
      this.$emit("handleCurrentChange", {
        companyId: isCompany ? row.id : _node.parent.data.id,
        companyName: row.companyName || _node.parent.data.companyName,
        departmentId: isCompany ? null : row.id,
        staffInviteCode:
          row.staffInviteCode || _node.parent.data.staffInviteCode
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.staff-departments-tree > .el-tree {
  background: none;
}

.staff-departments-tree {
  ::v-deep.el-tree--highlight-current {
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: #c0e3ff;
      @include background_color("color-primary", 0.16);
      color: #3aa7ff;
      @include font_color("color-primary");
    }
  }
}
</style>
