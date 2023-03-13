<template>
  <el-dialog
    :title="type === 'details' ? '选择项目/套餐' : '选择赠品'"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="800px"
    @closed="closed"
  >
    <el-tabs tab-position="left" type="border-card" v-model="activeTabName">
      <el-tab-pane label="服务项目" name="projectTable">
        <ProjectTable
          v-if="activeTabName === 'projectTable'"
          :projects="projects"
        ></ProjectTable>
      </el-tab-pane>
      <el-tab-pane label="项目套餐" name="packageTable">
        <PackageTable
          v-if="activeTabName === 'packageTable'"
          :packages="packages"
        ></PackageTable>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer">
      <el-button size="small" @click="hide">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProjectTable from "./projectTable.vue";
import PackageTable from "./packageTable.vue";

export default {
  name: "ProjectDialog",
  components: {
    ProjectTable,
    PackageTable
  },
  props: {
    type: String,
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: true,
      loading: false,
      activeTabName: "projectTable",
      projects: [], // 服务项目
      packages: [] // 项目套餐
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    closed() {
      this.$emit("hide");
    },
    handleSubmit() {
      const projects = this.projects.filter(item => item.goodsId);
      const packages = this.packages.filter(item => item.goodsId);
      for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        if(!element.qty) {
          this.$message.error("请填写服务项目的数量！");
          return false;
        }
      }
      for (let index = 0; index < packages.length; index++) {
        const element = packages[index];
        if(!element.qty) {
          this.$message.error("请填写项目套餐的数量！");
          return false;
        }
      }
      this.$emit("updateProject", {
        type: this.type,
        projects,
        packages
      });
      this.$emit("hide");
    }
  },
  created() {
    const projects = this.project[this.type].projects || [];
    this.projects = JSON.parse(JSON.stringify(projects));
    const packages = this.project[this.type].packages || [];
    this.packages = JSON.parse(JSON.stringify(packages));
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  .el-dialog__body {
    height: 500px;
    padding: 0;
    .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: 100%;
        box-sizing: border-box;
        padding: @padding-size-secondary;
      }
    }
    .el-tabs--left .el-tabs__header.is-left {
      margin-right: 0;
    }
  }
  .el-dialog__footer {
    padding-top: @padding-size-main;
    padding-bottom: @padding-size-main;
  }
}
</style>
