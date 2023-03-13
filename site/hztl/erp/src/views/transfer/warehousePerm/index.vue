<template>
  <section class="container-box">
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
  </section>
</template>

<script>
import { tabChangeMixin } from "@/mixins";
import CompanyTransfer from "./CompanyTransfer/index";
import CrossCompanySale from "./CrossCompanySale/index";
export default {
  name: "StoreDispatch",
  mixins: [tabChangeMixin],
  components: {
    CompanyTransfer,
    CrossCompanySale
  },
  data() {
    return {
      tabs: [
        { id: "CompanyTransfer", name: "分公司调拨" },
        { id: "CrossCompanySale", name: "跨公司销售" }
      ]
    };
  }
};
</script>
