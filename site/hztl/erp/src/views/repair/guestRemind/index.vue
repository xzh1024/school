<template>
  <!-- 客情提醒 -->
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
import maintenance from "./components/maintenance";
import renewal from "./components/renewal";
import yearCareful from "./components/yearCareful";
import setting from "./components/setting";

export default {
  name: "guestRemind",
  components: { maintenance, renewal, yearCareful, setting },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      tabList: [
        // { id: "maintenance", name: "保养提醒" },
        // { id: "renewal", name: "续保提醒" },
        // { id: "yearCareful", name: "年审提醒" },
        // { id: "setting", name: "提醒设置" }
      ]
    };
  },
  watch: {
    $route(to) {
      if (to.query.id && to.query.id == "maintenance") {
        this.defaultTab = "maintenance";
      }
      if (to.query.id && to.query.id == "renewal") {
        this.defaultTab = "renewal";
      }
      if (to.query.id && to.query.id == "yearCareful") {
        this.defaultTab = "yearCareful";
      }
    }
  },
  // created() {
  //   this.tabList = [];
  //   if (this.hasBelongsPerm("maintain.read")) {
  //     this.tabList.push({ id: "maintenance", name: "保养提醒" });
  //   }
  //   if (this.hasBelongsPerm("renewalInsurance.read")) {
  //     this.tabList.push({ id: "renewal", name: "续保提醒" });
  //   }
  //   if (this.hasBelongsPerm("annualReview.read")) {
  //     this.tabList.push({ id: "yearCareful", name: "年审提醒" });
  //   }
  //   if (this.hasBelongsPerm("setting.read")) {
  //     this.tabList.push({ id: "setting", name: "提醒设置" });
  //   }
  // },
  mounted() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.remind.maintain")) {
      this.tabList.push({ id: "maintenance", name: "保养提醒" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.remind.renewalInsurance")
    ) {
      this.tabList.push({ id: "renewal", name: "续保提醒" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.remind.annualReview")
    ) {
      this.tabList.push({ id: "yearCareful", name: "年审提醒" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.remind.setting")) {
      this.tabList.push({ id: "setting", name: "提醒设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.remind.maintain")) {
      this.tabList.push({ id: "maintenance", name: "保养提醒" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.remind.renewalInsurance")
    ) {
      this.tabList.push({ id: "renewal", name: "续保提醒" });
    }
    if (
      this.hasBelongsPermWithoutRoute("read", "repairs.remind.annualReview")
    ) {
      this.tabList.push({ id: "yearCareful", name: "年审提醒" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.remind.setting")) {
      this.tabList.push({ id: "setting", name: "提醒设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>
