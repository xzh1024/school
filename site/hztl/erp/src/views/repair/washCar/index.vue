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
import washCarBusiness from "./components/business/index"; // 洗车业务
import priceSeting from "./components/price-seting/index"; // 洗车价格设置
import { tabChangeMixin, hotkeyMixin } from "@/mixins";

export default {
  name: "washCar",
  components: {
    washCarBusiness,
    priceSeting
  },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "",
      activeTab: "",
      tabList: [
        // { id: "washCarBusiness", name: "洗车业务" },
        // { id: "priceSeting", name: "洗车价格设置" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.washing.bill")) {
      this.tabList.push({ id: "washCarBusiness", name: "洗车业务" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.washing.setting")) {
      this.tabList.push({ id: "priceSeting", name: "洗车价格设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.washing.bill")) {
      this.tabList.push({ id: "washCarBusiness", name: "洗车业务" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.washing.setting")) {
      this.tabList.push({ id: "priceSeting", name: "洗车价格设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>

<style></style>
