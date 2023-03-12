<template>
  <div class="group-setting">
    <ht-card
      padding
      class="group-list"
      title="技师列表（按住技师名称，拖动分组）"
    >
      <CompanyTree
        ref="companyTree"
        @nodeChange="nodeChange"
        @commissionsChange="commissionsChange"
      />
    </ht-card>
    <ht-card padding class="tech-setting" title="技师设置">
      <TechInfo :techInfo="techInfo" @techInfoChange="techInfoChange" />
    </ht-card>
    <ht-card padding class="kpi-info" title="班组提成比例占比预览">
      <Kpi :commissions="commissions" :totalWeight="totalWeight" />
    </ht-card>
  </div>
</template>

<script>
import CompanyTree from "./components/companyTree";
import TechInfo from "./components/techInfo";
import Kpi from "./components/kpi";

export default {
  name: "FixClassGroup",
  data() {
    return {
      techInfo: {},
      commissions: [],
      totalWeight: "1"
    };
  },
  components: {
    CompanyTree,
    TechInfo,
    Kpi
  },

  methods: {
    nodeChange(node) {
      if (node.staffCount === 0) {
        this.commissions = [];
      }
      if (node.leaf) {
        this.techInfo = { ...node };
      }
    },
    techInfoChange() {
      this.$refs.companyTree.getTechniciansGroupStructure();
    },
    commissionsChange(commissions, totalWeight) {
      this.commissions = [...commissions];
      this.totalWeight = totalWeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.group-setting {
  height: 90vh;
  display: flex;
  justify-content: space-between;
  padding: 10px;

  .group-list {
    width: 250px;
    margin-right: 10px;
    ::v-deep {
      .el-card__body {
        padding: 0;
      }
    }
  }
  .tech-setting {
    flex: 7;
    margin-right: 10px;
  }
  .kpi-info {
    flex: 4;
  }
}
</style>
