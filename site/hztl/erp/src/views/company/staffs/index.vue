<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabList"
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
import Normal from "./components/normal-table";
import Pending from "./components/pending-table";
import { tabChangeMixin } from "@/mixins";

export default {
  name: "Staffs",
  // eslint-disable-next-line vue/no-unused-components
  components: { Normal, Pending },
  mixins: [tabChangeMixin],
  data() {
    return {
      defaultTab: "Normal",
      tabList: [
        { id: "Normal", name: "员工列表" },
        { id: "Pending", name: "待审核员工" }
      ]
    };
  },
  created() {
    if (!this.hasBelongsPerm("audit")) {
      this.tabList = [{ id: "Normal", name: "员工列表" }];
    }
  }
};
</script>
