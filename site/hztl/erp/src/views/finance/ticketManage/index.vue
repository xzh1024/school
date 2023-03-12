<template>
  <!-- 收票管理 -->
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
import ticketWaitingBill from "./ticketWaitingBill.vue";
import ticketBill from "./ticketBill.vue";

export default {
  name: "ticketBills",
  components: { ticketWaitingBill, ticketBill },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        { id: "ticketWaitingBill", name: "待收票业务单" },
        { id: "ticketBill", name: "收票单" }
      ]
    };
  },
  watch: {
    $route(to) {
      if (to.query.id && to.query.id == "ticketBill") {
        this.defaultTab = "ticketBill";
      }
    }
  }
  // mounted() {
  //   this.tabList = [];
  //   if (this.hasBelongsPermWithoutRoute("read", "repairs.review.bill")) {
  //     this.tabList.push({ id: "returnVisitList", name: "回访单" });
  //   }
  //   if (this.hasBelongsPermWithoutRoute("read", "repairs.review.setting")) {
  //     this.tabList.push({ id: "returnVisitSetting", name: "回访设置" });
  //   }
  //   if (this.tabList.length > 0) {
  //     this.defaultTab = this.tabList[0].id;
  //   }
  // },
  // activated() {
  //   this.tabList = [];
  //   if (this.hasBelongsPermWithoutRoute("read", "repairs.review.bill")) {
  //     this.tabList.push({ id: "returnVisitList", name: "回访单" });
  //   }
  //   if (this.hasBelongsPermWithoutRoute("read", "repairs.review.setting")) {
  //     this.tabList.push({ id: "returnVisitSetting", name: "回访设置" });
  //   }
  //   if (this.tabList.length > 0) {
  //     this.defaultTab = this.tabList[0].id;
  //   }
  // }
};
</script>
