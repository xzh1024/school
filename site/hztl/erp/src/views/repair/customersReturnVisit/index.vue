<template>
  <!-- 客户回访 -->
  <div class="container-box" style="height:100%">
    <ht-tabs
      v-model="defaultTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
    />
    <keep-alive>
      <component :is="defaultTab" />
    </keep-alive>
  </div>
</template>

<script>
import { tabChangeMixin, hotkeyMixin } from "@/mixins";
import returnVisitList from "./components/returnVisitList";
import returnVisitSetting from "./components/returnVisitSettings";

export default {
  name: "customersReturnVisit",
  components: { returnVisitList, returnVisitSetting },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        // { id: "returnVisitList", name: "回访单" },
        // { id: "returnVisitSetting", name: "回访设置" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.review.bill")) {
      this.tabList.push({ id: "returnVisitList", name: "回访单" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.review.setting")) {
      this.tabList.push({ id: "returnVisitSetting", name: "回访设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.review.bill")) {
      this.tabList.push({ id: "returnVisitList", name: "回访单" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.review.setting")) {
      this.tabList.push({ id: "returnVisitSetting", name: "回访设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>
