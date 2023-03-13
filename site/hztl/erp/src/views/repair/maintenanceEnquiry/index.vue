<template>
  <!-- 维修综合查询 -->
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
import repairBusiness from "./components/repairBusiness";
import insuranceBusiness from "./components/insuranceBusiness";
import vehicleInspectionReport from "./components/vehicleInspectionReport";

export default {
  name: "maintenanceEnquiry",
  components: { repairBusiness, insuranceBusiness, vehicleInspectionReport },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        // { id: "repairBusiness", name: "维修业务" },
        // { id: "insuranceBusiness", name: "保险业务" },
        // { id: "vehicleInspectionReport", name: "车辆检测报告" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.comprehensive.bill")) {
      this.tabList.push({ id: "repairBusiness", name: "维修业务" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.comprehensive.insurance")
    ) {
      this.tabList.push({ id: "insuranceBusiness", name: "保险业务" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.comprehensive.checkReport"
      )
    ) {
      this.tabList.push({
        id: "vehicleInspectionReport",
        name: "车辆检测报告"
      });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.comprehensive.bill")) {
      this.tabList.push({ id: "repairBusiness", name: "维修业务" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.comprehensive.insurance")
    ) {
      this.tabList.push({ id: "insuranceBusiness", name: "保险业务" });
    }
    if (
      this.hasBelongsPermWithoutRoute(
        "read",
        "repairs.comprehensive.checkReport"
      )
    ) {
      this.tabList.push({
        id: "vehicleInspectionReport",
        name: "车辆检测报告"
      });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>
