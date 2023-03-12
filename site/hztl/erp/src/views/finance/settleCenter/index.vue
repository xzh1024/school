<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
      @change="changeTab"
    />
    <keep-alive>
      <components :is="activeTab" />
    </keep-alive>
  </div>
</template>

<script>
import SettleCenter from "./settleCenter";
import SettleList from "./settleList";
import { tabChangeMixin } from "@/mixins";

export default {
  name: "SettleCenterPage",
  components: {
    SettleCenter,
    SettleList
  },
  mixins: [tabChangeMixin],
  data() {
    return {
      defaultTab: "SettleCenter",
      tabs: [
        { id: "SettleCenter", name: "结算中心" },
        { id: "SettleList", name: "结算单查询" }
      ]
    };
  }
};
</script>
