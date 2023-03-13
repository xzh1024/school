<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
    />
    <keep-alive>
      <component :is="activeTab" />
    </keep-alive>
  </div>
</template>

<script>
import templateDefinition from "./components/template-definition/index";
import detectManage from "./components/detect-manage/index";
import { tabChangeMixin, hotkeyMixin } from "@/mixins";

export default {
  name: "detectItemManage",
  components: { templateDefinition, detectManage },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "detectManage",
      tabList: [
        // { id: "templateDefinition", name: "检测模板定义" },
        // { id: "detectManage", name: "检测项目管理" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (
      this.hasBelongsPermWithoutRoute("read", "basics.vehicleCheck.template")
    ) {
      this.tabList.push({ id: "templateDefinition", name: "检测模板定义" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "basics.vehicleCheck.item")) {
      this.tabList.push({ id: "detectManage", name: "检测项目管理" });
    }
    if (this.tabList.length > 0) {
      this.activeTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (
      this.hasBelongsPermWithoutRoute("read", "basics.vehicleCheck.template")
    ) {
      this.tabList.push({ id: "templateDefinition", name: "检测模板定义" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "basics.vehicleCheck.item")) {
      this.tabList.push({ id: "detectManage", name: "检测项目管理" });
    }
    if (this.tabList.length > 0) {
      this.activeTab = this.tabList[0].id;
    }
  }
};
</script>
