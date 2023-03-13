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
import invoiceWaitingBill from "./invoiceWaitingBill.vue";
import invoiceBill from "./invoiceBill.vue";

export default {
  name: "customersReturnVisit",
  components: { invoiceWaitingBill, invoiceBill },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        { id: "invoiceWaitingBill", name: "待开票业务单" },
        { id: "invoiceBill", name: "开票单" }
      ]
    };
  },
  watch: {
    $route(to) {
      if (to.query.id && to.query.id == "invoiceBill") {
        this.defaultTab = "invoiceBill";
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
