<template>
  <!-- 维修人员绩效统计 -->
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
import receptionConsultant from "./components/reception-consultant/index";
import maintenanceTechnician from "./components/maintenance-technician/index";
import washCar from "./components/wash-car/index";
import { tabChangeMixin, hotkeyMixin } from "@/mixins";

export default {
  name: "performanceStatistics",
  components: { receptionConsultant, maintenanceTechnician, washCar },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        // { id: "receptionConsultant", name: "接待顾问" },
        // { id: "maintenanceTechnician", name: "维修技师" },
        // { id: "washCar", name: "洗车人员" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.reception"
      )
    ) {
      this.tabList.push({ id: "receptionConsultant", name: "接待顾问" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.technician"
      )
    ) {
      this.tabList.push({ id: "maintenanceTechnician", name: "维修技师" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.washer"
      )
    ) {
      this.tabList.push({ id: "washCar", name: "洗车人员" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.reception"
      )
    ) {
      this.tabList.push({ id: "receptionConsultant", name: "接待顾问" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.technician"
      )
    ) {
      this.tabList.push({ id: "maintenanceTechnician", name: "维修技师" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.achievementStatistics.washer"
      )
    ) {
      this.tabList.push({ id: "washCar", name: "洗车人员" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>
