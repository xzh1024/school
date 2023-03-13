<template>
  <div class="layout-container">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-regular bg-color-white"
      @change="changeTab"
    />
    <div class="layout-main"><components :is="activeTab" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { TabModel } from "@/common/interface/commonInterface";
import OnParts from "./onParts/index.vue";
import OffParts from "./offParts/index.vue";
import TabChangeMixin from "@/common/mixins/tabChangeMixin";

@Component({
  name: "Shelves",
  components: {
    OnParts,
    OffParts
  }
})
export default class Shelves extends Mixins(TabChangeMixin) {
  public routeParamsName = "childTabName";
  public activeTab = "OnParts";
  public defaultTab = "OnParts";
  public tabs: Array<TabModel> = [
    { id: "OnParts", name: "已上架配件" },
    { id: "OffParts", name: "已下架配件" }
  ];
}
</script>
