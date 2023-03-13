<template>
  <div class="shelves">
    <el-tabs type="card" class="shelves-tabs" tab-position="left" v-model="activeTab" @tab-click="changeTab">
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
import OnParts from "./onParts/index.vue";
import OffParts from "./offParts/index.vue";
import { TabChangeMixin } from "@/mixins/tabChangeMixin.js";

export default {
  mixins: [TabChangeMixin],
  name: "VipCard",
  components: {
    OnParts,
    OffParts,
  },
  data() {
    return {
      routeParamsName: "childTabName",
      activeTab: "OnParts",
      defaultTab: "OnParts",
      tabs: [
        { id: "OnParts", name: "已上架配件" },
        { id: "OffParts", name: "已下架配件" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.shelves {
  height: 100%;
  /deep/ .shelves-tabs {
    height: 100%;
    .el-tabs__header.is-left {
      margin-right: 0;
    }
    .el-tabs__content {
      height: 100%;
      box-sizing: border-box;
      padding: @padding-size-secondary;
      background-color: @bg-color-base;
    }
    &.el-tabs--card .el-tabs__nav {
      border: none;
      .el-tabs__item {
        border: none;
        color: @text-color-base;
      }
      .is-active {
        background-color: rgba(@color-link, 0.1);
      }
    }
  }
}
</style>


