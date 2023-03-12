<template>
  <div class="parts-manage">
    <el-tabs class="parts-tabs" v-model="activeTab" @tab-click="changeTab">
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :key="index"
        :label="tab.name"
        :name="tab.id"
      >
        <components v-if="activeTab === tab.id" :is="tab.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Parameters from "./parameters/index.vue";
import Shelves from "./shelves/index.vue";
import { TabChangeMixin } from "@/mixins/tabChangeMixin.js";

export default {
  mixins: [TabChangeMixin],
  name: "VipCard",
  components: {
    Parameters,
    Shelves
  },
  data() {
    return {
      activeTab: "Parameters",
      defaultTab: "Parameters",
      tabs: [
        { id: "Parameters", name: "参数设置" },
        { id: "Shelves", name: "配件上下架" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.parts-manage {
  height: 100%;
  /deep/ .parts-tabs {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .el-tabs__header {
      margin: 0;
    }
    & > .el-tabs__content {
      flex: 1;
      padding: 0;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
