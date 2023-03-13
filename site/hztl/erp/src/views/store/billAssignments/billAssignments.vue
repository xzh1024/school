<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      style="margin: 5px 0 0 0;"
      @change="changeTab"
    />
    <components :is="activeTab" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import Register from "./register/index.vue";
import Performance from "./performance/index.vue";
import { TabsModule } from "./register/interface";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import TabChangeMixin from "@/mixins/tabChangeMixin";

@Component({
  name: "BillAssignments",
  components: {
    Register,
    Performance
  }
})
export default class BillAssignments extends Mixins(
  HotkeyMixin,
  TabChangeMixin
) {
  public activeTab = "Register";
  public defaultTab = "Register";
  public tabs: Array<TabsModule> = [
    { id: "Register", name: "出入库登记" },
    { id: "Performance", name: "人员绩效查询" }
  ];

  mounted() {
    const register =
      this.hasAutoPerm("register.in.read") ||
      this.hasAutoPerm("register.out.read");
    const performance =
      this.hasAutoPerm("performance.our.read") ||
      this.hasAutoPerm("performance.rests.read");
    if (register && !performance) {
      this.tabs = [{ id: "Register", name: "出入库登记" }];
      this.defaultTab = "Register";
      this.activeTab = "Register";
      this.changeTab();
    } else if (performance && !register) {
      this.tabs = [{ id: "Performance", name: "人员绩效查询" }];
      this.defaultTab = "Performance";
      this.activeTab = "Performance";
      this.changeTab();
    } else if (!register && !performance) {
      this.tabs = [];
      this.defaultTab = "";
      this.activeTab = "";
      this.changeTab();
    }
  }
}
</script>
